import React, { useState, useEffect } from "react";

export function CreateCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setOrder(0);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit({
      category_name: name,
      description: description,
      display_order: order,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
          Add New Category
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || isLoading}
            className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
