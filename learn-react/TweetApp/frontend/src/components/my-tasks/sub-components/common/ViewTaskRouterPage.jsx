import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching";
import {
  fetchPinnedItems,
  upsertPinnedItem,
} from "../../../../redux/slices/pinnedItemSlice";
import {
  fetchTags,
  selectAllFlatTags,
} from "../../../../redux/slices/tagsSlice";
import {
  selectAllFlatTasks,
  selectNextTaskUniqueId,
  selectPrevTaskUniqueId,
  setSelectedTaskUniqueId,
} from "../../../../redux/slices/taskSlice";
import TaskCard from "./TaskCard";

const ViewTaskRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`;
  const { data, loading, error, refetch } = useDataFetching({ url });
  const availableTags = useSelector(selectAllFlatTags);
  const pinnedItems = useSelector((state) => state.pinnedItems.data);

  const tasks = useSelector(selectAllFlatTasks);
  const [pinnedTasks, setPinnedTasks] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const nextTaskUniqueId = useSelector(selectNextTaskUniqueId);
  const prevTaskUniqueId = useSelector(selectPrevTaskUniqueId);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchPinnedItems());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      refetch();
      dispatch(setSelectedTaskUniqueId(id));
    }
  }, [id, tasks, dispatch]);

  useEffect(() => {
    if (
      id &&
      pinnedItems &&
      tasks &&
      pinnedItems.length > 0 &&
      tasks.length > 0
    ) {
      let pinnedTasksList = pinnedItems.filter(
        (pi) => pi.linkedItemType === "task" && pi.softDelete === false
      );
      pinnedTasksList = pinnedTasksList
        ? pinnedTasksList.map((pit) => ({
            ...pit,
            title:
              tasks.find((t) => t.uniqueId === pit.linkedUniqueId)?.title || "",
          }))
        : [];
      setPinnedTasks((prev) => [...pinnedTasksList]);
      setIsPinned(
        () => pinnedTasksList.findIndex((pit) => pit.linkedUniqueId === id) >= 0
      );
    }
  }, [id, tasks, pinnedItems]);

  const handleEdit = (item) => {
    navigate(`/task-mgmt/${id}/edit`);
  };
  const handleAddSubTask = (item) => {
    console.log(`Subtask will be added soon for id : ${id}`);
    navigate(`/task-mgmt/${id}/add-sub-task`);
  };
  const handleChildTaskClick = (item) => {
    console.log(`moving to subtask having : ${JSON.stringify(item)}`);
    navigate(`/task-mgmt/${item?.uniqueId}`);
  };
  const handleTaskTraversal = (increment) => {
    if (increment === 1 && nextTaskUniqueId) {
      navigate(`/task-mgmt/${nextTaskUniqueId}`);
    } else if (increment === -1 && prevTaskUniqueId) {
      navigate(`/task-mgmt/${prevTaskUniqueId}`);
    }
  };

  const handleLinkedTagSelection = (linkedTagUID) => {
    navigate(`/tags/${linkedTagUID}`);
  };

  const handlePinTask = (item, isPinned) => {
    dispatch(
      upsertPinnedItem({
        linkedUniqueId: item.uniqueId,
        linkedItemType: "task",
        softDelete: isPinned,
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data ? (
        <TaskCard
          task={data}
          tags={availableTags}
          showDescription={true}
          pinnedTasks={pinnedTasks}
          isPinned={isPinned}
          onEdit={handleEdit}
          onTaskTraversal={handleTaskTraversal}
          onAddSubTask={handleAddSubTask}
          onChildTaskClick={handleChildTaskClick}
          onPinTask={handlePinTask}
          onLinkedTagSelection={handleLinkedTagSelection}
        />
      ) : (
        <>No task data found for id: {id}</>
      )}
    </>
  );
};

export default ViewTaskRouterPage;
