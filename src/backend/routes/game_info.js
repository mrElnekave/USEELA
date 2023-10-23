const express = require('express');


// router is a mini express app
const router = express.Router();


router.get('/', (req, res) => {
    res.json({mssg: 'Get all possible games'});
});


router.get('/:id', (req, res) => {
    res.json({mssg: 'Get game with id ' + req.params.id});
});

router.post('/', (req, res) => {
    res.json({mssg: 'Create new game'});
});

router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete game with id ' + req.params.id});
});

// module.exports is an object that we can add properties to
module.exports = router;