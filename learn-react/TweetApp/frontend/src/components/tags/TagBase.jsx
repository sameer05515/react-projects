import React, { useEffect, useRef, useState } from "react";
import TagListOldView from "./TagListOldView";
import ViewSwitcher from "../../common/components/ViewSwitcher";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../common/components/CustomButton";
import TooltipSpan from "../../common/components/TooltipSpan";
import {
    createTag,
    fetchTags,
    selectAllTreeTags,
    selectNextTagUniqueId,
    selectPrevTagUniqueId,
    selectSelectedTagUniqueId,
    setSelectedTagUniqueId,
    updateTag,
} from "../../redux/slices/tagsSlice";
import {
    Outlet,
    createSearchParams,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";
import useDataFetching from "../../common/hooks/useDataFetching";
import TagForm from "./TagForm";
import TagCard, { TagLinkedItemType } from "./TagCard";

const TagBase = () => {
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
            {selectedView === "list" && <ListTags />}
            {selectedView === "card" && <TagListOldView />}
        </div>
    );
};

const ListTags = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tags = useSelector(selectAllTreeTags);
    const status = useSelector((state) => state.tags.loading);
    const error = useSelector((state) => state.tags.error);

    const selectedTagUniqueId = useSelector(selectSelectedTagUniqueId);
    const nextTagUniqueId = useSelector(selectNextTagUniqueId);
    const prevTagUniqueId = useSelector(selectPrevTagUniqueId);

    const selectedElementRef = useRef(null);
    useEffect(() => {
        //dispatch(fetchTopics());
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
    }, [selectedTagUniqueId]);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleLinkSelection = (selectedItem) => {
        // console.log(JSON.stringify(selectedItem));
        // setSelectedLink(selectedItem);
        navigate(`${selectedItem.uniqueId}`);
    };

    const getTopicsJSX = (tags) => {
        return (
            <>
                {tags && tags.length > 0 && (
                    <ul style={styles.ulStyle}>
                        {tags.map((tag) => (
                            <li style={styles.liStyles} key={tag.uniqueId}>
                                <span
                                    ref={
                                        selectedTagUniqueId === tag.uniqueId
                                            ? selectedElementRef
                                            : null
                                    }
                                    style={{
                                        fontSize: "12px",
                                        ...(selectedTagUniqueId &&
                                            selectedTagUniqueId === tag.uniqueId
                                            ? styles.selected
                                            : {}),
                                    }}
                                    onClick={() => handleLinkSelection(tag)}
                                >
                                    {/* {tag.name} */}
                                    <TooltipSpan maxCharLength={25} text={tag.name} />
                                </span>
                                {getTopicsJSX(tag.children)}
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
        <>
            <div className="linksContainer">
                <div className="left-section">
                    {/* <pre>{links && JSON.stringify(links)}</pre> */}
                    <div style={{ margin: "10px 0" }}>
                        <CustomButton
                            style={{ ...styles.tagStyle, marginRight: "10px" }}
                            onClick={() => handleButtonClick("create")}
                        >
                            Create Tag
                        </CustomButton>
                        <CustomButton
                            style={{ ...styles.tagStyle, marginRight: "10px" }}
                            onClick={() => dispatch(fetchTags())}
                        >
                            Refresh
                        </CustomButton>
                        <CustomButton
                            style={{ ...styles.tagStyle, marginRight: "10px" }}
                            onClick={() => navigate(`/tags/search`)}
                        >
                            Search
                        </CustomButton>
                    </div>
                    {getTopicsJSX(tags)}
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

const ViewTag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const url = `${BACKEND_APPLICATION_BASE_URL}/tags/${id}`;
    const { data, loading, error, refetch } = useDataFetching(url);
    // const [searchParams] = useSearchParams();
    // const sectionId = searchParams.get("sectionId");

    const selectedTagUniqueId = useSelector(selectSelectedTagUniqueId);
    const nextTagUniqueId = useSelector(selectNextTagUniqueId);
    const prevTagUniqueId = useSelector(selectPrevTagUniqueId);

    useEffect(() => {
        if (id) {
            refetch();
            dispatch(setSelectedTagUniqueId(id));
            // handleTopicTraversal(0);
        }
    }, [id, dispatch]);

    const handleEdit = (item) => {
        navigate(`/tags/${data.uniqueId}/edit`, { state: { data } });
    };

    const handleLinkSelection = (selectedItem, itemType) => {
        // console.log(JSON.stringify(selectedItem));
        // setSelectedLink(selectedItem);
        if (selectedItem && itemType) {
            if (TagLinkedItemType.topic === itemType) {
                navigate(`/topic-mgmt/${selectedItem.uniqueId}`);
            } else if (TagLinkedItemType.topicSection === itemType) {
                navigate({
                    pathname: `/topic-mgmt/${selectedItem.linkedTopicUniqueId}`,
                    search: selectedItem.uniqueId
                        ? createSearchParams({
                            sectionId: selectedItem.uniqueId,
                        }).toString()
                        : "",
                });
            } else if (TagLinkedItemType.task === itemType) {
                navigate(`/task-mgmt/${selectedItem.uniqueId}`);
            }
        }
    };

    const addChildTag = (id) => {
        navigate({
            pathname: "/tags/create",
            search: id
                ? createSearchParams({
                    parent: id,
                }).toString()
                : "",
        });
    };

    const handleChildTagClick = (item) => {
        // console.log(`moving to subtask having : ${JSON.stringify(item)}`);
        navigate(`/tags/${item?.uniqueId}`);
    };

    const handleMoveAnotherParent = (item) => {
        // console.log(`moving to subtask having : ${JSON.stringify(item)}`);
        navigate(`/tags/${id}/move-parent`);
    };

    const handleTagTraversal = (increment) => {        
        if (increment === 1 && nextTagUniqueId) {
            navigate(`/tags/${nextTagUniqueId}`);
        } else if (increment === -1 && prevTagUniqueId) {
            navigate(`/tags/${prevTagUniqueId}`);
        }
    };

    const handleAncestorClick = (ancestor) => {
        if (!ancestor) {
            return;
        }
        navigate(`/tags/${ancestor.uniqueId}`);
    };

    const handleBaseSpanClick= ()=>{
        dispatch(setSelectedTagUniqueId(null));
        navigate(`/tags`);
    }

    
    return data ? (
        <TagCard
            onAddSubTag={() => addChildTag(id)}
            showDescription={true}
            tag={data}
            onEdit={handleEdit}
            onLinkedItemClick={handleLinkSelection}
            onChildTagClick={handleChildTagClick}
            onMoveAnotherParent={handleMoveAnotherParent}
            onTagTraversal={handleTagTraversal}
            onAncestorClick={handleAncestorClick}
            onBaseSpanClick={handleBaseSpanClick}
        />
    ) : (
        <>No data found for given tag id : {id}</>
    );
};

const CreateTag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const parentId = searchParams.get("parent");
    const handleCancel = () => {
        navigate(-1);
    };
    const handleSaveTag = (data) => {
        // alert(JSON.stringify(data, null, 2));
        dispatch(createTag({ ...data }));
        navigate(-1);
    };
    return (
        <>
            {`parentId: ${parentId}`}
            <TagForm
                formData={{ parentId: parentId || "" }}
                onSubmit={handleSaveTag}
                onCancel={handleCancel}
            />
        </>
    );
};

const EditTag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    // const url = `${BACKEND_APPLICATION_BASE_URL}/tags/${id}`;
    // const { data, loading, error, refetch } = useDataFetching(url);
    const location = useLocation();
    const { data } = location.state || {};
    const handleCancel = () => {
        navigate(-1);
    };
    // useEffect(() => {
    //     if (id) {
    //         refetch();
    //         //dispatch(setSelectedTagUniqueId(id));
    //         // handleTopicTraversal(0);
    //     }
    // }, [id, dispatch]);
    const handleEditTag = (data) => {
        // alert(JSON.stringify(data, null, 2));
        dispatch(updateTag({ ...data }));
        navigate(-1);
    };
    return (
        <>
            {/* <pre>data: {JSON.stringify(data, null, 2)}</pre>
        <pre>location: {JSON.stringify(location, null, 2)}</pre> */}
            Edit Tag
            {data && (
                <TagForm
                    formData={data}
                    onSubmit={handleEditTag}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

const MoveToAnotherTagParent=()=>{
    return(
        <>Move to another tag parent</>
    )
}

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

const SearchTagRouterPage = () => {
    return <>Search Tag</>;
};

export default TagBase;
export { ViewTag, CreateTag, EditTag, SearchTagRouterPage, MoveToAnotherTagParent };
