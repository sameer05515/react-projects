import {
  createAsyncThunk, createSlice
} from "@reduxjs/toolkit";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";

// Define an async thunk to fetch all Category
export const fetchCategoryTree = createAsyncThunk(
  "categories/fetchCategoryTree",
  async () => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/categories`
    ); // Replace with your API endpoint
    return response.json();
  }
);

// Define an async thunk to create a new Category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to update a topic by uniqueId
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (categoryData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/categories/${categoryData.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to create a new Question
export const createQuestion = createAsyncThunk(
  "categories/createQuestion",
  async (questionData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      }
    );
    return response.json();
  }
);

export const searchTopic = createAsyncThunk(
  "topics/searchTopic",
  async (topicData) => {
    const response = await fetch(`${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicData),
    });
    return response.json();
  }
);

// Define an async thunk to fetch all Category
export const fetchAllQuestions = createAsyncThunk(
  "categories/fetchAllQuestions",
  async () => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions`
    ); // Replace with your API endpoint
    return response.json();
  }
);

// Define an async thunk to update a Question by uniqueId
export const updateQuestion = createAsyncThunk(
  "categories/updateQuestion",
  async (categoryData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions/${categoryData.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to create a new Answer
export const createAnswer = createAsyncThunk(
  "categories/createAnswer",
  async (answerData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
      }
    );
    return response.json();
  }
);

// Define an async thunk to update a Answer by uniqueId
export const updateAnswer = createAsyncThunk(
  "categories/updateAnswer",
  async (answerData) => {
    const response = await fetch(
      `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/answers/${answerData.uniqueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
      }
    );
    return response.json();
  }
);

const interviewMgmtSlice = createSlice({
  name: "interviewMgmt",
  initialState: {
    data: [],
    refetchCategoryTree: false,
    fetchCategoryTreeResponse: {
      loading: "idle",
      error: null,
    },
    createCategoryResponse: {
      loading: "idle",
      error: null,
    },
    updateCategoryResponse: {
      loading: "idle",
      error: null,
    },
    selectedTreeNodeUID: null,
    selectedCategoryUID: null,
    selectedQuestionUID: null,    
    searchedData:[],
    searchString:'',
  },
  reducers: {
    setSelectedTreeNodeUID: (state, action) => {
      state.selectedTreeNodeUID = action.payload;
    },
    setSelectedCategoryUID: (state, action) => {
      state.selectedCategoryUID = action.payload;
    },
    setSelectedQuestionUID: (state, action) => {
      state.selectedQuestionUID = action.payload;
    },
    setSearchString:(state, action)=>{
      state.searchString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestions.pending, (state) => {
        state.fetchCategoryTreeResponse.loading = "pending";
        state.fetchCategoryTreeResponse.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.fetchCategoryTreeResponse.loading = "fulfilled";
        state.data = action.payload;
        state.refetchCategoryTree = false;
        state.fetchCategoryTreeResponse.error = null;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.fetchCategoryTreeResponse.loading = "rejected";
        state.fetchCategoryTreeResponse.error = action.error.message;
      })

      .addCase(createCategory.pending, (state) => {
        state.createCategoryResponse.loading = "pending";
        state.createCategoryResponse.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createCategoryResponse.loading = "fulfilled";
        state.refetchCategoryTree = true;
        state.createCategoryResponse.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.fetchCategoryTreeResponse.loading = "rejected";
        state.createCategoryResponse.error = action.error.message;
      })

      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryResponse.loading = "pending";
        state.updateCategoryResponse.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateCategoryResponse.loading = "fulfilled";
        state.refetchCategoryTree = true;
        state.updateCategoryResponse.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.fetchCategoryTreeResponse.loading = "rejected";
        state.updateCategoryResponse.error = action.error.message;
      })
      .addCase(searchTopic.fulfilled, (state, action) => {
        //state.loading = "fulfilled";
        state.searchedData = action.payload;
      });
  },
});

export default interviewMgmtSlice.reducer;

export const {
  setSelectedTreeNodeUID,
  setSelectedCategoryUID,
  setSelectedQuestionUID,
  setSearchString
} = interviewMgmtSlice.actions;
