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
  AlertCircle,
  Upload,
  Trash2,
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
  Building
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function NewRoomTypePage() {
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
    type_name: '',
    description: '',
    base_price: '',
    max_occupancy: 2,
    amenities: [],
    images: [],
    is_active: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');

  const queryClient = useQueryClient();

  // Available amenities with icons
  const availableAmenities = [
    { name: 'Free WiFi', icon: Wifi },
    { name: 'Air Conditioning', icon: Wind },
    { name: 'Flat Screen TV', icon: Tv },
    { name: 'Smart TV', icon: Tv },
    { name: 'Private Bathroom', icon: Bath },
    { name: 'Mini Fridge', icon: Package },
    { name: 'Coffee Maker', icon: Coffee },
    { name: 'Coffee Machine', icon: Coffee },
    { name: 'Room Service', icon: Utensils },
    { name: 'Work Desk', icon: Building },
    { name: 'Mini Bar', icon: Utensils },
    { name: 'Balcony', icon: Building },
    { name: 'Jacuzzi', icon: Bath },
    { name: 'Premium Bedding', icon: Bed },
    { name: 'Extra Beds', icon: Bed },
    { name: 'Children\'s Amenities', icon: Users2 },
    { name: 'Full Kitchen', icon: Utensils },
    { name: '24/7 Butler Service', icon: User },
    { name: 'Private Balcony', icon: Building },
    { name: 'Dining Area', icon: Utensils },
    { name: 'Living Room', icon: Building },
    { name: 'Parking', icon: Car }
  ];

  // Create room type mutation
  const createRoomTypeMutation = useMutation({
    mutationFn: async (roomTypeData) => {
      const response = await fetch('/api/room-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomTypeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create room type');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['room-types']);
      window.location.href = '/rooms/facilities';
    },
    onError: (error) => {
      console.error('Error creating room type:', error);
      setErrors({ submit: 'Failed to create room type. Please try again.' });
    },
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addAmenity = (amenityName) => {
    if (amenityName && !formData.amenities.includes(amenityName)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityName]
      }));
    }
  };

  const removeAmenity = (amenityToRemove) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove)
    }));
  };

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      addAmenity(newAmenity.trim());
      setNewAmenity('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type_name.trim()) {
      newErrors.type_name = 'Room type name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.base_price || parseFloat(formData.base_price) <= 0) {
      newErrors.base_price = 'Valid base price is required';
    }
    if (!formData.max_occupancy || formData.max_occupancy < 1) {
      newErrors.max_occupancy = 'Maximum occupancy must be at least 1';
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
      const submitData = {
        ...formData,
        base_price: parseFloat(formData.base_price),
        max_occupancy: parseInt(formData.max_occupancy)
      };
      await createRoomTypeMutation.mutateAsync(submitData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAmenityIcon = (amenityName) => {
    const amenity = availableAmenities.find(a => a.name === amenityName);
    return amenity ? amenity.icon : Star;
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
        { label: "Room Facilities", href: "/rooms/facilities", active: true },
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
                placeholder="Search room types..."
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
                href="/rooms/facilities"
                className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#536081] dark:text-[#A0A0A0]" />
              </a>
              <div>
                <h1 className="text-[#07111F] dark:text-[#E5E5E5] font-['Lato'] font-extrabold text-3xl mb-2">
                  Add New Room Type
                </h1>
                <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                  Create a new room type with amenities and pricing
                </p>
              </div>
            </div>
          </div>

          {/* Room Type Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333] bg-[#F7F9FC] dark:bg-[#262626]">
                <div className="flex items-center space-x-3">
                  <BedDouble size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Basic Information
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Room Type Name *
                    </label>
                    <input
                      type="text"
                      value={formData.type_name}
                      onChange={(e) => handleInputChange('type_name', e.target.value)}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.type_name 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040]'
                      }`}
                      placeholder="e.g., Deluxe Suite, Standard Single"
                    />
                    {errors.type_name && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.type_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Base Price (per night) *
                    </label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.base_price}
                        onChange={(e) => handleInputChange('base_price', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors.base_price 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.base_price && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.base_price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Maximum Occupancy *
                    </label>
                    <div className="relative">
                      <Users2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0]" />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.max_occupancy}
                        onChange={(e) => handleInputChange('max_occupancy', parseInt(e.target.value) || 1)}
                        className={`w-full pl-10 pr-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                          errors.max_occupancy 
                            ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                            : 'border-[#E1E6ED] dark:border-[#404040]'
                        }`}
                      />
                    </div>
                    {errors.max_occupancy && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.max_occupancy}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Status
                    </label>
                    <select
                      value={formData.is_active}
                      onChange={(e) => handleInputChange('is_active', e.target.value === 'true')}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] ${
                        errors.description 
                          ? 'border-[#E12929] dark:border-[#FF6B6B]' 
                          : 'border-[#E1E6ED] dark:border-[#404040]'
                      }`}
                      placeholder="Describe the room type, its features, and what makes it special..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-[#E12929] dark:text-[#FF6B6B] flex items-center">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333] bg-[#F7F9FC] dark:bg-[#262626]">
                <div className="flex items-center space-x-3">
                  <Star size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Amenities & Features
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                {/* Available Amenities */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-3">
                    Select Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {availableAmenities.map((amenity) => (
                      <button
                        key={amenity.name}
                        type="button"
                        onClick={() => addAmenity(amenity.name)}
                        disabled={formData.amenities.includes(amenity.name)}
                        className={`flex items-center space-x-2 p-3 rounded-lg border text-sm transition-colors ${
                          formData.amenities.includes(amenity.name)
                            ? 'bg-[#E8F0FF] dark:bg-[#1A2332] border-[#4F8BFF] dark:border-[#5B94FF] text-[#4F8BFF] dark:text-[#5B94FF] cursor-not-allowed'
                            : 'bg-white dark:bg-[#2A2A2A] border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#333333] hover:border-[#4F8BFF] dark:hover:border-[#5B94FF]'
                        }`}
                      >
                        <amenity.icon size={16} />
                        <span className="truncate">{amenity.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amenity */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-3">
                    Add Custom Amenity
                  </h3>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Enter custom amenity name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
                    />
                    <button
                      type="button"
                      onClick={addCustomAmenity}
                      className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Selected Amenities */}
                {formData.amenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-3">
                      Selected Amenities ({formData.amenities.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity) => {
                        const IconComponent = getAmenityIcon(amenity);
                        return (
                          <div
                            key={amenity}
                            className="flex items-center space-x-2 px-3 py-2 bg-[#E8F0FF] dark:bg-[#1A2332] border border-[#4F8BFF] dark:border-[#5B94FF] rounded-lg text-sm text-[#4F8BFF] dark:text-[#5B94FF]"
                          >
                            <IconComponent size={14} />
                            <span>{amenity}</span>
                            <button
                              type="button"
                              onClick={() => removeAmenity(amenity)}
                              className="text-[#E12929] dark:text-[#FF6B6B] hover:bg-[#FFEDED] dark:hover:bg-[#331111] rounded p-1 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 border-b border-[#EDF0F4] dark:border-[#333333] bg-[#F7F9FC] dark:bg-[#262626]">
                <div className="flex items-center space-x-3">
                  <ImageIcon size={20} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  <h2 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
                    Room Images
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="border-2 border-dashed border-[#E1E6ED] dark:border-[#404040] rounded-lg p-8 text-center">
                  <Upload size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    Upload Room Images
                  </h3>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] mb-4">
                    Drag and drop images here, or click to browse
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
                  >
                    <Upload size={16} className="mr-2" />
                    Choose Images
                  </button>
                  <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mt-2">
                    Supported formats: JPG, PNG, WebP (Max 5MB each)
                  </p>
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
                href="/rooms/facilities"
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
                    Create Room Type
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