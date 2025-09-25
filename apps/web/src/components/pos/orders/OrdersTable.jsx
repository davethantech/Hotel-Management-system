import React from "react";
import { Eye, Edit, Trash2, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

export function OrdersTable({ orders, isLoading, onView, onEdit, onDelete, onUpdateStatus }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing":
        return <Clock size={16} className="text-[#FF8A4C]" />;
      case "ready":
        return <CheckCircle size={16} className="text-[#22C55E]" />;
      case "completed":
        return <CheckCircle size={16} className="text-[#22C55E]" />;
      case "cancelled":
        return <XCircle size={16} className="text-[#EF4444]" />;
      default:
        return <Clock size={16} className="text-[#8A94A7]" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      preparing: "bg-[#FFF4ED] text-[#FF8A4C] border-[#FFE4CC]",
      ready: "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]",
      completed: "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]",
      cancelled: "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
          statusConfig[status] || "bg-[#F8FAFC] text-[#8A94A7] border-[#E1E6ED]"
        }`}
      >
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      paid: "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]",
      pending: "bg-[#FFF4ED] text-[#FF8A4C] border-[#FFE4CC]",
      failed: "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
          statusConfig[status] || "bg-[#F8FAFC] text-[#8A94A7] border-[#E1E6ED]"
        }`}
      >
        <DollarSign size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E1E6ED] dark:border-[#333333] overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-32 mb-4"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 py-4">
                <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-20"></div>
                <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-32"></div>
                <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-24"></div>
                <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-16"></div>
                <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E1E6ED] dark:border-[#333333] p-12 text-center">
        <div className="w-16 h-16 bg-[#F8FAFC] dark:bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock size={24} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
        </div>
        <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
          No orders found
        </h3>
        <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
          Orders will appear here once customers start placing them.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg border border-[#E1E6ED] dark:border-[#333333] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] dark:bg-[#2A2A2A] border-b border-[#E1E6ED] dark:border-[#404040]">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Order #
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Items
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Total
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Payment
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Time
              </th>
              <th className="text-right py-3 px-6 text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E6ED] dark:divide-[#333333]">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#F8FAFC] dark:hover:bg-[#2A2A2A] transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                    #{order.order_number}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#07111F] dark:text-[#E5E5E5]">
                    {order.customer_name || "Walk-in Customer"}
                  </div>
                  {order.table_number && (
                    <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                      Table {order.table_number}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]">
                    {order.order_type.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-[#07111F] dark:text-[#E5E5E5]">
                    {order.items?.length || 0} items
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                    ${order.total_amount}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(order.order_status)}
                </td>
                <td className="py-4 px-6">
                  {getPaymentStatusBadge(order.payment_status)}
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                    {new Date(order.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(order.id)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                      title="View Order"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(order.id)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#FF8A4C] dark:hover:text-[#FF8A4C] transition-colors"
                      title="Edit Order"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(order.id)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#EF4444] dark:hover:text-[#EF4444] transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}