"use client";

import React, { useEffect, useRef } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  X, 
  Eye, 
  Type, 
  RotateCcw, 
  Moon, 
  Sun, 
  Contrast, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  ChevronLeft, 
  ChevronRight, 
  Highlighter, 
  Link as LinkIcon, 
  Wind, 
  Keyboard, 
  CheckCircle2, 
  FileText,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export function AccessibilityDrawer() {
  const {
    theme,
    toggleDarkMode,
    setColorMode,
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    isDyslexicFont,
    toggleDyslexicFont,
    reducedMotion,
    toggleReducedMotion,
    underlineLinks,
    toggleUnderlineLinks,
    navLevel,
    currentFeatureName,
    currentTextIndex,
    totalTextBlocks,
    highlightCurrentText,
    toggleHighlightText,
    goToNextText,
    goToPreviousText,
    drillIntoFeature,
    exitToFeatures,
    isSpeaking,
    isPaused,
    speakStatus,
    playTTS,
    pauseTTS,
    resumeTTS,
    stopTTS,
    resetAccessibility,
    isAccessibilityOpen,
    setIsAccessibilityOpen,
  } = useAccessibility();

  const { isNepali } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key and restore focus to trigger button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAccessibilityOpen) {
        setIsAccessibilityOpen(false);
        const trigger = document.getElementById("floating-accessibility-btn");
        if (trigger) trigger.focus();
      }
    };

    if (isAccessibilityOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Focus the close button when opened
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAccessibilityOpen, setIsAccessibilityOpen]);

  if (!isAccessibilityOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAccessibilityOpen(false);
      }}
    >
      <div 
        id="accessibility-panel"
        ref={drawerRef}
        className="w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-full shadow-2xl p-6 sm:p-7 overflow-y-auto border-l border-slate-200 dark:border-slate-800 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-panel-title"
      >
        {/* ARIA Live Region for Screen Readers */}
        <div aria-live="polite" className="sr-only">
          {speakStatus}
        </div>

        {/* 1. Header & Close Button */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/60 text-primary-900 dark:text-primary-200">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 id="accessibility-panel-title" className="text-lg sm:text-xl font-black tracking-tight text-primary-900 dark:text-white">
                {isNepali ? "पहुँचयुक्तता उपकरणहरू (WCAG 2.2)" : "Accessibility Panel (WCAG 2.2 AA)"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isNepali ? "सबै नागरिक तथा फरक क्षमता भएका व्यक्तिका लागि" : "Universal Digital Accessibility for All Users"}
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            onClick={() => {
              setIsAccessibilityOpen(false);
              const trigger = document.getElementById("floating-accessibility-btn");
              if (trigger) trigger.focus();
            }}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isNepali ? "पहुँच प्यानल बन्द गर्नुहोस् (Esc)" : "Close accessibility panel (Esc)"}
            title={isNepali ? "बन्द गर्नुहोस् (Esc)" : "Close (Esc)"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio / TTS Status Pill */}
        {speakStatus && (
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-semibold text-teal-900 dark:text-teal-200 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 animate-pulse" />
            <span>{speakStatus}</span>
          </div>
        )}

        <div className="space-y-6">

          {/* 2. Dark Mode & Color Mode (Requirements #3 & #4) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Moon className="w-4 h-4 text-primary dark:text-teal-400" />
                <span>{isNepali ? "रंग मोड (Dark & Color Mode)" : "Display Theme"}</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                {theme === "dark" ? "🌙 Dark Mode" : "🎨 Color Mode"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={setColorMode}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  theme === "light" && !highContrast
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>🎨 {isNepali ? "कलर मोड (Normal)" : "Color Mode"}</span>
              </button>

              <button
                onClick={toggleDarkMode}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-slate-900 text-white border-slate-700 shadow-sm ring-2 ring-teal-400"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <Moon className="w-4 h-4 text-blue-400" />
                <span>🌙 {isNepali ? "डार्क मोड" : "Dark Mode"}</span>
              </button>
            </div>
          </div>

          {/* 3. High Contrast Mode (Requirement #5) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Contrast className="w-4 h-4 text-primary dark:text-teal-400" />
                <span>{isNepali ? "उच्च कन्ट्रास्ट मोड" : "High Contrast Mode"}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {isNepali ? "पूर्ण कालो/सेतो पृष्ठभूमि र अधिकतम स्पष्टता" : "Maximum contrast black/white for low vision"}
              </p>
            </div>

            <button
              onClick={toggleHighContrast}
              className={`min-h-[44px] min-w-[56px] px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center justify-center gap-1 border ${
                highContrast
                  ? "bg-amber-400 text-black border-amber-500 ring-2 ring-amber-300"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600"
              }`}
              role="switch"
              aria-checked={highContrast}
              aria-label={isNepali ? "उच्च कन्ट्रास्ट मोड टगल गर्नुहोस्" : "Toggle High Contrast Mode"}
            >
              <span>{highContrast ? "ON" : "OFF"}</span>
            </button>
          </div>

          {/* 4. Font Size — 3 Levels (Requirements #6 & #7) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-primary dark:text-teal-400" />
                <span>{isNepali ? "अक्षरको आकार (Font Size)" : "Font Resizing (200% Reflow)"}</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase">
                {fontSize}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize("normal")}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center ${
                  fontSize === "normal"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-sm font-black">A</span>
                <span>Normal (100%)</span>
              </button>

              <button
                onClick={() => setFontSize("medium")}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center ${
                  fontSize === "medium"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-base font-black">A+</span>
                <span>Medium (130%)</span>
              </button>

              <button
                onClick={() => setFontSize("large")}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center ${
                  fontSize === "large"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-lg font-black">A++</span>
                <span>Large (180%)</span>
              </button>
            </div>
          </div>

          {/* 5. Text-to-Speech / Read Aloud (Requirements #10, #11, #12, #13, #14) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-primary dark:text-teal-400" />
                <span>{isNepali ? "आवाजमा पाठ पढ्ने (Read Aloud)" : "Text-to-Speech (Nepali & English)"}</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isNepali ? "नेपाली र अङ्ग्रेजी" : "ne-NP / en-US"}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isNepali
                ? "कुनै पनि पाठ चयन गरी वा तलको बटन थिचेर आवाजमा सुन्नुहोस्।"
                : "Listen to the active section or select any text on screen to read."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={playTTS}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                aria-label={isNepali ? "पाठ पढ्नुहोस्" : "Read text aloud"}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isNepali ? "पढ्नुहोस्" : "Read"}</span>
              </button>

              <button
                onClick={pauseTTS}
                disabled={!isSpeaking || isPaused}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                aria-label={isNepali ? "पठन रोक्नुहोस्" : "Pause reading"}
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>{isNepali ? "रोक्नुहोस्" : "Pause"}</span>
              </button>

              <button
                onClick={resumeTTS}
                disabled={!isPaused}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                aria-label={isNepali ? "पुनः सुचारु गर्नुहोस्" : "Resume reading"}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isNepali ? "सुचारु" : "Resume"}</span>
              </button>

              <button
                onClick={stopTTS}
                disabled={!isSpeaking && !isPaused}
                className="min-h-[44px] py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                aria-label={isNepali ? "पठन बन्द गर्नुहोस्" : "Stop reading"}
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>{isNepali ? "बन्द" : "Stop"}</span>
              </button>
            </div>
          </div>

          {/* 6. Hierarchical Feature & Content Navigation (1-Click Select vs 2-Click Drill-In) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Highlighter className="w-4 h-4 text-primary dark:text-teal-400" />
                <span>{isNepali ? "पहुँचयुक्त नेभिगेसन (Accessible Navigation)" : "Accessible Navigation"}</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-white dark:bg-slate-700 text-primary dark:text-teal-400 border-primary/30">
                {navLevel === "features"
                  ? (isNepali ? "१-क्लिक: मुख्य फिचर तह" : "Level 1: Main Features")
                  : (isNepali ? "२-क्लिक: भित्री विवरण तह" : "Level 2: Inside Feature")}
              </span>
            </div>

            {/* Current Feature Name if available */}
            {currentFeatureName && (
              <div className="text-xs px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-medium">
                {isNepali ? `सक्रिय फिचर: ${currentFeatureName}` : `Active: ${currentFeatureName}`}
              </div>
            )}

            {/* Explanatory rule */}
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {isNepali 
                ? "१ पटक क्लिक गरेर Next गर्दा अर्को फिचर चयन हुन्छ। २ पटक क्लिक गर्दा वा तलको 'फिचर भित्र जानुहोस्' थिच्दा त्यो फिचरका भित्री विवरणहरू चयन हुन्छन्।"
                : "Single click/Next selects sibling features. Double-click or 'Drill In' enters and explores internal content."}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={goToPreviousText}
                className="min-h-[44px] py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                aria-label={isNepali ? "अघिल्लो फिचर / पाठ ब्लक" : "Previous item"}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>◀ {isNepali ? "अघिल्लो" : "Previous"}</span>
              </button>

              <button
                onClick={goToNextText}
                className="min-h-[44px] py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                aria-label={isNepali ? "पछिल्लो फिचर / पाठ ब्लक" : "Next item"}
              >
                <span>{isNepali ? "पछिल्लो" : "Next"} ▶</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Hierarchical Drill-in and Exit buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={drillIntoFeature}
                className={`min-h-[40px] py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  navLevel === "content"
                    ? "bg-teal-700 text-white border-teal-800 shadow-sm"
                    : "bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/60"
                }`}
                aria-label={isNepali ? "२ पटक क्लिक: फिचर भित्रका कन्टेन्ट सेलेक्ट गर्नुहोस्" : "Drill into feature contents"}
              >
                <span>⤵️ {isNepali ? "फिचर भित्र (२ क्लिक)" : "Drill In (2 Clicks)"}</span>
              </button>

              <button
                onClick={exitToFeatures}
                className={`min-h-[40px] py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  navLevel === "features"
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 cursor-default"
                    : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60"
                }`}
                aria-label={isNepali ? "मुख्य फिचर तहमा फर्कनुहोस्" : "Exit to top-level features"}
              >
                <span>⤴️ {isNepali ? "फिचरमा फर्क" : "Back to Features"}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {isNepali ? "सक्रिय वस्तु चिन्ह लगाउने (Highlight Active)" : "Highlight active item"}
              </span>
              <button
                onClick={toggleHighlightText}
                className={`min-h-[44px] min-w-[50px] px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  highlightCurrentText
                    ? "bg-teal-600 text-white border-teal-700"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                }`}
                role="switch"
                aria-checked={highlightCurrentText}
              >
                {highlightCurrentText ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* 7. Underline Links & Reduce Motion (Requirements #21 & #22) */}
          <div className="space-y-3">
            
            {/* Underline Links */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary dark:text-teal-400" />
                  <span>{isNepali ? "सबै लिङ्कहरू अन्डरलाइन (Underline Links)" : "Underline Links"}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isNepali ? "लिङ्कहरू पहिचान गर्न सहज बनाउँछ" : "Always underline links for low vision recognition"}
                </p>
              </div>

              <button
                onClick={toggleUnderlineLinks}
                className={`min-h-[44px] min-w-[50px] px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  underlineLinks
                    ? "bg-teal-600 text-white border-teal-700"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                }`}
                role="switch"
                aria-checked={underlineLinks}
              >
                {underlineLinks ? "ON" : "OFF"}
              </button>
            </div>

            {/* Reduce Motion */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Wind className="w-4 h-4 text-primary dark:text-teal-400" />
                  <span>{isNepali ? "गति न्यूनीकरण (Reduce Motion)" : "Reduce Animations"}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isNepali ? "एनिमेसन र हल्लिने प्रभावहरू बन्द गर्नुहोस्" : "Disable flashing, sliding and pulsing effects"}
                </p>
              </div>

              <button
                onClick={toggleReducedMotion}
                className={`min-h-[44px] min-w-[50px] px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  reducedMotion
                    ? "bg-teal-600 text-white border-teal-700"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                }`}
                role="switch"
                aria-checked={reducedMotion}
              >
                {reducedMotion ? "ON" : "OFF"}
              </button>
            </div>

            {/* Dyslexia-Friendly Font */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary dark:text-teal-400" />
                  <span>{isNepali ? "स्पष्ट पठन फन्ट (Dyslexia Font)" : "Dyslexia-Friendly Font"}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isNepali ? "अक्षरहरू छुट्टिने स्पष्ट फन्ट" : "Enhanced letter distinction & spacing"}
                </p>
              </div>

              <button
                onClick={toggleDyslexicFont}
                className={`min-h-[44px] min-w-[50px] px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  isDyslexicFont
                    ? "bg-teal-600 text-white border-teal-700"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                }`}
                role="switch"
                aria-checked={isDyslexicFont}
              >
                {isDyslexicFont ? "ON" : "OFF"}
              </button>
            </div>

          </div>

          {/* 8. Keyboard Navigation Info (Requirement #15) */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-950 dark:text-blue-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-blue-900 dark:text-blue-300">
              <Keyboard className="w-4 h-4" />
              <span>{isNepali ? "किबोर्ड सर्टकटहरू (Keyboard Navigation)" : "Keyboard Shortcuts (WCAG 2.2)"}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">Tab</kbd> : {isNepali ? "अर्को तत्व" : "Next item"}</div>
              <div><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">Shift+Tab</kbd> : {isNepali ? "अघिल्लो तत्व" : "Prev item"}</div>
              <div><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">Enter / Space</kbd> : {isNepali ? "खोल्नुहोस्" : "Activate"}</div>
              <div><kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">Esc</kbd> : {isNepali ? "बन्द गर्नुहोस्" : "Close panel"}</div>
            </div>
          </div>

          {/* 9. Reset Button & Statement Link */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={resetAccessibility}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isNepali ? "पूर्वनिर्धारित सेटिङमा फर्काउनुहोस् (Reset)" : "Reset to Default Accessibility"}</span>
            </button>

            <Link
              href="/accessibility-statement"
              onClick={() => setIsAccessibilityOpen(false)}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-primary dark:text-teal-400 hover:underline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{isNepali ? "पहुँच प्रतिबद्धता तथा समस्या रिपोर्ट" : "Accessibility Commitment & Feedback"}</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
