import React from "react";
import { convertToYesNo } from "../../utils";
import { useSelector } from "react-redux";
import {
  selectIsCustomBackdropV3Active
} from "../../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../../common/components/CustomBackdrop/v3";
import SampleV1 from "./samples/v1";
import SampleV2 from "./samples/v2";
import SampleV3 from "./samples/v3";
import SampleV4 from "./samples/v4";

const UsingCustomBackdropV3 = () => {
  
  const isActive = useSelector(selectIsCustomBackdropV3Active);

  return (
    <div>
      <h1>UsingCustomBackdropV3</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>
      <br />
      <SampleV1 />
      <br />
      <SampleV2 />
      <br />
      <SampleV3 />
      <br />
      <SampleV4 />

      <CustomBackdropV3 />
    </div>
  );
};

export default UsingCustomBackdropV3;
