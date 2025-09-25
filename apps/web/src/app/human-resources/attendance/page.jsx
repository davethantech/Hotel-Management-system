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
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  Activity,
  Timer,
  UserCheck,
  UserX,
  Coffee,
  Home,
  Building
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AttendancePage() {
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
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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
        { label: "Payment Settings", href: "/payments/settings" },
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
        { label: "Staff Management", href: "/human-resources/staff-management" },
        { label: "Role Permissions", href: "/human-resources/role-permissions" },
        { label: "Attendance", href: "/human-resources/attendance", active: true }
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

  // Mock data for attendance
  const mockAttendanceData = {
    todayStats: {
      totalEmployees: 45,
      present: 38,
      absent: 4,
      late: 3,
      onLeave: 2,
      averageWorkHours: 8.2
    },
    attendanceRecords: [
      {
        id: 1,
        employeeId: "EMP001",
        name: "John Smith",
        department: "Front Desk",
        position: "Receptionist",
        checkIn: "08:45",
        checkOut: "17:30",
        workHours: "8h 45m",
        status: "present",
        location: "Main Building",
        avatar: null
      },
      {
        id: 2,
        employeeId: "EMP002",
        name: "Sarah Johnson",
        department: "Housekeeping",
        position: "Supervisor",
        checkIn: "09:15",
        checkOut: "18:00",
        workHours: "8h 45m",
        status: "late",
        location: "Main Building",
        avatar: null
      },
      {
        id: 3,
        employeeId: "EMP003",
        name: "Michael Brown",
        department: "Kitchen",
        position: "Chef",
        checkIn: "07:30",
        checkOut: "16:15",
        workHours: "8h 45m",
        status: "present",
        location: "Kitchen",
        avatar: null
      },
      {
        id: 4,
        employeeId: "EMP004",
        name: "Emily Davis",
        department: "Maintenance",
        position: "Technician",
        checkIn: "-",
        checkOut: "-",
        workHours: "-",
        status: "absent",
        location: "-",
        avatar: null
      },
      {
        id: 5,
        employeeId: "EMP005",
        name: "David Wilson",
        department: "Security",
        position: "Guard",
        checkIn: "22:00",
        checkOut: "06:00",
        workHours: "8h 00m",
        status: "present",
        location: "Main Entrance",
        avatar: null
      },
      {
        id: 6,
        employeeId: "EMP006",
        name: "Lisa Anderson",
        department: "Front Desk",
        position: "Manager",
        checkIn: "-",
        checkOut: "-",
        workHours: "-",
        status: "leave",
        location: "-",
        avatar: null
      },
      {
        id: 7,
        employeeId: "EMP007",
        name: "Robert Taylor",
        department: "Housekeeping",
        position: "Cleaner",
        checkIn: "09:30",
        checkOut: "18:15",
        workHours: "8h 45m",
        status: "late",
        location: "Floor 2",
        avatar: null
      },
      {
        id: 8,
        employeeId: "EMP008",
        name: "Jennifer Martinez",
        department: "Kitchen",
        position: "Sous Chef",
        checkIn: "08:00",
        checkOut: "16:45",
        workHours: "8h 45m",
        status: "present",
        location: "Kitchen",
        avatar: null
      }
    ],
    weeklyTrends: [
      { day: "Mon", present: 42, absent: 3, late: 2 },
      { day: "Tue", present: 40, absent: 4, late: 3 },
      { day: "Wed", present: 41, absent: 2, late: 4 },
      { day: "Thu", present: 43, absent: 1, late: 3 },
      { day: "Fri", present: 38, absent: 4, late: 5 },
      { day: "Sat", present: 35, absent: 6, late: 4 },
      { day: "Sun", present: 33, absent: 8, late: 4 }
    ],
    departmentStats: [
      { department: "Front Desk", total: 8, present: 6, absent: 1, late: 1 },
      { department: "Housekeeping", total: 12, present: 10, absent: 1, late: 1 },
      { department: "Kitchen", total: 10, present: 8, absent: 1, late: 1 },
      { department: "Maintenance", total: 6, present: 5, absent: 1, late: 0 },
      { department: "Security", total: 9, present: 9, absent: 0, late: 0 }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-[#ECFDF5] dark:bg-[#064E3B] text-[#065F46] dark:text-[#34D399]';
      case 'absent':
        return 'bg-[#FEE2E2] dark:bg-[#7F1D1D] text-[#991B1B] dark:text-[#F87171]';
      case 'late':
        return 'bg-[#FEF3C7] dark:bg-[#451A03] text-[#92400E] dark:text-[#FCD34D]';
      case 'leave':
        return 'bg-[#E0E7FF] dark:bg-[#312E81] text-[#3730A3] dark:text-[#A5B4FC]';
      default:
        return 'bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} className="text-[#10B981] dark:text-[#34D399]" />;
      case 'absent':
        return <XCircle size={16} className="text-[#EF4444] dark:text-[#F87171]" />;
      case 'late':
        return <AlertTriangle size={16} className="text-[#F59E0B] dark:text-[#FCD34D]" />;
      case 'leave':
        return <Coffee size={16} className="text-[#6366F1] dark:text-[#A5B4FC]" />;
      default:
        return <Clock size={16} className="text-[#6B7280] dark:text-[#9CA3AF]" />;
    }
  };

  const formatPercentage = (value, total) => {
    return ((value / total) * 100).toFixed(1);
  };

  const filteredRecords = mockAttendanceData.attendanceRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

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
                placeholder="Search employees..."
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
                Attendance Management
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Track and manage employee attendance, work hours, and time records
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              />
              <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Staff</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.totalEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Present</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.present}</p>
                </div>
                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-[#10B981] dark:text-[#34D399]">
                  {formatPercentage(mockAttendanceData.todayStats.present, mockAttendanceData.todayStats.totalEmployees)}%
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Absent</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.absent}</p>
                </div>
                <div className="w-12 h-12 bg-[#FEE2E2] dark:bg-[#7F1D1D] rounded-lg flex items-center justify-center">
                  <UserX size={24} className="text-[#EF4444] dark:text-[#F87171]" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-[#EF4444] dark:text-[#F87171]">
                  {formatPercentage(mockAttendanceData.todayStats.absent, mockAttendanceData.todayStats.totalEmployees)}%
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Late</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.late}</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-[#F59E0B] dark:text-[#FCD34D]">
                  {formatPercentage(mockAttendanceData.todayStats.late, mockAttendanceData.todayStats.totalEmployees)}%
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">On Leave</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.onLeave}</p>
                </div>
                <div className="w-12 h-12 bg-[#E0E7FF] dark:bg-[#312E81] rounded-lg flex items-center justify-center">
                  <Coffee size={24} className="text-[#6366F1] dark:text-[#A5B4FC]" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-[#6366F1] dark:text-[#A5B4FC]">
                  {formatPercentage(mockAttendanceData.todayStats.onLeave, mockAttendanceData.todayStats.totalEmployees)}%
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Avg Hours</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">{mockAttendanceData.todayStats.averageWorkHours}h</p>
                </div>
                <div className="w-12 h-12 bg-[#F3E8FF] dark:bg-[#581C87] rounded-lg flex items-center justify-center">
                  <Timer size={24} className="text-[#8B5CF6] dark:text-[#C4B5FD]" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-[#8B5CF6] dark:text-[#C4B5FD]">
                  Daily average
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="leave">On Leave</option>
                </select>

                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  <option value="all">All Departments</option>
                  <option value="Front Desk">Front Desk</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                Showing {filteredRecords.length} of {mockAttendanceData.attendanceRecords.length} employees
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden mb-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Today's Attendance
                </h2>
                <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Work Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {record.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              {record.name}
                            </div>
                            <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              {record.employeeId} • {record.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {record.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {record.checkIn}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {record.checkOut}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
                          {record.workHours}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin size={14} className="text-[#8A94A7] dark:text-[#A0A0A0] mr-1" />
                          <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                            {record.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1 capitalize">{record.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                            <Edit size={16} />
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
          </div>

          {/* Weekly Trends and Department Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weekly Attendance Trends */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Weekly Attendance Trends
                </h2>
                <Activity size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-4">
                {mockAttendanceData.weeklyTrends.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] w-8">
                        {day.day}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="flex space-x-1">
                          <div className="flex-1">
                            <div className="w-full bg-[#F1F5FF] dark:bg-[#1A2332] rounded-full h-2">
                              <div 
                                className="bg-[#10B981] dark:bg-[#34D399] h-2 rounded-full" 
                                style={{ width: `${(day.present / 45) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {day.present}/{day.present + day.absent + day.late}
                      </div>
                      <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                        {formatPercentage(day.present, day.present + day.absent + day.late)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Statistics */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                  Department Attendance
                </h2>
                <Building size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
              </div>
              
              <div className="space-y-4">
                {mockAttendanceData.departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-lg flex items-center justify-center mr-3">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {dept.department}
                        </div>
                        <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                          {dept.total} total staff
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                        {dept.present}/{dept.total}
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-[#10B981] dark:text-[#34D399]">
                          {formatPercentage(dept.present, dept.total)}%
                        </span>
                        {dept.late > 0 && (
                          <span className="text-[#F59E0B] dark:text-[#FCD34D]">
                            {dept.late} late
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}