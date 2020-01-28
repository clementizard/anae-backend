import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import { session } from 'Neo4j';
import {
	getFormattedResult,
	hasRecords,
} from './resolvers/Tools';

export const getUserInfosByToken = async (token) => {
	const { userId, deviceId } = jwt.verify(token, process.env.JWT_SECRET);
	if (!userId) throw new AuthenticationError('Authentication token is invalid, please log in');

	const result = await session.run(`MATCH (u:User {id: "${userId}"}) RETURN u.roles AS roles`);
	if (hasRecords(result)) {
		const { roles: userRoles } = getFormattedResult(result);
		return { userId, deviceId, roles: userRoles || [] };
	}
	console.log('User does not exist');
	return { roles: [] };
};
