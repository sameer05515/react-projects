import React, { useState, useEffect } from 'react';

const CustomCheckbox = ({ title, onChange, initiallySelected = true }) => {
    const [isChecked, setIsChecked] = useState(initiallySelected);

    // useEffect(() => {
    //     setIsChecked(initiallySelected);
    // }, [initiallySelected]);

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setIsChecked(checked);
        onChange(checked);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label style={{ marginLeft: '8px' }}>{title}</label>
        </div>
    );
};

export default CustomCheckbox;
