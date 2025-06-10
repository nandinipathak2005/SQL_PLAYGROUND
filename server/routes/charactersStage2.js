const express = require('express');
const characterController = require('../controllers/characterControllerStage2');

const router = express.Router();

router.get('/', characterController.getAllCharacters);

module.exports = router;
