import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { selectAllFlatTopics } from "../../../../redux/slices/topicSlice";
import CreateTopic from "../common/CreateTopic"; // Import the CreateTopic component
import TopicCard from "../common/TopicCard";

function ListTopic() {
  const topics = useSelector(selectAllFlatTopics);
  const loading = useSelector((state: RootState) => state.topics.loading);
  const error = useSelector((state: RootState) => state.topics.error as string | null);
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
      {loading === "pending" && <p>Loading topics...</p>}
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
          topic={editTopic}
          onSave={handleCreateOrUpdateTopic}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {loading === "fulfilled" && (
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
