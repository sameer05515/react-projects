import React, { useState, useEffect } from "react";
import CustomButton from "../common/CustomButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from 'react-select'; // Import the Select component from react-select
import { fetchTags } from "../../redux/tagsSlice";
import { useDispatch, useSelector } from 'react-redux';

const TaskModel = ({ task, onSave, onCancel, tasks }) => {
  const dispatch = useDispatch();
  const availableTags = useSelector((state) => state.tags.data); // Assuming you have a tags slice in your Redux store
  const [formData, setFormData] = useState({
    _id: task ? task._id : "",
    uniqueId: task ? task.uniqueId : "",
    title: task ? task.title : "",
    description: task ? task.description : "",
    // createdDate: task ? task.createdDate : "",
    // updatedDate: task ? task.updatedDate : "",
    linkedTasks: task ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
    tags: task ? task.tags : [], // Set the initial tags based on the topic
  });

  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000", // Adjust as needed
  };
  useEffect(() => {
    // Fetch available tags when the component mounts
    // You should dispatch an action to retrieve the tags from your API
    // For example: dispatch(fetchTags());
    dispatch(fetchTags());
  }, [dispatch]);

  const tagOptions = availableTags.map((tag) => ({
    value: tag.tagId, // Assuming tags have unique IDs
    label: tag.name, // Display tag names in the dropdown
  }));

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

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    zIndex: "1001", // Ensure modal content appears on top of the mask
    maxHeight: "80vh", // Set a maximum height to trigger scrolling if the content exceeds it
    overflowY: "auto", // Enable vertical scrolling when the content overflows
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
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
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
        <label htmlFor="linkedTasks">Linked Tasks:</label>
        <select
          multiple
          name="linkedTasks"
          id="linkedTasks"
          value={formData.linkedTasks}
          onChange={handleLinkedTasksChange}
        >
          {tasks.filter((task)=> task.uniqueId!==formData?.uniqueId ).map((task) => (
            <option key={task.uniqueId} value={task.uniqueId}>
              {task.title}
            </option>
          ))}
        </select>
        <br />
        <div>
          <label htmlFor="tags">Add Tags:</label>
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
            onChange={handleTagSelect}
          />
        </div>
        {/* Add other input fields for task properties */}
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <CustomButton onClick={handleSaveTask}>Save</CustomButton>
          <CustomButton onClick={onCancel}>Cancel</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TaskModel;
