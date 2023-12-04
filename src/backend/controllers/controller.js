
/*
Contains all the controllers for backend requests
*/

const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const ExifReader = require('exifreader');
const Image = require('../models/Image');
const Lookup = require('../models/Lookup');

// --- image processing
const sharp = require('sharp');
const heicConvert = require('heic-convert');

const path = require('path');
// image processing ---


// Function to get an image
const getImage = async (req, res) => {
    // console.log("in getImage");
    try {
        const imageId = req.params.id;
        const image = await Image.findById(imageId);

        if (!image) {
            // console.log("image not found");
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
            let jpegBuffer = await heicConvert({
                buffer: file.buffer,
                format: 'JPEG',
            });
        
            buffer = await sharp(jpegBuffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 })
                .toBuffer();
        } else {
            buffer = await sharp(file.buffer)
                .resize({ width: 800 })
                .jpeg({ quality: 80 }) 
                .toBuffer();
        }
        

        const image = new Image({
            name: file.originalname,
            imagebin: buffer,
        });

        await image.save();
        return { id: image._id };
    } catch (error) {
        console.error('Error in postImage:', error);
        throw error; 
    }
}


// Get all possible games

const getGames = async (req, res) => {
    try {
        const games = await Quiz.find().sort({ createdAt: -1 }); // descending order
        // console.log(games)
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get game names with id for lookup

const getGameNames = async (req, res) => {
    try {
        const games = await Quiz.find().sort({ createdAt: -1 }); // descending order
        const gameNames = games.map(game => {
            return { id: game._id, name: game.name };
        });
        res.status(200).json(gameNames);
    } catch (error) {
        console.error("Error getting game names:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get game with id

const getGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Invalid id getgame' });
        return;
    }

    try {
        const game = await Quiz.findById(id);
        if (!game) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }

        const lookup = await Lookup.findById(game.lookupId);
        if (!lookup) {
            res.status(404).json({ message: 'Lookup not found' });
            return;
        }

        const imagesInfo = lookup.imageIds.map(image => {
            return { id: image._id, url: `/api/images/${image._id}` };
        });

        res.status(200).json({
            name: game.name,
            description: game.description,
            gpsData: game.actual_locations,
            images: imagesInfo
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


function extractGPSData(exifData) {
    if (!exifData) return null;

    let latitude = exifData.GPSLatitude ? exifData.GPSLatitude.description : null;
    let longitude = exifData.GPSLongitude ? exifData.GPSLongitude.description : null;
    const altitude = exifData.GPSAltitude ? exifData.GPSAltitude.description : null;

    // console.log(exifData.GPSLatitudeRef.description)
    // console.log(exifData.GPSLongitudeRef.description)

    if (exifData.GPSLatitudeRef && exifData.GPSLatitudeRef.description.includes('South')) {
        latitude = -latitude;
    }

    if (exifData.GPSLongitudeRef && exifData.GPSLongitudeRef.description.includes('West')) {
        longitude = -longitude;
    }
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
            // check if all contains valid GPSdata
            if (!GpsData || !GpsData.latitude || !GpsData.longitude) {
                return res.status(400).json({ error: "One or more images lack GPS data" });
             }
            
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
            const imageUrl = `/api/images/${id}`; // URL for local environment
            return { id, url: imageUrl };
        });
        // res.status(200).json({ message: "Quiz created successfully", images: imagesInfo});
        res.status(200).json({ message: "Quiz created successfully", quiz: newQuiz, images: imagesInfo });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const randomGame = async (req, res) => {
    try {
        const gameCount = await Quiz.countDocuments();
        const randomIndex = Math.floor(Math.random() * gameCount);
        const randomGame = await Quiz.findOne().skip(randomIndex);

        if (!randomGame) {
            res.status(404).json({ message: 'No game found' });
            return;
        }

        // Directly calling getGame function with the random game id
        req.params.id = randomGame._id;
        await getGame(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete game with id

const deleteGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({mssg: 'Invalid id deletegame'});
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
        res.status(404).json({mssg: 'Invalid id patchgame'});
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
    randomGame,
    getGameNames,
};