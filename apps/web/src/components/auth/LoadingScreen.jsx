import React from "react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#4F8BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#8A94A7] dark:text-[#A0A0A0]">Loading...</p>
      </div>
    </div>
  );
}
