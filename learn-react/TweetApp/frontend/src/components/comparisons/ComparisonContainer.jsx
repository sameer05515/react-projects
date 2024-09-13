// ComparisonContainer.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/slices/comparableDataSlice"; // Adjust the path
import ComparableDataList from "./ComparableDataList"; // Adjust the path
import SaveUpdateComparableData from "./SaveUpdateComparableData"; // Adjust the path
import CustomButton from "../../common/components/custom-button/CustomButton";

const ComparisonContainer = ({ additionalProp }) => {
  const dispatch = useDispatch();
  const { data, /*status, error*/ } = useSelector((state) => state.comparableData);
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
    <div>
      <h2>Comparison Container</h2>
      <p>Additional Prop: {additionalProp}</p>
      {(showForm || selectedItem) && (
        <SaveUpdateComparableData
          dataToEdit={selectedItem}
          onSaveComplete={handleSaveUpdateComplete}
        />
      )}
      {!showForm && <CustomButton onClick={() => setShowForm(true)}>Add</CustomButton>}
      {/* Pass data prop to ComparableDataList */}
      <ComparableDataList data={data} onDoubleClick={handleDoubleClick} />
      {/* Pass dataToEdit prop to SaveUpdateComparableData */}
      
    </div>
  );
};

export default ComparisonContainer;
