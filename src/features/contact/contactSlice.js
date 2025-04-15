// redux/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    payload.append("access_key", import.meta.env.VITE_REACT_APP_WEB3FORMS_KEY || "YOUR_API_KEY");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (data.success) return data;
      return rejectWithValue(data.message || "Submission failed");
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const initialState = {
  isLoading: false,
  successMessage: "",
  errorMessage: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "✅ Form submitted successfully!";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = `❌ ${action.payload}`;
      });
  },
});

export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;