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
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Comparison Table</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="set1" className="block font-semibold mb-2 text-gray-700">
            Select Expectations Set 1:
          </label>
          <select 
            id="set1" 
            onChange={handleSet1Change}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {expectationsData.map((set) => (
              <option key={set.title} value={set.title}>
                {set.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="set2" className="block font-semibold mb-2 text-gray-700">
            Select Expectations Set 2:
          </label>
          <select 
            id="set2" 
            onChange={handleSet2Change}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {expectationsData.map((set) => (
              <option key={set.title} value={set.title}>
                {set.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ComparisonTable expectations1={selectedExpectationsSet1 || []} expectations2={selectedExpectationsSet2 || []} />
    </div>
  );
};

export default ComparisonTableContainer;
