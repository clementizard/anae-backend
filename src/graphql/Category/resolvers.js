import {
	authFilter,
	ADMIN,
	PRODUCT_MANAGER,
	REDACTOR,
} from '../Tools';

export default {
	Mutation: {
		/* PRODUCT */
		CreateCategory: authFilter([ADMIN, REDACTOR, PRODUCT_MANAGER]),
		UpdateCategory: authFilter([ADMIN, REDACTOR, PRODUCT_MANAGER]),
		DeleteCategory: authFilter([ADMIN]),
		MergeCategory: authFilter([ADMIN]),
		/* RELATIONS */
		AddCategoryProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveCategoryProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeCategoryProducts: authFilter([ADMIN]),

		AddCategoryCollections: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveCategoryCollections: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeCategoryCollections: authFilter([ADMIN]),

		AddCategoryArticles: authFilter([ADMIN, REDACTOR]),
		RemoveCategoryArticles: authFilter([ADMIN, REDACTOR]),
		MergeCategoryArticles: authFilter([ADMIN]),
	},
};
