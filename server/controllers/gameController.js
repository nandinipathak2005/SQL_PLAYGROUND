const gameStateModel = require('../models/gameState');

const gameController = {
  startGame: async (req, res) => {
    const initialState = await gameStateModel.initializeGame();
    res.json(initialState);
  },
  getGameState: async (req, res) => {
    const state = await gameStateModel.getCurrentState();
    res.json(state);
  },
};

module.exports = gameController;