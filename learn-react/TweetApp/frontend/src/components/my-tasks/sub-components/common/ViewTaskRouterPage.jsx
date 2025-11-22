import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import { useFetchByUrl } from "../../../../common/hooks/useDataFetching";
import { upsertPinnedItem } from "../../../../redux/slices/pinnedItemSlice";
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
  const { data, loading, error, refetch } = useFetchByUrl({ url });
  const pinnedItems = useSelector((state) => state.pinnedItems.data);
  const tasks = useSelector(selectAllFlatTasks);
  const nextTaskUniqueId = useSelector(selectNextTaskUniqueId);
  const prevTaskUniqueId = useSelector(selectPrevTaskUniqueId);

  const pinnedTasks = useMemo(() => {
    if (!pinnedItems?.length || !tasks?.length) return [];
    const list = pinnedItems.filter(
      (pi) => pi.linkedItemType === "task" && pi.softDelete === false
    );
    return list.map((pit) => ({
      ...pit,
      title: tasks.find((t) => t.uniqueId === pit.linkedUniqueId)?.title || "",
    }));
  }, [pinnedItems, tasks]);

  const isPinned = useMemo(
    () => pinnedTasks.some((pit) => pit.linkedUniqueId === id),
    [id, pinnedTasks]
  );

  useEffect(() => {
    if (id) {
      refetch();
      dispatch(setSelectedTaskUniqueId(id));
    }
  }, [id, dispatch, refetch]);

  const handleEdit = (item) => {
    navigate(`/task-mgmt/${id}/edit`);
  };
  const handleAddSubTask = (item) => {
    navigate(`/task-mgmt/${id}/add-sub-task`);
  };
  const handleChildTaskClick = (item) => {
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
          // tags={availableTags}
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
