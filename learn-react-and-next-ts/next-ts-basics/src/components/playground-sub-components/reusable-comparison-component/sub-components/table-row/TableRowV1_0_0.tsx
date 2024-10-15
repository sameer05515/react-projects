import React from "react";
import { type CDRowItemType } from "../../common/data/data_v1_0_0";
import { styles } from "../../common/styles/styles_v1_0_1";

// TableRow Component
const TableRow = ({ item }: { item: CDRowItemType }) => (
  <tr>
    <td style={styles.td}>{item.aspect}</td>
    <td style={styles.td}>{item.ArrayList}</td>
    <td style={styles.td}>{item.LinkedList}</td>
  </tr>
);

export default TableRow;
