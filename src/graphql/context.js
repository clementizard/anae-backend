import Neo4jDriver from '../neo4j/config';
import { getUserInfosByToken } from './User/Tools';

export default ({ req }) => {
	const defaultContext = {
		req,
		driver: Neo4jDriver,
		authScopes: [],
	};

	const token = req.headers.authorization || '';
	return token ? {
		...defaultContext,
		...getUserInfosByToken(token),
	} : defaultContext;
};
