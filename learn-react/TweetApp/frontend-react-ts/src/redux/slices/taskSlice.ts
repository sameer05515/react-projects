// slices/taskSlice.js
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Create an async thunk to fetch tasks from the API
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/tasks`); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return data;
});

// Create an async thunk to save a task to the API
export const saveTask = createAsyncThunk("tasks/saveTask", async (taskData: any) => {
  const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to save task");
  }

  const data = await response.json();
  return data;
});

// Create an async thunk to update a task in the API
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }: { taskId: string; taskData: any }) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    const data = await response.json();
    return data;
  }
);

type TaskNode = {
  uniqueId: string;
  name: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TaskNode[];
  _id?: string;
};

type FlatTask = {
  uniqueId: string;
  name: string;
  title: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: TaskNode[];
  _id?: string;
};

const getNameWithAncestors = (task: TaskNode | undefined | null) => {
  if (!task) {
    return "";
  }
  const ancestorNames: string[] = [];
  let currentAncestor =
    task.ancestors?.find((ancestor) => !ancestor.parentId) || null;

  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    const currentId = currentAncestor.uniqueId;
    currentAncestor =
      task.ancestors?.find((ancestor) => ancestor.parentId === currentId) ||
      null;
  }

  ancestorNames.push(task.name);
  return ancestorNames.join(" / ");
};

// Helper function to prepare flat data from tree-structured data
// Export for use in selectors
export const prepareTasksQueue = (list: TaskNode[] = [], prevQueue: FlatTask[] = []) => {
  let queue: FlatTask[] = [...prevQueue];
  if (list && list.length > 0) {
    list.forEach((t: TaskNode) => {
      queue = [
        ...queue,
        {
          uniqueId: t.uniqueId,
          name: t.name,          
          title: getNameWithAncestors(t),
          ancestors: t.ancestors,
          children: t.children,
          _id: t._id,
        },
      ];
      const childQ = prepareTasksQueue(t.children, []);
      queue = [...queue, ...childQ];
    });
  }
  return queue;
};

// Define an initial state for tasks
type TasksState = {
  selectedTaskUniqueId: string | null;
  data: TaskNode[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TasksState = {
  selectedTaskUniqueId: null,
  data: [], // Only store tree structure - flatData computed via selector
  status: "idle",
  error: null,
};

// Create a task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTaskUniqueId: (state, action) => {
      state.selectedTaskUniqueId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        // flatData now computed via memoized selector
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

// Export the reducer
export default taskSlice.reducer;
// Export the reducer and actions
export const { setSelectedTaskUniqueId } = taskSlice.actions;

/* ============== Selectors ======================*/
const selectTasksStateBase = (state: RootState) => state.tasks;

export const selectAllTreeTasks = createSelector(
  selectTasksStateBase,
  (tasksState) => tasksState.data as TaskNode[]
);

// Memoized selector to derive flat data from tree structure
export const selectAllFlatTasks = createSelector(
  [selectAllTreeTasks],
  (treeTasks: TaskNode[]) => prepareTasksQueue(treeTasks)
);

export const selectSelectedTaskUniqueId = createSelector(
  selectTasksStateBase,
  (tasksState) => tasksState.selectedTaskUniqueId
);

export const selectNextTaskUniqueId = createSelector(
  [selectAllFlatTasks, selectSelectedTaskUniqueId],
  (flatTaskList: FlatTask[], selectedTaskUId: string | null) => {
    const dataLength = flatTaskList?.length || 0;
    const selectedIndex = flatTaskList.findIndex(
      (task) => task.uniqueId === selectedTaskUId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const nextIndex = (selectedIndex + dataLength + 1) % dataLength;
    return flatTaskList[nextIndex].uniqueId;
  }
);

export const selectPrevTaskUniqueId = createSelector(
  [selectAllFlatTasks, selectSelectedTaskUniqueId],
  (flatTaskList: FlatTask[], selectedTaskUId: string | null) => {
    const dataLength = flatTaskList?.length || 0;
    const selectedIndex = flatTaskList.findIndex(
      (task) => task.uniqueId === selectedTaskUId
    );
    if (selectedIndex < 0) {
      return null;
    }
    const prevIndex = (selectedIndex + dataLength - 1) % dataLength;
    return flatTaskList[prevIndex].uniqueId;
  }
);

// Combined selector for common task state properties (optimizes multiple useSelector calls)
// Use this instead of multiple useSelector calls for tasks, status, error, and selectedId
export const selectTasksStateCombined = createSelector(
  [
    selectAllTreeTasks,
    selectSelectedTaskUniqueId,
    selectTasksStateBase,
  ],
  (tasks, selectedId, tasksState) => ({
    tasks,
    status: tasksState.status,
    error: tasksState.error,
    selectedId,
  })
);
