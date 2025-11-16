import React, { useState } from "react";

const MyFormWithValidationV2 = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("Scope 1");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    if (/^[A-Za-z0-9]*$/.test(newInputValue) && newInputValue.length <= 50) {
      setInputValue(newInputValue);
      setInputError("");
    } else {
      setInputValue(newInputValue);
      setInputError("Input should be alphanumeric and 50 characters or less");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Input Value:", inputValue);
    console.log("Selected Value:", selectedValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Input (Alphanumeric, Max 50 characters)
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Enter text"
        />
        {inputError && (
          <p className="mt-1 text-xs font-semibold text-red-600">{inputError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Scope
        </label>
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="Scope 1">Scope 1</option>
          <option value="Scope 2">Scope 2</option>
          <option value="Scope 3">Scope 3</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Submit
      </button>
    </form>
  );
};

export default MyFormWithValidationV2;
