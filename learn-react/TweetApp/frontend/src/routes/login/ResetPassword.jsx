import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

function ResetPassword() {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        `${BACKEND_APPLICATION_BASE_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to reset password");
      }

      toast.success(data?.message || "Password reset successful");
      setFormData({
        username: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.message || "Unable to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xs mx-auto p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="block mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="newPassword" className="block font-bold mb-2">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="block mb-4">
          <label htmlFor="confirmPassword" className="block font-bold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 px-4 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700 transition-colors mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>

        <p>
          Back to{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
