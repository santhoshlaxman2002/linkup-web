import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileThunk, updateProfileThunk } from "./profileThunks";

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = action.payload.ResponseMessage;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // store updated user
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      });
  },
});

export default profileSlice.reducer;
