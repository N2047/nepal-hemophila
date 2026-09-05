"use client";

import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";
import { Eye } from "lucide-react";

export function FloatingAccessibilityButton() {
  const { isAccessibilityOpen, setIsAccessibilityOpen } = useAccessibility();
  const { isNepali } = useLanguage();

  return (
    <aside aria-label={isNepali ? "पहुँचयोग्यता उपकरण" : "Accessibility Tools"}>
      <button
        id="floating-accessibility-btn"
        onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
        className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-primary-900 text-white shadow-2xl border-2 border-white hover:bg-primary-800 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 group"
        aria-haspopup="dialog"
        aria-expanded={isAccessibilityOpen}
        aria-controls="accessibility-panel"
        aria-label={isNepali ? "पहुँचयुक्तता सेटिङ प्यानल खोल्नुहोस् (WCAG 2.2)" : "Open Accessibility Settings Panel (WCAG 2.2)"}
        title={isNepali ? "पहुँचयुक्तता विकल्पहरू (WCAG 2.2)" : "Accessibility Options (WCAG 2.2 AA)"}
      >
        <span className="text-lg leading-none" aria-hidden="true">♿</span>
        <span className="text-xs sm:text-sm font-extrabold tracking-wide whitespace-nowrap">
          {isNepali ? "पहुँचयुक्तता" : "Accessibility"}
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" aria-hidden="true" />
      </button>
    </aside>
  );
}
