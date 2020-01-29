import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { session } from 'Neo4j';
import {
	genericError,
	getFormattedResult,
	generateToken,
	hasRecords,
} from './Tools';

export default async (obj, params, ctx, resInf) => {
	const {
		resetCode,
		password,
	} = params;
	const { userId, deviceId } = ctx;
	if (!userId || !deviceId) return null;

	const {
		userId: targetUserId,
		emitId,
		err,
	} = jwt.verify(resetCode, process.env.JWT_SECRET);
	if (err) {
		switch (err.name) {
			case 'TokenExpiredError':
				console.log('Error: token expired');
				return { success: false, message: 'Token expired' };
			default:
				console.log('unknown error: ', JSON.stringify(err));
				return { success: false, message: 'Unknown token error' };
		}
	}
	if (emitId !== userId) { // user is not the one that emitted the reset
		return { success: false, message: 'User mismatch' };
	}

	const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
	const updatePasswordRes = await session.run(`
		MATCH (u:User {id: "${targetUserId}"})
		SET u.password = "${hashedPassword}", u.resetCode = NULL
		RETURN u.roles as roles
	`);
	if (!hasRecords(updatePasswordRes)) return genericError;
	const { roles } = getFormattedResult(updatePasswordRes);
	return generateToken(targetUserId, deviceId, roles);
};
