const express = require('express');
const multer = require('multer');
const { createGame, deleteGame, getGame, getGames, patchGame } = require('../controllers/controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getGames);


router.get('/:id', getGame);

router.delete('/:id', deleteGame);

router.patch('/:id', patchGame);

router.post('/', upload.array('photos'), createGame);

// module.exports is an object that we can add properties to
module.exports = router;