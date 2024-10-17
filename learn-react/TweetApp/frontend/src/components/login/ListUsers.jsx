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
      <CustomButton onClick={handleMarkAsAdmin} disabled={isAdmin}>
        Mark As Admin
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
    <div>
      <h2>List of Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Actions</th>
            {/* Add more user attributes as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>
                <MarkAsAdminButton userId={user._id}/>
              </td>
              {/* Render additional user attributes here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
