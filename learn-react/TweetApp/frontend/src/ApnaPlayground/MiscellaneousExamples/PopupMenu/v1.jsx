import React from 'react';

const styles={
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
  

const PopupMenu = ({ position, onOptionSelect }) => {
    return (
        <div
            style={{
                ...styles.popupMenu,
                top: position.y,
                left: position.x
            }}
        >
            <div onClick={() => onOptionSelect('Edit')} style={styles.popupOption}>
                Edit
            </div>
            <div onClick={() => onOptionSelect('Delete')} style={styles.popupOption}>
                Delete
            </div>
            <div onClick={() => onOptionSelect('Rename')} style={styles.popupOption}>
                Rename
            </div>
        </div>
    );
};

export default PopupMenu;
