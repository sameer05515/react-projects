import { useState } from "react";
import { ArcherContainer } from "react-archer";
import { generateStyles, JsonToggle, PopulateChildren } from "../../../common/utils/react-archer-examples-pt-1-common";




const ReactArcherApp5 = ({ data = [] }) => {
    const [showJson, setShowJson] = useState(false);
    const updatedFirstElement = data.length > 0 ? data[0] : {};
    const styles = {
        rootStyle: { display: "flex", justifyContent: "center" },
        rowStyle: {
            margin: "200px 0",
            display: "flex",
            justifyContent: "center",
        },
        boxStyle: generateStyles("10px", "1px solid black"),
    };

    return (
        <>
            <JsonToggle
                showJson={showJson}
                setShowJson={setShowJson}
                data={updatedFirstElement}
            />
            <div style={{ height: "500px", margin: "50px" }}>
                <ArcherContainer strokeColor="red">
                    <PopulateChildren
                        providedArray={data}
                        level={0}
                        styles={styles}
                    />
                </ArcherContainer>
            </div>
        </>
    );
};

export default ReactArcherApp5;
