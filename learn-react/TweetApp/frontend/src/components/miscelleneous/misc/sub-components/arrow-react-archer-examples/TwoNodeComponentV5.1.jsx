import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const RenderNodes = ({ selectedNode }) => {
    const [hoveredRelation, setHoveredRelation] = useState(null);

    const handleMouseEnter = (relationId) => setHoveredRelation(relationId);
    const handleMouseLeave = () => setHoveredRelation(null);

    const previousRelations = selectedNode.relations
        .filter(relation => relation.type === 'previous')
        .map((relation, index) => (
            <ArcherElement
                key={relation.uniqueId}
                id={`prevNode-${index}`}
                relations={[
                    {
                        targetId: 'selectedNode',
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom',
                        label: hoveredRelation === relation.uniqueId ? relation.name : '',
                    },
                ]}
            >
                <div
                    style={styles.node}
                    onMouseEnter={() => handleMouseEnter(relation.uniqueId)}
                    onMouseLeave={handleMouseLeave}
                >
                    {relation.name}
                </div>
            </ArcherElement>
        ));

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                {/* First row: Previous relations */}
                <div style={styles.row}>{previousRelations}</div>

                {/* Second row: Selected Node */}
                <ArcherElement id="selectedNode">
                    <div style={styles.node}>{selectedNode.name}</div>
                </ArcherElement>
            </div>
        </ArcherContainer>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    node: {
        padding: '10px 20px',
        border: '2px solid black',
        borderRadius: '4px',
        margin: '0 10px',
        cursor: 'pointer',
    },
};

// Example usage
const TwoNodeComponentV5_1 = () => {
    const selectedNodeData = {
        "_id": "66c761d52285bb9ae3967961",
        "uniqueId": "ba9d734f-b877-40b1-a13a-43652634e1d7",
        "name": "Java 8",
        "itemType": "category",
        "createdDate": "2024-08-22T16:05:41.919Z",
        "updatedDate": "2024-08-22T16:05:41.919Z",
        "softDelete": false,
        "relations": [
            {
                "uniqueId": "0605ed30-cefa-4633-a565-41adeb1ad3ab",
                "name": "REL_NEXT_PREVIOUS",
                "type": "previous",
                "showReverseRelationName": false,
                "hasId": "ba9d734f-b877-40b1-a13a-43652634e1d7",
                "withId": "f41937a6-2215-4420-b088-b4cb488da047",
                "createdDate": "2024-08-22T16:23:33.094Z",
                "updatedDate": "2024-08-22T16:23:33.094Z",
                "softDelete": false,
                "_id": "66c76605bfee1d72d8db5885"
            },
            // Add more relations here...
        ]
    };

    return <RenderNodes selectedNode={selectedNodeData} />;
};

export default TwoNodeComponentV5_1;
