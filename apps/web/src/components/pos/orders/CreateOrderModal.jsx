import React, { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

export function CreateOrderModal({ isOpen, onClose, onSubmit, isLoading, menuItems }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    order_type: "dine_in",
    table_number: "",
    notes: "",
    items: [],
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addMenuItem = (menuItem) => {
    const existingItem = selectedItems.find((item) => item.id === menuItem.id);
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { ...menuItem, quantity: 1 },
      ]);
    }
  };

  const updateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please add at least one item to the order");
      return;
    }

    const orderData = {
      ...formData,
      items: selectedItems,
      subtotal: calculateTotal(),
      total_amount: calculateTotal(), // Add tax/discount logic here if needed
    };

    onSubmit(orderData);
  };

  const resetForm = () => {
    setFormData({
      customer_name: "",
      order_type: "dine_in",
      table_number: "",
      notes: "",
      items: [],
    });
    setSelectedItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#E1E6ED] dark:border-[#333333]">
          <h2 className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            Create New Order
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#07111F] dark:hover:text-[#E5E5E5] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Order Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => handleInputChange("customer_name", e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    placeholder="Enter customer name (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Order Type
                  </label>
                  <select
                    value={formData.order_type}
                    onChange={(e) => handleInputChange("order_type", e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                  >
                    <option value="dine_in">Dine In</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>

                {formData.order_type === "dine_in" && (
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Table Number
                    </label>
                    <input
                      type="text"
                      value={formData.table_number}
                      onChange={(e) => handleInputChange("table_number", e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                      placeholder="Enter table number"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    placeholder="Special instructions or notes"
                  />
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Add Items
                </h3>

                <div className="max-h-60 overflow-y-auto border border-[#E1E6ED] dark:border-[#333333] rounded-lg">
                  {menuItems && menuItems.length > 0 ? (
                    menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border-b border-[#E1E6ED] dark:border-[#333333] last:border-b-0"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                            {item.item_name}
                          </h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                            ${item.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addMenuItem(item)}
                          className="px-3 py-1 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded hover:bg-[#3A7BEF] dark:hover:bg-[#4A84EF] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#8A94A7] dark:text-[#A0A0A0]">
                      No menu items available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E1E6ED] dark:border-[#333333]">
                <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-[#F8FAFC] dark:bg-[#2A2A2A] rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {item.item_name}
                        </h4>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          ${item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#EF4444] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-[#07111F] dark:text-[#E5E5E5]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#22C55E] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <span className="ml-4 font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-[#E1E6ED] dark:border-[#333333]">
                    <span className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5]">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E1E6ED] dark:border-[#333333]">
          <button
            type="button"
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="px-4 py-2 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#07111F] dark:hover:text-[#E5E5E5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedItems.length === 0}
            className="px-6 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3A7BEF] dark:hover:bg-[#4A84EF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating..." : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
}