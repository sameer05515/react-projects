import React, { useState, ReactNode } from 'react';
import ToggleableIcon from './ToggleableIcon';

type ToggleablePanelProps = {
    title: string;
    children: ReactNode;
    showContent?: boolean;
};

const ToggleablePanel: React.FC<ToggleablePanelProps> = ({
    title = "",
    children,
    showContent: initialValueToShowMetadata = false
}) => {
    const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);

    const toggleMetadataVisibility = () => setShowMetadata(prev => !prev);

    return (
        <div>
            <ToggleableIcon
                isContentVisible={showMetadata}
                onToggle={toggleMetadataVisibility}
                additionalStyleForIcon={{ fontWeight: 'bold' }}
            />
            <span style={styles.title}>
                {title}
            </span>

            {showMetadata && children && (
                <div style={styles.metadataContainer}>
                    {children}
                </div>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        fontWeight: 'bold',
    },
    metadataContainer: {
        // maxWidth: "90vw",
        // overflow: "auto",
        paddingBottom: "10px",
        // gap: "10px",
        // border: "1px solid #ddd",
        // borderRadius: "5px",
        // backgroundColor: "#f9f9f9",
        margin: "20px 5px",
    },
};

export default ToggleablePanel;
