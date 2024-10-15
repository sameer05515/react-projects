import React from "react";
import { styles } from "../common/styles/styles_v1_0_1";
import {
  type CDRowItemType,
  type ComparisonDataType,
  comparisonData,
} from "../common/data/data_v1_0_2";
import TableHeader from "../sub-components/table-header/TableHeaderV1_0_1";
import TableRow from "../sub-components/table-row/TableRowV1_0_1";
import SPPTableV1_0_2 from "../sub-components/comparison-component/SPPTableV1_0_2";



// Reusable Comparison Component (handles N items)
// const ComparisonComponent = ({
//   data,
// }: {
//   data: ComparisonDataType<string>;
// }) => (
//   <table style={styles.table}>
//     <TableHeader headers={data.headers} />
//     <tbody>
//       {data.differences.map((item, index) => (
//         <TableRow key={index} aspect={item.aspect} values={item.values} />
//       ))}
//     </tbody>
//   </table>
// );

// Usage example
const SPPTableDashboardV1_0_2 = () => (
  <div>
    <h1>{comparisonData.title}</h1>
    <SPPTableV1_0_2 data={comparisonData} />
  </div>
);

export default SPPTableDashboardV1_0_2;
