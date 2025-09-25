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
  AlertCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddStaffPage() {
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    nationality: '',
    idType: '',
    idNumber: '',
    department: '',
    designation: '',
    role: '',
    hireDate: '',
    salary: '',
    employeeId: '',
    emergencyContact: '',
    emergencyPhone: '',
    bankAccount: '',
    taxId: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.hireDate.trim()) newErrors.hireDate = 'Hire date is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary is required';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Salary validation
    if (formData.salary && isNaN(parseFloat(formData.salary))) {
      newErrors.salary = 'Please enter a valid salary amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate employee ID if not provided
      const employeeId = formData.employeeId || `EMP${Date.now().toString().slice(-6)}`;
      
      console.log('Staff member added:', { ...formData, employeeId });
      
      // Redirect to staff management page
      window.location.href = '/human-resources/staff-management';
    } catch (error) {
      console.error('Error adding staff member:', error);
      setErrors({ submit: 'Failed to add staff member. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
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
            <div className="flex items-center">
              <a
                href="/human-resources/staff-management"
                className="inline-flex items-center px-3 py-2 text-[#536081] dark:text-[#B0B0B0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors mr-4"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Staff
              </a>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                  Add New Staff Member
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                  Enter the details for the new employee
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl">
            {/* Profile Image Section */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                Profile Photo
              </h2>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-[#F1F5FF] dark:bg-[#1A2332] rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-[#8A94A7] dark:text-[#A0A0A0]" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors">
                    <Camera size={16} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-1">
                    Upload Profile Photo
                  </p>
                  <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-6">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.firstName ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.lastName ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.email ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.phone ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Enter nationality"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-6">
                Employment Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Auto-generated if empty"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.department ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                  >
                    <option value="">Select Department</option>
                    <option value="Front Office">Front Office</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Events">Events</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Security">Security</option>
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.department}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.designation ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter job title"
                  />
                  {errors.designation && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Staff">Staff</option>
                    <option value="Trainee">Trainee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Hire Date *
                  </label>
                  <input
                    type="date"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.hireDate ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                  />
                  {errors.hireDate && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.hireDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Salary *
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                      errors.salary ? 'border-[#E12929] dark:border-[#FF6B6B]' : 'border-[#E1E6ED] dark:border-[#404040]'
                    }`}
                    placeholder="Enter annual salary"
                  />
                  {errors.salary && (
                    <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.salary}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact & Additional Info */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-6">
                Additional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Enter emergency contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Enter emergency contact phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    ID Type
                  </label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                  >
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="national_id">National ID</option>
                    <option value="ssn">Social Security Number</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Enter ID number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    placeholder="Additional notes about the employee"
                  />
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-[#FFEDED] dark:bg-[#331111] border border-[#E12929] dark:border-[#FF6B6B] rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <AlertCircle size={16} className="text-[#E12929] dark:text-[#FF6B6B] mr-2" />
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B]">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4">
              <a
                href="/human-resources/staff-management"
                className="px-6 py-2 border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding Staff...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Add Staff Member
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}