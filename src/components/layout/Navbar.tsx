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
                  {/* Name: नेपाल हेमोफिलिया सोसाइटी - रातो कलर */}
                  <div className="font-black text-base sm:text-xl lg:text-2xl text-red-600 dark:text-red-500 leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors tracking-tight">
                    {isNepali ? "नेपाल हेमोफिलिया सोसाइटी" : "Nepal Hemophilia Society"}
                  </div>
                  {/* अनामनगर काठमाडौं समेत रातो कलर */}
                  <div className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 leading-snug flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />
                    <span>{isNepali ? "अनामनगर, काठमाडौं - नेपाल" : "Anamnagar, Kathmandu - Nepal"}</span>
                    <span className="text-red-300 dark:text-red-700 hidden md:inline">•</span>
                    <span className="text-[11px] font-semibold text-red-700/80 dark:text-red-400/80 hidden md:inline">
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

                {/* 3-Line Menu / Settings Features Button - हरियो ब्याकग्राउन्ड (Green Background) */}
                <button
                  id="features-dropdown-trigger"
                  onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all text-xs font-extrabold shadow-sm ${
                    menuDropdownOpen
                      ? "bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800 ring-2 ring-emerald-500/30 shadow-md"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 shadow-xs hover:shadow"
                  }`}
                  title={isNepali ? "मेनु तथा सबै फिचरहरू (३ धर्का)" : "Menu & All Features (3 lines)"}
                  aria-label={isNepali ? "मेनु तथा सबै फिचरहरू खोल्नुहोस्" : "Toggle all features dropdown menu"}
                  aria-expanded={menuDropdownOpen}
                >
                  {menuDropdownOpen ? (
                    <X className="w-4 h-4 text-white shrink-0" />
                  ) : (
                    <Menu className="w-4 h-4 text-white shrink-0" />
                  )}
                  <span className="font-extrabold text-white">
                    {isNepali ? "मेनु / फिचरहरू" : "Menu / Features"}
                  </span>
                </button>

                {/* Admin CMS / Portal Quick Access Button - पहेलो ब्याकग्राउन्ड (Yellow Background) */}
                {isAuthenticated && (
                  <Link
                    href={isAdminOrStaff ? "/admin" : role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs border border-yellow-500 shadow-xs hover:shadow transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-950" />
                    <span className="text-slate-950">{isAdminOrStaff ? "Admin CMS" : "My Portal"}</span>
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

                {/* All 7 Main Categories from Previous Navigation + Hospital Services (८ वटा ठाडो ब्लकहरू) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  
                  {/* १. हाम्रो बारेमा (About Us) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <Users className="w-3.5 h-3.5" />
                        <span>{isNepali ? "हाम्रो बारेमा" : "About Us"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/about"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "हाम्रो परिचय र इतिहास" : "Our Story & History"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "स्थापना, भिजन र मिसन" : "Establishment & mission"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/about#leadership"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "कार्यसमिति र नेतृत्व" : "Board & Leadership"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "केन्द्रीय समिति" : "Executive committee"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/about#chapters"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "प्रादेशिक शाखाहरू" : "Provincial Chapters"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "७ वटै प्रदेशका शाखाहरू" : "7 provincial presence"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/transparency"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "पारदर्शिता प्रतिवेदन" : "Transparency & Audit"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "लेखापरीक्षण र विवरण" : "Audited financials"}</div>
                        </div>
                      </Link>
                      {features.onlineMembershipForm && (
                        <Link
                          href="/membership"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "सदस्यता आवेदन" : "Membership"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "अनलाइन आवेदन फारम" : "Online member form"}</div>
                          </div>
                        </Link>
                      )}
                      <Link
                        href="/contact"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "सम्पर्क तथा ठेगाना" : "Contact & Office"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "अनामनगर, काठमाडौं" : "Anamnagar, Kathmandu"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* २. हेमोफिलिया तथा रक्तस्राव विकार (Hemophilia & Bleeding Disorders) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{isNepali ? "हेमोफिलिया तथा विकार" : "Bleeding Disorders"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/hemophilia"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "हेमोफिलिया के हो?" : "What is Hemophilia?"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "परिभाषा र कारणहरू" : "Basics & genetics"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/hemophilia#types"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "प्रकार र गम्भीरता" : "Types & Severity"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "हेमोफिलिया A, B र फ्याक्टर स्तर" : "Types A, B & levels"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/hemophilia#symptoms"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Stethoscope className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "लक्षण तथा पहिचान" : "Symptoms & Signs"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "जोर्नी रक्तस्राव र परीक्षण" : "Joint bleeds & diagnosis"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/emergency"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl bg-red-100/70 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 hover:bg-red-100 transition-colors group flex items-start gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold flex items-center gap-1">
                            <span>{isNepali ? "आपतकालीन प्राथमिक उपचार" : "Emergency Care"}</span>
                            <span className="px-1 py-0.2 bg-red-600 text-white rounded text-[9px] font-black">🚨 SOS</span>
                          </div>
                          <div className="text-[11px] text-red-600 dark:text-red-400">{isNepali ? "RICE विधि र तत्काल गर्ने काम" : "Immediate RICE action"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/hemophilia#rare"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "अन्य दुर्लभ रक्त विकार" : "Rare Disorders"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "vWD, फ्याक्टर VII, XIII" : "vWD & rare factors"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* ३. बिरामी तथा परिवार सेवाहरू (Patient & Family Services) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{isNepali ? "बिरामी तथा परिवार सेवाहरू" : "Patient Services"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/services/get-support"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "आकस्मिक सहयोग अनुरोध" : "Get Emergency Support"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "तत्काल फ्याक्टर समन्वय" : "Urgent factor help"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/treatment-centres"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "उपचार केन्द्र खोज्नुहोस्" : "Treatment Centres"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "देशभरका एचटीसी र अस्पतालहरू" : "HTCs across Nepal"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/factor-availability"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Activity className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "फ्याक्टर मौज्दात स्थिति" : "Factor Stock Tracker"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "प्रत्यक्ष अस्पताल मौज्दात" : "Hospital inventory"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/services"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Bot className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "एआई स्वास्थ्य सहयोगी" : "AI Assistant"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "२४ घण्टा स्वास्थ्य प्रश्नोत्तर" : "24/7 AI chat support"}</div>
                        </div>
                      </Link>
                      {isAuthenticated && (
                        <Link
                          href={isAdminOrStaff ? "/admin" : role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 transition-colors group flex items-start gap-2 font-black border border-yellow-500 shadow-xs"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-slate-950 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-slate-950">{isAdminOrStaff ? "Admin CMS" : isNepali ? "मेरो पोर्टल" : "My Portal"}</div>
                            <div className="text-[11px] font-medium text-slate-800">{isAdminOrStaff ? "व्यवस्थापन प्यानल" : isNepali ? "उपचार इतिहास र डोज लग" : "Infusion history & log"}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* ४. स्वास्थ्यकर्मीहरूका लागि (For Healthcare Professionals) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>{isNepali ? "स्वास्थ्यकर्मीहरूका लागि" : "For Healthcare Pros"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/healthcare-professionals"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "क्लिनिकल प्रोटोकल" : "Clinical Protocols"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "उपचार विधि र दिशानिर्देश" : "Evidence-based guidelines"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/healthcare-professionals#dosing"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "फ्याक्टर डोजिङ क्यालकुलेटर" : "Factor Dosing Guide"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "तौल र फ्याक्टर हिसाब" : "Weight-based calculator"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/healthcare-professionals#emergency"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "आपतकालीन व्यवस्थापन" : "Emergency Management"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "गम्भीर रक्तस्राव उपचार" : "Acute bleed stabilization"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/healthcare-professionals#referral"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "रेफरल तथा परामर्श" : "Referral Guidelines"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "एचटीसी समन्वय संयन्त्र" : "HTC network referral"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* ५. तथ्याङ्क तथा अनुसन्धान (Data & Research) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <PieChart className="w-3.5 h-3.5" />
                        <span>{isNepali ? "तथ्याङ्क तथा अनुसन्धान" : "Data & Research"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/data-research"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <PieChart className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "राष्ट्रिय बिरामी रजिस्ट्री" : "National Registry"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "नेपालभरको दर्ता विवरण" : "Patient population data"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/data-research#statistics"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "नेपाल हेमोफिलिया तथ्याङ्क" : "Nepal Statistics"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "प्रकार र उमेर समूह विवरण" : "Demographic breakdown"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/data-research#publications"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "अनुसन्धान तथा प्रकाशनहरू" : "Research & Papers"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "वैज्ञानिक अध्ययन र जर्नलहरू" : "Published literature"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/advocacy"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "नीति तथा पैरवी" : "Policy Advocacy"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "सरकारसँग अधिकार पैरवी" : "Government advocacy"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* ६. स्रोत पुस्तकालय (Resource Library) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isNepali ? "स्रोत पुस्तकालय" : "Resource Library"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/resources"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "स्रोत सामग्री तथा गाइड" : "Resources & Guides"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "पुस्तिका र ब्रोसर डाउनलोड" : "Brochures & manuals"}</div>
                        </div>
                      </Link>
                      {features.elearningAcademy && (
                        <Link
                          href="/elearning"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                        >
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold">{isNepali ? "ई-लर्निङ एकेडेमी" : "E-Learning Academy"}</div>
                            <div className="text-[11px] text-slate-500">{isNepali ? "अनलाइन तालिम र कोर्सहरू" : "Online training courses"}</div>
                          </div>
                        </Link>
                      )}
                      <Link
                        href="/resources#media"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "भिडियो तथा अडियो" : "Media Library"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "स्वास्थ्य सचेतना भिडियोहरू" : "Awareness video clips"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/accessibility-statement"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "पहुँचयोग्यता विवरण" : "Accessibility Statement"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "WCAG 2.2 अपाङ्गता सुविधा" : "WCAG 2.2 AA features"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* ७. समाचार तथा कथाहरू (News & Stories) */}
                  <div className="flex flex-col space-y-3 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isNepali ? "समाचार तथा कथाहरू" : "News & Stories"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1 text-xs">
                      <Link
                        href="/news"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "ताजा समाचार र सुचना" : "News & Notices"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "सोसाइटीका ताजा गतिविधि" : "Official press updates"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/events"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "आगामी कार्यक्रमहरू" : "Upcoming Events"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "कार्यशाला र दिवस समारोह" : "Workshops & meetings"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/news#stories"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl hover:bg-red-50/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-700 transition-colors group flex items-start gap-2"
                      >
                        <Heart className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{isNepali ? "बिरामीका प्रेरक कथाहरू" : "Patient Stories"}</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "अनुभव र संघर्षका कथा" : "Living with hemophilia"}</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* ८. द्रुत सेवाहरू (उपचार केन्द्र तथा फ्याक्टर मौज्दात) */}
                  <div className="flex flex-col space-y-3 bg-red-50/50 dark:bg-red-950/30 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/60">
                    <div className="flex items-center gap-2 pb-2 border-b border-red-200 dark:border-red-800">
                      <span className="px-3 py-1 rounded-full bg-[#8A0303] text-white border border-[#6E0000] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{isNepali ? "उपचार तथा फ्याक्टर सेवा" : "Treatment & Stock"}</span>
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1.5 text-xs">
                      <Link
                        href="/treatment-centres"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors group flex items-start gap-2 border border-slate-200 dark:border-slate-700"
                      >
                        <Building2 className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-red-700 dark:text-red-400">{isNepali ? "उपचार केन्द्रहरू (HTCs)" : "Treatment Centres"} 📍</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "नजिकको अस्पताल खोजी" : "Locate hospitals across Nepal"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/factor-availability"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors group flex items-start gap-2 border border-slate-200 dark:border-slate-700"
                      >
                        <Activity className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-red-700 dark:text-red-400">{isNepali ? "फ्याक्टर मौज्दात स्थिति" : "Factor Stock"} 🩸</div>
                          <div className="text-[11px] text-slate-500">{isNepali ? "अस्पताल मौज्दात ट्र्याकर" : "Hospital factor inventory"}</div>
                        </div>
                      </Link>
                      <Link
                        href="/services/get-support"
                        onClick={() => setMenuDropdownOpen(false)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 text-center shadow-xs"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{t("getSupport")}</span>
                      </Link>
                      {features.onlineDonations && (
                        <Link
                          href="/donate"
                          onClick={() => setMenuDropdownOpen(false)}
                          className="p-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold flex items-center justify-center gap-1.5 text-center shadow-xs"
                        >
                          <Heart className="w-3.5 h-3.5 text-red-300 fill-red-400" />
                          <span>{t("donate")}</span>
                        </Link>
                      )}
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
