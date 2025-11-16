import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";

// Reusable Label component
const HoverLabel = ({ id,text, show, onMouseEnter, onMouseLeave }) => (
    <div 
    style={show ? styles.visibleLabel : styles.hiddenLabel}
    onMouseEnter={()=>onMouseEnter(id)}
    onMouseLeave={onMouseLeave}>
        {text}
    </div>
);

// Reusable Node component
const Node = ({ id, label, children, relations = [] }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={styles.node}>{children || label}</div>
    </ArcherElement>
);

const DynamicNodeComponent = ({ selectedNode }) => {
    const [hoveredRelationId, setHoveredRelationId] = useState(null);

    const handleMouseEnter = (id) => setHoveredRelationId(id);
    const handleMouseLeave = () => setHoveredRelationId(null);

    const renderRelations = () => {
        return selectedNode.relations
            .filter((relation) => relation.type === "next")
            .map((relation, index) => (
                <Node
                    key={relation.uniqueId}
                    id={`node-${index}`}
                    label={`Relation: ${relation.type}`}
                    relations={[
                        {
                            targetId: "selectedNode",
                            targetAnchor: "top",
                            sourceAnchor: "bottom",
                            label: (
                                <HoverLabel
                                    id={relation.uniqueId}
                                    text={`${relation.name}---${relation.uniqueId}`}
                                    show={hoveredRelationId === relation.uniqueId}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ),
                        },
                    ]}
                >
                    {/* <div

                    >
                        {relation.name}
                    </div> */}
                </Node>
            ));
    };

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                <div style={styles.relationsRow}>{renderRelations()}</div>
                <Node id="selectedNode" label={selectedNode.name} />
            </div>
        </ArcherContainer>
    );
};

// Extracted styles for reuse
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
    },
    relationsRow: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "250px",
    },
    node: {
        padding: "10px 20px",
        border: "2px solid black",
        borderRadius: "4px",
        cursor: "pointer",
    },
    hiddenLabel: {
        opacity: 0,
        transition: "opacity 0.2s ease",
    },
    visibleLabel: {
        opacity: 1,
        transition: "opacity 0.2s ease",
    },
};

//export default DynamicNodeComponent;

const data = {
    selectedNode: {
        _id: "66c761d52285bb9ae3967961",
        uniqueId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
        name: "Java 8",
        itemType: "category",
        createdDate: "2024-08-22T16:05:41.919Z",
        updatedDate: "2024-08-22T16:05:41.919Z",
        softDelete: false,
        relations: [
            {
                uniqueId: "0605ed30-cefa-4633-a565-41adeb1ad3ab",
                name: "REL_NEXT_PREVIOUS",
                type: "previous",
                showReverseRelationName: false,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "f41937a6-2215-4420-b088-b4cb488da047",
                createdDate: "2024-08-22T16:23:33.094Z",
                updatedDate: "2024-08-22T16:23:33.094Z",
                softDelete: false,
                _id: "66c76605bfee1d72d8db5885",
            },
            {
                uniqueId: "ceb7c235-6681-4072-9284-6577968bc286",
                name: "REL_NEXT_PREVIOUS",
                type: "next",
                showReverseRelationName: true,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "4ed978fb-8aa5-4fa3-ac0d-6f696fcec59d",
                createdDate: "2024-08-22T16:29:09.412Z",
                updatedDate: "2024-08-22T16:29:09.412Z",
                softDelete: false,
                _id: "66c76755bfee1d72d8dd7eb5",
            },
            {
                uniqueId: "a168b9f4-c346-417b-b14f-aa37c137889e",
                name: "REL_NEXT_PREVIOUS",
                type: "next",
                showReverseRelationName: true,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "036eeefc-a1fb-49e0-b0c9-a1cf82807774",
                createdDate: "2024-08-22T16:42:48.267Z",
                updatedDate: "2024-08-22T16:42:48.267Z",
                softDelete: false,
                _id: "66c76a88bfee1d72d8e4c9b2",
            },
            {
                uniqueId: "8bb83f6e-7676-4929-967a-238876c64c41",
                name: "REL_NEXT_PREVIOUS",
                type: "next",
                showReverseRelationName: true,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "9fd69315-29c9-460d-ae17-0dc6f90d9f83",
                createdDate: "2024-08-22T17:07:23.112Z",
                updatedDate: "2024-08-22T17:07:23.112Z",
                softDelete: false,
                _id: "66c7704b4a356c8838930516",
            },
            {
                uniqueId: "ebc3d43e-ca66-4b9d-9549-cd52db5242ee",
                name: "REL_NEXT_PREVIOUS",
                type: "next",
                showReverseRelationName: true,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "ccce13f5-d9a8-42ba-aeaa-b065b6f671a0",
                createdDate: "2024-08-23T10:06:36.638Z",
                updatedDate: "2024-08-23T10:06:36.638Z",
                softDelete: false,
                _id: "66c85f2cb00cb696d16a7047",
            },
            {
                uniqueId: "ecbde06e-17a4-4523-a0d1-e2b335c6b525",
                name: "REL_NEXT_PREVIOUS",
                type: "next",
                showReverseRelationName: true,
                hasId: "ba9d734f-b877-40b1-a13a-43652634e1d7",
                withId: "7e6ceb9c-0429-41d3-a633-95354110144f",
                createdDate: "2024-08-23T11:20:44.588Z",
                updatedDate: "2024-08-23T11:20:44.588Z",
                softDelete: false,
                _id: "66c8708cb00cb696d1856940",
            },
        ],
    },
};

// Example usage
const TwoNodeComponentV5_2 = () => {


    return (
        <>
            {/* <h1>Lund ka pakora</h1> */}
            <DynamicNodeComponent selectedNode={data.selectedNode} />
        </>
    );
};

export default TwoNodeComponentV5_2;
