import StoreStatus from "./StoreStatus";
import Navbar from "../components/NavBar"; // Import the Navbar component

const MainPage = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <section className="overview">
        <h2>Welcome to Pulpería Inventory Management</h2>
        <p>
          Manage your pulpería efficiently with our inventory system. Track sales, manage products, and locate nearby stores with ease.
        </p>
      </section>

      <section className="store-locator">
        <h2>Store Locator</h2>
        <p>Find nearby pulperías on the map below:</p>
        <StoreStatus />
      </section>

      <footer className="footer">
        <p>&copy; 2025 Pulpería Inventory Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;