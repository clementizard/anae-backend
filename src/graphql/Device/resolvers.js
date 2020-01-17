import {
	authFilter,
	ADMIN,
} from '../Tools';

export default {
	Mutation: {
		/* DEVICE */
		CreateDevice: authFilter([ADMIN]),
		UpdateDevice: authFilter([ADMIN]),
		DeleteDevice: authFilter([ADMIN]),
		MergeDevice: authFilter([ADMIN]),
		/* RELATIONS */
		AddDeviceOwners: authFilter([ADMIN]),
		UpdateDeviceOwners: authFilter([ADMIN]),
		RemoveDeviceOwners: authFilter([ADMIN]),
		MergeDeviceOwners: authFilter([ADMIN]),
	},
};
