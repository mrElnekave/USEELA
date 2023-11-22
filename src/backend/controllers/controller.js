
/*
Contains all the controllers for backend requests
*/

const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const ExifReader = require('exifreader');
const Image = require('../models/Image');
const Lookup = require('../models/Lookup');
const sharp = require('sharp');
const heicConvert = require('heic-convert');
const path = require('path');

// Function to get an image
const getImage = async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(image.imagebin);
    } catch (error) {
        res.status(500).send('Error retrieving image');
    }
};


async function postImage(file) {
    try {
        const ext = path.extname(file.originalname).toLowerCase();
        let buffer;
        if (ext === '.heic') {
            // heic-convert
            try {
                buffer = await heicConvert({
                    buffer: file.buffer,
                    format: 'JPEG',
                });
            } catch (error) {
                console.error('Error converting HEIC to JPEG:', error);
            }
        } else {
            // sharp for others
            try {
                buffer = await sharp(file.buffer)
                    .jpeg()
                    .toBuffer();
            } catch (error) {
                console.error('Error converting image to JPEG:', error);
            }
        }
        const image = new Image({
            name: file.originalname,
            imagebin: buffer,
        });
        await image.save();

        return { id: image._id};
    } catch (error) {
        console.error('Error in postImage:', error);
        throw error; 
    }
}

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
        const { name, description } = req.body;
        const actual_locations = [];
        const imageIds = [];

        for (const file of req.files) {
            let exifData;
            try {
                exifData = ExifReader.load(file.buffer);
            } catch (error) {
                console.error('Error extracting EXIF data:', error);
            }
            const GpsData = extractGPSData(exifData);
            actual_locations.push(GpsData);
            const imageData = await postImage(file);
            imageIds.push(imageData.id);
        }
    

        const lookup = new Lookup({ imageIds });
        await lookup.save();

        const newQuiz = new Quiz({
            name,
            description,
            actual_locations,
            lookupId: lookup._id
        });
        await newQuiz.save();

        const imagesInfo = imageIds.map(id => {
            const imageUrl = `http://localhost:3000/api/images/${id}`; // URL for local environment
            return { id, url: imageUrl };
        });

        res.status(200).json({ message: "Quiz created successfully", quiz: newQuiz, images: imagesInfo });
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
    getImage,
    createGame,
    deleteGame,
    getGame,
    getGames,
    patchGame, 

};