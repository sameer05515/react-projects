import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTags, createTag, updateTag } from "../../../redux/tagsSlice";
import TagsCreate from "./TagsCreate"; // Import the TagsCreate componenthe createTag and updateTag actions

function TagList() {
  const tags = useSelector((state) => state.tags.data);
  const loading = useSelector((state) => state.tags.loading);
  const error = useSelector((state) => state.tags.error);
  const dispatch = useDispatch();

  // State to manage editing
  const [editTag, setEditTag] = useState(null);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleEditTag = (tag) => {
    setEditTag(tag);
  };

  const handleCancelEdit = () => {
    setEditTag(null);
  };

  const handleCreateOrUpdateTag = async (tagData) => {
    if (editTag) {
      // If we have an edited tag, update it
      await dispatch(updateTag(tagData));
      await dispatch(fetchTags());
    } else {
      // Otherwise, create a new tag
      await dispatch(createTag(tagData));
      await dispatch(fetchTags());
    }
    

    setEditTag(null); // Clear the edit state
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr)", // Adjust the minmax value to set the minimum and maximum card width
    gap: "20px", // Adjust the gap as needed
    padding: "20px", // Optional: Add additional styling to the container
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    // Optional: Add additional styling to the individual cards
  };

  return (
    <div>
      <h2>Tag List</h2>
      {loading === "pending" && <p>Loading tags...</p>}
      {error && <p>Error: {error}</p>}
      {/* TagsCreate component for creating and editing tags */}
      <TagsCreate
        tag={editTag}
        onSave={handleCreateOrUpdateTag}
        onCancelEdit={handleCancelEdit}
      />
      {loading === "fulfilled" && (
        <div style={cardContainerStyle}>
          {tags.map((tag) => (
            <div
              key={tag._id}
              style={cardStyle}
              onDoubleClick={() => handleEditTag(tag)}
            >
              <strong>{tag.name}</strong>
              <p>{tag.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagList;
