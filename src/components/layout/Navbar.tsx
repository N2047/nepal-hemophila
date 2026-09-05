"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Menu, 
  X, 
  Search, 
  Heart, 
  ShieldAlert, 
  Activity, 
  MapPin, 
  FileText, 
  GraduationCap, 
  Users, 
  Sparkles,
  LayoutDashboard,
  HelpCircle,
  Stethoscope,
  BookOpen,
  PieChart,
  Bot,
  Building2
} from "lucide-react";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";
import { EmergencyModal } from "@/components/common/EmergencyModal";
import { useSiteContent } from "@/context/SiteContentContext";

export function Navbar() {
  const { lang, t, isNepali } = useLanguage();
  const { user, isAuthenticated, role } = useAuth();
  const { features } = useSiteContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isAdminOrStaff = ["SUPER_ADMIN", "CONTENT_ADMIN", "MEDICAL_ADMIN", "PROVINCIAL_ADMIN", "FINANCE_ADMIN"].includes(role);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 shadow-md ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        {/* ======================================================== */}
        {/* TOP BAR: Organization Branding, Address & Action Buttons */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-2.5 sm:py-3">
              
              {/* NHS Institutional Branding */}
              <Link 
                href="/" 
                className="flex items-center gap-3 sm:gap-3.5 group shrink-0"
                onClick={() => setMenuDropdownOpen(false)}
              >
                {/* NHS Official Logo */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 bg-white p-1 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <img
                    src="/nhs-logo.jpg"
                    alt={isNepali ? "नेपाल हेमोफिलिया सोसाइटी लोगो" : "Nepal Hemophilia Society Logo"}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Name: सुरुको भागमा लोगो सहित नेपाल हेमोफिलिया सोसाइटी */}
                  <div className="font-black text-base sm:text-xl lg:text-2xl text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors tracking-tight">
                    {isNepali ? "नेपाल हेमोफिलिया सोसाइटी" : "Nepal Hemophilia Society"}
                  </div>
                  {/* Enter हान: अनि अनामनगर काठमाडौं -नेपाल */}
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-snug flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{isNepali ? "अनामनगर, काठमाडौं - नेपाल" : "Anamnagar, Kathmandu - Nepal"}</span>
                    <span className="text-slate-300 dark:text-slate-600 hidden md:inline">•</span>
                    <span className="text-[11px] font-normal text-slate-500 hidden md:inline">
                      {isNepali ? "राष्ट्रिय बिरामी संस्था (स्था. १९९२)" : "National Patient Organization (Est. 1992)"}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Right Header CTAs */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                
                {/* Global Search Button */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  title="Global Search (Ctrl + K)"
                  aria-label="Open search dialog"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span className="hidden md:inline text-slate-500">{isNepali ? "खोज्नुहोस्..." : "Search..."}</span>
                  <kbd className="hidden md:inline-block text-[10px] bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-1.5 py-0.5 rounded text-slate-500">Ctrl K</kbd>
                </button>

                {/* 3-Line Menu / Settings Features Button (शर्च बटम छेउमा ३ वटा धर्का) */}
                <button
                  id="features-dropdown-trigger"
                  onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all text-xs font-extrabold shadow-sm ${
                    menuDropdownOpen
                      ? "bg-red-700 text-white border-red-800 ring-2 ring-red-500/30"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-slate-400"
                  }`}
                  title={isNepali ? "मेनु तथा सबै फिचरहरू (३ धर्का)" : "Menu & All Features (3 lines)"}
                  aria-label={isNepali ? "मेनु तथा सबै फिचरहरू खोल्नुहोस्" : "Toggle all features dropdown menu"}
                  aria-expanded={menuDropdownOpen}
                >
                  {menuDropdownOpen ? (
                    <X className="w-4 h-4 text-current shrink-0" />
                  ) : (
                    <Menu className="w-4 h-4 text-current shrink-0" />
                  )}
                  <span className="font-extrabold">
                    {isNepali ? "मेनु / फिचरहरू" : "Menu / Features"}
                  </span>
                </button>

                {/* Admin CMS / Portal Quick Access Button if Authenticated */}
                {isAuthenticated && (
                  <Link
                    href={isAdminOrStaff ? "/admin" : role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-900 dark:text-primary-200 hover:bg-primary-100 font-bold text-xs border border-primary-200 dark:border-primary-800 shadow-xs transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                    <span>{isAdminOrStaff ? "Admin CMS" : "My Portal"}</span>
                  </Link>
                )}

                {/* Primary CTA: Get Support (Semantic Emergency Red) */}
                <Link
                  href="/services/get-support"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-dark text-white font-extrabold text-xs shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] border border-red-600"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-white" />
                  <span>{t("getSupport")}</span>
                </Link>

                {/* Secondary CTA: Donate (Trustworthy Medical Blue) */}
                {features.onlineDonations && (
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] border border-primary-dark"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-300 fill-red-400" />
                    <span>{t("donate")}</span>
                  </Link>
                )}

              </div>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VERTICAL FEATURES DROPDOWN (३ धर्कामा थिचे पछी देखिने)   */}
        {/* ======================================================== */}
        {menuDropdownOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 transition-opacity"
              onClick={() => setMenuDropdownOpen(false)}
              aria-hidden="true"
            />

            {/* Vertical Dropdown Panel */}
            <div 
              id="features-vertical-dropdown"
              className="relative z-40 bg-white dark:bg-slate-900 border-b-4 border-red-700 shadow-2xl max-h-[85vh] overflow-y-auto transition-all animate-in fade-in slide-in-from-top-2 duration-200"
              role="region"
              aria-label={isNepali ? "सबै फिचरहरूको ठाडो मेनु" : "Vertical features directory"}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                
                {/* Top header inside dropdown */}
                <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-gradient-to-r from-[#8A0303] to-[#A80D0D] text-white text-xs font-black shadow-xs">
                      {isNepali ? "सबै फिचर तथा सेवाहरू" : "All Features & Services"}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {isNepali ? "तल ठाडो सूचीबाट आफूलाई आवश्यक फिचर चयन गर्नुहोस्" : "Select any feature from the vertical list below"}
                    </span>
                  </div>
                  <button
                    onClick={() => setMenuDropdownOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{isNepali ? "मेनु बन्द (Esc)" : "Close Menu (Esc)"}</span>
                  </button>
                </div>

                {/* 4 Vertical Columns containing all features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  
                  {/* COLUMN 1: हाम्रो बारेमा (About Us) */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-red-800/80">
                      <Users className="w-4 h-4 text-red-700 dark:text-red-400 shrink-0" />
                      <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isNepali ? "हाम्रो बारेमा" : "About Us"}
                      </h2>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-xs sm:text-sm">
                      <Link
                        href="/about"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Building2 className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "हाम्रो परिचय र इतिहास" : "Our Story & History"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "स्थापना, भिजन र मिसन" : "Establishment, vision & mission"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/about#leadership"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Users className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "कार्यसमिति तथा नेतृत्व" : "Executive Committee"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "केन्द्रीय कार्यसमिति र सल्लाहकारहरू" : "Central leadership & advisors"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/about#chapters"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "प्रादेशिक शाखाहरू" : "Provincial Chapters"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "७ वटै प्रदेशका शाखाहरू" : "Offices across 7 provinces"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/transparency"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "पारदर्शिता तथा प्रतिवेदनहरू" : "Transparency & Reports"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "वार्षिक लेखापरीक्षण र वित्तीय विवरण" : "Audit reports & financials"}</div>
                        </div>
                      </Link>

                      {features.onlineMembershipForm && (
                        <Link
                          href="/membership"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                        >
                          <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "सदस्यता लिनुहोस्" : "Become a Member"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "अनलाइन सदस्यता फारम" : "Join NHS network"}</div>
                          </div>
                        </Link>
                      )}

                      <Link
                        href="/contact"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "सम्पर्क तथा ठेगाना" : "Contact & Office"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "अनामनगर, काठमाडौं" : "Anamnagar, Kathmandu"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* COLUMN 2: हेमोफिलिया तथा विकारहरू (Bleeding Disorders) */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-red-800/80">
                      <Activity className="w-4 h-4 text-red-700 dark:text-red-400 shrink-0" />
                      <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isNepali ? "हेमोफिलिया तथा विकारहरू" : "Bleeding Disorders"}
                      </h2>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-xs sm:text-sm">
                      <Link
                        href="/hemophilia"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "हेमोफिलिया के हो?" : "What is Hemophilia?"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "परिभाषा, कारण र आधारभूत जानकारी" : "Basics, genetics & facts"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/hemophilia#types"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Activity className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "प्रकार र गम्भीरता" : "Types & Severity"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "हेमोफिलिया A, B र फ्याक्टर स्तर" : "Hemophilia A, B & levels"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/hemophilia#symptoms"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Stethoscope className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "लक्षण तथा पहिचान" : "Symptoms & Diagnosis"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "रक्तस्रावका संकेत र जाँच विधि" : "Joint bleeds & testing"}</div>
                        </div>
                      </Link>

                      {/* Emergency Care Link Highlighted */}
                      <Link
                        href="/emergency"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 hover:bg-red-100 transition-colors group flex items-start gap-2.5"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            <span>{isNepali ? "आपतकालीन प्राथमिक उपचार" : "Emergency Bleed Care"}</span>
                            <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-black">🚨 SOS</span>
                          </div>
                          <div className="text-[11px] text-red-600 dark:text-red-400">{isNepali ? "RICE विधि र तत्काल गर्ने काम" : "Immediate RICE emergency action"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/hemophilia#rare"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "अन्य दुर्लभ रक्त विकार" : "Other Bleeding Disorders"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "vWD, फ्याक्टर VII, XIII कमी" : "von Willebrand & rare factors"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* COLUMN 3: बिरामी तथा परिवार सेवाहरू (Patient & Family Services) */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-red-800/80">
                      <Heart className="w-4 h-4 text-red-700 dark:text-red-400 shrink-0" />
                      <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isNepali ? "बिरामी तथा परिवार सेवाहरू" : "Patient & Family Services"}
                      </h2>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-xs sm:text-sm">
                      <Link
                        href="/services/get-support"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "आकस्मिक सहयोग अनुरोध" : "Get Emergency Support"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "तत्काल फ्याक्टर र समन्वय" : "Urgent factor assistance form"}</div>
                        </div>
                      </Link>

                      {features.treatmentCentresLocator && (
                        <Link
                          href="/treatment-centres"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                        >
                          <Building2 className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "उपचार केन्द्र खोज्नुहोस्" : "Treatment Centres"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "देशभरका एचटीसी र अस्पतालहरू" : "HTCs and hospitals across Nepal"}</div>
                          </div>
                        </Link>
                      )}

                      {features.factorAvailabilityTracker && (
                        <Link
                          href="/factor-availability"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                        >
                          <Activity className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "फ्याक्टर मौज्दात स्थिति" : "Factor Stock Tracker"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "कुन अस्पतालमा कति मौज्दात छ" : "Live hospital inventory status"}</div>
                          </div>
                        </Link>
                      )}

                      <Link
                        href="/services"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Bot className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "एआई स्वास्थ्य सहयोगी (Chatbot)" : "AI Health Assistant"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "२४ घण्टा अनलाइन प्रश्नोत्तर" : "24/7 automated support"}</div>
                        </div>
                      </Link>

                      {isAuthenticated && (
                        <Link
                          href={role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-900 dark:text-primary-200 transition-colors group flex items-start gap-2.5 font-bold"
                        >
                          <LayoutDashboard className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div>{isNepali ? "मेरो बिरामी पोर्टल" : "My Patient Portal"}</div>
                            <div className="text-[11px] font-normal text-slate-500">{isNepali ? "उपचार इतिहास र डोज लग" : "Treatment history & infusion log"}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* COLUMN 4: स्वास्थ्यकर्मी, अनुसन्धान र स्रोतहरू */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-red-800/80">
                      <GraduationCap className="w-4 h-4 text-red-700 dark:text-red-400 shrink-0" />
                      <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isNepali ? "स्वास्थ्यकर्मी र स्रोतहरू" : "HCP, Data & News"}
                      </h2>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-xs sm:text-sm">
                      <Link
                        href="/healthcare-professionals"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Stethoscope className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "स्वास्थ्यकर्मीहरूका लागि" : "For Health Professionals"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "क्लिनिकल प्रोटोकल र दिशानिर्देश" : "Clinical guidelines & dosing"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/data-research"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <PieChart className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "तथ्याङ्क तथा अनुसन्धान" : "Data & Research"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "राष्ट्रिय बिरामी रजिस्ट्री र रिपोर्ट" : "National patient registry data"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/resources"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "स्रोत पुस्तकालय" : "Resource Library"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "गाइड, भिडियो र निर्देशिका" : "Guides, brochures & videos"}</div>
                        </div>
                      </Link>

                      {features.elearningAcademy && (
                        <Link
                          href="/elearning"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                        >
                          <GraduationCap className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "ई-लर्निङ एकेडेमी" : "E-Learning Academy"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "तालिम तथा प्रमाणपत्र कोर्स" : "Training modules & courses"}</div>
                          </div>
                        </Link>
                      )}

                      <Link
                        href="/news"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "समाचार तथा कथाहरू" : "News & Stories"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "सोसाइटीका ताजा गतिविधिहरू" : "Press releases & updates"}</div>
                        </div>
                      </Link>

                      <Link
                        href="/events"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl hover:bg-red-50/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2.5"
                      >
                        <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "आगामी कार्यक्रमहरू" : "Upcoming Events"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "कार्यशाला र दिवस समारोह" : "Workshops & WHD meetings"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>

                {/* Bottom Quick Row inside Dropdown */}
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 dark:text-slate-300">{isNepali ? "शीघ्र पहुँच:" : "Quick Links:"}</span>
                    <Link
                      href="/treatment-centres"
                      onClick={() => setMenuDropdownOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold"
                    >
                      📍 {isNepali ? "उपचार केन्द्रहरू" : "Treatment Centres"}
                    </Link>
                    <Link
                      href="/factor-availability"
                      onClick={() => setMenuDropdownOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 hover:bg-red-200 text-red-800 dark:text-red-300 font-bold"
                    >
                      🩸 {isNepali ? "फ्याक्टर मौज्दात" : "Factor Stock"}
                    </Link>
                    <Link
                      href="/emergency"
                      onClick={() => setMenuDropdownOpen(false)}
                      className="px-2.5 py-1 rounded-full bg-red-600 text-white font-bold hover:bg-red-700"
                    >
                      🚨 {isNepali ? "इमर्जेन्सी केयर" : "Emergency"}
                    </Link>
                  </div>

                  <div className="text-slate-500 text-[11px]">
                    {isNepali ? "नेपाल हेमोफिलिया सोसाइटी • अनामनगर, काठमाडौं" : "Nepal Hemophilia Society • Anamnagar, Kathmandu"}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </header>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  );
}
