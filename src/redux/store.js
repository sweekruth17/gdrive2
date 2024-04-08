import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "./fileSystemSlice/fileSystemSlice";
export const store = configureStore({
  reducer: { fileSystem: fileSystemReducer },
});
