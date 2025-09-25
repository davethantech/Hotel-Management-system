import React, { useState } from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  Package,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
} from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const getStockStatus = (currentStock, minimumStock) => {
  if (currentStock === 0) {
    return { status: 'out_of_stock', label: 'Out of Stock', color: 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]' };
  } else if (currentStock <= minimumStock) {
    return { status: 'low_stock', label: 'Low Stock', color: 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]' };
  } else {
    return { status: 'in_stock', label: 'In Stock', color: 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]' };
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'in_stock':
      return <CheckCircle size={16} className="text-[#10B981]" />;
    case 'out_of_stock':
      return <XCircle size={16} className="text-[#E12929]" />;
    case 'low_stock':
      return <AlertTriangle size={16} className="text-[#F59E0B]" />;
    default:
      return <Package size={16} className="text-[#8A94A7]" />;
  }
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

function StockItemRow({ item, onUpdateStock, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newStock, setNewStock] = useState(item.current_stock);
  const stockInfo = getStockStatus(item.current_stock, item.minimum_stock);

  const handleStockUpdate = () => {
    if (newStock !== item.current_stock) {
      onUpdateStock(item.id, newStock);
    }
    setIsEditing(false);
  };

  const handleStockChange = (delta) => {
    const updatedStock = Math.max(0, item.current_stock + delta);
    onUpdateStock(item.id, updatedStock);
  };

  return (
    <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F7F9FC] dark:bg-[#262626] flex-shrink-0">
            <div className="w-full h-full bg-[#E8F0FF] dark:bg-[#1A2332] flex items-center justify-center">
              <Package size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {item.item_name}
            </div>
            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              {item.item_code}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]">
          {item.category_name || 'Uncategorized'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                className="w-20 px-2 py-1 text-sm border border-[#EDF0F4] dark:border-[#333333] rounded bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5]"
                min="0"
              />
              <button
                onClick={handleStockUpdate}
                className="text-[#10B981] hover:text-[#059669] transition-colors"
              >
                <CheckCircle size={16} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[#E12929] hover:text-[#DC2626] transition-colors"
              >
                <XCircle size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                {item.current_stock}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStockChange(-1)}
                  className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors"
                  disabled={item.current_stock === 0}
                >
                  <Minus size={12} />
                </button>
                <button
                  onClick={() => handleStockChange(1)}
                  className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#10B981] dark:hover:text-[#34D399] transition-colors"
                >
                  <Plus size={12} />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                >
                  <Edit size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mt-1">
          Min: {item.minimum_stock}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
          {item.unit_of_measure || 'pcs'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
          {item.unit_price ? formatCurrency(item.unit_price) : '-'}
        </div>
        {item.unit_price && (
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            Total: {formatCurrency(item.unit_price * item.current_stock)}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockInfo.color}`}>
          {getStatusIcon(stockInfo.status)}
          <span className="ml-1">{stockInfo.label}</span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
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

export function StockTable({ stockItems, isLoading, onUpdateStock, onDelete }) {
  const mockStockItems = [
    {
      id: 1,
      item_name: "Premium Towels",
      item_code: "TWL001",
      category_name: "Linens",
      current_stock: 25,
      minimum_stock: 10,
      unit_of_measure: "pcs",
      unit_price: 15.99,
      is_active: true,
    },
    {
      id: 2,
      item_name: "Toilet Paper",
      item_code: "TP001",
      category_name: "Bathroom Supplies",
      current_stock: 5,
      minimum_stock: 20,
      unit_of_measure: "rolls",
      unit_price: 2.50,
      is_active: true,
    },
    {
      id: 3,
      item_name: "Coffee Beans",
      item_code: "COF001",
      category_name: "Food & Beverage",
      current_stock: 0,
      minimum_stock: 5,
      unit_of_measure: "kg",
      unit_price: 25.00,
      is_active: true,
    },
    {
      id: 4,
      item_name: "Cleaning Spray",
      item_code: "CLN001",
      category_name: "Cleaning Supplies",
      current_stock: 15,
      minimum_stock: 8,
      unit_of_measure: "bottles",
      unit_price: 8.75,
      is_active: true,
    },
    {
      id: 5,
      item_name: "Bed Sheets",
      item_code: "SHT001",
      category_name: "Linens",
      current_stock: 30,
      minimum_stock: 12,
      unit_of_measure: "sets",
      unit_price: 45.00,
      is_active: true,
    },
  ];

  const currentStockItems = stockItems || mockStockItems;
  
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Stock Items
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
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              currentStockItems.map((item) => (
                <StockItemRow 
                  key={item.id} 
                  item={item} 
                  onUpdateStock={onUpdateStock} 
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
          Showing 1 to 5 of {currentStockItems.length} items
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