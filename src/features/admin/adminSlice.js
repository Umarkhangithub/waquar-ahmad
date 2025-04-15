import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState= {
  admins: [],
  loading: false,
  error: null,
  isLoggedIn: localStorage.getItem("isAdmin") === "true", // 🔥 read from localStorage
}

// Fetch admin users from backend
export const fetchAdmins = createAsyncThunk("admin/fetchAdmins", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/register`
    );
    const users = Array.isArray(response.data) ? response.data : response.data.users || [];
    return users;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch admins");
  }
});

// Login Admin
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const userList = state.admin.admins;

    const matchedUser = userList.find(
      (user) =>
        user.name === formData.username &&
        user.email === formData.email &&
        user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("isAdmin", "true");
      return { isLoggedIn: true };
    } else {
      return rejectWithValue("Invalid credentials");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isAdmin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
