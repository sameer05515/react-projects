import React, { useState } from 'react';

// PopupMenu Component
const PopupMenu = ({ position, onOptionSelect }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                padding: '10px',
            }}
        >
            <div onClick={() => onOptionSelect('Edit')} style={{ padding: '5px', cursor: 'pointer' }}>
                Edit
            </div>
            <div onClick={() => onOptionSelect('Delete')} style={{ padding: '5px', cursor: 'pointer' }}>
                Delete
            </div>
            <div onClick={() => onOptionSelect('Rename')} style={{ padding: '5px', cursor: 'pointer' }}>
                Rename
            </div>
        </div>
    );
};

// BirdListV2 Component
const BirdListV2 = () => {
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
        <div style={{ display: 'flex' }}>
            <div style={{ padding: '20px', width: '200px', borderRight: '1px solid #ccc' }}>
                <h3>Birds</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {birds.map((bird, index) => (
                        <li
                            key={index}
                            onContextMenu={(e) => handleRightClick(e, bird)}
                            style={{ padding: '5px 0', cursor: 'pointer' }}
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

export default BirdListV2;
