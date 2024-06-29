import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Outlet,
    createSearchParams,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import ViewSwitcher from "../../common/components/ViewSwitcher";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";
import useDataFetching from "../../common/hooks/useDataFetching";
import { fetchTags, selectAllFlatTags } from "../../redux/slices/tagsSlice";
import {
    createTopicSection,
    fetchTopics,
    searchTopic,
    setSearchString,
    setSelectedTopicUniqueId,
    updateTopic,
    updateTopicSectionsById,
} from "../../redux/slices/topicSlice";
import CustomButton from "../../common/components/CustomButton";
import "../links/Links.css";
import CreateTopic from "./CreateTopic";
import ListTopicsByCreatedDate from "./ListTopicsByCreatedDate";
import TopicCard from "./TopicCard";
import Select from "react-select"; // Import the Select component from react-select
import HoverableSpan from "../../common/components/HoverableSpan";
import TooltipSpan from "../../common/components/TooltipSpan";
import TopicSectionForm from "./TopicSectionForm";
import {
    fetchPinnedItems,
    upsertPinnedItem,
} from "../../redux/slices/pinnedItemSlice";

const TopicBase = () => {
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
            {selectedView === "list" && <ListTopics />}
            {selectedView === "card" && <ListTopicsByCreatedDate />}
        </div>
    );
};

const ListTopics = () => {
    const dispatch = useDispatch();
    const topics = useSelector((state) => state.topics.data);
    const status = useSelector((state) => state.topics.loading);
    const error = useSelector((state) => state.topics.error);
    const navigate = useNavigate();

    const selectedTopicUniqueId = useSelector(
        (state) => state.topics.selectedTopicUniqueId
    );

    const selectedElementRef = useRef(null);
    useEffect(() => {
        dispatch(fetchTopics());
        dispatch(fetchTags());
    }, [dispatch]);

    useEffect(() => {
        if (selectedElementRef.current) {
            selectedElementRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }
    }, [selectedTopicUniqueId]);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleLinkSelection = (selectedItem) => {
        // console.log(JSON.stringify(selectedItem));
        // setSelectedLink(selectedItem);
        navigate(`${selectedItem.uniqueId}`);
    };

    const getTopicsJSX = (topics) => {
        return (
            <>
                {topics && topics.length > 0 && (
                    <ul style={styles.ulStyle}>
                        {topics.map((topic) => (
                            <li style={styles.liStyles} key={topic.uniqueId}>
                                <span
                                    ref={
                                        selectedTopicUniqueId === topic.uniqueId
                                            ? selectedElementRef
                                            : null
                                    }
                                    style={{
                                        fontSize: "12px",
                                        ...(selectedTopicUniqueId &&
                                            selectedTopicUniqueId === topic.uniqueId
                                            ? styles.selected
                                            : {}),
                                    }}
                                    onClick={() => handleLinkSelection(topic)}
                                >
                                    {/* {topic.name} */}
                                    <TooltipSpan maxCharLength={25} text={topic.name} />
                                </span>
                                {getTopicsJSX(topic.children)}
                            </li>
                        ))}
                    </ul>
                )}
            </>
        );
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="linksContainer">
            <div className="left-section">
                {/* <pre>{links && JSON.stringify(links)}</pre> */}
                <div style={{ margin: "10px 0" }}>
                    <CustomButton
                        style={{ ...styles.tagStyle, marginRight: "10px" }}
                        onClick={() => handleButtonClick("create")}
                    >
                        Create Topic
                    </CustomButton>
                    <CustomButton
                        style={{ ...styles.tagStyle, marginRight: "10px" }}
                        onClick={() => dispatch(fetchTopics())}
                    >
                        Refresh
                    </CustomButton>
                    <CustomButton
                        style={{ ...styles.tagStyle, marginRight: "10px" }}
                        onClick={() => navigate(`/topic-mgmt/search`)}
                    >
                        Search
                    </CustomButton>
                </div>
                {getTopicsJSX(topics)}
            </div>
            {/* -- left-section */}

            <div className="right-section">
                <div>
                    <Outlet />
                </div>
            </div>
            {/* -- right-section */}
        </div>
        // -- linksContainer
    );
};

const SearchRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const taskFormStyle = {};
    // const url = `${BACKEND_APPLICATION_BASE_URL}/topics/search`;
    // const [options, setOptions] = useState({});
    // const { data, loading, error, refetch } = useDataFetching(url, options, false);
    const [formData, setFormData] = useState({
        title: "",
    });
    const data = useSelector((state) => state.topics.searchedData);
    const searchString = useSelector((state) => state.topics.searchString);
    const flatData = useSelector((state) => state.topics.flatData);

    const [criteriaList, setCriteriaList] = useState({
        name: { value: 1, editable: false },
        description: { value: 0, editable: true },
    });

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCriteriaList((prevFruits) => ({
            ...prevFruits,
            [name]: { ...prevFruits[name], value: checked ? 1 : 0 },
        }));
    };

    useEffect(() => {
        if (searchString && searchString.trim().length > 0) {
            setFormData((prev) => ({ ...prev, title: searchString }));
        }
    }, [searchString]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const prepareOptions = () => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "searchString": formData.title,
    //         "searchOptions": {
    //             "name": 1,
    //             "description": 0
    //         }
    //     });

    //     const requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };

    //     setOptions(prev=>({...requestOptions}));
    // }

    const handleSearch = () => {
        const searchOptions = Object.keys(criteriaList).reduce((acc, key) => {
            acc[key] = criteriaList[key].value;
            return acc;
        }, {});

        //   console.log(searchOptions);
        const raw = {
            searchString: formData.title,
            searchOptions: searchOptions,
        };
        //prepareOptions();
        dispatch(setSearchString(formData.title));
        dispatch(searchTopic(raw));
    };

    const onChildTopicClick = (selectedTopic) => {
        navigate(`/topic-mgmt/${selectedTopic?.uniqueId}`);
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <>
            <h1>Search</h1>
            <div style={taskFormStyle}>
                <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                    <label htmlFor="title" style={{ width: "9%", fontWeight: "bold" }}>
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Search {currently only searching in name of topic. search in description will be available soon!}"
                        value={formData.title}
                        onChange={handleInputChange}
                        style={{ width: "90%" }}
                    />
                </div>
                <pre>{JSON.stringify(criteriaList)}</pre>
                <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                    <label
                        htmlFor="searchOptions"
                        style={{ width: "9%", fontWeight: "bold" }}
                    >
                        Search Options
                    </label>
                    {Object.keys(criteriaList).map((criteria) => (
                        <div key={criteria}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={criteria}
                                    checked={criteriaList[criteria].value}
                                    onChange={handleChange}
                                    disabled={!criteriaList[criteria].editable}
                                />
                                {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <CustomButton onClick={() => handleSearch()}>Search</CustomButton>
                <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
            </div>

            <div>
                {data && data.length > 0 && (
                    <>
                        <b>Search Results:- </b>
                        <ul>
                            {data.map((t) => (
                                <li>
                                    <HoverableSpan
                                        key={t.uniqueId}
                                        onClick={() => onChildTopicClick(t)}
                                    >
                                        {flatData?.find((ft) => ft.uniqueId === t.uniqueId)
                                            ?.title || t.name}
                                    </HoverableSpan>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

const ViewTopic = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const sectionId = searchParams.get("sectionId");
    const url = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`;
    const { data, loading, error, refetch } = useDataFetching(url);
    const sectionFetchUrl = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}/sections`;
    const {
        data: sectionsData,
        // loading: sectionLoading,
        // error: sectionsFetchError,
        refetch: sectionsRefetch,
    } = useDataFetching(sectionFetchUrl);
    const availableTags = useSelector(selectAllFlatTags);
    const topics = useSelector((state) => state.topics.data);
    const pinnedItems = useSelector((state) => state.pinnedItems.data);

    const [pinnedTopics, setPinnedTopics] = useState([]);
    const [isPinned, setIsPinned] = useState(false);
    // const [increment, setIncrement] = useState(0); // Initial increment value

    // const selectedTopicUniqueId = useSelector(
    //     (state) => state.topics.selectedTopicUniqueId
    // );
    // const { nextTopicUniqueId, prevTopicUniqueId } = useSelector(
    //     (state) => state.topics.selectedTopicTraversal
    // );
    const tasks = useSelector((state) => state.topics.flatData);

    const { nextTopicUniqueId, prevTopicUniqueId } = useSelector((state) => {
        // const flatList = prepareTasksQueue(state.topics.data, []);
        const flatList = [...state.topics.flatData];
        const selectedTopicUniqueId = state.topics.selectedTopicUniqueId;
        // console.log(`flatList size: ${flatList.length}`);
        // console.log(`state.tasks.selectedTopicUniqueId : ${selectedTopicUniqueId}`);
        let nextTopicUniqueId = null;
        let prevTopicUniqueId = null;
        if (flatList && flatList.length > 0 && selectedTopicUniqueId) {
            const dataLength = flatList.length;
            const selectedIndex = flatList.findIndex(
                (t) => t.uniqueId === selectedTopicUniqueId
            );
            const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
            const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
            nextTopicUniqueId = flatList[nextIndex].uniqueId;
            prevTopicUniqueId = flatList[prevIndex].uniqueId;
        }
        // return state.tasks.selectedTaskTraversal;
        return { nextTopicUniqueId, prevTopicUniqueId };
    });

    // Create a selector with the increment value
    // const getNextTopicIdSelector = makeGetNextTopicIdSelector();

    // Use the created selector with the stored increment value
    // const nextTopicId = useSelector(getNextTopicIdSelector(increment));

    useEffect(() => {
        dispatch(fetchTags());
        dispatch(fetchPinnedItems());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            refetch();
            dispatch(setSelectedTopicUniqueId(id));
            // handleTopicTraversal(0);
        }
    }, [id, topics, dispatch]);

    useEffect(() => {
        if (
            id &&
            pinnedItems &&
            tasks &&
            pinnedItems.length > 0 &&
            tasks.length > 0
        ) {
            let pinnedTopicsList = pinnedItems.filter(
                (pi) => pi.linkedItemType === "topic" && pi.softDelete === false
            );
            pinnedTopicsList = pinnedTopicsList
                ? pinnedTopicsList.map((pit) => ({
                    ...pit,
                    title:
                        tasks.find((t) => t.uniqueId === pit.linkedUniqueId)?.title || "",
                }))
                : [];
            setPinnedTopics((prev) => [...pinnedTopicsList]);
            setIsPinned(
                (prev) =>
                    pinnedTopicsList.findIndex((pit) => pit.linkedUniqueId === id) >= 0
            );
        }
    }, [id, tasks, pinnedItems]);

    useEffect(() => {
        //if (id && sectionId) {
        sectionsRefetch();
        //}
    }, [id, sectionId]);

    // useEffect(() => {
    //     // Fetch tags and pinned items when the component mounts
    //     dispatch(fetchTags());
    //     dispatch(fetchPinnedItems());

    //     // If 'id' is present, refetch data and set selected topic unique ID
    //     if (id) {
    //         refetch();
    //         dispatch(setSelectedTopicUniqueId(id));
    //     }

    //     // If 'id' and pinned items are present, filter pinned topics
    //     if (id && pinnedItems && pinnedItems.length > 0) {
    //         const pinnedTopics = pinnedItems.filter(pi => pi.linkedItemType === 'topic');
    //         setPinnedTopics(prev => [...pinnedTopics]);
    //     }

    //     // Refetch sections based on 'id' and 'sectionId'
    //     sectionsRefetch();
    // }, [dispatch, id, topics, pinnedItems, sectionId]);

    const handleEdit = (item) => {
        navigate(`/topic-mgmt/${data.uniqueId}/edit`);
    };
    const handleTopicTraversal = (increment) => {
        // setIncrement(prev => increment);
        // navigate(`/topic-mgmt/${nextTopicId}`);
        // console.log(
        //     `increment: ${increment}, nextTopicUniqueId: '${nextTopicUniqueId}' , prevTopicUniqueId: '${prevTopicUniqueId}'`
        // );

        if (increment === 1 && nextTopicUniqueId) {
            navigate(`/topic-mgmt/${nextTopicUniqueId}`);
        } else if (increment === -1 && prevTopicUniqueId) {
            navigate(`/topic-mgmt/${prevTopicUniqueId}`);
        }
        // else if (increment == 0 && id) {
        //     navigate(`/topic-mgmt/${id}`);
        // }
        // dispatch(setSelectedTopicUniqueId(nextTopicId));
    };
    const handleAddSubTask = (item) => {
        // console.log(`Subtask will be added soon for id : ${id}`);
        navigate(`/topic-mgmt/${id}/add-sub-topic`);
    };
    const handleChildTaskClick = (item) => {
        // console.log(`moving to subtask having : ${JSON.stringify(item)}`);
        navigate(`/topic-mgmt/${item?.uniqueId}`);
    };
    const handleMoveAnotherParent = (item) => {
        // console.log(`moving to subtask having : ${JSON.stringify(item)}`);
        navigate(`/topic-mgmt/${id}/move-parent`);
    };
    const handlePinTopic = (item, isPinned) => {
        dispatch(
            upsertPinnedItem({
                linkedUniqueId: item.uniqueId,
                linkedItemType: "topic",
                softDelete: isPinned,
            })
        );
    };
    const handleAncestorClick = (ancestor) => {
        if (!ancestor) {
            return;
        }
        navigate(`/topic-mgmt/${ancestor.uniqueId}`);
    };
    const handleAddSection = () => {
        navigate(`/topic-mgmt/${id}/add-section`);
    };
    const handleEditSection = (sectionUniqueId) => {
        navigate(`/topic-mgmt/${id}/section/${sectionUniqueId}/edit`);
    };

    const handleTopicSectionClick = (sectionUniqueId) => {
        // alert(`Navigation to section Id will be done soon!! ${sectionUniqueId}`);
        navigate({
            pathname: `/topic-mgmt/${id}`,
            search: sectionUniqueId
                ? createSearchParams({
                    sectionId: sectionUniqueId,
                }).toString()
                : "",
        });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            {/* Topic details : {id} <br /> */}
            {data && (
                <TopicCard
                    topic={data}
                    topicSections={sectionsData}
                    tags={availableTags}
                    pinnedTopics={pinnedTopics}
                    isPinned={isPinned}
                    showDescription={true}
                    onEdit={handleEdit}
                    onTopicTraversal={handleTopicTraversal}
                    onAddSubTopic={handleAddSubTask}
                    onMoveAnotherParent={handleMoveAnotherParent}
                    onAncestorClick={handleAncestorClick}
                    onChildTopicClick={handleChildTaskClick}
                    onAddSection={handleAddSection}
                    onEditSection={handleEditSection}
                    selectedSectionId={sectionId}
                    onTopicSectionClick={handleTopicSectionClick}
                    onPinTopic={handlePinTopic}
                />
            )}
        </>
    );
};

const CreateTopicComp = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");
    return (
        <>
            <span>Create Topic: parentId : {parentId}</span> <br />
            <CreateTopic
                parentId={parentId}
                onSave={() => {
                    // console.log(`New topic created`);
                    navigate(-1);
                }}
                onCancelEdit={() => navigate(-1)}
            />
        </>
    );
};

const EditTopicComp = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");
    const { id } = useParams();
    const url = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`;
    const { data, loading, error } = useDataFetching(url);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <span>
                Edit Topic: id: {id}: parentId : {parentId}
            </span>
            <br />
            {data && (
                <CreateTopic
                    topic={data}
                    onSave={() => {
                        // console.log(`Edited topic created`);
                        navigate(-1);
                    }}
                    onCancelEdit={() => navigate(`/topic-mgmt/${id}`)}
                />
            )}
        </>
    );
};

const AddSubTopicComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const { id } = useParams();

    // const tasks = prepareTasksQueue(treeStructuredTasks);
    const tasks = useSelector((state) => state.topics.flatData);

    const topic = tasks?.find((t) => t.uniqueId === id);

    const taskOptions = tasks
        .filter((t) => t.uniqueId !== topic.uniqueId)
        .map((t) => ({
            value: t.uniqueId, // Assuming topic have unique IDs
            label: t.title, // Display tag title in the dropdown
        }));

    const handleTaskSelect = (selectedTags) => {
        // Extract the tag values and store them in the 'tags' property of the topic data
        setFormData({
            ...formData,
            children: selectedTags.map((tag) => tag.value),
        });
    };

    const [formData, setFormData] = useState({
        // _id: topic && topic._id ? topic._id : "",
        uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
        // title: topic && topic.title ? topic.title : "",
        // description: topic && topic.description ? topic.description : "",
        // parentId: topic && topic.parentId ? topic.parentId : "",
        // linkedTasks: topic && topic.linkedTasks ? topic.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked topic IDs
        // tags: topic && topic.tags ? topic.tags : [], // Set the initial tags based on the topic
        children:
            topic && topic.children ? topic.children.map((c) => c.uniqueId) : [],
    });

    const handleSaveTask = () => {
        // console.log(
        //     `Going to save: taskId: ${topic._id} , formData : ${JSON.stringify(
        //         formData
        //     )}`
        // );
        if (topic && topic.uniqueId) {
            // If a topic is provided, it's an update
            // dispatch(updateTopic({ taskId: topic._id, taskData: { children: formData.children } }));
            dispatch(
                updateTopic({
                    ...{ children: formData.children },
                    uniqueId: topic.uniqueId,
                })
            );
            // console.log("updated!!!");
        } else {
            // console.log("Not updated!!!");
        }
        navigate(-1);
    };

    const handleCreateNewSubtask = () => {
        navigate({
            pathname: `/topic-mgmt/create`,
            search: createSearchParams({
                parent: id,
            }).toString(),
        });
    };

    const taskFormStyle = {};

    return (
        <>
            {/* {`Either create and add as subtask of ${id}`} <br />
            {`my selected topic : ${JSON.stringify(topic)}`} <br /> */}
            {/* {`my transformed formData : ${JSON.stringify(formData)}`} */}
            <div>
                <CustomButton onClick={handleCreateNewSubtask}>
                    Create new Sub-Topic
                </CustomButton>
            </div>

            {/* {`Or select existing subtasks from list.`} */}

            <div style={taskFormStyle}>
                <div>
                    <label htmlFor="tags">Add Existing Topics:</label>
                    <Select
                        isMulti
                        name="tasks"
                        options={taskOptions}
                        value={taskOptions.filter(
                            (t) =>
                                formData.children.includes(t.value) &&
                                t.value !== formData.uniqueId
                        )}
                        onChange={handleTaskSelect}
                    />
                </div>
            </div>

            <div>
                <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
                <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
            </div>
        </>
    );
};

const MoveToAnotherTopicParent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const { id } = useParams();

    // const tasks = prepareTasksQueue(treeStructuredTasks);
    const tasks = useSelector((state) => state.topics.flatData);

    const topic = tasks?.find((t) => t.uniqueId === id);

    const taskOptions = tasks
        .filter((t) => t.uniqueId !== topic.uniqueId)
        .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId))
        .map((t) => ({
            value: t.uniqueId, // Assuming topic have unique IDs
            label: t.title, // Display tag title in the dropdown
        }));
    // .push({
    //     value: '', // Assuming topic have unique IDs
    //     label: 'ROOT', // Display tag title in the dropdown
    // });

    const handleTaskSelect = (selectedTags) => {
        // Extract the tag values and store them in the 'tags' property of the topic data
        // console.log(
        //     `JSON.stringify(selectedTags): ${JSON.stringify(selectedTags)}`
        // );
        setFormData({ ...formData, parentId: selectedTags.value });
    };

    const [formData, setFormData] = useState({
        // _id: topic && topic._id ? topic._id : "",
        uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
        // title: topic && topic.title ? topic.title : "",
        // description: topic && topic.description ? topic.description : "",
        parentId: topic && topic.parentId ? topic.parentId : "",
        // linkedTasks: topic && topic.linkedTasks ? topic.linkedTasks : [], // Assuming 'linkedTasks' is an array of linked topic IDs
        // tags: topic && topic.tags ? topic.tags : [], // Set the initial tags based on the topic
        // children: topic && topic.children ? topic.children.map(c => c.uniqueId) : []
    });

    const handleSaveTask = () => {
        // console.log(
        //     `Going to save: taskId: ${topic._id} , formData : ${JSON.stringify(
        //         formData
        //     )}`
        // );
        if (topic && topic.uniqueId) {
            // If a topic is provided, it's an update
            // dispatch(updateTopic({ taskId: topic._id, taskData: { children: formData.children } }));
            dispatch(
                updateTopic({
                    ...{ parentId: formData.parentId },
                    uniqueId: topic.uniqueId,
                })
            );
            // console.log("updated!!!");
        } else {
            // console.log("Not updated!!!");
        }
        navigate(-1);
    };

    const taskFormStyle = {};

    const [selectedOption] = useState("");

    return (
        <>
            {/* {`Either create and add as subtask of ${id}`} <br />
            {`my selected topic : ${JSON.stringify(topic)}`} <br /> */}
            {/* {`my transformed formData : ${JSON.stringify(formData)}`} */}
            {/* <div>
                <CustomButton onClick={handleCreateNewSubtask}>Create new Sub-Topic</CustomButton>
            </div> */}

            {/* {`Or select existing subtasks from list.`} */}

            <div style={taskFormStyle}>
                <p>{topic?.title}</p>
                <div>
                    <label htmlFor="tags">Add Existing Topics:</label>
                    <Select
                        name="tasks"
                        options={taskOptions}
                        defaultValue={selectedOption}
                        // value={taskOptions.filter((t) => t.value === formData.uniqueId)}
                        onChange={handleTaskSelect}
                    />
                </div>
            </div>

            <div>
                <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
                <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
            </div>
        </>
    );
};

const CreateSectionRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const topics = useSelector((state) => state.topics.flatData);
    const { id } = useParams();
    const [formData] = useState({
        name: "",
        linkedTopicUniqueId: id,
        description: "",
    });

    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        if (topics && topics.length > 0) {
            // const tasks = prepareTasksQueue(treeStructuredTasks);
            // console.log(`CreateSectionRouterPage: JSON.stringify(tasks, null, 2): ${JSON.stringify(tasks, null, 2)}`)
            const topic = topics?.find((t) => t.uniqueId === id);
            setSelectedTopic((pre) => ({ ...topic }));
        }
    }, [topics]);

    const handleSaveTag = (data) => {
        // alert(JSON.stringify(data, null, 2));
        dispatch(createTopicSection({ ...data }));
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            {/* <pre>{JSON.stringify(selectedTopic, null, 2)}</pre> */}
            <TopicSectionForm
                formData={formData}
                selectedTopic={selectedTopic}
                onSubmit={handleSaveTag}
                onCancel={handleCancel}
            />
        </>
    );
};

const EditSectionRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const treeStructuredTasks = useSelector((state) => state.topics.data);
    const topics = useSelector((state) => state.topics.flatData);
    const { id, sectionId } = useParams();
    const [formData] = useState({
        uniqueId: sectionId,
        name: "",
        linkedTopicUniqueId: id,
        description: "",
    });

    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        if (topics && topics.length > 0) {
            // const tasks = prepareTasksQueue(treeStructuredTasks);
            // console.log(`CreateSectionRouterPage: JSON.stringify(tasks, null, 2): ${JSON.stringify(tasks, null, 2)}`)
            const topic = topics?.find((t) => t.uniqueId === id);
            setSelectedTopic((pre) => ({ ...topic }));
        }
    }, [topics]);

    const handleUpdate = (data) => {
        // alert(JSON.stringify(data, null, 2));
        dispatch(updateTopicSectionsById({ ...data }));
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            {/* <pre>{JSON.stringify(sectionsData, null, 2)}</pre> */}
            <TopicSectionForm
                formData={formData}
                selectedTopic={selectedTopic}
                onSubmit={handleUpdate}
                onCancel={handleCancel}
            />
        </>
    );
};

