import React from "react";
import { Plus, Upload, Download } from "lucide-react";

export function PageHeader({ onCreateClick, onImportClick, onExportClick }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
          Purchase Orders
        </h1>
        <p className="text-[#536081] dark:text-[#A0A0A0] mt-1">
          Manage purchase orders and supplier transactions
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onImportClick}
          className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Upload size={16} />
          Import
        </button>
        
        <button
          onClick={onExportClick}
          className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
        >
          <Download size={16} />
          Export
        </button>
        
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3B7EFF] dark:hover:bg-[#4A85FF] transition-colors"
        >
          <Plus size={16} />
          Create Order
        </button>
      </div>
    </div>
  );
}