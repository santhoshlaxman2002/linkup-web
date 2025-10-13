import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, DatePicker, ConfigProvider, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { useGradientButtonStyle } from "../../styles/gradientButton";
import { GoogleOutlined, GithubOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { generateUsername } from "../../api/auth";
import { UsernameField } from "../common/UsernameField";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: null,
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  username: Yup.string().min(2, "At least 2 characters").required("User name is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

export function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const { styles } = useGradientButtonStyle();

  const [usernameGenerated, setUsernameGenerated] = useState(false);
  const [isUsernameLocked, setIsUsernameLocked] = useState(false);
  
  const handleSubmit = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      username: values.username,
      password: values.password,
    };
    const result = await dispatch(registerUser(payload));
    if (result.meta.requestStatus === "fulfilled") {
      const email = result.payload?.Data?.email;
      navigate("/confirm-email", { state: { email } });
    }
  };

  const handleGenerateUsername = async (values, setFieldValue) => {
    const { firstName, lastName } = values;

    if (firstName && lastName && !isUsernameLocked) {
      try {
        setUsernameGenerated(false);
        const res = await generateUsername(firstName, lastName);
        if (res.ResponseCode === 200) {
          setFieldValue("username", res.Data.username);
          setUsernameGenerated(true);
        }
      } catch (err) {
        console.error("Error generating username:", err);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="mb-4">
              <Alert message={error} type="error" showIcon />
            </div>
          )}

          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Input
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={() => handleGenerateUsername(values, setFieldValue)}
                size="large"
                className="w-full"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            
            <div className="flex-1">
              <Input
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={() => handleGenerateUsername(values, setFieldValue)}
                size="large"
                className="w-full"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
          </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                prefix={<IoMailOutline size={22} className="mr-1"/>}
                value={values.email}
                onChange={handleChange}
                size="large"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <DatePicker
                name="dateOfBirth"
                placeholder="Date of Birth"
                style={{ width: '100%' }}
                size="large"
                value={values.dateOfBirth}
                onChange={date => setFieldValue("dateOfBirth", date)}
                format="YYYY-MM-DD"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <UsernameField
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              isUsernameLocked={isUsernameLocked}
              setIsUsernameLocked={setIsUsernameLocked}
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1 pl-1"
            />
            <div>
              <Input.Password
                name="password"
                placeholder="Password"
                prefix={<RiLockPasswordLine size={20} className="mr-1"/>}
                value={values.password}
                onChange={handleChange}
                autoComplete="current-password"
                size="large"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <Input.Password
                name="confirmPassword"
                placeholder="Confirm Password"
                prefix={<RiLockPasswordLine size={20} className="mr-1" />}
                value={values.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                size="large"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <ConfigProvider button={{ className: styles.gradientButton }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="h-11 text-white rounded-lg shadow-md"
              >
                Register
              </Button>
            </ConfigProvider>
          </Form>
        )}
      </Formik>
      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      {/* Social login buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button icon={<GoogleOutlined />} block>
          Google
        </Button>
        <Button icon={<GithubOutlined />} block>
          GitHub
        </Button>
      </div>
      <div className="flex justify-center items-center text-center text-sm text-gray-600 pt-1.5 pb-2.5">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-400 ml-1 cursor-pointer">Sign in</Link>
      </div>
    </>
  );
}