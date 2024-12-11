import React from "react";
import CustomButton from ".";

export default {
  title: "Form/CustomButton",
  component: CustomButton,
  tags: ["autodocs"], // Ensure Storybook supports autodocs
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Success = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};
