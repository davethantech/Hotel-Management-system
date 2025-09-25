import React from "react";
import { X, Calendar, Filter } from "lucide-react";

export function FiltersPanel({ filters, onFiltersChange, roomTypes = [] }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: "month",
      status: "",
      roomType: "",
      startDate: "",
      endDate: "",
    });
  };

  const hasActiveFilters = filters.status || filters.roomType || filters.dateRange !== "month" || filters.startDate || filters.endDate;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
            <Filter size={16} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
          </div>
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Report Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            disabled={filters.dateRange !== 'custom'}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            disabled={filters.dateRange !== 'custom'}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Booking Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="no_show">No Show</option>
          </select>
        </div>

        {/* Room Type Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Room Type
          </label>
          <select
            value={filters.roomType}
            onChange={(e) => handleFilterChange("roomType", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Room Types</option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-4 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              <Calendar size={14} />
              <span>
                {Object.values(filters).filter(Boolean).length - (filters.dateRange === 'month' ? 1 : 0)} active filter(s)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {filters.dateRange !== 'month' && (
                <span className="px-2 py-1 bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF] rounded text-xs">
                  {filters.dateRange === 'custom' ? 'Custom Date Range' : filters.dateRange}
                </span>
              )}
              {filters.status && (
                <span className="px-2 py-1 bg-[#ECFDF5] dark:bg-[#064E3B] text-[#10B981] dark:text-[#34D399] rounded text-xs">
                  Status: {filters.status}
                </span>
              )}
              {filters.roomType && (
                <span className="px-2 py-1 bg-[#F3E8FF] dark:bg-[#2A1A33] text-[#8B5CF6] dark:text-[#A78BFA] rounded text-xs">
                  Room: {filters.roomType}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}