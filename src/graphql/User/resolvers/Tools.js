import jwt from 'jsonwebtoken';

export const getFormattedResult = (raw) => {
	const formatted = {};
	raw.records[0].keys.forEach((key, id) => {
		if (raw.records[0]._fields[id] && raw.records[0]._fields[id].properties) {
			formatted[key] = raw.records[0]._fields[id].properties;
		} else formatted[key] = raw.records[0]._fields[id];
	});
	return formatted;
};

export const findUserByEmailQuery = `
	MATCH u =(user:User)
	WHERE user.email = $email
	return u
`;

export const getDeviceQueryByInfos = (infos) => {
	let deviceQ = '';
	Object.keys(infos).forEach((key, id) => {
		const params = `${key}: "${infos[key]}"`;
		deviceQ += id ? `, ${params}` : params;
	});
	return deviceQ;
};

export const hasRecords = res => Boolean(res.records.length);
export const generateToken = (userId, deviceId, roles = []) => ({
	success: true,
	token: jwt.sign({ userId, deviceId, roles }, process.env.JWT_SECRET),
});
export const genericError = { success: false, message: 'An error occured, please try again later' };
