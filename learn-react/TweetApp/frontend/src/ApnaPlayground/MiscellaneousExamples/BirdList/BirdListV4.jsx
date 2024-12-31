import React, { useState } from "react";
import { styles } from "../styles";
import PopupMenu from "../PopupMenu/v2";



const BirdItem = ({ bird, onItemRightClick = () => { } }) => {
    return (
        <li
            onContextMenu={(e) => onItemRightClick(e, bird)}
            style={styles.birdListItem}
        >
            {bird}
        </li>
    );
};
// BirdListV2 Component
const BirdListV4 = () => {
    const [birds] = useState(["Sparrow", "Eagle", "Parrot", "Penguin"]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [selectedBird, setSelectedBird] = useState(null);

    const handleRightClick = (event, bird) => {
        console.log(
            `Open menu for: ${bird} , event.pageX: ${event.pageX} , event.pageY: ${event.pageY}`
        );
        event.preventDefault();
        setSelectedBird(bird);
        setPopupPosition({ x: event.pageX, y: event.pageY });
        setPopupVisible(true);
    };

    const handlePopupOption = (option) => {
        console.log(`${option} selected for ${selectedBird}`);
        setPopupVisible(false);
    };

    const popupOptions = [
        { title: "Edit" },
        { title: "Delete" },
        { title: "Rename" },
    ];

    return (
        <div style={styles.birdListContainer}>
            <div style={styles.birdListSidebar}>
                <h3 style={styles.birdListHeader}>Birds</h3>
                <ul style={styles.birdList}>
                    {birds.map((bird, index) => (
                        <BirdItem
                            key={index}
                            bird={bird}
                            onItemRightClick={(e, bird) => handleRightClick(e, bird)}
                        />
                    ))}
                </ul>
            </div>

            {popupVisible && (
                <PopupMenu
                    position={popupPosition}
                    popupOptions={popupOptions}
                    onOptionSelect={handlePopupOption}
                />
            )}
        </div>
    );
};

export default BirdListV4;