// const getNameWithAncestors = (topic) => {
//     if (!topic) {
//         return "";
//     }
//     let ancestorNames = [];
//     let currentAncestor = topic.ancestors?.find(
//         (ancestor) => !ancestor.parentId
//     )||null;
//     while (currentAncestor) {
//         ancestorNames.push(currentAncestor.name);
//         currentAncestor = topic.ancestors.find(
//             (ancestor) => ancestor.parentId === currentAncestor.uniqueId
//         );
//     }
//     ancestorNames.push(topic.name);
//     const fullyQualifiedName = ancestorNames.join(" / ");
//     return fullyQualifiedName;
// };

// const prepareTasksQueue = (list, prevQueue = []) => {
//     let queue = [...prevQueue];

//     if (list && list.length > 0) {
//         list.forEach((t) => {
//             queue = [
//                 ...queue,
//                 {
//                     uniqueId: t.uniqueId,
//                     name: t.name,
//                     title: getNameWithAncestors(t),
//                     ancestors: t.ancestors,
//                     children: t.children,
//                     _id: t._id,
//                 },
//             ];
//             const childQ = prepareTasksQueue(t.children, []);
//             queue = [...queue, ...childQ];
//         });
//     }
//     // console.log(JSON.stringify(queue, null, 2));
//     return queue;
// };

