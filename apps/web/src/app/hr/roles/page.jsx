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
  Check,
  Star,
  Award,
  Target,
  Zap
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function HRRolesPage() {
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
  const [showEditRole, setShowEditRole] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [newRoleDepartment, setNewRoleDepartment] = useState('');
  const [newRoleLevel, setNewRoleLevel] = useState('');

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
        { label: "HR Staff", href: "/hr/staff" },
        { label: "HR Roles", href: "/hr/roles", active: true },
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

  // Mock data for HR roles
  const mockHRRoles = [
    {
      id: 1,
      title: "HR Director",
      department: "Human Resources",
      level: "Executive",
      description: "Lead the HR department and develop strategic human resource initiatives",
      responsibilities: [
        "Develop HR strategies and policies",
        "Oversee recruitment and talent management",
        "Manage employee relations and compliance",
        "Lead organizational development initiatives"
      ],
      requirements: [
        "Master's degree in HR or related field",
        "10+ years of HR leadership experience",
        "Strong knowledge of employment law",
        "Excellent communication and leadership skills"
      ],
      salaryRange: "$120,000 - $150,000",
      employeeCount: 1,
      status: "filled",
      createdAt: "2024-01-15",
      lastUpdated: "2024-03-10"
    },
    {
      id: 2,
      title: "HR Business Partner",
      department: "Human Resources",
      level: "Senior",
      description: "Partner with business units to align HR strategies with business objectives",
      responsibilities: [
        "Collaborate with department heads on HR matters",
        "Provide guidance on performance management",
        "Support organizational change initiatives",
        "Analyze HR metrics and provide insights"
      ],
      requirements: [
        "Bachelor's degree in HR or Business",
        "5-7 years of HR experience",
        "Strong analytical and consulting skills",
        "Experience with HRIS systems"
      ],
      salaryRange: "$75,000 - $95,000",
      employeeCount: 2,
      status: "filled",
      createdAt: "2024-02-01",
      lastUpdated: "2024-03-15"
    },
    {
      id: 3,
      title: "Talent Acquisition Specialist",
      department: "Human Resources",
      level: "Mid-Level",
      description: "Manage end-to-end recruitment process for all hotel positions",
      responsibilities: [
        "Source and screen candidates",
        "Conduct interviews and assessments",
        "Manage job postings and recruitment campaigns",
        "Build talent pipeline for future needs"
      ],
      requirements: [
        "Bachelor's degree in HR or related field",
        "3-5 years of recruitment experience",
        "Experience with ATS systems",
        "Strong interviewing and assessment skills"
      ],
      salaryRange: "$55,000 - $70,000",
      employeeCount: 1,
      status: "open",
      createdAt: "2024-02-20",
      lastUpdated: "2024-03-20"
    },
    {
      id: 4,
      title: "Training & Development Coordinator",
      department: "Human Resources",
      level: "Mid-Level",
      description: "Design and deliver training programs to enhance employee skills and performance",
      responsibilities: [
        "Develop training curricula and materials",
        "Conduct training sessions and workshops",
        "Assess training effectiveness",
        "Coordinate with external training providers"
      ],
      requirements: [
        "Bachelor's degree in Education or HR",
        "3-5 years of training experience",
        "Strong presentation and facilitation skills",
        "Knowledge of adult learning principles"
      ],
      salaryRange: "$50,000 - $65,000",
      employeeCount: 1,
      status: "filled",
      createdAt: "2024-01-30",
      lastUpdated: "2024-03-05"
    },
    {
      id: 5,
      title: "HR Coordinator",
      department: "Human Resources",
      level: "Entry-Level",
      description: "Provide administrative support for HR operations and employee services",
      responsibilities: [
        "Maintain employee records and files",
        "Process HR documentation",
        "Assist with onboarding new employees",
        "Support HR projects and initiatives"
      ],
      requirements: [
        "Bachelor's degree preferred",
        "1-2 years of administrative experience",
        "Strong organizational skills",
        "Proficiency in MS Office"
      ],
      salaryRange: "$40,000 - $50,000",
      employeeCount: 2,
      status: "filled",
      createdAt: "2024-03-01",
      lastUpdated: "2024-03-25"
    },
    {
      id: 6,
      title: "Compensation & Benefits Analyst",
      department: "Human Resources",
      level: "Mid-Level",
      description: "Analyze and manage compensation structures and employee benefits programs",
      responsibilities: [
        "Conduct salary surveys and market analysis",
        "Develop compensation guidelines",
        "Administer benefits programs",
        "Prepare compensation reports"
      ],
      requirements: [
        "Bachelor's degree in HR or Finance",
        "3-5 years of compensation experience",
        "Strong analytical and Excel skills",
        "Knowledge of benefits administration"
      ],
      salaryRange: "$60,000 - $75,000",
      employeeCount: 0,
      status: "open",
      createdAt: "2024-03-15",
      lastUpdated: "2024-03-30"
    }
  ];

  const handleCreateRole = () => {
    if (newRoleName.trim()) {
      console.log('Creating new role:', { 
        title: newRoleName, 
        description: newRoleDescription,
        department: newRoleDepartment,
        level: newRoleLevel
      });
      setNewRoleName('');
      setNewRoleDescription('');
      setNewRoleDepartment('');
      setNewRoleLevel('');
      setShowCreateRole(false);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRoleName(role.title);
    setNewRoleDescription(role.description);
    setNewRoleDepartment(role.department);
    setNewRoleLevel(role.level);
    setShowEditRole(true);
  };

  const handleUpdateRole = () => {
    if (newRoleName.trim()) {
      console.log('Updating role:', editingRole.id, { 
        title: newRoleName, 
        description: newRoleDescription,
        department: newRoleDepartment,
        level: newRoleLevel
      });
      setNewRoleName('');
      setNewRoleDescription('');
      setNewRoleDepartment('');
      setNewRoleLevel('');
      setEditingRole(null);
      setShowEditRole(false);
    }
  };

  const handleDeleteRole = (roleId) => {
    console.log('Deleting role:', roleId);
  };

  const getRoleIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'executive':
        return <Star size={20} className="text-[#E12929] dark:text-[#FF6B6B]" />;
      case 'senior':
        return <Award size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />;
      case 'mid-level':
        return <Target size={20} className="text-[#10B981] dark:text-[#34D399]" />;
      case 'entry-level':
        return <Zap size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />;
      default:
        return <Briefcase size={20} className="text-[#8A94A7] dark:text-[#A0A0A0]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'filled':
        return 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]';
      case 'open':
        return 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]';
      case 'closed':
        return 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]';
      default:
        return 'bg-[#F7F9FC] text-[#8A94A7] dark:bg-[#262626] dark:text-[#A0A0A0]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'filled':
        return <CheckCircle size={16} className="text-[#10B981]" />;
      case 'open':
        return <Clock size={16} className="text-[#F59E0B]" />;
      case 'closed':
        return <XCircle size={16} className="text-[#E12929]" />;
      default:
        return <User size={16} className="text-[#8A94A7]" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'executive':
        return 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]';
      case 'senior':
        return 'bg-[#E8F0FF] text-[#4F8BFF] dark:bg-[#1A2332] dark:text-[#5B94FF]';
      case 'mid-level':
        return 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]';
      case 'entry-level':
        return 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]';
      default:
        return 'bg-[#F7F9FC] text-[#8A94A7] dark:bg-[#262626] dark:text-[#A0A0A0]';
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
                placeholder="Search HR roles..."
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
                HR Role Definitions
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Define and manage job roles within the human resources department
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
                    <option value="human_resources">Human Resources</option>
                    <option value="operations">Operations</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Level
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]">
                    <option value="">All Levels</option>
                    <option value="executive">Executive</option>
                    <option value="senior">Senior</option>
                    <option value="mid-level">Mid-Level</option>
                    <option value="entry-level">Entry-Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]">
                    <option value="">All Status</option>
                    <option value="filled">Filled</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
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
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Roles</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">6</p>
                </div>
                <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                  <Briefcase size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+1</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">new this month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Filled Positions</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">7</p>
                </div>
                <div className="w-12 h-12 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center">
                  <UserCheck size={24} className="text-[#10B981] dark:text-[#34D399]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">78%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">fill rate</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Open Positions</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">2</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#F59E0B] dark:text-[#FCD34D] text-sm font-medium">Active</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">recruiting</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Avg Salary</p>
                  <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold mt-1">$68K</p>
                </div>
                <div className="w-12 h-12 bg-[#DBEAFE] dark:bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-[#3B82F6] dark:text-[#60A5FA]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-[#10B981] dark:text-[#34D399] text-sm font-medium">+5%</span>
                <span className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm ml-2">vs last year</span>
              </div>
            </div>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {mockHRRoles.map((role) => (
              <div key={role.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getRoleIcon(role.level)}
                    <div>
                      <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(role.level)}`}>
                          {role.level}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(role.status)}`}>
                          {getStatusIcon(role.status)}
                          <span className="ml-1 capitalize">{role.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditRole(role)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-1 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#E12929] dark:hover:text-[#FF6B6B] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm mb-4">
                  {role.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.employeeCount}
                      </p>
                      <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Employees</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#07111F] dark:text-[#E5E5E5]">
                        {role.salaryRange}
                      </p>
                      <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Salary Range</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">Updated</p>
                    <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                      {formatDate(role.lastUpdated)}
                    </p>
                  </div>
                </div>

                {selectedRole === role.id && (
                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {role.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] flex items-start">
                            <span className="w-1 h-1 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Requirements
                      </h4>
                      <ul className="space-y-1">
                        {role.requirements.map((requirement, index) => (
                          <li key={index} className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] flex items-start">
                            <span className="w-1 h-1 bg-[#10B981] dark:bg-[#34D399] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Create Role Modal */}
          {showCreateRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 w-full max-w-lg">
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Create New HR Role
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Role Title *
                    </label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter role title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Department
                      </label>
                      <select
                        value={newRoleDepartment}
                        onChange={(e) => setNewRoleDepartment(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="">Select Department</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Level
                      </label>
                      <select
                        value={newRoleLevel}
                        onChange={(e) => setNewRoleLevel(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="">Select Level</option>
                        <option value="Executive">Executive</option>
                        <option value="Senior">Senior</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Entry-Level">Entry-Level</option>
                      </select>
                    </div>
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

          {/* Edit Role Modal */}
          {showEditRole && editingRole && (
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 w-full max-w-lg">
                <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                  Edit HR Role
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Role Title *
                    </label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter role title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Department
                      </label>
                      <select
                        value={newRoleDepartment}
                        onChange={(e) => setNewRoleDepartment(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="">Select Department</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Level
                      </label>
                      <select
                        value={newRoleLevel}
                        onChange={(e) => setNewRoleLevel(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="">Select Level</option>
                        <option value="Executive">Executive</option>
                        <option value="Senior">Senior</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Entry-Level">Entry-Level</option>
                      </select>
                    </div>
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
                    onClick={() => {
                      setShowEditRole(false);
                      setEditingRole(null);
                      setNewRoleName('');
                      setNewRoleDescription('');
                      setNewRoleDepartment('');
                      setNewRoleLevel('');
                    }}
                    className="px-4 py-2 border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateRole}
                    disabled={!newRoleName.trim()}
                    className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}