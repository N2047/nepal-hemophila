"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import { 
  PhoneCall, 
  Eye, 
  Globe, 
  ShieldAlert, 
  UserCircle2, 
  ChevronDown, 
  LogOut, 
  Sparkles,
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

export function TopUtilityBar() {
  const { lang, setLang, t, isNepali } = useLanguage();
  const { isAccessibilityOpen, setIsAccessibilityOpen } = useAccessibility();
  const { user, role, loginAs, logout, isAuthenticated } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const rolesList: { role: Role; label: string; desc: string; icon: string }[] = [
    { role: "SUPER_ADMIN", label: "Super Admin", desc: "Full CMS, Audits, Roles & Settings", icon: "👑" },
    { role: "MEDICAL_ADMIN", label: "Medical Admin", desc: "Factor Stock, Clinical Guidelines & Centers", icon: "🩺" },
    { role: "CONTENT_ADMIN", label: "Content Admin", desc: "News, Events, Stories & Resources", icon: "✍️" },
    { role: "PROVINCIAL_ADMIN", label: "Provincial Admin", desc: "Gandaki / Regional Coordination", icon: "🏔️" },
    { role: "FINANCE_ADMIN", label: "Finance Admin", desc: "Donations, Ledger & Transparency", icon: "💰" },
    { role: "HEALTHCARE_PRO", label: "Doctor / HCP", desc: "CME Portal, Clinical Calculators", icon: "👨‍⚕️" },
    { role: "MEMBER", label: "Society Member", desc: "Digital ID Card, AGM & Voting", icon: "🎗️" },
    { role: "PATIENT", label: "Patient / Family", desc: "Bleeding Diary, Factor Request, Care", icon: "🩹" },
    { role: "PUBLIC_USER", label: "Public Visitor", desc: "Standard Public View", icon: "🌐" },
  ];

  return (
    <>
      {/* Skip to Main Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-xl focus:font-medium"
      >
        Skip to main content / मुख्य सामग्रीमा जानुहोस्
      </a>

      {/* Top Utility Bar */}
      <div className="bg-primary-900 text-slate-100 text-xs py-2 px-4 border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Emergency Alert Tag */}
          <div className="flex items-center gap-3">
            <Link 
              href="/emergency" 
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent hover:bg-accent-dark text-white font-semibold transition-colors emergency-pulse"
              title="Click for 24/7 Emergency Bleeding Action"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isNepali ? "आकस्मिक २४/७ सहयोग" : "24/7 Emergency Support"}</span>
            </Link>

            <a
              href="tel:+97714221119"
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>+977-1-4221119 (Bir Hospital) / +977-9851000000</span>
            </a>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Quick Demo Role Switcher Toolbar */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-800 hover:bg-primary-700 text-slate-200 border border-primary-700 transition-colors"
                title="Switch role for testing features"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-[11px] text-amber-300">
                  {user ? `${user.name.split(" ")[0]} (${role.replace("_", " ")})` : "Public User"}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 z-50 p-2 py-2"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <p className="font-bold text-xs text-primary-900">⚡ Demo Role Simulator</p>
                    <p className="text-[11px] text-slate-500">Switch role to preview specific dashboards & permissions:</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {rolesList.map((item) => (
                      <button
                        key={item.role}
                        onClick={() => {
                          loginAs(item.role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-start gap-2 text-xs transition-colors ${
                          role === item.role
                            ? "bg-primary-50 text-primary-900 font-semibold border border-primary-200"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="text-base leading-none mt-0.5">{item.icon}</span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {isAuthenticated && (
                    <div className="mt-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setRoleMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-1.5 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out to Public Visitor</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Accessibility Drawer Toggle */}
            <button
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary-800 hover:bg-primary-700 text-slate-200 border border-primary-700 transition-colors"
              title="Open Accessibility Controls (WCAG 2.1)"
              aria-label="Accessibility options"
            >
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden md:inline">{isNepali ? "पहुँच योग्यता" : "Accessibility"}</span>
            </button>

            {/* Language Switcher (EN / NP) */}
            <div className="flex items-center bg-primary-800 rounded border border-primary-700 overflow-hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-accent text-white"
                    : "text-slate-300 hover:text-white"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("np")}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === "np"
                    ? "bg-accent text-white"
                    : "text-slate-300 hover:text-white"
                }`}
                aria-label="नेपाली भाषामा हेर्नुहोस्"
              >
                नेपाली
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
