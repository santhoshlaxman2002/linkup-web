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
