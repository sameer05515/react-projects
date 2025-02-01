import React, { useState } from 'react';
import expectationsData from '../../../common/constants/expectationsData';
import ComparisonTable from './ComparisonTable';

const ComparisonTableContainer = () => {
  const [selectedExpectationsSet1, setSelectedExpectationsSet1] = useState(null);
  const [selectedExpectationsSet2, setSelectedExpectationsSet2] = useState(null);

  const handleSet1Change = (event) => {
    const selectedTitle = event.target.value;
    const selectedSet = expectationsData.find((set) => set.title === selectedTitle);
    setSelectedExpectationsSet1(selectedSet?.expectations || []);
  };

  const handleSet2Change = (event) => {
    const selectedTitle = event.target.value;
    const selectedSet = expectationsData.find((set) => set.title === selectedTitle);
    setSelectedExpectationsSet2(selectedSet?.expectations || []);
  };

  return (
    <div>
      <h2>Comparison Table</h2>
      <div>
        <label htmlFor="set1">Select Expectations Set 1: </label>
        <select id="set1" onChange={handleSet1Change}>
          <option value="">Select...</option>
          {expectationsData.map((set) => (
            <option key={set.title} value={set.title}>
              {set.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="set2">Select Expectations Set 2: </label>
        <select id="set2" onChange={handleSet2Change}>
          <option value="">Select...</option>
          {expectationsData.map((set) => (
            <option key={set.title} value={set.title}>
              {set.title}
            </option>
          ))}
        </select>
      </div>
      <ComparisonTable expectations1={selectedExpectationsSet1 || []} expectations2={selectedExpectationsSet2 || []} />
    </div>
  );
};

export default ComparisonTableContainer;
