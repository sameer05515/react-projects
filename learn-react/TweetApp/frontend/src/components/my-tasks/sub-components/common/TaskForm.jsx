import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Import the Select component from react-select
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import JSONDataViewer from "../../../../common/components/json-data-viewer/JSONDataViewer";
import { SmartEditor } from "../../../../common/components/Smart/Editor/v3";
import { taskStatusList } from "../../../../common/constants/globalConstants";
import { getTagsForComboOptions } from "../../../../redux/slices/tagsSlice";
import {
  saveTask,
  selectAllFlatTasks,
  updateTask,
} from "../../../../redux/slices/taskSlice";

const TaskForm = ({ task, onSave, onCancelEdit }) => {
  const dispatch = useDispatch();
  const tagOptions = useSelector(getTagsForComboOptions);
  const tasks = useSelector(selectAllFlatTasks);
  const [formData, setFormData] = useState({
    _id: task && task._id ? task._id : "",
    uniqueId: task && task.uniqueId ? task.uniqueId : "",
    name: task && task.name ? task.name : "",
    descriptions:
      task && task.descriptions
        ? task.descriptions
        : [
            {
              content: "",
              textOutputType: "",
              textInputType: "",
            },
          ],
    parentId: task && task.parentId ? task.parentId : "",
    taskStatus: task ? task.taskStatus : "",
    // updatedDate: task ? task.updatedDate : "",
    linkedTasks: task && task.linkedTasks ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
    tags: task && task.tags ? task.tags : [], // Set the initial tags based on the topic
  });

  const [formErrors, setFormErrors] = useState([]);
  const [smartEditorError, setSmartEditorError] = useState(null);

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (smartEditorError) {
      errors.push(smartEditorError);
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const statusOptions = taskStatusList.map((status) => ({
    value: status.id,
    label: status.label,
  }));

  const handleStatusSelect = (selectedOption) => {
    // console.log("Selected Option:", selectedOption);
    setFormData({ ...formData, taskStatus: selectedOption.value });
  };

  const handleTagSelect = (selectedTags) => {
    // Extract the tag values and store them in the 'tags' property of the topic data
    setFormData({ ...formData, tags: selectedTags.map((tag) => tag.value) });
  };

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

  const handleSaveTask = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (task && task._id && task.uniqueId) {
      // If a topic is provided, it's an update
      dispatch(updateTask({ taskId: task._id, taskData: { ...formData } }));
      // console.log(`going to edit`);
    } else {
      // Otherwise, it's a new topic creation
      dispatch(saveTask(formData));
      // console.log("going to save");
    }

    // Notify the parent component to handle closing the CreateTopic form
    if (onSave) {
      onSave(formData);
    }
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

  const handleSmartEditorChange = (smartContent) => {
    setFormData((prev) => ({ ...prev, descriptions: [smartContent] }));
  };

  const handleSmartEditorError = (error) => {
    setSmartEditorError(error);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {task && task._id && task.uniqueId ? "Edit Task" : "Add Task"}
        </h3>
        <div className="flex items-center p-2.5 mb-4">
          <label htmlFor="name" className="w-[9%] font-bold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-2.5 mb-4">
          <label
            htmlFor="description"
            className="block w-[9%] font-bold text-gray-700 mb-2"
          >
            Description
          </label>
          <SmartEditor
            preview={false}
            initialValue={formData.descriptions[0]}
            onChange={handleSmartEditorChange}
            onError={handleSmartEditorError}
          />
        </div>

        {/* Dropdown to select linked tasks */}
        <div className="flex items-center p-2.5 mb-4">
          <label
            htmlFor="linkedTasks"
            className="w-[15%] font-bold text-gray-700"
          >
            Linked Tasks:
          </label>
          <select
            multiple
            name="linkedTasks"
            id="linkedTasks"
            value={formData.linkedTasks}
            onChange={handleLinkedTasksChange}
            className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tasks
              .filter((task) => task.uniqueId !== formData?.uniqueId)
              .map((task) => (
                <option key={task.uniqueId} value={task.uniqueId}>
                  {task.title}
                </option>
              ))}
          </select>
        </div>
        <div className="p-2.5 mb-4">
          <label htmlFor="tags" className="block w-[20%] font-bold text-gray-700 mb-2">
            Add Tags:
          </label>
          <div className="w-[90%]">
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
        </div>
        <div className="p-2.5 mb-4">
          <label
            htmlFor="taskStatus"
            className="block w-[20%] font-bold text-gray-700 mb-2"
          >
            Select Task Status:
          </label>
          <div className="w-[90%]">
            <Select
              name="taskStatus"
              value={statusOptions.filter(
                (task) => task.value === formData.taskStatus
              )}
              options={statusOptions}
              onChange={handleStatusSelect}
              placeholder="Select task status..."
            />
          </div>
        </div>
        
        <div className="mt-4">
          {formErrors.length > 0 && (
            <div>
              {formErrors.map((error, index) => (
                <span key={index} className="block text-red-600 text-sm mt-1.5">
                  {error}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 flex gap-2">
          <CustomButton onClick={(event) => handleSaveTask(event)}>
            Save
          </CustomButton>
          <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
        </div>
        <JSONDataViewer metadata={{ formData }} />
      </div>
    </>
  );
};

export default TaskForm;
