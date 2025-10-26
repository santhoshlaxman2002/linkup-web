import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  confirmEmail,
  initiateForgotPasswordThunk,
  changePasswordThunk,
} from "./authThunks";

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.Data;
        state.successMessage = action.payload.ResponseMessage;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.ResponseMessage;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        const payload = action.payload;

        if (payload?.Error) {
          const firstErrorMessage = Object.values(payload.Error)[0];
          state.error = firstErrorMessage;
        } else if (typeof payload === "string") {
          state.error = payload;
        } else if (payload?.ResponseMessage) {
          state.error = payload.ResponseMessage;
        } else {
          state.error = "Registration failed. Please try again.";
        }
      })

      // confirmEmail
      .addCase(confirmEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmEmail.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Email confirmed successfully";
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid confirmation code";
      })

      // Forgot Password Initiate
      .addCase(initiateForgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateForgotPasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initiateForgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send OTP.";
      })

      // Change Password
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Password changed successfully";
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password.";
      })
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
