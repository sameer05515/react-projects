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
  async (categoryData: { uniqueId: string } & Record<string, any>) => {
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
// export const createQuestion = createAsyncThunk(
//   "categories/createQuestion",
//   async (questionData) => {
//     const response = await fetch(
//       `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(questionData),
//       }
//     );
//     return response.json();
//   }
// );

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
// export const updateQuestion = createAsyncThunk(
//   "categories/updateQuestion",
//   async (categoryData) => {
//     const response = await fetch(
//       `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions/${categoryData.uniqueId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(categoryData),
//       }
//     );
//     return response.json();
//   }
// );

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
  async (answerData: { uniqueId: string } & Record<string, any>) => {
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

type ApiSubState = {
  status: "idle" | "loading" | "succeeded" | "failed"; // ✅ Standardized: changed from loading to status
  error: string | null;
};

type InterviewMgmtState = {
  data: any[];
  refetchCategoryTree: boolean;
  fetchCategoryTreeResponse: ApiSubState;
  createCategoryResponse: ApiSubState;
  updateCategoryResponse: ApiSubState;
  selectedTreeNodeUID: string | null;
  selectedCategoryUID: string | null;
  selectedQuestionUID: string | null;
  searchedData: any[];
  searchString: string;
};

const interviewMgmtSlice = createSlice({
  name: "interviewMgmt",
  initialState: {
    data: [],
    refetchCategoryTree: false,
    fetchCategoryTreeResponse: {
      status: "idle", // ✅ Standardized: loading -> status
      error: null,
    },
    createCategoryResponse: {
      status: "idle", // ✅ Standardized: loading -> status
      error: null,
    },
    updateCategoryResponse: {
      status: "idle", // ✅ Standardized: loading -> status
      error: null,
    },
    selectedTreeNodeUID: null,
    selectedCategoryUID: null,
    selectedQuestionUID: null,    
    searchedData:[],
    searchString:'',
  } as InterviewMgmtState,
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
        state.fetchCategoryTreeResponse.status = "loading"; // ✅ Standardized: pending -> loading
        state.fetchCategoryTreeResponse.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.fetchCategoryTreeResponse.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.data = action.payload;
        state.refetchCategoryTree = false;
        state.fetchCategoryTreeResponse.error = null;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.fetchCategoryTreeResponse.status = "failed"; // ✅ Standardized: rejected -> failed
        state.fetchCategoryTreeResponse.error = action.error.message ?? null;
      })

      .addCase(createCategory.pending, (state) => {
        state.createCategoryResponse.status = "loading"; // ✅ Standardized: pending -> loading
        state.createCategoryResponse.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createCategoryResponse.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.refetchCategoryTree = true;
        state.createCategoryResponse.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createCategoryResponse.status = "failed"; // ✅ Standardized: rejected -> failed (also fixed bug: was using fetchCategoryTreeResponse)
        state.createCategoryResponse.error = action.error.message ?? null;
      })

      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryResponse.status = "loading"; // ✅ Standardized: pending -> loading
        state.updateCategoryResponse.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateCategoryResponse.status = "succeeded"; // ✅ Standardized: fulfilled -> succeeded
        state.refetchCategoryTree = true;
        state.updateCategoryResponse.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateCategoryResponse.status = "failed"; // ✅ Standardized: rejected -> failed (also fixed bug: was using fetchCategoryTreeResponse)
        state.updateCategoryResponse.error = action.error.message ?? null;
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
