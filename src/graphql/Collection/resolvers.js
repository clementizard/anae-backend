import {
	authFilter,
	ADMIN,
	PRODUCT_MANAGER,
} from '../Tools';

export default {
	Mutation: {
		/* PRODUCT */
		CreateCollection: authFilter([ADMIN, PRODUCT_MANAGER]),
		UpdateCollection: authFilter([ADMIN, PRODUCT_MANAGER]),
		DeleteCollection: authFilter([ADMIN]),
		MergeCollection: authFilter([ADMIN]),
		/* RELATIONS */
		AddCollectionProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveCollectionProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeCollectionProducts: authFilter([ADMIN]),

		AddCollectionCategories: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveCollectionCategories: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeCollectionCategories: authFilter([ADMIN]),

	},
};
