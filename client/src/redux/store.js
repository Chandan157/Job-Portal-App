import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alertSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
  },
});
