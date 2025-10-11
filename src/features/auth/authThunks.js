import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      if (res.data.ResponseCode === 200) {
        localStorage.setItem("token", res.data.Data.token);
        return res.data;
      } else {
        return rejectWithValue(res.data.ResponseMessage);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      if (res.data.ResponseCode === 200) {
        localStorage.setItem("token", res.data.Data.token);
        return res.data;
      } else {
        return rejectWithValue(res.data.ResponseMessage);
      }
    } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ ResponseMessage: error.message });
    }
  }
);
