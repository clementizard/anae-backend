const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const { Schema } = mongoose;

const InstaAccountSnapshot = new Schema({
	accountId: Schema.ObjectId,
	date: Date,
	followers: Int32,
	following: Int32,
	comments: Int32,
	likes: Int32,
	posts: Int32,
	engagement: Number,
	frequency: Int32,
});

export default mongoose.model('instaAccountsSnapshots', InstaAccountSnapshot);
