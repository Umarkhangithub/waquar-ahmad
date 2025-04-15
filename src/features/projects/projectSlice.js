import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
  projects: [],
  project: null,
  error: null,
  loading: false,
  message: null,
};

// Thunks
export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/projects`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/api/projects`, project, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add project.");
    }
  }
);

export const getSingleProject = createAsyncThunk(
  "projects/getSingleProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/projects/${projectId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch project.");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/api/projects/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update project.");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API}/api/projects/${projectId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete project.");
    }
  }
);

// Helper functions
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action, successMessage) => {
  state.loading = false;
  state.message = action.payload.message || successMessage;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Slice
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Projects
      .addCase(fetchAllProjects.pending, handlePending)
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        handleFulfilled(state, action, "Projects fetched successfully.");
      })
      .addCase(fetchAllProjects.rejected, handleRejected)

      // Add Project
      .addCase(addNewProject.pending, handlePending)
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.project);
        handleFulfilled(state, action, "Project added successfully.");
      })
      .addCase(addNewProject.rejected, handleRejected)

      // Get Single Project
      .addCase(getSingleProject.pending, handlePending)
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.project = action.payload.project;
        const index = state.projects.findIndex((p) => p._id === state.project._id);
        if (index !== -1) {
          state.projects[index] = state.project;
        } else {
          state.projects.push(state.project);
        }
        handleFulfilled(state, action, "Project fetched successfully.");
      })
      .addCase(getSingleProject.rejected, handleRejected)

      // Update Project
      .addCase(updateProject.pending, handlePending)
      .addCase(updateProject.fulfilled, (state, action) => {
        const updated = action.payload.project;
        const index = state.projects.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.projects[index] = updated;
        }
        handleFulfilled(state, action, "Project updated successfully.");
      })
      .addCase(updateProject.rejected, handleRejected)

      // Delete Project
      .addCase(deleteProject.pending, handlePending)
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload.projectId
        );
        handleFulfilled(state, action, "Project deleted successfully.");
      })
      .addCase(deleteProject.rejected, handleRejected);
  },
});

export default projectSlice.reducer;
