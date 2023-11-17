/*
The lookup schema is used to store the names of the games and their ids.
As well as the images and their ids.
And Users and their ids.
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
    imageMap: {
        type: Map,
        required: true
    },
    gameMap: {
        type: Map,
        required: true
    },
    userMap: {
        type: Map,
        required: true
    }
});

module.exports = mongoose.model('Lookup', lookupSchema);