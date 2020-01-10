import dayjs from 'dayjs';
import IGAnalytics from 'instagram-analytics';

import {
	InstaAccount,
	InstaPost,
	InstaAccountSnapshot,
} from '../../../mongodb/models';
import {
	formatAccount,
	formatAccountSnapshot,
	formatPosts,
	getNewValues,
	hasNewValues,
} from '../../../InstaAnalytics/Tools';

export default {
	consoleArgs: async (_, args) => {
		console.log('MUTATION: ', args);
		return true;
	},
	addInstaAccount: async (_, args) => {
		try {
			const { username } = args;
			const data = await IGAnalytics(username);

			const formattedAccount = formatAccount(data);

			const account = await InstaAccount.create(formattedAccount);

			const formattedPosts = formatPosts(data, account._id);
			const formattedSnapshot = formatAccountSnapshot(data, account._id);

			const posts = await InstaPost.create(formattedPosts);
			const postsIds = [];
			posts.forEach(({ _id }) => postsIds.push(_id));

			const snapshot = await InstaAccountSnapshot.create(formattedSnapshot);

			// Update account with posts and snapshots ids
			await InstaAccount.findByIdAndUpdate(account._id, { $set: { snapshots: [snapshot._id], posts: postsIds }});

			return {
				...account,
				posts,
				snapshots: [snapshot],
			};
		} catch (e) {
			return e.message;
		}
	},
	updateInstaAccount: async (_, args) => {
		try {
			const { username } = args;
			// Get account
			let account = await InstaAccount.findOne({ username });
			const posts = await InstaPost
				.find({ accountId: account._id })
				.sort({ lastUpdate: -1 })
				.limit(30);
			const snapshots = await InstaAccountSnapshot
				.find({ accountId: account._id })
				.sort({ date: -1 })
				.limit(30);

			const data = await IGAnalytics(username, { count: 30 });

			const formattedSnapshot = formatAccountSnapshot(data, account._id);
			let newSnapshot = null;
			if (hasNewValues(snapshots[0], formattedSnapshot, ['date', '_id'])) {
				console.log('CREATING SNAPSHOT: -----------------------\n', snapshots[0], formattedSnapshot);
				newSnapshot = await InstaAccountSnapshot.create(formattedSnapshot);
			}

			const formattedPosts = formatPosts(data, account._id);
			const newPostsIds = [];
			const newPosts = [];
			for (let i = 0; i < formattedPosts.length; ++i) {
				const foundPost = posts.find(el => el.postId === formattedPosts[i].postId);
				if (!foundPost) {
					// If this is a new post
					const createdPost = await InstaPost.create(formattedPosts[i]);
					console.log('CREATED NEW POST: ', createdPost);
					newPostsIds.push(createdPost._id);
					newPosts.push(createdPost);
				} else if (hasNewValues(
					foundPost.snapshots[foundPost.snapshots.length - 1],
					formattedPosts[i].snapshots[0],
					['_id', 'date'],
				)) {
					// If this is an already existing post and last snapshot is not the same
					const updatedPost = await InstaPost.findByIdAndUpdate(
						foundPost._id,
						{
							$set: {
								snapshots: [...foundPost.snapshots, formattedPosts[i].snapshots[0]],
								lastUpdate: dayjs().toISOString(),
							},
						},
						{ new: true },
					);
					newPosts.push(updatedPost);
					console.log(`UPDATED POST: ${i}`, updatedPost);
				} else {
					console.log('POST IS THE SAME: ', hasNewValues(
						foundPost.snapshots[foundPost.snapshots.length - 1],
						formattedPosts[i].snapshots[0],
						['_id', 'date'],
					), foundPost.snapshots[foundPost.snapshots.length - 1], formattedPosts[i].snapshots[0]);
					newPosts.push(posts[i]);
				}
			}

			const formattedAccount = formatAccount(data);
			const newValues = getNewValues(account, formattedAccount, ['lastUpdate', 'snapshots', 'posts', '_id']);
			if (Boolean(Object.keys(newValues)).length || newSnapshot || Boolean(newPostsIds.length)) {
				newValues.lastUpdate = dayjs().toISOString();
				newValues.snapshots = newSnapshot ? [...account.snapshots, newSnapshot._id] : account.snapshots;
				newValues.posts = [...account.posts, ...newPostsIds];
				console.log('UPDATING ACCOUNT WITH VALUES: ', newValues);
				account = await InstaAccount.findByIdAndUpdate(
					account._id,
					{ $set: newValues },
					{ new: true },
				);
				console.log('UPDATED ACCOUNT: ', account);
			}

			return {
				...account,
				posts: newPosts,
				snapshots: newSnapshot ? [...snapshots, newSnapshot] : snapshots,
			};

			/* NEXT COMMENTED CODE IS FOR WHEN SCRAPER / REFRESHER WORKS EVERY 10 MIN */

			// // Infos & snapshot every 24h
			// if (dayjs().diff(dayjs(account.lastUpdate), 'hour') > 24) {
			// 	// Format Snapshot
			// 	const formattedSnapshot = formatAccountSnapshot(data, account._id);
			// 	// Push it
			// 	const newSnapshot = await InstaAccountSnapshot.create(formattedSnapshot);
			// 	console.log('NEW SNAPSHOT: ', newSnapshot);
			//
			// 	// Compare account values with new ones.
			// 	const formattedAccount = formatAccount(data);
			// 	const excludedFields = ['lastUpdate', 'snapshots', 'posts', '_id'];
			// 	const newValues = {};
			// 	Object.keys(formattedAccount).forEach((key) => {
			// 		if (!excludedFields.includes(key) && formattedAccount[key] !== account[key]) {
			// 			newValues[key] = formattedAccount[key];
			// 		}
			// 	});
			// 	// Update them
			// 	newValues.lastUpdate = Date.now();
			// 	newValues.snapshots = [...account.snapshots, newSnapshot._id];
			// 	console.log('NEW INFOS VALUES: ', newValues);
			// 	account = await InstaAccount.findByIdAndUpdate(
			// 		account._id,
			// 		{ $set: newValues },
			// 		{ new: true },
			// 	);
			// }
			//
			// // Posts update / push
			// // Init dates
			// const threeMonths = dayjs().subtract(3, 'month').toISOString();
			// const month = dayjs().subtract(1, 'month').toISOString();
			// const week = dayjs().subtract(7, 'days').toISOString();
			// const day = dayjs().subtract(24, 'hours').toISOString();
			// const twelveHours = dayjs().subtract(12, 'hours').toISOString();
			// const sixHours = dayjs().subtract(6, 'hours').toISOString();
			// const twoHours = dayjs().subtract(2, 'hours').toISOString();
			// const hour = dayjs().subtract(60, 'minutes').toISOString();
			// const thirtyMinutes = dayjs().subtract(30, 'minutes').toISOString();
			// const tenMinutes = dayjs().subtract(10, 'minutes').toISOString();
			//
			// const posts = await InstaPost.find({
			// 	accountId: account._id,
			// 	$or: [
			// 		// gt = Greater than = "In the last..."
			// 		// lt = Lower than = "More than..."
			// 		// snapshots.0.date = Posted date
			// 		{ lastUpdate: { $lt: tenMinutes }, 'snapshots.0.date': { $gt: hour } },
			// 		{ lastUpdate: { $lt: thirtyMinutes }, 'snapshots.0.date': { $gt: sixHours } },
			// 		{ lastUpdate: { $lt: hour }, 'snapshots.0.date': { $gt: twelveHours } },
			// 		{ lastUpdate: { $lt: twoHours }, 'snapshots.0.date': { $gt: day } },
			// 		{ lastUpdate: { $lt: day }, 'snapshots.0.date': { $gt: week } },
			// 		{ lastUpdate: { $lt: week }, 'snapshots.0.date': { $gt: month } },
			// 		{ lastUpdate: { $lt: month }, 'snapshots.0.date': { $gt: threeMonths } },
			// 	],
			// });
			// console.log('POSTS: ', JSON.stringify(posts));
			// posts.forEach((post, i) => {
			// 	console.log(`Post ${i}:`, post);
			// });
		} catch (e) {
			return e.message;
		}
	},
	deleteInstaAccount: async (_, args) => {
		try {
			const { username } = args;

			const account = await InstaAccount.findOneAndRemove({ username });
			await InstaPost.deleteMany({ accountId: account._id });
			await InstaAccountSnapshot.deleteMany({ accountId: account._id });

			return true;
		} catch (e) {
			return e.message;
		}
	},
};
