import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RadioButtonsComponent = ({
    initialSelectedOption = '',
    options = [],
    onChange = () => {},
    containerStyle = {},
    labelStyle = {},
}) => {
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

    const handleOptionChange = (e, option) => {
        setSelectedOption(e.target.value);
        onChange(option);
    };

    // Default styles with ability to override via props
    const defaultStyles = {
        container: {
            display: 'flex',
            alignItems: 'start',
            ...containerStyle, // Merges external container style
        },
        label: {
            margin: '5px 0',
            paddingLeft: '5px',
            fontSize: '16px',
            color: '#333',
            ...labelStyle, // Merges external label style
        },
    };

    return (
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
    );
};

// Prop type validation
RadioButtonsComponent.propTypes = {
    initialSelectedOption: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func,
    containerStyle: PropTypes.object,
    labelStyle: PropTypes.object,
};

// Default props
RadioButtonsComponent.defaultProps = {
    initialSelectedOption: '',
    onChange: () => {},
    containerStyle: {},
    labelStyle: {},
};

export default RadioButtonsComponent;

// Usage example
// const itemTypeOptions = [
//   { value: 'topic', label: 'Topic' },
//   { value: 'section', label: 'Section' },
//   { value: 'link', label: 'Link' },
//   { value: 'interview-question', label: 'Interview Question' },
// ];

// // In your main component or App component
// const App = () => {
//   return <RadioButtonsComponent options={itemTypeOptions} />;
// };

// export default App;
