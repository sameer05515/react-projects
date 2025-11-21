import React, { useState } from "react";
import Breadcrumb2 from "./breadcrumbs/Breadcrumb2";
import ComparisonContainer from "./comparisons/ComparisonContainer";
import ComparisonTableContainer from "./comparisons/ComparisonTableContainer";
import ArrowConnectorExamplesDashboard from "./ArrowConnectorExamples/Dashboard";
import CountFullStopLines from "./CountFullStopLines/v1";
import DisplayData from "./DisplayData/v1";
import GoldRateCalculator from "./GoldRateCalculator/v1";
import StudentList from "./StudentList/v1";

const TabNames = {
  goldRateCalculator: "goldRateCalculator",
  comparisonContainer: "ComparisonContainer",
  comparisonTableContainer: "ComparisonTableContainer",
  studentListContainer: "studentListContainer",
  breadCrumbContainer: "breadCrumbContainer",
  CountFullStopLines: "CountFullStopLines",
  DisplayData: "DisplayData",
  ArrowConnectorExample: "ArrowConnectorExample",
};

function SettingDashboard() {
  const [activeTab, setActiveTab] = useState(TabNames.goldRateCalculator);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const students = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Cityville",
      age: 20,
      major: "Computer Science",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, Townsville",
      age: 22,
      major: "Mathematics",
    },
    {
      id: 3,
      name: "Alice Johnson",
      address: "789 Oak St, Villagetown",
      age: 21,
      major: "Physics",
    },
  ];

  const tabButtons = [
    { key: TabNames.goldRateCalculator, label: "GoldRate Calculator" },
    { key: TabNames.comparisonContainer, label: "Comparison Container" },
    { key: TabNames.comparisonTableContainer, label: "Comparison Table Container" },
    { key: TabNames.studentListContainer, label: "Student List Container" },
    { key: TabNames.breadCrumbContainer, label: "BreadCrumb Container" },
    { key: TabNames.CountFullStopLines, label: "CountFullStopLines Container" },
    { key: TabNames.DisplayData, label: "DisplayData Container" },
    { key: TabNames.ArrowConnectorExample, label: "ArrowConnectorExample Container" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Settings Dashboard</h2>
      <div className="flex flex-wrap gap-2.5 mb-4">
        {tabButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-4 py-2 rounded border border-gray-300 cursor-pointer transition-colors text-sm font-medium ${
              activeTab === key
                ? "bg-blue-600 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-2.5 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === TabNames.goldRateCalculator && <GoldRateCalculator />}
        {activeTab === TabNames.comparisonContainer && <ComparisonContainer additionalProp={undefined} />}
        {activeTab === TabNames.comparisonTableContainer && <ComparisonTableContainer />}
        {activeTab === TabNames.studentListContainer && <StudentList students={students} />}
        {activeTab === TabNames.breadCrumbContainer && <Breadcrumb2 />}
        {activeTab === TabNames.CountFullStopLines && <CountFullStopLines />}
        {activeTab === TabNames.DisplayData && <DisplayData />}
        {activeTab === TabNames.ArrowConnectorExample && <ArrowConnectorExamplesDashboard />}
      </div>
    </div>
  );
}

export default SettingDashboard;
