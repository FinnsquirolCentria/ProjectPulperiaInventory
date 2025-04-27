const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");
const sequelize = require("./config/database");
const storeRoutes = require("./routes/stores");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic route (test)
app.get("/", (req, res) => {
  res.send("Pulpería Inventory API is running");
});

// Product routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Sales routes for fetching
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

// Sales routes for updating
app.post("/api/sales", async (req, res) => {
  try {
    const { productId, quantity, totalPrice } = req.body;

    // Fetch the product name
    const product = await models.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create the sale with the product name
    const sale = await models.Sale.create({
      productId,
      productName: product.name, // Store the product name
      quantity,
      totalPrice,
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: "Failed to record sale", err });
  }
});

// Dashboard routes
app.get("/api/sales/summary", async (req, res) => {
  const { timeFilter } = req.query;

  // Determine the date range based on the timeFilter
  let startDate;
  const endDate = new Date(); // Current date
  switch (timeFilter) {
    case "day":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 1); // Last 24 hours
      break;
    case "week":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7); // Last 7 days
      break;
    case "month":
      startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 1); // Last month
      break;
    case "year":
      startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1); // Last year
      break;
    default:
      startDate = null; // No filtering
  }

  try {
    // Build the where clause for filtering by date
    const whereClause = startDate
      ? { createdAt: { [models.Sequelize.Op.between]: [startDate, endDate] } }
      : {};

    // Fetch sales data with optional date filtering
    const summary = await models.Sale.findAll({
      where: whereClause,
      attributes: [
        "productName", // Use productName directly
        [sequelize.fn("SUM", sequelize.col("totalPrice")), "totalRevenue"],
      ],
      group: ["productName"], // Group by productName
      order: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "DESC"]],
    });

    res.json(
      summary.map((item) => ({
        productName: item.productName,
        totalRevenue: parseFloat(item.dataValues.totalRevenue),
      }))
    );
  } catch (err) {
    console.error("Error fetching sales summary:", err);
    res.status(500).json({ error: "Failed to fetch sales summary", err });
  }
});

// Fetch low stock products
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
        message: `${product.name} is running low on stock (${product.stock} units left). Consider restocking.`,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch low stock alerts", err });
  }
});

// Fetch top-selling products
app.get("/api/products/top-selling", async (req, res) => {
  try {
    const topSelling = await models.Sale.findAll({
      attributes: [
        "productId",
        [sequelize.fn("SUM", sequelize.col("quantity")), "salesCount"],
      ],
      where: {
        productId: { [models.Sequelize.Op.ne]: null }, // Exclude sales with NULL productId
      },
      group: ["productId"],
      order: [[sequelize.fn("SUM", sequelize.col("quantity")), "DESC"]],
      limit: 5,
      include: [{ model: models.Product, attributes: ["name"] }],
    });
    res.json(
      topSelling.map((sale) => ({
        id: sale.productId,
        name: sale.Product?.name || "Unknown", // Handle missing product gracefully
        salesCount: sale.dataValues.salesCount,
      }))
    );
  } catch (err) {
    console.error("Error fetching top-selling products:", err); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch top-selling products", err });
  }
});

// Sales routes for deleting base on ID
app.delete("/api/sales/:id", async (req, res) => {
  try {
    const sale = await models.Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    await sale.destroy();
    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete sale", err });
  }
});

// Sales reports route
app.get("/api/sales/reports", async (req, res) => {
  const { timeFilter, productId } = req.query;

  // Determine the date range based on the timeFilter
  let startDate;
  const endDate = new Date();
  switch (timeFilter) {
    case "day":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 1);
      break;
    case "week":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "month":
      startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "year":
      startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      startDate = null;
  }

  try {
    const whereClause = startDate
      ? { createdAt: { [models.Sequelize.Op.between]: [startDate, endDate] } }
      : {};

    if (productId) {
      whereClause.productId = productId;
    }

    const sales = await models.Sale.findAll({
      where: whereClause,
      attributes: [
        "productName",
        [sequelize.fn("SUM", sequelize.col("quantity")), "totalQuantity"],
        [sequelize.fn("SUM", sequelize.col("totalPrice")), "totalRevenue"],
      ],
      group: ["productName"],
      order: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "DESC"]],
    });

    res.json(
      sales.map((sale) => ({
        productName: sale.productName,
        totalQuantity: parseInt(sale.dataValues.totalQuantity),
        totalRevenue: parseFloat(sale.dataValues.totalRevenue),
      }))
    );
  } catch (err) {
    console.error("Error fetching sales reports:", err);
    res.status(500).json({ error: "Failed to fetch sales reports" });
  }
});

app.use("/api/stores", storeRoutes);

//  Database connection and server start
sequelize
  .sync({ alter: true }) // use { force: true } to reset tables
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });