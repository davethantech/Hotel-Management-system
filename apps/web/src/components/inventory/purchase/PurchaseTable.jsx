import React, { useState } from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  ArrowUpDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
} from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusConfig = (status) => {
  const configs = {
    draft: {
      label: 'Draft',
      color: 'bg-[#F3F4F6] text-[#6B7280] dark:bg-[#374151] dark:text-[#9CA3AF]',
      icon: Edit
    },
    pending: {
      label: 'Pending',
      color: 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]',
      icon: Clock
    },
    approved: {
      label: 'Approved',
      color: 'bg-[#DBEAFE] text-[#3B82F6] dark:bg-[#1E3A8A] dark:text-[#93C5FD]',
      icon: CheckCircle
    },
    ordered: {
      label: 'Ordered',
      color: 'bg-[#E0E7FF] text-[#6366F1] dark:bg-[#312E81] dark:text-[#C7D2FE]',
      icon: FileText
    },
    received: {
      label: 'Received',
      color: 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]',
      icon: CheckCircle
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]',
      icon: XCircle
    }
  };
  return configs[status] || configs.draft;
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

function PurchaseOrderRow({ order, onUpdateStatus, onDelete }) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(order.id, newStatus);
    setShowStatusDropdown(false);
  };

  const statusOptions = ['draft', 'pending', 'approved', 'ordered', 'received', 'cancelled'];

  return (
    <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F7F9FC] dark:bg-[#262626] flex-shrink-0">
            <div className="w-full h-full bg-[#E8F0FF] dark:bg-[#1A2332] flex items-center justify-center">
              <FileText size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {order.po_number}
            </div>
            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              {order.supplier_name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
          {formatDate(order.order_date)}
        </div>
        {order.expected_date && (
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            Expected: {formatDate(order.expected_date)}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
          {order.items_count} item{order.items_count !== 1 ? 's' : ''}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
          {formatCurrency(order.total_amount)}
        </div>
        {order.tax_amount > 0 && (
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            Tax: {formatCurrency(order.tax_amount)}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
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
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#10B981] dark:hover:text-[#34D399] transition-colors">
            <Download size={16} />
          </button>
          <button
            onClick={() => onDelete(order.id)}
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

export function PurchaseTable({ purchaseOrders, isLoading, onUpdateStatus, onDelete }) {
  const mockPurchaseOrders = [
    {
      id: 1,
      po_number: "PO-2024-001",
      supplier_name: "ABC Supplies Ltd",
      order_date: "2024-01-15",
      expected_date: "2024-01-25",
      items_count: 5,
      total_amount: 1250.00,
      tax_amount: 125.00,
      status: "approved",
    },
    {
      id: 2,
      po_number: "PO-2024-002",
      supplier_name: "Hotel Essentials Co",
      order_date: "2024-01-14",
      expected_date: "2024-01-22",
      items_count: 12,
      total_amount: 2850.75,
      tax_amount: 285.08,
      status: "pending",
    },
    {
      id: 3,
      po_number: "PO-2024-003",
      supplier_name: "Fresh Foods Inc",
      order_date: "2024-01-13",
      expected_date: null,
      items_count: 8,
      total_amount: 450.50,
      tax_amount: 45.05,
      status: "received",
    },
    {
      id: 4,
      po_number: "PO-2024-004",
      supplier_name: "Clean & Shine Co",
      order_date: "2024-01-12",
      expected_date: "2024-01-20",
      items_count: 3,
      total_amount: 175.25,
      tax_amount: 17.53,
      status: "ordered",
    },
    {
      id: 5,
      po_number: "PO-2024-005",
      supplier_name: "Linen Masters",
      order_date: "2024-01-10",
      expected_date: "2024-01-18",
      items_count: 15,
      total_amount: 3200.00,
      tax_amount: 320.00,
      status: "draft",
    },
  ];

  const currentPurchaseOrders = purchaseOrders || mockPurchaseOrders;
  
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Purchase Orders
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Order Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              currentPurchaseOrders.map((order) => (
                <PurchaseOrderRow 
                  key={order.id} 
                  order={order} 
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
          Showing 1 to 5 of {currentPurchaseOrders.length} orders
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