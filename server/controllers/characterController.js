const characterData = require('../models/characterData');

const characterController = {
  getAllCharacters: async (req, res) => {
    res.json(characterData);
  },
};

module.exports = characterController;
