import React from 'react';

const ComparisonTable = ({ expectations1, expectations2 }) => {
  // Combine headers from both sets of expectations
  const allHeaders = [...new Set([...expectations1.map(item => item.header), ...expectations2.map(item => item.header)])];

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.headerCell}>Header</th>
          <th style={styles.expectationCell}>Expectations Set 1</th>
          <th style={styles.expectationCell}>Expectations Set 2</th>
        </tr>
      </thead>
      <tbody>
        {allHeaders.map(header => (
          <tr key={header}>
            <td style={styles.cell}>{header}</td>
            <td style={styles.cell}>{getValuesForHeader(expectations1, header)}</td>
            <td style={styles.cell}>{getValuesForHeader(expectations2, header)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Helper function to get values for a specific header
const getValuesForHeader = (expectations, header) => {
  const item = expectations.find(item => item.header === header);
  return item ? item.values.join(', ') : 'NA';
};

const styles = {
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '20px',
  },
  headerCell: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  expectationCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};

export default ComparisonTable;
