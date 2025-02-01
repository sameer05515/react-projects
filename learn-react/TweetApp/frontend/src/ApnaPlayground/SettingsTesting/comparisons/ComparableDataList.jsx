// ComparableDataList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/slices/comparableDataSlice'; // Adjust the path

const ComparableDataList = ({ onDoubleClick }) => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.comparableData);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    dispatch(fetchData());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Comparable Data List</h2>
      {data.map((item) => (
        <div
          key={item._id}
          onDoubleClick={() => {
            setSelectedItemId(item._id);
            onDoubleClick && onDoubleClick(item);
          }}
          style={{
            cursor: 'pointer',
            background: selectedItemId === item._id ? '#e0e0e0' : 'inherit',
            padding: '10px',
            marginBottom: '5px',
            borderRadius: '5px',
          }}
        >
          <p>Title: {item.title}</p>
          <p>Initial Summary: {item.initialSummary}</p>
          <p>Final Summary: {item.finalSummary}</p>
          {/* Display parameters */}
          <div>
            <strong>Parameters:</strong>
            <ul>
              {item.parameters.map((parameter, index) => (
                <li key={index}>
                  <strong>{parameter.header}:</strong> {parameter.value}
                </li>
              ))}
            </ul>
          </div>
          {/* Add other fields as needed */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ComparableDataList;
