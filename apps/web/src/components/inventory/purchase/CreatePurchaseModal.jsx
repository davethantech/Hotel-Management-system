import React, { useState } from "react";
import { X, FileText, Plus, Trash2 } from "lucide-react";

export function CreatePurchaseModal({ onClose, onSubmit, suppliers = [] }) {
  const [formData, setFormData] = useState({
    po_number: "",
    supplier_name: "",
    order_date: new Date().toISOString().split('T')[0],
    expected_date: "",
    notes: "",
    items: [
      {
        item_name: "",
        quantity: 1,
        unit_price: "",
        total: 0
      }
    ]
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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    // Calculate total for this item
    if (field === 'quantity' || field === 'unit_price') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].quantity) || 0;
      const unitPrice = field === 'unit_price' ? parseFloat(value) || 0 : parseFloat(updatedItems[index].unit_price) || 0;
      updatedItems[index].total = quantity * unitPrice;
    }

    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_name: "",
          quantity: 1,
          unit_price: "",
          total: 0
        }
      ]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.po_number.trim()) {
      newErrors.po_number = "PO number is required";
    }
    
    if (!formData.supplier_name.trim()) {
      newErrors.supplier_name = "Supplier is required";
    }
    
    if (!formData.order_date) {
      newErrors.order_date = "Order date is required";
    }

    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.item_name.trim()) {
        newErrors[`item_${index}_name`] = "Item name is required";
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`item_${index}_quantity`] = "Quantity must be greater than 0";
      }
      if (!item.unit_price || item.unit_price <= 0) {
        newErrors[`item_${index}_price`] = "Unit price must be greater than 0";
      }
    });

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
      const subtotal = calculateSubtotal();
      const tax = calculateTax(subtotal);
      const total = calculateTotal();

      const submitData = {
        ...formData,
        subtotal,
        tax_amount: tax,
        total_amount: total,
        items_count: formData.items.length,
        status: 'draft'
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error creating purchase order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
              <FileText size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                Create Purchase Order
              </h2>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Create a new purchase order for inventory items
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PO Number */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                PO Number *
              </label>
              <input
                type="text"
                name="po_number"
                value={formData.po_number}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.po_number ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
                placeholder="Enter PO number"
              />
              {errors.po_number && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.po_number}</p>
              )}
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Supplier *
              </label>
              <select
                name="supplier_name"
                value={formData.supplier_name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.supplier_name ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
                <option value="new">+ Add New Supplier</option>
              </select>
              {errors.supplier_name && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.supplier_name}</p>
              )}
            </div>

            {/* Order Date */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Order Date *
              </label>
              <input
                type="date"
                name="order_date"
                value={formData.order_date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                  errors.order_date ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                }`}
              />
              {errors.order_date && (
                <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.order_date}</p>
              )}
            </div>

            {/* Expected Date */}
            <div>
              <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                Expected Delivery Date
              </label>
              <input
                type="date"
                name="expected_date"
                value={formData.expected_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Items Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                Order Items
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3B7EFF] dark:hover:bg-[#4A85FF] transition-colors"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    {/* Item Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        value={item.item_name}
                        onChange={(e) => handleItemChange(index, 'item_name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                          errors[`item_${index}_name`] ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                        }`}
                        placeholder="Enter item name"
                      />
                      {errors[`item_${index}_name`] && (
                        <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors[`item_${index}_name`]}</p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        min="1"
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                          errors[`item_${index}_quantity`] ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                        }`}
                      />
                      {errors[`item_${index}_quantity`] && (
                        <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors[`item_${index}_quantity`]}</p>
                      )}
                    </div>

                    {/* Unit Price */}
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Unit Price *
                      </label>
                      <input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                        min="0"
                        step="0.01"
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                          errors[`item_${index}_price`] ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                        }`}
                        placeholder="0.00"
                      />
                      {errors[`item_${index}_price`] && (
                        <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors[`item_${index}_price`]}</p>
                      )}
                    </div>

                    {/* Total & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {formatCurrency(item.total)}
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-2 text-[#E12929] dark:text-[#FF6B6B] hover:bg-[#FFEDED] dark:hover:bg-[#331111] rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Subtotal:</span>
                <span className="text-[#07111F] dark:text-[#E5E5E5]">{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Tax (10%):</span>
                <span className="text-[#07111F] dark:text-[#E5E5E5]">{formatCurrency(calculateTax(calculateSubtotal()))}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t border-[#EDF0F4] dark:border-[#333333] pt-2">
                <span className="text-[#07111F] dark:text-[#E5E5E5]">Total:</span>
                <span className="text-[#07111F] dark:text-[#E5E5E5]">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent resize-none"
              placeholder="Enter any additional notes or instructions..."
            />
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
              {isSubmitting ? "Creating..." : "Create Purchase Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}