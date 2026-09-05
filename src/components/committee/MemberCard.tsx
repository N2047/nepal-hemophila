"use client";

import React, { useState } from "react";
import { Member } from "@/types/committee";
import { MapPin, Phone, Briefcase, Edit3, Trash2, GripVertical } from "lucide-react";

interface MemberCardProps {
  member: Member;
  isSuperAdmin?: boolean;
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  dragHandleProps?: any;
}

export function MemberCard({
  member,
  isSuperAdmin,
  onEdit,
  onDelete,
  dragHandleProps,
}: MemberCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback initial
  const initialLetter = member.name ? member.name.replace(/^श्री(मती)?\s*/, "").charAt(0) : "M";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col p-5 text-center sm:text-left">
      
      {/* Top action bar for Super Admin */}
      {isSuperAdmin && (
        <div className="flex items-center justify-between gap-1 mb-3 pb-2 border-b border-slate-100">
          <div
            {...dragHandleProps}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing text-xs px-1.5 py-0.5 rounded bg-slate-50"
            title="क्रम परिवर्तन गर्न तान्नुहोस् (Drag to reorder)"
          >
            <GripVertical className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">#{member.display_order}</span>
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(member)}
                className="text-slate-500 hover:text-primary hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
                title="सदस्य सम्पादन गर्नुहोस्"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(member)}
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                title="सदस्य हटाउनुहोस्"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Profile Photo Area */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-3">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm ring-2 ring-slate-100 flex items-center justify-center">
            {member.photo && !imageError ? (
              <img
                src={member.photo}
                alt={member.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-primary-700 text-white font-black text-xl flex items-center justify-center">
                {initialLetter}
              </div>
            )}
          </div>
        </div>

        {/* नाम थर, ठेगाना, मोबाइल नं. */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug tracking-tight truncate">
            {member.name}
          </h4>

          {member.address && (
            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
              <span className="truncate">ठेगाना: {member.address}</span>
            </p>
          )}

          {member.phone && (
            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-mono">मोबाइल: {member.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* कार्यअनुभव (Work Experience) */}
      {member.experience && (
        <div className="mt-auto pt-2.5 border-t border-slate-100 text-left">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[10px] uppercase tracking-wider">
              <Briefcase className="w-3 h-3 text-primary" />
              <span>कार्यअनुभव:</span>
            </div>
            <p className="text-slate-600 line-clamp-3 leading-relaxed text-[11px]">
              {member.experience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
