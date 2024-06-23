import React, { useState } from "react";
import TagList from "./tags/TagList";
import GoldRateCalculator from "../miscelleneous/GoldRateCalculator";
import ComparisonContainer from "../comparisons/ComparisonContainer";
import ComparisonTableContainer from "../comparisons/ComparisonTableContainer";
import StudentList from "../miscelleneous/StudentList";
import Breadcrumb2 from "../../common/components/Breadcrumb2";

const tabButtonStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const TabNames = {
  listUsers: "tags",
  goldRateCalculator: "goldRateCalculator",
  comparisonContainer: "ComparisonContainer",
  comparisonTableContainer: "ComparisonTableContainer",
  studentListContainer: "studentListContainer",
  breadCrumbContainer: "breadCrumbContainer"
  //   updateProfile:"updateProfile"
};

function SettingDashboard() {
  const [activeTab, setActiveTab] = useState(TabNames.listUsers);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const students= [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Cityville",
      age: 20,
      major: "Computer Science"
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, Townsville",
      age: 22,
      major: "Mathematics"
    },
    {
      id: 3,
      name: "Alice Johnson",
      address: "789 Oak St, Villagetown",
      age: 21,
      major: "Physics"
    }
  ];

  return (
    <div>
      <h2>Setting Dashboard</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            ...tabButtonStyle,
            background: activeTab === TabNames.listUsers ? "#007bff" : "white",
            color: activeTab === TabNames.listUsers ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.listUsers)}
        >
          Tags
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background:
              activeTab === TabNames.goldRateCalculator ? "#007bff" : "white",
            color:
              activeTab === TabNames.goldRateCalculator ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.goldRateCalculator)}
        >
          GoldRate Calculator
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background:
              activeTab === TabNames.comparisonContainer ? "#007bff" : "white",
            color:
              activeTab === TabNames.comparisonContainer ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.comparisonContainer)}
        >
          Comparison Container
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background:
              activeTab === TabNames.comparisonTableContainer ? "#007bff" : "white",
            color:
              activeTab === TabNames.comparisonTableContainer ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.comparisonTableContainer)}
        >
          Comparison Table Container
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background:
              activeTab === TabNames.studentListContainer ? "#007bff" : "white",
            color:
              activeTab === TabNames.studentListContainer ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.studentListContainer)}
        >
          Student List Container
        </button>
        <button
          style={{
            ...tabButtonStyle,
            background:
              activeTab === TabNames.breadCrumbContainer ? "#007bff" : "white",
            color:
              activeTab === TabNames.breadCrumbContainer ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.breadCrumbContainer)}
        >
          BreadCrumb Container
        </button>
        {/* <button
          style={{
            ...tabButtonStyle,
            background: activeTab === TabNames.updateProfile ? "#007bff" : "white",
            color: activeTab === TabNames.updateProfile ? "white" : "black",
          }}
          onClick={() => handleTabChange(TabNames.updateProfile)}
        >
          Update Profile
        </button> */}
      </div>
      <div style={{ marginTop: "10px" }}>
        {activeTab === TabNames.listUsers && <TagList />}
        {activeTab === TabNames.goldRateCalculator && <GoldRateCalculator />}
        {activeTab === TabNames.comparisonContainer && <ComparisonContainer />}
        {activeTab === TabNames.comparisonTableContainer && <ComparisonTableContainer />}
        {activeTab === TabNames.studentListContainer && <StudentList students={students} />}
        {activeTab === TabNames.breadCrumbContainer && <Breadcrumb2 />}
      </div>
    </div>
  );
}

export default SettingDashboard;
