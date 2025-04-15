import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import projectReducers from "../features/projects/projectSlice"
import contactReducer from "../features/contact/contactSlice"

const store = configureStore({
  reducer: {
    admin: adminReducer,
    projects: projectReducers,
    contact: contactReducer,

  },
});

export default store;