import React from "react";

// Generic Row Item Type for N comparisons
export type CDRowItemType<T> = {
  aspect: string;
  values: T[];
};

// Generic Comparison Data Type for N comparisons
export type ComparisonDataType<T> = {
  uniqueId: string;
  title: string;
  headers: string[]; // Headers for N items
  differences: CDRowItemType<T>[];
};

// Sample comparison data for String vs StringBuffer vs StringBuilder
const comparisonData: ComparisonDataType<string> = {
  uniqueId: "1",
  title: "Comparison: String vs StringBuffer vs StringBuilder",
  headers: ["String", "StringBuffer", "StringBuilder"],
  differences: [
    {
      aspect: "Mutability",
      values: ["Immutable", "Mutable", "Mutable"],
    },
    {
      aspect: "Thread Safety",
      values: [
        "Thread-safe by default",
        "Thread-safe, synchronized methods",
        "Not thread-safe",
      ],
    },
    {
      aspect: "Performance",
      values: [
        "Slower for multiple concatenations",
        "Slower due to synchronization overhead",
        "Faster in single-threaded environments",
      ],
    },
    {
      aspect: "Use Case",
      values: [
        "For constant, unchanging string values",
        "For multi-threaded string manipulations",
        "For single-threaded, high-performance string manipulations",
      ],
    },
  ],
};

// TableHeader Component (renders dynamic headers)
const TableHeader = ({ headers }: { headers: string[] }) => (
  <thead>
    <tr>
      <th style={styles.th}>Aspect</th>
      {headers.map((header, index) => (
        <th key={index} style={styles.th}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

// TableRow Component (renders dynamic rows for N items)
const TableRow = ({ aspect, values }: CDRowItemType<string>) => (
  <tr>
    <td style={styles.td}>{aspect}</td>
    {values.map((value, index) => (
      <td key={index} style={styles.td}>
        {value}
      </td>
    ))}
  </tr>
);

// Reusable Comparison Component (handles N items)
const ComparisonComponent = ({ data }: { data: ComparisonDataType<string> }) => (
  <table style={styles.table}>
    <TableHeader headers={data.headers} />
    <tbody>
      {data.differences.map((item, index) => (
        <TableRow key={index} aspect={item.aspect} values={item.values} />
      ))}
    </tbody>
  </table>
);

// Styles Object
const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

// Usage example
const SPPTableDashboardV1_0_2 = () => (
  <div>
    <h1>{comparisonData.title}</h1>
    <ComparisonComponent data={comparisonData} />
  </div>
);

export default SPPTableDashboardV1_0_2;
