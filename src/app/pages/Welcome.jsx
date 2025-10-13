import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { AiOutlineLogout } from "react-icons/ai";

export default function Welcome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br absolute inset-0 bg-gradient-animation from-indigo-100 via-pink-200 to-purple-500">
      {/* Logout Button in top right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
      >
        <AiOutlineLogout size={22} />
      </button>

      <div className="relative z-10 w-full max-h-full max-w-md mx-4 text-center">
        <h1 className="text-4xl font-semibold text-indigo-700">Welcome!</h1>
      </div>
    </div>
  );
}
