"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface QuickEditTarget {
  type: "hero" | "emergency" | "stats" | "news" | "events" | "resources" | "centres" | "chapters" | "advisors" | "settings" | "orgDetails";
  id?: string;
  data?: any;
  title?: string;
}

interface AdminEditModeContextType {
  isEditMode: boolean;
  setEditMode: (enabled: boolean) => void;
  toggleEditMode: () => void;
  quickEditTarget: QuickEditTarget | null;
  openQuickEdit: (target: QuickEditTarget) => void;
  closeQuickEdit: () => void;
  canEdit: boolean;
}

const AdminEditModeContext = createContext<AdminEditModeContextType | undefined>(undefined);

export function AdminEditModeProvider({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const canEdit = role === "SUPER_ADMIN";
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [quickEditTarget, setQuickEditTarget] = useState<QuickEditTarget | null>(null);

  useEffect(() => {
    // Check localStorage preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nhs_admin_edit_mode");
      if (saved === "true" && canEdit) {
        setIsEditMode(true);
      }
    }
  }, [canEdit]);

  // Turn off edit mode if user logs out or switches to non-superadmin
  useEffect(() => {
    if (!canEdit && isEditMode) {
      setIsEditMode(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("nhs_admin_edit_mode", "false");
      }
    }
  }, [canEdit, isEditMode]);

  const setEditMode = (enabled: boolean) => {
    if (!canEdit) return;
    setIsEditMode(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem("nhs_admin_edit_mode", enabled ? "true" : "false");
    }
  };

  const toggleEditMode = () => {
    if (!canEdit) return;
    setEditMode(!isEditMode);
  };

  const openQuickEdit = (target: QuickEditTarget) => {
    if (!canEdit) return;
    setQuickEditTarget(target);
  };

  const closeQuickEdit = () => {
    setQuickEditTarget(null);
  };

  return (
    <AdminEditModeContext.Provider
      value={{
        isEditMode: isEditMode && canEdit,
        setEditMode,
        toggleEditMode,
        quickEditTarget,
        openQuickEdit,
        closeQuickEdit,
        canEdit
      }}
    >
      {children}
    </AdminEditModeContext.Provider>
  );
}

export function useAdminEditMode() {
  const context = useContext(AdminEditModeContext);
  if (!context) {
    throw new Error("useAdminEditMode must be used within an AdminEditModeProvider");
  }
  return context;
}
