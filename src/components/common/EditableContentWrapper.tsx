"use client";

import React from "react";
import { useAdminEditMode } from "@/context/AdminEditModeContext";
import { Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";

interface EditableContentWrapperProps {
  children: React.ReactNode;
  label?: string;
  target?: {
    type: "hero" | "emergency" | "stats" | "news" | "events" | "resources" | "centres" | "chapters" | "advisors" | "settings" | "orgDetails";
    id?: string;
    title?: string;
    data?: any;
  };
  adminUrl?: string;
  onEdit?: () => void;
  className?: string;
}

export function EditableContentWrapper({
  children,
  label = "सम्पादन गर्नुहोस्",
  target,
  adminUrl,
  onEdit,
  className = ""
}: EditableContentWrapperProps) {
  const { isEditMode, openQuickEdit } = useAdminEditMode();

  // If edit mode is OFF, render children directly without visual impact
  if (!isEditMode) {
    return <>{children}</>;
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
      return;
    }
    if (target) {
      openQuickEdit(target);
      return;
    }
    if (adminUrl) {
      window.location.href = adminUrl;
    }
  };

  return (
    <div className={`relative group/cms transition-all rounded-2xl ${className}`}>
      {/* Subtle outline indicator in Edit Mode */}
      <div className="absolute inset-0 border-2 border-dashed border-amber-400/60 rounded-2xl pointer-events-none z-20 group-hover/cms:border-amber-500 group-hover/cms:bg-amber-400/5 transition-all" />

      {/* Floating Edit Badge */}
      <div className="absolute top-2 right-2 z-30 opacity-90 group-hover/cms:opacity-100 transition-opacity flex items-center gap-1">
        {adminUrl ? (
          <Link
            href={adminUrl}
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-[11px] shadow-lg flex items-center gap-1.5 hover:bg-amber-300 hover:scale-105 transition-all border border-amber-500"
          >
            <Edit3 className="w-3 h-3" />
            <span>{label}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleEditClick}
            className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-[11px] shadow-lg flex items-center gap-1.5 hover:bg-amber-300 hover:scale-105 transition-all border border-amber-500"
          >
            <Edit3 className="w-3 h-3" />
            <span>{label}</span>
          </button>
        )}
      </div>

      {children}
    </div>
  );
}
