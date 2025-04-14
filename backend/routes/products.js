const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, stock, price } = req.body;
    const product = await Product.create({ name, stock, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

//  Update product stock by ID
router.put("/:id", async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.stock = stock;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product stock", error });
  }
});


// Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
