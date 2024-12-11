import { useMemo, useState } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { tellTheType } from "@/common/utils/infer-types-from-given-value/type-inference-util-V1_0_0";

// Example usage
const sampleJson = {
  id: 1,
  name: "Sample",
  tags: ["typescript", "json"],
  metadata: {
    createdBy: "Admin",
    createdAt: "2024-01-01",
  },
  isActive: true,
};

const sampleValueArray: any[] = [sampleJson, null, "", []];

const TreeViewerDashboardV4 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [guessedType, setGuessedType] = useState("");

  const selVal = useMemo(() => {
    const nxtSelVal = sampleValueArray[selectedIndex];
    const gType = tellTheType(nxtSelVal);
    setGuessedType(() => gType);
    return nxtSelVal;
  }, [selectedIndex]);

  const doTheWork = () => {
    const nextIdx =
      (selectedIndex + sampleValueArray.length + 1) % sampleValueArray.length;
    setSelectedIndex(() => nextIdx);
  };

  return (
    <div className={`${main}`}>
      <h1>TreeViewerDashboardV4</h1>

      <button onClick={doTheWork}>Next value</button>
      {<p>guessedType : {guessedType}</p>}

      <JSONDataViewer
        metadata={{ selVal, sampleValueArray }}
        title="Selected value"
        initialValueToShowMetadata={true}
      />
    </div>
  );
};

export default TreeViewerDashboardV4;
