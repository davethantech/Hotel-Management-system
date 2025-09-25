import React from "react";
import { Building2, Users, CheckCircle, XCircle } from "lucide-react";

function StatCard({ title, value, change, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]",
    red: "bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]",
    green: "bg-[#ECFDF5] dark:bg-[#064E3B] text-[#10B981] dark:text-[#34D399]",
    yellow: "bg-[#FEF3C7] dark:bg-[#451A03] text-[#F59E0B] dark:text-[#FCD34D]",
  };

  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#8A94A7] dark:text-[#A0A0A0] mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            {value || "0"}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${
              isPositive 
                ? "text-[#10B981] dark:text-[#34D399]" 
                : isNegative 
                ? "text-[#E12929] dark:text-[#FF6B6B]" 
                : "text-[#8A94A7] dark:text-[#A0A0A0]"
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <div key={index} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-24 mb-2"></div>
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-8 rounded w-16 mb-2"></div>
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-12"></div>
        </div>
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-12 w-12 rounded-lg"></div>
      </div>
    </div>
  ));
}

export function StatsCards({ stats = {}, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Suppliers"
        value={stats.totalSuppliers}
        change={stats.suppliersChange}
        icon={Building2}
        color="blue"
      />
      <StatCard
        title="Active Suppliers"
        value={stats.activeSuppliers}
        change={stats.activeChange}
        icon={CheckCircle}
        color="green"
      />
      <StatCard
        title="Inactive Suppliers"
        value={stats.inactiveSuppliers}
        change={stats.inactiveChange}
        icon={XCircle}
        color="red"
      />
      <StatCard
        title="New This Month"
        value={stats.newThisMonth}
        change={stats.newChange}
        icon={Users}
        color="yellow"
      />
    </div>
  );
}