"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAdminEditMode } from "@/context/AdminEditModeContext";
import { 
  ShieldCheck, 
  Edit3, 
  Settings, 
  Trash2, 
  Eye, 
  EyeOff, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  LayoutDashboard,
  ExternalLink
} from "lucide-react";

export function AdminFloatingBar() {
  const { user, role, loginAs } = useAuth();
  const { isEditMode, toggleEditMode, canEdit } = useAdminEditMode();
  const [minimized, setMinimized] = useState(false);

  // Strictly for SUPER_ADMIN only
  if (!canEdit) return null;

  return (
    <aside aria-label="Super Admin Mode Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <div className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-700/80 shadow-2xl rounded-2xl px-4 py-2.5 flex items-center gap-3 sm:gap-4 text-xs">
        
        {/* Super Admin Status Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-700 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
          <div className="hidden sm:block leading-tight">
            <div className="font-extrabold text-amber-300 text-[11px] flex items-center gap-1">
              <span>सुपर एडमिन</span>
              <span className="text-[9px] px-1 bg-amber-400/20 text-amber-300 rounded font-mono">CMS</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{user?.name || "व्यवस्थापक"}</div>
          </div>
        </div>

        {/* In-Page Edit Mode Toggle Switch */}
        <button
          onClick={toggleEditMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
            isEditMode
              ? "bg-amber-400 text-slate-950 shadow-md scale-105"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          }`}
          title="Toggle visible in-page edit buttons on content"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditMode ? "सम्पादन मोड: अन (✏️ सक्रिय)" : "सम्पादन मोड अन गर्नुहोस्"}</span>
        </button>

        {/* Central CMS Hub Link */}
        <Link
          href="/admin?tab=cms"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-colors shadow-sm shrink-0"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">CMS कन्ट्रोल प्यानल</span>
          <span className="sm:hidden">CMS</span>
        </Link>

        {/* Quick Recycle Bin Link */}
        <Link
          href="/admin?tab=trash"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          title="View soft-deleted items"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
          <span>ट्र्यास</span>
        </Link>

        {/* Visitor Mode Quick Switch */}
        <button
          onClick={() => loginAs("PUBLIC_USER")}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          title="Preview site as standard public visitor"
        >
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          <span>भिजिटर प्रिभ्यू</span>
        </button>

      </div>
    </aside>
  );
}
