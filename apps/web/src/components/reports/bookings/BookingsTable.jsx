import React from "react";
import {
  Eye,
  Download,
  ArrowUpDown,
  Calendar,
  User,
  BedDouble,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Minus,
} from "lucide-react";

const getStatusConfig = (status) => {
  const configs = {
    confirmed: {
      label: 'Confirmed',
      color: 'bg-[#ECFDF5] text-[#10B981] dark:bg-[#064E3B] dark:text-[#34D399]',
      icon: CheckCircle
    },
    pending: {
      label: 'Pending',
      color: 'bg-[#FEF3C7] text-[#F59E0B] dark:bg-[#451A03] dark:text-[#FCD34D]',
      icon: Clock
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-[#FFEDED] text-[#E12929] dark:bg-[#331111] dark:text-[#FF6B6B]',
      icon: XCircle
    },
    completed: {
      label: 'Completed',
      color: 'bg-[#E8F0FF] text-[#4F8BFF] dark:bg-[#1A2332] dark:text-[#5B94FF]',
      icon: CheckCircle
    },
    no_show: {
      label: 'No Show',
      color: 'bg-[#F3F4F6] text-[#6B7280] dark:bg-[#374151] dark:text-[#9CA3AF]',
      icon: Minus
    }
  };
  return configs[status] || configs.confirmed;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const calculateNights = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function TableSkeleton() {
  return Array.from({ length: 8 }).map((_, index) => (
    <tr key={index}>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-28"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-6 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-8 rounded w-20"></div>
      </td>
    </tr>
  ));
}

function BookingRow({ booking }) {
  const statusConfig = getStatusConfig(booking.booking_status);
  const StatusIcon = statusConfig.icon;
  const nights = calculateNights(booking.check_in_date, booking.check_out_date);

  return (
    <tr className="hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#E8F0FF] dark:bg-[#1A2332] rounded-lg">
            <Calendar size={16} className="text-[#4F8BFF] dark:text-[#5B94FF]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {booking.booking_id}
            </div>
            <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
              {formatDate(booking.created_at)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg">
            <User size={14} className="text-[#10B981] dark:text-[#34D399]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {booking.customer_name}
            </div>
            <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
              {booking.customer_email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#F3E8FF] dark:bg-[#2A1A33] rounded-lg">
            <BedDouble size={14} className="text-[#8B5CF6] dark:text-[#A78BFA]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5]">
              {booking.room_number}
            </div>
            <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
              {booking.room_type}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-[#07111F] dark:text-[#E5E5E5]">
          <div className="font-medium">
            {formatDate(booking.check_in_date)}
          </div>
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            to {formatDate(booking.check_out_date)}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-center">
          <div className="font-medium text-[#07111F] dark:text-[#E5E5E5]">
            {nights}
          </div>
          <div className="text-xs text-[#8A94A7] dark:text-[#A0A0A0]">
            {nights === 1 ? 'night' : 'nights'}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
          <StatusIcon size={12} className="mr-1" />
          {statusConfig.label}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-[#07111F] dark:text-[#E5E5E5]">
          {formatCurrency(booking.total_amount)}
        </div>
        {booking.paid_amount > 0 && (
          <div className="text-xs text-[#10B981] dark:text-[#34D399]">
            {formatCurrency(booking.paid_amount)} paid
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-1.5 text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            <Download size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function BookingsTable({ bookings, isLoading }) {
  const mockBookings = [
    {
      id: 1,
      booking_id: "BKG-2024-001",
      customer_name: "John Smith",
      customer_email: "john@example.com",
      room_number: "101",
      room_type: "Deluxe Suite",
      check_in_date: "2024-01-15",
      check_out_date: "2024-01-18",
      total_amount: 1200,
      paid_amount: 1200,
      booking_status: "completed",
      created_at: "2024-01-10",
    },
    {
      id: 2,
      booking_id: "BKG-2024-002",
      customer_name: "Sarah Johnson",
      customer_email: "sarah@example.com",
      room_number: "205",
      room_type: "Standard Room",
      check_in_date: "2024-01-20",
      check_out_date: "2024-01-22",
      total_amount: 480,
      paid_amount: 240,
      booking_status: "confirmed",
      created_at: "2024-01-12",
    },
    {
      id: 3,
      booking_id: "BKG-2024-003",
      customer_name: "Mike Chen",
      customer_email: "mike@example.com",
      room_number: "312",
      room_type: "Executive Suite",
      check_in_date: "2024-01-25",
      check_out_date: "2024-01-27",
      total_amount: 800,
      paid_amount: 0,
      booking_status: "pending",
      created_at: "2024-01-18",
    },
    {
      id: 4,
      booking_id: "BKG-2024-004",
      customer_name: "Lisa Brown",
      customer_email: "lisa@example.com",
      room_number: "108",
      room_type: "Standard Room",
      check_in_date: "2024-01-28",
      check_out_date: "2024-01-30",
      total_amount: 400,
      paid_amount: 400,
      booking_status: "cancelled",
      created_at: "2024-01-20",
    },
    {
      id: 5,
      booking_id: "BKG-2024-005",
      customer_name: "David Wilson",
      customer_email: "david@example.com",
      room_number: "201",
      room_type: "Deluxe Room",
      check_in_date: "2024-02-01",
      check_out_date: "2024-02-05",
      total_amount: 1600,
      paid_amount: 800,
      booking_status: "confirmed",
      created_at: "2024-01-22",
    },
    {
      id: 6,
      booking_id: "BKG-2024-006",
      customer_name: "Emma Davis",
      customer_email: "emma@example.com",
      room_number: "307",
      room_type: "Presidential Suite",
      check_in_date: "2024-02-10",
      check_out_date: "2024-02-12",
      total_amount: 2400,
      paid_amount: 2400,
      booking_status: "no_show",
      created_at: "2024-02-01",
    },
    {
      id: 7,
      booking_id: "BKG-2024-007",
      customer_name: "Robert Taylor",
      customer_email: "robert@example.com",
      room_number: "150",
      room_type: "Standard Room",
      check_in_date: "2024-02-15",
      check_out_date: "2024-02-17",
      total_amount: 360,
      paid_amount: 0,
      booking_status: "pending",
      created_at: "2024-02-08",
    },
    {
      id: 8,
      booking_id: "BKG-2024-008",
      customer_name: "Jennifer Lee",
      customer_email: "jennifer@example.com",
      room_number: "425",
      room_type: "Executive Suite",
      check_in_date: "2024-02-20",
      check_out_date: "2024-02-23",
      total_amount: 1080,
      paid_amount: 540,
      booking_status: "confirmed",
      created_at: "2024-02-12",
    },
  ];

  const currentBookings = bookings.length > 0 ? bookings : mockBookings;
  
  return (
    <div
      className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="p-6 border-b border-[#EDF0F4] dark:border-[#333333]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
            Booking Details
          </h3>
          <button className="p-2 hover:bg-[#F5F7FB] dark:hover:bg-[#333333] rounded-lg transition-colors">
            <ArrowUpDown size={16} className="text-[#536081] dark:text-[#A0A0A0]" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F7F9FC] dark:bg-[#262626]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Nights
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#8A94A7] dark:text-[#A0A0A0] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0F4] dark:divide-[#333333]">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              currentBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#EDF0F4] dark:border-[#333333] flex items-center justify-between">
        <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
          Showing 1 to {currentBookings.length} of {currentBookings.length} bookings
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-[#4F8BFF] dark:bg-[#5B94FF] text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm text-[#8A94A7] dark:text-[#A0A0A0] hover:text-[#4F8BFF] dark:hover:text-[#5B94FF] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}