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
  Building
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";

export default function RoomFacilitiesPage() {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch room types and facilities data
  const { data: roomTypes, isLoading: roomTypesLoading } = useQuery({
    queryKey: ['room-types'],
    queryFn: async () => {
      const response = await fetch('/api/room-types');
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      return response.json();
    },
    enabled: !!user
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

  // Sample room types data with facilities
  const sampleRoomTypes = [
    {
      id: 1,
      type_name: "Standard Single",
      description: "Comfortable single room perfect for business travelers",
      base_price: 89.00,
      max_occupancy: 1,
      amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Private Bathroom", "Work Desk", "Coffee Maker"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      is_active: true,
      room_count: 15,
      available_rooms: 12
    },
    {
      id: 2,
      type_name: "Standard Double",
      description: "Spacious double room with modern amenities",
      base_price: 129.00,
      max_occupancy: 2,
      amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Private Bathroom", "Mini Fridge", "Coffee Maker", "Room Service"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      is_active: true,
      room_count: 20,
      available_rooms: 18
    },
    {
      id: 3,
      type_name: "Deluxe Suite",
      description: "Luxurious suite with separate living area and premium amenities",
      base_price: 249.00,
      max_occupancy: 4,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Private Bathroom", "Mini Bar", "Coffee Machine", "Room Service", "Balcony", "Jacuzzi", "Premium Bedding"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      is_active: true,
      room_count: 8,
      available_rooms: 6
    },
    {
      id: 4,
      type_name: "Family Room",
      description: "Perfect for families with children, featuring extra space and amenities",
      base_price: 189.00,
      max_occupancy: 6,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Private Bathroom", "Mini Fridge", "Coffee Maker", "Room Service", "Extra Beds", "Children's Amenities"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      is_active: true,
      room_count: 12,
      available_rooms: 10
    },
    {
      id: 5,
      type_name: "Presidential Suite",
      description: "Ultimate luxury with panoramic views and exclusive services",
      base_price: 599.00,
      max_occupancy: 4,
      amenities: ["Free WiFi", "Air Conditioning", "Smart TV", "Private Bathroom", "Full Kitchen", "Premium Coffee Machine", "24/7 Butler Service", "Private Balcony", "Jacuzzi", "Premium Bedding", "Dining Area", "Living Room"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      is_active: true,
      room_count: 2,
      available_rooms: 1
    }
  ];

  const displayRoomTypes = roomTypes || sampleRoomTypes;

  // Filter room types based on search and filters
  const filteredRoomTypes = displayRoomTypes.filter(roomType => {
    const matchesSearch = roomType.type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roomType.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || roomType.type_name.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && roomType.is_active) ||
                         (statusFilter === "inactive" && !roomType.is_active);
    return matchesSearch && matchesType && matchesStatus;
  });

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi size={16} />;
    if (amenityLower.includes('tv')) return <Tv size={16} />;
    if (amenityLower.includes('air') || amenityLower.includes('conditioning')) return <Wind size={16} />;
    if (amenityLower.includes('bathroom')) return <Bath size={16} />;
    if (amenityLower.includes('coffee')) return <Coffee size={16} />;
    if (amenityLower.includes('service') || amenityLower.includes('room service')) return <Utensils size={16} />;
    if (amenityLower.includes('bed')) return <Bed size={16} />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={16} />;
    return <Star size={16} />;
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
                placeholder="Search room types..."
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
                Room Facilities
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Manage room types, amenities, and facility configurations
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
              <a
                href="/rooms/facilities/new"
                className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Add Room Type
              </a>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6 mb-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-[#536081] dark:text-[#B0B0B0]">Room Type:</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                >
                  <option value="all">All Types</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-[#536081] dark:text-[#B0B0B0]">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Room Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {roomTypesLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden animate-pulse" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="h-48 bg-[#F5F7FB] dark:bg-[#333333]"></div>
                  <div className="p-6">
                    <div className="h-6 bg-[#F5F7FB] dark:bg-[#333333] rounded mb-2"></div>
                    <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-3/4"></div>
                      <div className="h-4 bg-[#F5F7FB] dark:bg-[#333333] rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredRoomTypes.length > 0 ? (
              filteredRoomTypes.map((roomType) => (
                <div key={roomType.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden hover:shadow-lg transition-shadow" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  {/* Room Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#4F8BFF] to-[#3D6FE5] flex items-center justify-center">
                    <ImageIcon size={48} className="text-white opacity-50" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        roomType.is_active 
                          ? 'bg-[#EAF9F0] dark:bg-[#0A2A1A] text-[#0E9250] dark:text-[#4ADE80]'
                          : 'bg-[#FFEDED] dark:bg-[#331111] text-[#E12929] dark:text-[#FF6B6B]'
                      }`}>
                        {roomType.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#07111F] dark:text-[#E5E5E5] mb-1">
                          {roomType.type_name}
                        </h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                          {roomType.description}
                        </p>
                      </div>
                    </div>

                    {/* Price and Occupancy */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-[#4F8BFF] dark:text-[#5B94FF]">
                          ${roomType.base_price}
                          <span className="text-sm font-normal text-[#8A94A7] dark:text-[#A0A0A0]">/night</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
                        <Users2 size={16} className="mr-1" />
                        Max {roomType.max_occupancy}
                      </div>
                    </div>

                    {/* Room Availability */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Building size={16} className="text-[#536081] dark:text-[#B0B0B0]" />
                        <span className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
                          {roomType.room_count} Total Rooms
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-[#0E9250] dark:text-[#4ADE80] font-medium">
                          {roomType.available_rooms} Available
                        </span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-3">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {roomType.amenities.slice(0, 6).map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-[#536081] dark:text-[#B0B0B0]">
                            <span className="text-[#4F8BFF] dark:text-[#5B94FF]">
                              {getAmenityIcon(amenity)}
                            </span>
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                        {roomType.amenities.length > 6 && (
                          <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0] col-span-2">
                            +{roomType.amenities.length - 6} more amenities
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#EDF0F4] dark:border-[#333333]">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F1F5FF] dark:hover:bg-[#2A2A2A] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-[#E12929] dark:text-[#FF6B6B] hover:bg-[#FFEDED] dark:hover:bg-[#331111] rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <button className="px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white text-sm rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors">
                        Manage Rooms
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-12 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <BedDouble size={48} className="text-[#8A94A7] dark:text-[#A0A0A0] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                    No room types found
                  </h3>
                  <p className="text-[#8A94A7] dark:text-[#A0A0A0] mb-4">
                    {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first room type"
                    }
                  </p>
                  <a
                    href="/rooms/facilities/new"
                    className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Room Type
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          {filteredRoomTypes.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Room Types</p>
                    <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                      {displayRoomTypes.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg flex items-center justify-center">
                    <Grid3X3 size={24} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Total Rooms</p>
                    <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                      {displayRoomTypes.reduce((sum, type) => sum + type.room_count, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#EAF9F0] dark:bg-[#0A2A1A] rounded-lg flex items-center justify-center">
                    <Building size={24} className="text-[#0E9250] dark:text-[#4ADE80]" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-[#EDF0F4] dark:border-[#333333]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Available Rooms</p>
                    <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                      {displayRoomTypes.reduce((sum, type) => sum + type.available_rooms, 0)}
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
                    <p className="text-[#8A94A7] dark:text-[#A0A0A0] text-sm font-medium">Avg. Price</p>
                    <p className="text-[#07111F] dark:text-[#E5E5E5] text-2xl font-bold">
                      ${(displayRoomTypes.reduce((sum, type) => sum + type.base_price, 0) / displayRoomTypes.length).toFixed(0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#FFF3E0] dark:bg-[#332211] rounded-lg flex items-center justify-center">
                    <DollarSign size={24} className="text-[#FF8A48] dark:text-[#FFA366]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}