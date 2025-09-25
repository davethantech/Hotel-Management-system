import React, { useState } from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  Building2,
  ArrowUpDown,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Minus,
  Eye,
  Star,
} from "lucide-react";

const getStatusConfig = (status) => {
  const configs = {
    active: {
      label: 'Active',
      color: 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]',
      icon: CheckCircle
    },
    inactive: {
      label: 'Inactive',
      color: 'bg-[#F3F4F6] text-[#6B7280] dark:bg-[#374151] dark:text-[#9CA3AF]',
      icon: XCircle
    },
    pending: {
      label: 'Pending',
      color: 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]',
      icon: Clock
    },
    suspended: {
      label: 'Suspended',
      color: 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]',
      icon: Minus
    }
  };
  return configs[status] || configs.active;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
      ))}
      {hasHalfStar && <Star size={12} className="fill-[#F59E0B] text-[#F59E0B] opacity-50" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i} size={12} className="text-[#E5E7EB] dark:text-[#4B5563]" />
      ))}
      <span className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] ml-1">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-10 w-10 rounded-lg mr-3"></div>
          <div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-32 mb-2"></div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-3 rounded w-20"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-6 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-8 rounded w-8 ml-auto"></div>
      </td>
    </tr>
  ));
}

function SupplierRow({ supplier, onUpdateStatus, onDelete }) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusConfig = getStatusConfig(supplier.status);
  const StatusIcon = statusConfig.icon;

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(supplier.id, newStatus);
    setShowStatusDropdown(false);
  };

  const statusOptions = ['active', 'inactive', 'pending', 'suspended'];

  return (
    <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F7F9FC] dark:bg-[#262626] flex-shrink-0">
            <div className="w-full h-full bg-[#E8F0FF] dark:bg-[#1A2332] flex items-center justify-center">
              <Building2 size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {supplier.company_name}
            </div>
            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              {supplier.contact_name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5] mb-1">
          <div className="flex items-center gap-1 mb-1">
            <Mail size={12} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
            <span className="truncate max-w-[150px]">{supplier.email}</span>
          </div>
          {supplier.phone && (
            <div className="flex items-center gap-1">
              <Phone size={12} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              <span>{supplier.phone}</span>
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5] font-medium mb-1">
          {supplier.category}
        </div>
        {supplier.location && (
          <div className="flex items-center gap-1 text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            <MapPin size={10} />
            <span>{supplier.location}</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5] mb-1">
          {formatDate(supplier.created_at)}
        </div>
        {supplier.last_order_date && (
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            Last order: {formatDate(supplier.last_order_date)}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {supplier.rating && (
          <div className="mb-2">
            {getRatingStars(supplier.rating)}
          </div>
        )}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} hover:opacity-80 transition-opacity`}
          >
            <StatusIcon size={12} className="mr-1" />
            {statusConfig.label}
          </button>
          
          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#1E1E1E] border border-[#EDF0F4] dark:border-[#333333] rounded-lg shadow-lg z-10 min-w-[120px]">
              {statusOptions.map((status) => {
                const config = getStatusConfig(status);
                const OptionIcon = config.icon;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors flex items-center gap-2"
                  >
                    <OptionIcon size={12} />
                    {config.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(supplier.id)}
            className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function SuppliersTable({ suppliers, isLoading, onUpdateStatus, onDelete }) {
  const mockSuppliers = [
    {
      id: 1,
      company_name: "ABC Supplies Ltd",
      contact_name: "John Smith",
      email: "john.smith@abcsupplies.com",
      phone: "+1 (555) 123-4567",
      category: "Office Supplies",
      location: "New York, NY",
      status: "active",
      rating: 4.5,
      created_at: "2023-08-15",
      last_order_date: "2024-01-10",
    },
    {
      id: 2,
      company_name: "Hotel Essentials Co",
      contact_name: "Sarah Johnson",
      email: "sarah@hoteleco.com",
      phone: "+1 (555) 987-6543",
      category: "Hotel Amenities",
      location: "Los Angeles, CA",
      status: "active",
      rating: 4.8,
      created_at: "2023-06-20",
      last_order_date: "2024-01-12",
    },
    {
      id: 3,
      company_name: "Fresh Foods Inc",
      contact_name: "Mike Chen",
      email: "mike@freshfoods.com",
      phone: "+1 (555) 456-7890",
      category: "Food & Beverage",
      location: "Chicago, IL",
      status: "active",
      rating: 4.2,
      created_at: "2023-09-10",
      last_order_date: "2024-01-08",
    },
    {
      id: 4,
      company_name: "Clean & Shine Co",
      contact_name: "Lisa Brown",
      email: "lisa@cleanshine.com",
      phone: "+1 (555) 234-5678",
      category: "Cleaning Supplies",
      location: "Miami, FL",
      status: "inactive",
      rating: 3.8,
      created_at: "2023-11-05",
      last_order_date: "2023-12-20",
    },
    {
      id: 5,
      company_name: "Linen Masters",
      contact_name: "David Wilson",
      email: "david@linenmasters.com",
      phone: "+1 (555) 345-6789",
      category: "Textiles",
      location: "Boston, MA",
      status: "pending",
      rating: 4.0,
      created_at: "2024-01-03",
      last_order_date: null,
    },
    {
      id: 6,
      company_name: "Tech Solutions Ltd",
      contact_name: "Emma Davis",
      email: "emma@techsolutions.com",
      phone: "+1 (555) 567-8901",
      category: "Technology",
      location: "Seattle, WA",
      status: "suspended",
      rating: 3.5,
      created_at: "2023-07-12",
      last_order_date: "2023-11-15",
    },
  ];

  const currentSuppliers = suppliers || mockSuppliers;
  
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Suppliers
          </h3>
          <button className="p-2 hover:bg-[#F5F7FB] dark:hover:bg-[#333333] rounded-lg transition-colors">
            <ArrowUpDown size={16} className="text-[#536081] dark:text-[#A0A0A0]" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Rating & Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              currentSuppliers.map((supplier) => (
                <SupplierRow 
                  key={supplier.id} 
                  supplier={supplier} 
                  onUpdateStatus={onUpdateStatus} 
                  onDelete={onDelete} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#EDF0F4] dark:border-[#333333] flex items-center justify-between">
        <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
          Showing 1 to {currentSuppliers.length} of {currentSuppliers.length} suppliers
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}