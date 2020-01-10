import { User } from '../../../mongodb/models';

// graphql(parent, args, context, variableValues, operationName)
export default {
	getUsers: async () => await User.find({}).exec(),
};
