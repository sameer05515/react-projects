// slices/taskSlice.js
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
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
export const saveTask = createAsyncThunk("tasks/saveTask", async (taskData) => {
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
  async ({ taskId, taskData }) => {
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

const getNameWithAncestors = (task) => {
  if (!task) {
    return "";
  }
  let ancestorNames = [];
  let currentAncestor =
    task.ancestors?.find((ancestor) => !ancestor.parentId) || null;
  while (currentAncestor) {
    ancestorNames.push(currentAncestor.name);
    currentAncestor = task.ancestors.find(
      (ancestor) => ancestor.parentId === currentAncestor.uniqueId
    );
  }
  ancestorNames.push(task.name);
  const fullyQualifiedName = ancestorNames.join(" / ");
  return fullyQualifiedName;
};

// Helper function to prepare flat data from tree-structured data
const prepareTasksQueue = (list, prevQueue = []) => {
  let queue = [...prevQueue];
  if (list && list.length > 0) {
    list.forEach((t) => {
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
const initialState = {
  selectedTaskUniqueId: null,
  data: [],
  flatData: [],
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
        state.flatData = prepareTasksQueue(action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default taskSlice.reducer;
// Export the reducer and actions
export const { setSelectedTaskUniqueId } = taskSlice.actions;

/* ============== Selectors ======================*/
const selectTasksState = (state) => state.tasks;

export const selectAllTreeTasks = createSelector(
  selectTasksState,
  (tasksState) => tasksState.data
);

export const selectAllFlatTasks = createSelector(
  selectTasksState,
  (tasksState) => tasksState.flatData
);

export const selectSelectedTaskUniqueId = createSelector(
  selectTasksState,
  (tasksState) => tasksState.selectedTaskUniqueId
);

export const selectNextTaskUniqueId = createSelector(
  [selectAllFlatTasks, selectSelectedTaskUniqueId],
  (flatTaskList, selectedTaskUId) => {
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
  (flatTaskList, selectedTaskUId) => {
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
