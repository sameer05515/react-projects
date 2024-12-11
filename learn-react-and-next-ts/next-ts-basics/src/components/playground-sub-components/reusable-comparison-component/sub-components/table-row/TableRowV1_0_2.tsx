import React, { ReactNode } from "react";
import { type CDRowItemType } from "../../common/data/data_v1_0_3";
import { styles } from "../../common/styles/styles_v1_0_1";
import { useSharedConfigurations } from "../../common/util/SPPTableConfigurationsUtil";

type TableRowProps<CELL_VALUE_TYPE> = {
  row: CDRowItemType<CELL_VALUE_TYPE>;
  renderCell?: (cellValue: CELL_VALUE_TYPE) => ReactNode;
};

// TableRow Component (renders dynamic rows for N items)
const TableRow = <CELL_VALUE_TYPE,>({
  row: { aspect, values },
}: // renderCell,
TableRowProps<CELL_VALUE_TYPE>) => {
  const {
    sharedData: { renderCell },
  } = useSharedConfigurations<CELL_VALUE_TYPE>();
  return (
    <tr>
      <td style={styles.td}>{aspect}</td>
      {values.map((value, index) => (
        <td key={index} style={styles.td}>
          {renderCell
            ? renderCell(value)
            : typeof value === "string"
            ? value
            : JSON.stringify(value, null, 2)}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
