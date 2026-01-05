import { createSlice } from "@reduxjs/toolkit";
import {
  fetchIncomingRequestsThunk,
  fetchOutgoingRequestsThunk,
  fetchAllFriendsThunk,
} from "./friendsThunks";

const initialState = {
  incomingRequests: [],
  outgoingRequests: [],
  allFriends: [],
  loading: {
    incoming: false,
    outgoing: false,
    allFriends: false,
  },
  error: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    removeIncomingRequest: (state, action) => {
      state.incomingRequests = state.incomingRequests.filter(
        (req) => req.id !== action.payload
      );
    },
    removeOutgoingRequest: (state, action) => {
      state.outgoingRequests = state.outgoingRequests.filter(
        (req) => req.id !== action.payload
      );
    },
    removeFriend: (state, action) => {
      state.allFriends = state.allFriends.filter(
        (friend) => friend.id !== action.payload
      );
    },
    clearFriends: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Incoming requests
      .addCase(fetchIncomingRequestsThunk.pending, (state) => {
        state.loading.incoming = true;
        state.error = null;
      })
      .addCase(fetchIncomingRequestsThunk.fulfilled, (state, action) => {
        state.loading.incoming = false;
        state.incomingRequests = action.payload;
      })
      .addCase(fetchIncomingRequestsThunk.rejected, (state, action) => {
        state.loading.incoming = false;
        state.error = action.payload;
      })
      // Outgoing requests
      .addCase(fetchOutgoingRequestsThunk.pending, (state) => {
        state.loading.outgoing = true;
        state.error = null;
      })
      .addCase(fetchOutgoingRequestsThunk.fulfilled, (state, action) => {
        state.loading.outgoing = false;
        state.outgoingRequests = action.payload;
      })
      .addCase(fetchOutgoingRequestsThunk.rejected, (state, action) => {
        state.loading.outgoing = false;
        state.error = action.payload;
      })
      // All friends
      .addCase(fetchAllFriendsThunk.pending, (state) => {
        state.loading.allFriends = true;
        state.error = null;
      })
      .addCase(fetchAllFriendsThunk.fulfilled, (state, action) => {
        state.loading.allFriends = false;
        state.allFriends = action.payload;
      })
      .addCase(fetchAllFriendsThunk.rejected, (state, action) => {
        state.loading.allFriends = false;
        state.error = action.payload;
      });
  },
});

export const { removeIncomingRequest, removeOutgoingRequest, removeFriend, clearFriends } =
  friendsSlice.actions;
export default friendsSlice.reducer;

