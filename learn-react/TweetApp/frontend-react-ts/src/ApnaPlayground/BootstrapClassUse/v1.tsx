import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillBackward as PrevIcon } from "react-icons/ai";

const BootstrapClassUseV1 = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-900">
        Hello, from BootstrapClassUseV1!
      </h1>
      <div className="flex items-center justify-between">
        <NavLink to="#" className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-800">
          <PrevIcon className="text-lg" />
          <span>Prev</span>
        </NavLink>
      </div>
      <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        Primary action
      </button>
    </div>
  );
};

export default BootstrapClassUseV1;
