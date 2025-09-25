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
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  CreditCard,
  AlertCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewCustomerPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: true,
    accounts: false,
    hr: false,
    reports: false,
    pos: false,
    inventory: false,
    settings: false,
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    id_type: '',
    id_number: '',
    date_of_birth: '',
    nationality: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: async (customerData) => {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create customer');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      window.location.href = '/customers';
    },
    onError: (error) => {
      console.error('Error creating customer:', error);
      setErrors({ submit: 'Failed to create customer. Please try again.' });
    }
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
      active: true,
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
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
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
    createCustomerMutation.mutate(formData);
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
                placeholder="Search customers..."
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
            <div className="flex items-center space-x-4">
              <a
                href="/customers"
                className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
              </a>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                  Add New Customer
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                  Create a new customer profile for your hotel
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center mr-3">
                    <User size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.first_name 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.first_name && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.first_name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.last_name 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.last_name && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.last_name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Nationality
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    >
                      <option value="">Select nationality</option>
                      <option value="American">American</option>
                      <option value="British">British</option>
                      <option value="Canadian">Canadian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Indian">Indian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center mr-3">
                    <Phone size={20} className="text-[#10B981] dark:text-[#34D399]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        errors.email 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.email}
                      </div>
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
                        errors.phone 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.phone}
                      </div>
                    )}
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
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>

              {/* Identification */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center mr-3">
                    <CreditCard size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Identification
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      ID Type
                    </label>
                    <select
                      name="id_type"
                      value={formData.id_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    >
                      <option value="">Select ID type</option>
                      <option value="passport">Passport</option>
                      <option value="drivers_license">Driver's License</option>
                      <option value="national_id">National ID</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      ID Number
                    </label>
                    <input
                      type="text"
                      name="id_number"
                      value={formData.id_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-[#FFEDED] dark:bg-[#331111] border border-[#E12929] dark:border-[#FF6B6B] rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="text-[#E12929] dark:text-[#FF6B6B] mr-3" />
                    <span className="text-[#E12929] dark:text-[#FF6B6B] text-sm">{errors.submit}</span>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6">
                <a
                  href="/customers"
                  className="px-6 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Create Customer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}