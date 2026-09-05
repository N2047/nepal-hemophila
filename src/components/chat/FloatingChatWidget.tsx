"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X, Sparkles, Bot } from "lucide-react";
import { ChatBoard } from "./ChatBoard";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { usePathname } from "next/navigation";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const { isNepali } = useLanguage();
  const { features } = useSiteContent();
  const pathname = usePathname();

  // Don't show floating widget if already on the full /chat page or if disabled by Super Admin
  const isFullChatPage = pathname === "/chat";

  // Auto-show friendly tooltip once after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (isFullChatPage || !features.aiChatbot) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <ChatBoard
          isFloating={true}
          onClose={() => setIsOpen(false)}
          className="animate-in fade-in slide-in-from-bottom-5 duration-300"
        />
      )}

      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Friendly Tooltip Prompt when closed */}
        {!isOpen && hasPrompted && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300 hover:border-primary transition-all hover:scale-105"
          >
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
            </div>
            <span>
              {isNepali ? "हेमोफिलिया सहायता चाहिन्छ? च्याट गर्नुहोस्" : "Need Bleeding Support? Chat with AI"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasPrompted(false);
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Main Floating Bubble Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle NHS AI Chatbot"
          className={`relative group flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 transform active:scale-95 ${
            isOpen
              ? "w-12 h-12 bg-slate-800 text-white hover:bg-slate-900"
              : "w-14 h-14 bg-gradient-to-tr from-primary to-primary-light text-white hover:shadow-primary/30 hover:scale-110"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 rotate-0 group-hover:rotate-90" />
          ) : (
            <>
              {/* Pulse ring effect */}
              <span className="absolute -inset-1 rounded-2xl bg-primary opacity-30 animate-ping group-hover:opacity-50" />
              <div className="relative flex items-center justify-center">
                <Bot className="w-7 h-7 transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}
