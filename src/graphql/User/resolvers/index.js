import Init from './Init';
import Register from './Register';
import Login from './Login';
import ResetRequest from './ResetRequest';
import ResetResponse from './ResetResponse';
import ChangePassword from './ChangePassword';

import {
	authFilter,
	ADMIN,
	CLIENT,
	MODERATOR,
} from '../../Tools';

const updateUserClient = {
	name: 'CLIENT',
	allowedFields: [
		'email',
		'firstname',
		'lastname',
		'lang',
		'timezone',
		'leftHanded',
		'darkMode',
	],
};

export default {
	Mutation: {
		Init,
		Register,
		Login,
		ChangePassword,
		ResetRequest,
		ResetResponse,
		/* Generated */
		// User Core
		CreateUser: authFilter([ADMIN]),
		DeleteUser: authFilter([ADMIN]),
		MergeUser: authFilter([ADMIN]),
		UpdateUser: authFilter([ADMIN, updateUserClient]),
		// User Connection
		AddUserConnections: authFilter([ADMIN]),
		RemoveUserConnections: authFilter([ADMIN]),
		UpdateUserConnections: authFilter([ADMIN]),
		MergeUserConnections: authFilter([ADMIN]),
		// User Devices
		AddUserDevices: authFilter([ADMIN]),
		RemoveUserDevices: authFilter([ADMIN]),
		UpdateUserDevices: authFilter([ADMIN]),
		MergeUserDevices: authFilter([ADMIN]),
		// User Cart
		AddUserCart: authFilter([ADMIN, CLIENT]),
		RemoveUserCart: authFilter([ADMIN, CLIENT]),
		UpdateUserCart: authFilter([ADMIN]),
		MergeUserCart: authFilter([ADMIN]),
		// User Favorites
		AddUserFavorites: authFilter([ADMIN, CLIENT]),
		RemoveUserFavorites: authFilter([ADMIN, CLIENT]),
		UpdateUserFavorites: authFilter([ADMIN]),
		MergeUserFavorites: authFilter([ADMIN]),
		// User Reviews
		AddUserReviews: authFilter([ADMIN, CLIENT]),
		RemoveUserReviews: authFilter([ADMIN, MODERATOR, CLIENT]),
		UpdateUserReviews: authFilter([ADMIN, MODERATOR, CLIENT]),
		MergeUserReviews: authFilter([ADMIN]),
		// User Orders
		AddUserOrders: authFilter([ADMIN, CLIENT]),
		RemoveUserOrders: authFilter([ADMIN]),
		UpdateUserOrders: authFilter([ADMIN]),
		MergeUserOrders: authFilter([ADMIN]),
		// User Payments
		AddUserPayments: authFilter([ADMIN, CLIENT]),
		RemoveUserPayments: authFilter([ADMIN, CLIENT]),
		UpdateUserPayments: authFilter([ADMIN, CLIENT]),
		MergeUserPayments: authFilter([ADMIN]),
	},
};
