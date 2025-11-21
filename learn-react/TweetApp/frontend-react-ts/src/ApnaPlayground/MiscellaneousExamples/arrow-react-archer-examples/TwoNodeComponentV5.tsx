import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

// Reusable Label component
interface HoverLabelProps {
    text: string;
    show: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
const HoverLabel: React.FC<HoverLabelProps> = ({ text, show, onMouseEnter, onMouseLeave }) => (
    <div
        style={show ? styles.visibleLabel : styles.hiddenLabel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {text}
    </div>
);

// Reusable Node component
type AnchorPosition = 'top' | 'bottom' | 'left' | 'right';
interface Relation {
    targetId: string;
    targetAnchor: AnchorPosition;
    sourceAnchor: AnchorPosition;
    label?: React.ReactNode;
}
interface NodeProps {
    id: string;
    label?: string;
    children?: React.ReactNode;
    relations?: Relation[];
}
const Node: React.FC<NodeProps> = ({ id, label, children, relations = [] }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={styles.node}>
            {children || label}
        </div>
    </ArcherElement>
);

const TwoNodeComponentV5 = () => {
    const [showLabel, setShowLabel] = useState(false);

    const handleLabelMouseEnter = () => setShowLabel(true);
    const handleLabelMouseLeave = () => setShowLabel(false);

    return (
        <ArcherContainer strokeColor="black">
            <div style={styles.container}>
                <Node
                    id="node1"
                    relations={[{
                        targetId: 'node2',
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom',
                        label: (
                            <HoverLabel
                                text="Meri ladli beti"
                                show={showLabel}
                                onMouseEnter={handleLabelMouseEnter}
                                onMouseLeave={handleLabelMouseLeave}
                            />
                        ),
                    }]}
                >
                    Node 1 (Hover me)
                </Node>

                <Node id="node2" label="Node 2">
                    Node 2
                </Node>
            </div>
        </ArcherContainer>
    );
};

// Extracted styles for reuse
const styles: {
    container: React.CSSProperties;
    node: React.CSSProperties;
    hiddenLabel: React.CSSProperties;
    visibleLabel: React.CSSProperties;
} = {
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

export default TwoNodeComponentV5;
