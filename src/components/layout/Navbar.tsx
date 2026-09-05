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
import { useSiteContent } from "@/context/SiteContentContext";

export function Navbar() {
  const { lang, t, isNepali } = useLanguage();
  const { user, isAuthenticated, role } = useAuth();
  const { features } = useSiteContent();
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
              {/* NHS Official Logo */}
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-1 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <img
                  src="/nhs-logo.jpg"
                  alt={isNepali ? "नेपाल हेमोफिलिया सोसाइटी लोगो" : "Nepal Hemophilia Society Logo"}
                  className="w-full h-full object-contain"
                />
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

            {/* Desktop Navigation Links with Accessible Hierarchical Menus */}
            <nav 
              className="hidden lg:flex items-center space-x-1 font-bold text-xs text-slate-700"
              aria-label={isNepali ? "मुख्य मेनु" : "Main Navigation"}
            >
              
              {/* 1. About Us (हाम्रो बारेमा) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("about")}
              >
                <button
                  id="nav-btn-about"
                  onClick={() => {
                    if (activeMegaMenu !== "about") {
                      setActiveMegaMenu("about");
                    } else {
                      document.getElementById("nav-about-sub-0")?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMegaMenu("about");
                      setTimeout(() => document.getElementById("nav-about-sub-0")?.focus(), 50);
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      document.getElementById("nav-btn-hemo")?.focus();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      closeMegaMenu();
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === "about"}
                  className={`px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    activeMegaMenu === "about" ? "text-primary bg-slate-100 ring-2 ring-primary/40" : ""
                  }`}
                >
                  <span>{t("nav.about")}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeMegaMenu === "about" && (
                  <div 
                    role="menu"
                    aria-label={t("nav.about")}
                    className="absolute top-full left-0 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800 dark:text-slate-200"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                      {isNepali ? "संस्थागत परिचय (फिचरहरू)" : "Institutional Structure (Features)"}
                    </div>
                    <div className="space-y-0.5">
                      <Link 
                        id="nav-about-sub-0"
                        role="menuitem"
                        href="/about" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-1")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-btn-about")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-teal-300 text-xs font-semibold focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700 focus:text-primary dark:focus:text-white"
                      >
                        {t("nav.aboutSub.overview")}
                      </Link>

                      <Link 
                        id="nav-about-sub-1"
                        role="menuitem"
                        href="/about#vision" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-2")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-0")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.aboutSub.visionMission")}
                      </Link>

                      <Link 
                        id="nav-about-sub-2"
                        role="menuitem"
                        href="/about#history" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-3")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-1")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.aboutSub.history")}
                      </Link>

                      <Link 
                        id="nav-about-sub-3"
                        role="menuitem"
                        href="/about#leadership" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-4")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-2")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.aboutSub.board")} & {t("nav.aboutSub.advisors")}
                      </Link>

                      <Link 
                        id="nav-about-sub-4"
                        role="menuitem"
                        href="/about#provinces" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-5")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-3")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.aboutSub.provinces")}
                      </Link>

                      <Link 
                        id="nav-about-sub-5"
                        role="menuitem"
                        href="/transparency" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-0")?.focus(); // loop to top
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-about-sub-4")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-about")?.focus();
                          }
                        }}
                        className="block px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-teal-300 text-xs font-medium text-emerald-700 dark:text-emerald-400 focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.aboutSub.annualReports")} (Audit & Governance)
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Hemophilia Knowledge (हेमोफिलिया) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("hemo")}
              >
                <button
                  id="nav-btn-hemo"
                  onClick={() => {
                    if (activeMegaMenu !== "hemo") {
                      setActiveMegaMenu("hemo");
                    } else {
                      document.getElementById("nav-hemo-sub-0")?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMegaMenu("hemo");
                      setTimeout(() => document.getElementById("nav-hemo-sub-0")?.focus(), 50);
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      document.getElementById("nav-btn-services")?.focus();
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      document.getElementById("nav-btn-about")?.focus();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      closeMegaMenu();
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === "hemo"}
                  className={`px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    activeMegaMenu === "hemo" ? "text-primary bg-slate-100 ring-2 ring-primary/40" : ""
                  }`}
                >
                  <span>{t("nav.hemophilia")}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeMegaMenu === "hemo" && (
                  <div 
                    role="menu"
                    aria-label={t("nav.hemophilia")}
                    className="absolute top-full -left-20 w-[460px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 grid grid-cols-2 gap-3 animate-in fade-in duration-150 text-slate-800 dark:text-slate-200"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                        {isNepali ? "रक्त विकार आधारभूत" : "Condition Guides"}
                      </div>
                      <Link 
                        id="nav-hemo-sub-0"
                        role="menuitem"
                        href="/hemophilia" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-1")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-btn-hemo")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.whatIs")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-1"
                        role="menuitem"
                        href="/hemophilia#types" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-2")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-0")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.types")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-2"
                        role="menuitem"
                        href="/hemophilia#vwd" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-3")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-1")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.vwd")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-3"
                        role="menuitem"
                        href="/hemophilia#symptoms" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-4")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-2")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.symptoms")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-4"
                        role="menuitem"
                        href="/hemophilia#faq" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-5")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-3")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium text-primary dark:text-teal-400 focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.faq")}
                      </Link>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                        {isNepali ? "उपचार तथा हेरचाह" : "Care & Treatment"}
                      </div>
                      <Link 
                        id="nav-hemo-sub-5"
                        role="menuitem"
                        href="/emergency" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-6")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-4")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded bg-red-50 dark:bg-red-950/50 hover:bg-red-100 text-red-700 dark:text-red-300 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        🚨 {t("nav.hemoSub.emergencyCare")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-6"
                        role="menuitem"
                        href="/hemophilia#treatment" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-7")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-5")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.treatment")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-7"
                        role="menuitem"
                        href="/hemophilia#joint-health" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-8")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-6")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.jointHealth")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-8"
                        role="menuitem"
                        href="/hemophilia#women" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-9")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-7")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.womenGirls")}
                      </Link>

                      <Link 
                        id="nav-hemo-sub-9"
                        role="menuitem"
                        href="/hemophilia#children" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-0")?.focus(); // loop back
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-hemo-sub-8")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-hemo")?.focus();
                          }
                        }}
                        className="block px-2.5 py-1.5 rounded hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.hemoSub.children")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Patient & Family Services (सेवा तथा सहयोग) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("services")}
              >
                <button
                  id="nav-btn-services"
                  onClick={() => {
                    if (activeMegaMenu !== "services") {
                      setActiveMegaMenu("services");
                    } else {
                      document.getElementById("nav-serv-sub-0")?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMegaMenu("services");
                      setTimeout(() => document.getElementById("nav-serv-sub-0")?.focus(), 50);
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      document.getElementById("nav-link-hcp")?.focus();
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      document.getElementById("nav-btn-hemo")?.focus();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      closeMegaMenu();
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMegaMenu === "services"}
                  className={`px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    activeMegaMenu === "services" ? "text-primary bg-slate-100 ring-2 ring-primary/40" : ""
                  }`}
                >
                  <span>{t("nav.services")}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeMegaMenu === "services" && (
                  <div 
                    role="menu"
                    aria-label={t("nav.services")}
                    className="absolute top-full -left-10 w-96 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 animate-in fade-in duration-150 text-slate-800 dark:text-slate-200"
                    onMouseLeave={closeMegaMenu}
                  >
                    <div className="space-y-1">
                      <Link 
                        id="nav-serv-sub-0"
                        role="menuitem"
                        href="/services/get-support" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-serv-sub-1")?.focus();
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            document.getElementById("nav-btn-services")?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-services")?.focus();
                          }
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 text-red-800 dark:text-red-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        <div>
                          <div>{t("nav.servicesSub.getSupport")}</div>
                          <div className="text-[10px] text-red-600 dark:text-red-400 font-normal">Urgent medical & factor help request</div>
                        </div>
                      </Link>

                      {features.aiChatbot && (
                        <Link 
                          id="nav-serv-sub-1"
                          role="menuitem"
                          href="/chat" 
                          onClick={closeMegaMenu} 
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-2")?.focus();
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-0")?.focus();
                            } else if (e.key === "Escape") {
                              e.preventDefault();
                              closeMegaMenu();
                              document.getElementById("nav-btn-services")?.focus();
                            }
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-primary-900 dark:text-blue-200 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <Bot className="w-4 h-4 text-primary dark:text-teal-400" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{isNepali ? "AI च्याट बोर्ड (n8n)" : "AI Helpdesk Chat (n8n)"}</span>
                              <span className="text-[9px] px-1 bg-primary text-white rounded font-bold">24/7</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">AI Agent & Emergency Assistant</div>
                          </div>
                        </Link>
                      )}

                      {features.treatmentCentresLocator && (
                        <Link 
                          id="nav-serv-sub-2"
                          role="menuitem"
                          href="/treatment-centres" 
                          onClick={closeMegaMenu} 
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-3")?.focus();
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              const prev = document.getElementById("nav-serv-sub-1") || document.getElementById("nav-serv-sub-0");
                              prev?.focus();
                            } else if (e.key === "Escape") {
                              e.preventDefault();
                              closeMegaMenu();
                              document.getElementById("nav-btn-services")?.focus();
                            }
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                        >
                          <MapPin className="w-4 h-4 text-primary dark:text-teal-400" />
                          <div>
                            <div>{t("nav.servicesSub.treatmentCentres")}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Hospitals across all 7 provinces</div>
                          </div>
                        </Link>
                      )}

                      {features.factorAvailabilityTracker && (
                        <Link 
                          id="nav-serv-sub-3"
                          role="menuitem"
                          href="/factor-availability" 
                          onClick={closeMegaMenu} 
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              const next = document.getElementById("nav-serv-sub-4") || document.getElementById("nav-serv-sub-5");
                              next?.focus();
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-2")?.focus();
                            } else if (e.key === "Escape") {
                              e.preventDefault();
                              closeMegaMenu();
                              document.getElementById("nav-btn-services")?.focus();
                            }
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                        >
                          <Activity className="w-4 h-4 text-accent" />
                          <div>
                            <div>{t("nav.servicesSub.factorTracker")}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Live hospital inventory status</div>
                          </div>
                        </Link>
                      )}

                      {features.onlineMembershipForm && (
                        <Link 
                          id="nav-serv-sub-4"
                          role="menuitem"
                          href="/membership" 
                          onClick={closeMegaMenu} 
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-5")?.focus();
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              document.getElementById("nav-serv-sub-3")?.focus();
                            } else if (e.key === "Escape") {
                              e.preventDefault();
                              closeMegaMenu();
                              document.getElementById("nav-btn-services")?.focus();
                            }
                          }}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                        >
                          <Users className="w-4 h-4 text-teal-600" />
                          <div>
                            <div>{t("nav.servicesSub.membership")}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Online application & status tracker</div>
                          </div>
                        </Link>
                      )}

                      <Link 
                        id="nav-serv-sub-5"
                        role="menuitem"
                        href="/services" 
                        onClick={closeMegaMenu} 
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            document.getElementById("nav-serv-sub-0")?.focus(); // loop back
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            const prev = document.getElementById("nav-serv-sub-4") || document.getElementById("nav-serv-sub-3");
                            prev?.focus();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            closeMegaMenu();
                            document.getElementById("nav-btn-services")?.focus();
                          }
                        }}
                        className="block px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:bg-primary-100 dark:focus:bg-slate-700"
                      >
                        {t("nav.servicesSub.physioSupport")} & {t("nav.servicesSub.counselling")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Healthcare Professionals */}
              <Link 
                id="nav-link-hcp"
                href="/healthcare-professionals" 
                onClick={closeMegaMenu}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    document.getElementById("nav-link-registry")?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    document.getElementById("nav-btn-services")?.focus();
                  }
                }}
                className="px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {t("nav.healthcarePros")}
              </Link>

              {/* 5. Data & Research */}
              <Link 
                id="nav-link-registry"
                href="/data-research" 
                onClick={closeMegaMenu}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    document.getElementById("nav-link-resources")?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    document.getElementById("nav-link-hcp")?.focus();
                  }
                }}
                className="px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {t("nav.registry")}
              </Link>

              {/* 6. Resources & E-Learning */}
              <Link 
                id="nav-link-resources"
                href="/resources" 
                onClick={closeMegaMenu}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    document.getElementById("nav-link-news")?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    document.getElementById("nav-link-registry")?.focus();
                  }
                }}
                className="px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {t("nav.resources")}
              </Link>

              {/* 7. News & Events */}
              <Link 
                id="nav-link-news"
                href="/news" 
                onClick={closeMegaMenu}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    document.getElementById("nav-link-resources")?.focus();
                  }
                }}
                className="px-3 py-2 rounded-lg hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary-50 text-primary-900 hover:bg-primary-100 font-bold text-xs border border-primary-200 shadow-xs transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
                  <span>{isAdminOrStaff ? "Admin CMS" : "My Portal"}</span>
                </Link>
              )}

              {/* Primary CTA: Get Support (Semantic Emergency Red) */}
              <Link
                href="/services/get-support"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-dark text-white font-extrabold text-xs shadow-sm transition-all hover:shadow border border-red-600"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-white" />
                <span>{t("getSupport")}</span>
              </Link>

              {/* Secondary CTA: Donate (Trustworthy Medical Blue) */}
              {features.onlineDonations && (
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-extrabold text-xs shadow-sm transition-all hover:shadow border border-primary-dark"
                >
                  <Heart className="w-3.5 h-3.5 text-red-300 fill-red-400" />
                  <span>{t("donate")}</span>
                </Link>
              )}

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
            <div className={`grid ${features.onlineDonations ? "grid-cols-2" : "grid-cols-1"} gap-2 mb-3`}>
              <Link
                href="/services/get-support"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs text-center flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t("getSupport")}</span>
              </Link>
              {features.onlineDonations && (
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-primary text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span>{t("donate")}</span>
                </Link>
              )}
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
              {features.treatmentCentresLocator && (
                <Link href="/treatment-centres" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100 text-primary">
                  📍 {t("findCentre")}
                </Link>
              )}
              {features.factorAvailabilityTracker && (
                <Link href="/factor-availability" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100 text-accent">
                  🩸 {t("factorAvailability")}
                </Link>
              )}
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
              {features.elearningAcademy && (
                <Link href="/elearning" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                  {t("nav.elearning")}
                </Link>
              )}
              <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.news")}
              </Link>
              <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                {t("nav.events")}
              </Link>
              {features.onlineMembershipForm && (
                <Link href="/membership" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-100">
                  {t("membership")}
                </Link>
              )}
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
