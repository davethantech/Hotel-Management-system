import React from "react";
import { X } from "lucide-react";

export function FiltersPanel({ filters, onFiltersChange, categories = [] }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      status: "",
      lowStock: false,
    });
  };

  const hasActiveFilters = filters.category || filters.status || filters.lowStock;

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
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Stock Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Low Stock Toggle */}
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Alerts
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowStock"
              checked={filters.lowStock}
              onChange={(e) => handleFilterChange("lowStock", e.target.checked)}
              className="w-4 h-4 text-[#4F8BFF] dark:text-[#5B94FF] bg-white dark:bg-[#262626] border-[#EDF0F4] dark:border-[#333333] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-2"
            />
            <label htmlFor="lowStock" className="ml-2 text-sm text-[#07111F] dark:text-[#E5E5E5]">
              Show only low stock items
            </label>
          </div>
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