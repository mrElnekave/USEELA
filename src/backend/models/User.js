const mongoose = require('mongoose');
// MongoDB is schemaless, but mongoose allows us to use schemas
const Schema = mongoose.Schema;
//User Schema contains email, password, score, and quizzes made
const userSchema = new Schema({
   	email: {
        type: String,
        required: true,
		unique: true,
    },
    password: {
        type: String,
        required: true,
    },
	score: {
		type: Number,
		default: 0,
	},
	quizzes: {
		type: Array,
		default: [],
	},
	authToken: {
		type: String,
		default: null,
	},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
