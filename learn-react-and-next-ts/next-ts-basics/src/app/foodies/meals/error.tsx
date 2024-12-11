"use client";

import React from "react";

const error = ({ error }: { error: any }) => {
  return (
    <main className="error">
      <h1>An error occurred</h1>
      <p>Failed to fetch meal data, Please try again later!</p>
      <pre style={{color: 'white'}}>
        {JSON.stringify(error, null, 2)}
      </pre>
    </main>
  );
};

export default error;
