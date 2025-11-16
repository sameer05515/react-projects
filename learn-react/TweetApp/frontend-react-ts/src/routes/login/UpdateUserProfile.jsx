import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { getUserIdFromToken } from "../../common/service/authService";
import CustomButton from "../../common/components/custom-button/CustomButton";

function UpdateUserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user's profile data
    const userId = getUserIdFromToken(); // Implement this function to get the user's ID from the token
    if (userId) {
      axios
        .get(`${BACKEND_APPLICATION_BASE_URL}/api/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            mobileNumber: response.data.mobileNumber,
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    const userId = getUserIdFromToken(); // Implement this function to get the user's ID from the token
    if (userId) {
      // Make an HTTP request to update the user's profile
      axios
        .put(`${BACKEND_APPLICATION_BASE_URL}/api/users/${userId}`, formData)
        .then((response) => {
          // Handle the successful update
          console.log("User profile updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
        });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Update Your Profile</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="mobileNumber" className="block font-semibold mb-2 text-gray-700">
            Mobile Number:
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6">
          <CustomButton type="button" onClick={handleUpdateProfile}>
            Update Profile
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserProfile;
