// import React from 'react'

import { type ComponentPropsWithoutRef, type FC } from "react";

type ButtonProps = {
  el: "button";
} & ComponentPropsWithoutRef<"button">;

type AnchorProps = {
  el: "anchor";
} & ComponentPropsWithoutRef<"a">;

type CustomButtonProps = AnchorProps | ButtonProps;

const CustomButton: FC<CustomButtonProps> = (props) => {
  if (props.el === "anchor") {
    return <a {...props}></a>;
  }

  return <button {...props}></button>;
};

export default CustomButton;
