import {
    comparisonData
} from "../common/data/data_v1_0_0";
import SPPTableV1_0_1 from "../sub-components/comparison-component/SPPTableV1_0_1";


// Usage example
const SPPTableDashboardV1_0_1 = () => (
  <div>
    <h1>Comparison: ArrayList vs LinkedList</h1>
    <SPPTableV1_0_1 data={comparisonData} />
  </div>
);

export default SPPTableDashboardV1_0_1;
