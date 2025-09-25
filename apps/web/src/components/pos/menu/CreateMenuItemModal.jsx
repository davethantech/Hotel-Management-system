import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

export function CreateMenuItemModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  categories,
}) {
  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
    category_id: "",
    description: "",
    price: "",
    cost: "",
    preparation_time: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        item_name: "",
        item_code: "",
        category_id: "",
        description: "",
        price: "",
        cost: "",
        preparation_time: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateItemCode = (name) => {
    if (!name) return "";
    return name.toUpperCase().replace(/\s+/g, '').substring(0, 8) + 
           Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  const handleNameChange = (value) => {
    handleInputChange('item_name', value);
    if (value && !formData.item_code) {
      handleInputChange('item_code', generateItemCode(value));
    }
  };

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      cost: parseFloat(formData.cost) || 0,
      preparation_time: parseInt(formData.preparation_time) || null,
      category_id: parseInt(formData.category_id) || null,
    };
    onSubmit(submitData);
  };

  const isFormValid = formData.item_name.trim() && formData.price && parseFloat(formData.price) > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Add New Menu Item
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={formData.item_name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Item Code *
              </label>
              <input
                type="text"
                value={formData.item_code}
                onChange={(e) => handleInputChange('item_code', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                placeholder="Auto-generated or enter custom"
              />
            </div>
          </div>

          {/* Category and Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                value={formData.preparation_time}
                onChange={(e) => handleInputChange('preparation_time', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                placeholder="15"
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
              placeholder="Enter item description"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Selling Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]">$</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Cost Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]">$</span>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Profit Margin Display */}
          {formData.price && formData.cost && parseFloat(formData.price) > 0 && parseFloat(formData.cost) > 0 && (
            <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Profit Margin:</span>
                <span className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                  ${(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)} 
                  ({(((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.price)) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          )}

          {/* Image Upload Placeholder */}
          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Item Images
            </label>
            <div className="border-2 border-dashed border-[#E1E6ED] dark:border-[#404040] rounded-lg p-8 text-center">
              <Upload size={32} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-2" />
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-[#EDF0F4] dark:border-[#333333]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Menu Item"}
          </button>
        </div>
      </div>
    </div>
  );
}