import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const TwoNodeComponentV3 = () => {
    const [showArrow, setShowArrow] = useState(false);

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                <ArcherElement
                    id="node1"
                    relations={[
                        {
                            targetId: 'node2',
                            targetAnchor: 'top',
                            sourceAnchor: 'bottom',
                            label: <div style={showArrow ? styles.visibleLabel : styles.hiddenLabel}>Meri ladli beti</div>,
                        },
                    ]}
                >
                    <div
                        style={styles.node}
                        onMouseEnter={() => setShowArrow(true)}
                        onMouseLeave={() => setShowArrow(false)}
                    >
                        Node 1 (Hover me)
                    </div>
                </ArcherElement>

                <ArcherElement id="node2">
                    <div style={styles.node}>
                        Node 2
                    </div>
                </ArcherElement>
            </div>
        </ArcherContainer>
    );
};

// Basic styles for the container and nodes
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
    },
    node: {
        padding: '10px 20px',
        border: '2px solid black',
        borderRadius: '4px',
        marginBottom: '100px',
        cursor: 'pointer',
    },
    hiddenLabel: {
        opacity: 0,
        transition: 'opacity 0.2s ease',
    },
    visibleLabel: {
        opacity: 1,
        transition: 'opacity 0.2s ease',
    },
};

export default TwoNodeComponentV3;
