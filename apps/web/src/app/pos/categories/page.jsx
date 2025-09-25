"use client";
import React, { useState } from "react";
import useUser from "@/utils/useUser";
import { usePOSCategories } from "@/utils/usePOSCategories";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { UnauthenticatedScreen } from "@/components/auth/UnauthenticatedScreen";
import { PageHeader } from "@/components/pos/categories/PageHeader";
import { StatsCards } from "@/components/pos/categories/StatsCards";
import { CategoriesTable } from "@/components/pos/categories/CategoriesTable";
import { CreateCategoryModal } from "@/components/pos/categories/CreateCategoryModal";

export default function POSCategoriesPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    categories,
    categoriesLoading,
    stats,
    statsLoading,
    createCategory,
    isCreatingCategory,
    deleteCategory,
    toggleCategoryStatus,
  } = usePOSCategories(user);

  if (userLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <UnauthenticatedScreen />;
  }
  
  const handleCreateCategory = (categoryData) => {
    if (categoryData.category_name.trim()) {
      createCategory(categoryData, {
        onSuccess: () => {
          setShowCreateCategory(false);
        },
      });
    }
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
        />
        <main className="p-4 md:p-6 lg:p-8">
          <PageHeader
            onAddCategoryClick={() => setShowCreateCategory(true)}
            onFiltersClick={() => setShowFilters(!showFilters)}
          />
          <StatsCards stats={stats} isLoading={statsLoading} />
          <CategoriesTable
            categories={categories}
            isLoading={categoriesLoading}
            onDelete={deleteCategory}
            onToggleStatus={toggleCategoryStatus}
          />
        </main>
      </div>
      <CreateCategoryModal
        isOpen={showCreateCategory}
        onClose={() => setShowCreateCategory(false)}
        onSubmit={handleCreateCategory}
        isLoading={isCreatingCategory}
      />
    </div>
  );
}
