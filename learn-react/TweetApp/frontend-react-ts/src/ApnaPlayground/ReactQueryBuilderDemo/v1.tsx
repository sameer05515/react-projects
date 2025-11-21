import React from "react";
// react-querybuilder is not installed - commenting out to prevent build errors
// To use this component, install: npm install react-querybuilder @react-querybuilder/material
// import { QueryBuilder } from "react-querybuilder";
// import { materialControlElements } from "@react-querybuilder/material";
// import "@react-querybuilder/material/dist/index.css"; // Import Material styles
// import "react-querybuilder/dist/query-builder.css"; // Import core styles

// const initialQuery = {
//   combinator: "and",
//   rules: [
//     { field: "age", operator: "greaterThan", value: 18 },
//     { field: "name", operator: "contains", value: "John" },
//   ],
// };

// const fields = [
//   { name: "name", label: "Name", value: "string" },
//   { name: "age", label: "Age", value: "number" },
//   { name: "city", label: "City", value: "string" },
//   { name: "dob", label: "Date of Birth", value: "date" },
// ];

const ReactQueryBuilderDemoV1 = () => {
  // const [query, setQuery] = useState(initialQuery);

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">React Query Builder with Material UI</h2>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-yellow-800">
          <strong>Note:</strong> This component requires <code>react-querybuilder</code> and <code>@react-querybuilder/material</code> packages to be installed.
        </p>
        <p className="text-yellow-700 mt-2">
          To enable this demo, run: <code className="bg-yellow-100 px-2 py-1 rounded">npm install react-querybuilder @react-querybuilder/material</code>
        </p>
      </div>
      {/* <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(newQuery) => setQuery(newQuery)}
        controlElements={materialControlElements}
      />
      <div className="mt-5">
        <h3 className="text-xl font-semibold mb-2">Generated Query:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(query, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default ReactQueryBuilderDemoV1;
