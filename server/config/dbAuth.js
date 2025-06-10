// const { Sequelize } = require('sequelize');

// const authDB = new Sequelize('fatal_query', 'root', 'nandini@2005', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     define: {
//         timestamps: false
//     }
// });

// module.exports = authDB;
// const { Sequelize } = require('sequelize');

// const authDB = new Sequelize('bhrzxgaufey6jf8j6f0x', 'udcohdhmrcirdmbf', 'GfGPS2amdPVVCnCeojJn', {
//   host: 'bhrzxgaufey6jf8j6f0x-mysql.services.clever-cloud.com',        // e.g., 'db4.freehosting.com'
//   port: 3306,       // e.g., 3306 (without quotes if number)
//   dialect: 'mysql',
//   logging: false,
//   define: {
//     timestamps: false
//   }
// });

// module.exports = authDB;
// server/your-db-config-file.js (or wherever you define authDB)
require('dotenv').config({ path: '../.env' }); // Adjust path if needed

// If your authDB.js file is directly inside 'server',
// then it's just require('dotenv').config();
// because it will be relative to the cwd where the server starts.

// Let's assume your Sequelize setup file is directly inside 'server'.
// Then you can use:
require('dotenv').config();

const { Sequelize } = require('sequelize');

const authDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false
    }
  }
);

module.exports = authDB;
