import argon2 from 'argon2';

import { session } from 'Neo4j';
import { hasRecords, getFormattedResult } from './Tools';

const credentialError = { success: false, message: 'Incorrect credentials' };
const success = { success: true };

export default async (obj, params, ctx, resInf) => {
	const { userId: existingId, roles } = ctx;
	const { email, oldPassword, newPassword } = params;
	const result = await session.run(`
		MATCH (u:User {email: "${email}"})
		RETURN u.id AS userId, u.password as userPassword
	`);
	if (hasRecords(result)) {
		const { userId, userPassword } = getFormattedResult(result);
		// Is trying to modify another user password and is not admin.
		if (existingId !== userId && !roles.includes('ADMIN')) return null;

		const hashedPassword = await argon2.hash(newPassword, { type: argon2.argon2id });
		if (await argon2.verify(userPassword, oldPassword) || roles.includes('ADMIN')) {
			const changePasswordResult = await session.run(`
				MATCH (u:User {id: "${userId}"})
				SET u.password = "${hashedPassword}"
				RETURN u
			`);
			if (hasRecords(changePasswordResult)) return success;
		}
		return credentialError;
	}
	return credentialError;
};
