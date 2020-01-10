import { makeExecutableSchema } from 'apollo-server-express';
import { augmentTypeDefs, augmentSchema } from 'neo4j-graphql-js';

// import commonTypeDefs from './common/typeDefs';
// import userTypeDef from './User/typeDefs';
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
// import instaAccountTypeDef from './InstaAccount/typeDefs';

// import commonR from './common/resolvers';
// import userR from './User/resolvers';
// import articleR from './Article/resolvers';
// import instaAccountR from './InstaAccount/resolvers';

import context from './context';

const jsSchema = makeExecutableSchema({
	typeDefs: [
		augmentTypeDefs(`
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
		`),
		tokenT,
		// articleRawTypeDef,
	],
	resolvers: [
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
	],
});

export const schema = augmentSchema(jsSchema, {
	query: {
		// exclude: ['MyPayloadType'],
	},
	mutation: {
		exclude: ['Article'],
	},
});


export default {
	schema,
	context,
};

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
