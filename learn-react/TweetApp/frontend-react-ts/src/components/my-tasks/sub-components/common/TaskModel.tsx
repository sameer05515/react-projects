import React, { useState } from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select"; // Import the Select component from react-select
import { getTagsForComboOptions } from "../../../../redux/slices/tagsSlice";
import { useSelector } from "react-redux";

const TaskModel = ({ task, onSave, onCancel, tasks }) => {
  const tagOptions = useSelector(getTagsForComboOptions);
  const [formData, setFormData] = useState({
    _id: task ? task._id : "",
    uniqueId: task ? task.uniqueId : "",
    name: task ? task.name : "",
    description: task ? task.description : "",
    // createdDate: task ? task.createdDate : "",
    // updatedDate: task ? task.updatedDate : "",
    linkedTasks: task ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
    tags: task ? task.tags : [], // Set the initial tags based on the topic
  });



  const handleTagSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the topic data
    setFormData({ ...formData, tags: selectedTags.map((tag) => tag.value) });
  };

  // const modalContentStyle = {
  //   background: "white",
  //   padding: "20px",
  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  //   zIndex: "1001", // Ensure modal content appears on top of the mask
  // };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, description: data });
  };

  const handleSaveTask = () => {
    onSave(formData);
  };

  const handleLinkedTasksChange = (e) => {
    const { name, options } = e.target;
    const selectedLinkedTasks = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      [name]: selectedLinkedTasks,
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div className="z-[1001] max-h-[80vh] overflow-y-auto rounded-md bg-white p-5 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{task ? "Edit Task" : "Add Task"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        {/* <input
          type="text"
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleInputChange}
        /> */}
        <CKEditor
          id="description"
          name="description"
          editor={ClassicEditor}
          data={formData.description}
          onChange={handleEditorChange}
        />
        <br />
        {/* Dropdown to select linked tasks */}
        <label htmlFor="linkedTasks" className="text-sm font-semibold text-gray-700">Linked Tasks:</label>
        <select
          multiple
          name="linkedTasks"
          id="linkedTasks"
          value={formData.linkedTasks}
          onChange={handleLinkedTasksChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {tasks
            .filter((task) => task.uniqueId !== formData?.uniqueId)
            .map((task) => (
              <option key={task.uniqueId} value={task.uniqueId}>
                {task.title}
              </option>
            ))}
        </select>
        <br />
        <div>
          <label htmlFor="tags" className="text-sm font-semibold text-gray-700">Add Tags:</label>
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            value={tagOptions.filter((tag) =>
              formData.tags.includes(tag.value)
            )}
            onChange={handleTagSelect}
          />
        </div>
        {/* Add other input fields for task properties */}
        <div className="mt-2 text-right">
          <CustomButton onClick={handleSaveTask}>Save</CustomButton>
          <CustomButton onClick={onCancel}>Cancel</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TaskModel;
