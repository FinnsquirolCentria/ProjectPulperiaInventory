const sequelize = require("../config/database");

const User = require("./User");
const Product = require("./Product");
const Sale = require("./Sale");
const Alert = require("./Alert");

// Define associations between models
const models = {
  User,
  Product,
  Sale,
  Alert,
};

// Initialize associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = require("sequelize");

module.exports = models;