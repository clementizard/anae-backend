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
		CreateOrder: authFilter([ADMIN, CLIENT]),
		UpdateOrder: authFilter([ADMIN]),
		DeleteOrder: authFilter([ADMIN]),
		MergeOrder: authFilter([ADMIN]),
		/* RELATIONS */
		AddOrderProducts: authFilter([ADMIN, CLIENT]),
		UpdateOrderProducts: authFilter([ADMIN]),
		RemoveOrderProducts: authFilter([ADMIN]),
		MergeOrderProducts: authFilter([ADMIN]),

		AddOrderAddress: authFilter([ADMIN, CLIENT]),
		UpdateOrderAddress: authFilter([ADMIN]),
		RemoveOrderAddress: authFilter([ADMIN]),
		MergeOrderAddress: authFilter([ADMIN]),
	},
};