const Breadcrumbs = ({
    parentId = "",
    topic = null,
    ancestors: providedAncestors = [],
    onAncestorClick = () => { },
}) => {
    const [ancestors, setAncestors] = useState([]);

    useEffect(() => {
        setAncestors((prev) => [...providedAncestors]);
        // const fetchAncestors = async () => {
        //   try {
        //     const response = await axios.get(`/ancestors/${parentId}`);
        //     setAncestors(response.data);
        //   } catch (error) {
        //     console.error('Error fetching ancestors:', error);
        //   }
        // };

        // fetchAncestors();
    }, [providedAncestors]);

    return (
        <div>
            <div style={breadcrumbStyle.breadcrumbsContainer}>
                <HoverableSpan
                    style={breadcrumbStyle.breadcrumbItem}
                    isHoverable={false}
                >
                    <i>Home / </i>
                </HoverableSpan>
                {ancestors.map((ancestor, index) => (
                    <HoverableSpan
                        style={{ ...breadcrumbStyle.breadcrumbItem, cursor: "pointer" }}
                        key={index}
                        onClick={() => onAncestorClick(ancestor)}
                    >
                        <i>{ancestor.name} / </i>
                    </HoverableSpan>
                ))}
                <HoverableSpan
                    style={breadcrumbStyle.breadcrumbItem}
                    isSelected
                    isHoverable={false}
                >
                    <>{topic?.name}</>
                </HoverableSpan>
            </div>
        </div>
    );
};

