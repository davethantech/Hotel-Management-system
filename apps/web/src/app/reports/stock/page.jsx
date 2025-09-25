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
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  MoreVertical,
  TrendingUp,
  ShoppingBag,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Star,
  CreditCard,
  UserCheck,
  UserX,
  AlertTriangle,
  TrendingDown,
  Box,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function StockReportsPage() {
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
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('month');

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
        { label: "Revenue Reports", href: "/reports/revenue" },
        { label: "Stock Reports", href: "/reports/stock", active: true },
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

  // Mock data for stock analytics
  const mockAnalytics = {
    totalItems: 342,
    lowStockItemsCount: 23,
    outOfStockItems: 8,
    totalValue: 45670,
    monthlyConsumption: 12450,
    topCategories: [
      { category: "Housekeeping", items: 89, value: 15420, percentage: 33.8 },
      { category: "Food & Beverage", items: 76, value: 12890, percentage: 28.2 },
      { category: "Maintenance", items: 54, value: 8760, percentage: 19.2 },
      { category: "Office Supplies", items: 43, value: 5230, percentage: 11.4 },
      { category: "Guest Amenities", items: 80, value: 3370, percentage: 7.4 }
    ],
    lowStockItems: [
      { name: "Toilet Paper", category: "Housekeeping", current: 15, minimum: 50, unit: "rolls" },
      { name: "Coffee Beans", category: "Food & Beverage", current: 8, minimum: 25, unit: "kg" },
      { name: "Towels", category: "Housekeeping", current: 12, minimum: 30, unit: "pieces" },
      { name: "Cleaning Spray", category: "Housekeeping", current: 5, minimum: 20, unit: "bottles" },
      { name: "Printer Paper", category: "Office Supplies", current: 3, minimum: 15, unit: "reams" }
    ],
    monthlyTrends: [
      { month: "Jan", consumption: 11200, purchases: 15600, value: 42000 },
      { month: "Feb", consumption: 10800, purchases: 12400, value: 43600 },
      { month: "Mar", consumption: 12100, purchases: 14200, value: 45800 },
      { month: "Apr", consumption: 11900, purchases: 13800, value: 47200 },
      { month: "May", consumption: 12450, purchases: 15200, value: 45670 },
      { month: "Jun", consumption: 11750, purchases: 14600, value: 46800 }
    ],
    recentTransactions: [
      { id: "TXN-001", type: "Purchase", item: "Bed Sheets", quantity: 50, amount: 1250, date: "2024-06-15" },
      { id: "TXN-002", type: "Consumption", item: "Shampoo", quantity: -25, amount: -375, date: "2024-06-14" },
      { id: "TXN-003", type: "Purchase", item: "Kitchen Utensils", quantity: 30, amount: 890, date: "2024-06-13" },
      { id: "TXN-004", type: "Consumption", item: "Toilet Paper", quantity: -40, amount: -120, date: "2024-06-12" },
      { id: "TXN-005", type: "Purchase", item: "Cleaning Supplies", quantity: 75, amount: 2250, date: "2024-06-11" }
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
                placeholder="Search inventory..."
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Items</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatNumber(mockAnalytics.totalItems)}</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+5%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Low Stock Items</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAnalytics.lowStockItemsCount}</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <AlertTriangle size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#F59E0B] dark:text-[#FCD34D] text-sm font-medium">Needs attention</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Out of Stock</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAnalytics.outOfStockItems}</p>
                </div>
                <div className="w-12 h-12 bg-[#FEE2E2] dark:bg-[#7F1D1D] rounded-lg flex items-center justify-center">
                  <XCircle size={24} className="text-[#EF4444] dark:text-[#F87171]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#EF4444] dark:text-[#F87171] text-sm font-medium">Urgent restock</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Value</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{formatCurrency(mockAnalytics.totalValue)}</p>
                </div>
                <div className="w-12 h-12 bg-[#DBEAFE] dark:bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-[#3B82F6] dark:text-[#60A5FA]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+3%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Stock by Category
                </h2>
                <PieChart size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-4">
                {mockAnalytics.topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === 0 ? 'bg-[#4F8BFF]' :
                        index === 1 ? 'bg-[#10B981]' :
                        index === 2 ? 'bg-[#F59E0B]' :
                        index === 3 ? 'bg-[#EF4444]' : 'bg-[#8B5CF6]'
                      }`}></div>
                      <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">{category.items} items</div>
                      <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">{formatCurrency(category.value)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Monthly Consumption vs Purchases
                </h2>
                <BarChart3 size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-3">
                {mockAnalytics.monthlyTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] w-8">{trend.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="flex space-x-1">
                          <div className="flex-1">
                            <div className="w-full bg-[#F1F5FF] dark:bg-[#1A2332] rounded-full h-2">
                              <div 
                                className="bg-[#4F8BFF] dark:bg-[#5B94FF] h-2 rounded-full" 
                                style={{ width: `${(trend.consumption / 15000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-[#ECFDF5] dark:bg-[#064E3B] rounded-full h-2">
                              <div 
                                className="bg-[#10B981] dark:bg-[#34D399] h-2 rounded-full" 
                                style={{ width: `${(trend.purchases / 15000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#4F8BFF] dark:text-[#5B94FF]">C: {formatCurrency(trend.consumption)}</div>
                      <div className="text-xs text-[#10B981] dark:text-[#34D399]">P: {formatCurrency(trend.purchases)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Low Stock Alert
                </h2>
                <AlertTriangle size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Minimum Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                  {mockAnalytics.lowStockItems.map((item, index) => (
                    <tr key={index} className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#F59E0B] dark:bg-[#92400E] rounded-full flex items-center justify-center">
                            <Box size={20} className="text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {item.current} {item.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {item.minimum} {item.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF3C7] dark:bg-[#451A03] text-[#92400E] dark:text-[#FCD34D]">
                          Low Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Recent Stock Transactions
                </h2>
                <Activity size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                  {mockAnalytics.recentTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {transaction.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'Purchase' 
                            ? 'bg-[#ECFDF5] dark:bg-[#064E3B] text-[#065F46] dark:text-[#34D399]'
                            : 'bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#991B1B] dark:text-[#F87171]'
                        }`}>
                          {transaction.type === 'Purchase' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {transaction.item}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          transaction.quantity > 0 
                            ? 'text-[#10B981] dark:text-[#34D399]' 
                            : 'text-[#EF4444] dark:text-[#F87171]'
                        }`}>
                          {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          transaction.amount > 0 
                            ? 'text-[#10B981] dark:text-[#34D399]' 
                            : 'text-[#EF4444] dark:text-[#F87171]'
                        }`}>
                          {formatCurrency(Math.abs(transaction.amount))}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center mr-3">
                  <Truck size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Monthly Consumption
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                {formatCurrency(mockAnalytics.monthlyConsumption)}
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Average monthly inventory consumption
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle size={20} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Stock Turnover
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                3.2x
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Average inventory turnover rate per year
              </p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center mr-3">
                  <Clock size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Reorder Time
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#07111F] dark:text-[#E5E5E5] mb-2">
                5-7 days
              </p>
              <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Average time to restock low inventory items
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}