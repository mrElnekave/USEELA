const express = require('express');
const Quiz = require('../models/Quiz');

// router is a mini express app
const router = express.Router();


router.get('/', (req, res) => {
    res.json({mssg: 'Get all possible games'});
});


router.get('/:id', (req, res) => {
    res.json({mssg: 'Get game with id ' + req.params.id});
});

router.post('/', async (req, res) => {
    const {name, images, description, actual_locations} = req.body; // destructuring, body should have all of these

    try {
        const quiz = await Quiz.create({name, images, description, actual_locations}); // async
        res.status(200).json(quiz); // status 200 is the status code for succeded
    } catch (err) {
        console.log(err);
        res.status(400).json({mssg: 'Failed to create new game'});
    }

});

router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete game with id ' + req.params.id});
});

// module.exports is an object that we can add properties to
module.exports = router;