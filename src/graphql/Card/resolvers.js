import {
	authFilter,
	ADMIN,
	CLIENT,
} from '../Tools';

const clientUpdateCard = {
	name: 'CLIENT',
	allowedFields: [
		'name',
		'number',
		'expirationDate',
		'ccv',
		'disabled',
	],
};

export default {
	Mutation: {
		/* PRODUCT */
		CreateCard: authFilter([ADMIN, CLIENT]),
		UpdateCard: authFilter([ADMIN, clientUpdateCard]),
		DeleteCard: authFilter([ADMIN]),
		MergeCard: authFilter([ADMIN]),
		/* RELATIONS */
		AddCardBillingAddress: authFilter([ADMIN, CLIENT]),
		RemoveCardBillingAddress: authFilter([ADMIN]),
		MergeCardBillingAddress: authFilter([ADMIN]),

		AddCardUser: authFilter([ADMIN, CLIENT]),
		UpdateCardUser: authFilter([ADMIN]),
		RemoveCardUser: authFilter([ADMIN]),
		MergeCardUser: authFilter([ADMIN]),
	},
};
