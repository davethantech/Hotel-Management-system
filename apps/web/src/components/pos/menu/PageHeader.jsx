import React from "react";
import { Filter, Download, Plus } from "lucide-react";

export function PageHeader({ onAddMenuItemClick, onFiltersClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
          Menu Items
        </h1>
        <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
          Manage your restaurant menu items, pricing, and availability
        </p>
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        <button
          onClick={onFiltersClick}
          className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Filter size={16} className="mr-2" />
          Filters
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
          <Download size={16} className="mr-2" />
          Export
        </button>
        <button
          onClick={onAddMenuItemClick}
          className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Menu Item
        </button>
      </div>
    </div>
  );
}