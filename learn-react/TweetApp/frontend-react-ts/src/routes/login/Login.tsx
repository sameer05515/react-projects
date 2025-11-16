import React, { useState } from 'react';
import CustomButton from '../../common/components/custom-button/CustomButton';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, you can add the code to perform login/authentication.
    // You can send the formData to your server for validation.
    console.log('Login data submitted:', formData);
  };

  return (
    <div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <CustomButton type="submit" className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors">
          Login
        </CustomButton>
      </form>
    </div>
  );
};

export default Login;
