import React, { useState } from 'react';

function EditActivityForm({ data, onSave, onCancel }) {
  const [activityName, setActivityName] = useState(data.activityName);
  const [selectedGroups, setSelectedGroups] = useState(data.selectedGroups);
  const [shouldContinue, setShouldContinue] = useState(data.shouldContinue);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Prepare updated data
    const updatedData = {
      activityName,
      selectedGroups,
      shouldContinue,
    };

    // Call the onSave callback with the updated data
    onSave(updatedData);

    // Clear form fields and close the edit form
    setActivityName('');
    setSelectedGroups([]);
    setShouldContinue(false);
    onCancel();
  };

  const handleGroupSelection = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter((selected) => selected !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  return (
    <div>
      <h2>Edit Activity</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="editActivityName">Activity Name:</label>
          <input
            type="text"
            id="editActivityName"
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
                checked={selectedGroups.includes('shareer')}
                onChange={() => handleGroupSelection('shareer')}
              />
              Shareer
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="ajeevika"
                checked={selectedGroups.includes('ajeevika')}
                onChange={() => handleGroupSelection('ajeevika')}
              />
              Ajeevika
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="pariwar"
                checked={selectedGroups.includes('pariwar')}
                onChange={() => handleGroupSelection('pariwar')}
              />
              Pariwar
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="bhawishya"
                checked={selectedGroups.includes('bhawishya')}
                onChange={() => handleGroupSelection('bhawishya')}
              />
              Bhawishya
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="n/a"
                checked={selectedGroups.includes('n/a')}
                onChange={() => handleGroupSelection('n/a')}
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditActivityForm;
