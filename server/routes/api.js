// const express = require('express');
// const gameRoutes = require('./game');
// const queryRoutes = require('./query');
// const characterRoutes = require('./characters');
// const puzzleRoutes = require('./puzzles');
// const authRoutes = require('./authRoutes');

// const router = express.Router();

// // Use the appropriate routes
// router.use('/game', gameRoutes);
// router.use('/query', queryRoutes);
// router.use('/characters', characterRoutes); // Ensure this matches the frontend
// router.use('/puzzles', puzzleRoutes);
// router.use('/auth', authRoutes);

// module.exports = router;
const express = require('express');
const gameRoutes = require('./game');
const queryRoutes = require('./query');
const queryRoutes2 = require('./queryStage2');
const characterRoutes = require('./characters'); // Ensure this matches the frontend
const puzzleRoutes = require('./puzzles');
const puzzleRoutes2=require('./puzzlesStage2');
const authRoutes = require('./authRoutes');
const finalPuzzleRoutes = require('./finalPuzzleRoutes'); // Import the new route

const router = express.Router();

// Use the appropriate routes
router.use('/game', gameRoutes);
router.use('/query', queryRoutes);
router.use('/query2',queryRoutes2);
router.use('/characters', characterRoutes);
router.use('/puzzles', puzzleRoutes);
router.use('/puzzles2',puzzleRoutes2);
router.use('/auth', authRoutes);
router.use('/finalPuzzle', finalPuzzleRoutes); // Use the new route, you might want to adjust the path prefix

module.exports = router;
