const express = require('express');
const queryController = require('../controllers/queryControllerStage2');

const router = express.Router();

router.post('/execute', queryController.executeQuery);

module.exports = router;
