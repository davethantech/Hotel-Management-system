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
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function NewReservationPage() {
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

  const [formData, setFormData] = useState({
    customer: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      id_type: '',
      id_number: '',
      date_of_birth: '',
      nationality: ''
    },
    booking: {
      room_id: '',
      check_in_date: '',
      check_out_date: '',
      adults: 1,
      children: 0,
      notes: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  // Fetch available rooms
  const { data: rooms, isLoading: roomsLoading } = useQuery({
    queryKey: ['available-rooms'],
    queryFn: async () => {
      const response = await fetch('/api/rooms/available');
      if (!response.ok) {
        throw new Error('Failed to fetch available rooms');
      }
      return response.json();
    },
    enabled: !!user
  });

  // Create reservation mutation
  const createReservationMutation = useMutation({
    mutationFn: async (reservationData) => {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      window.location.href = '/rooms/reservations';
    },
    onError: (error) => {
      console.error('Error creating reservation:', error);
      setErrors({ submit: 'Failed to create reservation. Please try again.' });
    },
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer validation
    if (!formData.customer.first_name.trim()) {
      newErrors['customer.first_name'] = 'First name is required';
    }
    if (!formData.customer.last_name.trim()) {
      newErrors['customer.last_name'] = 'Last name is required';
    }
    if (!formData.customer.email.trim()) {
      newErrors['customer.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customer.email)) {
      newErrors['customer.email'] = 'Email is invalid';
    }
    if (!formData.customer.phone.trim()) {
      newErrors['customer.phone'] = 'Phone number is required';
    }

    // Booking validation
    if (!formData.booking.room_id) {
      newErrors['booking.room_id'] = 'Room selection is required';
    }
    if (!formData.booking.check_in_date) {
      newErrors['booking.check_in_date'] = 'Check-in date is required';
    }
    if (!formData.booking.check_out_date) {
      newErrors['booking.check_out_date'] = 'Check-out date is required';
    }
    if (formData.booking.check_in_date && formData.booking.check_out_date) {
      if (new Date(formData.booking.check_in_date) >= new Date(formData.booking.check_out_date)) {
        newErrors['booking.check_out_date'] = 'Check-out date must be after check-in date';
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
    try {
      await createReservationMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
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

  const mockRooms = rooms || [
    { id: 1, room_number: "101", type_name: "Standard Single", base_price: 89.00 },
    { id: 2, room_number: "102", type_name: "Standard Single", base_price: 89.00 },
    { id: 3, room_number: "201", type_name: "Deluxe Double", base_price: 149.00 },
    { id: 4, room_number: "301", type_name: "Deluxe Suite", base_price: 249.00 },
    { id: 5, room_number: "401", type_name: "Family Room", base_price: 189.00 }
  ];

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
                href="/rooms/reservations"
                className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
              </a>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                  New Reservation
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                  Create a new room reservation for a guest
                </p>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333] bg-[#F7F9FC] dark:bg-[#262626]">
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Customer Information
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customer.first_name}
                      onChange={(e) => handleInputChange('customer', 'first_name', e.target.value)}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors['customer.first_name'] 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040]'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors['customer.first_name'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['customer.first_name']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customer.last_name}
                      onChange={(e) => handleInputChange('customer', 'last_name', e.target.value)}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors['customer.last_name'] 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040]'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors['customer.last_name'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['customer.last_name']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="email"
                        value={formData.customer.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors['customer.email'] 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors['customer.email'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['customer.email']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="tel"
                        value={formData.customer.phone}
                        onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors['customer.phone'] 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors['customer.phone'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['customer.phone']}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <textarea
                        value={formData.customer.address}
                        onChange={(e) => handleInputChange('customer', 'address', e.target.value)}
                        rows={3}
                        className="w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        placeholder="Enter full address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      ID Type
                    </label>
                    <select
                      value={formData.customer.id_type}
                      onChange={(e) => handleInputChange('customer', 'id_type', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
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
                      value={formData.customer.id_number}
                      onChange={(e) => handleInputChange('customer', 'id_number', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333] bg-[#F7F9FC] dark:bg-[#262626]">
                <div className="flex items-center space-x-3">
                  <BedDouble size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Booking Details
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Room *
                    </label>
                    <select
                      value={formData.booking.room_id}
                      onChange={(e) => handleInputChange('booking', 'room_id', e.target.value)}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors['booking.room_id'] 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040]'
                      }`}
                    >
                      <option value="">Select a room</option>
                      {mockRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          Room {room.room_number} - {room.type_name} (${room.base_price}/night)
                        </option>
                      ))}
                    </select>
                    {errors['booking.room_id'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['booking.room_id']}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-1"></div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Check-in Date *
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="date"
                        value={formData.booking.check_in_date}
                        onChange={(e) => handleInputChange('booking', 'check_in_date', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors['booking.check_in_date'] 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                      />
                    </div>
                    {errors['booking.check_in_date'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['booking.check_in_date']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Check-out Date *
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="date"
                        value={formData.booking.check_out_date}
                        onChange={(e) => handleInputChange('booking', 'check_out_date', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors['booking.check_out_date'] 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                      />
                    </div>
                    {errors['booking.check_out_date'] && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors['booking.check_out_date']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Adults
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.booking.adults}
                      onChange={(e) => handleInputChange('booking', 'adults', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Children
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.booking.children}
                      onChange={(e) => handleInputChange('booking', 'children', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Special Notes
                    </label>
                    <textarea
                      value={formData.booking.notes}
                      onChange={(e) => handleInputChange('booking', 'notes', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Any special requests or notes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-[#FFEDED] dark:bg-[#331111] border border-[#E12929] dark:border-[#FF6B6B] rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle size={20} className="text-[#E12929] dark:text-[#FF6B6B] mr-3" />
                  <p className="text-sm text-[#E12929] dark:text-[#FF6B6B]">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4">
              <a
                href="/rooms/reservations"
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
                    Create Reservation
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