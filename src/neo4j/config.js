import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
	process.env.NEO4J_URI || 'bolt://localhost:7687',
	neo4j.auth.basic(
		process.env.NEO4J_USER || 'neo4j',
		process.env.NEO4J_PASSWORD || '123456',
	),
);
export const session = driver.session();
export default driver;
