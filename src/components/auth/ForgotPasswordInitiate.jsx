import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Alert } from "antd";
import { IoArrowBackSharp, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initiateForgotPasswordThunk } from "../../features/auth/authThunks";
import { forgotPasswordSchema } from "../../validations/authValidation";
import { clearMessages } from "../../features/auth/authSlice";

export default function ForgotPasswordInitiate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = { email: "" };

  const handleSubmit = async (values) => {
    const result = await dispatch(initiateForgotPasswordThunk(values.email));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/reset-password", { state: { email: values.email } });
    }
  };


  return (
    <div className="flex flex-col relative items-center space-y-4 py-6 w-full">
      <div className="flex absolute -top-28 left-0 items-center justify-start mb-2">
        <button
          onClick={() => {
            dispatch(clearMessages());
            navigate("/login");
          }}
          className="flex items-center text-gray-800 hover:text-gray-500 transition cursor-pointer"
        >
          <IoArrowBackSharp size={22} className="mr-1" />
          <span className="text-md font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">Trouble logging in?</h2>
      <p className="text-gray-500 text-center">
        Enter your email address and we’ll send you an OTP to reset your password.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="w-full space-y-3 mt-2">
            {error && (
              <div className="mb-4">
                <Alert message={error} type="error" showIcon />
              </div>
            )}
            <div>
              <Input
                name="email"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
                size="large"
                prefix={<IoMailOutline size={20} />}
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="h-11 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md"
            >
              Send OTP
            </Button>

            <Button
              type="link"
              block
              onClick={() => {
                dispatch(clearMessages());
                navigate("/register");
              }}
            >
              Or create a new account
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
