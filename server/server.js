const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const gameDB = require('./config/dbGame'); // DB for game state
const authDB = require('./config/dbAuth'); // DB for login, coins, leaderboard

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test both DB connections
gameDB.authenticate()
  .then(() => console.log('Connected to Game DB'))
  .catch(err => console.error('Game DB Error:', err));

authDB.authenticate()
  .then(() => console.log('Connected to Auth DB'))
  .catch(err => console.error('Auth DB Error:', err));


app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});