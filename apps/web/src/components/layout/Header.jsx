import React from "react";
import { Search, Inbox, Bell, Menu } from "lucide-react";

export function Header({
  user,
  onSidebarOpen,
  searchTerm,
  onSearchTermChange,
  placeholder = "Search...",
}) {
  return (
    <header
      className="h-16 bg-white dark:bg-[#1E1E1E] border-b border-[#EDF0F4] dark:border-[#333333] flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={onSidebarOpen}
          className="md:hidden p-1 rounded hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Menu size={24} className="text-[#536081] dark:text-[#A0A0A0]" />
        </button>

        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#808080]"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={onSearchTermChange}
            className="w-48 sm:w-64 md:w-72 pl-10 pr-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#8A94A7] dark:text-[#B0B0B0] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        <button className="relative p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
          <Inbox size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E12929] dark:bg-[#FF6B6B] rounded-full"></span>
        </button>
        <button className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
          <Bell size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {user?.name || user?.email}
            </p>
            <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
