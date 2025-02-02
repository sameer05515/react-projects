import React, { useMemo, useState } from "react";
import SmartEditorV4 from "../../../common/components/Smart/Editor/v4";
import { smartPreviewerDataArray as smartPreviewerData, observations } from "../common/data";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import CustomButton from "../../../common/components/custom-button/CustomButton";
// import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import SmartPreviewerV4 from "../../../common/components/Smart/Editor/v4";
import ModalV3 from "../../../common/hoc/modal/ModalV3";

const SmartEditorV4Dashboard_V1_0_0 = () => {
  const [selectedDataIndex, setSelectedDataIndex] = useState(0);
  const selectedData = useMemo(() => smartPreviewerData[selectedDataIndex], [selectedDataIndex]);
  const [showModal, setShowModal] = useState(false);
  // Mock async validation function
  const handleEditorSubmit = async (data) => {
    console.log("Submitting data:", data);

    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (data.content.trim().length < 10) {
          resolve({
            isError: true,
            messages: [{ type: "error", message: "Content is too short. Minimum 10 characters required." }],
          });
        } else {
          resolve({
            isError: false,
            messages: [{ type: "info", message: "Saved successfully!" }],
          });
        }
      }, 1000); // Simulate async delay
    });
  };

  return (
    <div>
      <div>
        <b>Data title: </b> {selectedData.title} <br />
        <ToggleablePanel showContent={false} title="observations">
          <SmartPreviewerV4 data={{ content: observations, textOutputType: "text" }} />
        </ToggleablePanel>
        <CustomButton onClick={() => setSelectedDataIndex((prev) => (prev + 1) % smartPreviewerData.length)}>
          Next
        </CustomButton>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          Show Modal
        </button>
      </div>
      {/* <ToggleablePanel showContent={false} title="Normal Textarea">
        <textarea value={selectedData.data.content} rows={20} style={textareaStyle} />
      </ToggleablePanel> */}
      {/* <ToggleablePanel showContent={false} title="SmartEditorV3">
        <SmartEditorV3 initialValue={selectedData.data} />
      </ToggleablePanel> */}
      {showModal && (
        <ModalV3
          title={selectedData?.data ? "Update" : "Save"}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          showCloseButton={true}
        >
          <SmartEditorV4 initialValue={selectedData.data} onSubmit={handleEditorSubmit} />
        </ModalV3>
      )}
      <ToggleablePanel showContent={false} title="SmartEditorV4[_unstable]">
        <SmartEditorV4 initialValue={selectedData.data} onSubmit={handleEditorSubmit} />
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
