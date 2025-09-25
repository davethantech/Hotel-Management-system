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
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function AppSettingsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: false,
    accounts: false,
    hr: false,
    reports: false,
    pos: false,
    inventory: false,
    settings: true,
  });

  const [settings, setSettings] = useState({
    // General Settings
    hotelName: "Urbane Hospitium",
    hotelDescription: "Premium hospitality management system",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12",
    currency: "USD",
    language: "en",
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    maintenanceAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    
    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    debugMode: false,
    
    // Display Settings
    darkMode: false,
    compactView: false,
    showTips: true,
    animationsEnabled: true,
    
    // Business Settings
    checkInTime: "15:00",
    checkOutTime: "11:00",
    cancellationPolicy: "24",
    taxRate: "8.5",
    serviceCharge: "10"
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const queryClient = useQueryClient();

  // Save settings mutation
  const saveSettingsMutation = useMutation({
    mutationFn: async (settingsData) => {
      const response = await fetch('/api/settings/app', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });
      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      return response.json();
    },
    onSuccess: () => {
      setHasChanges(false);
      // Show success message
    },
    onError: (error) => {
      console.error('Error saving settings:', error);
    },
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    saveSettingsMutation.mutate(settings);
  };

  const handleReset = () => {
    // Reset to original values (you would fetch from API)
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
      active: true,
      hasChildren: true,
      key: "settings",
      children: [
        { label: "Application Settings", href: "/settings/app", active: true },
        { label: "Web Settings", href: "/settings/web" },
        { label: "Language Settings", href: "/settings/language" }
      ]
    },
    { icon: LogOut, label: "Log Out", isLogout: true, href: "/account/logout" },
  ];

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "system", label: "System", icon: Database },
    { id: "display", label: "Display", icon: Monitor },
    { id: "business", label: "Business", icon: Hotel }
  ];

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled 
          ? 'bg-[#4F8BFF] dark:bg-[#5B94FF]' 
          : 'bg-[#E1E6ED] dark:bg-[#404040]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
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
                    : item.active
                    ? "bg-[#4F8BFF] dark:bg-[#5B94FF] text-white"
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
                Application Settings
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Configure your hotel management system preferences and options
              </p>
            </div>
            {hasChanges && (
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] text-[#536081] dark:text-[#B0B0B0] rounded-lg hover:bg-[#F5F7FB] dark:hover:bg-[#333333] transition-colors"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveSettingsMutation.isLoading}
                  className="inline-flex items-center px-4 py-2 bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded-lg hover:bg-[#3D6FE5] dark:hover:bg-[#4F8BFF] transition-colors disabled:opacity-50"
                >
                  {saveSettingsMutation.isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Settings Content */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Hotel Name
                      </label>
                      <input
                        type="text"
                        value={settings.hotelName}
                        onChange={(e) => handleSettingChange('hotelName', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Time Format
                      </label>
                      <select
                        value={settings.timeFormat}
                        onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="12">12 Hour</option>
                        <option value="24">24 Hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSettingChange('currency', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Hotel Description
                    </label>
                    <textarea
                      value={settings.hotelDescription}
                      onChange={(e) => handleSettingChange('hotelDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="Brief description of your hotel..."
                    />
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Email Notifications</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Receive notifications via email</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.emailNotifications}
                        onChange={(value) => handleSettingChange('emailNotifications', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">SMS Notifications</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Receive notifications via SMS</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.smsNotifications}
                        onChange={(value) => handleSettingChange('smsNotifications', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Push Notifications</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Receive browser push notifications</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.pushNotifications}
                        onChange={(value) => handleSettingChange('pushNotifications', value)}
                      />
                    </div>
                  </div>
                  
                  <hr className="border-[#EDF0F4] dark:border-[#333333]" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#07111F] dark:text-[#E5E5E5]">Alert Types</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Booking Alerts</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">New bookings and cancellations</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.bookingAlerts}
                        onChange={(value) => handleSettingChange('bookingAlerts', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Payment Alerts</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Payment confirmations and failures</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.paymentAlerts}
                        onChange={(value) => handleSettingChange('paymentAlerts', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Maintenance Alerts</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Room maintenance and housekeeping</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.maintenanceAlerts}
                        onChange={(value) => handleSettingChange('maintenanceAlerts', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Two-Factor Authentication</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Add an extra layer of security to your account</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.twoFactorAuth}
                        onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                      />
                    </div>
                  </div>
                  
                  <hr className="border-[#EDF0F4] dark:border-[#333333]" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.loginAttempts}
                        onChange={(e) => handleSettingChange('loginAttempts', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === "system" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Auto Backup</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Automatically backup system data</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.autoBackup}
                        onChange={(value) => handleSettingChange('autoBackup', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Maintenance Mode</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Put system in maintenance mode</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.maintenanceMode}
                        onChange={(value) => handleSettingChange('maintenanceMode', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Debug Mode</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Enable detailed error logging</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.debugMode}
                        onChange={(value) => handleSettingChange('debugMode', value)}
                      />
                    </div>
                  </div>
                  
                  <hr className="border-[#EDF0F4] dark:border-[#333333]" />
                  
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Backup Frequency
                    </label>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                      disabled={!settings.autoBackup}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF] disabled:opacity-50"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Display Settings */}
              {activeTab === "display" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Dark Mode</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Use dark theme for the interface</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.darkMode}
                        onChange={(value) => handleSettingChange('darkMode', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Compact View</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Use compact layout for tables and lists</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.compactView}
                        onChange={(value) => handleSettingChange('compactView', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Show Tips</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Display helpful tips and hints</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.showTips}
                        onChange={(value) => handleSettingChange('showTips', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Animations</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Enable interface animations</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.animationsEnabled}
                        onChange={(value) => handleSettingChange('animationsEnabled', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Business Settings */}
              {activeTab === "business" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Check-in Time
                      </label>
                      <input
                        type="time"
                        value={settings.checkInTime}
                        onChange={(e) => handleSettingChange('checkInTime', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Check-out Time
                      </label>
                      <input
                        type="time"
                        value={settings.checkOutTime}
                        onChange={(e) => handleSettingChange('checkOutTime', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Cancellation Policy (hours)
                      </label>
                      <input
                        type="number"
                        value={settings.cancellationPolicy}
                        onChange={(e) => handleSettingChange('cancellationPolicy', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.taxRate}
                        onChange={(e) => handleSettingChange('taxRate', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                        Service Charge (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.serviceCharge}
                        onChange={(e) => handleSettingChange('serviceCharge', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="mt-8 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-xl p-6 border border-[#4F8BFF] dark:border-[#5B94FF]">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-[#4F8BFF] dark:text-[#5B94FF] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-1">
                  Settings Information
                </h4>
                <p className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                  Changes to these settings will affect the entire hotel management system. 
                  Some changes may require a system restart to take effect. Make sure to save 
                  your changes before navigating away from this page.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}