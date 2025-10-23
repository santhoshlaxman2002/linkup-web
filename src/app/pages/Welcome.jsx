import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { getUserProfileThunk } from "../../features/auth/authThunks";
import { AiOutlineLogout } from "react-icons/ai";
import { message } from "antd";

export default function Welcome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await dispatch(getUserProfileThunk());      
      if (getUserProfileThunk.rejected.match(result)) {
        message.error(result.payload || "Failed to load user profile");
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br absolute inset-0 bg-gradient-animation from-indigo-100 via-pink-200 to-purple-500">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
      >
        <AiOutlineLogout size={22} />
      </button>

      <div className="relative z-10 w-full max-h-full max-w-md mx-4 text-center">
        {loading ? (
          <p className="text-indigo-700 text-lg">Loading...</p>
        ) : (
          <h1 className="text-4xl font-semibold text-indigo-700">
            Welcome! {user?.first_name || "User"}
          </h1>
        )}
      </div>
    </div>
  );
}
