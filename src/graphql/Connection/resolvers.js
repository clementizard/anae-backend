import {
	authFilter,
	ADMIN,
} from '../Tools';

export default {
	Mutation: {
		/* CONNECTION */
		CreateConnection: authFilter([ADMIN]),
		UpdateConnection: authFilter([ADMIN]),
		DeleteConnection: authFilter([ADMIN]),
		MergeConnection: authFilter([ADMIN]),
		/* RELATIONS */
		AddConnectionUsers: authFilter([ADMIN]),
		UpdateConnectionUsers: authFilter([ADMIN]),
		RemoveConnectionUsers: authFilter([ADMIN]),
		MergeConnectionUsers: authFilter([ADMIN]),
	},
};
