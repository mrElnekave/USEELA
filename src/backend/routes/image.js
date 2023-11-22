const { getImage} = require('../controllers/controller');
const express = require('express');

// router is a mini express app
const router = express.Router();

router.get('/:id', getImage);

// module.exports is an object that we can add properties to
module.exports = router;