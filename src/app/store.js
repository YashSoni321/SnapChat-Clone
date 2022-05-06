import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import cameraReducer from "../features/cameraSlice";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    camera: cameraReducer,
  },
});

export default store;
