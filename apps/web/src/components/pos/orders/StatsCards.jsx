import React from "react";
import { ShoppingCart, Clock, CheckCircle, DollarSign } from "lucide-react";

export function StatsCards({ stats, isLoading }) {
  const cards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-[#4F8BFF]",
      change: stats?.ordersChange || "+12%",
      changeType: "positive",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: "bg-[#FF8A4C]",
      change: stats?.pendingChange || "+5%",
      changeType: "neutral",
    },
    {
      title: "Completed Orders",
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      color: "bg-[#22C55E]",
      change: stats?.completedChange || "+18%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "bg-[#8B5CF6]",
      change: stats?.revenueChange || "+25%",
      changeType: "positive",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#1E1E1E] rounded-lg p-6 border border-[#E1E6ED] dark:border-[#333333] animate-pulse"
          >
            <div className="h-4 bg-[#F0F0F0] dark:bg-[#333333] rounded mb-2"></div>
            <div className="h-8 bg-[#F0F0F0] dark:bg-[#333333] rounded mb-2"></div>
            <div className="h-3 bg-[#F0F0F0] dark:bg-[#333333] rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-[#1E1E1E] rounded-lg p-6 border border-[#E1E6ED] dark:border-[#333333] hover:shadow-lg dark:hover:shadow-[#0A0A0A] transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <Icon size={20} className="text-white" />
              </div>
              <span
                className={`text-sm font-medium ${
                  card.changeType === "positive"
                    ? "text-[#22C55E]"
                    : card.changeType === "negative"
                    ? "text-[#EF4444]"
                    : "text-[#FF8A4C]"
                }`}
              >
                {card.change}
              </span>
            </div>
            <h3 className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}