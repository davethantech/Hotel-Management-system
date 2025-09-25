"use client";
import React, { useState } from "react";
import useUser from "@/utils/useUser";
import { usePOSMenu } from "@/utils/usePOSMenu";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { UnauthenticatedScreen } from "@/components/auth/UnauthenticatedScreen";
import { PageHeader } from "@/components/pos/menu/PageHeader";
import { StatsCards } from "@/components/pos/menu/StatsCards";
import { MenuTable } from "@/components/pos/menu/MenuTable";
import { CreateMenuItemModal } from "@/components/pos/menu/CreateMenuItemModal";
import { FiltersPanel } from "@/components/pos/menu/FiltersPanel";

export default function POSMenuPage() {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateMenuItem, setShowCreateMenuItem] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    menuItems,
    menuItemsLoading,
    stats,
    statsLoading,
    categories,
    filters,
    setFilters,
    createMenuItem,
    isCreatingMenuItem,
    deleteMenuItem,
    toggleMenuItemStatus,
  } = usePOSMenu(user);

  if (userLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <UnauthenticatedScreen />;
  }
  
  const handleCreateMenuItem = (menuItemData) => {
    if (menuItemData.item_name.trim()) {
      createMenuItem(menuItemData, {
        onSuccess: () => {
          setShowCreateMenuItem(false);
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
          placeholder="Search menu items..."
        />
        <main className="p-4 md:p-6 lg:p-8">
          <PageHeader
            onAddMenuItemClick={() => setShowCreateMenuItem(true)}
            onFiltersClick={() => setShowFilters(!showFilters)}
          />
          
          {showFilters && (
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
          )}
          
          <StatsCards stats={stats} isLoading={statsLoading} />
          <MenuTable
            menuItems={menuItems}
            isLoading={menuItemsLoading}
            onDelete={deleteMenuItem}
            onToggleStatus={toggleMenuItemStatus}
          />
        </main>
      </div>
      <CreateMenuItemModal
        isOpen={showCreateMenuItem}
        onClose={() => setShowCreateMenuItem(false)}
        onSubmit={handleCreateMenuItem}
        isLoading={isCreatingMenuItem}
        categories={categories}
      />
    </div>
  );
}