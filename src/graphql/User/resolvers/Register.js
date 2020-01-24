import argon2 from 'argon2';
import requestIp from 'request-ip';

import Variables from '../../../../tests/graphql/User/Resolvers/Init/variables';
import { session } from '../../../neo4j/config';
import {
	findUserByEmailQuery,
	generateToken,
	genericError,
	hasRecords,
} from './Tools';

export default async (obj, params, ctx, resInf) => {
	const {
		email,
		password,
		firstname,
		lastname,
		newsletter,
	} = params;
	const { userId, deviceId } = ctx;
	if (!userId || !deviceId) return null;

	const user = await session.run(findUserByEmailQuery, { email });
	if (user.records && user.records.length) return { message: `User ${email} already exist`,	success: false };

	// Update User
	const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
	const ip = process.env.NODE_ENV !== 'test' ? requestIp.getClientIp(ctx.req) : Variables.connection.ipv4;
	let addedFields = '';
	if (firstname) addedFields += `, user.firstname = "${firstname}"`;
	if (lastname) addedFields += `, user.lastname = "${lastname}"`;
	if (newsletter) addedFields += `, user.newsletter = "${newsletter}"`;
	const setQuery = `SET user.email = "${email}", user.password = "${hashedPassword}", user.roles = ["CLIENT"]${addedFields}`;

	const finalQuery = `
		MATCH (:Connection {ipv4: "${ip}"})<-[:CONNECTED_WITH]-(user:User {id: "${userId}"})-[:USED]->(:Device {id: "${deviceId}"})
		${setQuery}
		RETURN user.id AS oldUserId
	`;
	const result = await session.run(finalQuery);

	if (hasRecords(result)) return generateToken(userId, deviceId, ['CLIENT']);
	return genericError;
};
