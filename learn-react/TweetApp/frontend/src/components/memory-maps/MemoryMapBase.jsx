import React from "react";
import { Outlet } from "react-router-dom";

const MemoryMapBase = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MemoryMapBase;
