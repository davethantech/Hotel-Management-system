"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Upload, AlertTriangle } from "lucide-react";
import { StatsCards } from "@/components/inventory/purchase/StatsCards";
import { FiltersPanel } from "@/components/inventory/purchase/FiltersPanel";
import { PurchaseTable } from "@/components/inventory/purchase/PurchaseTable";
import { CreatePurchaseModal } from "@/components/inventory/purchase/CreatePurchaseModal";
import { PageHeader } from "@/components/inventory/purchase/PageHeader";

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    supplier: "",
    status: "",
    dateRange: "",
  });

  // Fetch purchase orders
  const fetchPurchaseOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/inventory/purchase-orders");
      if (!response.ok) {
        throw new Error("Failed to fetch purchase orders");
      }
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/inventory/purchase-orders/stats");
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
    fetchPurchaseOrders();
    fetchStats();
  }, []);

  const handleCreatePurchaseOrder = async (orderData) => {
    try {
      const response = await fetch("/api/inventory/purchase-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create purchase order");
      }

      await fetchPurchaseOrders();
      await fetchStats();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/inventory/purchase-orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchPurchaseOrders();
      await fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this purchase order?")) {
      return;
    }

    try {
      const response = await fetch(`/api/inventory/purchase-orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete purchase order");
      }

      await fetchPurchaseOrders();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting purchase order:", error);
    }
  };

  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch = order.po_number
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      order.supplier_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSupplier = !filters.supplier || order.supplier_name === filters.supplier;
    const matchesStatus = !filters.status || order.status === filters.status;
    
    // Date range filtering would be implemented here
    const matchesDateRange = true;

    return matchesSearch && matchesSupplier && matchesStatus && matchesDateRange;
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
                  placeholder="Search by PO number or supplier..."
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

          {/* Pending Orders Alert */}
          {stats.pendingOrders > 0 && (
            <div className="mt-4 p-4 bg-[#FEF3C7] dark:bg-[#451A03] border border-[#F59E0B] dark:border-[#92400E] rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                <span className="text-[#92400E] dark:text-[#FCD34D] font-medium">
                  {stats.pendingOrders} purchase orders are pending approval
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
            suppliers={[...new Set(purchaseOrders.map(order => order.supplier_name).filter(Boolean))]}
          />
        )}

        {/* Purchase Orders Table */}
        <PurchaseTable 
          purchaseOrders={filteredOrders}
          isLoading={isLoading}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteOrder}
        />

        {/* Create Purchase Order Modal */}
        {showCreateModal && (
          <CreatePurchaseModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreatePurchaseOrder}
            suppliers={[...new Set(purchaseOrders.map(order => order.supplier_name).filter(Boolean))]}
          />
        )}
      </div>
    </div>
  );
}