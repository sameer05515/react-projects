import React from "react";
import { styles } from "../../common/styles/styles_v1_0_1";

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

export default TableHeader;
