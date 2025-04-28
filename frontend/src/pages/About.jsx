import Navbar from "../components/NavBar"; // Import the Navbar component

const About = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="about-page">
        <h1>About Us</h1>
        <p>
          Pulpería Inventory Management is a system designed to help small businesses manage their inventory, track sales, and locate nearby stores. Our mission is to empower pulpería owners with the tools they need to succeed.
        </p>
      </div>
    </div>
  );
};

export default About;