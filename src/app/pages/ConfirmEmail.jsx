import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";
import { IoArrowBackSharp, IoMailOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Email passed from register page
  const email = location.state?.email || "your-email@example.com";

  // Formik initial values and validation
  const initialValues = { code: "" };

  const validationSchema = Yup.object({
    code: Yup.string()
      .required("Confirmation code is required")
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit code"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Example API call
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: values.code }),
      });

      const data = await res.json();

      if (data.ResponseCode === 200) {
        navigate("/login");
      } else {
        alert(data.ResponseMessage || "Invalid confirmation code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative items-center space-y-4 py-6 w-full">
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
        <span className="font-medium text-gray-700">{email}</span>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="w-full space-y-3 mt-2">
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

            {/* Optional “resend code” feature */}
            {/* <Button type="text" block onClick={() => alert("Resend code logic here")}>
              I didn’t get the code
            </Button> */}

            <Button type="link" block onClick={() => navigate("/login")}>
              I already have an account
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
