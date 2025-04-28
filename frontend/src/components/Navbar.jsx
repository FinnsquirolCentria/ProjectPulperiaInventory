import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-title">Pulpería Inventory</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/users">Login/Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;