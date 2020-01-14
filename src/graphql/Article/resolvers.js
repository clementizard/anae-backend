import { neo4jgraphql } from 'neo4j-graphql-js';

import { session } from '../../neo4j/config';

const articleAllowedParams = [
	'title',
	'image',
	'description',
	'created',
	'updated',
];
const sectionAllowedParams = [
	'title',
	'image',
	'text',
	'size',
];
export default {
	Query: {
		ArticleById: (obj, params, ctx, resInf) => {
			console.log('ArticleById has been called');
			return neo4jgraphql(obj, params, ctx, resInf);
		},
		AllArticles: (obj, params, ctx, resInf) => neo4jgraphql(obj, params, ctx, resInf),
	},
	Mutation: {
		UpdateArticle: (obj, params, ctx, resInf) => {
			if (!ctx.roles.includes('ADMIN')) return null;
			return neo4jgraphql(obj, params, ctx, resInf);
		},
		CreateArticleWithSections: async (obj, params, ctx, resInf) => {
			try {
				const sections = params.sections;
				let createSectionsQuery = '';
				const sectionQueryParams = {};
				const relationshipQueryParams = {};

				// console.log(obj, params, ctx);

				// Article
				let articleParams = '';
				Object.keys(params).forEach((key) => {
					if (articleAllowedParams.includes(key)) articleParams += `${key}: $${key}, `;
				});
				// Sections
				if (sections && sections.length) {
					sections.forEach((section, sectionIndex) => {
						let sectionParams = '';
						Object.keys(section).forEach((key) => {
							if (sectionAllowedParams.includes(key)) {
								sectionQueryParams[`section${sectionIndex}${key}`] = section[key];
								sectionParams += `${key}: $section${sectionIndex}${key}, `;
							}
						});
						createSectionsQuery += `CREATE (s${sectionIndex}:Section { ${sectionParams} id: apoc.create.uuid() })`;
						// Relationship
						relationshipQueryParams[`r${sectionIndex}`] = Boolean(section.disposable);
						createSectionsQuery += `CREATE (s${sectionIndex})-[r${sectionIndex}:IN_ARTICLE { disposable: $r${sectionIndex} }]->(n)`;
					});
				}
				const finalQuery = `
					CREATE (n:Article { ${articleParams}id: apoc.create.uuid() })
					${createSectionsQuery}
					RETURN n
				`;
				const result = await session.run(finalQuery, {
					...params,
					...sectionQueryParams,
					...relationshipQueryParams,
				});
				return result.records[0]._fields[0].properties;
			} catch (err) {
				return err;
			}
		},
	},
};
