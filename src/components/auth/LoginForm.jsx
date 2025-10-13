import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Checkbox, ConfigProvider, Alert, notification } from "antd";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { useGradientButtonStyle } from "../../styles/gradientButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  loginName: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  loginName: Yup.string()
  .test(
    "is-valid-login",
    "Enter a valid email or username",
    (value) => {
      if (!value) return false;
      // allow if email OR username (letters/numbers/._-)
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9._-]+$/.test(value);
      return isEmail || isUsername;
    }
  )
  .required("User name or email is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const { styles } = useGradientButtonStyle();
  const location = useLocation();
  const shownPasswordChanged = useRef(false);
  const shownError = useRef(false);

  useEffect(() => {
    const passwordChanged = !!location.state?.passwordChanged;
    if (passwordChanged && !shownPasswordChanged.current) {
      shownPasswordChanged.current = true;

      notification.success({
        message: "Password Changed Successfully",
        description: "You can now log in with your new password.",
        duration: 3,
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.passwordChanged, navigate, location.pathname]);

  useEffect(() => {
    if (error && !shownError.current) {
      shownError.current = true;
      notification.error({
        message: "Login Failed",
        description: error,
        duration: 3,
      });
    }
  }, [error]);


  const handleSubmit = async (values) => {
    const result = await dispatch(loginUser(values));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/welcome");
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

            {successMessage && (
              <div className="mb-4">
                <Alert message={successMessage} type="success" showIcon />
              </div>
            )}
            <div>
              <Input
                name="loginName"
                type="text"
                placeholder="User name or email"
                prefix={<IoMailOutline size={22} className="mr-1"/>}
                value={values.email}
                onChange={handleChange}
                autoComplete="username"
                size="large"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="loginName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <Input.Password
                name="password"
                placeholder="Enter your password"
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
            <div className="flex items-center justify-between">
              <Checkbox
                checked={values.rememberMe}
                onChange={e => setFieldValue("rememberMe", e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-400">
                Forgot password?
              </Link>
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
                Sign In
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
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-400 ml-1 cursor-pointer">Sign up</Link>
      </div>
    </>
  );
}