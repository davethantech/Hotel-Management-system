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
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  UserCheck,
  Building
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function StaffManagementPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: false,
    accounts: false,
    hr: true,
    reports: false,
    pos: false,
    inventory: false,
    settings: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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
        { label: "Payment Settings", href: "/payment-settings" },
        { label: "Transactions", href: "/transactions" },
        { label: "Account Summary", href: "/account-summary" }
      ]
    },
    {
      icon: Briefcase,
      label: "Human Resources",
      active: true,
      hasChildren: true,
      key: "hr",
      children: [
        { label: "Staff Management", href: "/human-resources/staff-management", active: true },
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
        { label: "Stock Management", href: "/inventory/stock-management" },
        { label: "Purchase Orders", href: "/inventory/purchase-orders" },
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

  // Mock data for staff
  const mockStaff = [
    {
      id: 1,
      employee_id: "EMP001",
      name: "Alice Johnson",
      role: "Front Desk Manager",
      department: "Front Office",
      email: "alice.johnson@hotel.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      hire_date: "2022-03-15",
      salary: 65000,
      location: "Lobby"
    },
    {
      id: 2,
      employee_id: "EMP002",
      name: "Robert Chen",
      role: "Head Chef",
      department: "Kitchen",
      email: "robert.chen@hotel.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      hire_date: "2021-08-22",
      salary: 78000,
      location: "Main Kitchen"
    },
    {
      id: 3,
      employee_id: "EMP003",
      name: "Maria Rodriguez",
      role: "Housekeeping Supervisor",
      department: "Housekeeping",
      email: "maria.rodriguez@hotel.com",
      phone: "+1 (555) 345-6789",
      status: "active",
      hire_date: "2023-01-10",
      salary: 52000,
      location: "Floor 2-5"
    },
    {
      id: 4,
      employee_id: "EMP004",
      name: "David Wilson",
      role: "Maintenance Technician",
      department: "Maintenance",
      email: "david.wilson@hotel.com",
      phone: "+1 (555) 456-7890",
      status: "on_leave",
      hire_date: "2020-11-05",
      salary: 48000,
      location: "Basement"
    },
    {
      id: 5,
      employee_id: "EMP005",
      name: "Sarah Thompson",
      role: "Event Coordinator",
      department: "Events",
      email: "sarah.thompson@hotel.com",
      phone: "+1 (555) 567-8901",
      status: "active",
      hire_date: "2022-06-18",
      salary: 58000,
      location: "Event Hall"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]';
      case 'on_leave':
        return 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]';
      case 'terminated':
        return 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]';
      default:
        return 'bg-[#F7F9FC] text-[#8A94A7] dark:bg-[#262626] dark:text-[#A0A0A0]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-[#10B981]" />;
      case 'on_leave':
        return <Clock size={16} className="text-[#F59E0B]" />;
      case 'terminated':
        return <XCircle size={16} className="text-[#E12929]" />;
      default:
        return <User size={16} className="text-[#8A94A7]" />;
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
                placeholder="Search staff..."
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
                Staff Management
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Manage your hotel staff, roles, and employee information
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <a
                href="/human-resources/staff-management/add"
                className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Add Employee
              </a>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]">
                    <option value="">All Departments</option>
                    <option value="front_office">Front Office</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Hire Date
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]">
                    <option value="">All Time</option>
                    <option value="this_year">This Year</option>
                    <option value="last_year">Last Year</option>
                    <option value="last_6_months">Last 6 Months</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Staff</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">127</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+5</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Active</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">118</p>
                </div>
                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">93%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">active rate</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Departments</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">8</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <Building size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Fully staffed</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Avg Salary</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">$58k</p>
                </div>
                <div className="w-12 h-12 bg-[#DBEAFE] dark:bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-[#3B82F6] dark:text-[#60A5FA]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+$2.5k</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last year</span>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
              <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                Staff Directory
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Staff Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Date Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              {staff.name}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              {staff.employee_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {staff.role}
                        </div>
                        <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          {staff.department}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin size={12} className="text-[#8A94A7] dark:text-[#A0A0A0] mr-1" />
                          <span className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                            {staff.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          <div className="flex items-center mb-1">
                            <Mail size={14} className="text-[#8A94A7] dark:text-[#A0A0A0] mr-2" />
                            {staff.email}
                          </div>
                          <div className="flex items-center">
                            <Phone size={14} className="text-[#8A94A7] dark:text-[#A0A0A0] mr-2" />
                            {staff.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                          {getStatusIcon(staff.status)}
                          <span className="ml-1 capitalize">{staff.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {formatDate(staff.hire_date)}
                        </div>
                        <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          {formatCurrency(staff.salary)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#EDF0F4] dark:border-[#333333] flex items-center justify-between">
              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Showing 1 to 5 of 127 staff members
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                  2
                </button>
                <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                  3
                </button>
                <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}