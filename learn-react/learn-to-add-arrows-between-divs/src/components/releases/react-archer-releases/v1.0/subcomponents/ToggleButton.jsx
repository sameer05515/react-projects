import React from 'react'

// ToggleButton component
const ToggleButton = React.memo(({ title = "", isVisible, onToggle }) => (
    <button onClick={onToggle}>
        {isVisible ? `Hide ${title}` : `Show ${title}`}
    </button>
));

export default ToggleButton