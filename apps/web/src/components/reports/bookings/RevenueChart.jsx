import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp } from "lucide-react";

function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-10 w-10 rounded-lg"></div>
          <div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-5 rounded w-32 mb-2"></div>
            <div className="animate-pulse bg-[#F5F7FB] dark:bg-[#333333] h-4 rounded w-48"></div>
          </div>
        </div>
      </div>
      <div className="h-80 animate-pulse bg-[#F5F7FB] dark:bg-[#333333] rounded-lg"></div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#EDF0F4] dark:border-[#333333] rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-[#07111F] dark:text-[#E5E5E5] mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart({ data = [], isLoading = false }) {
  // Mock data for demonstration
  const mockData = [
    { name: 'Jan', revenue: 45000, bookings: 120, avgValue: 375 },
    { name: 'Feb', revenue: 52000, bookings: 140, avgValue: 371 },
    { name: 'Mar', revenue: 48000, bookings: 135, avgValue: 356 },
    { name: 'Apr', revenue: 61000, bookings: 165, avgValue: 370 },
    { name: 'May', revenue: 55000, bookings: 150, avgValue: 367 },
    { name: 'Jun', revenue: 67000, bookings: 180, avgValue: 372 },
    { name: 'Jul', revenue: 73000, bookings: 195, avgValue: 374 },
    { name: 'Aug', revenue: 68000, bookings: 185, avgValue: 368 },
    { name: 'Sep', revenue: 58000, bookings: 160, avgValue: 363 },
    { name: 'Oct', revenue: 64000, bookings: 175, avgValue: 366 },
    { name: 'Nov', revenue: 59000, bookings: 165, avgValue: 358 },
    { name: 'Dec', revenue: 76000, bookings: 200, avgValue: 380 },
  ];

  const chartData = data.length > 0 ? data : mockData;

  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EDF0F4] dark:border-[#333333] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#ECFDF5] dark:bg-[#064E3B] rounded-lg">
            <TrendingUp size={20} className="text-[#10B981] dark:text-[#34D399]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#07111F] dark:text-[#E5E5E5]">
              Revenue & Booking Trends
            </h3>
            <p className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">
              Monthly revenue and booking performance over the past year
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4F8BFF] dark:bg-[#5B94FF] rounded-full"></div>
            <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#10B981] dark:bg-[#34D399] rounded-full"></div>
            <span className="text-[#8A94A7] dark:text-[#A0A0A0]">Bookings</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#EDF0F4" 
              className="dark:stroke-[#333333]"
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A94A7', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="revenue"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A94A7', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis 
              yAxisId="bookings"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A94A7', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              yAxisId="revenue"
              dataKey="revenue" 
              fill="#4F8BFF" 
              radius={[4, 4, 0, 0]}
              name="Revenue"
            />
            <Bar 
              yAxisId="bookings"
              dataKey="bookings" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
              name="Bookings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#EDF0F4] dark:border-[#333333]">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            ${chartData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            {chartData.reduce((sum, item) => sum + item.bookings, 0).toLocaleString()}
          </div>
          <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Total Bookings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#07111F] dark:text-[#E5E5E5]">
            ${Math.round(chartData.reduce((sum, item) => sum + item.avgValue, 0) / chartData.length)}
          </div>
          <div className="text-sm text-[#8A94A7] dark:text-[#A0A0A0]">Avg. Booking Value</div>
        </div>
      </div>
    </div>
  );
}