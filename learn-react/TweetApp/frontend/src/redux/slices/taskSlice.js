// slices/taskSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/globalConstants";



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

// Helper function to prepare flat data from tree-structured data
const prepareTasksQueue = (list, prevQueue = []) => {
  let queue = [...prevQueue];
  if (list && list.length > 0) {
    list.forEach(t => {
      queue = [...queue, { uniqueId: t.uniqueId, title: t.title, children: t.children, _id: t._id }];
      const childQ = prepareTasksQueue(t.children, []);
      queue = [...queue, ...childQ];
    });
  }
  return queue;
};

// Define an initial state for tasks
const initialState = {
  selectedTaskUniqueId: null,
  // selectedTaskTraversal: {
  //   nextTaskUniqueId: null,
  //   prevTaskUniqueId: null,
  // },
  data: [],
  flatData:[],
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

// Export the async thunk for fetching tasks
// export { fetchTasks };

// Export the reducer
export default taskSlice.reducer;
// Export the reducer and actions
export const { setSelectedTaskUniqueId } = taskSlice.actions;
