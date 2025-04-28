import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and other user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("You have been logged out.");
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      <h2>Pulpería Inventory</h2>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <img src="/icons/home.png" alt="Home" className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/products">
              <img src="/icons/products.png" alt="Products" className="icon" />
              Products
            </Link>
          </li>
          <li>
            <Link to="/sales">
              <img src="/icons/sales.png" alt="Sales" className="icon" />
              Sales
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <img src="/icons/report.png" alt="Reports" className="icon" />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/stores">
              <img src="/icons/stores.png" alt="Stores" className="icon" />
              Store Status
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              <img src="/icons/logout.png" alt="Logout" className="icon" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;