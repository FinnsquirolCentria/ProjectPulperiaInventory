import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [salesData, setSalesData] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSalesReports();
    fetchLowStockAlerts();
  }, []);

  const fetchSalesReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales/reports");
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales reports:", error);
      setError("Failed to fetch sales reports. Please try again later.");
    } finally {
      setLoading(false);
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

  const exportToCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,Product,Quantity Sold,Total Revenue"]
        .concat(
          data.map(
            (sale) =>
              `${new Date(sale.date).toLocaleDateString()},${sale.productName},${sale.quantity},${sale.totalPrice.toFixed(
                2
              )}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_reports.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Sales Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>{sale.productName || "Unknown"}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice.toFixed(2)} C$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => exportToCSV(salesData)}>Download to CSV</button>

      <h2>Low Stock Alerts</h2>
      {lowStockAlerts.length > 0 ? (
        <ul>
          {lowStockAlerts.map((alert) => (
            <li key={alert.productId}>{alert.message}</li>
          ))}
        </ul>
      ) : (
        <p>No low stock alerts at the moment. All products are sufficiently stocked!</p>
      )}
    </div>
  );
};

export default Reports;