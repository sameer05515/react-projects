import React from "react";
import { Outlet } from "react-router-dom";

const Details = () => {

  return (
    <div className="flex flex-1 items-center justify-center rounded border border-gray-200 bg-white p-3 shadow-sm">
      <Outlet />
    </div>
  );
};

export default Details;
