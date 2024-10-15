import { ComparisonDataType } from "../../common/data/data_v1_0_1";
import { styles } from "../../common/styles/styles_v1_0_1";
import TableHeader from "../table-header/TableHeaderV1_0_0";
import TableRow from "../table-row/TableRowV1_0_0";

// Reusable Comparison Component
const SPPTableV1_0_1 = ({ data }: { data: ComparisonDataType }) => (
  <>
    <h1>{data.title}</h1>
    <table style={styles.table}>
      <TableHeader />
      <tbody>
        {data.differences.map((item, index) => (
          <TableRow key={index} item={item} />
        ))}
      </tbody>
    </table>
  </>
);

export default SPPTableV1_0_1;
