import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import CustomButton from "../../../common/components/CustomButton";
import HoverableSpan from "../../../common/components/HoverableSpan";
import Tree from "../../../common/components/TreeViewer";
import useDataFetching from "../../../common/hooks/useDataFetching";
import {
    searchTopic,
    setSearchString, setSelectedQuestionUID,
    setSelectedTreeNodeUID, updateQuestion
} from "../../../redux/slices/interviewMgmtSlice";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";
import QuestionCard from "./QuestionCard";
import QuestionForm from "./QuestionForm";
import AnswerForm from "./AnswerForm";
import ButtonGroup from "../../../common/components/button/ButtonGroup";
import Select from "react-select";

const CategoryList = () => {
    const navigate = useNavigate();
    const selectedCategoryUID = useSelector(
        (state) => state.interviewMgmt.selectedCategoryUID
    );

    

    const {
        data,
        showOnlyLeafQuestions,
        setShowOnlyLeafQuestions,
        selectedTreeNodeUID,
    } = useInterviewMgmt();

    const handleLinkSelection = (uniqueId) =>
        navigate(`/interview-mgmt/questions/${uniqueId}`);

    // Function to determine if a node is a leaf node
    const isLeafNode = (node) => !node.children || node.children.length === 0;

    // Filter function to apply based on `showOnlyLeafQuestions`
    const filteredData = showOnlyLeafQuestions
        ? data?.filter((d) => isLeafNode(d)) || []
        : data || [];

    return (
        <>
            <CustomButton onClick={() => setShowOnlyLeafQuestions((prev) => !prev)}>
                {showOnlyLeafQuestions ? "Show All" : "Show Leafs"}
            </CustomButton>
            <Tree
                data={filteredData}
                selectedNodeId={selectedTreeNodeUID}
                renderNode={(category) => (
                    <>
                        <HoverableSpan
                            isSelected={selectedCategoryUID === category.uniqueId}
                            onClick={() => handleLinkSelection(category.uniqueId)}
                        >
                            <b>
                                {category.heading ||
                                    `Title not set for category: ${category.uniqueId}`}
                            </b>
                            {" - Total Questions: "}
                            {category.questions?.length || 0}
                        </HoverableSpan>
                        
                    </>
                )}
            />
        </>
    );
};

// const CreateCategory = () => {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//     const parentId = searchParams.get("parent");
//     return (
//         <CategoryForm
//             parentId={parentId}
//             onSave={() => {
//                 navigate(-1);
//             }}
//             onCancelEdit={() => navigate(-1)}
//         />
//     );
// };

// const EditCategory = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const url = `http://localhost:3003/intvw-mgmt/v2/categories/${id}`;
//     const { data } = useDataFetching(url);
//     return (
//         <>
//             Edit Category for : {id} <br />
//             {data && (
//                 <CategoryForm
//                     category={data}
//                     onSave={() => {
//                         navigate(-1);
//                     }}
//                     onCancelEdit={() => navigate(-1)}
//                 />
//             )}
//         </>
//     );
// };

// const ViewCategoryDetails = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const url = `http://localhost:3003/intvw-mgmt/v2/categories/${id}`;
//     const { data, loading, error, refetch } = useDataFetching(url);
//     const addNewLink = (id) => {
//         navigate({
//             pathname: "/interview-mgmt/create",
//             search: id
//                 ? createSearchParams({
//                     parent: id,
//                 }).toString()
//                 : "",
//         });
//     };

//     useEffect(() => {
//         if (id) {
//             refetch();
//             dispatch(setSelectedTreeNodeUID(id));
//             dispatch(setSelectedCategoryUID(id));
//             dispatch(setSelectedQuestionUID(null));
//         }
//     }, [id]);

//     const handleLinkSelection = (selectedItem) => {
//         if (selectedItem) {
//             navigate(`/interview-mgmt/${id}/questions/${selectedItem.uniqueId}`);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }
//     return (
//         <>
//             <ButtonGroup
//                 options={[
//                     {
//                         id: 1,
//                         onClick: () => navigate(`/interview-mgmt/${id}/edit`),
//                         children: "Edit Category",
//                     },
//                     {
//                         id: 2,
//                         onClick: () => addNewLink(id),
//                         children: "Add Sub Category",
//                     },
//                     {
//                         id: 3,
//                         children: "Move to Another Parent Category",
//                         onClick: () => navigate(`/interview-mgmt/${id}/move-parent`),
//                     },
//                 ]}
//             />

//             {data && (
//                 <CategoryCard
//                     category={data}
//                     onQuestionSelection={handleLinkSelection}
//                     onCreateQuestionClick={() =>
//                         navigate(`/interview-mgmt/${id}/questions/create`)
//                     }
//                 />
//             )}
//         </>
//     );
// };

// const MoveToAnotherCategoryParent = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { id } = useParams();

//     const { flatCategoryItemData: flatData, refreshCategoryTree } =
//         useInterviewMgmt();

//     const topic = flatData?.find((t) => t.uniqueId === id) || null;

