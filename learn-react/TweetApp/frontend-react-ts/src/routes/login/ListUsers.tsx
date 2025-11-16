import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import CustomButton from "../../common/components/custom-button/CustomButton";

function MarkAsAdminButton({ userId }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMarkAsAdmin = () => {
    // Make an HTTP request to update the user's role to "Admin"
    axios
      .put(`${BACKEND_APPLICATION_BASE_URL}/api/users/${userId}/admin`)
      .then((response) => {
        // Handle the successful update
        console.log("User marked as Admin:", response.data);
        setIsAdmin(true); // Update the local state to reflect the change
      })
      .catch((error) => {
        console.error("Error marking user as Admin:", error);
      });
  };

  return (
    <div>
      <CustomButton 
        onClick={handleMarkAsAdmin} 
        disabled={isAdmin}
        className={isAdmin ? "opacity-50 cursor-not-allowed" : ""}
      >
        {isAdmin ? "Already Admin" : "Mark As Admin"}
      </CustomButton>
    </div>
  );
}

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from your backend API
    axios
      .get(`${BACKEND_APPLICATION_BASE_URL}/api/users`)
      .then((response) => {
        const userList = response.data;
        setUsers(userList);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">List of Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">User ID</th>
              <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Username</th>
              <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-700">{user._id}</td>
                  <td className="p-3 text-gray-700 font-medium">{user.username}</td>
                  <td className="p-3">
                    <MarkAsAdminButton userId={user._id}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUsers;
