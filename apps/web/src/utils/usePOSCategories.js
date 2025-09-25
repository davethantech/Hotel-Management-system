import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function usePOSCategories(user) {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery({
    queryKey: ["pos-categories", searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      const response = await fetch(`/api/pos/categories?${params}`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    enabled: !!user,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["pos-category-stats"],
    queryFn: async () => {
      const response = await fetch("/api/pos/categories/stats");
      if (!response.ok) throw new Error("Failed to fetch category stats");
      return response.json();
    },
    enabled: !!user,
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData) => {
      const response = await fetch("/api/pos/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) throw new Error("Failed to create category");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pos-categories"] });
      queryClient.invalidateQueries({ queryKey: ["pos-category-stats"] });
    },
  });

  const handleDeleteCategory = (categoryId) => {
    console.log("Deleting category:", categoryId);
    // Add mutation logic here
  };

  const handleToggleStatus = (categoryId, currentStatus) => {
    console.log("Toggling status for category:", categoryId, "from", currentStatus);
    // Add mutation logic here
  };
  
  return {
    searchTerm,
    setSearchTerm,
    categories: categoriesResponse?.categories || null,
    categoriesLoading,
    stats,
    statsLoading,
    createCategory: createCategoryMutation.mutate,
    isCreatingCategory: createCategoryMutation.isLoading,
    deleteCategory: handleDeleteCategory,
    toggleCategoryStatus: handleToggleStatus,
  };
}
