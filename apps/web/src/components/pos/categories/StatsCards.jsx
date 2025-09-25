import React from "react";
import { Tag, CheckCircle, XCircle, Grid3X3 } from "lucide-react";

function StatCard({ icon: Icon, label, value, iconBgColor, iconColor, isLoading }) {
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">
            {label}
          </p>
          <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">
            {isLoading ? "..." : value}
          </p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}


export function StatsCards({ stats, isLoading }) {
  const mockStats = {
    totalCategories: 5,
    activeCategories: 4,
    inactiveCategories: 1,
    totalMenuItems: 65,
  };

  const currentStats = stats || mockStats;

  const cardData = [
    {
      label: "Total Categories",
      value: currentStats.totalCategories,
      icon: Tag,
      iconBgColor: "bg-[#E8F0FF] dark:bg-[#1A2332]",
      iconColor: "text-[#4F8BFF] dark:text-[#5B94FF]",
    },
    {
      label: "Active Categories",
      value: currentStats.activeCategories,
      icon: CheckCircle,
      iconBgColor: "bg-[#ECFDF5] dark:bg-[#064E3B]",
      iconColor: "text-[#10B981] dark:text-[#34D399]",
    },
    {
      label: "Inactive Categories",
      value: currentStats.inactiveCategories,
      icon: XCircle,
      iconBgColor: "bg-[#FFEDED] dark:bg-[#331111]",
      iconColor: "text-[#E12929] dark:text-[#FF6B6B]",
    },
    {
      label: "Total Menu Items",
      value: currentStats.totalMenuItems,
      icon: Grid3X3,
      iconBgColor: "bg-[#FEF3C7] dark:bg-[#451A03]",
      iconColor: "text-[#F59E0B] dark:text-[#FCD34D]",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cardData.map((card, index) => (
        <StatCard
          key={index}
          label={card.label}
          value={card.value}
          icon={card.icon}
          iconBgColor={card.iconBgColor}
          iconColor={card.iconColor}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
