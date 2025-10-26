import React from "react";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import { Card, Avatar, Badge } from "antd";
import { AiOutlineHeart, AiOutlineUser, AiOutlineLike } from "react-icons/ai";

export default function Notifications() {
  return (
    <LayoutWrapper>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
        
        <div className="space-y-4">
          <Card className="shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <AiOutlineHeart size={24} className="text-red-500" />
                <Badge count={1} size="small" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar size={32} src="https://via.placeholder.com/32" />
                  <span className="font-medium text-gray-800">John Doe</span>
                  <span className="text-gray-500">liked your post</span>
                </div>
                <p className="text-sm text-gray-600">"Great content! Keep it up!"</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <AiOutlineUser size={24} className="text-blue-500" />
                <Badge count={1} size="small" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar size={32} src="https://via.placeholder.com/32" />
                  <span className="font-medium text-gray-800">Jane Smith</span>
                  <span className="text-gray-500">started following you</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <AiOutlineLike size={24} className="text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar size={32} src="https://via.placeholder.com/32" />
                  <span className="font-medium text-gray-800">Alice Johnson</span>
                  <span className="text-gray-500">commented on your post</span>
                </div>
                <p className="text-sm text-gray-600">"This is amazing! Thanks for sharing."</p>
                <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <AiOutlineHeart size={24} className="text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar size={32} src="https://via.placeholder.com/32" />
                  <span className="font-medium text-gray-800">Bob Wilson</span>
                  <span className="text-gray-500">liked your photo</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}
