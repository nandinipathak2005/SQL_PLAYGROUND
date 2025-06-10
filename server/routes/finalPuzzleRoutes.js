const express = require('express');
const router = express.Router();
const finalPuzzleController = require('../controllers/finalPuzzleController'); // Create this controller

router.get('/final-puzzle-data', finalPuzzleController.getFinalPuzzleData);

module.exports = router;