import React from "react";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import { Card, Avatar, Input, Button } from "antd";
import { AiOutlineSend } from "react-icons/ai";

const { TextArea } = Input;

export default function Messages() {
  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-sm">
          <div className="flex h-96">
            {/* Messages List */}
            <div className="w-1/3 border-r border-gray-200 pr-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Messages</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Avatar size={40} src="https://via.placeholder.com/40" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Alice Johnson</p>
                    <p className="text-xs text-gray-500">Hey, how are you?</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Avatar size={40} src="https://via.placeholder.com/40" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Bob Wilson</p>
                    <p className="text-xs text-gray-500">Thanks for the help!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 pl-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar size={40} src="https://via.placeholder.com/40" />
                <div>
                  <h4 className="font-semibold text-gray-800">Alice Johnson</h4>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 mb-4 h-48 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hey Alice! How are you doing?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I'm doing great! Thanks for asking. How about you?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I'm good too! Just working on some projects.</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <TextArea
                  placeholder="Type a message..."
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  className="flex-1"
                />
                <Button type="primary" icon={<AiOutlineSend />} className="bg-blue-500 hover:bg-blue-600">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
