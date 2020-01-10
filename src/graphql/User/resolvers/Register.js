import argon2 from 'argon2';
import requestIp from 'request-ip';
import jwt from 'jsonwebtoken';

import { session } from '../../../neo4j/config';
import { findUserByEmailQuery } from './Tools';

export default async (obj, params, ctx, resInf) => {
	try {
		const {
			email,
			password,
			firstname,
			lastname,
		} = params;
		const { userId, deviceId } = ctx;
		if (!userId || !deviceId) return null;

		const user = await session.run(findUserByEmailQuery, { email });

		if (user.records && user.records.length) {
			return {
				message: `User ${email} already exist`,
				success: false,
			};
		}

		// Update User
		const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
		const ip = requestIp.getClientIp(ctx.req);
		let addedFields = '';
		if (firstname) addedFields += `, user.firstname = "${firstname}"`;
		if (lastname) addedFields += `, user.lastname = "${lastname}"`;
		const setQuery = `SET user.email = "${email}", user.password = "${hashedPassword}", user.roles = ["CLIENT"]${addedFields}`;

		const finalQuery = `
					MATCH (:Connection {ipv4: "${ip}"})<-[:CONNECTED_WITH]-(user:User {id: "${userId}"})-[:USED]->(:Device {id: "${deviceId}"})
					${setQuery}
					RETURN user.id
				`;
		const result = await session.run(finalQuery);

		if (result.records
			&& result.records.length
			&& result.records[0]._fields
			&& result.records[0]._fields.length) {
			const token = jwt.sign({ id: result.records[0]._fields[0] }, process.env.JWT_SECRET);
			return {
				success: true,
				token,
			};
		}
		return {
			success: false,
			message: 'Error: could not register new user.',
		};
	} catch (e) {
		return {
			success: false,
			message: e,
		};
	}
};
