import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Briefcase,
  TrendingUp,
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
  Sparkles,
  Settings,
  FileText,
  Package,
  UserPlus,
  PlusCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: false,
    accounts: false,
    hr: false,
    reports: false,
    pos: false,
    inventory: false,
    settings: false,
  });

  // Fetch dashboard stats
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      return response.json();
    },
    enabled: !!user
  });

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
      active: true,
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
        { label: "Customer Reports", href: "/customers/reports" }
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
        { label: "Transactions", href: "/payments/transactions" },
        { label: "Account Summary", href: "/accounts/summary" }
      ]
    },
    {
      icon: Briefcase,
      label: "Human Resources",
      active: false,
      hasChildren: true,
      key: "hr",
      children: [
        { label: "Staff Management", href: "/hr/staff" },
        { label: "Role Permissions", href: "/hr/roles" },
        { label: "Attendance", href: "/hr/attendance" }
      ]
    },
    {
      icon: ShoppingCart,
      label: "POS Management",
      active: false,
      hasChildren: true,
      key: "pos",
      children: [
        { label: "Menu Items", href: "/pos/menu" },
        { label: "Orders", href: "/pos/orders" },
        { label: "Categories", href: "/pos/categories" }
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
      active: false,
      hasChildren: true,
      key: "reports",
      children: [
        { label: "Booking Reports", href: "/reports/bookings" },
        { label: "Revenue Reports", href: "/reports/revenue" },
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

  const stats = dashboardStats || {
    todayBookings: 0,
    totalCustomers: 0,
    totalAmount: 0,
    totalBookings: 0,
    occupancyRate: 0,
    availableRooms: 0,
    recentBookings: []
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
                      className="w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
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
                placeholder="Search bookings, customers..."
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

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
              Dashboard
            </h1>
            <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
              Welcome back! Here's what's happening at your hotel today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Today's Bookings</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : stats.todayBookings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <CalendarClock size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Customers</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : stats.totalCustomers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#EAF9F0] dark:bg-[#0A2A1A] rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-[#0E9250] dark:text-[#4ADE80]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Revenue Today</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    ${statsLoading ? '...' : (stats.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#FFF3E0] dark:bg-[#332211] rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-[#FF8A48] dark:text-[#FFA366]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Occupancy Rate</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : `${stats.occupancyRate || 0}%`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#F3E8FF] dark:bg-[#2A1A33] rounded-lg flex items-center justify-center">
                  <BedDouble size={24} className="text-[#8B5CF6] dark:text-[#A78BFA]" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
                <h3 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-bold text-lg">
                  Recent Bookings
                </h3>
              </div>
              <div className="p-6">
                {statsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-[#F5F7FB] dark:bg-[#333333] h-10 w-10"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-3/4"></div>
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : stats.recentBookings?.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentBookings.map((booking, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 hover:bg-[#F7F9FC] dark:hover:bg-[#262626] rounded-lg transition-colors">
                        <div className="w-10 h-10 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center">
                          <BedDouble size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#07111F] dark:text-[#E5E5E5] font-medium">
                            {booking.customer_name || 'Guest'}
                          </p>
                          <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm">
                            Room {booking.room_number} • ${booking.total_amount}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.booking_status === 'confirmed' 
                            ? 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]'
                            : 'bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]'
                        }`}>
                          {booking.booking_status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarClock size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                    <p className="text-[#8A94A7] dark:text-[#A0A0A0]">No recent bookings</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
                <h3 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-bold text-lg">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <a
                  href="/rooms/reservations/new"
                  className="flex flex-col items-center p-4 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg hover:bg-[#E8F0FF] dark:hover:bg-[#333333] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <PlusCircle size={24} className="text-white" />
                  </div>
                  <span className="text-[#07111F] dark:text-[#E5E5E5] font-medium text-sm text-center">
                    New Booking
                  </span>
                </a>

                <a
                  href="/customers/new"
                  className="flex flex-col items-center p-4 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg hover:bg-[#EAF9F0] dark:hover:bg-[#0A2A1A] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#0E9250] dark:bg-[#4ADE80] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus size={24} className="text-white" />
                  </div>
                  <span className="text-[#07111F] dark:text-[#E5E5E5] font-medium text-sm text-center">
                    Add Customer
                  </span>
                </a>

                <a
                  href="/housekeeping"
                  className="flex flex-col items-center p-4 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg hover:bg-[#FFF3E0] dark:hover:bg-[#332211] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#FF8A48] dark:bg-[#FFA366] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <span className="text-[#07111F] dark:text-[#E5E5E5] font-medium text-sm text-center">
                    Housekeeping
                  </span>
                </a>

                <a
                  href="/reports"
                  className="flex flex-col items-center p-4 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg hover:bg-[#F3E8FF] dark:hover:bg-[#2A1A33] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#8B5CF6] dark:bg-[#A78BFA] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={24} className="text-white" />
                  </div>
                  <span className="text-[#07111F] dark:text-[#E5E5E5] font-medium text-sm text-center">
                    Reports
                  </span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}