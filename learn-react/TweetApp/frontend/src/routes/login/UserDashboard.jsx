import React, { useState } from "react";
import UpdateUserProfile from "./UpdateUserProfile"; // Import the UpdateUserProfile component
import ListUsers from "./ListUsers";

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
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <div className="flex gap-2.5">
        <button
          className={`px-2.5 py-2.5 border border-gray-300 cursor-pointer rounded transition-colors ${
            activeTab === TabNames.listUsers 
              ? "bg-blue-600 text-white" 
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => handleTabChange(TabNames.listUsers)}
        >
          List Users
        </button>
        <button
          className={`px-2.5 py-2.5 border border-gray-300 cursor-pointer rounded transition-colors ${
            activeTab === TabNames.updateProfile 
              ? "bg-blue-600 text-white" 
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => handleTabChange(TabNames.updateProfile)}
        >
          Update Profile
        </button>
      </div>
      <div className="mt-2.5">
        {activeTab === TabNames.listUsers && <ListUsers />}
        {activeTab === TabNames.updateProfile && <UpdateUserProfile />}
      </div>
    </div>
  );
}

export default UserDashboard;
