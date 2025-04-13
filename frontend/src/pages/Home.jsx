import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [salesSummary, setSalesSummary] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    fetchSalesSummary();
    fetchLowStockAlerts();
    fetchTopSellingProducts();
  }, []);

  const fetchSalesSummary = async () => {
    // Fetch sales summary data from the backend
    try {
      const response = await axios.get("http://localhost:5000/api/sales/summary");
      setSalesSummary(response.data);
    } catch (error) {
      console.error("Error fetching sales summary:", error);
    }
  };

  const fetchLowStockAlerts = async () => {
    // Fetch low stock alerts from the backend
    try {
      const response = await axios.get("http://localhost:5000/api/products/low-stock");
      setLowStockAlerts(response.data);
    } catch (error) {
      console.error("Error fetching low stock alerts:", error);
    }
  };

  const fetchTopSellingProducts = async () => {
    // Fetch top-selling products from the backend
    try {
      const response = await axios.get("http://localhost:5000/api/products/top-selling");
      setTopSellingProducts(response.data);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Sales Summary</h2>
      <ul>
        {salesSummary.map((sale) => (
          <li key={sale.id}>{sale.description}: {sale.total}</li>
        ))}
      </ul>

      <h2>Low Stock Alerts</h2>
      <ul>
        {lowStockAlerts.map((alert) => (
          <li key={alert.productId}>{alert.message}</li>
        ))}
      </ul>

      <h2>Top Selling Products</h2>
      <ul>
        {topSellingProducts.map((product) => (
          <li key={product.id}>{product.name}: {product.salesCount} sold</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;