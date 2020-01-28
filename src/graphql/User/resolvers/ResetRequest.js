import sgMail from '@sendgrid/mail';

import { session } from 'Neo4j';
import {
	findUserByEmailQuery,
	genericError,
	getFormattedResult,
	hasRecords,
} from './Tools';


export default async (obj, params, ctx, resInf) => {
	const { email } = params;
	const { userId, deviceId } = ctx;
	if (!userId || !deviceId) return null;

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	console.log('Sending: ', email);
	const user = await session.run(findUserByEmailQuery, { email });
	if (!hasRecords(user)) return genericError;
	const {
		firstname,
		lastname,
		id,
	} = getFormattedResult(user);

	console.log('FIRSTNAME, LASTNAME: ', firstname, lastname, id);

	/*
	Checking if code is not expired in database.
	Setting up unique id with expiration date
	saving it in database
	send email with:
	  - url auth/reset/[id]
	  - First/Lastname
	  - allow the user to contact support in case he's not the origin of this action

	In ResetResponse
	Check if code corresond to the one in database
	change password
	send token
	 */
	const toEncode = new Date();
	toEncode.setHours(toEncode.getHours() + 1);
	const encoded = new Buffer(JSON.stringify({
		userId: id,
		date: toEncode,
	}));
	console.log('Encoded: ', encoded);
	
	const msg = {
		to: 'clement.izard478@gmail.com',
		from: 'no-reply@anae.me',
		templateId: 'd-0d2298ea40a049fbb03ce7e58457889d',
		dynamic_template_data: {
			firstname: `http://127.0.0.1:3000/auth/reset/${}`,
			lastname,
		},
		// subject: 'I like your style',
		// text: 'and easy to do anywhere, even with Node.js',
		// html: '<strong>And can send emails from anyone 👌</strong>',
	};
	try {
		const res = await sgMail.send(msg);
		console.log('RESULT: ', res);
		return { success: true, message: 'email sent' };
	} catch (e) {
		console.error(e);
		return genericError;
	}
};
