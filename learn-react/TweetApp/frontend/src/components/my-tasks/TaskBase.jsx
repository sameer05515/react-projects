import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Outlet,
    createSearchParams,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import Select from 'react-select'; // Import the Select component from react-select
import ViewSwitcher from "../../common/components/ViewSwitcher";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";
import useDataFetching from "../../common/hooks/useDataFetching";
import { fetchTags } from "../../redux/slices/tagsSlice";
import { fetchTasks, setSelectedTaskUniqueId, updateTask } from "../../redux/slices/taskSlice";
import CustomButton from "../../common/components/CustomButton";
import TaskCard from "./TaskCard";
import TaskContainer from "./TaskContainer";
import TaskForm from "./TaskForm";

const TaskBase = () => {
    const [selectedView, setSelectedView] = useState("list");
    const handleChangeView = (event) => {
        setSelectedView(event.target.value);
    };

    return (
        <div>
            <ViewSwitcher
                viewList={[
                    { viewName: "list", viewLabel: "List View" },
                    { viewName: "card", viewLabel: "Card View" },
                ]}
                onChange={handleChangeView}
                selectedView={selectedView}
            />
            {selectedView === "list" && <ListTasks />}
            {selectedView === "card" && <TaskContainer />}
        </div>
    );
};

const ListTasks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.data);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);
    const selectedTaskUniqueId = useSelector(
        (state) => state.tasks.selectedTaskUniqueId
    );
    const selectedElementRef = useRef(null);
    useEffect(() => {
        dispatch(fetchTasks()); // Dispatch the fetchTasks async thunk to fetch tasks
    }, [dispatch]);

    useEffect(() => {
        // Fetch available tags when the component mounts
        // You should dispatch an action to retrieve the tags from your API
        // For example: dispatch(fetchTags());
        dispatch(fetchTags());
    }, [dispatch]);

    useEffect(() => {
        if (selectedElementRef.current) {
            // console.log(`selectedElementRef.current: ${selectedElementRef.current}`);
            selectedElementRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }
    }, [selectedTaskUniqueId]);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleLinkSelection = (selectedItem) => {
        navigate(`${selectedItem.uniqueId}`);
    };

    const getTasksJSX = (tasksList) => {
        return (
            <>
                {tasksList && tasksList.length > 0 && (
                    <ul>
                        {tasksList.map((t) => (
                            <li key={t.uniqueId}>
                                <span
                                    ref={
                                        selectedTaskUniqueId === t.uniqueId
                                            ? selectedElementRef
                                            : null
                                    }
                                    style={{
                                        fontSize: "12px",
                                        ...(selectedTaskUniqueId && selectedTaskUniqueId === t.uniqueId
                                            ? styles.selected
                                            : {})
                                    }}
                                    onClick={() => handleLinkSelection(t)}
                                >
                                    {t.title}
                                </span>
                                {getTasksJSX(t.children)}
                            </li>
                        ))}
                    </ul>
                )}

            </>
        );
    }

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="linksContainer">
                <div className="left-section">
                    {/* <pre>{links && JSON.stringify(links)}</pre> */}
                    <CustomButton onClick={() => handleButtonClick("create")}>
                        Create Task
                    </CustomButton>
                    <CustomButton onClick={() => dispatch(fetchTasks())}>
                        Refresh
                    </CustomButton>

                    {getTasksJSX(tasks)}
                    
                </div>
                {/* -- left-section */}

                <div className="right-section">
                    <div>
                        <Outlet />
                    </div>
                </div>
                {/* -- right-section */}
            </div>
        </>
    );
};

const CreateTaskComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");

    return (
        <>
            {/* <span>Create Topic: parentId : {parentId}</span> <br /> */}
            <TaskForm
                onSave={() => {
                    dispatch(fetchTasks());
                    navigate(-1);
                }}
                onCancelEdit={() => navigate(-1)}
                task={{ parentId: parentId }}
            />
        </>
    );
};

const EditTaskComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [searchParams] = useSearchParams();
    // const parentId = searchParams.get("parent");
    const { id } = useParams();
    const url = `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`;
    const { data, loading, error, /*refetch*/ } = useDataFetching(url);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            {/* <span>
                Edit Task: id: {id}: parentId : {parentId}
            </span> */}
            <br />
            <TaskForm
                task={data}
                onSave={() => {
                    dispatch(fetchTasks());
                    navigate(-1);
                }}
                onCancelEdit={() => navigate(`/task-mgmt/${id}`)}
            />
        </>
    );
};

const ViewTaskComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const url = `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`;
    const { data, loading, error, refetch } = useDataFetching(url);
    const availableTags = useSelector((state) => state.tags.data);

    const tasks = useSelector((state) => state.tasks.data);

    const { nextTaskUniqueId, prevTaskUniqueId } = useSelector(
        (state) => {
            //const flatList = prepareTasksQueue(state.tasks.data, []);
            const flatList = state.tasks.flatData;
            const selectedTaskUniqueId = state.tasks.selectedTaskUniqueId;
            // console.log(`flatList size: ${flatList.length}`);
            // console.log(`state.tasks.selectedTaskUniqueId : ${selectedTaskUniqueId}`);
            let nextTaskUniqueId = null;
            let prevTaskUniqueId = null;
            if (flatList && flatList.length > 0 && selectedTaskUniqueId) {
                const dataLength = flatList.length;
                const selectedIndex = flatList.findIndex(
                    (t) => t.uniqueId === selectedTaskUniqueId
                );
                const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
                const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
                nextTaskUniqueId =
                    flatList[nextIndex].uniqueId;
                prevTaskUniqueId =
                    flatList[prevIndex].uniqueId;
            }
            // return state.tasks.selectedTaskTraversal;
            return { nextTaskUniqueId, prevTaskUniqueId };
        }
    );

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            refetch();
            dispatch(setSelectedTaskUniqueId(id));
        }
    }, [id, tasks, dispatch]);
    const handleEdit = (item) => {
        navigate(`/task-mgmt/${id}/edit`);
    };
    const handleAddSubTask = (item) => {
        console.log(`Subtask will be added soon for id : ${id}`);
        navigate(`/task-mgmt/${id}/add-sub-task`);
    }
    const handleChildTaskClick=(item)=>{
        console.log(`moving to subtask having : ${JSON.stringify(item)}`);
        navigate(`/task-mgmt/${item?.uniqueId}`);
    }
    const handleTaskTraversal = (increment) => {
        if (increment === 1 && nextTaskUniqueId) {
            navigate(`/task-mgmt/${nextTaskUniqueId}`);
        } else if (increment === -1 && prevTaskUniqueId) {
            navigate(`/task-mgmt/${prevTaskUniqueId}`);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <TaskCard
                task={data}
                tags={availableTags}
                showDescription={true}
                onEdit={handleEdit}
                onTaskTraversal={handleTaskTraversal}
                onAddSubTask={handleAddSubTask}
                onChildTaskClick={handleChildTaskClick}
            />
        </>
    );
};

const AddSubTaskComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const treeStructuredTasks = useSelector((state) => state.tasks.data);
    const { id } = useParams();

    // const tasks = prepareTasksQueue(treeStructuredTasks);

    const tasks = useSelector((state) => state.tasks.flatData);

    const task = tasks?.find(t => t.uniqueId === id);

    const taskOptions = tasks.filter(t => t.uniqueId !== task.uniqueId).map((t) => ({
        value: t.uniqueId, // Assuming task have unique IDs
        label: t.title, // Display tag title in the dropdown
    }));

    const handleTaskSelect = (selectedTags) => {
        // Extract the tag values and store them in the 'tags' property of the topic data
        setFormData({ ...formData, children: selectedTags.map((tag) => tag.value) });
    };

    const [formData, setFormData] = useState({
        _id: task && task._id ? task._id : "",
        uniqueId: task && task.uniqueId ? task.uniqueId : "",
        title: task && task.title ? task.title : "",
        description: task && task.description ? task.description : "",
        parentId: task && task.parentId ? task.parentId : "",
        linkedTasks: task && task.linkedTasks ? task.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked task IDs
        tags: task && task.tags ? task.tags : [], // Set the initial tags based on the topic
        children: task && task.children ? task.children.map(c => c.uniqueId) : []
    });

    const handleSaveTask = () => {
        console.log(`Going to save: taskId: ${task._id} , formData : ${JSON.stringify(formData)}`)
        if (task && task._id && task.uniqueId) {
            // If a topic is provided, it's an update
            dispatch(updateTask({ taskId: task._id, taskData: { children: formData.children } }));
            // dispatch(updateTask({ taskId: task._id, taskData: {} }));
            // alert('going to edit')
            console.log('updated!!!');
        } else {
            console.log('Not updated!!!')
        }
        navigate(-1);
    };

    const handleCreateNewSubtask = () => {
        navigate({
            pathname: `/task-mgmt/create`,
            search: createSearchParams({
                parent: id
            }).toString()
        });
    };

    const taskFormStyle = {};


    return (
        <>
            {/* {`Either create and add as subtask of ${id}`} <br />
            {`my selected task : ${JSON.stringify(task)}`} <br />
            {`my transformed formData : ${JSON.stringify(formData)}`} */}
            <div>
                <CustomButton onClick={handleCreateNewSubtask}>Create new Subtask</CustomButton>
            </div>

            {/* {`Or select existing subtasks from list.`} */}

            <div style={taskFormStyle}>
                <div>
                    <label htmlFor="tags">Add Existing Tasks:</label>
                    <Select
                        isMulti
                        name="tasks"
                        options={taskOptions}
                        value={taskOptions.filter((t) => formData.children.includes(t.value) && t.value !== formData.uniqueId)}
                        onChange={handleTaskSelect}
                    />
                </div>
            </div>

            <div>
                <CustomButton onClick={handleSaveTask}>
                    Save
                </CustomButton>
                <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
            </div>

        </>
    )
}



// const prepareTasksQueue = (list, prevQueue = []) => {
//     let queue = [...prevQueue];
//     if (list && list.length > 0) {
//         list.forEach(t => {
//             queue = [...queue, { uniqueId: t.uniqueId, title: t.title, children: t.children, _id: t._id }];
//             const childQ = prepareTasksQueue(t.children, []);
//             queue = [...queue, ...childQ];
//         })
//     }
//     return queue;
// };

const styles = {
    selected: {
        fontWeight: "bold" /* Make selected link text bold */,
        fontSize: "15px" /* Increase font size for selected link */,
        color: "#e91140",
    },
};

export default TaskBase;
export { AddSubTaskComp, CreateTaskComp, EditTaskComp, ViewTaskComp };

