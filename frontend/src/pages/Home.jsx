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
      const response = await axios.get(`http://localhost:5000/api/sales/summary?filter=${timeFilter}`);
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
        labels: salesSummary.map((sale) => sale.date),
        datasets: [
          {
            label: "Total Revenue",
            data: salesSummary.map((sale) => sale.total),
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
              text: "Date",
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
      <ul className="alerts">
        {lowStockAlerts.map((alert) => (
          <li key={alert.productId}>{alert.message}</li>
        ))}
      </ul>

      <h2>Top Selling Products</h2>
      <ul className="top-products">
        {topSellingProducts.map((product) => (
          <li key={product.id}>
            {product.name}: {product.salesCount} sold
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;