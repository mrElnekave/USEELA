/*
The lookup is a redirection for images so that we can store very simple things in the user.
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lookupSchema = new Schema({
    
    imageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }] 
});


module.exports = mongoose.model('Lookup', lookupSchema);
