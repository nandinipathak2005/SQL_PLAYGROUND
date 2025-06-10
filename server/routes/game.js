const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/start', gameController.startGame);
router.get('/state', gameController.getGameState);

module.exports = router;
