const express = require('express');
const puzzleController = require('../controllers/puzzleControllerStage2');

const router = express.Router();

router.get('/:id', puzzleController.getPuzzleData);
router.get('/branch/:id', puzzleController.getBranchData);

module.exports = router;
