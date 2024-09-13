import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = ({ options, onChange = () => { } }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = option => {
        setSelectedOption(option);
        onChange(option.value);
    };

    return (
        <>            
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
            />
           {/* selectedOption: <pre>{JSON.stringify(selectedOption, null, 2)}</pre> */}
        </>
    );
};

export default CustomSelect;
