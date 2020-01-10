import { gql } from 'apollo-server-express';
import { neo4jgraphql } from 'neo4j-graphql-js';

import Mutation from './mutation';
import Query from './query';

// https://www.apollographql.com/docs/apollo-server/performance/caching/
// https://github.com/neo4j-graphql/neo4j-graphql-js/blob/master/example/apollo-server/movies-schema.js
// https://www.youtube.com/watch?v=4lxINyZxbgU&list=RDDmeUuoxyt_E&index=27
export const typeDefs = `
`;
export const resolvers = {
	Query: {
		ArticleById(object, params, ctx, resolveInfo) {
			return neo4jgraphql(object, params, ctx, resolveInfo, true);
		},
		ArticlesPaginate(object, params, ctx, resolveInfo) {
			return neo4jgraphql(object, params, ctx, resolveInfo, true);
		},
		AllArticles(object, params, ctx, resolveInfo) {
			return neo4jgraphql(object, params, ctx, resolveInfo, true);
		},
	},
	Mutation: {
		CreateArticleWithSections(object, params, ctx, resolveInfo) {
			console.log('--------------------------------------------');
			console.log(JSON.stringify(object));
			console.log('--------------------------------------------');
			console.log(JSON.stringify(params));
			console.log('--------------------------------------------');
			console.log(ctx);
			console.log('--------------------------------------------');
			console.log(JSON.stringify(resolveInfo));
			console.log('--------------------------------------------');
			return neo4jgraphql(object, params, ctx, resolveInfo, true);
		},
	},
};

// export default gql`
// 	"""
// 		Section's Article, contains a part of article,
// 		every item is optionnal, and have different end-usage
// 	"""
// 	type ArticleSection {
// 		"""The section's title, if any"""
// 		title: String
// 		"""The section's text, is required if title exists"""
// 		text: String
// 		"""Same for the Image, if this is the only param, it will take the whole space"""
// 		image: String
// 		"""Font size for the text"""
// 		size: Int
// 		"""Used for short article preview (In product's page)"""
// 		disposable: Boolean
// 	}
//
// 	type Article {
// 		"""Article's ID"""
// 		_id: ID!
// 		"""Article's Title"""
// 		title: String!
// 		"""Article's id title-like"""
// 		titleId: String!
// 		"""Image of the article"""
// 		image: String!
// 		"""Short text describing the article"""
// 		description: String
//     """Creation date of the article, automatically filled"""
//     created: DATE
//     """Updated date of the article, automatically filled"""
//     updated: DATE
//     """Deleted date of the article"""
//     deleted: DATE
//     """List of sections"""
// 		sections: [ArticleSection]
// 	}
// 	${Query}
// 	${Mutation}
// `;
