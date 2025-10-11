import React from "react";

export default function Welcome() {
  return (
    <div className="flex justify-center items-center h-full overflow-y-auto bg-gradient-to-br absolute inset-0 bg-gradient-animation from-indigo-100 via-pink-200 to-purple-500">
        <div className="relative z-10 w-full max-h-full max-w-md mx-4">
            <h1 className="text-4xl font-semibold text-indigo-700"> Welcome!</h1>
        </div>
    </div>
  );
}
