import { ComparisonDataType } from "../../common/data/data_v1_0_2";
import { styles } from "../../common/styles/styles_v1_0_1";
import TableHeader from "../table-header/TableHeaderV1_0_1";
import TableRow from "../table-row/TableRowV1_0_1";

// Reusable Comparison Component (handles N items)
const SPPTableV1_0_2 = ({
  data,
}: {
  data: ComparisonDataType<string>;
}) => (
  <table style={styles.table}>
    <TableHeader headers={data.headers} />
    <tbody>
      {data.differences.map((item, index) => (
        <TableRow key={index} aspect={item.aspect} values={item.values} />
      ))}
    </tbody>
  </table>
);

export default SPPTableV1_0_2;
