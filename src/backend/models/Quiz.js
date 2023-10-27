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
        type: Array,
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

/* Sample quiz json
{
    "name": "Test Quiz",
    "images": ["FAKE IMAGE 1", "FAKE IMAGE 2"],
    "description": "This is a test quiz",
    "actual_locations": ["FAKE LOCATION 1", "FAKE LOCATION 2"]
}
*/

module.exports = mongoose.model('Quiz', quizSchema);