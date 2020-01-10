import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { User } from '../../../mongodb/models';

export default {
	addUser: async (_, args) => {
		try {
			const { email, password } = args;

			const user = await User.findOne({ email });
			if (user) return `User ${email} already exist`;

			const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
			return await User.create({ email, password: hashedPassword });
		} catch (e) {
			return e.message;
		}
	},
	getToken: async (_, args) => {
		try {
			const { email, password } = args;
			const user = await User.findOne({ email });
			if (user) {
				// we use argon2 to compare the hash in the database (mock.js) to the password the user provides
				if (await argon2.verify(user.password, password)) {
					// we create the JWT for the user with our secret
					// inside the token we encrypt some user data
					// then we send the token to the user
					const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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
				message: `Could not find account: ${email}`,
			});
		} catch (e) {
			return e.message;
		}
	},
};
