import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  ChevronDown,
  Search,
  Inbox,
  Bell,
  LogOut,
  Menu,
  X,
  Hotel,
  BedDouble,
  ShoppingCart,
  Settings,
  FileText,
  Package,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  CreditCard,
  Receipt,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Users2,
  Banknote,
  Percent
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function RevenueReportsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: false,
    accounts: false,
    hr: false,
    reports: true,
    pos: false,
    inventory: false,
    settings: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const queryClient = useQueryClient();

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: false,
      hasChildren: false,
      href: "/"
    },
    {
      icon: BedDouble,
      label: "Room Management",
      active: false,
      hasChildren: true,
      key: "rooms",
      children: [
        { label: "Room Reservation", href: "/rooms/reservations" },
        { label: "Room Facilities", href: "/rooms/facilities" },
        { label: "Room Settings", href: "/rooms/settings" },
        { label: "Housekeeping", href: "/housekeeping" }
      ]
    },
    {
      icon: Users,
      label: "Customer Management",
      active: false,
      hasChildren: true,
      key: "customers",
      children: [
        { label: "Customer List", href: "/customers" },
        { label: "Customer Reports", href: "/customer-reports" }
      ]
    },
    {
      icon: DollarSign,
      label: "Accounts & Finance",
      active: false,
      hasChildren: true,
      key: "accounts",
      children: [
        { label: "Payment Settings", href: "/payments/settings" },
        { label: "Transactions", href: "/transactions" },
        { label: "Account Summary", href: "/account-summary" }
      ]
    },
    {
      icon: Briefcase,
      label: "Human Resources",
      active: false,
      hasChildren: true,
      key: "hr",
      children: [
        { label: "Staff Management", href: "/human-resources/staff-management" },
        { label: "Role Permissions", href: "/human-resources/role-permissions" },
        { label: "Attendance", href: "/human-resources/attendance" }
      ]
    },
    {
      icon: ShoppingCart,
      label: "POS Management",
      active: false,
      hasChildren: true,
      key: "pos",
      children: [
        { label: "Menu Items", href: "/pos-management/menu-items" },
        { label: "Orders", href: "/pos-management/orders" },
        { label: "Categories", href: "/pos-management/categories" }
      ]
    },
    {
      icon: Package,
      label: "Inventory",
      active: false,
      hasChildren: true,
      key: "inventory",
      children: [
        { label: "Stock Management", href: "/inventory/stock" },
        { label: "Purchase Orders", href: "/inventory/purchase" },
        { label: "Suppliers", href: "/inventory/suppliers" }
      ]
    },
    {
      icon: FileText,
      label: "Reports",
      active: true,
      hasChildren: true,
      key: "reports",
      children: [
        { label: "Booking Reports", href: "/reports/bookings" },
        { label: "Revenue Reports", href: "/reports/revenue", active: true },
        { label: "Stock Reports", href: "/reports/stock" },
        { label: "Customer Reports", href: "/reports/customers" }
      ]
    }
  ];

  const bottomMenuItems = [
    {
      icon: Settings,
      label: "Settings",
      hasChildren: true,
      key: "settings",
      children: [
        { label: "Application Settings", href: "/settings/app" },
        { label: "Web Settings", href: "/settings/web" },
        { label: "Language Settings", href: "/settings/language" }
      ]
    },
    { icon: LogOut, label: "Log Out", isLogout: true, href: "/account/logout" },
  ];

  // Mock data for revenue analytics
  const mockRevenueData = {
    totalRevenue: 284750,
    monthlyGrowth: 12.5,
    averageBookingValue: 385,
    totalBookings: 740,
    occupancyRate: 78.5,
    revenuePerRoom: 1250,
    monthlyRevenue: [
      { month: "Jan", revenue: 45000, bookings: 120, avgValue: 375, occupancy: 72 },
      { month: "Feb", revenue: 52000, bookings: 140, avgValue: 371, occupancy: 75 },
      { month: "Mar", revenue: 48000, bookings: 135, avgValue: 356, occupancy: 73 },
      { month: "Apr", revenue: 61000, bookings: 165, avgValue: 370, occupancy: 80 },
      { month: "May", revenue: 55000, bookings: 150, avgValue: 367, occupancy: 77 },
      { month: "Jun", revenue: 67000, bookings: 180, avgValue: 372, occupancy: 82 },
      { month: "Jul", revenue: 73000, bookings: 195, avgValue: 374, occupancy: 85 },
      { month: "Aug", revenue: 68000, bookings: 185, avgValue: 368, occupancy: 83 },
      { month: "Sep", revenue: 58000, bookings: 160, avgValue: 363, occupancy: 78 },
      { month: "Oct", revenue: 64000, bookings: 175, avgValue: 366, occupancy: 79 },
      { month: "Nov", revenue: 59000, bookings: 165, avgValue: 358, occupancy: 76 },
      { month: "Dec", revenue: 76000, bookings: 200, avgValue: 380, occupancy: 87 }
    ],
    revenueBySource: [
      { source: "Room Bookings", amount: 198250, percentage: 69.6, growth: 8.2 },
      { source: "Food & Beverage", amount: 51640, percentage: 18.1, growth: 15.3 },
      { source: "Spa & Wellness", amount: 19950, percentage: 7.0, growth: 22.1 },
      { source: "Events & Conferences", amount: 11400, percentage: 4.0, growth: -5.2 },
      { source: "Other Services", amount: 3510, percentage: 1.2, growth: 12.8 }
    ],
    topPerformingRooms: [
      { roomType: "Presidential Suite", revenue: 45600, bookings: 24, avgRate: 1900, occupancy: 92 },
      { roomType: "Executive Suite", revenue: 38400, bookings: 48, avgRate: 800, occupancy: 85 },
      { roomType: "Deluxe Room", revenue: 67200, bookings: 168, avgRate: 400, occupancy: 78 },
      { roomType: "Standard Room", revenue: 52800, bookings: 176, avgRate: 300, occupancy: 72 },
      { roomType: "Family Suite", revenue: 28800, bookings: 36, avgRate: 800, occupancy: 68 }
    ],
    dailyRevenue: [
      { date: "2024-09-01", revenue: 2850, bookings: 8 },
      { date: "2024-09-02", revenue: 3200, bookings: 9 },
      { date: "2024-09-03", revenue: 2950, bookings: 7 },
      { date: "2024-09-04", revenue: 3450, bookings: 10 },
      { date: "2024-09-05", revenue: 3100, bookings: 8 },
      { date: "2024-09-06", revenue: 3800, bookings: 12 },
      { date: "2024-09-07", revenue: 4200, bookings: 14 },
      { date: "2024-09-08", revenue: 3650, bookings: 11 },
      { date: "2024-09-09", revenue: 3300, bookings: 9 },
      { date: "2024-09-10", revenue: 3750, bookings: 10 }
    ],
    paymentMethods: [
      { method: "Credit Card", amount: 199320, percentage: 70.0 },
      { method: "Cash", amount: 56950, percentage: 20.0 },
      { method: "Bank Transfer", amount: 19980, percentage: 7.0 },
      { method: "Digital Wallet", amount: 8500, percentage: 3.0 }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F8BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8A94A7] dark:text-[#A0A0A0]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <Hotel size={64} className="text-[#4F8BFF] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-4">
            Welcome to Urbane Hospitium
          </h1>
          <p className="text-[#8A94A7] dark:text-[#A0A0A0] mb-6">
            Please sign in to access the Hotel Management System
          </p>
          <a
            href="/account/signin"
            className="inline-flex items-center px-6 py-3 bg-[#4F8BFF] text-white rounded-lg hover:bg-[#3D6FE5] transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] font-['Nanum_Gothic']">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-[#1E1E1E] border-r border-[#EDF0F4] dark:border-[#333333] z-50 transition-all duration-300 ease-in-out w-60 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[#EDF0F4] dark:border-[#333333] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-lg flex items-center justify-center">
              <Hotel size={20} className="text-white" />
            </div>
            <div>
              <span className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-lg">
                Urbane Hospitium
              </span>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-xs">HMS</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto md:hidden p-1 rounded hover:bg-[#F5F7FB] dark:hover:bg-[#333333] active:bg-[#E8F0FF] dark:active:bg-[#404040] transition-colors"
          >
            <X size={24} className="text-[#536081] dark:text-[#A0A0A0]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.hasChildren ? toggleMenu(item.key) : (item.href && (window.location.href = item.href))}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? "bg-[#4F8BFF] dark:bg-[#5B94FF] text-white"
                    : "text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasChildren && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      expandedMenus[item.key] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.hasChildren && expandedMenus[item.key] && item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={child.href}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                        child.active
                          ? "bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF] font-medium"
                          : "text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                      }`}
                    >
                      <span className="ml-4">{child.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-[#EDF0F4] dark:border-[#333333] p-3 space-y-1 flex-shrink-0">
          {bottomMenuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  if (item.hasChildren) {
                    toggleMenu(item.key);
                  } else if (item.href) {
                    window.location.href = item.href;
                  }
                }}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  item.isLogout
                    ? "text-[#E12929] dark:text-[#FF6B6B] hover:bg-[#FFEDED] dark:hover:bg-[#331111]"
                    : "text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                }`}
              >
                {item.icon && <item.icon size={20} className="mr-3" />}
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasChildren && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      expandedMenus[item.key] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              
              {item.hasChildren && expandedMenus[item.key] && item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <a
                      key={childIndex}
                      href={child.href}
                      className="w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                    >
                      <span className="ml-4">{child.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-60">
        {/* Top Bar */}
        <header
          className="h-16 bg-white dark:bg-[#1E1E1E] border-b border-[#EDF0F4] dark:border-[#333333] flex items-center justify-between px-4 md:px-6 sticky top-0 z-30"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1 rounded hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
            >
              <Menu size={24} className="text-[#536081] dark:text-[#A0A0A0]" />
            </button>

            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#808080]"
              />
              <input
                type="text"
                placeholder="Search revenue data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 sm:w-64 md:w-72 pl-10 pr-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#8A94A7] dark:text-[#B0B0B0] placeholder-[#8A94A7] dark:placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="relative p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
              <Inbox size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E12929] dark:bg-[#FF6B6B] rounded-full"></span>
            </button>
            <button className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
              <Bell size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                Revenue Reports
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Comprehensive revenue analytics and financial performance insights
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Revenue</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatCurrency(mockRevenueData.totalRevenue)}</p>
                </div>
                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight size={16} className="text-[#10B981] dark:text-[#34D399] mr-1" />
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+{formatPercentage(mockRevenueData.monthlyGrowth)}</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Avg Booking Value</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatCurrency(mockRevenueData.averageBookingValue)}</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Receipt size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight size={16} className="text-[#10B981] dark:text-[#34D399] mr-1" />
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+2.1%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Bookings</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatNumber(mockRevenueData.totalBookings)}</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight size={16} className="text-[#10B981] dark:text-[#34D399] mr-1" />
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+8.3%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Occupancy Rate</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatPercentage(mockRevenueData.occupancyRate)}</p>
                </div>
                <div className="w-12 h-12 bg-[#F3E8FF] dark:bg-[#581C87] rounded-lg flex items-center justify-center">
                  <Percent size={24} className="text-[#8B5CF6] dark:text-[#C4B5FD]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowUpRight size={16} className="text-[#10B981] dark:text-[#34D399] mr-1" />
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+3.2%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg">
                  <TrendingUp size={20} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Monthly Revenue Trends
                  </h3>
                  <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                    Revenue performance over the past 12 months
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#10B981] dark:bg-[#34D399] rounded-full"></div>
                  <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full"></div>
                  <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Bookings</span>
                </div>
              </div>
            </div>

            <div className="h-80 flex items-end justify-between space-x-2">
              {mockRevenueData.monthlyRevenue.map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center space-y-1 mb-2">
                    <div className="w-full bg-[#F1F5FF] dark:bg-[#1A2332] rounded-t">
                      <div 
                        className="bg-[#10B981] dark:bg-[#34D399] rounded-t transition-all duration-300 hover:opacity-80"
                        style={{ height: `${(month.revenue / 80000) * 200}px`, minHeight: '4px' }}
                      ></div>
                    </div>
                    <div className="w-3/4 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-t">
                      <div 
                        className="bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-t transition-all duration-300 hover:opacity-80"
                        style={{ height: `${(month.bookings / 200) * 100}px`, minHeight: '2px' }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] font-medium">
                    {month.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#EDF0F4] dark:border-[#333333]">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                  {formatCurrency(mockRevenueData.monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0))}
                </div>
                <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                  {formatNumber(mockRevenueData.monthlyRevenue.reduce((sum, month) => sum + month.bookings, 0))}
                </div>
                <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
                  {formatPercentage(mockRevenueData.monthlyRevenue.reduce((sum, month) => sum + month.occupancy, 0) / mockRevenueData.monthlyRevenue.length)}
                </div>
                <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Avg. Occupancy</div>
              </div>
            </div>
          </div>

          {/* Revenue Sources and Room Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue by Source */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Revenue by Source
                </h2>
                <PieChart size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-4">
                {mockRevenueData.revenueBySource.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === 0 ? 'bg-[#10B981]' :
                        index === 1 ? 'bg-[#4F8BFF]' :
                        index === 2 ? 'bg-[#F59E0B]' :
                        index === 3 ? 'bg-[#EF4444]' : 'bg-[#8B5CF6]'
                      }`}></div>
                      <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {formatCurrency(source.amount)}
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mr-2">
                          {formatPercentage(source.percentage)}
                        </span>
                        {source.growth > 0 ? (
                          <span className="text-xs text-[#10B981] dark:text-[#34D399]">
                            +{formatPercentage(source.growth)}
                          </span>
                        ) : (
                          <span className="text-xs text-[#EF4444] dark:text-[#F87171]">
                            {formatPercentage(source.growth)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Rooms */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Top Performing Rooms
                </h2>
                <Target size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-4">
                {mockRevenueData.topPerformingRooms.map((room, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-lg flex items-center justify-center mr-3">
                        <BedDouble size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {room.roomType}
                        </div>
                        <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                          {room.bookings} bookings • {formatPercentage(room.occupancy)} occupancy
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {formatCurrency(room.revenue)}
                      </div>
                      <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                        {formatCurrency(room.avgRate)} avg rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Payment Methods
                </h2>
                <CreditCard size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRevenueData.paymentMethods.map((method, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-[#E8F0FF] dark:bg-[#1A2332]' :
                      index === 1 ? 'bg-[#ECFDF5] dark:bg-[#064E3B]' :
                      index === 2 ? 'bg-[#FEF3C7] dark:bg-[#451A03]' : 'bg-[#F3E8FF] dark:bg-[#581C87]'
                    }`}>
                      {index === 0 && <CreditCard size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />}
                      {index === 1 && <Banknote size={24} className="text-[#10B981] dark:text-[#34D399]" />}
                      {index === 2 && <Activity size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />}
                      {index === 3 && <Users2 size={24} className="text-[#8B5CF6] dark:text-[#C4B5FD]" />}
                    </div>
                    <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-1">
                      {method.method}
                    </h3>
                    <p className="text-lg font-bold text-[#07111F] dark:text-[#E5E5E5] mb-1">
                      {formatCurrency(method.amount)}
                    </p>
                    <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                      {formatPercentage(method.percentage)} of total
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center mr-3">
                  <DollarSign size={20} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Revenue per Room
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                {formatCurrency(mockRevenueData.revenuePerRoom)}
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Average monthly revenue per available room
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Growth Rate
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                +{formatPercentage(mockRevenueData.monthlyGrowth)}
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Month-over-month revenue growth rate
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center mr-3">
                  <Calendar size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Booking Conversion
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                85.2%
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Percentage of inquiries converted to bookings
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}