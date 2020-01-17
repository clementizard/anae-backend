import {
	authFilter,
	ADMIN,
	REDACTOR,
} from '../Tools';

export default {
	Mutation: {
		/* SECTION */
		CreateSection: authFilter([ADMIN, REDACTOR]),
		DeleteSection: authFilter([ADMIN, REDACTOR]),
		MergeSection: authFilter([ADMIN, REDACTOR]),
		UpdateSection: authFilter([ADMIN, REDACTOR]),
		/* RELATIONS */
		AddSectionArticle: authFilter([ADMIN]), // Should be disabled
		UpdateSectionArticle: authFilter([ADMIN]), // Should be disabled
		RemoveSectionArticle: authFilter([ADMIN]), // Should be disabled
		MergeSectionArticle: authFilter([ADMIN]), // Should be disabled
	},
};
