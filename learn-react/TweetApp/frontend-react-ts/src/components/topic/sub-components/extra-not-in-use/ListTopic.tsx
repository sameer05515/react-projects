import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { selectAllFlatTopics, selectTopicsStateCombined } from "../../../../redux/slices/topicSlice";
import CreateTopic from "../common/CreateTopic"; // Import the CreateTopic component
import TopicCard from "../common/TopicCard";

function ListTopic() {
  // ✅ Optimized: Use combined selector for status and error, separate for flatTopics
  const topics = useSelector(selectAllFlatTopics);
  const { status, error } = useSelector((state: RootState) => selectTopicsStateCombined(state)); // ✅ Standardized: loading -> status
  const [showForm, setShowForm] = useState(false);

  // State to manage editing
  const [editTopic, setEditTopic] = useState(null);

  const handleEditTopic = (topic) => {
    handleCancelEdit();
    setShowForm(true);
    setEditTopic(topic);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditTopic(null);
  };

  const handleCreateOrUpdateTopic = () => {
    setShowForm(false);
    // Handle saving or updating the topic here
    // You can dispatch the createTopic or updateTopic action
    // and update the state accordingly.
  };

  const listStyleGen = (columns = 3) => `grid grid-cols-${columns} gap-5`;

  return (
    <div>
      {status === "loading" && <p>Loading topics...</p>} {/* ✅ Standardized: use status */}
      {error && <p>Error: {error}</p>}
      {/* CreateTopic component for creating and editing topics */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Add
        </button>
      )}
      {showForm && (
        <CreateTopic
          parentId={null}
          topic={editTopic}
          onSave={handleCreateOrUpdateTopic}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {status === "succeeded" && ( // ✅ Standardized: use status
        <div className="grid grid-cols-5 gap-5">
          {topics.map((topic) => (
            <div
              key={topic.uniqueId}
              className="rounded border border-gray-300 p-2.5"
              onDoubleClick={() => handleEditTopic(topic)}
            >
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListTopic;
