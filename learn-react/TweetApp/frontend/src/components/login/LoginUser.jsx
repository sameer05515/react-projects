import React, { useState } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";
import { NavLink, useNavigate } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: "300px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f5f5f5",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
};

function LoginUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_APPLICATION_BASE_URL}/api/users/login`,
        formData
      );
      const token = response.data.token;

      // Store the token in localStorage or a state management solution like Redux
      localStorage.setItem("token", token);

      // Redirect to a protected route or perform other actions
      //   history.push('/dashboard'); // Change '/dashboard' to your desired protected route
      navigate("/tweet-base");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, show error message, etc.
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form>
        <div style={labelStyle}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
        <div>
          <button type="button" onClick={handleLogin} style={buttonStyle}>
            Login
          </button>
        </div>
        <div>
          {/* Link to the registration page */}
          <p>
            New User? <NavLink to="/register">Sign Up</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
