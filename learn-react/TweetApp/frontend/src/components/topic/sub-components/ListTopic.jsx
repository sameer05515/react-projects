import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../../redux/topicSlice";
import CreateTopic from "./CreateTopic"; // Import the CreateTopic component
import TopicCard from "./TopicCard";
import { selectAllFlatTopics } from "../../../redux/slices/topicSlice";


function ListTopic() {
  const topics = useSelector(selectAllFlatTopics);
  const loading = useSelector((state) => state.topics.loading);
  const error = useSelector((state) => state.topics.error);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  


  // State to manage editing
  const [editTopic, setEditTopic] = useState(null);

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

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

  

  const listStyleGen= (columns=3)=>{
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: "20px",
    }
  }

  const itemStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    // Add other styling as needed
  };

  return (
    <div>
      {loading === "pending" && <p>Loading topics...</p>}
      {error && <p>Error: {error}</p>}
      {/* CreateTopic component for creating and editing topics */}
      {!showForm && <button onClick={()=>setShowForm(true)} >Add</button>}
      {showForm && (
        <CreateTopic
          topic={editTopic}
          onSave={handleCreateOrUpdateTopic}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {loading === "fulfilled" && (
        <div style={listStyleGen(5)}>
          {topics.map((topic) => (
            <div
              key={topic.topicId}
              style={itemStyle}
              onDoubleClick={() => handleEditTopic(topic)}
            >
              <TopicCard topic={topic}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListTopic;
