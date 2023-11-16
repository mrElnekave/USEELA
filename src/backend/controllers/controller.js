
/*
Contains all the controllers for backend requests
*/

const mongoose = require('mongoose');
const ImageSchema = require('../models/Image');
const Quiz = require('../models/Quiz');
// const Lookup = require('../models/Lookup');


// Get all possible games

const getGames = async (req, res) => {
    const games = await Quiz.find().sort({createdAt: -1}); // descending order

    res.status(200).json(games);
};


// Get game with id

const getGame = async (req, res) => {
    const { id } = req.params; // get from /:id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({mssg: 'Invalid id'});
        return;
    }

    // lookup for gameID_name in database
    const game = await ImageSchema.findById("65542151d931ec55df6ed1e7");

    if (game) {
        res.status(200).json(game);
        return;
    }

    res.status(404).json({mssg: 'Game with id ' + id + ' not found'});

};

// Delete game with id

const deleteGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({mssg: 'Invalid id'});
        return;
    }

    try {
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) {
            res.status(404).json({mssg: 'Game with id ' + id + ' not found'});
            return;
        }
        res.status(200).json(quiz);
    } catch (err) {
        console.log(err);
        res.status(400).json({mssg: 'Failed to delete game with id ' + id});
    }

};

// patch an existing game

const patchGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({mssg: 'Invalid id'});
        return;
    }
    const quiz = await Quiz.findOneAndUpdate({_id: id}, {
        ...req.body,
    });

    if (!quiz) {
        res.status(404).json({mssg: 'Game with id ' + id + ' not found'});
        return;
    }

    res.status(200).json(quiz);
};


// Post new game

const createGame = async (req, res) => {

    const {name, images, description, actual_locations} = req.body; // destructuring, body should have all of these

    try {
        const quiz = await Quiz.create({name, images, description, actual_locations}); // async
        res.status(200); // status 200 is the status code for succeded
    } catch (err) {
        console.log(err);
        res.status(400).json({mssg: 'Failed to create new game'});
    }

};

// Post image with gameid and name

const postImage = async (req, res) => {
    const { game_id, image_ref } = req.params;
    
    const {image_bin} = req.body; // destructuring, body should have all of these
    console.log(image_bin);

    try {
        const name = game_id + '_' + image_ref;
        const Image = await ImageSchema.create({name, image_bin}) // async
        res.status(200).json({mssg: 'done', id: Image._id}); // status 200 is the status code for succeded
    } catch (err) {
        console.log(err);
        res.status(400).json({mssg: 'Failed to create new game'});
    }
};

// Get image with id and name

const getImage = async (req, res) => {
    const { game_id, image_ref } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(game_id)) {
    //     res.status(404).json({mssg: 'Invalid id'});
    //     return;
    // }

    image_name = game_id + '_' + image_ref;
    
    const Image = await ImageSchema.findOne({name: image_name});

    if (Image) {
        res.status(200).json(Image);
        return;
    }

    res.status(404).json({mssg: 'Game with id ' + id + ' not found'});
};

module.exports = {
    createGame,
    deleteGame,
    getGame,
    getGames,
    patchGame, 
    postImage,
    getImage
};