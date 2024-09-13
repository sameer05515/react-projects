// import React from 'react'
import CustomInputV3 from "../custom-components/custom-input/CustomInputV3";
// import "../common/index.css";
import { useRef } from "react";

const AppWithCustomInputV3 = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main>
      <CustomInputV3 id="name" label="Your Name" type="text" ref={inputRef} />
      <CustomInputV3 id="age" label="Your age" type="number" />
    </main>
  );
};

export default AppWithCustomInputV3;
