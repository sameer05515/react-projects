import React, { useEffect, useMemo, useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useParams } from "react-router-dom";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { useSharedConfigurations } from "../../util/RelatedNodeUtil";
import {
    JSONPreview,
    boxStyle,
    getArcherBoxesForLanguage,
    getNodeForId,
    styles,
} from "../util";

// InfoBoxV1 component
export const InfoBoxV1 = ({ boxes }) => (
    <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
        {boxes.map((box) => (
            <ArcherBox
                key={box.id}
                id={box.id}
                relations={box.relations}
                label={box.label}
                style={box.style}
            />
        ))}
    </div>
);

// ArcherBox component
export const ArcherBox = ({ id, relations = [], label, style = {} }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={{ ...boxStyle, ...style }}>{label}</div>
    </ArcherElement>
);

export const ViewNode = () => {
    const { id } = useParams();
    const {
        SharedService: { setSelectedNode },
        sharedData: { allNodes, selectedNode },
    } = useSharedConfigurations();

    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (id) {
            const node = getNodeForId(id, allNodes);
            setSelectedNode(node);
        }
    }, [id, allNodes]); // Added setSelectedNode to dependency array

    const { prevBoxes, selBoxes, nextBoxes } = useMemo(
        () =>
            selectedNode
                ? getArcherBoxesForLanguage(selectedNode, allNodes)
                : { prevBoxes: [], selBoxes: [], nextBoxes: [] },
        [selectedNode, allNodes]
    );

    if (!selectedNode) {
        return (
            <div>
                {id ? `No valid node found for ID: ${id}` : "ID parameter is missing"}
            </div>
        );
    }

    return (
        <div>
            View details for: {id} <br />
            <CustomButton onClick={() => setShowPreview((prev) => !prev)}>
                {showPreview ? "Hide " : ""}Preview Data
            </CustomButton>

            <ArcherContainer strokeColor="black">
                <div style={styles.rowDiv}>
                    <InfoBoxV1 boxes={prevBoxes} />
                    <InfoBoxV1 boxes={selBoxes} />
                    <InfoBoxV1 boxes={nextBoxes} />
                </div>
            </ArcherContainer>
            {showPreview && (
                <div style={styles.rowDiv}>
                    <JSONPreview data={{ selectedNode }} title={"selectedNode"} />
                </div>
            )}
        </div>
    );
};

export default ViewNode;
