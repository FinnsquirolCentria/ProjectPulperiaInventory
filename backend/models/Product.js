const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Product model for the products table in the database
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restockThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

Product.associate = (models) => {
  Product.hasMany(models.Sale, { foreignKey: "productId" }); // A product can have many sales
  Product.hasMany(models.Alert, { foreignKey: "productId" }); // A product can have many alerts
};

module.exports = Product;