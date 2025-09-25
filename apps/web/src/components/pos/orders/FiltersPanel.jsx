import React from "react";
import { X } from "lucide-react";

export function FiltersPanel({ filters, setFilters, onClose }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      orderType: "",
      paymentStatus: "",
      dateRange: "",
    });
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E1E6ED] dark:border-[#333333] p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5]">
          Filter Orders
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#07111F] dark:hover:text-[#E5E5E5] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Order Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
          >
            <option value="">All Statuses</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Order Type
          </label>
          <select
            value={filters.orderType}
            onChange={(e) => handleFilterChange("orderType", e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
          >
            <option value="">All Types</option>
            <option value="dine_in">Dine In</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Payment Status
          </label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E1E6ED] dark:border-[#333333]">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#07111F] dark:hover:text-[#E5E5E5] transition-colors"
        >
          Clear Filters
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3A7BEF] dark:hover:bg-[#4A84EF] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}