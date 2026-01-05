import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../api/profileHelper";
import axiosInstance from "../../utils/axiosInstance";

export const getUserProfileThunk = createAsyncThunk(
  "profile/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchUserProfile();
      console.log("res", res);
      if (res.ResponseCode !== 200) {
        return rejectWithValue(res.ResponseMessage);
      }
      console.log(res.Data);
      return res.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to fetch profile"
      );
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/profiles", profileData);
      const data = res.data;

      if (data.ResponseCode !== 200) {
        return rejectWithValue(data.ResponseMessage);
      }

      return data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Something went wrong"
      );
    }
  }
);

export const getOtherUserProfileThunk = createAsyncThunk(
  "profile/getOtherUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/profiles/${userId}`, {
        params: {
          component: "search"
        }
      });
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to fetch user profile"
      );
    }
  }
);

// Send friend request
export const sendFriendRequestThunk = createAsyncThunk(
  "profile/sendFriendRequest",
  async (receiverId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/friends/request", {
        receiverId: receiverId,
      });
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to send friend request"
      );
    }
  }
);

// Accept friend request
export const acceptFriendRequestThunk = createAsyncThunk(
  "profile/acceptFriendRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/friends/accept/${requestId}`);
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to accept friend request"
      );
    }
  }
);

// Reject friend request
export const rejectFriendRequestThunk = createAsyncThunk(
  "profile/rejectFriendRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/friends/reject/${requestId}`);
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to reject friend request"
      );
    }
  }
);

// Cancel friend request (by sender)
export const cancelFriendRequestThunk = createAsyncThunk(
  "profile/cancelFriendRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/friends/cancel/${requestId}`);
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to cancel friend request"
      );
    }
  }
);

// Unfriend (delete friendship)
export const unfriendThunk = createAsyncThunk(
  "profile/unfriend",
  async (friendshipId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/friends/${friendshipId}`);
      if (res.data.ResponseCode !== 200) {
        return rejectWithValue(res.data.ResponseMessage);
      }
      return res.data.Data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.ResponseMessage || "Failed to unfriend"
      );
    }
  }
);  