const express = require('express');
const queryController = require('../controllers/queryController');

const router = express.Router();

router.post('/execute', queryController.executeQuery);

module.exports = router;
