import React from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  Tag,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  Eye,
} from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const getStatusColor = (status) => {
  switch (status) {
    case 'available':
      return 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]';
    case 'out_of_stock':
      return 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]';
    case 'discontinued':
      return 'bg-[#F7F9FC] text-[#8A94A7] dark:bg-[#262626] dark:text-[#A0A0A0]';
    default:
      return 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'available':
      return <CheckCircle size={16} className="text-[#10B981]" />;
    case 'out_of_stock':
      return <XCircle size={16} className="text-[#E12929]" />;
    default:
      return <Clock size={16} className="text-[#F59E0B]" />;
  }
};

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-12 w-12 rounded-lg mr-4"></div>
          <div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-32 mb-2"></div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-3 rounded w-20"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-6 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-16 mb-1"></div>
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-3 rounded w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-12"></div>
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

function MenuItemRow({ menuItem, onToggleStatus, onDelete }) {
  const status = menuItem.is_available ? 'available' : 'out_of_stock';
  
  return (
    <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F7F9FC] dark:bg-[#262626] flex-shrink-0">
            {menuItem.images && menuItem.images.length > 0 ? (
              <img 
                src={menuItem.images[0]} 
                alt={menuItem.item_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#E8F0FF] dark:bg-[#1A2332] flex items-center justify-center">
                <Tag size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {menuItem.item_name}
            </div>
            <div className="flex items-center mt-1">
              <Star size={14} className="text-[#F59E0B] fill-current" />
              <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] ml-1">
                4.5
              </span>
              {menuItem.preparation_time && (
                <>
                  <Clock size={14} className="text-[#8A94A7] dark:text-[#A0A0A0] ml-3" />
                  <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] ml-1">
                    {menuItem.preparation_time}m
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]">
          <Tag size={12} className="mr-1" />
          {menuItem.category_name || 'Uncategorized'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
          {formatCurrency(menuItem.price)}
        </div>
        {menuItem.cost && (
          <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
            Cost: {formatCurrency(menuItem.cost)}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
          {menuItem.item_code}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span className="ml-1 capitalize">{status.replace('_', ' ')}</span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Eye size={16} />
          </button>
          <button
            onClick={() => onToggleStatus(menuItem.id, menuItem.is_available)}
            className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
            title={menuItem.is_available ? "Mark Unavailable" : "Mark Available"}
          >
            {menuItem.is_available ? <XCircle size={16} /> : <CheckCircle size={16} />}
          </button>
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(menuItem.id)}
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

export function MenuTable({ menuItems, isLoading, onToggleStatus, onDelete }) {
  const mockMenuItems = [
    {
      id: 1,
      item_name: "Classic Cheeseburger",
      item_code: "BURGER001",
      category_name: "Main Course",
      price: 18.50,
      cost: 6.75,
      is_available: true,
      preparation_time: 15,
      images: ["https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=150&h=150&fit=crop"],
      created_at: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      item_name: "Caesar Salad",
      item_code: "SALAD001",
      category_name: "Appetizers",
      price: 14.25,
      cost: 4.20,
      is_available: true,
      preparation_time: 8,
      images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop"],
      created_at: "2024-01-15T10:35:00Z",
    },
    {
      id: 3,
      item_name: "Grilled Salmon",
      item_code: "FISH001",
      category_name: "Main Course",
      price: 28.00,
      cost: 12.50,
      is_available: false,
      preparation_time: 20,
      images: ["https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150&h=150&fit=crop"],
      created_at: "2024-01-15T10:40:00Z",
    },
    {
      id: 4,
      item_name: "Chocolate Lava Cake",
      item_code: "DESSERT001",
      category_name: "Desserts",
      price: 12.75,
      cost: 3.80,
      is_available: true,
      preparation_time: 12,
      images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&h=150&fit=crop"],
      created_at: "2024-01-15T10:45:00Z",
    },
    {
      id: 5,
      item_name: "Craft Beer",
      item_code: "DRINK001",
      category_name: "Beverages",
      price: 8.50,
      cost: 2.25,
      is_available: true,
      preparation_time: 2,
      images: ["https://images.unsplash.com/photo-1608270586620-248524c67de9?w=150&h=150&fit=crop"],
      created_at: "2024-01-15T10:50:00Z",
    },
  ];

  const currentMenuItems = menuItems || mockMenuItems;
  
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Menu Items
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              currentMenuItems.map((menuItem) => (
                <MenuItemRow 
                  key={menuItem.id} 
                  menuItem={menuItem} 
                  onToggleStatus={onToggleStatus} 
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
          Showing 1 to 5 of {currentMenuItems.length} menu items
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