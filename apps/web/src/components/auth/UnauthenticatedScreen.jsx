import React from "react";
import { Hotel } from "lucide-react";

export function UnauthenticatedScreen() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <Hotel size={64} className="text-[#4F8BFF] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-4">
          Welcome to Urbane Hospitium
        </h1>
        <p className="text-[#8A94A7] dark:text-[#A0A0A0] mb-6">
          Please sign in to access the Hotel Management System
        </p>
        <a
          href="/account/signin"
          className="inline-flex items-center px-6 py-3 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