//     const topicOptions = flatData
//         ?.filter((t) => t.uniqueId !== topic.uniqueId) // Exclude the current topic
//         .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId)) // Exclude ancestors of the topic
//         .filter((t) => !topic.children?.map((c) => c.uniqueId).includes(t.uniqueId)) // Exclude child categories of the topic
//         .map((t) => ({
//             value: t.uniqueId, // Assuming topic have unique IDs
//             label: t.title, // Display tag title in the dropdown
//         }));

//     const handleTaskSelect = (selectedTags) => {
//         setFormData({ ...formData, parentId: selectedTags.value });
//     };

//     const [formData, setFormData] = useState({
//         uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
//         parentId: topic && topic.parentId ? topic.parentId : "",
//     });

//     const handleSaveTask = () => {
//         if (topic && topic.uniqueId) {
//             dispatch(
//                 updateCategory({
//                     ...{ parentId: formData.parentId },
//                     uniqueId: topic.uniqueId,
//                 })
//             ).then(() => refreshCategoryTree());
//         }
//         navigate(-1);
//     };

//     const topicFormStyle = {};

//     const [selectedOption] = useState("");

//     return (
//         <>
//             <div style={topicFormStyle}>
//                 <p>{topic?.title}</p>
//                 <div>
//                     <label htmlFor="tags">Add Existing Topics:</label>
//                     <Select
//                         name="topics"
//                         options={topicOptions}
//                         defaultValue={selectedOption}
//                         onChange={handleTaskSelect}
//                     />
//                 </div>
//             </div>

//             {/* <JSONDataViewer metadata={{topic,flatData}} title="Raw Data"/> */}

//             <div>
//                 <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
//                 <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
//             </div>
//         </>
//     );
// };

const ViewQuestionDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, qid } = useParams();
    const url = `http://localhost:3003/intvw-mgmt/v2/questions/${qid}`;
    const { data, refetch } = useDataFetching(url);
    useEffect(() => {
        if (qid) {
            refetch();
            dispatch(setSelectedTreeNodeUID(qid));
            dispatch(setSelectedQuestionUID(qid));
        }
    }, [qid]);

    const {
        prevTreeNode,
        nextTreeNode,
      } = useInterviewMgmt();

    const handleBaseSpanClick = () => {
        dispatch(setSelectedQuestionUID(null));
        dispatch(setSelectedTreeNodeUID(null));
        navigate(`/interview-mgmt`);
    };

    const handleAncestorClick = (ancestor) => {
        if (!ancestor) {
            return;
        }
        navigate(`/interview-mgmt/questions/${ancestor.uniqueId}`);
    };

    const handleLinkedTagSelection = (linkedTagUID) => {
        navigate(`/tags/${linkedTagUID}`);
    };

    return (
        <>
            <ButtonGroup
                options={[
                    {
                        id: 1,
                        children: "Edit Question",
                        onClick: () => navigate(`/interview-mgmt/questions/${qid}/edit`),
                    },
                    {
                        id: 2,
                        children: "Add Child Question",
                        onClick: () =>
                            navigate({
                                pathname: `/interview-mgmt/questions/create`,
                                search: qid
                                    ? createSearchParams({
                                        parent: qid,
                                    }).toString()
                                    : "",
                            }),
                    },
                    // {
                    //     id: 3,
                    //     children: "Move to Another Category",
                    //     onClick: () =>
                    //         navigate(
                    //             `/interview-mgmt/${id}/questions/${qid}/move-to-another-category`
                    //         ),
                    // },
                    {
                        id: 4,
                        children: "Move to Another Parent Question",
                        onClick: () =>
                            navigate(`/interview-mgmt/questions/${qid}/move-parent`),
                    },
                    {
                        id: 5,
                        children: "Previous",
                        onClick: () =>
                            handleAncestorClick({uniqueId:prevTreeNode?.id}),
                    },
                    {
                        id: 6,
                        children: "Next",
                        onClick: () =>
                            handleAncestorClick({uniqueId:nextTreeNode?.id}),
                    },
                ]}
            />

            {data && (
                <QuestionCard
                    question={data}
                    categoryId={id}
                    onCreateAnswerClick={() =>
                        navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
                            state: {
                                data: { linkedQuestionsId: qid },
                                questionName: data?.name || "",
                            },
                        })
                    }
                    onUpdateAnswerClick={(answer) =>
                        navigate(`/interview-mgmt/questions/${qid}/answers/create`, {
                            state: { data: { ...answer }, questionName: data?.name || "" },
                        })
                    }
                    onBaseSpanClick={handleBaseSpanClick}
                    onAncestorClick={handleAncestorClick}
                    onChildTopicClick={handleAncestorClick}
                    onLinkedTagSelection={handleLinkedTagSelection}
                />
            )}
        </>
    );
};

