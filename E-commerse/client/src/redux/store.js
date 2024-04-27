import { configureStore } from "@reduxjs/toolkit";
import formToggleSlice from "./slices/formToggleSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    formToggleSlice,
    authSlice,
  },
});
