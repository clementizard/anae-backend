import argon2 from 'argon2';

import { session } from 'Neo4j';
import {
	hasRecords,
	getFormattedResult,
	genericError,
} from './Tools';

const credentialError = { success: false, message: 'Incorrect credentials' };
const success = { success: true };

export default async (obj, params, ctx, resInf) => {
	const { userId } = ctx;
	const { email, password } = params;
	const result = await session.run(`
		MATCH (u:User {id: "${userId}"})
		RETURN u.password as userPassword
	`);
	if (hasRecords(result)) {
		const { userPassword } = getFormattedResult(result);
		if (await argon2.verify(userPassword, password)) {
			const changePasswordResult = await session.run(`
				MATCH (u:User {id: "${userId}"})
				SET u.email = "${email}"
				RETURN u
			`);
			if (hasRecords(changePasswordResult)) return success;
		}
		return credentialError;
	}
	return genericError;
};
