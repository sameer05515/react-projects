import React, { useState } from 'react';

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
        <label className="inline-flex items-center gap-2 text-sm text-gray-800">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
            />
            {title}
        </label>
    );
};

export default CustomCheckbox;
