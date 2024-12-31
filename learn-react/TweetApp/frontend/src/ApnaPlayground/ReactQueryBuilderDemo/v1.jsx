import React, { useState } from "react";
import { QueryBuilder } from "react-querybuilder";
import { materialControlElements } from "@react-querybuilder/material";
// import "@react-querybuilder/material/dist/index.css"; // Import Material styles
import "react-querybuilder/dist/query-builder.css"; // Import core styles

const initialQuery = {
  combinator: "and",
  rules: [
    { field: "age", operator: "greaterThan", value: 18 },
    { field: "name", operator: "contains", value: "John" },
  ],
};

const fields = [
  { name: "name", label: "Name", value: "string" },
  { name: "age", label: "Age", value: "number" },
  { name: "city", label: "City", value: "string" },
  { name: "dob", label: "Date of Birth", value: "date" },
];

const ReactQueryBuilderDemoV1 = () => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>React Query Builder with Material UI</h2>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(newQuery) => setQuery(newQuery)}
        controlElements={materialControlElements}
      />
      <div style={{ marginTop: "20px" }}>
        <h3>Generated Query:</h3>
        <pre>{JSON.stringify(query, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ReactQueryBuilderDemoV1;
