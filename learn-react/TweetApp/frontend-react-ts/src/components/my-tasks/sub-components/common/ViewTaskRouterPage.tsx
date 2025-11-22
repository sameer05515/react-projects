import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import useDataFetching from "../../../../common/hooks/useDataFetching/v1";
import { upsertPinnedItem } from "../../../../redux/slices/pinnedItemSlice";
import {
  selectAllFlatTasks,
  selectNextTaskUniqueId,
  selectPrevTaskUniqueId,
  setSelectedTaskUniqueId,
} from "../../../../redux/slices/taskSlice";
import type { AppDispatch, RootState } from "../../../../redux/store";
import TaskCard from "./TaskCard";

const ViewTaskRouterPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  
  // ✅ Memoize URL to prevent infinite loops
  const url = useMemo(
    () => `${BACKEND_APPLICATION_BASE_URL}/tasks/${id}`,
    [id]
  );
  
  const { data, loading, error, refetch } = useDataFetching({ url });
  const pinnedItems = useSelector((state: RootState) => (state.pinnedItems as any).data);

  const tasks = useSelector(selectAllFlatTasks);
  const [pinnedTasks, setPinnedTasks] = useState<any[]>([]);
  const [isPinned, setIsPinned] = useState(false);
  const nextTaskUniqueId = useSelector(selectNextTaskUniqueId);
  const prevTaskUniqueId = useSelector(selectPrevTaskUniqueId);

  useEffect(() => {
    if (id) {
      refetch();
      dispatch(setSelectedTaskUniqueId(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]); // Removed refetch from dependencies to prevent infinite loop

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
      setPinnedTasks([...pinnedTasksList]);
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

  const handlePinTask = (item: any, isPinned: boolean) => {
    dispatch(
      upsertPinnedItem({
        linkedUniqueId: item.uniqueId,
        linkedItemType: "task",
        softDelete: isPinned,
      }) as any
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {typeof error === 'string' ? error : (error as any)?.message || 'An error occurred'}</div>;
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