const breadcrumbStyle = {
    breadcrumbsContainer: {
        marginBottom: "20px",
        padding: "0 .5rem",
    },
    breadcrumbList: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
    },
    breadcrumbItem: {
        display: "inline-block",
        marginRight: "5px",
    },
    breadcrumbLink: {
        color: "#007bff",
        textDecoration: "none",
    },
    breadcrumbLinkHover: {
        textDecoration: "underline",
    },
};

const styles = {
    selected: {
        fontWeight: "bold" /* Make selected link text bold */,
        fontSize: "22px" /* Increase font size for selected link */,
        color: "#e91140",
    },
    ulStyle: {
        listStyleType: "none", // Remove bullets
        paddingLeft: 0, // Remove left padding
    },
    liStyles: {
        marginLeft: "15px", // Add some space between list items
        paddingBottom: "3px",
    },
    tagStyle: {
        backgroundColor: "#ccc", // Grey background color
        border: "1px solid #999", // Grey border
        padding: "2px 5px", // Adjust padding as needed
        fontSize: "12px", // Small font size
        borderRadius: "4px", // Rounded corners
    },
};

export default TopicBase;
export {
    CreateTopicComp,
    EditTopicComp,
    ViewTopic,
    AddSubTopicComp,
    MoveToAnotherTopicParent,
    CreateSectionRouterPage,
    EditSectionRouterPage,
    SearchRouterPage,
    Breadcrumbs,
};
