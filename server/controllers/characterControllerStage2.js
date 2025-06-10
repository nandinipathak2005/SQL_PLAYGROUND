const characterData = require('../models/characterDataStage2');

const characterController = {
  getAllCharacters: async (req, res) => {
    res.json(characterData);
  },
};

module.exports = characterControllerStage2;
