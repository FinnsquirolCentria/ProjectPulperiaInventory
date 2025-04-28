import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavBar"; // Import the Navbar component

const Users = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "owner", // Default role for registration
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role); // Store the user's role
        alert("Login successful!");
        navigate("/home"); // Redirect to the Home Page
      } else {
        // Registration logic
        const response = await axios.post("http://localhost:5000/api/users/register", formData);
        localStorage.setItem("token", response.data.token); // Store the token after registration
        localStorage.setItem("role", response.data.role); // Store the user's role
        alert("Registration successful!");
        navigate("/home"); // Redirect to the Home Page
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <div className="user-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label>Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="owner">Owner</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Users;