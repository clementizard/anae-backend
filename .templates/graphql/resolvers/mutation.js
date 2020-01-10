import { User } from '../../../mongodb/models';

export default {
	addUser: async (_, args) => {
		try {
			return await User.create(args);
		} catch (e) {
			return e.message;
		}
	},
};
