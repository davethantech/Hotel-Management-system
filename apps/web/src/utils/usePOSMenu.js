import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function usePOSMenu(user) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priceRange: "",
  });
  const queryClient = useQueryClient();

  // Fetch menu items
  const { data: menuItemsResponse, isLoading: menuItemsLoading } = useQuery({
    queryKey: ["pos-menu-items", searchTerm, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filters.category) params.append("category", filters.category);
      if (filters.status) params.append("status", filters.status);
      if (filters.priceRange) params.append("priceRange", filters.priceRange);
      
      const response = await fetch(`/api/pos/menu-items?${params}`);
      if (!response.ok) throw new Error("Failed to fetch menu items");
      return response.json();
    },
    enabled: !!user,
  });

  // Fetch menu stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["pos-menu-stats"],
    queryFn: async () => {
      const response = await fetch("/api/pos/menu-items/stats");
      if (!response.ok) throw new Error("Failed to fetch menu stats");
      return response.json();
    },
    enabled: !!user,
  });

  // Fetch categories for filters
  const { data: categoriesResponse } = useQuery({
    queryKey: ["pos-categories-list"],
    queryFn: async () => {
      const response = await fetch("/api/pos/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    enabled: !!user,
  });

  const createMenuItemMutation = useMutation({
    mutationFn: async (menuItemData) => {
      const response = await fetch("/api/pos/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuItemData),
      });
      if (!response.ok) throw new Error("Failed to create menu item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pos-menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["pos-menu-stats"] });
    },
  });

  const handleDeleteMenuItem = (menuItemId) => {
    console.log("Deleting menu item:", menuItemId);
    // Add mutation logic here
  };

  const handleToggleStatus = (menuItemId, currentStatus) => {
    console.log("Toggling status for menu item:", menuItemId, "from", currentStatus);
    // Add mutation logic here
  };
  
  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    menuItems: menuItemsResponse?.menuItems || null,
    menuItemsLoading,
    stats,
    statsLoading,
    categories: categoriesResponse?.categories || null,
    createMenuItem: createMenuItemMutation.mutate,
    isCreatingMenuItem: createMenuItemMutation.isLoading,
    deleteMenuItem: handleDeleteMenuItem,
    toggleMenuItemStatus: handleToggleStatus,
  };
}