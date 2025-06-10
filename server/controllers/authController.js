// backend/controllers/authController.js
/*const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
    signup: async (req, res) => {
        const { username, password } = req.body;
        console.log("Signup request received:", username); // Log input

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                console.log("User already exists");
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                username,
                password: hashedPassword,
                coins: 100
            });

            console.log("User created:", newUser.username);
            res.status(201).json({ message: 'Signup successful', userId: newUser.id, coins: newUser.coins });

        } catch (err) {
            console.error("Signup Error:", err); // SHOW this in terminal
            res.status(500).json({ error: err.message });
        }
    },


    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

            res.status(200).json({ message: 'Login successful', userId: user.id, coins: user.coins });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    leaderboard: async (req, res) => {
        try {
            const topUsers = await User.findAll({
                order: [['coins', 'DESC']],
                limit: 10,
                attributes: ['username', 'coins'],
            });

            res.status(200).json(topUsers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = authController;
*/
// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path if necessary

const authController = {
    signup: async (req, res) => {
        const { username, password } = req.body;
        console.log("Signup request received:", username);

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                console.log("User already exists");
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                username,
                password: hashedPassword,
                coins: 100  // Or whatever your initial coin amount is
            });

            console.log("User created:", newUser.username);
            res.status(201).json({ message: 'Signup successful', userId: newUser.id, coins: newUser.coins, username: newUser.username }); // Include username in response

        } catch (err) {
            console.error("Signup Error:", err);
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

            res.status(200).json({ message: 'Login successful', userId: user.id, coins: user.coins, username: user.username }); // Include username in response
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    leaderboard: async (req, res) => {
        try {
            const topUsers = await User.findAll({
                order: [['coins', 'DESC']],
                limit: 10,
                attributes: ['username', 'coins'],
            });
            res.status(200).json(topUsers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    /*getUser: async (req, res) => { // added getUser
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId, { // Use findByPk
                attributes: ['username', 'coins'], //  attributes
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};*/
    // controllers/authController.js
    /* getUserInfo: async (req, res) => {
         try {
             const userId = req.params.id;
             const user = await User.findByPk(userId);
 
             if (!user) {
                 return res.status(404).json({ message: 'User not found' });
             }
 
             res.json({
                 username: user.username,
                 coins: user.coins,
                 userId: user.id
             });
         } catch (err) {
             console.error('Error fetching user info:', err);
             res.status(500).json({ message: 'Internal server error' });
         }
     }
 */
};
module.exports = authController;


