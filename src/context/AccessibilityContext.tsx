"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

export type FontSize = "normal" | "medium" | "large";
export type ThemeMode = "light" | "dark";

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

  // Text Navigation & Highlighting
  currentTextIndex: number;
  totalTextBlocks: number;
  highlightCurrentText: boolean;
  toggleHighlightText: () => void;
  goToNextText: () => void;
  goToPreviousText: () => void;

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

  // Text Navigation & Highlighting
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(-1);
  const [totalTextBlocks, setTotalTextBlocks] = useState<number>(0);
  const [highlightCurrentText, setHighlightCurrentText] = useState<boolean>(true);

  // Text to Speech
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speakStatus, setSpeakStatus] = useState<string>("");

  const currentElementsRef = useRef<HTMLElement[]>([]);

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

      setTheme(savedTheme);
      setHighContrast(savedContrast);
      setFontSizeState(savedSize);
      setReducedMotion(savedMotion);
      setUnderlineLinks(savedUnderline);
      setIsDyslexicFont(savedDyslexic);

      applyDomAttributes(savedTheme, savedContrast, savedSize, savedMotion, savedUnderline, savedDyslexic);
    } catch {
      // Graceful fallback for privacy mode
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

    // Theme (Dark / Light)
    if (t === "dark") {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }

    // High Contrast
    if (contrast) {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }

    // Font Sizing
    root.setAttribute("data-font-size", size);

    // Reduced Motion
    if (motion) {
      root.setAttribute("data-reduced-motion", "true");
    } else {
      root.removeAttribute("data-reduced-motion");
    }

    // Underline Links
    if (underline) {
      root.setAttribute("data-underline-links", "true");
    } else {
      root.removeAttribute("data-underline-links");
    }

    // Dyslexia Font
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
    // When dark mode is toggled, high contrast is deactivated to prevent conflict
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
    // When High Contrast is turned on, theme is normalized to contrast
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

  // 4. Text Navigation Scanner
  const scanReadableElements = useCallback((): HTMLElement[] => {
    if (typeof document === "undefined") return [];
    const main = document.getElementById("main-content") || document.body;
    const candidates = main.querySelectorAll<HTMLElement>(
      "h1, h2, h3, h4, p, [role='alert'], blockquote, li"
    );

    const validElements: HTMLElement[] = [];
    candidates.forEach((el) => {
      // Must have readable text (> 6 characters), visible in DOM, not inside utility controls
      if (
        el.offsetParent !== null &&
        el.textContent &&
        el.textContent.trim().length > 6 &&
        !el.closest("nav") &&
        !el.closest("[role='dialog']") &&
        !el.closest("#accessibility-panel")
      ) {
        validElements.push(el);
      }
    });

    currentElementsRef.current = validElements;
    setTotalTextBlocks(validElements.length);
    return validElements;
  }, []);

  const highlightElement = (el: HTMLElement) => {
    // Remove existing highlights
    document.querySelectorAll(".accessibility-active-text").forEach((node) => {
      node.classList.remove("accessibility-active-text");
    });

    if (highlightCurrentText && el) {
      el.classList.add("accessibility-active-text");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const goToNextText = () => {
    const elements = currentElementsRef.current.length > 0 ? currentElementsRef.current : scanReadableElements();
    if (elements.length === 0) return;

    let nextIndex = currentTextIndex + 1;
    if (nextIndex >= elements.length) {
      nextIndex = 0; // Loop back
    }

    setCurrentTextIndex(nextIndex);
    const target = elements[nextIndex];
    if (target) {
      highlightElement(target);
      setSpeakStatus(`Text block ${nextIndex + 1} of ${elements.length}`);
    }
  };

  const goToPreviousText = () => {
    const elements = currentElementsRef.current.length > 0 ? currentElementsRef.current : scanReadableElements();
    if (elements.length === 0) return;

    let prevIndex = currentTextIndex - 1;
    if (prevIndex < 0) {
      prevIndex = elements.length - 1;
    }

    setCurrentTextIndex(prevIndex);
    const target = elements[prevIndex];
    if (target) {
      highlightElement(target);
      setSpeakStatus(`Text block ${prevIndex + 1} of ${elements.length}`);
    }
  };

  const toggleHighlightText = () => {
    const next = !highlightCurrentText;
    setHighlightCurrentText(next);
    if (!next) {
      document.querySelectorAll(".accessibility-active-text").forEach((node) => {
        node.classList.remove("accessibility-active-text");
      });
    } else if (currentTextIndex >= 0 && currentElementsRef.current[currentTextIndex]) {
      highlightElement(currentElementsRef.current[currentTextIndex]);
    }
  };

  // 5. Speech Synthesis (Text-to-Speech)
  const stopTTS = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakStatus("वाचन बन्द गरियो / Speech stopped");
    }
  };

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
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeakStatus("ब्राउजरमा Speech Synthesis उपलब्ध छैन / TTS not supported in browser");
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Check if user has selected any text on screen
    let textToRead = "";
    const userSelection = window.getSelection()?.toString().trim();

    if (userSelection && userSelection.length > 0) {
      textToRead = userSelection;
      setSpeakStatus("चयन गरिएको पाठ पढ्दैछ / Reading selected text...");
    } else {
      // Use current highlighted block or scan elements
      let targetEl: HTMLElement | null = null;
      const elements = currentElementsRef.current.length > 0 ? currentElementsRef.current : scanReadableElements();

      if (currentTextIndex >= 0 && elements[currentTextIndex]) {
        targetEl = elements[currentTextIndex];
      } else if (elements.length > 0) {
        setCurrentTextIndex(0);
        targetEl = elements[0];
        highlightElement(elements[0]);
      }

      if (targetEl) {
        textToRead = targetEl.textContent || "";
        setSpeakStatus(`पाठ पढ्दैछ: "${textToRead.slice(0, 30)}..." / Reading...`);
      }
    }

    if (!textToRead || textToRead.trim().length === 0) {
      setSpeakStatus("पढ्नका लागि कुनै पाठ भेटिएन / No readable text found");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Language Detection: Check for Devanagari script
    const hasDevanagari = /[\u0900-\u097F]/.test(textToRead);
    const voices = window.speechSynthesis.getVoices();

    if (hasDevanagari) {
      utterance.lang = "ne-NP";
      const nepaliVoice = voices.find(
        (v) => v.lang.includes("ne") || v.name.toLowerCase().includes("nepali")
      );
      if (nepaliVoice) {
        utterance.voice = nepaliVoice;
      }
    } else {
      utterance.lang = "en-US";
      const englishVoice = voices.find(
        (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("US"))
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.rate = 0.95; // Slightly slower for clarity and cognitive accessibility
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakStatus("वाचन सम्पन्न भयो / Reading completed");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakStatus("वाचन त्रुटि / Speech error");
    };

    window.speechSynthesis.speak(utterance);
  };

  // 6. Reset All Accessibility Settings
  const resetAccessibility = () => {
    stopTTS();
    setTheme("light");
    setHighContrast(false);
    setFontSizeState("normal");
    setReducedMotion(false);
    setUnderlineLinks(false);
    setIsDyslexicFont(false);
    setCurrentTextIndex(-1);
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

    applyDomAttributes("light", false, "normal", false, false, false);
    setSpeakStatus("सबै पहुँच सेटिङहरू पूर्वनिर्धारित अवस्थामा फर्काइयो / All accessibility settings reset");
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
        currentTextIndex,
        totalTextBlocks,
        highlightCurrentText,
        toggleHighlightText,
        goToNextText,
        goToPreviousText,
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
