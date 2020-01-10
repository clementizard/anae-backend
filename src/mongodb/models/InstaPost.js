const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const { Schema } = mongoose;

const InstaPost = new Schema({
	postId: String,
	accountId: Schema.ObjectId,
	postType: String,
	media: String,
	text: String,
	lastUpdate: Date,
	hashtags: [String],
	snapshots: [{
		date: Date,
		comments: Int32,
		likes: Int32,
	}],
});

export default mongoose.model('instaPosts', InstaPost);
