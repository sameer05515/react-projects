import React from "react";
import { styles } from "../../common/styles/styles_v1_0_1";

// TableHeader Component
const TableHeader = () => (
  <thead>
    <tr>
      <th style={styles.th}>Aspect</th>
      <th style={styles.th}>ArrayList</th>
      <th style={styles.th}>LinkedList</th>
    </tr>
  </thead>
);

export default TableHeader;
