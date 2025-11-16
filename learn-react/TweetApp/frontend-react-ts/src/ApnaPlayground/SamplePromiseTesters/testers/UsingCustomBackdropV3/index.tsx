import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { convertToYesNo } from "../../utils";
import { selectIsCustomBackdropV3Active } from "../../../../redux/slices/backdropSlice";
import CustomBackdropV3 from "../../../../common/components/CustomBackdrop/v3";
import HoverActions from "../../../../common/components/hover-actions/HoverActions";
import { sampleNames, getSampleComponent } from "./samplesConfig";

const UsingCustomBackdropV3 = () => {
  const isActive = useSelector(selectIsCustomBackdropV3Active);
  const [selectedSample, setSelectedSample] = useState(null);

  const handleSampleSelect = useCallback((sampleName) => {
    setSelectedSample(sampleName);
  }, []);

  const sampleActions = useMemo(
    () =>
      sampleNames.map(({ id, name }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleSampleSelect(name)}
          className="rounded-full px-3 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          {name}
        </button>
      )),
    [handleSampleSelect]
  );

  const { component: SelectedSampleComponent, componentTitle } = useMemo(() => {
    if (!selectedSample) {
      return { component: null, componentTitle: "Please select a sample" };
    }
    return {
      component: getSampleComponent(selectedSample) || null,
      componentTitle: `Selected Component: ${selectedSample}`,
    };
  }, [selectedSample]);

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Using Custom Backdrop V3
        </h1>
        <p className="text-sm text-gray-600">
          CustomBackdropV3 is active:{" "}
          <span className="font-semibold text-indigo-600">
            {convertToYesNo(isActive)}
          </span>
        </p>
      </div>

      <HoverActions actions={sampleActions} title={componentTitle} />

      <div className="rounded-xl border border-dashed border-gray-200 p-4">
        {SelectedSampleComponent ? (
          <SelectedSampleComponent />
        ) : (
          <p className="text-sm text-gray-500">
            Please select a sample to view its details.
          </p>
        )}
      </div>

      <CustomBackdropV3 />
    </div>
  );
};

export default UsingCustomBackdropV3;
