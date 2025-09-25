"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Download, Filter, TrendingUp, Eye } from "lucide-react";
import { StatsCards } from "@/components/reports/bookings/StatsCards";
import { FiltersPanel } from "@/components/reports/bookings/FiltersPanel";
import { BookingsTable } from "@/components/reports/bookings/BookingsTable";
import { RevenueChart } from "@/components/reports/bookings/RevenueChart";
import { PageHeader } from "@/components/reports/bookings/PageHeader";

export default function BookingReportsPage() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    dateRange: "month",
    status: "",
    roomType: "",
    startDate: "",
    endDate: "",
  });

  // Fetch booking reports data
  const fetchBookingReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reports/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch booking reports");
      }
      const data = await response.json();
      setBookings(data.bookings || []);
      setStats(data.stats || {});
      setChartData(data.chartData || []);
    } catch (error) {
      console.error("Error fetching booking reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/reports/bookings/stats");
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
    fetchBookingReports();
    fetchStats();
  }, [filters]);

  const handleExportReport = async (format = 'pdf') => {
    try {
      const response = await fetch("/api/reports/bookings/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          format,
          filters,
          searchTerm 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to export report");
      }

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `booking-report-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting report:", error);
    }
  };

  const handleGenerateReport = async () => {
    // Refresh data with current filters
    await fetchBookingReports();
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.booking_id
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || booking.booking_status === filters.status;
    const matchesRoomType = !filters.roomType || booking.room_type === filters.roomType;

    return matchesSearch && matchesStatus && matchesRoomType;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0F0F0F] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <PageHeader 
          onExportClick={handleExportReport}
          onGenerateClick={handleGenerateReport}
        />

        {/* Stats Cards */}
        <StatsCards stats={stats} isLoading={isLoading} />

        {/* Revenue Chart */}
        <RevenueChart data={chartData} isLoading={isLoading} />

        {/* Search and Filters */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" size={20} />
                <input
                  type="text"
                  placeholder="Search by booking ID, customer, or room..."
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
              
              <button 
                onClick={() => handleExportReport('pdf')}
                className="flex items-center gap-2 px-4 py-2 border border-[#EDF0F4] dark:border-[#333333] rounded-lg text-[#536081] dark:text-[#A0A0A0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <Download size={16} />
                Export PDF
              </button>
              
              <button 
                onClick={() => handleExportReport('excel')}
                className="flex items-center gap-2 px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3B7EFF] dark:hover:bg-[#4A85FF] transition-colors"
              >
                <Download size={16} />
                Export Excel
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Bookings</div>
              <div className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                {filteredBookings.length}
              </div>
            </div>
            <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Revenue</div>
              <div className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                ${filteredBookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Avg. Booking Value</div>
              <div className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                ${filteredBookings.length > 0 ? 
                  (filteredBookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) / filteredBookings.length).toFixed(0) : 
                  '0'}
              </div>
            </div>
            <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Confirmed Bookings</div>
              <div className="text-xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                {filteredBookings.filter(b => b.booking_status === 'confirmed').length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <FiltersPanel 
            filters={filters}
            onFiltersChange={setFilters}
            roomTypes={[...new Set(bookings.map(booking => booking.room_type).filter(Boolean))]}
          />
        )}

        {/* Bookings Table */}
        <BookingsTable 
          bookings={filteredBookings}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}