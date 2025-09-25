"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Upload, AlertTriangle } from "lucide-react";
import { StatsCards } from "@/components/inventory/suppliers/StatsCards";
import { FiltersPanel } from "@/components/inventory/suppliers/FiltersPanel";
import { SuppliersTable } from "@/components/inventory/suppliers/SuppliersTable";
import { CreateSupplierModal } from "@/components/inventory/suppliers/CreateSupplierModal";
import { PageHeader } from "@/components/inventory/suppliers/PageHeader";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    location: "",
  });

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/inventory/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/inventory/suppliers/stats");
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
    fetchSuppliers();
    fetchStats();
  }, []);

  const handleCreateSupplier = async (supplierData) => {
    try {
      const response = await fetch("/api/inventory/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierData),
      });

      if (!response.ok) {
        throw new Error("Failed to create supplier");
      }

      await fetchSuppliers();
      await fetchStats();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  const handleUpdateStatus = async (supplierId, newStatus) => {
    try {
      const response = await fetch(`/api/inventory/suppliers/${supplierId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchSuppliers();
      await fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (!confirm("Are you sure you want to delete this supplier?")) {
      return;
    }

    try {
      const response = await fetch(`/api/inventory/suppliers/${supplierId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete supplier");
      }

      await fetchSuppliers();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.company_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      supplier.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || supplier.category === filters.category;
    const matchesStatus = !filters.status || supplier.status === filters.status;
    const matchesLocation = !filters.location || supplier.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
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
                  placeholder="Search by company, contact, or email..."
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

          {/* Inactive Suppliers Alert */}
          {stats.inactiveSuppliers > 0 && (
            <div className="mt-4 p-4 bg-[#FEF3C7] dark:bg-[#451A03] border border-[#F59E0B] dark:border-[#92400E] rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                <span className="text-[#92400E] dark:text-[#FCD34D] font-medium">
                  {stats.inactiveSuppliers} suppliers are currently inactive
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
            categories={[...new Set(suppliers.map(supplier => supplier.category).filter(Boolean))]}
            locations={[...new Set(suppliers.map(supplier => supplier.location).filter(Boolean))]}
          />
        )}

        {/* Suppliers Table */}
        <SuppliersTable 
          suppliers={filteredSuppliers}
          isLoading={isLoading}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteSupplier}
        />

        {/* Create Supplier Modal */}
        {showCreateModal && (
          <CreateSupplierModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateSupplier}
          />
        )}
      </div>
    </div>
  );
}