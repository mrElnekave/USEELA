const { createGame, deleteGame, getGame, getGames, patchGame } = require('../controllers/controller');
const express = require('express');

// router is a mini express app
const router = express.Router();


router.get('/', getGames);


router.get('/:id', getGame);

router.post('/', createGame);

router.delete('/:id', deleteGame);

router.patch('/:id', patchGame);

// module.exports is an object that we can add properties to
module.exports = router;