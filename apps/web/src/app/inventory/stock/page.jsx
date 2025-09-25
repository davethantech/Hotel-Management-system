"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Upload, AlertTriangle } from "lucide-react";
import { StatsCards } from "@/components/inventory/stock/StatsCards";
import { FiltersPanel } from "@/components/inventory/stock/FiltersPanel";
import { StockTable } from "@/components/inventory/stock/StockTable";
import { CreateItemModal } from "@/components/inventory/stock/CreateItemModal";
import { PageHeader } from "@/components/inventory/stock/PageHeader";

export default function StockManagementPage() {
  const [stockItems, setStockItems] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    lowStock: false,
  });

  // Fetch stock items
  const fetchStockItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/inventory/stock");
      if (!response.ok) {
        throw new Error("Failed to fetch stock items");
      }
      const data = await response.json();
      setStockItems(data);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/inventory/stock/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStockItems();
    fetchStats();
  }, []);

  const handleCreateItem = async (itemData) => {
    try {
      const response = await fetch("/api/inventory/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      await fetchStockItems();
      await fetchStats();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleUpdateStock = async (itemId, newStock) => {
    try {
      const response = await fetch(`/api/inventory/stock/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ current_stock: newStock }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      await fetchStockItems();
      await fetchStats();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/inventory/stock/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      await fetchStockItems();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.item_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      item.item_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || item.category_name === filters.category;
    const matchesStatus = !filters.status || 
      (filters.status === "in_stock" && item.current_stock > item.minimum_stock) ||
      (filters.status === "low_stock" && item.current_stock <= item.minimum_stock && item.current_stock > 0) ||
      (filters.status === "out_of_stock" && item.current_stock === 0);
    
    const matchesLowStock = !filters.lowStock || item.current_stock <= item.minimum_stock;

    return matchesSearch && matchesCategory && matchesStatus && matchesLowStock;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0F0F0F] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <PageHeader 
          onCreateClick={() => setShowCreateModal(true)}
          onImportClick={() => {/* Handle import */}}
          onExportClick={() => {/* Handle export */}}
        />

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Search and Filters */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" size={20} />
                <input
                  type="text"
                  placeholder="Search items by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg bg-white dark:bg-[#262626] text-[#07111F] dark:text-[#E5E5E5] placeholder-[#8A94A7] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Low Stock Alert */}
          {stats.lowStockItems > 0 && (
            <div className="mt-4 p-4 bg-[#FEF3C7] dark:bg-[#451A03] border border-[#F59E0B] dark:border-[#92400E] rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                <span className="text-[#92400E] dark:text-[#FCD34D] font-medium">
                  {stats.lowStockItems} items are running low on stock
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <FiltersPanel 
            filters={filters}
            onFiltersChange={setFilters}
            categories={[...new Set(stockItems.map(item => item.category_name).filter(Boolean))]}
          />
        )}

        {/* Stock Table */}
        <StockTable 
          stockItems={filteredItems}
          isLoading={isLoading}
          onUpdateStock={handleUpdateStock}
          onDelete={handleDeleteItem}
        />

        {/* Create Item Modal */}
        {showCreateModal && (
          <CreateItemModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateItem}
            categories={[...new Set(stockItems.map(item => item.category_name).filter(Boolean))]}
          />
        )}
      </div>
    </div>
  );
}