import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  BedDouble,
  ShoppingCart,
  Settings,
  FileText,
  Package,
  LogOut,
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: false,
    hasChildren: false,
    href: "/",
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
      { label: "Housekeeping", href: "/housekeeping" },
    ],
  },
  {
    icon: Users,
    label: "Customer Management",
    active: false,
    hasChildren: true,
    key: "customers",
    children: [
      { label: "Customer List", href: "/customers" },
      { label: "Customer Reports", href: "/customer-reports" },
    ],
  },
  {
    icon: DollarSign,
    label: "Accounts & Finance",
    active: false,
    hasChildren: true,
    key: "accounts",
    children: [
      { label: "Payment Settings", href: "/payments/settings" },
      { label: "Transactions", href: "/transactions" },
      { label: "Account Summary", href: "/account-summary" },
    ],
  },
  {
    icon: Briefcase,
    label: "Human Resources",
    active: false,
    hasChildren: true,
    key: "hr",
    children: [
      {
        label: "Staff Management",
        href: "/human-resources/staff-management",
      },
      {
        label: "Role Permissions",
        href: "/human-resources/role-permissions",
      },
      { label: "Attendance", href: "/human-resources/attendance" },
    ],
  },
  {
    icon: ShoppingCart,
    label: "POS Management",
    active: false,
    hasChildren: true,
    key: "pos",
    children: [
      { label: "Menu Items", href: "/pos/menu" },
      { label: "Orders", href: "/pos-management/orders" },
      { label: "Categories", href: "/pos/categories" },
    ],
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
      { label: "Suppliers", href: "/inventory/suppliers" },
    ],
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
      { label: "Customer Reports", href: "/reports/customers" },
    ],
  },
];

export const bottomMenuItems = [
  {
    icon: Settings,
    label: "Settings",
    hasChildren: true,
    key: "settings",
    children: [
      { label: "Application Settings", href: "/settings/app" },
      { label: "Web Settings", href: "/settings/web" },
      { label: "Language Settings", href: "/settings/language" },
    ],
  },
  { icon: LogOut, label: "Log Out", isLogout: true, href: "/account/logout" },
];
