import React, { useState } from "react";
import { X, Building2 } from "lucide-react";

export function CreateSupplierModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "United States",
    category: "",
    tax_id: "",
    payment_terms: "net_30",
    credit_limit: "",
    website: "",
    notes: "",
    status: "active"
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
    
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
    }
    
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = "Contact name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[^\d\+]/g, ''))) {
      newErrors.phone = "Phone number is invalid";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Website must be a valid URL (http:// or https://)";
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
        location: `${formData.city}${formData.state ? ', ' + formData.state : ''}`,
        created_at: new Date().toISOString(),
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error("Error creating supplier:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Office Supplies",
    "Hotel Amenities",
    "Food & Beverage",
    "Cleaning Supplies",
    "Textiles",
    "Technology",
    "Furniture",
    "Maintenance",
    "Security",
    "Other"
  ];

  const paymentTerms = [
    { value: "net_15", label: "Net 15 days" },
    { value: "net_30", label: "Net 30 days" },
    { value: "net_45", label: "Net 45 days" },
    { value: "net_60", label: "Net 60 days" },
    { value: "cod", label: "Cash on Delivery" },
    { value: "prepaid", label: "Prepaid" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
              <Building2 size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                Add New Supplier
              </h2>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Create a new supplier profile for your inventory management
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
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.company_name ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.company_name && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.company_name}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.category ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.category}</p>
                )}
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.website ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.website}</p>
                )}
              </div>

              {/* Tax ID */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Tax ID / EIN
                </label>
                <input
                  type="text"
                  name="tax_id"
                  value={formData.tax_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                  placeholder="123-45-6789"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.contact_name ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                  placeholder="Contact person name"
                />
                {errors.contact_name && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.contact_name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.email ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                  placeholder="contact@company.com"
                />
                {errors.email && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent ${
                    errors.phone ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#EDF0F4] dark:border-[#333333]'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B] mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending Approval</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
              Address Information
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                    placeholder="City"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                    placeholder="State"
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                    placeholder="ZIP"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Terms */}
          <div>
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
              Business Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payment Terms */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Payment Terms
                </label>
                <select
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                >
                  {paymentTerms.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Credit Limit */}
              <div>
                <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                  Credit Limit
                </label>
                <input
                  type="number"
                  name="credit_limit"
                  value={formData.credit_limit}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                  placeholder="0.00"
                />
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
              placeholder="Additional notes about this supplier..."
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
              {isSubmitting ? "Creating..." : "Add Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}