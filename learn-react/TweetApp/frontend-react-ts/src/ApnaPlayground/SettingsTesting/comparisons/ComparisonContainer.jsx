// ComparisonContainer.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../redux/slices/comparableDataSlice"; // Adjust the path
import ComparableDataList from "./ComparableDataList"; // Adjust the path
import SaveUpdateComparableData from "./SaveUpdateComparableData"; // Adjust the path
import CustomButton from "../../../common/components/custom-button/CustomButton";

const ComparisonContainer = ({ additionalProp }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDoubleClick = (item) => {
    // Set the selected item for editing when double-clicked
    // console.log('------------',JSON.stringify(item),'------------');
    setSelectedItem(item);
  };

  const handleSaveUpdateComplete = () => {
    // Reset the selected item after saving or updating
    setSelectedItem(null);
    // Fetch data when the component mounts
    dispatch(fetchData());
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Comparison Container</h2>
      {additionalProp && (
        <p className="mb-4 text-gray-600">Additional Prop: {additionalProp}</p>
      )}
      <div className="mb-4">
        {(showForm || selectedItem) && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <SaveUpdateComparableData
              dataToEdit={selectedItem}
              onSaveComplete={handleSaveUpdateComplete}
            />
          </div>
        )}
        {!showForm && !selectedItem && (
          <CustomButton onClick={() => setShowForm(true)}>Add New Comparison</CustomButton>
        )}
      </div>
      <ComparableDataList onDoubleClick={handleDoubleClick} />
    </div>
  );
};

export default ComparisonContainer;
