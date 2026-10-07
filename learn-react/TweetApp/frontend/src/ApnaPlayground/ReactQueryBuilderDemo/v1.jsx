import React, { useState } from "react";
import { QueryBuilder } from "react-querybuilder";
import { materialControlElements } from "@react-querybuilder/material";
import "react-querybuilder/dist/query-builder.css";

const initialQuery = {
  combinator: "and",
  rules: [
    { field: "age", operator: "greaterThan", value: 18 },
    { field: "name", operator: "contains", value: "John" },
  ],
};

const fields = [
  { name: "name", label: "Name", datatype: "string" },
  { name: "age", label: "Age", datatype: "number" },
  { name: "city", label: "City", datatype: "string" },
  { name: "dob", label: "Date of Birth", datatype: "date" },
];

const ReactQueryBuilderDemoV1 = () => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">
        React Query Builder with Material UI
      </h2>

      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        controlElements={materialControlElements}
      />

      <div className="mt-5">
        <h3 className="text-xl font-semibold mb-2">Generated Query:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(query, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ReactQueryBuilderDemoV1;
