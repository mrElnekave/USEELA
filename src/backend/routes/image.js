const { postImage, getImage} = require('../controllers/controller');
const express = require('express');

// router is a mini express app
const router = express.Router();

router.get('/:game_id/:image_ref', getImage);

router.post('/:game_id/:image_ref', postImage);

// module.exports is an object that we can add properties to
module.exports = router;