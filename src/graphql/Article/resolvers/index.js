import CreateArticleWithSections from './CreateArticleWithSections';

import {
	authFilter,
	ADMIN,
	REDACTOR,
} from '../../Tools';

const updateArticleEntities = [ADMIN, {
	name: 'REDACTOR',
	allowedFields: [
		'title',
		'image',
		'description',
	],
}];

const resolvers = {
	Mutation: {
		/* ARTICLE */
		// Admin
		CreateArticle: authFilter([ADMIN]),
		DeleteArticle: authFilter([ADMIN]),
		MergeArticle: authFilter([ADMIN]),
		// Redactor
		CreateArticleWithSections,
		UpdateArticle: authFilter(updateArticleEntities),
		/* RELATIONS */
		AddArticleSections: authFilter([ADMIN, REDACTOR]),
		UpdateArticleSections: authFilter([ADMIN, REDACTOR]),
		RemoveArticleSections: authFilter([ADMIN, REDACTOR]),
		MergeArticleSections: authFilter([ADMIN]),

		AddArticleCategories: authFilter([ADMIN, REDACTOR]),
		RemoveArticleCategories: authFilter([ADMIN, REDACTOR]),
		MergeArticleCategories: authFilter([ADMIN]),
	},
};

export default resolvers;
