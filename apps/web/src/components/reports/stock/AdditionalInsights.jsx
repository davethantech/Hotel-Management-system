import { Truck, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export default function AdditionalInsights({ analytics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center mr-3">
            <Truck
              size={20}
              className="text-[#4F8BFF] dark:text-[#5B94FF]"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Monthly Consumption
          </h3>
        </div>
        <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
          {formatCurrency(analytics.monthlyConsumption)}
        </p>
        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
          Average monthly inventory consumption
        </p>
      </div>

      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center mr-3">
            <CheckCircle
              size={20}
              className="text-[#10B981] dark:text-[#34D399]"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Stock Turnover
          </h3>
        </div>
        <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
          3.2x
        </p>
        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
          Average inventory turnover rate per year
        </p>
      </div>

      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center mr-3">
            <Clock
              size={20}
              className="text-[#F59E0B] dark:text-[#FCD34D]"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Reorder Time
          </h3>
        </div>
        <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
          5-7 days
        </p>
        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
          Average time to restock low inventory items
        </p>
      </div>
    </div>
  );
}
