import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTags,
  createTag,
  updateTag,
  selectAllTreeTags,
} from "../../redux/slices/tagsSlice";
import TagsCreate from "./TagsCreate"; // Import the TagsCreate componenthe createTag and updateTag actions

function TagList() {
  const tags = useSelector(selectAllTreeTags);
  const loading = useSelector((state) => state.tags.loading);
  const error = useSelector((state) => state.tags.error);
  const dispatch = useDispatch();

  // State to manage editing
  const [editTag, setEditTag] = useState(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Tag List</h2>
        {loading === "pending" && <p className="mt-2 text-sm text-gray-500">Loading tags...</p>}
        {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
      </div>
      <TagsCreate tag={editTag} onSave={handleCreateOrUpdateTag} onCancelEdit={handleCancelEdit} />
      {loading === "fulfilled" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <div
              key={tag._id}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300"
              onDoubleClick={() => handleEditTag(tag)}
            >
              <strong className="text-lg text-gray-900">{tag.name}</strong>
              <p className="mt-2 text-sm text-gray-600">{tag.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagList;
