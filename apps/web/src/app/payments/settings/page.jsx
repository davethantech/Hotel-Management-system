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
  CreditCard,
  Shield,
  Key,
  Globe,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  EyeOff
} from "lucide-react";
import useUser from "@/utils/useUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PaymentSettingsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    rooms: false,
    customers: false,
    accounts: true,
    hr: false,
    reports: false,
    pos: false,
    inventory: false,
    settings: false,
  });

  const [settings, setSettings] = useState({
    // Payment Gateway Settings
    stripe_enabled: true,
    stripe_public_key: '',
    stripe_secret_key: '',
    paypal_enabled: false,
    paypal_client_id: '',
    paypal_client_secret: '',
    square_enabled: false,
    square_application_id: '',
    square_access_token: '',
    
    // Payment Options
    accept_credit_cards: true,
    accept_debit_cards: true,
    accept_cash: true,
    accept_bank_transfer: false,
    accept_digital_wallets: true,
    
    // Transaction Settings
    currency: 'USD',
    tax_rate: '8.5',
    service_charge: '10.0',
    processing_fee: '2.9',
    minimum_payment: '10.00',
    maximum_payment: '10000.00',
    
    // Security Settings
    require_cvv: true,
    require_billing_address: true,
    enable_3d_secure: true,
    fraud_detection: true,
    
    // Notification Settings
    payment_success_email: true,
    payment_failure_email: true,
    daily_summary_email: true,
    webhook_url: '',
    
    // Refund Settings
    auto_refund_enabled: false,
    refund_window_days: '7',
    partial_refunds_allowed: true,
    refund_processing_fee: false
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("gateways");
  const [showSecrets, setShowSecrets] = useState({});

  const queryClient = useQueryClient();

  const saveSettingsMutation = useMutation({
    mutationFn: async (settingsData) => {
      const response = await fetch('/api/payments/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });
      if (!response.ok) {
        throw new Error('Failed to save payment settings');
      }
      return response.json();
    },
    onSuccess: () => {
      setHasChanges(false);
    },
    onError: (error) => {
      console.error('Error saving payment settings:', error);
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
    setHasChanges(false);
  };

  const toggleSecretVisibility = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
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
      active: true,
      hasChildren: true,
      key: "accounts",
      children: [
        { label: "Payment Settings", href: "/payments/settings", active: true },
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

  const tabs = [
    { id: "gateways", label: "Payment Gateways", icon: CreditCard },
    { id: "options", label: "Payment Options", icon: DollarSign },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "refunds", label: "Refunds", icon: RotateCcw }
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
                placeholder="Search payment settings..."
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
                Payment Settings
              </h1>
              <p className="text-[#8A94A7] dark:text-[#A0A0A0]">
                Configure payment gateways, security settings, and transaction preferences
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
              {/* Payment Gateways */}
              {activeTab === "gateways" && (
                <div className="space-y-8">
                  {/* Stripe */}
                  <div className="border border-[#EDF0F4] dark:border-[#333333] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center mr-4">
                          <CreditCard size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">Stripe</h3>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Accept credit cards and online payments</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.stripe_enabled}
                        onChange={(value) => handleSettingChange('stripe_enabled', value)}
                      />
                    </div>
                    
                    {settings.stripe_enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Publishable Key
                          </label>
                          <input
                            type="text"
                            value={settings.stripe_public_key}
                            onChange={(e) => handleSettingChange('stripe_public_key', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                            placeholder="pk_test_..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Secret Key
                          </label>
                          <div className="relative">
                            <input
                              type={showSecrets.stripe_secret ? "text" : "password"}
                              value={settings.stripe_secret_key}
                              onChange={(e) => handleSettingChange('stripe_secret_key', e.target.value)}
                              className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                              placeholder="sk_test_..."
                            />
                            <button
                              type="button"
                              onClick={() => toggleSecretVisibility('stripe_secret')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                            >
                              {showSecrets.stripe_secret ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div className="border border-[#EDF0F4] dark:border-[#333333] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-[#0070BA] rounded-lg flex items-center justify-center mr-4">
                          <Globe size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">PayPal</h3>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Accept PayPal payments</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.paypal_enabled}
                        onChange={(value) => handleSettingChange('paypal_enabled', value)}
                      />
                    </div>
                    
                    {settings.paypal_enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Client ID
                          </label>
                          <input
                            type="text"
                            value={settings.paypal_client_id}
                            onChange={(e) => handleSettingChange('paypal_client_id', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                            placeholder="PayPal Client ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Client Secret
                          </label>
                          <div className="relative">
                            <input
                              type={showSecrets.paypal_secret ? "text" : "password"}
                              value={settings.paypal_client_secret}
                              onChange={(e) => handleSettingChange('paypal_client_secret', e.target.value)}
                              className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                              placeholder="PayPal Client Secret"
                            />
                            <button
                              type="button"
                              onClick={() => toggleSecretVisibility('paypal_secret')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                            >
                              {showSecrets.paypal_secret ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Square */}
                  <div className="border border-[#EDF0F4] dark:border-[#333333] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mr-4">
                          <Package size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">Square</h3>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Accept in-person and online payments</p>
                        </div>
                      </div>
                      <ToggleSwitch
                        enabled={settings.square_enabled}
                        onChange={(value) => handleSettingChange('square_enabled', value)}
                      />
                    </div>
                    
                    {settings.square_enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Application ID
                          </label>
                          <input
                            type="text"
                            value={settings.square_application_id}
                            onChange={(e) => handleSettingChange('square_application_id', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                            placeholder="Square Application ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                            Access Token
                          </label>
                          <div className="relative">
                            <input
                              type={showSecrets.square_token ? "text" : "password"}
                              value={settings.square_access_token}
                              onChange={(e) => handleSettingChange('square_access_token', e.target.value)}
                              className="w-full px-3 py-2 pr-10 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                              placeholder="Square Access Token"
                            />
                            <button
                              type="button"
                              onClick={() => toggleSecretVisibility('square_token')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF]"
                            >
                              {showSecrets.square_token ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Options */}
              {activeTab === "options" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">Accepted Payment Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Credit Cards</h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Visa, Mastercard, American Express</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.accept_credit_cards}
                          onChange={(value) => handleSettingChange('accept_credit_cards', value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Debit Cards</h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">PIN and signature debit cards</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.accept_debit_cards}
                          onChange={(value) => handleSettingChange('accept_debit_cards', value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Cash Payments</h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Accept cash at front desk</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.accept_cash}
                          onChange={(value) => handleSettingChange('accept_cash', value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Bank Transfer</h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Wire transfers and ACH</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.accept_bank_transfer}
                          onChange={(value) => handleSettingChange('accept_bank_transfer', value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-[#EDF0F4] dark:border-[#333333] rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Digital Wallets</h4>
                          <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Apple Pay, Google Pay, Samsung Pay</p>
                        </div>
                        <ToggleSwitch
                          enabled={settings.accept_digital_wallets}
                          onChange={(value) => handleSettingChange('accept_digital_wallets', value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5] mb-4">Transaction Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Default Currency
                        </label>
                        <select
                          value={settings.currency}
                          onChange={(e) => handleSettingChange('currency', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                          <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Tax Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={settings.tax_rate}
                          onChange={(e) => handleSettingChange('tax_rate', e.target.value)}
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
                          value={settings.service_charge}
                          onChange={(e) => handleSettingChange('service_charge', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Processing Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={settings.processing_fee}
                          onChange={(e) => handleSettingChange('processing_fee', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Minimum Payment
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={settings.minimum_payment}
                          onChange={(e) => handleSettingChange('minimum_payment', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                          Maximum Payment
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={settings.maximum_payment}
                          onChange={(e) => handleSettingChange('maximum_payment', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                        />
                      </div>
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
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Require CVV Verification</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Require CVV code for all card transactions</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.require_cvv}
                        onChange={(value) => handleSettingChange('require_cvv', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Require Billing Address</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Require billing address for verification</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.require_billing_address}
                        onChange={(value) => handleSettingChange('require_billing_address', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Enable 3D Secure</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Additional authentication for card payments</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.enable_3d_secure}
                        onChange={(value) => handleSettingChange('enable_3d_secure', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Fraud Detection</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Automatically detect and block suspicious transactions</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.fraud_detection}
                        onChange={(value) => handleSettingChange('fraud_detection', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Payment Success Emails</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Send confirmation emails for successful payments</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.payment_success_email}
                        onChange={(value) => handleSettingChange('payment_success_email', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Payment Failure Emails</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Send notifications for failed payments</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.payment_failure_email}
                        onChange={(value) => handleSettingChange('payment_failure_email', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Daily Summary Emails</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Daily payment summary reports</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.daily_summary_email}
                        onChange={(value) => handleSettingChange('daily_summary_email', value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={settings.webhook_url}
                      onChange={(e) => handleSettingChange('webhook_url', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                      placeholder="https://your-domain.com/webhook"
                    />
                    <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mt-1">
                      URL to receive payment event notifications
                    </p>
                  </div>
                </div>
              )}

              {/* Refunds */}
              {activeTab === "refunds" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Auto Refunds</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Automatically process eligible refunds</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.auto_refund_enabled}
                        onChange={(value) => handleSettingChange('auto_refund_enabled', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Allow Partial Refunds</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Enable partial refund processing</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.partial_refunds_allowed}
                        onChange={(value) => handleSettingChange('partial_refunds_allowed', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">Refund Processing Fee</h3>
                        <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Refund processing fees along with payments</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.refund_processing_fee}
                        onChange={(value) => handleSettingChange('refund_processing_fee', value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
                      Refund Window (Days)
                    </label>
                    <input
                      type="number"
                      value={settings.refund_window_days}
                      onChange={(e) => handleSettingChange('refund_window_days', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#2A2A2A] border border-[#E1E6ED] dark:border-[#404040] rounded-lg text-sm text-[#07111F] dark:text-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#4F8BFF] dark:focus:ring-[#5B94FF]"
                    />
                    <p className="text-xs text-[#8A94A7] dark:text-[#A0A0A0] mt-1">
                      Number of days customers can request refunds
                    </p>
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
                  Payment Security Notice
                </h4>
                <p className="text-sm text-[#536081] dark:text-[#B0B0B0]">
                  All payment data is encrypted and processed securely. API keys and sensitive information 
                  are stored using industry-standard encryption. Never share your secret keys or access tokens 
                  with unauthorized personnel.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}