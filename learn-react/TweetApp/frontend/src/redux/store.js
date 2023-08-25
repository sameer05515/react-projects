// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice1";
import taskReducer from './taskSlice';
import tagsReducer from './tagsSlice';
import topicReducer from './topicSlice';
import comparableDataReducer from "./comparableDataSlice";
import wordReducer from './wordsSlice';
import myResumeReducer from './myResumeSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
    tasks: taskReducer,
    tags: tagsReducer,
    topics: topicReducer,
    comparableData: comparableDataReducer,
    words: wordReducer,
    myResume: myResumeReducer
  },
});

export default store;
