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
  Building,
  Save,
  ArrowLeft,
  Upload,
  Camera,
  AlertCircle,
  Lock,
  Unlock,
  Key,
  UserPlus,
  Copy,
  Check
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function RolePermissionsPage() {
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
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

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
        { label: "Staff Management", href: "/human-resources/staff-management" },
        { label: "Role Permissions", href: "/human-resources/role-permissions", active: true },
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

  // Mock data for roles and permissions
  const mockRoles = [
    {
      id: 1,
      name: "Administrator",
      description: "Full system access with all permissions",
      userCount: 3,
      permissions: [
        "dashboard.view", "rooms.view", "rooms.create", "rooms.edit", "rooms.delete",
        "customers.view", "customers.create", "customers.edit", "customers.delete",
        "staff.view", "staff.create", "staff.edit", "staff.delete",
        "finance.view", "finance.create", "finance.edit", "finance.delete",
        "pos.view", "pos.create", "pos.edit", "pos.delete",
        "inventory.view", "inventory.create", "inventory.edit", "inventory.delete",
        "reports.view", "reports.export", "settings.view", "settings.edit"
      ],
      createdAt: "2024-01-15",
      isSystem: true
    },
    {
      id: 2,
      name: "Front Desk Manager",
      description: "Manage front desk operations and customer interactions",
      userCount: 5,
      permissions: [
        "dashboard.view", "rooms.view", "rooms.edit",
        "customers.view", "customers.create", "customers.edit",
        "pos.view", "pos.create", "reports.view"
      ],
      createdAt: "2024-02-10",
      isSystem: false
    },
    {
      id: 3,
      name: "Housekeeping Supervisor",
      description: "Oversee housekeeping operations and room maintenance",
      userCount: 8,
      permissions: [
        "dashboard.view", "rooms.view", "rooms.edit",
        "inventory.view", "inventory.edit", "reports.view"
      ],
      createdAt: "2024-02-15",
      isSystem: false
    },
    {
      id: 4,
      name: "Kitchen Manager",
      description: "Manage kitchen operations and POS system",
      userCount: 12,
      permissions: [
        "dashboard.view", "pos.view", "pos.create", "pos.edit",
        "inventory.view", "inventory.edit", "reports.view"
      ],
      createdAt: "2024-03-01",
      isSystem: false
    },
    {
      id: 5,
      name: "Staff Member",
      description: "Basic staff access with limited permissions",
      userCount: 45,
      permissions: [
        "dashboard.view", "rooms.view", "customers.view", "pos.view"
      ],
      createdAt: "2024-01-20",
      isSystem: false
    }
  ];

  const permissionCategories = [
    {
      name: "Dashboard",
      key: "dashboard",
      permissions: [
        { key: "dashboard.view", name: "View Dashboard", description: "Access to main dashboard" }
      ]
    },
    {
      name: "Room Management",
      key: "rooms",
      permissions: [
        { key: "rooms.view", name: "View Rooms", description: "View room information and status" },
        { key: "rooms.create", name: "Create Rooms", description: "Add new rooms to the system" },
        { key: "rooms.edit", name: "Edit Rooms", description: "Modify room details and settings" },
        { key: "rooms.delete", name: "Delete Rooms", description: "Remove rooms from the system" }
      ]
    },
    {
      name: "Customer Management",
      key: "customers",
      permissions: [
        { key: "customers.view", name: "View Customers", description: "Access customer information" },
        { key: "customers.create", name: "Create Customers", description: "Add new customer records" },
        { key: "customers.edit", name: "Edit Customers", description: "Modify customer information" },
        { key: "customers.delete", name: "Delete Customers", description: "Remove customer records" }
      ]
    },
    {
      name: "Staff Management",
      key: "staff",
      permissions: [
        { key: "staff.view", name: "View Staff", description: "Access staff information" },
        { key: "staff.create", name: "Create Staff", description: "Add new staff members" },
        { key: "staff.edit", name: "Edit Staff", description: "Modify staff information" },
        { key: "staff.delete", name: "Delete Staff", description: "Remove staff members" }
      ]
    },
    {
      name: "Finance & Accounting",
      key: "finance",
      permissions: [
        { key: "finance.view", name: "View Finance", description: "Access financial data" },
        { key: "finance.create", name: "Create Transactions", description: "Add financial transactions" },
        { key: "finance.edit", name: "Edit Transactions", description: "Modify financial records" },
        { key: "finance.delete", name: "Delete Transactions", description: "Remove financial records" }
      ]
    },
    {
      name: "POS Management",
      key: "pos",
      permissions: [
        { key: "pos.view", name: "View POS", description: "Access POS system" },
        { key: "pos.create", name: "Create Orders", description: "Process new orders" },
        { key: "pos.edit", name: "Edit Orders", description: "Modify existing orders" },
        { key: "pos.delete", name: "Delete Orders", description: "Cancel or remove orders" }
      ]
    },
    {
      name: "Inventory Management",
      key: "inventory",
      permissions: [
        { key: "inventory.view", name: "View Inventory", description: "Access inventory data" },
        { key: "inventory.create", name: "Create Items", description: "Add new inventory items" },
        { key: "inventory.edit", name: "Edit Items", description: "Modify inventory items" },
        { key: "inventory.delete", name: "Delete Items", description: "Remove inventory items" }
      ]
    },
    {
      name: "Reports",
      key: "reports",
      permissions: [
        { key: "reports.view", name: "View Reports", description: "Access system reports" },
        { key: "reports.export", name: "Export Reports", description: "Download and export reports" }
      ]
    },
    {
      name: "System Settings",
      key: "settings",
      permissions: [
        { key: "settings.view", name: "View Settings", description: "Access system settings" },
        { key: "settings.edit", name: "Edit Settings", description: "Modify system configuration" }
      ]
    }
  ];

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      console.log('Creating new role:', { name: newRoleName, description: newRoleDescription });
      setNewRoleName('');
      setNewRoleDescription('');
      setShowCreateRole(false);
    }
  };

  const handleDuplicateRole = (role) => {
    console.log('Duplicating role:', role);
  };

  const handleDeleteRole = (roleId) => {
    console.log('Deleting role:', roleId);
  };

  const getRoleIcon = (roleName) => {
    switch (roleName.toLowerCase()) {
      case 'administrator':
        return <Shield size={20} className="text-[#E12929] dark:text-[#FF6B6B]" />;
      case 'front desk manager':
        return <Users size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />;
      case 'housekeeping supervisor':
        return <Building size={20} className="text-[#10B981] dark:text-[#34D399]" />;
      case 'kitchen manager':
        return <ShoppingCart size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />;
      default:
        return <User size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                placeholder="Search roles..."
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
                Role & Permissions
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Manage user roles and their access permissions
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
              <button
                onClick={() => setShowCreateRole(true)}
                className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Create Role
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Roles</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">5</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Shield size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+1</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Active Users</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">73</p>
                </div>
                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+8</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">new this week</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Permissions</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">24</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <Key size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Across 9 modules</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">System Roles</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">1</p>
                </div>
                <div className="w-12 h-12 bg-[#FFEDED] dark:bg-[#331111] rounded-lg flex items-center justify-center">
                  <Lock size={24} className="text-[#E12929] dark:text-[#FF6B6B]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Protected roles</span>
              </div>
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {mockRoles.map((role) => (
              <div key={role.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getRoleIcon(role.name)}
                    <div>
                      <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.name}
                      </h3>
                      {role.isSystem && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]">
                          <Lock size={10} className="mr-1" />
                          System Role
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleDuplicateRole(role)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                      title="Duplicate Role"
                    >
                      <Copy size={16} />
                    </button>
                    <button className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
                      <Edit size={16} />
                    </button>
                    {!role.isSystem && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm mb-4">
                  {role.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.userCount}
                      </p>
                      <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.permissions.length}
                      </p>
                      <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Permissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Created</p>
                    <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                      {formatDate(role.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                      Permission Summary
                    </span>
                    <button
                      onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      className="text-sm text-[#4F8BFF] dark:text-[#5B94FF] hover:underline"
                    >
                      {selectedRole === role.id ? 'Hide' : 'View All'}
                    </button>
                  </div>
                  
                  {selectedRole === role.id && (
                    <div className="mt-3 space-y-2">
                      {permissionCategories.map((category) => {
                        const categoryPermissions = role.permissions.filter(p => p.startsWith(category.key));
                        if (categoryPermissions.length === 0) return null;
                        
                        return (
                          <div key={category.key} className="flex items-center justify-between py-1">
                            <span className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                              {category.name}
                            </span>
                            <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                              {categoryPermissions.length}/{category.permissions.length}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Create Role Modal */}
          {showCreateRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Create New Role
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter role name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Description
                    </label>
                    <textarea
                      value={newRoleDescription}
                      onChange={(e) => setNewRoleDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter role description"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateRole(false)}
                    className="px-4 py-2 border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateRole}
                    disabled={!newRoleName.trim()}
                    className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Role
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Permission Categories Reference */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-6">
              Available Permissions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {permissionCategories.map((category) => (
                <div key={category.key} className="space-y-3">
                  <h3 className="font-medium text-[#07111F] dark:text-[#E5E5E5] flex items-center">
                    <div className="w-2 h-2 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full mr-2"></div>
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {category.permissions.map((permission) => (
                      <div key={permission.key} className="text-sm">
                        <div className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {permission.name}
                        </div>
                        <div className="text-[#8A94A7] dark:text-[#A0A0A0] text-xs">
                          {permission.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}