import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Alert } from "antd";
import { IoMailOutline, IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmEmail } from "../../features/auth/authThunks";
import { maskEmail } from "../../utils/helpers";
import { confirmEmailSchema } from "../../validations/authValidation";
import ProfileSetupModal from "../profile/ProfileSetupModal";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const email = location.state?.email || "your-email@example.com";
  const initialValues = { code: "" };
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const handleSubmit = async (values) => {
    const result = await dispatch(confirmEmail({ email, otp: values.code }));
    if (result.meta.requestStatus === "fulfilled") {
      setShowProfileSetup(true);
    }
  };

  return (
    <div className="flex flex-col relative items-center space-y-4 py-6 w-full">
      {/* Back button */}
      <div className="flex absolute -top-28 left-0 items-center justify-start mb-2">
        <button
          onClick={() => navigate("/register")}
          className="flex items-center text-gray-800 hover:text-gray-500 transition cursor-pointer"
        >
          <IoArrowBackSharp size={22} className="mr-1" />
          <span className="text-md font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">Enter the confirmation code</h2>
      <p className="text-gray-500 text-center">
        To confirm your account, enter the 6-digit code we sent to{" "}
        <span className="font-medium text-gray-700">{maskEmail(email)}</span>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={confirmEmailSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="w-full space-y-3 mt-2">
            {error && (
              <div className="mb-3" >
                <Alert message={error} type="error" showIcon />
              </div>
            )}

            <div>
              <Input
                name="code"
                placeholder="Confirmation code"
                value={values.code}
                onChange={handleChange}
                size="large"
                prefix={<IoMailOutline size={20} className="mr-1" />}
                className="text-center tracking-widest text-lg"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />
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
              Continue
            </Button>

            <Button type="link" block onClick={() => navigate("/login")}>
              I already have an account
            </Button>
          </Form>
        )}
      </Formik>
      {showProfileSetup && (
        <ProfileSetupModal
          open={showProfileSetup}
          onClose={() => navigate("/home")}
          onSave={() => navigate("/home")}
        />
      )}
    </div>
  );
}
