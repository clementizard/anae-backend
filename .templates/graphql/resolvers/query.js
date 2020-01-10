import { User } from '../../../mongodb/models';

export default {
	getUsers: async () => await User.find({}).exec(),
};
