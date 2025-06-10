// backend/models/User.js
const { DataTypes } = require('sequelize');
const authDB = require('../config/dbAuth');

const user = authDB.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

module.exports = user;
/*const { DataTypes } = require('sequelize');
const authDB = require('../config/dbAuth');

const User = authDB.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  coins: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = User;
*/