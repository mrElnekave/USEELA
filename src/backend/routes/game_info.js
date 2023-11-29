const express = require('express');
const multer = require('multer');
const { createGame, deleteGame, getGame, getGames, patchGame, randomGame, getGameNames } = require('../controllers/controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getGames); // return all quiz objects

router.get('/random', randomGame); // return randam quiz

router.get('/getGameNames', getGameNames);

router.get('/:id', getGame); // return selected quiz

router.delete('/:id', deleteGame);

router.patch('/:id', patchGame);

router.post('/', upload.array('photos'), createGame);

// module.exports is an object that we can add properties to
module.exports = router;