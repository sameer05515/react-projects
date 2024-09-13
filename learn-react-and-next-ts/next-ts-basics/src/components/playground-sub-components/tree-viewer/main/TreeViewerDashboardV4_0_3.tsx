import { useMemo, useState, useCallback } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { tellTheType } from "@/common/utils/infer-types-from-given-value/type-inference-util-V1_0_1";
import styles from "./TreeViewerDashboardV4_0_3.module.css"; // Import the CSS module

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
  {
    id: 1,
    name: "Sample",
    tags: ["typescript", "json"],
    metadata: {
      createdBy: "Admin",
      createdAt: "2024-01-01",
    },
    isActive: true,
    additionalInfo: [
      {
        key: "version",
        value: "1.0",
      },
    ],
  },
];

const TreeViewerDashboardV4_0_3 = () => {
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
  const doTheWork = useCallback((increment: number = 0) => {
    setSelectedIndex(
      (prevIndex) =>
        (prevIndex + increment + sampleValueArray.length) %
        sampleValueArray.length
    );
  }, []);

  return (
    <div className={`${main} ${styles.container}`}>
      <h1 className={styles.title}>TreeViewerDashboardV4_0_3</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => doTheWork(-1)}>
          Previous value
        </button>
        <button className={styles.button} onClick={() => doTheWork(1)}>
          Next value
        </button>
      </div>

      <JSONDataViewer
        metadata={{ guessedType }}
        title="guessedType"
        initialValueToShowMetadata={true}
        // className={styles.jsonViewer}
      />

      <JSONDataViewer
        metadata={{ selVal }}
        title="Selected value"
        initialValueToShowMetadata={true}
        // className={styles.jsonViewer}
      />
    </div>
  );
};

export default TreeViewerDashboardV4_0_3;
