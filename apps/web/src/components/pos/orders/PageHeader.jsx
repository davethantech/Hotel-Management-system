import React from "react";
import { Plus, Filter } from "lucide-react";

export function PageHeader({ onAddOrderClick, onFiltersClick }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            POS Orders
          </h1>
          <p className="text-[#8A94A7] dark:text-[#A0A0A0] mt-1">
            Manage restaurant orders and track order status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onFiltersClick}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button
            onClick={onAddOrderClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3A7BEF] dark:hover:bg-[#4A84EF] transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}