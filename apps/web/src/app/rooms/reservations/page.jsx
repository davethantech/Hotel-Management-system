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
  PlusCircle,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";

export default function RoomReservationsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: true,
    customers: false,
    accounts: false,
    hr: false,
    reports: false,
    pos: false,
    inventory: false,
    settings: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch reservations data
  const { data: reservations, isLoading: reservationsLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const response = await fetch('/api/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
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
      active: false,
      hasChildren: false,
      href: "/"
    },
    {
      icon: BedDouble,
      label: "Room Management",
      active: true,
      hasChildren: true,
      key: "rooms",
      children: [
        { label: "Room Reservation", href: "/rooms/reservations", active: true },
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

  // Sample reservations data (will be replaced by API data)
  const sampleReservations = [
    {
      id: 1,
      booking_id: "BK001",
      customer_name: "John Smith",
      customer_email: "john.smith@email.com",
      customer_phone: "+1-555-0123",
      room_number: "102",
      room_type: "Standard Single",
      check_in_date: "2025-08-10",
      check_out_date: "2025-08-15",
      adults: 1,
      children: 0,
      total_amount: 445.00,
      paid_amount: 445.00,
      booking_status: "confirmed",
      payment_status: "paid",
      notes: "Early check-in requested"
    },
    {
      id: 2,
      booking_id: "BK002",
      customer_name: "Maria Garcia",
      customer_email: "maria.garcia@email.com",
      customer_phone: "+1-555-0456",
      room_number: "302",
      room_type: "Deluxe Suite",
      check_in_date: "2025-08-12",
      check_out_date: "2025-08-18",
      adults: 2,
      children: 1,
      total_amount: 1494.00,
      paid_amount: 500.00,
      booking_status: "confirmed",
      payment_status: "partial",
      notes: "Anniversary celebration"
    },
    {
      id: 3,
      booking_id: "BK003",
      customer_name: "David Johnson",
      customer_email: "david.johnson@email.com",
      customer_phone: "+44-20-7946-0958",
      room_number: "101",
      room_type: "Standard Single",
      check_in_date: "2025-08-14",
      check_out_date: "2025-08-16",
      adults: 1,
      children: 0,
      total_amount: 178.00,
      paid_amount: 0.00,
      booking_status: "pending",
      payment_status: "pending",
      notes: "Business trip"
    },
    {
      id: 4,
      booking_id: "BK004",
      customer_name: "Sarah Wilson",
      customer_email: "sarah.wilson@email.com",
      customer_phone: "+1-555-0789",
      room_number: "401",
      room_type: "Family Room",
      check_in_date: "2025-08-16",
      check_out_date: "2025-08-20",
      adults: 2,
      children: 2,
      total_amount: 756.00,
      paid_amount: 756.00,
      booking_status: "confirmed",
      payment_status: "paid",
      notes: "Family vacation"
    },
    {
      id: 5,
      booking_id: "BK005",
      customer_name: "Ahmed Al-Hassan",
      customer_email: "ahmed.hassan@email.com",
      customer_phone: "+971-4-123-4567",
      room_number: "301",
      room_type: "Deluxe Suite",
      check_in_date: "2025-08-18",
      check_out_date: "2025-08-22",
      adults: 2,
      children: 0,
      total_amount: 996.00,
      paid_amount: 200.00,
      booking_status: "confirmed",
      payment_status: "partial",
      notes: "Honeymoon suite"
    }
  ];

  const displayReservations = reservations || sampleReservations;

  // Filter reservations based on search and status
  const filteredReservations = displayReservations.filter(reservation => {
    const matchesSearch = reservation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.room_number.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || reservation.booking_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]';
      case 'pending':
        return 'bg-[#FFF3E0] dark:bg-[#332211] text-[#FF8A48] dark:text-[#FFA366]';
      case 'cancelled':
        return 'bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]';
      default:
        return 'bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]';
      case 'partial':
        return 'bg-[#FFF3E0] dark:bg-[#332211] text-[#FF8A48] dark:text-[#FFA366]';
      case 'pending':
        return 'bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]';
      default:
        return 'bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]';
    }
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
                placeholder="Search reservations..."
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
                Room Reservations
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Manage all hotel room bookings and reservations
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
              <a
                href="/rooms/reservations/new"
                className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
              >
                <Plus size={16} className="mr-2" />
                New Reservation
              </a>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-[#536081] dark:text-[#B0B0B0]">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
                <input
                  type="date"
                  className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                />
                <span className="text-[#8A94A7] dark:text-[#A0A0A0]">to</span>
                <input
                  type="date"
                  className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                />
              </div>
            </div>
          </div>

          {/* Reservations Table */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC] dark:bg-[#262626] border-b border-[#EDF0F4] dark:border-[#333333]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Guests
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                  {reservationsLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-28"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-[#F5F7FB] dark:bg-[#333333] rounded-full w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-[#F5F7FB] dark:bg-[#333333] rounded-full w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end space-x-2">
                            <div className="h-8 w-8 bg-[#F5F7FB] dark:bg-[#333333] rounded"></div>
                            <div className="h-8 w-8 bg-[#F5F7FB] dark:bg-[#333333] rounded"></div>
                            <div className="h-8 w-8 bg-[#F5F7FB] dark:bg-[#333333] rounded"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                            {reservation.booking_id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              {reservation.customer_name}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] flex items-center">
                              <Mail size={12} className="mr-1" />
                              {reservation.customer_email}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] flex items-center">
                              <Phone size={12} className="mr-1" />
                              {reservation.customer_phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              Room {reservation.room_number}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              {reservation.room_type}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                              {new Date(reservation.check_in_date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              to {new Date(reservation.check_out_date).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                            {reservation.adults} Adults
                            {reservation.children > 0 && (
                              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                                {reservation.children} Children
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              ${reservation.total_amount.toFixed(2)}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              Paid: ${reservation.paid_amount.toFixed(2)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.booking_status)}`}>
                            {reservation.booking_status === 'confirmed' && <CheckCircle size={12} className="mr-1" />}
                            {reservation.booking_status === 'pending' && <Clock size={12} className="mr-1" />}
                            {reservation.booking_status === 'cancelled' && <AlertCircle size={12} className="mr-1" />}
                            {reservation.booking_status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(reservation.payment_status)}`}>
                            {reservation.payment_status === 'paid' && <CreditCard size={12} className="mr-1" />}
                            {reservation.payment_status === 'partial' && <Clock size={12} className="mr-1" />}
                            {reservation.payment_status === 'pending' && <AlertCircle size={12} className="mr-1" />}
                            {reservation.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] rounded-lg transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-[#E12929] dark:text-[#FF6B6B] hover:bg-[#FFEDED] dark:hover:bg-[#331111] rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <BedDouble size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mb-4" />
                          <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            No reservations found
                          </h3>
                          <p className="text-[#8A94A7] dark:text-[#A0A0A0] mb-4">
                            {searchTerm || statusFilter !== "all" 
                              ? "Try adjusting your search or filters"
                              : "Get started by creating your first reservation"
                            }
                          </p>
                          <a
                            href="/rooms/reservations/new"
                            className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
                          >
                            <Plus size={16} className="mr-2" />
                            New Reservation
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredReservations.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Showing {filteredReservations.length} of {displayReservations.length} reservations
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-[#536081] dark:text-[#B0B0B0] bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-sm text-[#536081] dark:text-[#B0B0B0] bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                  2
                </button>
                <button className="px-3 py-2 text-sm text-[#536081] dark:text-[#B0B0B0] bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}