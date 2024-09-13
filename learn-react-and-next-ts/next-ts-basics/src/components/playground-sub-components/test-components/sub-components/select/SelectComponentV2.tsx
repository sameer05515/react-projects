import React, { useState } from 'react';
import styles from '../styles/SelectComponent.module.css';

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={handleChange} value={selectedOption}>
        {Array.from({ length: 200 }, (_, idx) => (
          <option key={idx} value={`Option_${idx + 1}`}>
            Option_{idx + 1}
          </option>
        ))}
      </select>
      <span className={styles.selectedText}>Selected: {selectedOption}</span>
    </div>
  );
};

export default SelectComponent;
