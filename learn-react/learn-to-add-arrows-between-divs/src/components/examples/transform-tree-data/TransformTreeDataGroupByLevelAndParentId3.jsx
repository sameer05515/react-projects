import React, { useState } from "react";
import JSONDataViewer from "./JSONDataViewer"; // Assuming the JSONDataViewer is in a separate file
import { processTreeDataWithPromises } from "./dataProcessing"; // Assuming you moved the data processing logic to a separate file

const TransformTreeDataGroupByLevelAndParentId3 = ({ data = [] }) => {
    const [newTreeData, setNewTreeData] = useState([]);
    const [stepDataArr, setStepDataArr] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRecalculate = () => {
        setLoading(true);
        processTreeDataWithPromises(data).then((steps) => {
            setStepDataArr(steps);

            // If no error, set the final processed data
            if (!steps.some(step => step.error)) {
                setNewTreeData(steps[steps.length - 1].metadata);
            }
            setLoading(false);
        });
    };

    return (
        <>
            <h1>
                Transform given tree data into a new array, containing objects of level.
                Each level object will contain sections. Each section will contain nodes.
            </h1>

            <button onClick={handleRecalculate} disabled={loading}>
                {loading ? "Processing..." : "Recalculate"}
            </button>

            <h2>Step Details:-</h2>
            {stepDataArr.map(({ title, metadata, error }, index) => (
                <JSONDataViewer
                    key={index}
                    step={index + 1}
                    title={title}
                    metadata={metadata}
                    error={error}
                />
            ))}

            <h2>Final Outcome:-</h2>
            {!stepDataArr.some(step => step.error) && (
                <JSONDataViewer
                    title={"Final Data"}
                    metadata={newTreeData}
                    initialValueToShowMetadata={true}
                />
            )}
        </>
    );
};

export default TransformTreeDataGroupByLevelAndParentId3;
