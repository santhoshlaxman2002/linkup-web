import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs, Avatar, Button, Spin, message, Empty, Card } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import {
  fetchIncomingRequestsThunk,
  fetchOutgoingRequestsThunk,
  fetchAllFriendsThunk,
} from "../../features/friends/friendsThunks";
import {
  removeIncomingRequest,
  removeOutgoingRequest,
} from "../../features/friends/friendsSlice";
import {
  acceptFriendRequestThunk,
  rejectFriendRequestThunk,
  cancelFriendRequestThunk,
} from "../../features/profile/profileThunks";

export default function Friends() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { incomingRequests, outgoingRequests, allFriends, loading } = useSelector(
    (state) => state.friends
  );
  const [activeTab, setActiveTab] = useState("incoming");

  // Fetch all counts when component mounts (for badge counts)
  useEffect(() => {
    dispatch(fetchIncomingRequestsThunk());
    dispatch(fetchOutgoingRequestsThunk());
    dispatch(fetchAllFriendsThunk());
  }, [dispatch]);

  const handleAccept = async (requestId) => {
    try {
      const result = await dispatch(acceptFriendRequestThunk(requestId));
      if (acceptFriendRequestThunk.fulfilled.match(result)) {
        message.success("Friend request accepted");
        dispatch(removeIncomingRequest(requestId));
        // Refresh all counts to update badges
        dispatch(fetchIncomingRequestsThunk());
        dispatch(fetchAllFriendsThunk());
      } else {
        message.error(result.payload || "Failed to accept friend request");
      }
    } catch (err) {
      message.error("Failed to accept friend request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const result = await dispatch(rejectFriendRequestThunk(requestId));
      if (rejectFriendRequestThunk.fulfilled.match(result)) {
        message.success("Friend request rejected");
        dispatch(removeIncomingRequest(requestId));
        // Refresh incoming requests count
        dispatch(fetchIncomingRequestsThunk());
      } else {
        message.error(result.payload || "Failed to reject friend request");
      }
    } catch (err) {
      message.error("Failed to reject friend request");
    }
  };

  const handleCancel = async (requestId) => {
    try {
      const result = await dispatch(cancelFriendRequestThunk(requestId));
      if (cancelFriendRequestThunk.fulfilled.match(result)) {
        message.success("Friend request cancelled");
        dispatch(removeOutgoingRequest(requestId));
        // Refresh outgoing requests count
        dispatch(fetchOutgoingRequestsThunk());
      } else {
        message.error(result.payload || "Failed to cancel friend request");
      }
    } catch (err) {
      message.error("Failed to cancel friend request");
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleMessage = (userId) => {
    // Navigate to messages or open message dialog
    navigate(`/messages?user=${userId}`);
  };

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-400 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Friends</h1>
          
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="friends-tabs"
            items={[
              {
                key: "incoming",
                label: (
                  <span>
                    Incoming Requests
                    <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {incomingRequests.length}
                    </span>
                  </span>
                ),
                children: (
                  <>
                    {loading.incoming ? (
                      <div className="flex justify-center py-10">
                        <Spin size="large" />
                      </div>
                    ) : incomingRequests.length === 0 ? (
                      <Empty description="No incoming friend requests" />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {incomingRequests.map((item) => (
                          <Card
                            key={item.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleUserClick(item.requester_id)}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Avatar
                                src={item.requester_profile_image_url}
                                size={64}
                                icon={<UserOutlined />}
                                className="mb-3 cursor-pointer"
                                onClick={() => handleUserClick(item.requester_id)}
                              />
                              <h3 className="text-gray-800 font-semibold mb-1 cursor-pointer hover:text-blue-600">
                                {item.requester_first_name} {item.requester_last_name}
                              </h3>
                              <p className="text-gray-500 text-sm mb-4 cursor-pointer hover:text-blue-600">
                                @{item.requester_username}
                              </p>
                              <div className="flex gap-2 w-full">
                                <Button
                                  type="primary"
                                  shape="round"
                                  icon={<CheckOutlined />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAccept(item.id);
                                  }}
                                  className="flex-1 bg-green-500 hover:bg-green-600 border-green-500"
                                >
                                  Accept
                                </Button>
                                <Button
                                  type="default"
                                  danger
                                  shape="round"
                                  icon={<CloseOutlined />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(item.id);
                                  }}
                                  className="flex-1"
                                >
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "outgoing",
                label: (
                  <span>
                    Outgoing Requests
                    <span className="ml-2 bg-gray-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {outgoingRequests.length}
                    </span>
                  </span>
                ),
                children: (
                  <>
                    {loading.outgoing ? (
                      <div className="flex justify-center py-10">
                        <Spin size="large" />
                      </div>
                    ) : outgoingRequests.length === 0 ? (
                      <Empty description="No outgoing friend requests" />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {outgoingRequests.map((item) => (
                          <Card
                            key={item.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleUserClick(item.receiver_id)}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Avatar
                                src={item.receiver_profile_image_url}
                                size={64}
                                icon={<UserOutlined />}
                                className="mb-3 cursor-pointer"
                                onClick={() => handleUserClick(item.receiver_id)}
                              />
                              <h3 className="text-gray-800 font-semibold mb-1 cursor-pointer hover:text-blue-600">
                                {item.receiver_first_name} {item.receiver_last_name}
                              </h3>
                              <p className="text-gray-500 text-sm mb-4 cursor-pointer hover:text-blue-600">
                                @{item.receiver_username}
                              </p>
                              <Button
                                type="default"
                                danger
                                shape="round"
                                block
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancel(item.id);
                                }}
                              >
                                Cancel Request
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "all",
                label: (
                  <span>
                    All Friends
                    <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {allFriends.length}
                    </span>
                  </span>
                ),
                children: (
                  <>
                    {loading.allFriends ? (
                      <div className="flex justify-center py-10">
                        <Spin size="large" />
                      </div>
                    ) : allFriends.length === 0 ? (
                      <Empty description="No friends yet" />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allFriends.map((item) => (
                          <Card
                            key={item.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleUserClick(item.friend_id)}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Avatar
                                src={item.friend_profile_image_url}
                                size={64}
                                icon={<UserOutlined />}
                                className="mb-3 cursor-pointer"
                                onClick={() => handleUserClick(item.friend_id)}
                              />
                              <h3 className="text-gray-800 font-semibold mb-1 cursor-pointer hover:text-blue-600">
                                {item.friend_first_name} {item.friend_last_name}
                              </h3>
                              <p className="text-gray-500 text-sm mb-4 cursor-pointer hover:text-blue-600">
                                @{item.friend_username}
                              </p>
                              <Button
                                type="primary"
                                shape="round"
                                icon={<MessageOutlined />}
                                block
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMessage(item.friend_id);
                                }}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                Message
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </LayoutWrapper>
  );
}

