
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
        return;
    }

    res.status(404).json({mssg: 'Game with id ' + id + ' not found'});

};

function extractGPSData(exifData) {
    if (!exifData) return null;

    const latitude = exifData.GPSLatitude ? exifData.GPSLatitude.description : null;
    const longitude = exifData.GPSLongitude ? exifData.GPSLongitude.description : null;
    const altitude = exifData.GPSAltitude ? exifData.GPSAltitude.description : null;

    return { latitude, longitude, altitude };
}

// Post new game
const createGame = async (req, res) => {
    try {
        console.log(req.files);
        const { name, description } = req.body;
        const actual_locations = [];
        const imageBuffers = [];

        for (const file of req.files) {
            let exifData;
            try {
                exifData = ExifReader.load(file.buffer);
            } catch (error) {
                console.error('Error extracting EXIF data:', error);
            }

            const GpsData = extractGPSData(exifData);
            actual_locations.push(GpsData);
            console.log(GpsData);
            imageBuffers.push(file.buffer);
        }

        const newQuiz = await Quiz.create({
            name,
            description,
            images: imageBuffers, 
            actual_locations
        });

        res.status(200).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
    const quiz = await Quiz.findOneAndUpdate({_id: id}, {
        ...req.body,
    });

    if (!quiz) {
        res.status(404).json({mssg: 'Game with id ' + id + ' not found'});
        return;
    }

    res.status(200).json(quiz);
};

module.exports = {
    createGame,
    deleteGame,
    getGame,
    getGames,
    patchGame, 

};