// import React from 'react'

import { type FC, type ElementType } from "react";

type ContainerProps = {
  as: ElementType;
};

const Container: FC<ContainerProps> = ({ as: Component }) => {
  // const Component= as;
  return <Component />;
};

export default Container;
