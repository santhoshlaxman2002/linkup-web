// src/pages/UserProfileView.jsx
import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Avatar, Button, message } from "antd";
import { getOtherUserProfileThunk } from "../../features/profile/profileThunks";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

const UserProfileView = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.profileOther);

    useEffect(() => {
        dispatch(getOtherUserProfileThunk(userId))
            .unwrap()
            .catch((err) => {
                message.error(err || "Failed to load user profile");
            });
    }, [dispatch, userId]);

    if (loading) {
        return (
            <LayoutWrapper>
                <div className="p-6">
                    <Skeleton active avatar title />
                </div>
            </LayoutWrapper>
        );
    }
    if (error) {
        return (
            <LayoutWrapper>
                <div className="text-red-500 p-6">{error}</div>
            </LayoutWrapper>
        );
    }
    if (!user) return null;

    // Determine friendship action label
    let actionLabel = "Request";
    if (user.friendship_status === "friends") actionLabel = "Friends";
    else if (user.friendship_status === "pending") actionLabel = "Pending";

    return (
        <LayoutWrapper>
            <div className="w-full text-gray-900 overflow-hidden relative rounded-2xl shadow-lg">
                {/* Banner */}
                <div
                    className="h-52 sm:h-64 md:h-72 bg-cover bg-center relative rounded-t-2xl"
                    style={{ backgroundImage: `url(${user.cover_image || "/images/default-banner-light.jpg"})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30 rounded-t-2xl" />
                </div>

                {/* Avatar */}
                <div className="absolute top-36 sm:top-44 md:top-52 left-4 sm:left-8">
                    <div className="rounded-full border-4 border-white shadow-md">
                        <Avatar
                            size={90}
                            src={user.profile_image_url || "/images/default-avatar.png"}
                            className="sm:!w-[100px] sm:!h-[100px]"
                        />
                    </div>
                </div>

                {/* Info section */}
                <div className="mt-10 sm:mt-14 md:mt-18 px-4 sm:px-6 pb-6">
                    {/* Name / username + buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p className="text-gray-500 text-sm">@{user.username}</p>

                            {/* Friends & Mutual counts */}
                            <div className="mt-1 text-gray-700 text-sm">
                                <span className="font-semibold">{user.total_friends_count}</span> friends
                                {Number(user.mutual_friends_count) > 0 && (
                                    <> • <span className="font-semibold">{user.mutual_friends_count}</span> mutual</>
                                )}
                            </div>
                        </div>

                        {/* Buttons row */}
                        <div className="flex gap-2">
                            <Button type="primary" shape="round">
                                {actionLabel}
                            </Button>
                            <Button type="default" shape="round" onClick={() => {/* message logic */ }}>
                                Message
                            </Button>
                        </div>
                    </div>
                    {user.mutual_friends && user.mutual_friends.length > 0 && (
                        <div className="mt-4 flex items-center">
                            <h3 className="text-gray-700 text-sm font-semibold mr-3 mb-0">
                                Mutual Friends:
                            </h3>
                            <div className="flex items-center -space-x-3">
                                {user.mutual_friends.slice(0, 5).map((mf) => (
                                    <Avatar
                                        key={mf.id}
                                        src={mf.profile_image_url}
                                        size={32}
                                        className="cursor-pointer border-2 border-white hover:ring-2 hover:ring-sky-300 relative"
                                        onClick={() => navigate(`/users/${mf.id}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
    
                    {/* Bio */}
                    {user.bio && (
                        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                            {user.bio}
                        </p>
                    )}

                    {/* Joined date */}
                    {user.created_at && (
                        <p className="mt-3 text-gray-500 text-sm">
                            🗓️ Joined{" "}
                            {new Date(user.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                            })}
                        </p>
                    )}
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default UserProfileView;
