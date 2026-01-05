import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Fetch incoming friend requests
export const fetchIncomingRequestsThunk = createAsyncThunk(
  "friends/fetchIncomingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/friends/requests");
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to fetch incoming requests"
      );
    }
  }
);

// Fetch outgoing friend requests
export const fetchOutgoingRequestsThunk = createAsyncThunk(
  "friends/fetchOutgoingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/friends/sent");
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to fetch outgoing requests"
      );
    }
  }
);

// Fetch all friends
export const fetchAllFriendsThunk = createAsyncThunk(
  "friends/fetchAllFriends",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/friends");
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to fetch friends"
      );
    }
  }
);

