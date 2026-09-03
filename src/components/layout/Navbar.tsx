"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
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
  Bot
} from "lucide-react";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";
import { EmergencyModal } from "@/components/common/EmergencyModal";

export function Navbar() {
  const { lang, t, isNepali } = useLanguage();
  const { user, isAuthenticated, role } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMegaMenu = () => setActiveMegaMenu(null);

  const isAdminOrStaff = ["SUPER_ADMIN", "CONTENT_ADMIN", "MEDICAL_ADMIN", "PROVINCIAL_ADMIN", "FINANCE_ADMIN"].includes(role);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* NHS Institutional Branding */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group shrink-0"
              onClick={closeMegaMenu}
            >
              {/* NHS Emblem: Deep Blue Shield with Crimson Blood Drop & Medical Cross */}
              <div className="w-12 h-12 rounded-xl bg-gradient-medical flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-white relative overflow-hidden border border-primary-700">
                <div className="absolute inset-0 bg-red-600/20 rounded-xl" />
                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-4 h-4 bg-accent rounded-full mb-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="font-extrabold text-[10px] tracking-wider text-white">NHS</span>
                </div>
              </div>

              <div>
                <div className="font-extrabold text-base sm:text-lg text-primary-900 leading-tight group-hover:text-primary transition-colors">
                  {isNepali ? "नेपाल हेमोफिलिया सोसाइटी" : "Nepal Hemophilia Society"}
                </div>
                <div className="text-[11px] font-medium text-slate-500 leading-tight">
                  {isNepali ? "राष्ट्रिय बिरामी संस्था (स्था. १९९२)" : "National Patient Organization (Est. 1992)"}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links with Mega-Menus */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-xs text-slate-700">
              
              {/* 1. About Us */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("about")}
              >
                <button
                  className={`px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 flex items-center gap-1 transition-colors ${
                    activeMegaMenu === "about" ? "text-primary bg-slate-50" : ""
                  }`}
                >
                  <span>{t("nav.about")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === "about" && (
                  <div 
                    className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                      {isNepali ? "संस्थागत परिचय" : "Institutional Structure"}
                    </div>
                    <div className="space-y-0.5">
                      <Link href="/about" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-800 hover:text-primary text-xs font-semibold">
                        {t("nav.aboutSub.overview")}
                      </Link>
                      <Link href="/about#vision" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-700 hover:text-primary text-xs">
                        {t("nav.aboutSub.visionMission")}
                      </Link>
                      <Link href="/about#history" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-700 hover:text-primary text-xs">
                        {t("nav.aboutSub.history")}
                      </Link>
                      <Link href="/about#leadership" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-700 hover:text-primary text-xs">
                        {t("nav.aboutSub.board")} & {t("nav.aboutSub.advisors")}
                      </Link>
                      <Link href="/about#provinces" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-700 hover:text-primary text-xs">
                        {t("nav.aboutSub.provinces")}
                      </Link>
                      <Link href="/transparency" onClick={closeMegaMenu} className="block px-3 py-2 rounded-lg hover:bg-primary-50 text-slate-700 hover:text-primary text-xs font-medium text-emerald-700">
                        {t("nav.aboutSub.annualReports")} (Audit & Governance)
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Hemophilia Knowledge */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("hemo")}
              >
                <button
                  className={`px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 flex items-center gap-1 transition-colors ${
                    activeMegaMenu === "hemo" ? "text-primary bg-slate-50" : ""
                  }`}
                >
                  <span>{t("nav.hemophilia")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === "hemo" && (
                  <div 
                    className="absolute top-full -left-20 w-[460px] bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 grid grid-cols-2 gap-3 animate-in fade-in duration-150"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                        {isNepali ? "रक्त विकार आधारभूत" : "Condition Guides"}
                      </div>
                      <Link href="/hemophilia" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-800 font-semibold text-xs">
                        {t("nav.hemoSub.whatIs")}
                      </Link>
                      <Link href="/hemophilia#types" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.types")}
                      </Link>
                      <Link href="/hemophilia#vwd" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.vwd")}
                      </Link>
                      <Link href="/hemophilia#symptoms" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.symptoms")}
                      </Link>
                      <Link href="/hemophilia#faq" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs font-medium text-primary">
                        {t("nav.hemoSub.faq")}
                      </Link>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                        {isNepali ? "उपचार तथा हेरचाह" : "Care & Treatment"}
                      </div>
                      <Link href="/emergency" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs">
                        🚨 {t("nav.hemoSub.emergencyCare")}
                      </Link>
                      <Link href="/hemophilia#treatment" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.treatment")}
                      </Link>
                      <Link href="/hemophilia#joint-health" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.jointHealth")}
                      </Link>
                      <Link href="/hemophilia#women" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.womenGirls")}
                      </Link>
                      <Link href="/hemophilia#children" onClick={closeMegaMenu} className="block px-2.5 py-1.5 rounded hover:bg-primary-50 text-slate-700 text-xs">
                        {t("nav.hemoSub.children")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Patient & Family Services */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("services")}
              >
                <button
                  className={`px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 flex items-center gap-1 transition-colors ${
                    activeMegaMenu === "services" ? "text-primary bg-slate-50" : ""
                  }`}
                >
                  <span>{t("nav.services")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === "services" && (
                  <div 
                    className="absolute top-full -left-10 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div className="space-y-1">
                      <Link href="/services/get-support" onClick={closeMegaMenu} className="flex items-center gap-2.5 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 font-semibold text-xs">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        <div>
                          <div>{t("nav.servicesSub.getSupport")}</div>
                          <div className="text-[10px] text-red-600 font-normal">Urgent medical & factor help request</div>
                        </div>
                      </Link>

                      <Link href="/chat" onClick={closeMegaMenu} className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-primary-900 font-semibold text-xs">
                        <Bot className="w-4 h-4 text-primary" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span>{isNepali ? "AI च्याट बोर्ड (n8n)" : "AI Helpdesk Chat (n8n)"}</span>
                            <span className="text-[9px] px-1 bg-primary text-white rounded font-bold">24/7</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-normal">AI Agent & Emergency Assistant</div>
                        </div>
                      </Link>

                      <Link href="/treatment-centres" onClick={closeMegaMenu} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 text-slate-800 text-xs font-semibold">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <div>{t("nav.servicesSub.treatmentCentres")}</div>
                          <div className="text-[10px] text-slate-500 font-normal">Hospitals across all 7 provinces</div>
                        </div>
                      </Link>

                      <Link href="/factor-availability" onClick={closeMegaMenu} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 text-slate-800 text-xs font-semibold">
                        <Activity className="w-4 h-4 text-accent" />
                        <div>
                          <div>{t("nav.servicesSub.factorTracker")}</div>
                          <div className="text-[10px] text-slate-500 font-normal">Live hospital inventory status</div>
                        </div>
                      </Link>

                      <Link href="/membership" onClick={closeMegaMenu} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 text-slate-800 text-xs font-semibold">
                        <Users className="w-4 h-4 text-teal-600" />
                        <div>
                          <div>{t("nav.servicesSub.membership")}</div>
                          <div className="text-[10px] text-slate-500 font-normal">Online application & status tracker</div>
                        </div>
                      </Link>

                      <Link href="/services#physio-counselling" onClick={closeMegaMenu} className="block px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 text-xs">
                        {t("nav.servicesSub.physioSupport")} & {t("nav.servicesSub.counselling")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Healthcare Professionals */}
              <Link 
                href="/healthcare-professionals" 
                onClick={closeMegaMenu}
                className="px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 transition-colors"
              >
                {t("nav.healthcarePros")}
              </Link>

              {/* 5. Data & Research */}
              <Link 
                href="/data-research" 
                onClick={closeMegaMenu}
                className="px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 transition-colors"
              >
                {t("nav.registry")}
              </Link>

              {/* 6. Resources & E-Learning */}
              <Link 
                href="/resources" 
                onClick={closeMegaMenu}
                className="px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 transition-colors"
              >
                {t("nav.resources")}
              </Link>

              {/* 7. News & Events */}
              <Link 
                href="/news" 
                onClick={closeMegaMenu}
                className="px-3 py-2 rounded-md hover:text-primary hover:bg-slate-50 transition-colors"
              >
                {t("nav.news")}
              </Link>
            </nav>

            {/* Right Header CTAs */}
            <div className="flex items-center gap-2.5">
              
              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-primary transition-colors"
                title="Global Search (Ctrl + K)"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Admin CMS / Portal Quick Access Button if Authenticated */}
              {isAuthenticated && (
                <Link
                  href={isAdminOrStaff ? "/admin" : role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-50 text-primary-900 hover:bg-primary-100 font-semibold text-xs border border-primary-200 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                  <span>{isAdminOrStaff ? "Admin CMS" : "My Portal"}</span>
                </Link>
              )}

              {/* Primary CTA: Get Support */}
              <Link
                href="/services/get-support"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-dark text-white font-bold text-xs shadow-sm transition-all hover:shadow"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t("getSupport")}</span>
              </Link>

              {/* Secondary CTA: Donate */}
              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-sm transition-all hover:shadow"
              >
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                <span>{t("donate")}</span>
              </Link>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[80vh] overflow-y-auto p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Link
                href="/services/get-support"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-accent text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t("getSupport")}</span>
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-primary text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                <span>{t("donate")}</span>
              </Link>
            </div>

            <div className="space-y-1 text-sm font-semibold text-slate-800">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.home")}
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.about")}
              </Link>
              <Link href="/hemophilia" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.hemophilia")}
              </Link>
              <Link href="/treatment-centres" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100 text-primary">
                📍 {t("findCentre")}
              </Link>
              <Link href="/factor-availability" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100 text-accent">
                🩸 {t("factorAvailability")}
              </Link>
              <Link href="/emergency" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-red-50 text-red-700">
                🚨 {t("nav.hemoSub.emergencyCare")}
              </Link>
              <Link href="/healthcare-professionals" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.healthcarePros")}
              </Link>
              <Link href="/data-research" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.registry")}
              </Link>
              <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.resources")}
              </Link>
              <Link href="/elearning" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.elearning")}
              </Link>
              <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.news")}
              </Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.events")}
              </Link>
              <Link href="/membership" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("membership")}
              </Link>
              <Link href="/transparency" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.transparency")}
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.contact")}
              </Link>

              {isAuthenticated && (
                <div className="pt-3 border-t border-slate-200">
                  <Link
                    href={isAdminOrStaff ? "/admin" : role === "PATIENT" ? "/portal/patient" : "/portal/member"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 rounded bg-primary-50 text-primary-900 font-bold"
                  >
                    ⚡ {isAdminOrStaff ? "Admin CMS Dashboard" : "My Account / Portal"}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  );
}
