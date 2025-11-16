/**
 * Welcome component serves as a simple, styled welcome header for the app.
 * 
 * - Renders a header with a highlighted greeting message ("Welcome Bro!!").
 * - Uses Tailwind CSS for styling.
 * 
 * This component is used as the initial landing page/header after login or at the root.
 */

import React from "react";

const Welcome = () => {
  return (
    <header className="text-center py-8 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Bro!!
        </span>
      </h1>
    </header>
  );
};

export default Welcome;
