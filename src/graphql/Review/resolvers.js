import {
	authFilter,
	ADMIN,
	PRODUCT_MANAGER,
	REDACTOR,
	MODERATOR,
	CLIENT,
} from '../Tools';

export default {
	Mutation: {
		/* SECTION */
		CreateReview: authFilter([ADMIN, CLIENT]), // Rajouter des filtres de fields creation
		UpdateReview: authFilter([ADMIN, MODERATOR, CLIENT]), // Rajouter des filtres de fields d'update
		DeleteReview: authFilter([ADMIN, MODERATOR]),
		MergeReview: authFilter([ADMIN]),
		/* RELATIONS */
		AddReviewAuthor: authFilter([ADMIN, CLIENT]),
		UpdateReviewAuthor: authFilter([ADMIN]),
		RemoveReviewAuthor: authFilter([ADMIN]),
		MergeReviewAuthor: authFilter([ADMIN]),

		AddReviewEdited: authFilter([ADMIN, MODERATOR, CLIENT]),
		UpdateReviewEdited: authFilter([ADMIN]),
		RemoveReviewEdited: authFilter([ADMIN]),
		MergeReviewEdited: authFilter([ADMIN]),

		AddReviewDeleted: authFilter([ADMIN, MODERATOR, CLIENT]),
		UpdateReviewDeleted: authFilter([ADMIN]),
		RemoveReviewDeleted: authFilter([ADMIN]),
		MergeReviewDeleted: authFilter([ADMIN]),

		AddReviewArticle: authFilter([ADMIN, MODERATOR, REDACTOR, CLIENT]),
		RemoveReviewArticle: authFilter([ADMIN, MODERATOR, PRODUCT_MANAGER]),
		MergeReviewArticle: authFilter([ADMIN]),

		AddReviewProduct: authFilter([ADMIN, MODERATOR, PRODUCT_MANAGER, CLIENT]),
		RemoveReviewProduct: authFilter([ADMIN, MODERATOR, PRODUCT_MANAGER]),
		MergeReviewProduct: authFilter([ADMIN]),
	},
};
