import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet, useNavigate
} from "react-router-dom";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import TooltipSpan from "../../../../common/components/tooltip-span/TooltipSpan";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";
import useDataFetching from "../../../../common/hooks/useDataFetching/v2";
import {
  fetchTopics, selectAllTreeTopics, selectSelectedTopicUniqueId
} from "../../../../redux/slices/topicSlice";
import { fetchTags } from "../../../../redux/slices/tagsSlice";
import { TopicMgmtStyles as styles } from "../styles";

const TopicTreeViewDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const topics = useSelector(selectAllTreeTopics);
    const selectedTopicUniqueId = useSelector(selectSelectedTopicUniqueId);
    const selectedElementRef = useRef(null);

    // Fetch topics and tags data only when component mounts (with smart caching)
    // Tags are needed for CreateTopic component
    const { loading: topicsLoading, error: topicsError } = useDataFetching(
      fetchTopics,
      (state) => state.topics
    );
    
    // Also fetch tags since they're needed for topic creation/editing
    useDataFetching(
      fetchTags,
      (state) => state.tags
    );

    const status = useSelector((state) => state.topics.loading);
    const error = useSelector((state) => state.topics.error);
    
  
    useEffect(() => {
      if (selectedElementRef.current) {
        selectedElementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
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
      
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (status === "failed") {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div
        style={{
          display: "flex",
          maxHeight: "95vh",
          maxWidth: "95vw",
          paddingLeft: "25px",
        }}
      >
        <div style={{ flex: 1, overflow: "auto" }}>
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
            <CustomButton
              style={{ ...styles.tagStyle, marginRight: "10px" }}
              onClick={() => navigate("/topic-mgmt/two-nodes")}
            >
              two-nodes
            </CustomButton>
          </div>
          {/* {getTopicsJSX(topics)} */}
          {topics && topics.length > 0 && (
            <Tree
              data={topics}
              selectedNodeId={selectedTopicUniqueId}
              renderNode={(topic) => (
                <>
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
                </>
              )}
            />
          )}
        </div>
        {/* -- left-section */}
  
        <div style={{ flex: 4, overflow: "auto", marginLeft: "20px" }}>
          <div>
            <Outlet />
          </div>
        </div>
        {/* -- right-section */}
      </div>
      // -- linksContainer
    );
  };

export default TopicTreeViewDashboard