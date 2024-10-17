import React from 'react'

const popupStyles = {
    popup: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupInner: {
        position: 'relative',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        //textAlign: 'center',
        minWidth: '70vw',
        maxHeight: "80vh", // Set a maximum height to trigger scrolling if the content exceeds it
        overflowY: "auto", // Enable vertical scrolling when the content overflows
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
};

const Popup = ({ headerText = 'Popup Content', children, onClose = () => { } }) => (
    <div style={popupStyles.popup}>
        <div style={popupStyles.popupInner}>
            <button style={popupStyles.closeButton} onClick={onClose}>&times;</button>
            <h2>{headerText}</h2>
            {children ? children : <p>This is a simple popup</p>}
        </div>
    </div>
);

export default Popup