"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

export type FontSize = "normal" | "medium" | "large";
export type ThemeMode = "light" | "dark";
export type NavLevel = "features" | "content";

interface AccessibilityContextType {
  // Themes & Modes
  theme: ThemeMode;
  toggleDarkMode: () => void;
  setColorMode: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;

  // Typography & Sizing
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isDyslexicFont: boolean;
  toggleDyslexicFont: () => void;

  // Visual Aids
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  underlineLinks: boolean;
  toggleUnderlineLinks: () => void;

  // Hierarchical Text & Feature Navigation
  navLevel: NavLevel;
  currentTextIndex: number;
  totalTextBlocks: number;
  currentFeatureName: string;
  highlightCurrentText: boolean;
  toggleHighlightText: () => void;
  goToNextText: () => void;
  goToPreviousText: () => void;
  drillIntoFeature: () => void;
  exitToFeatures: () => void;

  // Audio Mode (अडियो मोड: Auto-read on any feature select or text selection)
  audioMode: boolean;
  toggleAudioMode: () => void;
  speakText: (text: string) => void;

  // Text-to-Speech (TTS)
  isSpeaking: boolean;
  isPaused: boolean;
  speakStatus: string;
  playTTS: () => void;
  pauseTTS: () => void;
  resumeTTS: () => void;
  stopTTS: () => void;

