import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import { session } from '../../neo4j/config';

const findUserByIdQuery = `
	MATCH u =(user:User)
	WHERE user.id = $id
	return u
`;

const hasValidResults = result => Boolean(
	result.records
	&& result.records.length
	&& result.records[0]._fields
	&& result.records[0]._fields.length
	&& result.records[0]._fields[0]
	&& result.records[0]._fields[0].start,
);

export const getUserInfosByToken = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded.userId) {
			const result = await session.run(findUserByIdQuery, { id: decoded.userId });
			if (hasValidResults(result)) {
				return {
					userId: decoded.userId,
					deviceId: decoded.deviceId,
					authScopes: result.records[0]._fields[0].start.properties.roles,
				};
			}
			console.log('User does not exist');
			return {};
		}
		console.log('Token is invalid');
		return {};
	} catch (e) {
		console.log(e);
		throw new AuthenticationError('Authentication token is invalid, please log in');
	}
};
