// import React from 'react'

import { type ComponentPropsWithoutRef, type FC } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href?: string;
};

type CustomButtonProps = AnchorProps | ButtonProps;

const isAnchorProps = (props: CustomButtonProps): props is AnchorProps => {
  return "href" in props;
};

const CustomButtonV3: FC<CustomButtonProps> = (props) => {
  if (isAnchorProps(props)) {
    return <a {...props}></a>;
  }

  return <button {...props}></button>;
};

export default CustomButtonV3;
