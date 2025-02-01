import React, { useMemo, useState } from "react";
import SmartEditorV4 from "../../../common/components/Smart/Editor/v4";
import { smartPreviewerDataArray as smartPreviewerData, observations } from "../common/data";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import CustomButton from "../../../common/components/custom-button/CustomButton";
// import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import SmartPreviewerV4 from '../../../common/components/Smart/Editor/v4'

const SmartEditorV4Dashboard_V1_0_0 = () => {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const selectedData = useMemo(() => smartPreviewerData[selectedDataIndex], [selectedDataIndex]);
  return (
    <div>
      <div>
        <b>Data title: </b> {selectedData.title} <br />
        <ToggleablePanel showContent={false} title="observations">
          <SmartPreviewerV4 data={{ content: observations, textOutputType: "text" }} />
        </ToggleablePanel>
        <CustomButton onClick={() => setSelectedDataIndex((prev) => (prev + 1) % smartPreviewerData.length)}>Next</CustomButton>
      </div>
      {/* <ToggleablePanel showContent={false} title="Normal Textarea">
        <textarea value={selectedData.data.content} rows={20} style={textareaStyle} />
      </ToggleablePanel> */}
      {/* <ToggleablePanel showContent={false} title="SmartEditorV3">
        <SmartEditorV3 initialValue={selectedData.data} />
      </ToggleablePanel> */}
      <ToggleablePanel showContent={false} title="SmartEditorV4[_unstable]">
        <SmartEditorV4 initialValue={selectedData.data} />
      </ToggleablePanel>
      {/* <JSONDataViewer metadata={{ selectedDataIndex, selectedData }} title="X-Ray" /> */}
    </div>
  );
};

// const textareaStyle = {
//   width: "100%",
//   padding: "10px",
//   fontSize: "16px",
//   borderRadius: "4px",
//   border: "1px solid #ccc",
//   resize: "none",
//   overflow: "auto",
// };

export default SmartEditorV4Dashboard_V1_0_0;
