import argon2 from 'argon2';

import { session } from '../../../neo4j/config';
import { hasRecords, getFormattedResult, generateToken } from './Tools';

const credentialError = { success: false, message: 'Incorrect credentials' };

export default async (obj, params, ctx, resInf) => {
	const { deviceId, userId: existingId } = ctx;
	if (!existingId || !deviceId) return null;
	const { email, password } = params;
	const result = await session.run(`
		MATCH (u:User {email: "${email}"})
		RETURN u.id AS userId, u.password as userPassword, u.roles AS roles
	`);
	if (hasRecords(result)) {
		const { userId, userPassword, roles } = getFormattedResult(result);

		if (await argon2.verify(userPassword, password)) return generateToken(userId, deviceId, roles);
		return credentialError;
	}
	return credentialError;
};
