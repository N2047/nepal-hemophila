"use client";

import React, { useState } from "react";
import { Officer } from "@/types/committee";
import { MapPin, Phone, Briefcase, Award, Edit3, User, ShieldCheck } from "lucide-react";

interface OfficerCardProps {
  officer: Officer;
  isSuperAdmin?: boolean;
  onEdit?: (officer: Officer) => void;
}

export function OfficerCard({ officer, isSuperAdmin, onEdit }: OfficerCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback initial
  const initialLetter = officer.name ? officer.name.replace(/^श्री(मती)?\s*/, "").charAt(0) : "O";

  // Check if this is the president (top leader) to give a prestigious accent
  const isPresident = officer.position === "अध्यक्ष" || officer.display_order === 1;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col p-6 text-center sm:text-left ${
        isPresident
          ? "border-primary-300 shadow-md ring-1 ring-primary-100 hover:shadow-xl bg-gradient-to-b from-white via-white to-primary-50/20"
          : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
      }`}
    >
      {/* 1. First: पद (Position) */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-red-700 bg-gradient-to-r from-red-50 via-rose-50 to-red-50/70 border border-red-200 shadow-xs ${
            isPresident ? "ring-2 ring-red-100" : ""
          }`}
        >
          {isPresident && <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />}
          {officer.position}
        </span>

        {/* Super Admin Quick Edit Button */}
        {isSuperAdmin && onEdit && (
          <button
            onClick={() => onEdit(officer)}
            className="text-xs font-bold text-slate-500 hover:text-primary hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
            title="पदाधिकारीको विवरण सम्पादन गर्नुहोस्"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">सम्पादन</span>
          </button>
        )}
      </div>

      {/* 2. Photo Area */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm ring-2 ring-slate-100 flex items-center justify-center">
            {officer.photo && !imageError ? (
              <img
                src={officer.photo}
                alt={officer.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-primary-700 to-primary-500 text-white font-black text-2xl flex items-center justify-center">
                {initialLetter}
              </div>
            )}
          </div>
          {isPresident && (
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow border-2 border-white" title="कार्यसमिति नेतृत्व">
              <Award className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Name & Basic Info */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug tracking-tight truncate">
            {officer.name}
          </h4>

          {officer.address && (
            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
              <span className="truncate">ठेगाना: {officer.address}</span>
            </p>
          )}

          {officer.phone && (
            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-mono">मोबाइल: {officer.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* 3. कार्यअनुभव (Work Experience) */}
      {officer.experience && (
        <div className="mt-auto pt-3 border-t border-slate-100 text-left">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[11px] uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>कार्यअनुभव:</span>
            </div>
            <p className="text-slate-600 line-clamp-3 leading-relaxed">
              {officer.experience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
