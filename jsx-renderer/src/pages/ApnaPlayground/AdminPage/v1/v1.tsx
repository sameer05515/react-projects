// import React, { useState } from "react";
// import DynamicRenderer from "./DynamicRenderer";
// import prepareErrorMessage from "../../../common/utils/prepareErrorMessage";

// const AdminPage: React.FC = () => {
//   const [jsonInput, setJsonInput] = useState<string>(
//     JSON.stringify(
//       [
//         { componentType: "Heading", props: { text: "Welcome to Admin Page" } },
//         {
//           componentType: "Card",
//           props: {
//             title: "Admin Feature",
//             content: "This is a dynamically created card.",
//           },
//         },
//         {
//           componentType: "Button",
//           props: { label: "Click Me", onClick: () => alert("Hello!") },
//         },
//       ],
//       null,
//       2
//     )
//   );

//   const [config, setConfig] = useState<unknown[]>([]);

//   const handleRender = () => {
//     try {
//       const parsedConfig = JSON.parse(jsonInput);
//       setConfig(parsedConfig);
//     } catch (error) {
//       console.error(prepareErrorMessage(error));
//     }
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <textarea
//         className="w-full p-2 border rounded-md"
//         rows={6}
//         value={jsonInput}
//         onChange={(e) => setJsonInput(e.target.value)}
//       />
//       <button
//         className="px-4 py-2 bg-green-500 text-white rounded-md"
//         onClick={handleRender}
//       >
//         Render Components
//       </button>

//       <DynamicRenderer config={config} />
//     </div>
//   );
// };

// export default AdminPage;
