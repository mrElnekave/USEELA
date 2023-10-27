const express = require('express');
const Quiz = require('../models/Quiz');

// router is a mini express app
const router = express.Router();


router.get('/', (req, res) => {
    let quiz = {
        name: "Test Quiz",
        images: ["FAKE IMAGE 1", "FAKE IMAGE 2"],
        description: "This is a test quiz",
        actual_locations: ["FAKE LOCATION 1", "FAKE LOCATION 2"]
    }

    res.status(200).json(quiz);
});


router.post('/', async (req, res) => {
    const {name, images, description, actual_locations} = req.body; // destructuring, body should have all of these
    res.json({mssg: 'doesn\'t actually do anything its a dummy'});
});

// module.exports is an object that we can add properties to
module.exports = router;