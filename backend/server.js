const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const sequelize = require("./config/database");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic Route (test)
app.get("/", (req, res) => {
  res.send("Pulpería Inventory API is running ✅");
});

// Product Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Sales Routes
app.get("/api/sales", async (req, res) => {
  try {
    const sales = await models.Sale.findAll({
      include: [{ model: models.Product, attributes: ["name"] }],
    });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales", err });
  }
});

app.post("/api/sales", async (req, res) => {
  try {
    const { productId, quantity, totalPrice } = req.body;
    const sale = await models.Sale.create({ productId, quantity, totalPrice });
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: "Failed to record sale", err });
  }
});

// Dashboard Routes
app.get("/api/sales/summary", async (req, res) => {
  try {
    const summary = await models.Sale.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("totalPrice")), "total"],
        [sequelize.fn("DATE", sequelize.col("date")), "date"],
      ],
      group: ["date"],
    });
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales summary", err });
  }
});

app.get("/api/products/low-stock", async (req, res) => {
  try {
    const lowStockProducts = await models.Product.findAll({
      where: {
        stock: { [models.Sequelize.Op.lte]: sequelize.col("restockThreshold") },
      },
    });
    res.json(
      lowStockProducts.map((product) => ({
        productId: product.id,
        message: `${product.name} is running low on stock (${product.stock} units left).`,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch low stock alerts", err });
  }
});

app.get("/api/products/top-selling", async (req, res) => {
  try {
    const topSelling = await models.Sale.findAll({
      attributes: [
        "productId",
        [sequelize.fn("SUM", sequelize.col("quantity")), "salesCount"],
      ],
      group: ["productId"],
      order: [[sequelize.fn("SUM", sequelize.col("quantity")), "DESC"]],
      limit: 5,
      include: [{ model: models.Product, attributes: ["name"] }],
    });
    res.json(
      topSelling.map((sale) => ({
        id: sale.productId,
        name: sale.Product.name,
        salesCount: sale.dataValues.salesCount,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top-selling products", err });
  }
});

// Database Sync
sequelize
  .sync({ alter: true }) // use { force: true } to reset tables
  .then(() => {
    console.log("✅ Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to sync database:", error);
  });