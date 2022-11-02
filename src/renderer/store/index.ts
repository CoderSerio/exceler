import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducers/testReducer";
import fileDataReducer from "./reducers/fileDataReducer";
import activeFileReducer from "./reducers/activeFileReducer";

const store = configureStore({
  reducer: {
    test: testReducer,
    fileData: fileDataReducer,
    activeFile: activeFileReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
