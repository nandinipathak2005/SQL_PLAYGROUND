const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/', characterController.getAllCharacters);

module.exports = router;
