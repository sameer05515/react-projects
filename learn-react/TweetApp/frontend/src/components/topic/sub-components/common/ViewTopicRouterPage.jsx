import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import { useFetchByUrl } from "../../../../common/hooks/useDataFetching";
import { authenticatedFetch } from "../../../../common/service/authenticatedFetch";
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
  const [publishing, setPublishing] = React.useState(false);
  const [publishError, setPublishError] = React.useState(null);
  const url = useMemo(() => `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`, [id]);
  const { data, loading, error, refetch } = useFetchByUrl({ url });
  const sectionFetchUrl = useMemo(() => `${BACKEND_APPLICATION_BASE_URL}/topics/${id}/sections`, [id]);
  const { data: sectionsData, refetch: sectionsRefetch } = useFetchByUrl({
    url: sectionFetchUrl,
  });

  const pinnedItems = useSelector((state) => state.pinnedItems.data);
  const topics = useSelector(selectAllFlatTopics);
  const nextTopicUniqueId = useSelector(selectNextTopicUniqueId);
  const prevTopicUniqueId = useSelector(selectPrevTopicUniqueId);

  const pinnedTopics = useMemo(() => {
    if (!pinnedItems?.length || !topics?.length) return [];
    const list = pinnedItems.filter(
      (pi) => pi.linkedItemType === "topic" && pi.softDelete === false
    );
    return list.map((pit) => ({
      ...pit,
      title: topics.find((t) => t.uniqueId === pit.linkedUniqueId)?.name || "",
    }));
  }, [pinnedItems, topics]);

  const isPinned = useMemo(
    () => pinnedTopics.some((pit) => pit.linkedUniqueId === id),
    [id, pinnedTopics]
  );

  useEffect(() => {
    if (id) {
      refetch();
      dispatch(setSelectedTopicUniqueId(id));
    }
  }, [id, dispatch, refetch]);

  useEffect(() => {
    if (id) {
      sectionsRefetch();
    }
  }, [id, sectionId, sectionsRefetch]);

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
    navigate(`/topic-mgmt/create-bulk?parent=${id}`);
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

  const handlePublish = async () => {
    if (!id || data?.published) return;
    setPublishError(null);
    setPublishing(true);
    try {
      const res = await authenticatedFetch(
        `${BACKEND_APPLICATION_BASE_URL}/topics/${id}/publish`,
        { method: "PUT" }
      );
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const message = errBody?.error || errBody?.message || "Publish failed";
        setPublishError(message);
        return;
      }
      await refetch();
    } catch (err) {
      setPublishError(err?.message || "Publish failed");
    } finally {
      setPublishing(false);
    }
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
        <>
          <div className="mb-2">
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => navigate(`/topic-mgmt/wiki/${data.uniqueId}`)}
            >
              View as Wiki
            </button>
          </div>
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
          onPublish={handlePublish}
          publishing={publishing}
          publishError={publishError}
        />
        </>
      )}
    </>
  );
};

export default ViewTopic;
