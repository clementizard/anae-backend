const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// name = database collection's name
export default mongoose.model('user', userSchema);
