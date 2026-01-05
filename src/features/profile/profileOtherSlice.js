import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUserProfileThunk,
  sendFriendRequestThunk,
  acceptFriendRequestThunk,
  rejectFriendRequestThunk,
  cancelFriendRequestThunk,
  unfriendThunk,
} from "./profileThunks";
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const profileOtherSlice = createSlice({
  name: "profileOther",
  initialState,
  reducers: {
    resetProfileOther: () => initialState,
  },
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
      })
      // Send friend request
      .addCase(sendFriendRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.friendship_status = "pending";
        }
      })
      .addCase(sendFriendRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send friend request";
      })
      // Accept friend request
      .addCase(acceptFriendRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.friendship_status = "accepted";
        }
      })
      .addCase(acceptFriendRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to accept friend request";
      })
      // Reject friend request
      .addCase(rejectFriendRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.friendship_status = null;
        }
      })
      .addCase(rejectFriendRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reject friend request";
      })
      // Cancel friend request
      .addCase(cancelFriendRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.friendship_status = null;
        }
      })
      .addCase(cancelFriendRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to cancel friend request";
      })
      // Unfriend
      .addCase(unfriendThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfriendThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.friendship_status = null;
        }
      })
      .addCase(unfriendThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to unfriend";
      });
  },
});

export const { resetProfileOther } = profileOtherSlice.actions;
export default profileOtherSlice.reducer;
