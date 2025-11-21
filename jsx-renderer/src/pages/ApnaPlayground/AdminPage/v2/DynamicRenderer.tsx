import React from "react";
import WrapperComponent from "./WrapperComponent";
import { ComponentProps } from "./components";

interface DynamicRendererProps {
  config: ComponentProps[];
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ config }) => {
  return (
    <div className="space-y-4">
      {config.map((component, index) => (
        <WrapperComponent key={index} {...component} />
      ))}
    </div>
  );
};

export default DynamicRenderer;
