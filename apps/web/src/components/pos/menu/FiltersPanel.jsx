import React from "react";

export function FiltersPanel({ filters, setFilters, categories }) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      status: "",
      priceRange: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#4F8BFF] dark:text-[#5B94FF] hover:text-[#3D6FE5] dark:hover:text-[#4F8BFF] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Category
          </label>
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Status
          </label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
            Price Range
          </label>
          <select 
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
          >
            <option value="">All Prices</option>
            <option value="0-10">$0 - $10</option>
            <option value="10-20">$10 - $20</option>
            <option value="20-30">$20 - $30</option>
            <option value="30+">$30+</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button 
            onClick={() => {
              // Apply filters logic would go here
              console.log('Applying filters:', filters);
            }}
            className="w-full px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}