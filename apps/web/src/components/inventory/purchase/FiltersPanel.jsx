import React from "react";
import { X } from "lucide-react";

export function FiltersPanel({ filters, onFiltersChange, suppliers = [] }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      supplier: "",
      status: "",
      dateRange: "",
    });
  };

  const hasActiveFilters = filters.supplier || filters.status || filters.dateRange;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
          Filters
        </h3>
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Supplier Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Supplier
          </label>
          <select
            value={filters.supplier}
            onChange={(e) => handleFilterChange("supplier", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Order Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="ordered">Ordered</option>
            <option value="received">Received</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

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
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              {Object.values(filters).filter(Boolean).length} filter(s) active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}