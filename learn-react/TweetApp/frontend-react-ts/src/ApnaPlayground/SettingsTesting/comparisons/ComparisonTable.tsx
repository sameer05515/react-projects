import React from 'react';

const ComparisonTable = ({ expectations1, expectations2 }) => {
  // Combine headers from both sets of expectations
  const allHeaders = [...new Set([...expectations1.map(item => item.header), ...expectations2.map(item => item.header)])];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse my-5">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="bg-gray-100 p-2.5 text-left border-b border-gray-300">Header</th>
            <th className="bg-gray-100 p-2.5 text-left border-b border-gray-300">Expectations Set 1</th>
            <th className="bg-gray-100 p-2.5 text-left border-b border-gray-300">Expectations Set 2</th>
          </tr>
        </thead>
        <tbody>
          {allHeaders.map(header => (
            <tr key={header} className="border-b border-gray-300 hover:bg-gray-50">
              <td className="p-2.5 text-left">{header}</td>
              <td className="p-2.5 text-left">{getValuesForHeader(expectations1, header)}</td>
              <td className="p-2.5 text-left">{getValuesForHeader(expectations2, header)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get values for a specific header
const getValuesForHeader = (expectations, header) => {
  const item = expectations.find(item => item.header === header);
  return item ? item.values.join(', ') : 'NA';
};

export default ComparisonTable;
