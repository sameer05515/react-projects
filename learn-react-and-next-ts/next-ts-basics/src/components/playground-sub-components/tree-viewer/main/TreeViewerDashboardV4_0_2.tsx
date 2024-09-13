import { useMemo, useState, useCallback } from "react";
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

const sampleValueArray: any[] = [
  sampleJson,
  null,
  "",
  [],
  123, // Number
  true, // Boolean
  "Hello, World!", // String
  [1, 2, 3], // Array of numbers
  { nested: { key: "value" } }, // Nested object
  new Date(), // Date object
  new Map([["key", "value"]]), // Map object
  new Set([1, 2, 3]), // Set object
  function testFunc() {
    return "I am a function";
  }, // Function
  Symbol("testSymbol"), // Symbol
];

const TreeViewerDashboardV4_0_2 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Memoized selected value and guessed type
  const { selVal, guessedType } = useMemo(() => {
    const nxtSelVal = sampleValueArray[selectedIndex];
    const gType = tellTheType(nxtSelVal);
    return { selVal: nxtSelVal, guessedType: gType };
  }, [selectedIndex]);

  // Callback to update index
  const doTheWork = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % sampleValueArray.length);
  }, []);

  return (
    <div className={main}>
      <h1>TreeViewerDashboardV4_0_2</h1>

      <button onClick={doTheWork}>Next value</button>

      <p>guessedType: {guessedType}</p>

      <JSONDataViewer
        metadata={{ selVal, sampleValueArray }}
        title="Selected value"
        initialValueToShowMetadata={true}
      />
    </div>
  );
};

export default TreeViewerDashboardV4_0_2;
