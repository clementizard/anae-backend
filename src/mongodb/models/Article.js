const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const { Schema } = mongoose;

const articleSchema = new Schema({
	titleId: {
		type: String,
		unique: true,
	},
	title: String,
	description: String,
	image: String,
	created: Date,
	updated: Date,
	deleted: Date,
	sections: [{
		title: String,
		text: String,
		image: String,
		size: Int32,
		disposable: Boolean,
	}],
});

// name = database collection's name
export default mongoose.model('article', articleSchema);
