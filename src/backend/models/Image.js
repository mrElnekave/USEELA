const mongoose = require('mongoose');

// MongoDB is schemaless, but mongoose allows us to use schemas
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imagebin: {
        type: Buffer,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Image', imageSchema);