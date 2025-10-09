import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Checkbox, ConfigProvider } from "antd";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { useGradientButtonStyle } from "../styles/gradientButton";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { styles } = useGradientButtonStyle();

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful (demo)");
    }, 1500);
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
            <div>
              <Input
                name="email"
                type="email"
                placeholder="User name or email"
                prefix={<IoMailOutline size={22} className="mr-1"/>}
                value={values.email}
                onChange={handleChange}
                autoComplete="username"
                size="large"
              />
              <div className="text-left mt-1 pl-1">
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
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
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-400">
                Forgot password?
              </a>
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