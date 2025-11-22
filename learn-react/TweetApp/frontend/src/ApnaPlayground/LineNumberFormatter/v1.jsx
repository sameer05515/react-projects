import React, { useMemo, useState } from "react";

export function appendLineNumbers(text, padding = 2, startingNumber = 0) {
  let counter = startingNumber;

  return text
    .split("\n")
    .map((line) => {
      if (line.trim() === "") return "";

      counter++;
      const num = String(counter).padStart(padding, "0");
      return `${num} ${line}`;
    })
    .join("\n");
}

function parseNonNegativeInt(value, fallback) {
  const n = parseInt(String(value).trim(), 10);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}

const LineNumberFormatter = () => {
  const [text, setText] = useState("");
  const [padding, setPadding] = useState("3");
  const [start, setStart] = useState("0");

  const result = useMemo(() => {
    const pad = parseNonNegativeInt(padding, 3);
    const startParsed = parseInt(String(start).trim(), 10);
    const startNum = Number.isFinite(startParsed) ? startParsed : 0;
    return appendLineNumbers(text, pad, startNum);
  }, [text, padding, start]);

  return (
    <div className="p-8 font-mono bg-white rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto mt-8">
      <h3 className="text-2xl font-bold mb-4 text-blue-700 tracking-wide">Line Number Formatter</h3>

      <textarea
        rows={10}
        cols={60}
        placeholder="Enter multiline text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="block w-full mb-4 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 resize-y transition"
      />

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="font-semibold text-blue-800">Padding:</label>
        <input
          type="number"
          min={0}
          value={padding}
          onChange={(e) => setPadding(e.target.value)}
          className="w-20 p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white mr-2"
        />

        <label className="font-semibold text-blue-800 ml-2">Starting Number:</label>
        <input
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-24 p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white mr-2"
        />
      </div>

      <h4 className="mt-6 mb-2 text-lg font-bold text-blue-600">Output</h4>

      <textarea
        rows={10}
        cols={60}
        readOnly
        value={result}
        aria-label="Formatted output"
        className="block w-full border border-blue-200 rounded-lg p-3 bg-blue-50 font-mono text-blue-900 resize-y"
      />
    </div>
  );
};

export default LineNumberFormatter;
