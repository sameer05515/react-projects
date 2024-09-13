// import React from 'react'

import {
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const ContainerV2 = <C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) => {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

export default ContainerV2;
