// import React, { useState } from "react";
// import Breadcrumb2 from "./breadcrumbs/Breadcrumb2";
// import ComparisonContainer from "./comparisons/ComparisonContainer";
// import ComparisonTableContainer from "./comparisons/ComparisonTableContainer";
// import { MainComponent as ArrowConnectorExample } from "../../components/miscelleneous/ArrowConnectorExamples";
// import CountFullStopLines from "../../components/miscelleneous/CountFullStopLines";
// import DisplayData from "../../components/miscelleneous/DisplayData";
// import GoldRateCalculator from "../../components/miscelleneous/GoldRateCalculator";
// import StudentList from "../../components/miscelleneous/StudentList";

// const tabButtonStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   cursor: "pointer",
// };

// const TabNames = {
//   goldRateCalculator: "goldRateCalculator",
//   comparisonContainer: "ComparisonContainer",
//   comparisonTableContainer: "ComparisonTableContainer",
//   studentListContainer: "studentListContainer",
//   breadCrumbContainer: "breadCrumbContainer",
//   CountFullStopLines: "CountFullStopLines",
//   DisplayData: "DisplayData",
//   ArrowConnectorExample: "ArrowConnectorExample",
// };

/**
 * 
 * This component has been moved to ApnaPlayground
 * 
 * */ 

// function SettingDashboard() {
//   const [activeTab, setActiveTab] = useState(TabNames.goldRateCalculator);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const students = [
//     {
//       id: 1,
//       name: "John Doe",
//       address: "123 Main St, Cityville",
//       age: 20,
//       major: "Computer Science",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       address: "456 Elm St, Townsville",
//       age: 22,
//       major: "Mathematics",
//     },
//     {
//       id: 3,
//       name: "Alice Johnson",
//       address: "789 Oak St, Villagetown",
//       age: 21,
//       major: "Physics",
//     },
//   ];

//   return (
//     <div style={{ paddingLeft: "20px" }}>
//       <h2>Setting Dashboard</h2>
//       <div style={{ display: "flex", gap: "10px", paddingLeft: "10px" }}>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.goldRateCalculator ? "#007bff" : "white",
//             color:
//               activeTab === TabNames.goldRateCalculator ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.goldRateCalculator)}
//         >
//           GoldRate Calculator
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.comparisonContainer ? "#007bff" : "white",
//             color:
//               activeTab === TabNames.comparisonContainer ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.comparisonContainer)}
//         >
//           Comparison Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.comparisonTableContainer
//                 ? "#007bff"
//                 : "white",
//             color:
//               activeTab === TabNames.comparisonTableContainer
//                 ? "white"
//                 : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.comparisonTableContainer)}
//         >
//           Comparison Table Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.studentListContainer ? "#007bff" : "white",
//             color:
//               activeTab === TabNames.studentListContainer ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.studentListContainer)}
//         >
//           Student List Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.breadCrumbContainer ? "#007bff" : "white",
//             color:
//               activeTab === TabNames.breadCrumbContainer ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.breadCrumbContainer)}
//         >
//           BreadCrumb Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.CountFullStopLines ? "#007bff" : "white",
//             color:
//               activeTab === TabNames.CountFullStopLines ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.CountFullStopLines)}
//         >
//           CountFullStopLines Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.DisplayData ? "#007bff" : "white",
//             color: activeTab === TabNames.DisplayData ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.DisplayData)}
//         >
//           DisplayData Container
//         </button>
//         <button
//           style={{
//             ...tabButtonStyle,
//             background:
//               activeTab === TabNames.ArrowConnectorExample
//                 ? "#007bff"
//                 : "white",
//             color:
//               activeTab === TabNames.ArrowConnectorExample ? "white" : "black",
//           }}
//           onClick={() => handleTabChange(TabNames.ArrowConnectorExample)}
//         >
//           ArrowConnectorExample Container
//         </button>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         {activeTab === TabNames.goldRateCalculator && <GoldRateCalculator />}
//         {activeTab === TabNames.comparisonContainer && <ComparisonContainer />}
//         {activeTab === TabNames.comparisonTableContainer && (
//           <ComparisonTableContainer />
//         )}
//         {activeTab === TabNames.studentListContainer && (
//           <StudentList students={students} />
//         )}
//         {activeTab === TabNames.breadCrumbContainer && <Breadcrumb2 />}
//         {activeTab === TabNames.CountFullStopLines && <CountFullStopLines />}
//         {activeTab === TabNames.DisplayData && <DisplayData />}
//         {activeTab === TabNames.ArrowConnectorExample && (
//           <ArrowConnectorExample />
//         )}
//       </div>
//     </div>
//   );
// }

// export default SettingDashboard;