const MoveQuestionToAnotherParentQuestion = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { qid } = useParams();

    const { flatCategoryItemData: flatData, refreshCategoryTree } =
        useInterviewMgmt();

    const topic = flatData?.find((t) => t.uniqueId === qid) || null;

    const topicOptions = flatData
        ?.filter((t) => t.uniqueId !== topic.uniqueId) // Exclude the current topic
        .filter((t) => !t.ancestors.map((a) => a.uniqueId).includes(topic.uniqueId)) // Exclude ancestors of the topic
        .filter((t) => !topic.children?.map((c) => c.uniqueId).includes(t.uniqueId)) // Exclude child categories of the topic
        .map((t) => ({
            value: t.uniqueId, // Assuming topic have unique IDs
            label: t.title, // Display tag title in the dropdown
        }));

    const handleTaskSelect = (selectedTags) => {
        setFormData({ ...formData, parentId: selectedTags.value });
    };

    const [formData, setFormData] = useState({
        uniqueId: topic && topic.uniqueId ? topic.uniqueId : "",
        parentId: topic && topic.parentId ? topic.parentId : "",
    });

    const handleSaveTask = () => {
        if (topic && topic.uniqueId && qid) {
            dispatch(
                updateQuestion({
                    ...{ parentId: formData.parentId },
                    uniqueId: qid,
                })
            ).then(() => refreshCategoryTree());
        }
        navigate(`/interview-mgmt/questions/${qid}`);
    };

    const topicFormStyle = {};

    const [selectedOption] = useState("");

    return (
        <>
            <div style={topicFormStyle}>
                <p>{topic?.title}</p>
                <div>
                    <label htmlFor="tags">Select Parent Question:</label>
                    <Select
                        name="topics"
                        options={topicOptions}
                        defaultValue={selectedOption}
                        onChange={handleTaskSelect}
                    />
                </div>
            </div>

            {/* <JSONDataViewer metadata={{formData,flatData}} title="Raw Data"/> */}

            <div>
                <CustomButton onClick={() => handleSaveTask()}>Save</CustomButton>
                <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
            </div>
        </>
    );
};

const CreateQuestion = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");

    return (
        <QuestionForm
            initialFormData={{ linkedCategoryId: id, parentId: parentId || "" }}
            onSave={() => {
                navigate(-1);
            }}
            onCancelEdit={() => navigate(-1)}
        />
    );
};

const EditQuestion = () => {
    const navigate = useNavigate();
    const { id, qid } = useParams();
    const url = `http://localhost:3003/intvw-mgmt/v2/questions/${qid}`;
    const { data, refetch, loading } = useDataFetching(url);
    useEffect(() => {
        if (qid) {
            refetch();
        }
    }, [qid]);

    if (loading) {
        return <>Loading</>;
    }

    return (
        <>
            {data && (
                <QuestionForm
                    initialFormData={data}
                    onSave={() => {
                        navigate(-1);
                    }}
                    onCancelEdit={() => navigate(-1)}
                />
            )}
        </>
    );
};

const SearchInterviewMgmtRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const topicFormStyle = {};

    const [formData, setFormData] = useState({
        title: "",
    });
    const data = useSelector((state) => state.interviewMgmt.searchedData);
    const searchString = useSelector((state) => state.interviewMgmt.searchString);
    // const flatData = useSelector(selectAllFlatTopics);
    const { flatData, showOnlyLeafQuestions, setShowOnlyLeafQuestions } =
        useInterviewMgmt();

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

    const handleSearch = () => {
        const searchOptions = Object.keys(criteriaList).reduce((acc, key) => {
            acc[key] = criteriaList[key].value;
            return acc;
        }, {});

        const raw = {
            searchString: formData.title,
            searchOptions: searchOptions,
        };

        dispatch(setSearchString(formData.title));
        dispatch(searchTopic(raw));
    };

    const onChildTopicClick = (selectedTopic) => {
        navigate(`/interview-mgmt/questions/${selectedTopic?.uniqueId}`);
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
            <div style={topicFormStyle}>
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
                {data && data.length > 0 ? (
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
                ):<>No Result Found, or Search functionality not used yet!</>}
            </div>
        </>
    );
};

const CreateAnswer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, qid } = useParams();
    const { data: initialFormData, questionName } = location.state || {};

    return (
        <AnswerForm
            questionName={questionName}
            initialFormData={initialFormData}
            onSave={() => {
                navigate(-1);
            }}
            onCancelEdit={() => navigate(-1)}
        />
    );
};

const EditAnswer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, qid } = useParams();
    const { data: initialFormData, questionName } = location.state || {};

    return (
        <AnswerForm
            questionName={questionName}
            initialFormData={initialFormData}
            onSave={() => {
                navigate(-1);
            }}
            onCancelEdit={() => navigate(-1)}
        />
    );
};

export {
    CategoryList,
    // CreateCategory,
    CreateQuestion,
    // EditCategory,
    EditQuestion,
    // ViewCategoryDetails,
    ViewQuestionDetails,
    MoveQuestionToAnotherParentQuestion,
    SearchInterviewMgmtRouterPage,
    CreateAnswer,
    EditAnswer,
    // MoveToAnotherCategoryParent,
    // MoveQuestionToAnotherCategory,
};
