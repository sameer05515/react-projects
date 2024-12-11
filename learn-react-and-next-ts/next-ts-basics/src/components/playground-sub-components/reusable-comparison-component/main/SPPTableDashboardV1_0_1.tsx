import { useState } from "react";
import { comparisonData } from "../common/data/data_v1_0_1";
import SPPTableV1_0_1 from "../sub-components/comparison-component/SPPTableV1_0_1";
import CustomButton from "@/components/common/custom-button/CustomButtonV1_0_0";

// Usage example
const SPPTableDashboardV1_0_1 = () => {
  const [currIndex, setCurrIndex] = useState(0);
  return (
    <>
      <div>
        <CustomButton
          onClick={() =>
            setCurrIndex((prev) => (prev + 1) % comparisonData.length)
          }
        >
          Next
        </CustomButton>
      </div>
      <SPPTableV1_0_1 data={comparisonData[currIndex]} />
    </>
  );
};

export default SPPTableDashboardV1_0_1;
