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
  HelpCircle
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function RoomSettingsPage() {
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
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    defaultCheckInTime: "15:00",
    defaultCheckOutTime: "11:00",
    maxAdvanceBookingDays: 365,
    minAdvanceBookingHours: 2,
    allowSameDayBooking: true,
    autoConfirmBookings: false,
    requireDepositPercentage: 20,
    cancellationDeadlineHours: 24,
    
    // Room Management
    autoAssignRooms: true,
    allowRoomUpgrades: true,
    upgradeThresholdPercentage: 80,
    maintenanceMode: false,
    housekeepingBuffer: 30,
    cleaningTimeMinutes: 45,
    inspectionRequired: true,
    
    // Pricing & Availability
    dynamicPricing: false,
    weekendPremium: 15,
    seasonalAdjustments: true,
    lastMinuteDiscounts: false,
    groupBookingDiscount: 10,
    loyaltyDiscountPercentage: 5,
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    bookingConfirmations: true,
    reminderNotifications: true,
    maintenanceAlerts: true,
    lowInventoryAlerts: true,
    
    // Integration
    channelManagerSync: true,
    pmsIntegration: false,
    paymentGateway: "stripe",
    calendarSync: true,
    reportingFrequency: "daily",
    backupFrequency: "daily"
  });

  const queryClient = useQueryClient();

  // Fetch current settings
  const { data: currentSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['room-settings'],
    queryFn: async () => {
      const response = await fetch('/api/room-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch room settings');
      }
      return response.json();
    },
    enabled: !!user,
    onSuccess: (data) => {
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    }
  });

  // Save settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: async (newSettings) => {
      const response = await fetch('/api/room-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });
      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['room-settings']);
      setHasChanges(false);
    },
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    saveSettingsMutation.mutate(settings);
  };

  const handleResetSettings = () => {
    setSettings(currentSettings || {});
    setHasChanges(false);
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
        { label: "Room Settings", href: "/rooms/settings", active: true },
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

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "rooms", label: "Room Management", icon: BedDouble },
    { id: "pricing", label: "Pricing & Availability", icon: DollarSign },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Zap }
  ];

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
          {label}
        </label>
        {description && (
          <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mt-1">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled 
            ? 'bg-[#4F8BFF] dark:bg-[#5B94FF]' 
            : 'bg-[#E1E6ED] dark:bg-[#404040]'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

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
                placeholder="Search settings..."
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
                Room Settings
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Configure room management, booking policies, and system preferences
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {hasChanges && (
                <button
                  onClick={handleResetSettings}
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-[#536081] dark:text-[#B0B0B0] hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </button>
              )}
              <button
                onClick={handleSaveSettings}
                disabled={!hasChanges || saveSettingsMutation.isLoading}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                  hasChanges && !saveSettingsMutation.isLoading
                    ? "bg-[#4F8BFF] dark:bg-[#5B94FF] text-white hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF]"
                    : "bg-[#E1E6ED] dark:bg-[#404040] text-[#8A94A7] dark:text-[#808080] cursor-not-allowed"
                }`}
              >
                <Save size={16} className="mr-2" />
                {saveSettingsMutation.isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Settings Tabs */}
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
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Booking Policies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Default Check-in Time
                        </label>
                        <input
                          type="time"
                          value={settings.defaultCheckInTime}
                          onChange={(e) => handleSettingChange('defaultCheckInTime', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Default Check-out Time
                        </label>
                        <input
                          type="time"
                          value={settings.defaultCheckOutTime}
                          onChange={(e) => handleSettingChange('defaultCheckOutTime', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Max Advance Booking (Days)
                        </label>
                        <input
                          type="number"
                          value={settings.maxAdvanceBookingDays}
                          onChange={(e) => handleSettingChange('maxAdvanceBookingDays', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Min Advance Booking (Hours)
                        </label>
                        <input
                          type="number"
                          value={settings.minAdvanceBookingHours}
                          onChange={(e) => handleSettingChange('minAdvanceBookingHours', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Booking Options
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.allowSameDayBooking}
                        onChange={(value) => handleSettingChange('allowSameDayBooking', value)}
                        label="Allow Same-Day Booking"
                        description="Enable guests to book rooms for the same day"
                      />
                      <ToggleSwitch
                        enabled={settings.autoConfirmBookings}
                        onChange={(value) => handleSettingChange('autoConfirmBookings', value)}
                        label="Auto-Confirm Bookings"
                        description="Automatically confirm bookings without manual review"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Payment & Cancellation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Required Deposit (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.requireDepositPercentage}
                          onChange={(e) => handleSettingChange('requireDepositPercentage', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Cancellation Deadline (Hours)
                        </label>
                        <input
                          type="number"
                          value={settings.cancellationDeadlineHours}
                          onChange={(e) => handleSettingChange('cancellationDeadlineHours', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Room Management Settings */}
              {activeTab === "rooms" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Room Assignment
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.autoAssignRooms}
                        onChange={(value) => handleSettingChange('autoAssignRooms', value)}
                        label="Auto-Assign Rooms"
                        description="Automatically assign available rooms to new bookings"
                      />
                      <ToggleSwitch
                        enabled={settings.allowRoomUpgrades}
                        onChange={(value) => handleSettingChange('allowRoomUpgrades', value)}
                        label="Allow Room Upgrades"
                        description="Enable automatic room upgrades when higher categories are available"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Housekeeping
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Housekeeping Buffer (Minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.housekeepingBuffer}
                          onChange={(e) => handleSettingChange('housekeepingBuffer', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Cleaning Time (Minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.cleaningTimeMinutes}
                          onChange={(e) => handleSettingChange('cleaningTimeMinutes', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.inspectionRequired}
                        onChange={(value) => handleSettingChange('inspectionRequired', value)}
                        label="Inspection Required"
                        description="Require room inspection after cleaning before marking as ready"
                      />
                      <ToggleSwitch
                        enabled={settings.maintenanceMode}
                        onChange={(value) => handleSettingChange('maintenanceMode', value)}
                        label="Maintenance Mode"
                        description="Enable maintenance mode to prevent new bookings"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing & Availability Settings */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Pricing Strategy
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.dynamicPricing}
                        onChange={(value) => handleSettingChange('dynamicPricing', value)}
                        label="Dynamic Pricing"
                        description="Automatically adjust prices based on demand and availability"
                      />
                      <ToggleSwitch
                        enabled={settings.seasonalAdjustments}
                        onChange={(value) => handleSettingChange('seasonalAdjustments', value)}
                        label="Seasonal Adjustments"
                        description="Apply seasonal pricing adjustments"
                      />
                      <ToggleSwitch
                        enabled={settings.lastMinuteDiscounts}
                        onChange={(value) => handleSettingChange('lastMinuteDiscounts', value)}
                        label="Last-Minute Discounts"
                        description="Offer discounts for last-minute bookings"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Pricing Adjustments
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Weekend Premium (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={settings.weekendPremium}
                          onChange={(e) => handleSettingChange('weekendPremium', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Group Booking Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={settings.groupBookingDiscount}
                          onChange={(e) => handleSettingChange('groupBookingDiscount', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Loyalty Discount (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="25"
                          value={settings.loyaltyDiscountPercentage}
                          onChange={(e) => handleSettingChange('loyaltyDiscountPercentage', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Communication Preferences
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.emailNotifications}
                        onChange={(value) => handleSettingChange('emailNotifications', value)}
                        label="Email Notifications"
                        description="Send notifications via email"
                      />
                      <ToggleSwitch
                        enabled={settings.smsNotifications}
                        onChange={(value) => handleSettingChange('smsNotifications', value)}
                        label="SMS Notifications"
                        description="Send notifications via SMS"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      Notification Types
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.bookingConfirmations}
                        onChange={(value) => handleSettingChange('bookingConfirmations', value)}
                        label="Booking Confirmations"
                        description="Send confirmation notifications for new bookings"
                      />
                      <ToggleSwitch
                        enabled={settings.reminderNotifications}
                        onChange={(value) => handleSettingChange('reminderNotifications', value)}
                        label="Reminder Notifications"
                        description="Send reminder notifications before check-in"
                      />
                      <ToggleSwitch
                        enabled={settings.maintenanceAlerts}
                        onChange={(value) => handleSettingChange('maintenanceAlerts', value)}
                        label="Maintenance Alerts"
                        description="Send alerts for maintenance issues"
                      />
                      <ToggleSwitch
                        enabled={settings.lowInventoryAlerts}
                        onChange={(value) => handleSettingChange('lowInventoryAlerts', value)}
                        label="Low Inventory Alerts"
                        description="Send alerts when room availability is low"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      External Systems
                    </h3>
                    <div className="space-y-4">
                      <ToggleSwitch
                        enabled={settings.channelManagerSync}
                        onChange={(value) => handleSettingChange('channelManagerSync', value)}
                        label="Channel Manager Sync"
                        description="Sync availability and rates with channel manager"
                      />
                      <ToggleSwitch
                        enabled={settings.pmsIntegration}
                        onChange={(value) => handleSettingChange('pmsIntegration', value)}
                        label="PMS Integration"
                        description="Integrate with Property Management System"
                      />
                      <ToggleSwitch
                        enabled={settings.calendarSync}
                        onChange={(value) => handleSettingChange('calendarSync', value)}
                        label="Calendar Sync"
                        description="Sync bookings with external calendar systems"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#EDF0F4] dark:border-[#333333] pt-6">
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">
                      System Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Payment Gateway
                        </label>
                        <select
                          value={settings.paymentGateway}
                          onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        >
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="square">Square</option>
                          <option value="authorize">Authorize.Net</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Reporting Frequency
                        </label>
                        <select
                          value={settings.reportingFrequency}
                          onChange={(e) => handleSettingChange('reportingFrequency', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Settings Info Panel */}
          <div className="mt-8 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-xl p-6 border border-[#4F8BFF] dark:border-[#5B94FF]">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-[#4F8BFF] dark:text-[#5B94FF] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-1">
                  Settings Information
                </h4>
                <p className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                  Changes to these settings will affect how your hotel management system operates. 
                  Some changes may require system restart or affect existing bookings. 
                  Please review carefully before saving.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}