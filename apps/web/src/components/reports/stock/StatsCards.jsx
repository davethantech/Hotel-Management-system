import { Package, AlertTriangle, XCircle, DollarSign } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/formatters";

export default function StatsCards({ analytics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">
              Total Items
            </p>
            <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">
              {formatNumber(analytics.totalItems)}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
            <Package
              size={24}
              className="text-[#4F8BFF] dark:text-[#5B94FF]"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">
            +5%
          </span>
          <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">
            vs last month
          </span>
        </div>
      </div>

      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">
              Low Stock Items
            </p>
            <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">
              {analytics.lowStockItems.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
            <AlertTriangle
              size={24}
              className="text-[#F59E0B] dark:text-[#FCD34D]"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-[#F59E0B] dark:text-[#FCD34D] text-sm font-medium">
            Needs attention
          </span>
        </div>
      </div>

      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">
              Out of Stock
            </p>
            <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">
              {analytics.outOfStockItems}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#FEE2E2] dark:bg-[#7F1D1D] rounded-lg flex items-center justify-center">
            <XCircle
              size={24}
              className="text-[#EF4444] dark:text-[#F87171]"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-[#EF4444] dark:text-[#F87171] text-sm font-medium">
            Urgent restock
          </span>
        </div>
      </div>

      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">
              Total Value
            </p>
            <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">
              {formatCurrency(analytics.totalValue)}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#DBEAFE] dark:bg-[#1E3A8A] rounded-lg flex items-center justify-center">
            <DollarSign
              size={24}
              className="text-[#3B82F6] dark:text-[#60A5FA]"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">
            +3%
          </span>
          <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
}
