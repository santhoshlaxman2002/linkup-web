import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { fetchUserProfile } from "../../api/profileHelper";

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

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
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

export const getUserProfileThunk = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchUserProfile();
      if (res.ResponseCode !== 200) {
        return rejectWithValue(res.ResponseMessage);
      }
      return res.Data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.ResponseMessage || "Failed to fetch profile");
    }
  }
);
