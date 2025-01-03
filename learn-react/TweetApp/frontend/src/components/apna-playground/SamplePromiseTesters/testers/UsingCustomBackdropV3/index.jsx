import React, { useCallback, useEffect, useMemo, useState } from "react";
import { convertToYesNo } from "../../utils";
import { useSelector } from "react-redux";
import { selectIsCustomBackdropV3Active } from "../../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../../common/components/CustomBackdrop/v3";
import HoverActions from "../../../../../common/components/hover-actions/HoverActions";
import { sampleNames, getSampleComponent } from "./samplesConfig";

const UsingCustomBackdropV3 = () => {
  const isActive = useSelector(selectIsCustomBackdropV3Active);
  const [selectedSample, setSelectedSample] = useState(null);

  const handleSampleSelect = useCallback((sampleName) => {
    setSelectedSample(sampleName);
  }, []);

  const sampleActions = useMemo(() => {
    return sampleNames.map(({ id, name }) => (
      <span
        key={id}
        onClick={() => handleSampleSelect(name)}
        style={{
          cursor: "pointer",
          margin: "0 8px",
          textDecoration: "underline",
        }}
      >
        {name}
      </span>
    ));
  }, [handleSampleSelect]);

  const { component: SelectedSampleComponent, componentTitle } = useMemo(() => {
    if (!selectedSample)
      return { component: null, componentTitle: "Please select a sample" };
    return {
      component: getSampleComponent(selectedSample) || null,
      componentTitle: "Selected Component: " + selectedSample,
    };
  }, [selectedSample]);

  // const SelectedSampleComponent = selectedSample
  //   ? getSampleComponent(selectedSample)
  //   : null;

  // const componentTitle = selectedSample
  //   ? "Selected Component: " + selectedSample
  //   : "Please select a sample";

  useEffect(() => {
    console.trace("I have been rendered!");
    return () => console.trace("I have been destroyed!");
  }, []);

  return (
    <div>
      <h1>Using Custom Backdrop V3</h1>
      <h2>CustomBackdropV3 is active: {convertToYesNo(isActive)}</h2>

      <HoverActions actions={sampleActions} title={componentTitle} />

      <div style={{ marginTop: "16px" }}>
        {SelectedSampleComponent ? (
          <SelectedSampleComponent />
        ) : (
          <p>Please select a sample to view its details.</p>
        )}
      </div>

      <CustomBackdropV3 />
    </div>
  );
};

export default UsingCustomBackdropV3;
