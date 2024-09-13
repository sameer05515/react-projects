import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/SelectComponent.v2_3.module.css';

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.container}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button className={styles.dropdownButton} onClick={toggleDropdown}>
          {selectedOption || 'Select an option'}
        </button>
        {isOpen && (
          <div className={styles.options}>
            {Array.from({ length: 200 }, (_, idx) => (
              <div
                key={idx}
                className={styles.option}
                onClick={() => selectOption(`Option_${idx + 1}`)}
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