  // Reset & Panel Visibility
  resetAccessibility: () => void;
  isAccessibilityOpen: boolean;
  setIsAccessibilityOpen: (open: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // State
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [underlineLinks, setUnderlineLinks] = useState<boolean>(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState<boolean>(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);

  // Audio Mode (अडियो मोड: ON / OFF)
  const [audioMode, setAudioModeState] = useState<boolean>(false);
  const audioModeRef = useRef<boolean>(false);

  // Hierarchical Navigation: Level 1 ("features") vs Level 2 ("content" inside feature)
  const [navLevel, setNavLevel] = useState<NavLevel>("features");
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(-1);
  const [totalTextBlocks, setTotalTextBlocks] = useState<number>(0);
  const [currentFeatureName, setCurrentFeatureName] = useState<string>("");
  const [highlightCurrentText, setHighlightCurrentText] = useState<boolean>(true);

  // Text to Speech
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speakStatus, setSpeakStatus] = useState<string>("");

  const featureElementsRef = useRef<HTMLElement[]>([]);
  const contentElementsRef = useRef<HTMLElement[]>([]);

  // 1. Initial LocalStorage Load
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedTheme = (localStorage.getItem("nhs_theme") as ThemeMode) || "light";
      const savedContrast = localStorage.getItem("nhs_contrast") === "true";
      const savedSize = (localStorage.getItem("nhs_fontsize") as FontSize) || "normal";
      const savedMotion = localStorage.getItem("nhs_reduced_motion") === "true";
      const savedUnderline = localStorage.getItem("nhs_underline_links") === "true";
      const savedDyslexic = localStorage.getItem("nhs_dyslexic") === "true";
      const savedAudio = localStorage.getItem("nhs_audio_mode") === "true";

      setTheme(savedTheme);
      setHighContrast(savedContrast);
      setFontSizeState(savedSize);
      setReducedMotion(savedMotion);
      setUnderlineLinks(savedUnderline);
      setIsDyslexicFont(savedDyslexic);
      setAudioModeState(savedAudio);
      audioModeRef.current = savedAudio;

      applyDomAttributes(savedTheme, savedContrast, savedSize, savedMotion, savedUnderline, savedDyslexic);
    } catch {
      // Graceful fallback
    }
  }, []);

  // 2. Apply DOM Attributes
  const applyDomAttributes = (
    t: ThemeMode,
    contrast: boolean,
    size: FontSize,
    motion: boolean,
    underline: boolean,
    dyslexic: boolean
  ) => {
    const root = document.documentElement;

    if (t === "dark") {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }

    if (contrast) {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }

    root.setAttribute("data-font-size", size);

    if (motion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }

    if (underline) {
      root.setAttribute("data-underline-links", "true");
    } else {
      root.removeAttribute("data-underline-links");
    }

    if (dyslexic) {
      root.setAttribute("data-dyslexic", "true");
    } else {
      root.removeAttribute("data-dyslexic");
    }
  };

  // 3. Theme Toggles
  const toggleDarkMode = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setHighContrast(false);
    localStorage.setItem("nhs_theme", nextTheme);
    localStorage.setItem("nhs_contrast", "false");
    applyDomAttributes(nextTheme, false, fontSize, reducedMotion, underlineLinks, isDyslexicFont);
  };

  const setColorMode = () => {
    setTheme("light");
    setHighContrast(false);
    localStorage.setItem("nhs_theme", "light");
    localStorage.setItem("nhs_contrast", "false");
    applyDomAttributes("light", false, fontSize, reducedMotion, underlineLinks, isDyslexicFont);
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem("nhs_contrast", String(next));
    applyDomAttributes(theme, next, fontSize, reducedMotion, underlineLinks, isDyslexicFont);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("nhs_fontsize", size);
    applyDomAttributes(theme, highContrast, size, reducedMotion, underlineLinks, isDyslexicFont);
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem("nhs_reduced_motion", String(next));
    applyDomAttributes(theme, highContrast, fontSize, next, underlineLinks, isDyslexicFont);
  };

  const toggleUnderlineLinks = () => {
    const next = !underlineLinks;
    setUnderlineLinks(next);
    localStorage.setItem("nhs_underline_links", String(next));
    applyDomAttributes(theme, highContrast, fontSize, reducedMotion, next, isDyslexicFont);
  };

  const toggleDyslexicFont = () => {
    const next = !isDyslexicFont;
    setIsDyslexicFont(next);
    localStorage.setItem("nhs_dyslexic", String(next));
    applyDomAttributes(theme, highContrast, fontSize, reducedMotion, underlineLinks, next);
  };

  // 4. Hierarchical Scanner: Level 1 (Features/Sections) vs Level 2 (Internal Children)
  const scanFeatures = useCallback((): HTMLElement[] => {
    if (typeof document === "undefined") return [];
    const main = document.getElementById("main-content") || document.body;
    
    // Top-level sections, articles, or major cards
    const candidates = Array.from(main.querySelectorAll<HTMLElement>("section, article, .quick-access-card, header nav"));
    const valid = candidates.filter((el) => {
      return (
        el.offsetParent !== null &&
        !el.closest("[role='dialog']") &&
        !el.closest("#accessibility-panel") &&
        el.innerText &&
        el.innerText.trim().length > 10
      );
    });

    featureElementsRef.current = valid;
    return valid;
  }, []);

  const scanContentInFeature = useCallback((featureEl: HTMLElement): HTMLElement[] => {
    if (!featureEl) return [];
    const candidates = Array.from(featureEl.querySelectorAll<HTMLElement>(
      "h1, h2, h3, h4, p, a, button, [role='alert'], li"
    ));

    const valid = candidates.filter((el) => {
      return (
        el.offsetParent !== null &&
        el.textContent &&
        el.textContent.trim().length > 3 &&
        !el.closest("[role='dialog']") &&
        !el.closest("#accessibility-panel")
      );
    });

    contentElementsRef.current = valid;
    return valid;
  }, []);

  // Safe Highlight: DOES NOT VIOLENTLY SCROLL THE FULL PAGE!
  const highlightElement = (el: HTMLElement) => {
    document.querySelectorAll(".accessibility-active-text").forEach((node) => {
      node.classList.remove("accessibility-active-text");
    });

    if (highlightCurrentText && el) {
      el.classList.add("accessibility-active-text");
      
      // Focus without browser full-page jump
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });

      // Check if element is already comfortably in viewport
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top >= 100 && rect.bottom <= (window.innerHeight - 80);
      
      // Only scroll gently if outside viewport
      if (!isVisible) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // If Audio Mode is active, automatically read the highlighted feature/text!
      if (audioModeRef.current) {
        const text = el.getAttribute("aria-label") || el.innerText || el.textContent || "";
        const clean = text.trim();
        if (clean.length > 1) {
          speakText(clean);
        }
      }
    }
  };

  // Level 1: Navigate Between Top-Level Features
  const goToNextFeature = () => {
    const features = featureElementsRef.current.length > 0 ? featureElementsRef.current : scanFeatures();
    if (features.length === 0) return;

    let nextIndex = currentTextIndex + 1;
    if (nextIndex >= features.length) nextIndex = 0;

    setCurrentTextIndex(nextIndex);
    setTotalTextBlocks(features.length);
    const target = features[nextIndex];
    if (target) {
      const name = target.querySelector("h1, h2, h3")?.textContent?.trim() || `फिचर ${nextIndex + 1}`;
      setCurrentFeatureName(name);
      highlightElement(target);
      setSpeakStatus(`फिचर ${nextIndex + 1} / ${features.length}: ${name.slice(0, 35)}`);
    }
  };

  const goToPreviousFeature = () => {
    const features = featureElementsRef.current.length > 0 ? featureElementsRef.current : scanFeatures();
    if (features.length === 0) return;

    let prevIndex = currentTextIndex - 1;
    if (prevIndex < 0) prevIndex = features.length - 1;

    setCurrentTextIndex(prevIndex);
    setTotalTextBlocks(features.length);
    const target = features[prevIndex];
    if (target) {
      const name = target.querySelector("h1, h2, h3")?.textContent?.trim() || `फिचर ${prevIndex + 1}`;
      setCurrentFeatureName(name);
      highlightElement(target);
      setSpeakStatus(`फिचर ${prevIndex + 1} / ${features.length}: ${name.slice(0, 35)}`);
    }
  };

  // Level 2: Navigate Content INSIDE a Feature
  const goToNextChild = () => {
    const children = contentElementsRef.current;
    if (children.length === 0) return;

    let nextIndex = currentTextIndex + 1;
    if (nextIndex >= children.length) nextIndex = 0;

    setCurrentTextIndex(nextIndex);
    setTotalTextBlocks(children.length);
    const target = children[nextIndex];
    if (target) {
      highlightElement(target);
      setSpeakStatus(`सामग्री ${nextIndex + 1} / ${children.length}: ${(target.textContent || "").slice(0, 30)}`);
    }
  };

  const goToPreviousChild = () => {
    const children = contentElementsRef.current;
    if (children.length === 0) return;

    let prevIndex = currentTextIndex - 1;
    if (prevIndex < 0) prevIndex = children.length - 1;

    setCurrentTextIndex(prevIndex);
    setTotalTextBlocks(children.length);
    const target = children[prevIndex];
    if (target) {
      highlightElement(target);
      setSpeakStatus(`सामग्री ${prevIndex + 1} / ${children.length}: ${(target.textContent || "").slice(0, 30)}`);
    }
  };

  // Public Next / Previous Dispatcher
  const goToNextText = () => {
    if (navLevel === "features") {
      goToNextFeature();
    } else {
      goToNextChild();
    }
  };

  const goToPreviousText = () => {
    if (navLevel === "features") {
      goToPreviousFeature();
    } else {
      goToPreviousChild();
    }
  };

  // 2nd Click / Enter: Drill down into feature contents!
  const drillIntoFeature = () => {
    const features = featureElementsRef.current.length > 0 ? featureElementsRef.current : scanFeatures();
    const currentFeat = features[currentTextIndex >= 0 ? currentTextIndex : 0];
    if (!currentFeat) return;

    const children = scanContentInFeature(currentFeat);
    if (children.length > 0) {
      setNavLevel("content");
      setCurrentTextIndex(0);
      setTotalTextBlocks(children.length);
      highlightElement(children[0]);
      setSpeakStatus(`फिचर भित्र प्रवेश गरियो: १ / ${children.length} सामग्री चयन`);
    }
  };

  // Exit back to Features Level
  const exitToFeatures = () => {
    setNavLevel("features");
    const features = scanFeatures();
    setTotalTextBlocks(features.length);
    if (features.length > 0) {
      setCurrentTextIndex(0);
      highlightElement(features[0]);
      setSpeakStatus("मुख्य फिचर तहमा फर्कियो");
    }
  };

  const toggleHighlightText = () => {
    const next = !highlightCurrentText;
    setHighlightCurrentText(next);
    if (!next) {
      document.querySelectorAll(".accessibility-active-text").forEach((node) => {
        node.classList.remove("accessibility-active-text");
      });
    } else {
      const target = navLevel === "features" 
        ? featureElementsRef.current[currentTextIndex]
        : contentElementsRef.current[currentTextIndex];
      if (target) highlightElement(target);
    }
  };

  // 5. Speech Synthesis & Audio Mode (अडियो मोड: ON / OFF)
  const stopTTS = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakStatus("वाचन बन्द गरियो / Audio stopped");
    }
  }, []);

  const speakText = useCallback((textToRead: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const cleanText = textToRead.trim().replace(/\s+/g, " ");
    if (!cleanText || cleanText.length < 2) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const hasDevanagari = /[\u0900-\u097F]/.test(cleanText);
    const voices = window.speechSynthesis.getVoices();

    if (hasDevanagari) {
      utterance.lang = "ne-NP";
      const nepaliVoice = voices.find(
        (v) => v.lang.includes("ne") || v.name.toLowerCase().includes("nepali") || v.lang.includes("hi")
      );
      if (nepaliVoice) utterance.voice = nepaliVoice;
    } else {
      utterance.lang = "en-US";
      const englishVoice = voices.find(
        (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("US") || v.name.includes("Google"))
      );
      if (englishVoice) utterance.voice = englishVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakStatus(`पढ्दैछ: "${cleanText.slice(0, 35)}..."`);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakStatus("वाचन सम्पन्न");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleAudioMode = () => {
    const next = !audioMode;
    setAudioModeState(next);
    audioModeRef.current = next;
    localStorage.setItem("nhs_audio_mode", String(next));

    if (!next) {
      stopTTS();
      setSpeakStatus("अडियो मोड बन्द गरियो / Audio Mode OFF");
    } else {
      setSpeakStatus("अडियो मोड सक्रिय / Audio Mode ON");
      speakText("अडियो मोड सक्रिय भयो। कुनै पनि फिचर वा पाठ छान्नुहोस्।");
    }
  };

  // Global Auto-Reader when Audio Mode is ON:
  // Reads any selected text (mouseup) or any focused/clicked feature (button, link, heading, card)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let selectionTimer: NodeJS.Timeout;
    const handleMouseUpOrSelect = () => {
      if (!audioModeRef.current) return;
      clearTimeout(selectionTimer);
      selectionTimer = setTimeout(() => {
        const sel = window.getSelection()?.toString().trim();
        if (sel && sel.length > 1) {
          speakText(sel);
        }
      }, 200);
    };

    const handleFocusOrClick = (e: Event) => {
      if (!audioModeRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore audio toggle button itself and prevent duplicate fires
      if (target.closest("#audio-mode-toggle") || target.closest("[role='switch']")) return;

      // When focusing an input, read its label/placeholder, but don't read every keystroke
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        if (e.type === "focusin") {
          const label = target.getAttribute("aria-label") || target.getAttribute("placeholder") || "इनपुट बक्स";
          speakText(label);
        }
        return;
      }

      // If user selected text with mouse drag, let selection handler read it
      if (window.getSelection()?.toString().trim()) return;

      // Find nearest semantic readable element
      const readable = target.closest<HTMLElement>(
        "button, a, [role='button'], [role='menuitem'], [role='alert'], h1, h2, h3, h4, .quick-access-card, li"
      ) || target;

      const text = readable.getAttribute("aria-label") || readable.innerText || readable.textContent || "";
      const trimmed = text.trim();
      if (trimmed.length > 1 && trimmed.length < 350) {
        speakText(trimmed);
      }
    };

    document.addEventListener("mouseup", handleMouseUpOrSelect);
    document.addEventListener("focusin", handleFocusOrClick);
    document.addEventListener("click", handleFocusOrClick);

    return () => {
      clearTimeout(selectionTimer);
      document.removeEventListener("mouseup", handleMouseUpOrSelect);
      document.removeEventListener("focusin", handleFocusOrClick);
      document.removeEventListener("click", handleFocusOrClick);
    };
  }, [speakText]);

  const pauseTTS = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setSpeakStatus("वाचन रोकियो / Speech paused");
      }
    }
  };

  const resumeTTS = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setSpeakStatus("वाचन पुनः सुरु भयो / Speech resumed");
      }
    }
  };

  const playTTS = () => {
    const sel = typeof window !== "undefined" ? window.getSelection()?.toString().trim() : "";
    if (sel) {
      speakText(sel);
      return;
    }
    const activeEl = document.querySelector<HTMLElement>(".accessibility-active-text");
    if (activeEl) {
      const text = activeEl.innerText || activeEl.textContent || "";
      speakText(text);
      return;
    }
    const features = scanFeatures();
    if (features.length > 0) {
      speakText(features[0].innerText || "");
    }
  };

  // 6. Reset All Settings
  const resetAccessibility = () => {
    stopTTS();
    setAudioModeState(false);
    audioModeRef.current = false;
    setTheme("light");
    setHighContrast(false);
    setFontSizeState("normal");
    setReducedMotion(false);
    setUnderlineLinks(false);
    setIsDyslexicFont(false);
    setCurrentTextIndex(-1);
    setNavLevel("features");
    setHighlightCurrentText(true);

    document.querySelectorAll(".accessibility-active-text").forEach((node) => {
      node.classList.remove("accessibility-active-text");
    });

    localStorage.removeItem("nhs_theme");
    localStorage.removeItem("nhs_contrast");
    localStorage.removeItem("nhs_fontsize");
    localStorage.removeItem("nhs_reduced_motion");
    localStorage.removeItem("nhs_underline_links");
    localStorage.removeItem("nhs_dyslexic");
    localStorage.removeItem("nhs_audio_mode");

    applyDomAttributes("light", false, "normal", false, false, false);
    setSpeakStatus("सबै पहुँच सेटिङहरू पूर्वनिर्धारित अवस्थामा फर्काइयो");
  };

  return (
    <AccessibilityContext.Provider
      value={{
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
        audioMode,
        toggleAudioMode,
        speakText,
        navLevel,
        currentTextIndex,
        totalTextBlocks,
        currentFeatureName,
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
