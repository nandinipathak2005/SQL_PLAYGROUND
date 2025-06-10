const gameStateModel = require('../models/gameState');

const finalPuzzleController = {
    getFinalPuzzleData: async (req, res) => {
        try {
            const gameState = await gameStateModel.findOne({
                where: { sessionId: req.sessionID },
                attributes: ['puzzleDeductions'],
            });

            if (gameState && gameState.puzzleDeductions) {
                // Flatten the array of single-element arrays
                const finalPuzzleData = gameState.puzzleDeductions.reduce((acc, curr) => {
                    if (curr && Array.isArray(curr) && curr.length > 0) {
                        acc[curr[0].puzzleId] = curr[0];
                    }
                    return acc;
                }, {});
                res.json(finalPuzzleData);
            } else {
                res.status(404).json({ error: 'Puzzle deduction data not found.' });
            }
        } catch (error) {
            console.error('Error fetching final puzzle data:', error);
            res.status(500).json({ error: 'Failed to fetch final puzzle data.' });
        }
    },
};

module.exports = finalPuzzleController;