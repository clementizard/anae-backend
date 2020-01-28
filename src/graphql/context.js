import Neo4jDriver from 'Neo4j';
import { getUserInfosByToken } from './User/Tools';

export default async ({ req }) => {
	const defaultContext = {
		req,
		headers: req.headers,
		driver: Neo4jDriver,
		roles: [],
	};

	const token = req.headers.authorization || '';
	if (token) {
		const userInfos = await getUserInfosByToken(token);
		return {
			...defaultContext,
			...userInfos,
		};
	}
	return defaultContext;
};
