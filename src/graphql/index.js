import { makeAugmentedSchema } from 'neo4j-graphql-js';

import { resolvers as categoryR, typeDefs as categoryT } from './Category';
import { resolvers as collectionR, typeDefs as collectionT } from './Collection';
import { resolvers as productR, typeDefs as productT } from './Product';
import { resolvers as orderR, typeDefs as orderT } from './Order';
import { resolvers as cardR, typeDefs as cardT } from './Card';
import { resolvers as addressR, typeDefs as addressT } from './Address';
import { resolvers as articleR, typeDefs as articleT } from './Article';
import { resolvers as sectionR, typeDefs as sectionT } from './Section';
import { resolvers as deviceR, typeDefs as deviceT } from './Device';
import { resolvers as userR, typeDefs as userT } from './User';
import { resolvers as connectionR, typeDefs as connectionT } from './Connection';
import { resolvers as reviewR, typeDefs as reviewT } from './Review';
import { resolvers as tokenR, typeDefs as tokenT } from './Token';

import context from './context';

const typeDefs = `
		type Query { _empty: String	}
		type Mutation {	_empty: String }
		${categoryT}
		${articleT}
		${sectionT}
		${collectionT}
		${productT}
		${orderT}
		${addressT}
		${cardT}
		${deviceT}
		${userT}
		${connectionT}
		${reviewT}
		${tokenT}
`;

const	resolvers = [
	articleR,
	sectionR,
	categoryR,
	collectionR,
	productR,
	orderR,
	addressR,
	cardR,
	deviceR,
	userR,
	connectionR,
	reviewR,
	tokenR,
];

export const schema = makeAugmentedSchema({
	typeDefs,
	resolvers,
	allowUndefinedInResolve: true,
	config: {
		auth: {
			hasRole: true,
			isAuthenticated: true,
		},
		query: {
			exclude: [
				'Token',
				'Success',
				'SectionArticle',
			],
		},
		mutation: {
			exclude: [
				'Token',
				'Success',
				'SectionArticle',
			],
		},
	},
});

export default {
	schema,
	context,
};
