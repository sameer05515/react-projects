import React, { useState } from "react";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="block mb-4">
          <label htmlFor="name" className="block font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="email" className="block font-bold mb-2">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="username" className="block font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="password" className="block font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="mobileNumber" className="block font-bold mb-2">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {passwordError && <div className="text-red-600 mb-2">{passwordError}</div>}
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors mb-4"
        >
          Register
        </button>
        <div>
          {/* Link to the login page */}
          <p>
            Already have an account? <NavLink to="/login" className="text-blue-600 hover:underline">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
