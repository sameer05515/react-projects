import React, { useState } from 'react';

const MyFormWithValidationV2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('Scope 1');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    if (/^[A-Za-z0-9]*$/.test(newInputValue) && newInputValue.length <= 50) {
      setInputValue(newInputValue);
      setInputError('');
    } else {
      setInputValue(newInputValue);
      setInputError('Input should be alphanumeric and 50 characters or less');
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any actions with the form data here
    console.log('Input Value:', inputValue);
    console.log('Selected Value:', selectedValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text Input (Alphanumeric, Max 50 characters):
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </label>
      {inputError && (
        <div style={{ color: 'red' }}>{inputError}</div>
      )}
      <br />
      <label>
        Select Scope:
        <select
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="Scope 1">Scope 1</option>
          <option value="Scope 2">Scope 2</option>
          <option value="Scope 3">Scope 3</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormWithValidationV2;
