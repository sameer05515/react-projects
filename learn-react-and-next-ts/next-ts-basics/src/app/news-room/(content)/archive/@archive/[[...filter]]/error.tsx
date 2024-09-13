"use client";
import React from "react";

const FilterError = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {
  return (
    <div id="error">
      <h2>An error occured!</h2>
      <p>Invalid Path: {error.message}</p>
      {/* <p>
        Invalid path:{" "}
        {params.filter.map((ff) => (
          <span
            style={{
              color: "red",
              fontSize: "28px",
              padding: "10px",
              margin: "10px",
            }}
          >
            {ff}
          </span>
        ))}
      </p> */}
    </div>
  );
};

export default FilterError;
