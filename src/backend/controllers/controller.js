
/*
Contains all the controllers for backend requests
*/

const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');


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

    const game = await Quiz.findById(id);

    if (game) {
        res.status(200).json(game);
    }

    res.status(404).json({mssg: 'Game with id ' + id + ' not found'});

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

    const quiz = await Quiz.findByIdAndUpdate(id, {
        ... req.body,
    });

    if (!quiz) {
        res.status(404).json({mssg: 'Game with id ' + id + ' not found'});
        return;
    }

    res.status(200);
};

module.exports = {
    createGame,
    deleteGame,
    getGame,
    getGames,
    patchGame, 

};