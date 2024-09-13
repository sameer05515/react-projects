import React, { useState } from 'react';
import styles from '../styles/SelectComponent.v2_1.module.css';

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option:string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <button className={styles.dropdownButton} onClick={toggleDropdown}>
          {selectedOption || 'Select an option'}
        </button>
        {isOpen && (
          <div className={styles.options}>
            {Array.from({ length: 200 }, (_, idx) => (
              <div
                key={idx}
                className={styles.option}
                onClick={(e) => selectOption(`Option_${idx + 1}`)}
              >
                Option_{idx + 1}
              </div>
            ))}
          </div>
        )}
      </div>
      <span className={styles.selectedText}>Selected: {selectedOption}</span>
    </div>
  );
};

export default SelectComponent;
