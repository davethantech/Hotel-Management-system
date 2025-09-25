import { Download } from "lucide-react";

export default function PageHeader({ selectedDateRange, setSelectedDateRange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
          Stock Reports
        </h1>
        <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
          Comprehensive inventory analytics and stock management insights
        </p>
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        <select
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 3 Months</option>
          <option value="year">Last Year</option>
        </select>
        <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
          <Download size={16} className="mr-2" />
          Export
        </button>
      </div>
    </div>
  );
}
