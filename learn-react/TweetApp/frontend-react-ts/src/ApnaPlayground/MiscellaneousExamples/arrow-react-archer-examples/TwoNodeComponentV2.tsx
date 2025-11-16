import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const TwoNodeComponentV2 = () => {
    const [showArrow, setShowArrow] = useState(false);

    const handleMouseEnter = () => setShowArrow(true);
    const handleMouseLeave = () => setShowArrow(false);

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                <ArcherElement
                    id="node1"
                    relations={
                        
                            [
                                  {
                                      targetId: 'node2',
                                      targetAnchor: 'top',
                                      sourceAnchor: 'bottom',
                                      label: showArrow? "Meri ladli beti":""
                                  },
                              ]
                            
                    }
                >
                    <div
                        style={styles.node}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
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
};

export default TwoNodeComponentV2;
