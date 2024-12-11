import CustomButton from "@/components/common/custom-button/CustomButtonV1_0_0";
import { useState } from "react";
import { comparisonData } from "../common/data/data_v1_0_2";
import SPPTableV1_0_2 from "../sub-components/comparison-component/SPPTableV1_0_2";

// Usage example
const SPPTableDashboardV1_0_2 = () => {
  const [currIndex, setCurrIndex] = useState(0);
  return (
    <>
      <div>
        <CustomButton
          onClick={() =>
            setCurrIndex((prev) => ((prev + 1) % comparisonData.length) + 1)
          }
        >
          Next
        </CustomButton>

        <SPPTableV1_0_2 data={comparisonData[currIndex]} />
      </div>
    </>
  );
};

export default SPPTableDashboardV1_0_2;
