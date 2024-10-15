import {
    comparisonData
} from "../common/data/data_v1_0_2";
import SPPTableV1_0_2 from "../sub-components/comparison-component/SPPTableV1_0_2";

// Usage example
const SPPTableDashboardV1_0_2 = () => (
  <div>
    
    <SPPTableV1_0_2 data={comparisonData} />
  </div>
);

export default SPPTableDashboardV1_0_2;
