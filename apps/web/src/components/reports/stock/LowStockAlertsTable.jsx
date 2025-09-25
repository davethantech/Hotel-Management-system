import { AlertTriangle, Box } from "lucide-react";

export default function LowStockAlertsTable({ lowStockItems }) {
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Low Stock Alert
          </h2>
          <AlertTriangle
            size={20}
            className="text-[#F59E0B] dark:text-[#FCD34D]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Minimum Required
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {lowStockItems.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#F59E0B] dark:bg-[#92400E] rounded-full flex items-center justify-center">
                      <Box size={20} className="text-white" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                    {item.current} {item.unit}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                    {item.minimum} {item.unit}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] dark:bg-[#451A03] text-[#92400E] dark:text-[#FCD34D]">
                    Low Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
