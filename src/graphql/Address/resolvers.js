import {
	authFilter,
	ADMIN,
	CLIENT,
} from '../Tools';

export default {
	Mutation: {
		/* PRODUCT */
		CreateAddress: authFilter([ADMIN, CLIENT]),
		UpdateAddress: authFilter([ADMIN, CLIENT]),
		DeleteAddress: authFilter([ADMIN]),
		MergeAddress: authFilter([ADMIN]),
		/* RELATIONS */
		AddAddressOrders: authFilter([ADMIN, CLIENT]),
		UpdateAddressOrders: authFilter([ADMIN]),
		RemoveAddressOrders: authFilter([ADMIN]),
		MergeAddressOrders: authFilter([ADMIN]),

		AddCardUser: authFilter([ADMIN, CLIENT]),
		UpdateCardUser: authFilter([ADMIN]),
		RemoveCardUser: authFilter([ADMIN]),
		MergeCardUser: authFilter([ADMIN]),
	},
};
