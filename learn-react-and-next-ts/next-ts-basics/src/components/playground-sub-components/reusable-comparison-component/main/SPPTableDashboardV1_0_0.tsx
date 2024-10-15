import { comparisonData } from "../common/data/data_v1_0_0";

import SPPTableV1_0_0 from "../sub-components/comparison-component/SPPTableV1_0_0";

// Usage example
const SPPTableDashboardV1_0_0 = () => {
  return (
    <div>
      <h1>Comparison: ArrayList vs LinkedList</h1>
      <SPPTableV1_0_0 data={comparisonData} />
    </div>
  );
};

export default SPPTableDashboardV1_0_0;
