const mongoose = require('mongoose');

// MongoDB is schemaless, but mongoose allows us to use schemas
const Schema = mongoose.Schema;


/*
A quiz schema has a creation date, a name, a list of lists of images (for the different spots), a description, and an actual location array.
*/
const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: Array[Array[Object]],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    actual_locations: {
        type: Array,
        required: true
    },
}, {timestamps: true});


module.exports = mongoose.model('Quiz', quizSchema);