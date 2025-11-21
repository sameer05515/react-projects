import React, { useState } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { NavLink, useNavigate } from "react-router-dom";

type LoginUserProps = {
  onLogin?: () => void;
};

function LoginUser({ onLogin }: LoginUserProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // navigate("/tweet-base");
      onLogin && onLogin();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure, show error message, etc.
    }
  };

  return (
    <div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form>
        <div className="block mb-4">
          <label htmlFor="username" className="block font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <button 
            type="button" 
            onClick={handleLogin} 
            className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
        <div>
          {/* Link to the registration page */}
          <p>
            New User? <NavLink to="/register" className="text-blue-600 hover:underline">Sign Up</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
