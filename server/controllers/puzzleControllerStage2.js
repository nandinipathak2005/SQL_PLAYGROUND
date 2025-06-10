const puzzleDefinitions = require('../models/puzzleDefinitionsStage2');
const branchDefinitions = require('../models/branchDefinitionsStage2');

const puzzleControllerStage2 = {
  getPuzzleData: async (req, res) => {
    const { id } = req.params;
    const puzzle = puzzleDefinitions[id];
    if (puzzle) {
      res.json(puzzle);
    } else {
      res.status(404).json({ message: 'Puzzle data not found' });
    }
  },
  getBranchData: async (req, res) => {
    const { id } = req.params;
    const branch = branchDefinitions[id];
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ message: 'Branch data not found' });
    }
  },
};

module.exports = puzzleControllerStage2;