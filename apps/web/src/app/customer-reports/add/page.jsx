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
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Download,
  Eye
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

export default function AddCustomerReportPage() {
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
    report_name: '',
    report_type: '',
    customer_id: '',
    date_range: '',
    start_date: '',
    end_date: '',
    include_bookings: true,
    include_payments: true,
    include_services: false,
    include_feedback: false,
    format: 'pdf',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const queryClient = useQueryClient();

  // Fetch customers for dropdown
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return response.json();
    }
  });

  const generateReportMutation = useMutation({
    mutationFn: async (reportData) => {
      const response = await fetch('/api/customer-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['customer-reports']);
      window.location.href = '/customer-reports';
    },
    onError: (error) => {
      console.error('Error generating report:', error);
      setErrors({ submit: 'Failed to generate report. Please try again.' });
      setIsGenerating(false);
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
        { label: "Customer Reports", href: "/customer-reports", active: true }
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-set date range when predefined option is selected
    if (name === 'date_range' && value !== 'custom') {
      const today = new Date();
      let startDate = new Date();
      
      switch (value) {
        case 'today':
          startDate = today;
          break;
        case 'week':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(today.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          return;
      }
      
      setFormData(prev => ({
        ...prev,
        start_date: startDate.toISOString().split('T')[0],
        end_date: today.toISOString().split('T')[0]
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.report_name.trim()) {
      newErrors.report_name = 'Report name is required';
    }
    
    if (!formData.report_type) {
      newErrors.report_type = 'Report type is required';
    }
    
    if (formData.date_range === 'custom') {
      if (!formData.start_date) {
        newErrors.start_date = 'Start date is required';
      }
      if (!formData.end_date) {
        newErrors.end_date = 'End date is required';
      }
      if (formData.start_date && formData.end_date && formData.start_date > formData.end_date) {
        newErrors.end_date = 'End date must be after start date';
      }
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
    setIsGenerating(true);
    generateReportMutation.mutate(formData);
  };

  const handlePreview = () => {
    if (!validateForm()) {
      return;
    }
    
    // Mock preview functionality
    alert('Report preview would be shown here');
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
                placeholder="Search reports..."
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
                href="/customer-reports"
                className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
              </a>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                  Generate Customer Report
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                  Create detailed analytics and reports for customer data
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Report Configuration */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Report Configuration
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Report Name *
                    </label>
                    <input
                      type="text"
                      name="report_name"
                      value={formData.report_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.report_name 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                      placeholder="Enter report name"
                    />
                    {errors.report_name && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.report_name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Report Type *
                    </label>
                    <select
                      name="report_type"
                      value={formData.report_type}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.report_type 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                    >
                      <option value="">Select report type</option>
                      <option value="booking_summary">Booking Summary</option>
                      <option value="payment_history">Payment History</option>
                      <option value="service_analysis">Service Analysis</option>
                      <option value="loyalty_report">Loyalty Report</option>
                      <option value="satisfaction_survey">Satisfaction Survey</option>
                      <option value="revenue_analysis">Revenue Analysis</option>
                    </select>
                    {errors.report_type && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.report_type}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Customer (Optional)
                    </label>
                    <select
                      name="customer_id"
                      value={formData.customer_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    >
                      <option value="">All Customers</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.first_name} {customer.last_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Output Format
                    </label>
                    <select
                      name="format"
                      value={formData.format}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="excel">Excel Spreadsheet</option>
                      <option value="csv">CSV File</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                      placeholder="Enter report description (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#451A03] rounded-lg flex items-center justify-center mr-3">
                    <Calendar size={20} className="text-[#F59E0B] dark:text-[#FCD34D]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Date Range
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Date Range
                    </label>
                    <select
                      name="date_range"
                      value={formData.date_range}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]"
                    >
                      <option value="">Select date range</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="quarter">Last 3 Months</option>
                      <option value="year">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      disabled={formData.date_range !== 'custom'}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.start_date 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                    />
                    {errors.start_date && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.start_date}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      disabled={formData.date_range !== 'custom'}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.end_date 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040] focus:border-[#4F8BFF] dark:focus:border-[#5B94FF]'
                      }`}
                    />
                    {errors.end_date && (
                      <div className="flex items-center mt-1 text-[#E12929] dark:text-[#FF6B6B] text-xs">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.end_date}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Report Options */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg flex items-center justify-center mr-3">
                    <Filter size={20} className="text-[#10B981] dark:text-[#34D399]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Report Options
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="include_bookings"
                        checked={formData.include_bookings}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#4F8BFF] bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-2"
                      />
                      <label className="ml-2 text-sm text-[#07111F] dark:text-[#E5E5E5]">
                        Include Booking Data
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="include_payments"
                        checked={formData.include_payments}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#4F8BFF] bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-2"
                      />
                      <label className="ml-2 text-sm text-[#07111F] dark:text-[#E5E5E5]">
                        Include Payment History
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="include_services"
                        checked={formData.include_services}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#4F8BFF] bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-2"
                      />
                      <label className="ml-2 text-sm text-[#07111F] dark:text-[#E5E5E5]">
                        Include Service Usage
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="include_feedback"
                        checked={formData.include_feedback}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#4F8BFF] bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] rounded focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] focus:ring-2"
                      />
                      <label className="ml-2 text-sm text-[#07111F] dark:text-[#E5E5E5]">
                        Include Customer Feedback
                      </label>
                    </div>
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
                  href="/customer-reports"
                  className="px-6 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  Cancel
                </a>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="inline-flex items-center px-6 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  Preview
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={16} className="mr-2" />
                      Generate Report
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