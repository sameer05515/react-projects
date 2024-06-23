import React, { useState } from "react";

import EditActivityForm from "./EditActivityForm";
import APPLICATION_BASE_URL from "../../common/config";

function ActivityForm() {
  const [activityName, setActivityName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [savedData, setSavedData] = useState([]);
  const [editData, setEditData] = useState(null); // Store data for editing

  const handleGroupSelection = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(
        selectedGroups.filter((selected) => selected !== group)
      );
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save the data to the savedData state
    const newData = {
      activityName,
      selectedGroups,
      shouldContinue,
    };
    setSavedData([...savedData, newData]);

    // Clear the form fields
    setActivityName("");
    setSelectedGroups([]);
    setShouldContinue(false);
  };

  const handleEdit = (data) => {
    // Set the data for editing
    setEditData(data);
  };

  const handleCancelEdit = () => {
    // Clear the edit data
    setEditData(null);
  };

  const handleUpdate = (updatedData) => {
    // Update the saved data
    const updatedSavedData = savedData.map((data) =>
      data === editData ? updatedData : data
    );
    setSavedData(updatedSavedData);
    setEditData(null); // Clear the edit data
  };

  return (
    <div>
      <h2>Activity Form</h2>
      <div>
        <p>{`Base URL:-    ${APPLICATION_BASE_URL}`}</p>
        {/* Use BASE_URL wherever you need it */}
      </div>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="activityName">Activity Name:</label>
          <input
            type="text"
            id="activityName"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Related Groups:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="shareer"
                checked={selectedGroups.includes("shareer")}
                onChange={() => handleGroupSelection("shareer")}
              />
              Shareer
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="ajeevika"
                checked={selectedGroups.includes("ajeevika")}
                onChange={() => handleGroupSelection("ajeevika")}
              />
              Ajeevika
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="pariwar"
                checked={selectedGroups.includes("pariwar")}
                onChange={() => handleGroupSelection("pariwar")}
              />
              Pariwar
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="bhawishya"
                checked={selectedGroups.includes("bhawishya")}
                onChange={() => handleGroupSelection("bhawishya")}
              />
              Bhawishya
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="n/a"
                checked={selectedGroups.includes("n/a")}
                onChange={() => handleGroupSelection("n/a")}
              />
              N/A
            </label>
          </div>
        </div>
        <div>
          <label>Should Continue:</label>
          <div>
            <label>
              <input
                type="radio"
                name="shouldContinue"
                value="true"
                checked={shouldContinue}
                onChange={() => setShouldContinue(true)}
              />
              Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="shouldContinue"
                value="false"
                checked={!shouldContinue}
                onChange={() => setShouldContinue(false)}
              />
              No
            </label>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>

      {/* Display the saved data in a table */}
      {savedData.length > 0 && (
        <div>
          <h2>Saved Data</h2>
          <table>
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Related Groups</th>
                <th>Should Continue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data, index) => (
                <tr key={index} onDoubleClick={() => handleEdit(data)}>
                  <td>{data.activityName}</td>
                  <td>{data.selectedGroups.join(", ")}</td>
                  <td>{data.shouldContinue ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Conditionally render the edit form */}
      {editData && (
        <div>
          <h2>Edit Activity</h2>
          <form onSubmit={() => handleUpdate(editData)}>
            <EditActivityForm data={editData} onCancel={handleCancelEdit} />
          </form>
        </div>
      )}
    </div>
  );
}

export default ActivityForm;
