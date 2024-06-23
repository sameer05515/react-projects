import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Import the Select component from react-select
import { taskStatusList } from "../../common/constants/globalConstants";
import { fetchTags, selectAllFlatTags } from "../../redux/slices/tagsSlice";
import { saveTask, selectAllFlatTasks, updateTask } from "../../redux/slices/taskSlice";
import CustomButton from "../../common/components/CustomButton";

const TaskForm = ({ task, onSave, onCancelEdit }) => {
    const dispatch = useDispatch();
    const availableTags = useSelector(selectAllFlatTags); // Assuming you have a tags slice in your Redux store
    const tasks = useSelector(selectAllFlatTasks);
    const [formData, setFormData] = useState({
        _id: task && task._id ? task._id : "",
        uniqueId: task && task.uniqueId ? task.uniqueId : "",
        name: task && task.name ? task.name : "",
        description: task && task.description ? task.description : "",
        parentId: task && task.parentId ? task.parentId : "",
        taskStatus: task ? task.taskStatus : "",
        // updatedDate: task ? task.updatedDate : "",
        linkedTasks: task && task.linkedTasks ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
        tags: task && task.tags ? task.tags : [], // Set the initial tags based on the topic
    });

    useEffect(() => {
        // Fetch available tags when the component mounts
        // You should dispatch an action to retrieve the tags from your API
        // For example: dispatch(fetchTags());
        dispatch(fetchTags());
    }, [dispatch]);

    const tagOptions = availableTags.map((tag) => ({
        value: tag.uniqueId, // Assuming tags have unique IDs
        label: tag.title, // Display tag names in the dropdown
    }));

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

    const handleSaveTask = () => {
        // console.log(`task._id : ${task._id}, task.uniqueId: ${task.uniqueId},taskStatus: ${formData.taskStatus},  taskData: ${JSON.stringify(formData)}`);
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

    const formStyle = {};

    return (
        <>
            <div style={formStyle}>
                <h3>{task && task._id && task.uniqueId ? "Edit Task" : "Add Task"}</h3>
                {/* <pre>{`provided task object: ${JSON.stringify(task)}`}</pre> <br /> */}
                <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                    <label htmlFor="name" style={{ width: "9%", fontWeight: "bold" }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{ width: "90%" }}
                    />
                </div>

                <div style={{ padding: "10px" }}>
                    <label htmlFor="description" style={{ width: "9%", fontWeight: "bold" }}>Description</label>
                    <CKEditor
                        id="description"
                        name="description"
                        editor={ClassicEditor}
                        data={formData.description}
                        onChange={handleEditorChange}
                        style={{ width: "90%" }}
                    />
                </div>

                {/* Dropdown to select linked tasks */}
                <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                    <label htmlFor="linkedTasks" style={{ width: "15%", fontWeight: "bold" }}>Linked Tasks:</label>
                    <select
                        multiple
                        name="linkedTasks"
                        id="linkedTasks"
                        value={formData.linkedTasks}
                        onChange={handleLinkedTasksChange}
                        style={{ width: "90%" }}
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
                <div style={{ padding: "10px" }}>
                    <label htmlFor="tags" style={{ width: "20%", fontWeight: "bold" }}>Add Tags:</label>
                    <Select
                        isMulti
                        name="tags"
                        options={tagOptions}
                        value={tagOptions.filter((tag) =>
                            formData.tags.includes(tag.value)
                        )}
                        onChange={handleTagSelect}
                        style={{ width: "90%" }}
                    />
                </div>
                <div style={{  padding: "10px" }}>
                    <label htmlFor="taskStatus" style={{ width: "20%", fontWeight: "bold" }}>Select Task Status:</label>
                    <Select
                        name="taskStatus"
                        value={statusOptions.filter((task) => task.value === formData.taskStatus)}
                        options={statusOptions}
                        onChange={handleStatusSelect}
                        placeholder="Select task status..."
                    />
                </div>
                {/* Add other input fields for task properties */}
                {/* style={{ textAlign: "right", marginTop: "10px" }} */}
                <div>
                    <CustomButton onClick={handleSaveTask}>Save</CustomButton>
                    <CustomButton onClick={onCancelEdit}>Cancel</CustomButton>
                </div>
            </div>
        </>
    );
};

export default TaskForm;
