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
        // localStorage.setItem("token", res.data.Data.token);
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

export const confirmEmail = createAsyncThunk(
  "auth/confirmEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/confirm", { email, otp });

      if (res.data.ResponseCode === 200) {
        localStorage.setItem("token", res.data.Data.token);
        return res.data;
      } else {
        return rejectWithValue(res.data.ResponseMessage);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.ResponseMessage);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Initiate Forgot Password
export const initiateForgotPasswordThunk = createAsyncThunk(
  "auth/initiateForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/initiate-forgot-password", {
        loginName: email,
      });
      if (res.data.ResponseCode === 200) {
        return res.data;
      } else {
        return rejectWithValue(res.data.ResponseMessage);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Change Password
export const changePasswordThunk = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/change-password", payload);
      if (res.data.ResponseCode === 200) {
        return res.data;
      } else {
        return rejectWithValue(res.data.ResponseMessage);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);