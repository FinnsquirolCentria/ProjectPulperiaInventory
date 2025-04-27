import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Home = () => {
  const [salesSummary, setSalesSummary] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("day");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchSalesSummary();
    fetchLowStockAlerts();
    fetchTopSellingProducts();
  }, [timeFilter]);

  useEffect(() => {
    renderChart();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesSummary, chartType]);

  const fetchSalesSummary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales/summary");
      setSalesSummary(response.data);
    } catch (error) {
      console.error("Error fetching sales summary:", error);
    }
  };

  const fetchLowStockAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/low-stock");
      setLowStockAlerts(response.data);
    } catch (error) {
      console.error("Error fetching low stock alerts:", error);
    }
  };

  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/top-selling");
      setTopSellingProducts(response.data);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
    }
  };

  const renderChart = () => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

    chartInstance.current = new Chart(chartRef.current, {
      type: chartType,
      data: {
        labels: salesSummary.map((sale) => sale.productName), // Use product names as labels
        datasets: [
          {
            label: `Total Revenue: ${salesSummary.reduce((sum, sale) => sum + sale.totalRevenue, 0).toFixed(2)} C$ (${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)})`,
            data: salesSummary.map((sale) => sale.totalRevenue), // Use total revenue as data
            backgroundColor: colors,
            borderColor: colors.map((color) => color),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => `Revenue: ${context.raw.toFixed(2)} C$`,
            },
          },
        },
        scales: chartType === "bar" || chartType === "line" ? {
          x: {
            title: {
              display: true,
              text: "Product",
            },
          },
          y: {
            title: {
              display: true,
              text: "Revenue (C$)",
            },
            beginAtZero: true,
          },
        } : undefined,
      },
    });
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <h2>Sales Summary</h2>
      <div className="chart-controls">
        <label>Choose Diagram: </label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>

        <label> Filter By:</label>
        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>

      <h2>Low Stock Alerts</h2>
      {lowStockAlerts.length > 0 ? (
        <ul className="alerts">
          {lowStockAlerts.map((alert) => (
            <li key={alert.productId}>{alert.message}</li>
          ))}
        </ul>
      ) : (
        <p>No low stock alerts at the moment. All products are sufficiently stocked!</p>
      )}

      <h2>Top Selling Products</h2>
      {topSellingProducts.length > 0 ? (
        <ul className="top-products">
          {topSellingProducts.map((product) => (
            <li key={product.id}>
              <b>{product.name}:</b> {product.salesCount} sold
            </li>
          ))}
        </ul>
      ) : (
        <p>No top-selling products yet. Start recording sales to see the top performers!</p>
      )}

      <h2>Recent Sales Activity</h2>
      <ul>
        {salesSummary.map((sale) => (
          <li key={sale.productName}>
            {sale.productName}: {sale.totalRevenue.toFixed(2)} C$ in revenue
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;