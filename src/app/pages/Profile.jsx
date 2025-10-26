// src/components/Profile/ProfileSection.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../features/profile/profileThunks";
import { Button, Avatar, Skeleton, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      const loadProfile = async () => {
        const result = await dispatch(getUserProfileThunk());
        if (getUserProfileThunk.rejected.match(result)) {
          message.error(result.payload || "Failed to load user profile");
        }
      };
      loadProfile();
    }
  }, [dispatch, user]);

  if (loading)
    return (
      <LayoutWrapper>
        <div className="p-6">
          <Skeleton active avatar title />
        </div>
      </LayoutWrapper>
    );

  if (error)
    return (
      <LayoutWrapper>
        <div className="text-red-500 p-6">{error}</div>
      </LayoutWrapper>
    );

  if (!user) return null;

  return (
    <LayoutWrapper>
      <div
        className="w-full text-gray-900 overflow-hidden relative rounded-2xl shadow-lg"
      >
        {/* ===== Banner Section ===== */}
        <div
          className="h-52 sm:h-64 md:h-72 bg-cover bg-center relative rounded-t-2xl"
          style={{
            backgroundImage: `url(${user.cover_image || "/images/default-banner-light.jpg"})`,
          }}
        >
          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30 rounded-t-2xl" />
        </div>

        {/* ===== Avatar Section ===== */}
        <div className="absolute top-36 sm:top-44 md:top-52 left-4 sm:left-8">
          <div className="rounded-full border-4 border-white shadow-md">
            <Avatar
              size={90}
              src={user.profile_image_url || "/images/default-avatar.png"}
              className="sm:!w-[100px] sm:!h-[100px]"
            />
          </div>
        </div>

        {/* ===== User Info Section ===== */}
        <div className="mt-10 sm:mt-14 md:mt-18 px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>

            <Button
              icon={<EditOutlined />}
              shape="round"
              className="!bg-white !border-gray-300 hover:!bg-blue-50 hover:!border-blue-400 hover:!text-blue-600 !text-gray-700 transition-all !text-sm sm:!text-base"
            >
              Edit Profile
            </Button>
          </div>

          {/* ===== Bio Section ===== */}
          {user.bio && (
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* ===== Joined Info ===== */}
          {user.created_at && (
            <p className="mt-4 text-gray-500 text-sm">
              🗓️ Joined{" "}
              {new Date(user.created_at)
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
                .toString()}
            </p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default ProfileSection;
