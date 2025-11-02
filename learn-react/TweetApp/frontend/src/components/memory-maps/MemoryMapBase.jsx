import React from "react";
import { Outlet } from "react-router-dom";

const MemoryMapBase = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default MemoryMapBase;
