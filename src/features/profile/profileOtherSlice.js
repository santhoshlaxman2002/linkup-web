import { createSlice } from "@reduxjs/toolkit";
import { getOtherUserProfileThunk } from "./profileThunks";
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const profileOtherSlice = createSlice({
  name: "profileOther",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOtherUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOtherUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getOtherUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load profile";
      });
  },
});

export default profileOtherSlice.reducer;
