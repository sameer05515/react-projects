import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching/v1";
import { upsertPinnedItem } from "../../../../redux/slices/pinnedItemSlice";
import {
  selectAllFlatTopics,
  selectNextTopicUniqueId,
  selectPrevTopicUniqueId,
  setSelectedTopicUniqueId,
} from "../../../../redux/slices/topicSlice";
import TopicCard from "./TopicCard";

const ViewTopic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get("sectionId");
  const url = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`;
  const { data, loading, error, refetch } = useDataFetching({ url });
  const sectionFetchUrl = `${BACKEND_APPLICATION_BASE_URL}/topics/${id}/sections`;
  const { data: sectionsData, refetch: sectionsRefetch } = useDataFetching({
    url: sectionFetchUrl,
  });

  const pinnedItems = useSelector((state) => state.pinnedItems.data);

  const [pinnedTopics, setPinnedTopics] = useState([]);
  const [isPinned, setIsPinned] = useState(false);

  const topics = useSelector(selectAllFlatTopics);

  const nextTopicUniqueId = useSelector(selectNextTopicUniqueId);
  const prevTopicUniqueId = useSelector(selectPrevTopicUniqueId);

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
      topics &&
      pinnedItems.length > 0 &&
      topics.length > 0
    ) {
      let pinnedTopicsList = pinnedItems.filter(
        (pi) => pi.linkedItemType === "topic" && pi.softDelete === false
      );
      pinnedTopicsList = pinnedTopicsList
        ? pinnedTopicsList.map((pit) => ({
            ...pit,
            title:
              topics.find((t) => t.uniqueId === pit.linkedUniqueId)?.title ||
              "",
          }))
        : [];
      setPinnedTopics((prev) => [...pinnedTopicsList]);
      setIsPinned(
        (prev) =>
          pinnedTopicsList.findIndex((pit) => pit.linkedUniqueId === id) >= 0
      );
    }
  }, [id, topics, pinnedItems]);

  useEffect(() => {
    sectionsRefetch();
  }, [id, sectionId]);

  const handleEdit = (item) => {
    navigate(`/topic-mgmt/${data.uniqueId}/edit`);
  };
  const handleTopicTraversal = (increment) => {
    if (increment === 1 && nextTopicUniqueId) {
      navigate(`/topic-mgmt/${nextTopicUniqueId}`);
    } else if (increment === -1 && prevTopicUniqueId) {
      navigate(`/topic-mgmt/${prevTopicUniqueId}`);
    }
  };
  const handleAddSubTask = (item) => {
    navigate(`/topic-mgmt/${id}/add-sub-topic`);
  };
  const handleChildTaskClick = (item) => {
    navigate(`/topic-mgmt/${item?.uniqueId}`);
  };
  const handleMoveAnotherParent = (item) => {
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
    navigate({
      pathname: `/topic-mgmt/${id}`,
      search: sectionUniqueId
        ? createSearchParams({
            sectionId: sectionUniqueId,
          }).toString()
        : "",
    });
  };

  const handleLinkedTagSelection = (linkedTagUID) => {
    navigate(`/tags/${linkedTagUID}`);
  };

  const handleBaseSpanClick = () => {
    dispatch(setSelectedTopicUniqueId(null));
    navigate(`/topic-mgmt`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data && (
        <TopicCard
          topic={data}
          topicSections={sectionsData}
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
          onLinkedTagSelection={handleLinkedTagSelection}
          onBaseSpanClick={handleBaseSpanClick}
        />
      )}
    </>
  );
};

export default ViewTopic;
