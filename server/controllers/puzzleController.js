const puzzleDefinitions = require('../models/puzzleDefinitions');
const branchDefinitions = require('../models/branchDefinitions');

const puzzleController = {
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

module.exports = puzzleController;