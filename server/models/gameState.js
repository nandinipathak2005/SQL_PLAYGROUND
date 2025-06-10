// In a real application, you might store this in a database
let gameState = {
    timeRemaining: 300,
    notebook: [],
    currentPuzzle: 1,
  };
  
  const gameStateModel = {
    initializeGame: async () => {
      gameState = { timeRemaining: 300, notebook: [], currentPuzzle: 1 };
      return gameState;
    },
    getCurrentState: async () => {
      return { ...gameState };
    },
    updateState: async (newState) => {
      gameState = { ...gameState, ...newState };
      return gameState;
    },
    deductTime: async (minutes) => {
      gameState.timeRemaining -= minutes;
      if (gameState.timeRemaining < 0) gameState.timeRemaining = 0;
      return gameState;
    },
    addNotebookEntry: async (entry) => {
      gameState.notebook.push(entry);
      return gameState;
    },
    setCurrentPuzzle: async (puzzleNumber) => {
      gameState.currentPuzzle = puzzleNumber;
      return gameState;
    },
  };
  
  module.exports = gameStateModel;