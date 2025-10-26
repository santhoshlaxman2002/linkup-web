import React from "react";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

export default function Search() {
  return (
    <LayoutWrapper>
      <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br from-green-100 via-teal-200 to-cyan-500 rounded-lg">
        <div className="relative z-10 w-full max-h-full max-w-md mx-4 text-center">
          <h1 className="text-4xl font-semibold text-green-700">Search</h1>
          <p className="text-lg text-green-600 mt-4">
            Find people and content you love!
          </p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
