// backend/routes/authRoutes.js
/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/leaderboard', authController.leaderboard);

module.exports = router;
*/
// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/leaderboard', authController.leaderboard);
//router.get('/users/:id', authController.getUserInfo); // Add this route
module.exports = router;// routes/userRoutes.js
