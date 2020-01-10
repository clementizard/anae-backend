import {
	InstaAccount,
	InstaPost,
	InstaAccountSnapshot,
} from '../../../mongodb/models';

export default {
	getAllInstaAccountsInfos: async () => await InstaAccount.find({}).exec(),
	getInstaAccount: async (_, args, context) => {
		// console.log('CONTEXT: ', context);
		const { username } = args;
		const account = await InstaAccount.findOne({ username });
		const posts = await InstaPost.find({ accountId: account._id });
		const snapshots = await InstaAccountSnapshot.find({ accountId: account._id });
		return {
			...account,
			posts,
			snapshots,
		};
	},
};
