const sequelize = require("../config/database");

const Product = require("./Product");
const Sale = require("./Sale");
const Alert = require("./Alert");

const models = {
  Product,
  Sale,
  Alert,
};

// Run `.associate()` if defined
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = require("sequelize");

module.exports = models;