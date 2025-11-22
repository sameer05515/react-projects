import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTags,
  createTag,
  updateTag,
  selectAllTreeTags,
  selectTagsStateCombined,
} from "../../redux/slices/tagsSlice";
import TagsCreate from "./TagsCreate"; // Import the TagsCreate componenthe createTag and updateTag actions
import type { RootState, AppDispatch } from "../../redux/store";

function TagList() {
  // ✅ Optimized: Use combined selector for status and error, separate for tags
  const tags = useSelector(selectAllTreeTags);
  const { status, error } = useSelector((state: RootState) => selectTagsStateCombined(state)); // ✅ Standardized: loading -> status
  const dispatch = useDispatch<AppDispatch>();

  // State to manage editing
  const [editTag, setEditTag] = useState(null);

  const handleEditTag = (tag) => {
    setEditTag(tag);
  };

  const handleCancelEdit = () => {
    setEditTag(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleCreateOrUpdateTag = async (tagData) => { // ✅ Reserved for future use
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
        {status === "loading" && <p className="mt-2 text-sm text-gray-500">Loading tags...</p>} {/* ✅ Standardized: use status */}
        {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
      </div>
      <TagsCreate tag={editTag} onCancelEdit={handleCancelEdit} />
      {status === "succeeded" && ( // ✅ Standardized: use status
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <div
              key={tag._id}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300"
              onDoubleClick={() => handleEditTag(tag)}
            >
              <strong className="text-lg text-gray-900">{tag.name}</strong>
              <p className="mt-2 text-sm text-gray-600">{(tag as any).description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagList;
