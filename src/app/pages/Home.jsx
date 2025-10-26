import React from "react";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br from-blue-100 via-purple-200 to-pink-500 rounded-lg">
        <div className="relative z-10 w-full max-h-full max-w-md mx-4 text-center">
          <h1 className="text-4xl font-semibold text-blue-700">Home</h1>
          <p className="text-lg text-blue-600 mt-4">
            Welcome to your home feed!
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
