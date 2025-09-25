import { PieChart, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export default function AnalyticsCharts({ analytics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Category Breakdown */}
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Stock by Category
          </h2>
          <PieChart
            size={20}
            className="text-[#8A94A7] dark:text-[#A0A0A0]"
          />
        </div>

        <div className="space-y-4">
          {analytics.topCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0
                      ? "bg-[#4F8BFF]"
                      : index === 1
                      ? "bg-[#10B981]"
                      : index === 2
                      ? "bg-[#F59E0B]"
                      : index === 3
                      ? "bg-[#EF4444]"
                      : "bg-[#8B5CF6]"
                  }`}
                ></div>
                <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                  {category.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                  {category.items} items
                </div>
                <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                  {formatCurrency(category.value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Monthly Consumption vs Purchases
          </h2>
          <BarChart3
            size={20}
            className="text-[#8A94A7] dark:text-[#A0A0A0]"
          />
        </div>

        <div className="space-y-3">
          {analytics.monthlyTrends.map((trend, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] w-8">
                  {trend.month}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-1">
                    <div className="flex-1">
                      <div className="w-full bg-[#F1F5FF] dark:bg-[#1A2332] rounded-full h-2">
                        <div
                          className="bg-[#4F8BFF] dark:bg-[#5B94FF] h-2 rounded-full"
                          style={{
                            width: `${(trend.consumption / 15000) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-[#ECFDF5] dark:bg-[#064E3B] rounded-full h-2">
                        <div
                          className="bg-[#10B981] dark:bg-[#34D399] h-2 rounded-full"
                          style={{
                            width: `${(trend.purchases / 15000) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#4F8BFF] dark:text-[#5B94FF]">
                  C: {formatCurrency(trend.consumption)}
                </div>
                <div className="text-xs text-[#10B981] dark:text-[#34D399]">
                  P: {formatCurrency(trend.purchases)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
