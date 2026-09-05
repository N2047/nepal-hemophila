"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { NoticeItem } from "@/types/site-content";
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  ExternalLink, 
  FileText, 
  Plus, 
  X, 
  ShieldAlert,
  Sparkles,
  Megaphone
} from "lucide-react";
import Link from "next/link";

interface NoticeBoardSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export function NoticeBoardSection({ limit = 3, showTitle = true }: NoticeBoardSectionProps) {
  const { isNepali } = useLanguage();
  const { role } = useAuth();
  const { notices, features } = useSiteContent();
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const isEditor = ["SUPER_ADMIN", "CONTENT_ADMIN"].includes(role);

  // If feature is disabled by Super Admin, don't render!
  if (!features.noticeBoardTicker) {
    return null;
  }

  const activeNotices = notices.filter((n) => n.isActive);
  const displayNotices = limit ? activeNotices.slice(0, limit) : activeNotices;

  if (displayNotices.length === 0 && !isEditor) {
    return null;
  }

  return (
    <div className="space-y-6" id="notices-section">
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-accent text-xs font-bold">
              <Megaphone className="w-3.5 h-3.5" />
              <span>{isNepali ? "आधिकारिक सूचना तथा समाचार" : "Official Notices & Bulletins"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{isNepali ? "महत्त्वपूर्ण सूचना तथा विज्ञप्ति" : "Important Notices & Announcements"}</span>
            </h2>
          </div>

          {isEditor && (
            <Link
              href="/admin?tab=site-content&sub=notices"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow-sm shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isNepali ? "+ नयाँ सूचना पोस्ट गर्नुहोस्" : "+ Post New Notice"}</span>
            </Link>
          )}
        </div>
      )}

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {displayNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-accent-200 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer space-y-3 relative overflow-hidden"
          >
            {notice.isUrgent && (
              <div className="absolute top-0 right-0">
                <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  जरुरी
                </span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                  {notice.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span className="font-mono">{notice.publishDate}</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {isNepali ? notice.titleNp : notice.titleEn || notice.titleNp}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {isNepali ? notice.contentNp : notice.contentEn || notice.contentNp}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-primary group-hover:text-accent transition-colors border-t border-slate-100">
              <span>{isNepali ? "पूर्ण विवरण पढ्नुहोस्" : "Read Full Notice"}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-medical text-white p-6 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 text-white font-bold text-xs uppercase">
                    {selectedNotice.category}
                  </span>
                  {selectedNotice.isUrgent && (
                    <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white font-black text-xs">
                      जरुरी सूचना
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {isNepali ? selectedNotice.titleNp : selectedNotice.titleEn || selectedNotice.titleNp}
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>प्रकाशन मिति: {selectedNotice.publishDate}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {isNepali ? selectedNotice.contentNp : selectedNotice.contentEn || selectedNotice.contentNp}
              </div>

              {selectedNotice.authorName && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>जारीकर्ता: {selectedNotice.authorName}</span>
                  <span className="text-[11px] text-slate-400">नेपाल हेमोफिलिया सोसाइटी</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow"
              >
                {isNepali ? "बन्द गर्नुहोस्" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
