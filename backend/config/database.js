const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize a Sequelize instance to connect and interact with a MySQL database using environment variables.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

module.exports = sequelize;