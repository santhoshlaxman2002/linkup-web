import * as Yup from "yup";

export const confirmEmailSchema = Yup.object({
  code: Yup.string()
    .required("Confirmation code is required")
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit code"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = Yup.object({
  loginName: Yup.string()
    .test("is-valid-login", "Enter a valid email or username", (value) => {
      if (!value) return false;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9._-]+$/.test(value);
      return isEmail || isUsername;
    })
    .required("User name or email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  username: Yup.string().min(2, "At least 2 characters").required("User name is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});
