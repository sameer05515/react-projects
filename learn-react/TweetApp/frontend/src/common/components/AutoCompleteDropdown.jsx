import React, { useState } from 'react';

const AutoCompleteDropdown = ({ names }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the names based on the input value
    const filtered = names.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNames(filtered);
    setShowDropdown(true);
  };

  const handleDropdownItemClick = (name) => {
    setInputValue(name);
    setShowDropdown(false);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder="Search for names"
        value={inputValue}
        onChange={handleInputChange}
      />
      {showDropdown && (
        <ul className="dropdown">
          {filteredNames.map((name, index) => (
            <li key={index} onClick={() => handleDropdownItemClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteDropdown;
