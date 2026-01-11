// src/pages/UserProfileView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Avatar, Button, message, Dropdown, Image } from "antd";
import {
    UserAddOutlined,
    UserDeleteOutlined,
    CloseOutlined,
    DownOutlined,
    MessageOutlined,
    StarOutlined,
    EditOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    getOtherUserProfileThunk,
    sendFriendRequestThunk,
    acceptFriendRequestThunk,
    rejectFriendRequestThunk,
    cancelFriendRequestThunk,
    unfriendThunk,
} from "../../features/profile/profileThunks";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

const UserProfileView = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.profileOther);

    // Individual button loading states
    const [sendingRequest, setSendingRequest] = useState(false);
    const [acceptingRequest, setAcceptingRequest] = useState(false);
    const [rejectingRequest, setRejectingRequest] = useState(false);
    const [cancelingRequest, setCancelingRequest] = useState(false);
    const [unfriending, setUnfriending] = useState(false);

    useEffect(() => {
        dispatch(getOtherUserProfileThunk(userId))
            .unwrap()
            .catch((err) => {
                message.error(err || "Failed to load user profile");
            });
    }, [dispatch, userId]);

    const handleSendFriendRequest = async () => {
        setSendingRequest(true);
        try {
            const result = await dispatch(sendFriendRequestThunk(userId));
            if (sendFriendRequestThunk.fulfilled.match(result)) {
                message.success("Friend request sent successfully");
                // Refresh profile to get updated status
                dispatch(getOtherUserProfileThunk(userId));
            } else {
                message.error(result.payload || "Failed to send friend request");
            }
        } catch (err) {
            message.error("Failed to send friend request");
        } finally {
            setSendingRequest(false);
        }
    };

    const handleAcceptRequest = async () => {
        // Try different possible field names for request ID
        const requestId = user?.friendship_id || user?.request_id || user?.friendship?.id;
        if (!requestId) {
            message.error("Request ID not found");
            return;
        }
        setAcceptingRequest(true);
        try {
            const result = await dispatch(acceptFriendRequestThunk(requestId));
            if (acceptFriendRequestThunk.fulfilled.match(result)) {
                message.success("Friend request accepted");
                // Refresh profile to get updated status
                dispatch(getOtherUserProfileThunk(userId));
            } else {
                message.error(result.payload || "Failed to accept friend request");
            }
        } catch (err) {
            message.error("Failed to accept friend request");
        } finally {
            setAcceptingRequest(false);
        }
    };

    const handleRejectRequest = async () => {
        // Try different possible field names for request ID
        const requestId = user?.friendship_id || user?.request_id || user?.friendship?.id;
        if (!requestId) {
            message.error("Request ID not found");
            return;
        }
        setRejectingRequest(true);
        try {
            const result = await dispatch(rejectFriendRequestThunk(requestId));
            if (rejectFriendRequestThunk.fulfilled.match(result)) {
                message.success("Friend request rejected");
                // Refresh profile to get updated status
                dispatch(getOtherUserProfileThunk(userId));
            } else {
                message.error(result.payload || "Failed to reject friend request");
            }
        } catch (err) {
            message.error("Failed to reject friend request");
        } finally {
            setRejectingRequest(false);
        }
    };

    const handleCancelRequest = async () => {
        // Try different possible field names for request ID
        const requestId = user?.friendship_id || user?.request_id || user?.friendship?.id;
        if (!requestId) {
            message.error("Request ID not found");
            return;
        }
        setCancelingRequest(true);
        try {
            const result = await dispatch(cancelFriendRequestThunk(requestId));
            if (cancelFriendRequestThunk.fulfilled.match(result)) {
                message.success("Friend request cancelled");
                // Refresh profile to get updated status
                dispatch(getOtherUserProfileThunk(userId));
            } else {
                message.error(result.payload || "Failed to cancel friend request");
            }
        } catch (err) {
            message.error("Failed to cancel friend request");
        } finally {
            setCancelingRequest(false);
        }
    };

    const handleUnfriend = async () => {
        // Try different possible field names for friendship ID
        const friendshipId = user?.friendship_id || user?.id;
        if (!friendshipId) {
            message.error("Friendship ID not found");
            return;
        }
        setUnfriending(true);
        try {
            const result = await dispatch(unfriendThunk(friendshipId));
            if (unfriendThunk.fulfilled.match(result)) {
                message.success("Unfriended successfully");
                // Refresh profile to get updated status
                dispatch(getOtherUserProfileThunk(userId));
            } else {
                message.error(result.payload || "Failed to unfriend");
            }
        } catch (err) {
            message.error("Failed to unfriend");
        } finally {
            setUnfriending(false);
        }
    };

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

    // Determine friendship action label and buttons
    let actionLabel = "Request";
    let showAcceptReject = false;

    if (user.friendship_status === "accepted") {
        actionLabel = "Friends";
    } else if (user.friendship_status === "pending") {
        actionLabel = "Pending";
    } else if (user.friendship_status === "received") {
        showAcceptReject = true;
    } else if (user.friendship_status === "requested") {
        actionLabel = "Requested";
    }

    return (
        <LayoutWrapper>
            <div className="w-full text-gray-900 overflow-hidden relative rounded-2xl shadow-lg">
                {/* Banner */}
                <div
                    className="h-52 sm:h-64 md:h-72 bg-cover bg-center relative rounded-t-2xl"
                    style={{ backgroundImage: `url(${user.cover_image || "/default-banner-light.jpg"})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/30 rounded-t-2xl" />
                </div>

                {/* Avatar */}
                <div className="absolute top-36 sm:top-44 md:top-52 left-4 sm:left-8">
                    <div className="rounded-full border-4 border-white shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                        <Image
                            width={90}
                            height={90}
                            src={user.profile_image_url || "/images/default-avatar.png"}
                            preview={{
                                mask: <div className="flex items-center justify-center">Click to view</div>,
                                icons: {
                                    close: <CloseOutlined />,
                                },
                            }}
                            className="sm:!w-[100px] sm:!h-[100px] object-cover"
                            fallback="/images/default-avatar.png"
                            style={{ borderRadius: '50%' }}
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
                            {showAcceptReject ? (
                                <>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        onClick={handleAcceptRequest}
                                        loading={acceptingRequest}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        type="default"
                                        danger
                                        shape="round"
                                        onClick={handleRejectRequest}
                                        loading={rejectingRequest}
                                    >
                                        Reject
                                    </Button>
                                </>
                            ) : user.friendship_status === "requested" || user.friendship_status === "accepted" ? (
                                <>
                                    <Button
                                        type={user.friendship_status === "accepted" ? "primary" : "default"}
                                        shape="round"
                                        icon={user.friendship_status === "accepted" ? <UserOutlined /> : <UserAddOutlined />}
                                    >
                                        {actionLabel}
                                    </Button>
                                    <Button
                                        type="default"
                                        shape="round"
                                        icon={<MessageOutlined />}
                                        onClick={() => {/* message logic */ }}
                                    >
                                        Message
                                    </Button>
                                    <Dropdown
                                        menu={{
                                            items: user.friendship_status === "requested"
                                                ? [
                                                    {
                                                        key: "cancel",
                                                        label: "Cancel Request",
                                                        icon: <CloseOutlined />,
                                                        onClick: handleCancelRequest,
                                                        disabled: cancelingRequest,
                                                    },
                                                ]
                                                : [
                                                    {
                                                        key: "favourites",
                                                        label: "Favourites",
                                                        icon: <StarOutlined />,
                                                        onClick: () => {/* favourites logic */ },
                                                    },
                                                    {
                                                        key: "edit",
                                                        label: "Edit Friend List",
                                                        icon: <EditOutlined />,
                                                        onClick: () => {/* edit friend list logic */ },
                                                    },
                                                    {
                                                        key: "unfriend",
                                                        label: "Unfriend",
                                                        icon: <UserDeleteOutlined />,
                                                        danger: true,
                                                        onClick: handleUnfriend,
                                                        disabled: unfriending,
                                                    },
                                                ],
                                        }}
                                        trigger={["click"]}
                                    >
                                        <Button
                                            type="default"
                                            shape="round"
                                            icon={<DownOutlined />}
                                            loading={cancelingRequest || unfriending}
                                        />
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        icon={<UserAddOutlined />}
                                        onClick={handleSendFriendRequest}
                                        loading={sendingRequest}
                                    >
                                        {actionLabel}
                                    </Button>
                                    <Button
                                        type="default"
                                        shape="round"
                                        icon={<MessageOutlined />}
                                        onClick={() => {/* message logic */ }}
                                    >
                                        Message
                                    </Button>
                                </>
                            )}
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
