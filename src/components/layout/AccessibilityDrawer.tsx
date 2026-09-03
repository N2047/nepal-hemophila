"use client";

import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Eye, Type, Sparkles, Activity, RotateCcw } from "lucide-react";

export function AccessibilityDrawer() {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    reducedMotion,
    toggleReducedMotion,
    isDyslexicFont,
    toggleDyslexicFont,
    resetAccessibility,
    isAccessibilityOpen,
    setIsAccessibilityOpen,
  } = useAccessibility();
  const { isNepali } = useLanguage();

  if (!isAccessibilityOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end transition-opacity">
      <div 
        className="w-full max-w-md bg-white text-slate-900 h-full shadow-2xl p-6 overflow-y-auto border-l border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-drawer-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h2 id="accessibility-drawer-title" className="text-lg font-bold text-primary-900">
              {isNepali ? "पहुँच योग्यता सुविधाहरू (WCAG)" : "Accessibility Tools (WCAG 2.1)"}
            </h2>
          </div>
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            aria-label="Close accessibility controls"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 my-4">
          {isNepali
            ? "नेपाल हेमोफिलिया सोसाइटीको वेबसाइट सबै वर्ग, फरक क्षमता भएका व्यक्ति तथा न्यून दृष्टियुक्त महानुभावहरूका लागि सहज बनाइएको छ।"
            : "Customize your viewing experience to enhance legibility and accessibility according to international web standards."}
        </p>

        <div className="space-y-6">
          {/* Font Size Adjuster */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-slate-800">
              <Type className="w-4 h-4 text-primary" />
              <span>{isNepali ? "अक्षरको आकार (Font Size)" : "Text Size"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize("normal")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  fontSize === "normal"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                100% {isNepali ? "सामान्य" : "Normal"}
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                  fontSize === "large"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                120% {isNepali ? "ठूलो" : "Large"}
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`py-2 px-3 rounded-lg text-base font-semibold border transition-all ${
                  fontSize === "xlarge"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                140% {isNepali ? "धेरै ठूलो" : "XL"}
              </button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-slate-800">
                {isNepali ? "उच्च कन्ट्रास्ट मोड" : "High Contrast Mode"}
              </div>
              <div className="text-xs text-slate-500">
                {isNepali ? "कालो पृष्ठभूमि र स्पष्ट अक्षरहरू" : "Maximum contrast black & high visibility borders"}
              </div>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                highContrast ? "bg-primary justify-end" : "bg-slate-300 justify-start"
              }`}
              role="switch"
              aria-checked={highContrast}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Dyslexia / Readable Font */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-slate-800">
                {isNepali ? "स्पष्ट पठन फन्ट" : "Dyslexia-Friendly Font"}
              </div>
              <div className="text-xs text-slate-500">
                {isNepali ? "पढ्न सहज हुने फन्ट शैली" : "Enhance letter distinction and spacing"}
              </div>
            </div>
            <button
              onClick={toggleDyslexicFont}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isDyslexicFont ? "bg-primary justify-end" : "bg-slate-300 justify-start"
              }`}
              role="switch"
              aria-checked={isDyslexicFont}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-slate-800">
                {isNepali ? "गति न्यूनीकरण (Reduced Motion)" : "Reduce Animations"}
              </div>
              <div className="text-xs text-slate-500">
                {isNepali ? "एनिमेसन र स्क्रोलिङ प्रभाव बन्द गर्नुहोस्" : "Disable flashing and sliding animations"}
              </div>
            </div>
            <button
              onClick={toggleReducedMotion}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                reducedMotion ? "bg-primary justify-end" : "bg-slate-300 justify-start"
              }`}
              role="switch"
              aria-checked={reducedMotion}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Reset button */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={resetAccessibility}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isNepali ? "पूर्वनिर्धारित सेटिङमा फर्काउनुहोस्" : "Reset to Default Accessibility"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
