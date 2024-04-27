import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/AlertSlice";
import authReducer from "./features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
  },
});
