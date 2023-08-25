import React, { useState } from "react";
import UpdateUserProfile from "./UpdateUserProfile"; // Import the UpdateUserProfile component
import ListUsers from "./ListUsers";

const tabButtonStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const TabNames = {
  listUsers:"listUsers",
  updateProfile:"updateProfile"
}

function UserDashboard() {
  const [activeTab, setActiveTab] = useState(TabNames.listUsers);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            ...tabButtonStyle,
            background: activeTab === TabNames.listUsers ? "#007bff" : "white",
            color: activeTab === TabNames.listUsers ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.listUsers)}
        >
          List Users
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background: activeTab === TabNames.updateProfile ? "#007bff" : "white",
            color: activeTab === TabNames.updateProfile ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.updateProfile)}
        >
          Update Profile
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {activeTab === TabNames.listUsers && <ListUsers />}
        {activeTab === TabNames.updateProfile && <UpdateUserProfile />}
      </div>
    </div>
  );
}

export default UserDashboard;
