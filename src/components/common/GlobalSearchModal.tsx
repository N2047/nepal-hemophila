"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { Search, X, MapPin, FileText, Calendar, BookOpen, Activity, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const { isNepali, l } = useLanguage();
  const { treatmentCentres, newsArticles, events, resources, courses, factorInventory } = useData();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedCentres = q
    ? treatmentCentres.filter(
        (c) =>
          c.name.en.toLowerCase().includes(q) ||
          c.name.np.toLowerCase().includes(q) ||
          c.province.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
      )
    : [];

  const matchedNews = q
    ? newsArticles.filter(
        (n) =>
          n.title.en.toLowerCase().includes(q) ||
          n.title.np.toLowerCase().includes(q) ||
          n.summary.en.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchedResources = q
    ? resources.filter(
        (r) =>
          r.title.en.toLowerCase().includes(q) ||
          r.title.np.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
    : [];

  const matchedCourses = q
    ? courses.filter(
        (c) =>
          c.title.en.toLowerCase().includes(q) ||
          c.title.np.toLowerCase().includes(q) ||
          c.shortDesc.en.toLowerCase().includes(q)
      )
    : [];

  const matchedFactor = q
    ? factorInventory.filter(
        (f) =>
          f.factorType.toLowerCase().includes(q) ||
          f.hospitalName.en.toLowerCase().includes(q) ||
          f.province.toLowerCase().includes(q)
      )
    : [];

  const totalMatches =
    matchedCentres.length +
    matchedNews.length +
    matchedResources.length +
    matchedCourses.length +
    matchedFactor.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isNepali
                ? "उपचार केन्द्र, फ्याक्टर जानकारी, स्रोत, समाचार खोज्नुहोस्..."
                : "Search treatment centres, factor stock, clinical guides, news, courses..."
            }
            className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-700 mr-2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center text-slate-500 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-primary/40" />
              <p className="text-sm font-medium">
                {isNepali
                  ? "नेपाल हेमोफिलिया सोसाइटीको डिजिटल प्लेटफर्ममा जे पनि खोज्नुहोस्।"
                  : "Type to search all institutional records, treatment centers, and clinical resources."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-xs text-slate-400">Popular:</span>
                {["Bir Hospital", "Factor VIII", "R.I.C.E. Protocol", "Pokhara", "Physiotherapy", "Membership"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary text-slate-700 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query && totalMatches === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm">
                {isNepali
                  ? `"${query}" को लागि कुनै नतिजा फेला परेन।`
                  : `No results found for "${query}".`}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isNepali
                  ? "कृपया फरक शब्द वा अस्पतालको नाम प्रयोग गरी पुनः खोज्नुहोस्।"
                  : "Try searching by hospital name, province, factor type, or symptom."}
              </p>
            </div>
          )}

          {/* Treatment Centres Matches */}
          {matchedCentres.length > 0 && (
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isNepali ? "उपचार केन्द्रहरू" : "Treatment Centres"} ({matchedCentres.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedCentres.map((c) => (
                  <Link
                    key={c.id}
                    href={`/treatment-centres#${c.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-primary">
                        {l(c.name)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {c.province} Province • {c.city} • 📞 {c.emergencyPhone}
                      </div>
                    </div>
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Factor Stock Matches */}
          {matchedFactor.length > 0 && (
            <div>
              <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>{isNepali ? "फ्याक्टर उपलब्धता" : "Factor Inventory"} ({matchedFactor.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedFactor.map((f) => (
                  <Link
                    key={f.id}
                    href="/factor-availability"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-accent">
                        {f.factorType} — {l(f.hospitalName)}
                      </div>
                      <div className="text-xs text-slate-500">
                        Status: <span className="font-semibold text-slate-700">{f.status}</span> • Approx: {f.availableUnitsApprox}
                      </div>
                    </div>
                    <span className="text-xs text-accent font-medium flex items-center gap-1">
                      Check <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* News Matches */}
          {matchedNews.length > 0 && (
            <div>
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{isNepali ? "समाचार तथा कथाहरू" : "News & Stories"} ({matchedNews.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedNews.map((n) => (
                  <Link
                    key={n.id}
                    href={`/news/${n.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-teal-50 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-teal-800">
                        {l(n.title)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {n.category} • {n.publishedDate}
                      </div>
                    </div>
                    <span className="text-xs text-teal-700 font-medium flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Resources Matches */}
          {matchedResources.length > 0 && (
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isNepali ? "स्रोत सामग्रीहरू" : "Resources & Guidelines"} ({matchedResources.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedResources.map((r) => (
                  <Link
                    key={r.id}
                    href="/resources"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-50 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 group-hover:text-amber-900">
                        {l(r.title)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {r.category} • {r.fileType} ({r.fileSize})
                      </div>
                    </div>
                    <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                      Download <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px]">ESC</kbd> to exit</span>
          <span>Nepal Hemophilia Society Global Index</span>
        </div>
      </div>
    </div>
  );
}
