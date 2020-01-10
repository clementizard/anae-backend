const mongoose = require('mongoose');

const { Schema } = mongoose;

const InstaAccount = new Schema({
	userId: String,
	email: String,
	username: {
		type: String,
		unique: true,
	},
	fullName: String,
	description: String,
	url: String,
	website: String,
	lastUpdate: Date,
	snapshots: [Schema.ObjectId],
	posts: [Schema.ObjectId],
});

export default mongoose.model('instaAccounts', InstaAccount);
