import React from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  Tag,
  ArrowUpDown,
  CheckCircle,
  XCircle,
} from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-8"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-8"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-6 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-8 rounded w-8 ml-auto"></div>
      </td>
    </tr>
  ));
}

function CategoryRow({ category, onToggleStatus, onDelete }) {
    return (
        <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-lg flex items-center justify-center mr-3">
                        <Tag size={16} className="text-white" />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                            {category.category_name}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-[#536081] dark:text-[#B0B0B0] max-w-xs truncate">
                    {category.description}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                    {category.item_count}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                    {category.display_order}
                </div>
            </td>
            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.is_active
                            ? "bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]"
                            : "bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]"
                    }`}
                >
                    {category.is_active ? "Active" : "Inactive"}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                    {formatDate(category.created_at)}
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button
                        onClick={() => onToggleStatus(category.id, category.is_active)}
                        className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                        title={category.is_active ? "Deactivate" : "Activate"}
                    >
                        {category.is_active ? <XCircle size={16} /> : <CheckCircle size={16} />}
                    </button>
                    <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(category.id)}
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

export function CategoriesTable({ categories, isLoading, onToggleStatus, onDelete }) {
  const mockCategories = [
    {
      id: 1,
      category_name: "Appetizers",
      description: "Starters and small plates to begin your meal",
      display_order: 1,
      is_active: true,
      item_count: 12,
      created_at: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      category_name: "Main Courses",
      description: "Hearty main dishes and entrees",
      display_order: 2,
      is_active: true,
      item_count: 24,
      created_at: "2024-01-15T10:35:00Z",
    },
    {
      id: 3,
      category_name: "Desserts",
      description: "Sweet treats and desserts",
      display_order: 3,
      is_active: true,
      item_count: 8,
      created_at: "2024-01-15T10:40:00Z",
    },
    {
      id: 4,
      category_name: "Beverages",
      description: "Hot and cold drinks",
      display_order: 4,
      is_active: true,
      item_count: 15,
      created_at: "2024-01-15T10:45:00Z",
    },
    {
      id: 5,
      category_name: "Salads",
      description: "Fresh salads and healthy options",
      display_order: 5,
      is_active: false,
      item_count: 6,
      created_at: "2024-01-15T10:50:00Z",
    },
  ];

    const currentCategories = categories || mockCategories;
    
    return (
        <div
            className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
            <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                        Categories List
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                        {isLoading ? (
                            <TableSkeleton />
                        ) : (
                            currentCategories.map((category) => (
                                <CategoryRow 
                                    key={category.id} 
                                    category={category} 
                                    onToggleStatus={onToggleStatus} 
                                    onDelete={onDelete} 
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
