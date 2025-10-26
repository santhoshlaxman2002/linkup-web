import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { AiOutlineGift, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

export default function RightSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div 
      className="fixed right-0 top-0 w-80 h-full bg-white border-l border-gray-200 shadow-lg overflow-y-auto flex flex-col"
      style={{ zIndex: 999 }}
    >
      <div className="p-6 flex-1 pb-24">
        {/* Birthday Section */}
        <Card className="mb-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <AiOutlineGift size={24} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Birthday</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar size={40} icon={<AiOutlineUser />} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <Button size="small" type="primary" className="bg-blue-500 hover:bg-blue-600">
                Wish
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar size={40} icon={<AiOutlineUser />} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Jane Smith</p>
                <p className="text-xs text-gray-500">Tomorrow</p>
              </div>
              <Button size="small" type="primary" className="bg-blue-500 hover:bg-blue-600">
                Wish
              </Button>
            </div>
          </div>
        </Card>

        {/* DM Section */}
        <Card className="mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
            <Button type="text" className="text-blue-500">
              See All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Avatar size={40} icon={<AiOutlineUser />} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Alice Johnson</p>
                <p className="text-xs text-gray-500">Hey, how are you?</p>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Avatar size={40} icon={<AiOutlineUser />} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Bob Wilson</p>
                <p className="text-xs text-gray-500">Thanks for the help!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button 
            type="primary" 
            danger 
            className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <AiOutlineLogout size={20} />
            Logout
          </Button>
        </div>

      </div>
    </div>
  );
}
