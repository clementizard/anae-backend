import {
	authFilter,
	ADMIN,
	PRODUCT_MANAGER,
	MODERATOR,
	CLIENT,
} from '../Tools';

export default {
	Mutation: {
		/* PRODUCT */
		CreateProduct: authFilter([ADMIN, PRODUCT_MANAGER]),
		UpdateProduct: authFilter([ADMIN, PRODUCT_MANAGER]),
		DeleteProduct: authFilter([ADMIN]),
		MergeProduct: authFilter([ADMIN]),
		/* RELATIONS */
		AddCollectionProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveCollectionProducts: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeCollectionProducts: authFilter([ADMIN]),

		AddProductCategories: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveProductCategories: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeProductCategories: authFilter([ADMIN]),

		AddProductCollection: authFilter([ADMIN, PRODUCT_MANAGER]),
		RemoveProductCollection: authFilter([ADMIN, PRODUCT_MANAGER]),
		MergeProductCollection: authFilter([ADMIN]),

		AddProductOrders: authFilter([ADMIN, CLIENT]),
		UpdateProductOrders: authFilter([ADMIN]),
		RemoveProductOrders: authFilter([ADMIN]),
		MergeProductOrders: authFilter([ADMIN]),

		AddProductReviews: authFilter([ADMIN, MODERATOR, CLIENT]),
		RemoveProductReviews: authFilter([ADMIN, MODERATOR]),
		MergeProductReviews: authFilter([ADMIN]),

		AddProductInCart: authFilter([ADMIN, CLIENT]),
		UpdateProductInCart: authFilter([ADMIN]),
		RemoveProductInCart: authFilter([ADMIN, CLIENT]),
		MergeProductInCart: authFilter([ADMIN]),

		AddProductInFavorites: authFilter([ADMIN, CLIENT]),
		UpdateProductInFavorites: authFilter([ADMIN]),
		RemoveProductInFavorites: authFilter([ADMIN, CLIENT]),
		MergeProductInFavorites: authFilter([ADMIN]),
	},
};
