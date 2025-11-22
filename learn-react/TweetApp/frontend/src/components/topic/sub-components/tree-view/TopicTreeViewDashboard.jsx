import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet, useNavigate
} from "react-router-dom";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import TooltipSpan from "../../../../common/components/tooltip-span/TooltipSpan";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";
import { useReduxDataFetching } from "../../../../common/hooks/useDataFetching";
import {
  fetchTopics,
  selectTopicsStateCombined
} from "../../../../redux/slices/topicSlice";
import { fetchTags } from "../../../../redux/slices/tagsSlice";

const TopicTreeViewDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedElementRef = useRef(null);

    // Fetch topics and tags data only when component mounts (with smart caching)
    // Tags are needed for CreateTopic component
    useReduxDataFetching(
      fetchTopics,
      (state) => state.topics
    );
    
    // Also fetch tags since they're needed for topic creation/editing
    useReduxDataFetching(
      fetchTags,
      (state) => state.tags
    );

    // Use combined selector to optimize multiple useSelector calls
    const { topics, loading: status, error, selectedId: selectedTopicUniqueId } = useSelector(selectTopicsStateCombined);
    
  
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
      
    if (status === "pending" || status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (status === "rejected" || status === "failed" || error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="flex max-h-[95vh] max-w-[95vw] pl-6">
        <div className="flex-1 overflow-auto">
          {/* <pre>{links && JSON.stringify(links)}</pre> */}
          <div className="my-2.5">
            <CustomButton
              className="bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 text-xs rounded mr-2.5"
              onClick={() => handleButtonClick("create")}
            >
              Create Topic
            </CustomButton>
            <CustomButton
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-1.5 py-0.5 text-xs rounded mr-2.5"
              onClick={() => handleButtonClick("create-bulk")}
            >
              Create in bulk
            </CustomButton>
            <CustomButton
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400 px-1.5 py-0.5 text-xs rounded mr-2.5"
              onClick={() => dispatch(fetchTopics())}
            >
              Refresh
            </CustomButton>
            <CustomButton
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400 px-1.5 py-0.5 text-xs rounded mr-2.5"
              onClick={() => navigate(`/topic-mgmt/search`)}
            >
              Search
            </CustomButton>
            <CustomButton
              className="bg-green-100 hover:bg-green-200 text-green-800 border border-green-300 px-1.5 py-0.5 text-xs rounded mr-2.5"
              onClick={() => navigate("/topic-mgmt/published")}
            >
              Published
            </CustomButton>
            <CustomButton
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400 px-1.5 py-0.5 text-xs rounded mr-2.5"
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
                    className={`text-xs cursor-pointer ${
                      selectedTopicUniqueId && selectedTopicUniqueId === topic.uniqueId
                        ? "font-bold text-red-600 text-sm"
                        : ""
                    }`}
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

        <div className="flex-[4] overflow-auto ml-5">
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