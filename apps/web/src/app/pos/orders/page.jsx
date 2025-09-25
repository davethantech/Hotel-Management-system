"use client";
import React, { useState } from "react";
import useUser from "@/utils/useUser";
import { usePOSOrders } from "@/utils/usePOSOrders";
import { usePOSMenu } from "@/utils/usePOSMenu";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { UnauthenticatedScreen } from "@/components/auth/UnauthenticatedScreen";
import { PageHeader } from "@/components/pos/orders/PageHeader";
import { StatsCards } from "@/components/pos/orders/StatsCards";
import { OrdersTable } from "@/components/pos/orders/OrdersTable";
import { CreateOrderModal } from "@/components/pos/orders/CreateOrderModal";
import { FiltersPanel } from "@/components/pos/orders/FiltersPanel";

export default function POSOrdersPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    orders,
    ordersLoading,
    stats,
    statsLoading,
    filters,
    setFilters,
    createOrder,
    isCreatingOrder,
    deleteOrder,
    updateOrderStatus,
    isUpdatingStatus,
  } = usePOSOrders(user);

  // Get menu items for the create order modal
  const { menuItems } = usePOSMenu(user);

  if (userLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <UnauthenticatedScreen />;
  }
  
  const handleCreateOrder = (orderData) => {
    createOrder(orderData, {
      onSuccess: () => {
        setShowCreateOrder(false);
      },
    });
  };

  const handleViewOrder = (orderId) => {
    console.log("Viewing order:", orderId);
    // Navigate to order details or open modal
  };

  const handleEditOrder = (orderId) => {
    console.log("Editing order:", orderId);
    // Open edit modal or navigate to edit page
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
    }
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#121212] font-['Nanum_Gothic']">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:ml-60">
        <Header
          user={user}
          onSidebarOpen={() => setSidebarOpen(true)}
          searchTerm={searchTerm}
          onSearchTermChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search orders..."
        />
        <main className="p-4 md:p-6 lg:p-8">
          <PageHeader
            onAddOrderClick={() => setShowCreateOrder(true)}
            onFiltersClick={() => setShowFilters(!showFilters)}
          />
          
          {showFilters && (
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
          
          <StatsCards stats={stats} isLoading={statsLoading} />
          <OrdersTable
            orders={orders}
            isLoading={ordersLoading}
            onView={handleViewOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        </main>
      </div>
      <CreateOrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        onSubmit={handleCreateOrder}
        isLoading={isCreatingOrder}
        menuItems={menuItems}
      />
    </div>
  );
}