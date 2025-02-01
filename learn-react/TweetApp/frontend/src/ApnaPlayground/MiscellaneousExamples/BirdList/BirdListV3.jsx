import React, { useState } from 'react';
import PopupMenu from '../PopupMenu/v1'; 


const styles = {
    "birdListContainer": {
        "display": "flex"
    },
    "birdListSidebar": {
        "padding": "20px",
        "width": "200px",
        "borderRight": "1px solid #ccc"
    },
    "birdListHeader": {
        "margin": "0"
    },
    "birdList": {
        "listStyleType": "none",
        "padding": "0"
    },
    "birdListItem": {
        "padding": "5px 0",
        "cursor": "pointer"
    },
    "popupMenu": {
        "position": "absolute",
        "backgroundColor": "#fff",
        "border": "1px solid #ccc",
        "borderRadius": "5px",
        "boxShadow": "0px 0px 10px rgba(0, 0, 0, 0.1)",
        "zIndex": 1000,
        "padding": "10px"
    },
    "popupOption": {
        "padding": "5px",
        "cursor": "pointer"
    }
};





const BirdListV3 = () => {
    const [birds] = useState(['Sparrow', 'Eagle', 'Parrot', 'Penguin']);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [selectedBird, setSelectedBird] = useState(null);

    const handleRightClick = (event, bird) => {
        event.preventDefault();
        setSelectedBird(bird);
        setPopupPosition({ x: event.pageX, y: event.pageY });
        setPopupVisible(true);
    };

    const handlePopupOption = (option) => {
        console.log(`${option} selected for ${selectedBird}`);
        setPopupVisible(false);
    };

    return (
        <div style={styles.birdListContainer}>
            <div style={styles.birdListSidebar}>
                <h3 style={styles.birdListHeader}>Birds</h3>
                <ul style={styles.birdList}>
                    {birds.map((bird, index) => (
                        <li
                            key={index}
                            onContextMenu={(e) => handleRightClick(e, bird)}
                            style={styles.birdListItem}
                        >
                            {bird}
                        </li>
                    ))}
                </ul>
            </div>

            {popupVisible && (
                <PopupMenu position={popupPosition} onOptionSelect={handlePopupOption} />
            )}
        </div>
    );
};


export default BirdListV3;