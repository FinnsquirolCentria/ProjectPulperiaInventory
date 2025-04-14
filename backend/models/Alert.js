const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the Alert model for the alerts table in the database
const Alert = sequelize.define("Alert", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("unread", "read"),
    allowNull: false,
    defaultValue: "unread",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "alerts",
  timestamps: true,
});

Alert.associate = (models) => {
  Alert.belongsTo(models.Product, { foreignKey: "productId" });
};

module.exports = Alert;