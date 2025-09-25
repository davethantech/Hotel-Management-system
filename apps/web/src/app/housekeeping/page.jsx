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
  AlertCircle,
  Wifi,
  Tv,
  Car,
  Coffee,
  Utensils,
  Wind,
  Bath,
  Bed,
  Users2,
  Star,
  Image as ImageIcon,
  Grid3X3,
  Building,
  Save,
  RotateCcw,
  Shield,
  Key,
  Globe,
  Zap,
  Database,
  Monitor,
  Smartphone,
  Palette,
  Volume2,
  ToggleLeft,
  ToggleRight,
  Info,
  HelpCircle,
  ClipboardList,
  UserCheck,
  Timer,
  PlayCircle,
  PauseCircle,
  CheckSquare,
  XCircle,
  MoreVertical,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function HousekeepingPage() {
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
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const queryClient = useQueryClient();

  // Fetch housekeeping tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['housekeeping-tasks', filterStatus, filterPriority, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: filterStatus,
        priority: filterPriority,
        sort: sortBy
      });
      const response = await fetch(`/api/housekeeping/tasks?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch housekeeping tasks');
      }
      return response.json();
    },
    enabled: !!user
  });

  // Fetch housekeeping stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['housekeeping-stats'],
    queryFn: async () => {
      const response = await fetch('/api/housekeeping/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch housekeeping stats');
      }
      return response.json();
    },
    enabled: !!user
  });

  // Update task status mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, status, notes }) => {
      const response = await fetch(`/api/housekeeping/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['housekeeping-tasks']);
      queryClient.invalidateQueries(['housekeeping-stats']);
    },
  });

  // Create new task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (taskData) => {
      const response = await fetch('/api/housekeeping/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['housekeeping-tasks']);
      queryClient.invalidateQueries(['housekeeping-stats']);
      setShowNewTaskModal(false);
    },
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleBulkStatusUpdate = (status) => {
    selectedTasks.forEach(taskId => {
      updateTaskMutation.mutate({ taskId, status });
    });
    setSelectedTasks([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]';
      case 'in_progress':
        return 'bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF]';
      case 'pending':
        return 'bg-[#FFF3E0] dark:bg-[#332211] text-[#FF8A48] dark:text-[#FFA366]';
      default:
        return 'bg-[#F5F7FB] dark:bg-[#333333] text-[#8A94A7] dark:text-[#A0A0A0]';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]';
      case 'medium':
        return 'bg-[#FFF3E0] dark:bg-[#332211] text-[#FF8A48] dark:text-[#FFA366]';
      case 'low':
        return 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]';
      default:
        return 'bg-[#F5F7FB] dark:bg-[#333333] text-[#8A94A7] dark:text-[#A0A0A0]';
    }
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
        { label: "Room Reservation", href: "/rooms/reservations" },
        { label: "Room Facilities", href: "/rooms/facilities" },
        { label: "Room Settings", href: "/rooms/settings" },
        { label: "Housekeeping", href: "/housekeeping", active: true }
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

  const tabs = [
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "staff", label: "Staff", icon: UserCheck },
    { id: "reports", label: "Reports", icon: FileText }
  ];

  const mockTasks = tasks || [
    {
      id: 1,
      room_number: "101",
      task_type: "cleaning",
      priority: "high",
      status: "pending",
      assigned_to: "Maria Garcia",
      description: "Deep cleaning after checkout",
      estimated_duration: 45,
      created_at: "2025-01-14T10:00:00Z",
      notes: "Guest reported spilled wine on carpet"
    },
    {
      id: 2,
      room_number: "205",
      task_type: "maintenance",
      priority: "medium",
      status: "in_progress",
      assigned_to: "John Smith",
      description: "Fix leaky faucet in bathroom",
      estimated_duration: 30,
      started_at: "2025-01-14T11:30:00Z",
      created_at: "2025-01-14T09:15:00Z"
    },
    {
      id: 3,
      room_number: "312",
      task_type: "inspection",
      priority: "low",
      status: "completed",
      assigned_to: "Sarah Johnson",
      description: "Post-cleaning quality check",
      estimated_duration: 15,
      completed_at: "2025-01-14T12:45:00Z",
      created_at: "2025-01-14T08:30:00Z"
    }
  ];

  const mockStats = stats || {
    totalTasks: 24,
    completedTasks: 18,
    pendingTasks: 4,
    inProgressTasks: 2,
    averageCompletionTime: 35,
    staffOnDuty: 6
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
                placeholder="Search tasks, rooms, staff..."
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
                Housekeeping Management
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Manage cleaning tasks, maintenance requests, and staff assignments
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={() => setShowNewTaskModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
              >
                <Plus size={16} className="mr-2" />
                New Task
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Tasks</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : mockStats.totalTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <ClipboardList size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Completed</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : mockStats.completedTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#EAF9F0] dark:bg-[#0A2A1A] rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-[#0E9250] dark:text-[#4ADE80]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">In Progress</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : mockStats.inProgressTasks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#FFF3E0] dark:bg-[#332211] rounded-lg flex items-center justify-center">
                  <Timer size={24} className="text-[#FF8A48] dark:text-[#FFA366]" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Staff On Duty</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                    {statsLoading ? '...' : mockStats.staffOnDuty}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#F3E8FF] dark:bg-[#2A1A33] rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-[#8B5CF6] dark:text-[#A78BFA]" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {/* Tab Navigation */}
            <div className="border-b border-[#EDF0F4] dark:border-[#333333]">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#4F8BFF] dark:border-[#5B94FF] text-[#4F8BFF] dark:text-[#5B94FF] bg-[#F7F9FC] dark:bg-[#262626]"
                        : "border-transparent text-[#536081] dark:text-[#B0B0B0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]"
                    }`}
                  >
                    <tab.icon size={16} className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Tasks Tab */}
              {activeTab === "tasks" && (
                <div className="space-y-6">
                  {/* Filters and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="all">All Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <button className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                        <ArrowUpDown size={16} className="text-[#536081] dark:text-[#A0A0A0]" />
                      </button>
                    </div>
                    {selectedTasks.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          {selectedTasks.length} selected
                        </span>
                        <button
                          onClick={() => handleBulkStatusUpdate('in_progress')}
                          className="px-3 py-1 bg-[#E8F0FF] dark:bg-[#1A2332] text-[#4F8BFF] dark:text-[#5B94FF] rounded text-sm hover:bg-[#D1E7FF] dark:hover:bg-[#2A3A4A] transition-colors"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => handleBulkStatusUpdate('completed')}
                          className="px-3 py-1 bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80] rounded text-sm hover:bg-[#D4F4DD] dark:hover:bg-[#1A3A2A] transition-colors"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-4">
                    {tasksLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] rounded-lg p-4 h-24"></div>
                        ))}
                      </div>
                    ) : mockTasks.length > 0 ? (
                      mockTasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-4 border border-[#EDF0F4] dark:border-[#333333] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] transition-colors"
                        >
                          <div className="flex items-start space-x-4">
                            <input
                              type="checkbox"
                              checked={selectedTasks.includes(task.id)}
                              onChange={() => handleTaskSelect(task.id)}
                              className="mt-1 w-4 h-4 text-[#4F8BFF] bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                                    Room {task.room_number} - {task.task_type}
                                  </h3>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {task.status.replace('_', ' ')}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                                    {task.estimated_duration}min
                                  </span>
                                  <button className="p-1 hover:bg-[#E8F0FF] dark:hover:bg-[#1A2332] rounded transition-colors">
                                    <MoreVertical size={16} className="text-[#536081] dark:text-[#A0A0A0]" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-[#536081] dark:text-[#B0B0B0] mb-2">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                                <span>Assigned to: {task.assigned_to}</span>
                                <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                              </div>
                              {task.notes && (
                                <div className="mt-2 p-2 bg-[#FFF3E0] dark:bg-[#332211] rounded text-xs text-[#FF8A48] dark:text-[#FFA366]">
                                  Note: {task.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <ClipboardList size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                        <p className="text-[#8A94A7] dark:text-[#A0A0A0]">No tasks found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === "schedule" && (
                <div className="text-center py-12">
                  <Calendar size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Schedule View
                  </h3>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                    Calendar view for housekeeping schedules coming soon
                  </p>
                </div>
              )}

              {/* Staff Tab */}
              {activeTab === "staff" && (
                <div className="text-center py-12">
                  <UserCheck size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Staff Management
                  </h3>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                    Staff assignments and performance tracking coming soon
                  </p>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === "reports" && (
                <div className="text-center py-12">
                  <FileText size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Housekeeping Reports
                  </h3>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                    Performance reports and analytics coming soon
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="mt-8 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-xl p-6 border border-[#4F8BFF] dark:border-[#5B94FF]">
            <div className="flex items-start space-x-3">
              <Sparkles size={20} className="text-[#4F8BFF] dark:text-[#5B94FF] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-1">
                  Housekeeping Tips
                </h4>
                <p className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                  Assign high-priority tasks first, check room status before cleaning, 
                  and always update task progress for better coordination.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}