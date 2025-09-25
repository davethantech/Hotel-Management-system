import React from "react";
import { Download, BarChart3, Calendar, TrendingUp } from "lucide-react";

export function PageHeader({ onExportClick, onGenerateClick }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
          <BarChart3 size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            Booking Reports
          </h1>
          <p className="text-[#536081] dark:text-[#A0A0A0] mt-1">
            Analyze booking trends, revenue, and performance metrics
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onExportClick('pdf')}
          className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Download size={16} />
          Export PDF
        </button>
        
        <button
          onClick={() => onExportClick('excel')}
          className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Download size={16} />
          Export Excel
        </button>
        
        <button
          onClick={onGenerateClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3B7EFF] dark:hover:bg-[#4A85FF] transition-colors"
        >
          <TrendingUp size={16} />
          Generate Report
        </button>
      </div>
    </div>
  );
}