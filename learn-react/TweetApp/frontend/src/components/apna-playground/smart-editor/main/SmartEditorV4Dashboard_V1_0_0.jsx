import React, { useMemo, useState } from "react";
import {
  SmartEditor as SmartEditorV3,
  SmartPreviewer as SmartPreviewerV3,
} from "../../../../common/components/smart-editor/SmartEditorV3";
import {
  SmartEditorV4,
  SmartPreviewerV4,
} from "../../../../common/components/smart-editor/SmartEditorV4_unstable";
import { smartPreviewerDataArray as smartPreviewerData } from "../common/data";
import ToggleablePanel from "../../../../common/components/ToggleablePanel";
import CustomButton from "../../../../common/components/custom-button/CustomButton";

const SmartEditorV4Dashboard_V1_0_0 = () => {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const selectedData = useMemo(
    () => smartPreviewerData[selectedDataIndex],
    [selectedDataIndex]
  );
  return (
    <div>
      <div>
        <b>Data title: </b> {selectedData.title} <br />
        <CustomButton onClick={() => setSelectedDataIndex(() => (selectedDataIndex + 1) % smartPreviewerData.length)}>
          Next
        </CustomButton>
      </div>
      <ToggleablePanel showContent={false} title="SmartEditorV3">
        <SmartEditorV3 initialValue={selectedData.data} />
      </ToggleablePanel>
      <ToggleablePanel showContent={false} title="SmartEditorV4[_unstable]">
        <SmartEditorV4 initialValue={selectedData.data} />
      </ToggleablePanel>
    </div>
  );
};

export default SmartEditorV4Dashboard_V1_0_0;
