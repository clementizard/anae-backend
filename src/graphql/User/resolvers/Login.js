import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { session } from '../../../neo4j/config';
import { findUserByEmailQuery } from './Tools';

export default async (obj, params, ctx, resInf) => {
	try {
		const { email, password } = params;
		const result = await session.run(findUserByEmailQuery, { email });
		if (result.records
			&& result.records.length
			&& result.records[0]._fields
			&& result.records[0]._fields.length
			&& result.records[0]._fields[0]
			&& result.records[0]._fields[0].start) {
			const user = result.records[0]._fields[0].start.properties;

			// we use argon2 to compare the hash in the database (mock.js) to the password the user provides
			if (await argon2.verify(user.password, password)) {
				// Create the JWT for the user with secret
				// inside the token we encrypt some user data
				// then we send the token to the user
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
				return ({
					success: true,
					token,
				});
			}
			// return error to user to let them know the password is incorrect
			return ({
				success: false,
				message: 'Incorrect credentials',
			});
		}
		// return error to user to let them know the account there are using does not exists
		return ({
			success: false,
			message: 'Incorrect credentials',
			// message: `Could not find account: ${email}`,
		});
	} catch (e) {
		return e.message;
	}
};
