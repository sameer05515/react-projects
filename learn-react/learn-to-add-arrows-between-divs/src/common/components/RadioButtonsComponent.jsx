import React, { useEffect, useState } from 'react';

const RadioButtonsComponent = ({
    initialSelectedOption = '',
    options = [],
    onChange = () => {},
    containerStyle = {},
    labelStyle = {},
    selectedOptionStyle = {},
    showSelectedOptionInfo = false
}) => {
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

    useEffect(() => {
        if (initialSelectedOption) {
            onChange(options.find(o => o.value === initialSelectedOption));
        }
    }, []);

    const handleOptionChange = (e, option) => {
        setSelectedOption(e.target.value);
        onChange(option);
    };

    // Default styles with ability to override via props
    const defaultStyles = {
        container: {
            display: 'flex',
            alignItems: 'start',
            ...containerStyle,
        },
        label: {
            margin: '5px 0',
            paddingLeft: '5px',
            fontSize: '16px',
            color: '#333',
            ...labelStyle,
        },
        selectedOption: {
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#333',
            ...selectedOptionStyle,
        },
    };

    return (
        <div>
            <div style={defaultStyles.container}>
                {options.map((option) => (
                    <label key={option.value} style={defaultStyles.label}>
                        <input
                            type="radio"
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={(e) => handleOptionChange(e, option)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            {showSelectedOptionInfo && (
                <div style={defaultStyles.selectedOption}>
                    selectedOption: {options.find(o => o.value === selectedOption)?.label || 'None'}
                </div>
            )}
        </div>
    );
};

export default RadioButtonsComponent;
