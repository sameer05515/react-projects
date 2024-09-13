// import React from 'react'

import { type ComponentPropsWithoutRef, type FC } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

type AnchorProps = ComponentPropsWithoutRef<"a">;

type CustomButtonProps = AnchorProps | ButtonProps;

const isAnchorProps = (props: CustomButtonProps): props is AnchorProps => {
  return "href" in props;
};

const CustomButtonV2: FC<CustomButtonProps> = (props) => {
  if (isAnchorProps(props)) {
    return <a {...props}></a>;
  }

  return <button {...props}></button>;
};

export default CustomButtonV2;
