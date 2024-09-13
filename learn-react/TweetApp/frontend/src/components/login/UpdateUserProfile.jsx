import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { getUserIdFromToken } from "../../common/service/authService";
import CustomButton from "../../common/components/CustomButton";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Your Profile</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <CustomButton type="button" onClick={handleUpdateProfile}>
          Update Profile
        </CustomButton>
      </form>
    </div>
  );
}

export default UpdateUserProfile;
