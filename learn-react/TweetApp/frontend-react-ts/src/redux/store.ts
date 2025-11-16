// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice1";
import taskReducer from "./slices/taskSlice";
import tagsReducer from "./slices/tagsSlice";
import topicReducer from "./slices/topicSlice";
import comparableDataReducer from "./slices/comparableDataSlice";
import wordReducer from "./slices/wordsSlice";
import myResumeReducer from "./slices/myResumeSlice";
import linksReducer from "./slices/linksSlice";
import pinnedItemReducer from "./slices/pinnedItemSlice";
import interviewMgmtReducer from "./slices/interviewMgmtSlice";
import memoryMapReducer from "./slices/memoryMapSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import backdropReducer from "./slices/backdropSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    tasks: taskReducer,
    tags: tagsReducer,
    topics: topicReducer,
    comparableData: comparableDataReducer,
    words: wordReducer,
    myResume: myResumeReducer,
    links: linksReducer,
    pinnedItems: pinnedItemReducer,
    interviewMgmt: interviewMgmtReducer,
    memoryMaps: memoryMapReducer,
    breadcrumbItems: breadcrumbReducer,
    backdrop: backdropReducer,
  },
});

export default store;
