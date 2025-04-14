import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Pulpería Inventory</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">
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
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;