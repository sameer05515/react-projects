import React from "react";
import CustomInput from "./index";

export default {
    title: "Form/CustomInput",
    component: CustomInput,   
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'], 
};

// export const Small = () => (
//     <CustomInput variant="small" placeholder="Small size"/>
// );

// export const Medium = () => (
//     <CustomInput variant="medium" placeholder="Medium size"/>
// );

// export const Large = () => (
//     <CustomInput variant="large" placeholder="Large size"/>
// );

export const Small = {
    args: {
        variant: "small",
        placeholder: "Small size",
      },
};

export const Medium = {
    args: {
        variant: "medium",
        placeholder: "Medium size",
      },
};

export const Large = {
    args: {
        variant: "large",
        placeholder: "Large size",
      },
};