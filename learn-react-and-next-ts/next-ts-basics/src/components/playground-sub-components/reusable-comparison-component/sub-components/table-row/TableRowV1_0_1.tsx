import React from "react";
import { type CDRowItemType } from "../../common/data/data_v1_0_2";
import { styles } from "../../common/styles/styles_v1_0_1";

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

export default TableRow;
