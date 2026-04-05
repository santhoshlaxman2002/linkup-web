import React from "react";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import PostComposer from "../../components/common/PostComposer";

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="h-screen overflow-y-auto bg-white">
        {/* Post Composer */}
        <PostComposer />

        {/* Posts Feed - Placeholder for now */}
        <div className="p-4">
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">Your posts will appear here</p>
            <p className="text-sm mt-2">Start by creating your first post above!</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
