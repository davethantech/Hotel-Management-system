import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export default function RecentTransactionsTable({ transactions }) {
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Recent Stock Transactions
          </h2>
          <Activity
            size={20}
            className="text-[#8A94A7] dark:text-[#A0A0A0]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {transactions.map(
              (transaction, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                      {transaction.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "Purchase"
                          ? "bg-[#ECFDF5] dark:bg-[#064E3B] text-[#065F46] dark:text-[#34D399]"
                          : "bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#991B1B] dark:text-[#F87171]"
                      }`}
                    >
                      {transaction.type === "Purchase" ? (
                        <TrendingUp size={12} className="mr-1" />
                      ) : (
                        <TrendingDown size={12} className="mr-1" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                      {transaction.item}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        transaction.quantity > 0
                          ? "text-[#10B981] dark:text-[#34D399]"
                          : "text-[#EF4444] dark:text-[#F87171]"
                      }`}
                    >
                      {transaction.quantity > 0 ? "+" : ""}
                      {transaction.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        transaction.amount > 0
                          ? "text-[#10B981] dark:text-[#34D399]"
                          : "text-[#EF4444] dark:text-[#F87171]"
                      }`}
                    >
                      {formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
