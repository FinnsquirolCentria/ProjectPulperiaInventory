import { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [timeFilter, setTimeFilter] = useState("day");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSalesReports();
  }, [timeFilter]);

  const fetchSalesReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/sales/reports?timeFilter=${timeFilter}`
      );
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales reports:", error);
    }
  };

  const exportToCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Product Name,Total Quantity,Total Revenue"]
        .concat(
          data.map(
            (item) =>
              `${item.productName},${item.totalQuantity},${item.totalRevenue}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="reports">
      <h2>Sales Reports</h2>
      <div className="filter-container">
        <label htmlFor="timeFilter">Timeframe:</label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.length > 0 ? (
            salesData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.totalRevenue}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No data available for the selected timeframe.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn-primary" onClick={() => exportToCSV(salesData)}>
        Export to CSV
      </button>
    </div>
  );
};

export default Reports;