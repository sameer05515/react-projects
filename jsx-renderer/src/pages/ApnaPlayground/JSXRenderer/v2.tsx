import React, { useState } from "react";
import * as Babel from "@babel/standalone";
import prepareErrorMessage from "../../../common/utils/prepareErrorMessage";

const JSXRenderer = () => {
  const [componentCode, setComponentCode] = useState(`
    function CustomCard({ title, description }) {
      return (
        <div className="p-4 border rounded bg-green-100 text-gray-800">
          <h2 className="text-lg font-bold">{title}</h2>
          <p>{description}</p>
        </div>
      );
    }
  `);
  const [jsxInput, setJsxInput] = useState(
    '<CustomCard title="Hello" description="This is a dynamic card!" />'
  );
  const [renderedComponent, setRenderedComponent] =
    useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRender = () => {
    try {
      setError(null);

      // 1️⃣ Transpile component definition
      const transpiledComponentCode = Babel.transform(componentCode, {
        presets: ["react"],
      }).code;

      if (!transpiledComponentCode) throw new Error("Invalid Component Code!");

      // 2️⃣ Define the component dynamically
      const createComponent = new Function(
        "React",
        transpiledComponentCode + "; return CustomCard;"
      );
      const CustomCard = createComponent(React);

      // 3️⃣ Transpile JSX input string
      const transpiledJSX = Babel.transform(`(${jsxInput})`, {
        presets: ["react"],
      }).code;

      if (!transpiledJSX) throw new Error("Invalid JSX syntax!");

      // 4️⃣ Evaluate JSX with the dynamically defined component
      const renderFunction = new Function(
        "React",
        "CustomCard",
        `return ${transpiledJSX}`
      );
      const element = renderFunction(React, CustomCard);

      // 5️⃣ Render the element
      setRenderedComponent(element);
    } catch (error) {
      setError(prepareErrorMessage(error));
      setRenderedComponent(null);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Dynamic JSX Renderer
      </h1>

      {/* Component Definition */}
      <label className="block font-bold mb-1">Define Component:</label>
      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
        value={componentCode}
        onChange={(e) => setComponentCode(e.target.value)}
      />

      {/* JSX Input */}
      <label className="block font-bold mb-1">Enter JSX to Render:</label>
      <textarea
        className="w-full h-20 p-2 border rounded mb-4"
        value={jsxInput}
        onChange={(e) => setJsxInput(e.target.value)}
      />

      {/* Render Button */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRender}
      >
        Render JSX
      </button>

      {/* Error Display */}
      {error && <p className="text-red-600 mt-4">Error: {error}</p>}

      {/* Rendered Output */}
      <div className="mt-4 p-4 border rounded bg-white shadow-md">
        {renderedComponent ? (
          renderedComponent
        ) : (
          <p className="text-gray-600">No JSX Rendered</p>
        )}
      </div>
    </div>
  );
};

export default JSXRenderer;
