import { makeExecutableSchema, gql } from 'apollo-server-express';
import { augmentTypeDefs, augmentSchema, makeAugmentedSchema } from 'neo4j-graphql-js';

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

// const arrayTypeDefs = [
// 	categoryT,
// 	articleT,
// 	sectionT,
// 	collectionT,
// 	productT,
// 	orderT,
// 	addressT,
// 	cardT,
// 	deviceT,
// 	userT,
// 	connectionT,
// 	reviewT,
// 	tokenT,
// ];

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
// const augmentedTypeDefs = augmentTypeDefs(typeDefs);
// const allTypeDefs = [
// 	augmentedTypeDefs,
// 	tokenT,
// ];
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

// const jsSchema = makeExecutableSchema({
// 	typeDefs: allTypeDefs,
// 	resolvers,
// });

// export const schema = augmentSchema(jsSchema, {
// 	mutation: {
// 		exclude: [
// 			'Article',
// 			'Section',
// 			'User',
// 			'Article',
// 			'Article',
// 		],
// 	},
// });

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
				// "Token",
			],
		},
		mutation: {
			exclude: [
				// "Token",
			],
		},
	},
});

export default {
	schema,
	context,
};

// const augmentedSchema = augmentSchema({
// export const schema = augmentSchema({
// 	typeDefs: allTypeDefs,
// 	resolvers,
// 	auth: {
// 		hasRole: true,
// 	},
// });

// export const schema = makeExecutableSchema({
// 	schema: augmentedSchema,
// 	resolverValidationOptions: {
// 		requireResolversForResolveType: false,
// 	},
// 	schemaDirectives: {},
// });
// const executableSchema = makeExecutableSchema({
// 	typeDefs: allTypeDefs,
// 	resolvers,
// 	resolverValidationOptions: {
// 		requireResolversForResolveType: false,
// 	},
// 	schemaDirectives: {},
// });
//
// export const schema = augmentSchema(executableSchema, {
// 	auth: {
// 		hasRole: true,
// 	},
// });

// const schema = makeAugmentedSchema({
// 	typeDefs: [
// 		articleTypeDefs,
// 		// augmentTypeDefs(articleTypeDefs),
// 		articleRawTypeDef,
// 	],
// 	// resolverValidationOptions: {
// 	// 	requireResolversForResolveType: false,
// 	// },
// 	resolvers: [
// 		articleResolvers,
// 	],
// 	config: {
// 		mutation: {
// 			exclude: [
// 				// 'Section',
// 			],
// 		},
// 	},
// });
// const jsSchema = makeExecutableSchema({
// 	typeDefs: [
// 		commonTypeDefs,
// 		userTypeDef,
// 		articleTypeDefs,
// 		instaAccountTypeDef,
// 	],
// 	resolvers: [
// 		commonResolvers,
// 		userResolvers,
// 		articleResolvers,
// 		instaAccountResolvers,
// 	],
// });
// const schema = augmentSchema(
// 	jsSchema, {
// 		mutation: {
// 			exclude: [
// 				// 'Section',
// 			],
// 		},
// 	},
// );
