import jwt from 'jsonwebtoken';
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
	const { userId, deviceId, roles } = ctx;
	if (!userId || !deviceId || (roles && roles.length)) return null;

	// Should be able to put this somewhere more global
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	// Find the user
	const user = await session.run(findUserByEmailQuery, { email });
	if (!hasRecords(user)) return genericError;
	const {
		firstname,
		lastname,
		id,
	} = getFormattedResult(user);
	const name = firstname || lastname || '';

	const encoded = jwt.sign({
		userId: id,
		emitId: userId,
		iat: Math.floor(new Date() / 1000),
	}, process.env.JWT_SECRET, { expiresIn: '1h' });

	// Setting encoded reset to the user.
	const setRes = await session.run(`
		MATCH (u:USER { id: "${id}" })
		SET u.resetCode = "${encoded}"
		RETURN u
	`);
	if (!hasRecords(setRes)) return { success: false, message: 'Unknown error occured' };

	const msg = {
		to: 'clement.izard478@gmail.com',
		from: 'no-reply@anae.me',
		templateId: 'd-0d2298ea40a049fbb03ce7e58457889d',
		dynamic_template_data: {
			name,
			url: `http://127.0.0.1:3000/auth/reset/${encoded}`,
		},
		// subject: '',
		// text: '',
		// html: '<strong>🤘</strong>',
	};
	try {
		await sgMail.send(msg);
		// Todo: check sgMail return
		return { success: true, message: 'Email sent' };
	} catch (e) {
		console.error(e);
		return genericError;
	}
};
