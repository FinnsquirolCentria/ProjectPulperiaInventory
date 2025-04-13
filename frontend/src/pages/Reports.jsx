import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSalesReports();
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
              <td>{sale.Product?.name || "Unknown"}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice.toFixed(2)} C$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;