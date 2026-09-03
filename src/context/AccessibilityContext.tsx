"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type FontSize = "normal" | "large" | "xlarge";

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  isDyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  resetAccessibility: () => void;
  isAccessibilityOpen: boolean;
  setIsAccessibilityOpen: (open: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState<boolean>(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedContrast = localStorage.getItem("nhs_contrast") === "true";
    const savedSize = (localStorage.getItem("nhs_fontsize") as FontSize) || "normal";
    const savedMotion = localStorage.getItem("nhs_reduced_motion") === "true";
    const savedDyslexic = localStorage.getItem("nhs_dyslexic") === "true";

    setHighContrast(savedContrast);
    setFontSizeState(savedSize);
    setReducedMotion(savedMotion);
    setIsDyslexicFont(savedDyslexic);

    applyAttributes(savedContrast, savedSize, savedMotion, savedDyslexic);
  }, []);

  const applyAttributes = (contrast: boolean, size: FontSize, motion: boolean, dyslexic: boolean) => {
    const root = document.documentElement;
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

    if (dyslexic) {
      root.setAttribute("data-dyslexic", "true");
    } else {
      root.removeAttribute("data-dyslexic");
    }
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem("nhs_contrast", String(next));
    applyAttributes(next, fontSize, reducedMotion, isDyslexicFont);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("nhs_fontsize", size);
    applyAttributes(highContrast, size, reducedMotion, isDyslexicFont);
  };

  const increaseFontSize = () => {
    if (fontSize === "normal") setFontSize("large");
    else if (fontSize === "large") setFontSize("xlarge");
  };

  const decreaseFontSize = () => {
    if (fontSize === "xlarge") setFontSize("large");
    else if (fontSize === "large") setFontSize("normal");
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem("nhs_reduced_motion", String(next));
    applyAttributes(highContrast, fontSize, next, isDyslexicFont);
  };

  const toggleDyslexicFont = () => {
    const next = !isDyslexicFont;
    setIsDyslexicFont(next);
    localStorage.setItem("nhs_dyslexic", String(next));
    applyAttributes(highContrast, fontSize, reducedMotion, next);
  };

  const resetAccessibility = () => {
    setHighContrast(false);
    setFontSizeState("normal");
    setReducedMotion(false);
    setIsDyslexicFont(false);
    localStorage.removeItem("nhs_contrast");
    localStorage.removeItem("nhs_fontsize");
    localStorage.removeItem("nhs_reduced_motion");
    localStorage.removeItem("nhs_dyslexic");
    applyAttributes(false, "normal", false, false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
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
