import React from "react";
import CustomButton from "./CustomButton";

export default {
    title: "Form/CustomButton",
    component: CustomButton,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export const Primary = () => (
    <CustomButton variant="primary">Primary</CustomButton>
);
export const Secondary = () => (
    <CustomButton variant="secondary">Secondary</CustomButton>
);
export const Success = () => (
    <CustomButton variant="success">Success</CustomButton>
);
export const Danger = () => (
    <CustomButton variant="danger">Danger</CustomButton>
);
