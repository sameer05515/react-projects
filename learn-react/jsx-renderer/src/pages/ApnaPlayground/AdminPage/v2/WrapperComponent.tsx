import React from "react";
import { Card, Button, Heading, type ComponentProps } from "./components";

const WrapperComponent: React.FC<ComponentProps> = (props) => {
  switch (props.componentType) {
    case "Card":
      return <Card {...props} />;
    case "Button":
      return <Button {...props} />;
    case "Heading":
      return <Heading {...props} />;
    default:
      return <p className="text-red-500">⚠ Unknown component</p>;
  }
};

export default WrapperComponent;
