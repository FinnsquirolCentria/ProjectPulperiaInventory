const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sale = sequelize.define(
  "Sale",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow NULL when the product is deleted
      references: {
        model: "products",
        key: "id",
      },
    },
    productName: {
      type: DataTypes.STRING, // Add this column to store the product name
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "sales",
    timestamps: true,
  }
);

Sale.associate = (models) => {
  Sale.belongsTo(models.Product, {
    foreignKey: "productId",
    onDelete: "SET NULL", // Set productId to NULL when the product is deleted
  });
};

module.exports = Sale;