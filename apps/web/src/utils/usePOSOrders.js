import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function usePOSOrders(user) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    orderType: "",
    paymentStatus: "",
    dateRange: "",
  });
  const queryClient = useQueryClient();

  // Fetch orders
  const { data: ordersResponse, isLoading: ordersLoading } = useQuery({
    queryKey: ["pos-orders", searchTerm, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filters.status) params.append("status", filters.status);
      if (filters.orderType) params.append("orderType", filters.orderType);
      if (filters.paymentStatus) params.append("paymentStatus", filters.paymentStatus);
      if (filters.dateRange) params.append("dateRange", filters.dateRange);
      
      const response = await fetch(`/api/pos/orders?${params}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    },
    enabled: !!user,
  });

  // Fetch order stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["pos-order-stats"],
    queryFn: async () => {
      const response = await fetch("/api/pos/orders/stats");
      if (!response.ok) throw new Error("Failed to fetch order stats");
      return response.json();
    },
    enabled: !!user,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch("/api/pos/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error("Failed to create order");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pos-orders"] });
      queryClient.invalidateQueries({ queryKey: ["pos-order-stats"] });
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await fetch(`/api/pos/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pos-orders"] });
      queryClient.invalidateQueries({ queryKey: ["pos-order-stats"] });
    },
  });

  const handleDeleteOrder = (orderId) => {
    console.log("Deleting order:", orderId);
    // Add mutation logic here
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ orderId, status: newStatus });
  };
  
  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    orders: ordersResponse?.orders || null,
    ordersLoading,
    stats,
    statsLoading,
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    deleteOrder: handleDeleteOrder,
    updateOrderStatus: handleUpdateOrderStatus,
    isUpdatingStatus: updateOrderStatusMutation.isPending,
  };
}