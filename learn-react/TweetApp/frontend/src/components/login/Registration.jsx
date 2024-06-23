import React, { useState } from "react";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

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

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset password error when the user makes changes
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Check if the password contains a capital letter and alphanumeric characters
    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!passwordRegex.test(formData.password)) {
      setPasswordError("Password must contain a capital letter and alphanumeric characters");
      toast.error("Password must contain a capital letter and alphanumeric characters");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_APPLICATION_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        // Registration successful
        console.log("User registered successfully");
        toast.success("User registered successfully");
        // Redirect or show a success message
      } else {
        // Registration failed
        const data = await response.json();
        console.error("Registration error:", data.message);
        toast.error(`Registration error: ${data.message}`);
        // Show an error message to the user
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(`Error registering user: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={labelStyle}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={labelStyle}>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <button type="submit" style={buttonStyle}>
          Register
        </button>
        <div>
          {/* Link to the login page */}
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
