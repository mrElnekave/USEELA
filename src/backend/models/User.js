const mongoose = require('mongoose');

// MongoDB is schemaless, but mongoose allows us to use schemas
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quizzes: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('Quiz', quizSchema);