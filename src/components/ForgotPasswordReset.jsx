import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Alert } from "antd";
import { IoLockClosedOutline, IoMailOutline, IoArrowBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { changePasswordThunk } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPasswordReset() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state?.email || "";
  const { loading, error } = useSelector((state) => state.auth);


  const initialValues = { otp: "", newPassword: "" };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      loginName: email,
      otp: values.otp,
      newPassword: values.newPassword,
    };

    const result = await dispatch(changePasswordThunk(payload));

    if (result.meta.requestStatus === "fulfilled") {
      localStorage.removeItem("resetSession");
      navigate("/login", { replace: true, state: { passwordChanged: true } });
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    const maskedUser =
      user.length > 2
        ? user[0] + "*".repeat(user.length - 2) + user[user.length - 1]
        : user[0] + "*";
    return `${maskedUser}@${domain}`;
  };

  return (
    <div className="flex flex-col relative items-center space-y-4 py-6 w-full">
      <div className="flex absolute -top-28 left-0 items-center justify-start mb-2">
        <button
          onClick={() => navigate("/forgot-password")}
          className="flex items-center text-gray-800 hover:text-gray-500 transition cursor-pointer"
        >
          <IoArrowBackSharp size={22} className="mr-1" />
          <span className="text-md font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">Reset your password</h2>
      <p className="text-gray-500 text-center">
        Enter the OTP we sent to <span className="font-medium">{maskEmail(email)}</span>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="w-full space-y-3 mt-2">
            {error && (
              <div className="mb-4">
                <Alert message={error} type="error" showIcon />
              </div>
            )}
            <Input
              name="otp"
              placeholder="6-digit OTP"
              value={values.otp}
              onChange={handleChange}
              size="large"
              prefix={<IoMailOutline size={20} />}
            />
            <div className="text-left mt-1 pl-1">
              <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
            </div>

            <Input.Password
              name="newPassword"
              placeholder="New password"
              value={values.newPassword}
              onChange={handleChange}
              size="large"
              prefix={<IoLockClosedOutline size={20} />}
            />
            <div className="text-left mt-1 pl-1">
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="h-11 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md"
            >
              Change Password
            </Button>

            <Button type="link" block onClick={() => navigate("/login")}>
              Back to login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
