// import React from "react";
// import { getComponentForType } from "./getComponentForType";

// interface ComponentConfig {
//   componentType: string;
//   props: Record<string, any>;
// }

// const DynamicRenderer: React.FC<{ config: ComponentConfig[] }> = ({ config }) => {
//   return (
//     <div className="space-y-4">
//       {config.map((component, index) => {
//         const Component = getComponentForType(component.componentType);

//         if (!Component) {
//           return <p key={index} className="text-red-500">⚠ Unknown component: {component.componentType}</p>;
//         }

//         return <Component key={index} {...component.props} />;
//       })}
//     </div>
//   );
// };

// export default DynamicRenderer;
