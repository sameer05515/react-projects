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
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-800 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Comparable Data List</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item._id}
            onDoubleClick={() => {
              setSelectedItemId(item._id);
              onDoubleClick && onDoubleClick(item);
            }}
            className={`cursor-pointer p-2.5 mb-1.5 rounded-lg border transition-colors ${
              selectedItemId === item._id
                ? 'bg-gray-200 border-blue-400 shadow-md'
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            <p className="font-semibold text-lg mb-2 text-gray-800">Title: <span className="text-blue-700">{item.title}</span></p>
            <p className="mb-1 text-gray-700"><strong>Initial Summary:</strong> {item.initialSummary}</p>
            <p className="mb-2 text-gray-700"><strong>Final Summary:</strong> {item.finalSummary}</p>
            {/* Display parameters */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <strong className="text-gray-700">Parameters:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {item.parameters.map((parameter, index) => (
                  <li key={index} className="text-gray-600">
                    <strong>{parameter.header}:</strong> {parameter.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparableDataList;
