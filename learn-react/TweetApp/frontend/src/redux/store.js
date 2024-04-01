// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice1";
import taskReducer from './slices/taskSlice';
import tagsReducer from './slices/tagsSlice';
import topicReducer from './slices/topicSlice';
import comparableDataReducer from "./slices/comparableDataSlice";
import wordReducer from './slices/wordsSlice';
import myResumeReducer from './slices/myResumeSlice';
import linksReducer from './slices/linksSlice';
import pinnedItemReducer from './slices/pinnedItemSlice';

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
    pinnedItems: pinnedItemReducer
  },
});

export default store;
