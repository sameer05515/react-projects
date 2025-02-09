import * as Babel from "@babel/standalone";
import React, { JSX, useState } from "react";

const JSXRendererV1 = () => {
  const [inputJSX, setInputJSX] = useState<string>("");
  const [renderedJSX, setRenderedJSX] = useState<JSX.Element | string>("");

  const handleRender = () => {
    try {
      const transpiledCode = Babel.transform(inputJSX, {
        presets: ["react"],
      }).code;

      const evaluatedComponent = new Function(
        "React",
        `return ${transpiledCode}`
      )(React);

      setRenderedJSX(evaluatedComponent);
    } catch (error) {
      setRenderedJSX(
        `⚠️ Error: ${
          error instanceof Error
            ? error.message
            : "Some error occurred: " + JSON.stringify(error, null, 2)
        }`
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold">JSX Renderer</h2>
      <textarea
        className="border p-2 w-full h-32"
        placeholder="Enter JSX code here..."
        value={inputJSX}
        onChange={(e) => setInputJSX(e.target.value)}
      />
      <button
        onClick={handleRender}
        className="mt-2 p-2 bg-blue-500 text-white"
      >
        Render
      </button>
      <div className="mt-4 border p-4">{renderedJSX}</div>
    </div>
  );
};

export default JSXRendererV1;
