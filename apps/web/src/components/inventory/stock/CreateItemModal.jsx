import React, { useState } from "react";
import { X, Package } from "lucide-react";

export function CreateItemModal({ onClose, onSubmit, categories = [] }) {
  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
    category_id: "",
    category_name: "",
    unit_of_measure: "pcs",
    current_stock: 0,
    minimum_stock: 0,
    unit_price: "",
    supplier_info: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.item_name.trim()) {
      newErrors.item_name = "Item name is required";
    }
    
    if (!formData.item_code.trim()) {
      newErrors.item_code = "Item code is required";
    }
    
    if (formData.current_stock < 0) {
      newErrors.current_stock = "Current stock cannot be negative";
    }
    
    if (formData.minimum_stock < 0) {
      newErrors.minimum_stock = "Minimum stock cannot be negative";
    }
    
    if (formData.unit_price && parseFloat(formData.unit_price) < 0) {
      newErrors.unit_price = "Unit price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        current_stock: parseInt(formData.current_stock) || 0,
        minimum_stock: parseInt(formData.minimum_stock) || 0,
        unit_price: formData.unit_price ? parseFloat(formData.unit_price) : null,
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const unitOptions = [
    { value: "pcs", label: "Pieces" },
    { value: "kg", label: "Kilograms" },
    { value: "g", label: "Grams" },
    { value: "l", label: "Liters" },
    { value: "ml", label: "Milliliters" },
    { value: "m", label: "Meters" },
    { value: "cm", label: "Centimeters" },
    { value: "boxes", label: "Boxes" },
    { value: "bottles", label: "Bottles" },
    { value: "rolls", label: "Rolls" },
    { value: "sets", label: "Sets" },
    { value: "pairs", label: "Pairs" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
              <Package size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                Add New Item
              </h2>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Create a new inventory item
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F7FB] dark:hover:bg-[#333333] rounded-lg transition-colors"
          >
            <X size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.item_name ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="Enter item name"
              />
              {errors.item_name && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.item_name}</p>
              )}
            </div>

            {/* Item Code */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Item Code *
              </label>
              <input
                type="text"
                name="item_code"
                value={formData.item_code}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.item_code ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="Enter item code"
              />
              {errors.item_code && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.item_code}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Category
              </label>
              <select
                name="category_name"
                value={formData.category_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit of Measure */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Unit of Measure
              </label>
              <select
                name="unit_of_measure"
                value={formData.unit_of_measure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
              >
                {unitOptions.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Stock */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Current Stock
              </label>
              <input
                type="number"
                name="current_stock"
                value={formData.current_stock}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.current_stock ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="0"
              />
              {errors.current_stock && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.current_stock}</p>
              )}
            </div>

            {/* Minimum Stock */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Minimum Stock
              </label>
              <input
                type="number"
                name="minimum_stock"
                value={formData.minimum_stock}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.minimum_stock ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="0"
              />
              {errors.minimum_stock && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.minimum_stock}</p>
              )}
            </div>

            {/* Unit Price */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Unit Price
              </label>
              <input
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.unit_price ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="0.00"
              />
              {errors.unit_price && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.unit_price}</p>
              )}
            </div>

            {/* Supplier Info */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Supplier Information
              </label>
              <textarea
                name="supplier_info"
                value={formData.supplier_info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent resize-none"
                placeholder="Enter supplier details, contact information, etc."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#EDF0F4] dark:border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3B7EFF] dark:hover:bg-[#4A85FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}