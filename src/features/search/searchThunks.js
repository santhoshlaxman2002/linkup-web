import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const searchUsersThunk = createAsyncThunk(
  "search/searchUsers",
  async ({ query, limit = 20, offset = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/search", {
        params: { q: query, limit, offset },
      });

      if (data.ResponseCode !== 200)
        throw new Error(data.ResponseMessage || "Failed to fetch users");

      return {
        users: data.Data,
        offset,
        hasMore: data.Data.length === limit, // smart pagination flag
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// src/redux/thunks/searchThunks.js
export const fetchRecentSearchesThunk = createAsyncThunk(
  "search/fetchRecentSearches",
  async ({ limit = 20, offset = 0 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/recent-searches", {
        params: { limit, offset },
      });
      if (data.ResponseCode !== 200) {
        throw new Error(data.ResponseMessage);
      }
      return {
        recentSearches: data.Data,
        offset,
        hasMore: data.Data.length === limit,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearRecentSearchThunk = createAsyncThunk(
  "search/clearRecentSearch",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/users/recent-searches/${userId}`);
      if (data.ResponseCode !== 200) {
        throw new Error(data.ResponseMessage);
      }
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearAllRecentSearchesThunk = createAsyncThunk(
  "search/clearAllRecentSearches",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete("/users/recent-searches");
      if (data.ResponseCode !== 200) {
        throw new Error(data.ResponseMessage);
      }
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

