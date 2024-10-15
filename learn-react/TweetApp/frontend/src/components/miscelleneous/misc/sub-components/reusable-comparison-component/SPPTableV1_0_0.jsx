import React from 'react';

// Sample JSON data for comparison
const comparisonData = {
  differences: [
    {
      aspect: "Underlying Data Structure",
      ArrayList: "Resizable array",
      LinkedList: "Doubly linked list"
    },
    {
      aspect: "Access Time (get())",
      ArrayList: "O(1) - Fast random access due to direct indexing",
      LinkedList: "O(n) - Sequential access is required"
    },
    {
      aspect: "Insertion Time (add())",
      ArrayList: "O(n) - Requires shifting elements when inserting in the middle or beginning",
      LinkedList: "O(1) - Efficient insertion at the beginning or middle"
    },
    {
      aspect: "Deletion Time (remove())",
      ArrayList: "O(n) - Requires shifting elements when removing from the middle or beginning",
      LinkedList: "O(1) - Efficient removal from the beginning or middle"
    },
    {
      aspect: "Memory Usage",
      ArrayList: "Less memory overhead as it only stores the elements",
      LinkedList: "More memory overhead due to storing node pointers"
    },
    {
      aspect: "Use Case",
      ArrayList: "Better for frequent access operations",
      LinkedList: "Better for frequent insertion and deletion operations"
    }
  ]
};

// Reusable Comparison Component
const ComparisonComponent = ({ data }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={thStyle}>Aspect</th>
          <th style={thStyle}>ArrayList</th>
          <th style={thStyle}>LinkedList</th>
        </tr>
      </thead>
      <tbody>
        {data.differences.map((item, index) => (
          <tr key={index}>
            <td style={tdStyle}>{item.aspect}</td>
            <td style={tdStyle}>{item.ArrayList}</td>
            <td style={tdStyle}>{item.LinkedList}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// CSS styles
const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

// Usage example
const SPPTableV1_0_0 = () => {
  return (
    <div>
      <h1>Comparison: ArrayList vs LinkedList</h1>
      <ComparisonComponent data={comparisonData} />
    </div>
  );
};

export default SPPTableV1_0_0;
