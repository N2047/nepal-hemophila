"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  ShieldAlert, 
  Heart, 
  MapPin, 
  Activity, 
  FileText, 
  Users, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Building2, 
  Sparkles, 
  Stethoscope, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Settings
} from "lucide-react";
import { EmergencyModal } from "@/components/common/EmergencyModal";
import { useSiteContent } from "@/context/SiteContentContext";
import { useAuth } from "@/context/AuthContext";
import { NoticeBoardSection } from "@/components/common/NoticeBoardSection";
import { EditableContentWrapper } from "@/components/common/EditableContentWrapper";

export default function HomePage() {
  const { lang, t, l, isNepali } = useLanguage();
  const { role } = useAuth();
  const { features, hero, emergency: emergencyContent, stats: siteStats, orgDetails } = useSiteContent();
  const { 
    treatmentCentres, 
    factorInventory, 
    newsArticles, 
    events, 
    resources, 
    stats 
  } = useData();

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>("All");

  const featuredNews = newsArticles.slice(0, 3);
  const featuredEvents = events.slice(0, 2);
  const featuredResources = resources.slice(0, 3);

  // Filter treatment centers for preview
  const sampleCentres = treatmentCentres.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Super Admin CMS Quick Access Banner */}
      {role === "SUPER_ADMIN" && (
        <div className="bg-primary-950 text-white px-4 py-2.5 text-xs border-b border-primary-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-bold flex items-center gap-2 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>👑 सुपर एडमिन मोड: कुनै पनि कन्टेन्ट सम्पादन गर्न वा फिचर अन/अफ गर्न CMS उपलब्ध छ।</span>
            </span>
            <Link
              href="/admin?tab=site-content"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-1.5 text-[11px] transition-colors shrink-0"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>🌐 कन्टेन्ट तथा फिचर व्यवस्थापन खोल्नुहोस्</span>
            </Link>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <EditableContentWrapper label="मुख्य ब्यानर (Hero) सम्पादन गर्नुहोस्" adminUrl="/admin?tab=site-content">
        <section className="relative bg-gradient-medical text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-primary-800">
        {/* Background Subtle Medical Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Decorative Glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{isNepali ? (hero.taglineBadgeNp || "राष्ट्रिय बिरामी संस्था • नेपाल") : (hero.taglineBadgeEn || "National Bleeding Disorders Organization • Nepal")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {isNepali ? (hero.titleNp || t("hero.title")) : (hero.titleEn || t("hero.title"))}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isNepali ? (hero.subtitleNp || t("hero.subtitle")) : (hero.subtitleEn || t("hero.subtitle"))}
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/services/get-support"
                className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t("hero.ctaSupport")}</span>
              </Link>

              <Link
                href="/hemophilia"
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t("hero.ctaLearn")}</span>
              </Link>

              <Link
                href="/donate"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white/80" />
                <span>{t("hero.ctaDonate")}</span>
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNepali ? "७ वटै प्रदेशमा सक्रिय सञ्जाल" : "Active across all 7 provinces"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNepali ? "बिरामी नेतृत्वको गैर-नाफामूलक संस्था" : "Patient-Led Non-Profit (SWC 1290)"}</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Quick Emergency Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/20 shadow-2xl space-y-5 text-white">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-red-600 rounded-lg emergency-pulse">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">
                      {isNepali ? "आकस्मिक फ्याक्टर सेवा" : "Live Factor & Emergency"}
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      {isNepali ? "केन्द्रीय तथा प्रादेशिक अस्पतालहरू" : "Central & Provincial Referral Centers"}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">
                  ● Active
                </span>
              </div>

              {/* Mini Factor Status Ticker */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Bir Hospital (Central Bank)</span>
                    <span className="text-slate-300 text-[11px]">Factor VIII & IX Stocks</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px]">
                    Available
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Kanti Children's Hospital</span>
                    <span className="text-slate-300 text-[11px]">Pediatric Care & Infusions</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-bold text-[10px]">
                    Available
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Pokhara Regional Hospital</span>
                    <span className="text-slate-300 text-[11px]">Gandaki Province Hub</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">
                    Limited
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href="/factor-availability"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-white text-primary-900 font-bold text-xs text-center hover:bg-slate-100 transition-colors"
                >
                  {isNepali ? "पूर्ण मौज्दात तालिका हेर्नुहोस्" : "Full Inventory Tracker"}
                </Link>
                <button
                  onClick={() => setEmergencyModalOpen(true)}
                  className="py-2.5 px-3 rounded-lg bg-accent text-white font-bold text-xs hover:bg-accent-dark transition-colors"
                >
                  {isNepali ? "आकस्मिक सहयोग" : "Emergency Help"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </EditableContentWrapper>

      {/* NEW: NOTICE BOARD & URGENT TICKER (Controlled by Super Admin CMS) */}
      {features.noticeBoardTicker && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <NoticeBoardSection limit={3} showTitle={true} />
        </section>
      )}

      {/* 2. EMERGENCY SUPPORT BANNER CARD (Controlled by Super Admin CMS) */}
      {features.emergencyAlertBanner && (
        <EditableContentWrapper label="आपतकालीन ब्यानर सम्पादन गर्नुहोस्" adminUrl="/admin?tab=site-content">
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-500 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-red-700/50 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-white text-red-600 rounded-2xl shadow-lg emergency-pulse shrink-0">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                      {isNepali ? "आकस्मिक चिकित्सा सहयोग" : "URGENT MEDICAL HELP"}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      {isNepali ? "आकस्मिक रक्तस्राव वा चोटपटक लागेको छ?" : "Need Urgent Bleeding Emergency Help?"}
                    </h2>
                    <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
                      {isNepali
                        ? "रक्तस्रावको आकस्मिक अवस्थामा तुरुन्त नजिकैको अस्पताल वा आकस्मिक स्वास्थ्य केन्द्रमा सम्पर्क गर्नुहोस्। एन.एच.एस.ले अन-कल फ्याक्टर उपलब्धता तथा समन्वय सहयोग प्रदान गर्दछ।"
                        : "For bleeding emergencies, contact your nearest healthcare facility or emergency medical service immediately. NHS provides 24/7 on-call factor guidance and hospital coordination."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={`tel:${(emergencyContent.hotline1 || "+97714221119").replace(/[^0-9+]/g, "")}`}
                    className="px-5 py-3 rounded-xl bg-white text-red-700 font-extrabold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-red-600" />
                    <span>Call Hotline ({emergencyContent.hotline1 || "01-4221119"})</span>
                  </a>

                  <Link
                    href="/treatment-centres"
                    className="px-5 py-3 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs sm:text-sm border border-red-400/40 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{isNepali ? "उपचार केन्द्र खोज्नुहोस्" : "Find Hospital"}</span>
                  </Link>

                  <button
                    onClick={() => setEmergencyModalOpen(true)}
                    className="px-4 py-3 rounded-xl bg-red-900/60 hover:bg-red-900 text-white font-semibold text-xs sm:text-sm border border-red-400/20 transition-colors"
                  >
                    {isNepali ? "R.I.C.E. विधि हेर्नुहोस्" : "R.I.C.E. Triage"}
                  </button>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t border-red-500/60 text-[11px] text-red-200 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isNepali
                    ? "चिकित्सा अस्वीकरण: यो डिजिटल प्रणाली संस्थागत सहयोगका लागि हो, आकस्मिक अस्पताल उपचारको विकल्प होइन।"
                    : "Disclaimer: This platform provides institutional support and does not replace emergency medical diagnosis or immediate hospital care."}
                </span>
              </div>
            </div>
          </section>
        </EditableContentWrapper>
      )}


      {/* 3. 8 QUICK ACCESS ACTION CARDS (Requirement #12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-900">
            {t("quickAccess")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isNepali
              ? "बिरामी, परिवार, स्वास्थ्यकर्मी तथा सर्वसाधारणका लागि अत्यावश्यक सेवाहरूमा द्रुत पहुँच।"
              : "Direct access to patient services, hospital network, clinical protocols, and membership."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Get Patient Support */}
          <Link
            href="/services/get-support"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-accent transition-colors">
              {isNepali ? "बिरामी सहयोग अनुरोध" : "Get Patient Support"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "आकस्मिक फ्याक्टर, औषधि वा परामर्श सहयोग फारम" : "Request urgent factor or specialized care"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-accent gap-1">
              <span>{isNepali ? "अनुरोध गर्नुहोस्" : "Request Support"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Find Treatment Centre */}
          <Link
            href="/treatment-centres"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors">
              {isNepali ? "उपचार केन्द्र खोज्नुहोस्" : "Find Treatment Centre"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "नेपालका सातै प्रदेशका अस्पताल तथा विशेषज्ञ सूची" : "Directory across all 7 provinces"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-primary gap-1">
              <span>{isNepali ? "केन्द्रहरू हेर्नुहोस्" : "View Directory"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Factor Information */}
          <Link
            href="/factor-availability"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-accent transition-colors">
              {isNepali ? "फ्याक्टर उपलब्धता" : "Factor Information"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "अस्पतालअनुसार फ्याक्टर ८ र ९ को मौज्दात स्थिति" : "Live hospital inventory status"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-accent gap-1">
              <span>{isNepali ? "तालिका हेर्नुहोस्" : "Check Stock"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Medical Resources */}
          <Link
            href="/resources"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors">
              {isNepali ? "चिकित्सा तथा स्रोत सामग्री" : "Medical Resources"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "क्लिनिकल निर्देशिका, ब्रोसर तथा अनुसन्धान प्रतिवेदन" : "Clinical guidelines, posters & papers"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-700 gap-1">
              <span>{isNepali ? "पुस्तकालय खोल्नुहोस्" : "Browse Library"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Emergency Support */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-accent transition-colors">
              {isNepali ? "आकस्मिक हटलाइनहरू" : "Emergency Support"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "२४/७ अस्पताल हटलाइन तथा प्राथमिक उपचार विधि" : "Direct on-call duty hematologists"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-accent gap-1">
              <span>{isNepali ? "सम्पर्क हेर्नुहोस्" : "View Hotlines"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 6: Membership Application */}
          <Link
            href="/membership"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-700 transition-colors">
              {isNepali ? "अनलाइन सदस्यता आवेदन" : "Membership"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "एन.एच.एस. सदस्यता दर्ता तथा डिजिटल परिचयपत्र" : "Apply online & track application status"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-teal-700 gap-1">
              <span>{isNepali ? "आवेदन फारम" : "Apply Online"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 7: Donate */}
          <Link
            href="/donate"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 fill-emerald-600" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
              {isNepali ? "सहयोग / दान गर्नुहोस्" : "Donate to Save Lives"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "eSewa, Khalti, QR तथा बैंकमार्फत सहयोग गर्नुहोस्" : "Support emergency factor & child care"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 gap-1">
              <span>{isNepali ? "दान गर्नुहोस्" : "Donate Now"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 8: Contact NHS */}
          <Link
            href="/contact"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary-400 hover:shadow-xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors">
              {isNepali ? "सम्पर्क तथा शाखाहरू" : "Contact NHS"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isNepali ? "केन्द्रीय सचिवालय तथा ७ वटै प्रदेश कार्यालयहरू" : "Central secretariat & provincial chapters"}
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-primary gap-1">
              <span>{isNepali ? "सम्पर्क विवरण" : "Get In Touch"}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>


      {/* 4. ABOUT NHS INSTITUTIONAL SUMMARY (Requirement #13) */}
      <section className="bg-slate-100 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-900 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isNepali ? "हाम्रो परिचय" : "About Nepal Hemophilia Society"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-900 leading-tight">
                {isNepali
                  ? "नेपालका हरेक रक्तस्राव विकार भएका नागरिकको जीवनरक्षा र अधिकारका लागि समर्पित।"
                  : "Dedicated to the Treatment, Care, and Human Rights of All Persons with Bleeding Disorders in Nepal."}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isNepali
                  ? "नेपाल हेमोफिलिया सोसाइटी (एन.एच.एस.) सन् १९९२ मा स्थापित, समाज कल्याण परिषदमा दर्ता भएको बिरामी-नेतृत्वको राष्ट्रिय गैर-नाफामूलक संस्था हो। यसले नेपालभरिका हेमोफिलिया, भन विलेब्रान्ड तथा अन्य रक्त विकार भएका व्यक्तिहरूको समयमै पहिचान, निःशुल्क फ्याक्टर पहुँच, उपचार, फिजियोथेरापी तथा सामाजिक मर्यादाका लागि काम गर्दै आएको छ।"
                  : "Established in 1992, Nepal Hemophilia Society (NHS) is a registered non-profit, patient-led national organization. NHS advocates for sustainable government procurement of factor concentrates, decentralizes coagulation diagnostics to provincial centers, and provides continuous psychosocial, educational, and rehabilitation support."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <h4 className="font-bold text-xs text-primary uppercase tracking-wide">
                    {isNepali ? "दूरदृष्टि (Vision)" : "Our Vision"}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {isNepali
                      ? "नेपालका सबै हेमोफिलियाका व्यक्तिहरूले मर्यादित, सक्रिय र स्वस्थ जीवन बाँच्न पाउने समाज।"
                      : "A society where every person with a bleeding disorder achieves full health, dignity, and equal opportunity."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <h4 className="font-bold text-xs text-accent uppercase tracking-wide">
                    {isNepali ? "ध्येय (Mission)" : "Our Mission"}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {isNepali
                      ? "निदान, उपचार, जनचेतना र नीतिगत पैरवीमार्फत जीवनस्तर उकास्ने।"
                      : "To provide comprehensive clinical care, empower families, and establish nationwide factor access."}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow transition-colors"
                >
                  <span>{isNepali ? "संस्थाको बारेमा थप पढ्नुहोस्" : "Learn More About NHS Governance"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Pillars / Visual */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isNepali ? "हाम्रो राष्ट्रिय सञ्जाल तथा उपस्थिति" : "National Reach & Governance"}</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">
                      7
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">7 Provincial Chapters</span>
                      <span className="text-slate-600">Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, and Sudurpashchim.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-7 h-7 rounded-full bg-accent-50 text-accent font-bold flex items-center justify-center shrink-0">
                      🏥
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Partner Treatment Centres</span>
                      <span className="text-slate-600">Bir Hospital, TUTH, Kanti Children's, BPKIHS, Pokhara Academy, Bheri Hospital.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
                      🤝
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">WFH International Alignment</span>
                      <span className="text-slate-600">Official National Member Organization (NMO) affiliated with World Federation of Hemophilia.</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                  <span className="font-bold">Official Information Notice: </span>
                  {isNepali
                    ? "सबै तथ्याङ्क तथा कार्यक्रमहरू एन.एच.एस. केन्द्रीय कार्यसमिति र चिकित्सा सल्लाहकार परिषदद्वारा प्रमाणित छन्।"
                    : "All institutional programs and medical policies are validated by the NHS Medical Advisory Council."}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. DYNAMIC STATISTICS (Controlled by Super Admin CMS) */}
      {features.statisticsCounter && (
        <EditableContentWrapper label="राष्ट्रिय तथ्याङ्क सम्पादन गर्नुहोस्" adminUrl="/admin?tab=site-content">
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-medical rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
              
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {isNepali ? "राष्ट्रिय तथ्याङ्क तथा प्रभाव" : "National Data & Collective Impact"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200">
                  {isNepali
                    ? "नेपाल हेमोफिलिया सोसाइटीको प्रमाणीकृत राष्ट्रिय तथ्याङ्क (२०२६ सम्मको अद्यावधिक)।"
                    : "Real-time verified data from the Nepal Hemophilia Registry and Provincial Chapters."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {siteStats?.registeredPatients || stats.totalPatients}+
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.patientsRegistered")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 block">
                    {siteStats?.provincesCovered || 7} / 7
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.provincesActive")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-300 block">
                    {siteStats?.treatmentCentresCount || stats.totalCentres}
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.treatmentCentres")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-white block">
                    {siteStats?.factorDistributedUnits || "184K+"}
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.factorDistributed")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-teal-300 block">
                    {siteStats?.hcpTrainedCount || 320}+
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.hcpTrained")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-red-300 block">
                    {siteStats?.activeMembers || stats.totalMembers}+
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {t("stats.activeMembers")}
                  </span>
                </div>

              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/data-research"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white underline underline-offset-4"
                >
                  <span>{isNepali ? "विस्तृत जनसांख्यिकीय ड्यासबोर्ड हेर्नुहोस्" : "Explore National Registry Dashboard & Provincial Breakdown"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </section>
        </EditableContentWrapper>
      )}


      {/* 6. OUR WORK — 6 CORE PILLARS (Requirement #15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary font-bold text-xs">
            <Activity className="w-3.5 h-3.5" />
            <span>{isNepali ? "हाम्रा मुख्य कार्यहरू" : "Core Strategic Pillars"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-900">
            {isNepali ? "नेपालमा हेमोफिलिया हेरचाहका ६ स्तम्भहरू" : "Our Six Pillars of National Service"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीले बहुपक्षीय दृष्टिकोणबाट बिरामी तथा समुदायको सेवा गर्दै आएको छ।"
              : "Comprehensive programs spanning acute medical care, patient rights, and clinical research."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pillar 1: Treatment & Care */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-primary-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-black text-lg">
              🩺
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "उपचार तथा हेरचाह" : "Treatment & Clinical Care"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "जीवनरक्षक फ्याक्टर प्रतिस्थापन, २४/७ आकस्मिक व्यवस्थापन तथा अस्पतालहरूसँग सहकार्य गरी उपचार पहुँच विस्तार।"
                : "Improving equitable access to clotting factor concentrates, 24/7 emergency infusions, and multidisciplinary hospital care."}
            </p>
          </div>

          {/* Pillar 2: Patient Support */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-accent-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-accent flex items-center justify-center font-black text-lg">
              🩹
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "बिरामी तथा परिवार सेवा" : "Patient & Family Support"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "रक्तस्राव विकार भएका बिरामी, अभिभावक तथा स्याहारकर्ताहरूलाई मनोसामाजिक परामर्श, सहयोग समूह र हातेपुस्तिका।"
                : "Empowering individuals and caregivers with psychological counselling, peer support networks, and home infusion guidance."}
            </p>
          </div>

          {/* Pillar 3: Advocacy */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-teal-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-lg">
              📢
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "नीतिगत पैरवी तथा अधिकार" : "Advocacy & Patient Rights"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "नेपाल सरकारसँग निःशुल्क फ्याक्टर, स्वास्थ्य बीमामा समावेशीकरण तथा अपाङ्गता परिचयपत्र अधिकारका लागि निरन्तर पैरवी।"
                : "Advocating with the Ministry of Health (MoHP) for national factor procurement, UHC inclusion, and disability protection."}
            </p>
          </div>

          {/* Pillar 4: Awareness */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-amber-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-lg">
              💡
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "जनचेतना तथा शिक्षा" : "Awareness & Education"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "विद्यालय, समुदाय र स्वास्थ्यकर्मीहरूमा हेमोफिलियाका लक्षण र प्राथमिक उपचार सम्बन्धी जनचेतनामूलक कार्यक्रमहरू।"
                : "Demystifying bleeding disorders through World Hemophilia Day campaigns, school guides, and community outreach."}
            </p>
          </div>

          {/* Pillar 5: Capacity Building */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-lg">
              🎓
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "क्षमता अभिवृद्धि तथा तालिम" : "Capacity Building & Training"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "चिकित्सक, नर्स तथा फिजियोथेरापिस्टहरूका लागि निरन्तर चिकित्सा शिक्षा (CME) र क्लिनिकल कार्यशालाहरू।"
                : "Conducting accredited CME training workshops for district physicians, ER nurses, and orthopedic physiotherapists."}
            </p>
          </div>

          {/* Pillar 6: Research */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-emerald-300 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg">
              🔬
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {isNepali ? "तथ्याङ्क तथा क्लिनिकल अनुसन्धान" : "Data & Evidence-Based Research"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isNepali
                ? "नेपाल हेमोफिलिया राष्ट्रिय रजिस्ट्री सञ्चालन र उपचार सुधारका लागि प्रमाणमा आधारित वैज्ञानिक अनुसन्धान।"
                : "Maintaining the secure Nepal Hemophilia Registry to generate demographic evidence and support clinical research."}
            </p>
          </div>

        </div>
      </section>


      {/* 7. PATIENT & COMMUNITY STORIES (Controlled by Super Admin CMS) */}
      {features.communityStoriesSection && (
        <section className="bg-slate-100 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-accent" />
                <span>{isNepali ? "बिरामीका अनुभवहरू" : "Lived Experiences"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-900">
                {isNepali ? "मर्यादापूर्ण जीवन र प्रेरणादायी कथाहरू" : "Voices of Hope, Resilience & Dignity"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {isNepali
                  ? "रक्तस्राव विकारसँग जुध्दै समाजमा उदाहरणीय काम गरिरहेका बिरामी तथा अभिभावकहरूको यथार्थ अनुभव।"
                  : "Inspiring journeys of individuals thriving with bleeding disorders across Nepal (Published with verified consent)."}
              </p>
            </div>

            <Link
              href="/news?category=Patient+Stories"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors"
            >
              <span>{isNepali ? "सबै कथाहरू पढ्नुहोस्" : "Read All Patient Stories"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles
              .filter((n) => n.category === "Patient Stories" || n.isStoryConsentVerified)
              .concat(newsArticles.slice(0, 2))
              .slice(0, 3)
              .map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <img
                      src={story.featuredImage}
                      alt={l(story.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-primary-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{isNepali ? "प्रमाणित सहमति" : "Consent Verified"}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400 font-medium">
                        {story.publishedDate} • {story.readTime}
                      </div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {l(story.title)}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {l(story.summary)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {l(story.author)}
                      </span>
                      <Link
                        href={`/news/${story.slug}`}
                        className="text-xs font-bold text-primary group-hover:text-primary-dark flex items-center gap-1"
                      >
                        <span>{isNepali ? "पुरा पढ्नुहोस्" : "Read Story"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>
      )}


      {/* 8. LATEST NEWS & EVENTS SECTION (Requirements #17 & #18) */}
      <EditableContentWrapper label="समाचार तथा कार्यक्रमहरू सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=news">
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Latest News (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary-900">
                  {isNepali ? "ताजा समाचार तथा सूचनाहरू" : "Latest News & Bulletins"}
                </h2>
              </div>
              <Link href="/news" className="text-xs font-bold text-primary hover:underline">
                {isNepali ? "सबै हेर्नुहोस्" : "View All"}
              </Link>
            </div>

            <div className="space-y-4">
              {featuredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 group"
                >
                  <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={article.featuredImage}
                      alt={l(article.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-semibold">
                        {article.category}
                      </span>
                      <span>{article.publishedDate}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      {l(article.title)}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {l(article.summary)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events & Calendar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary-900">
                  {isNepali ? "आगामी कार्यक्रमहरू" : "Upcoming Events"}
                </h2>
              </div>
              <Link href="/events" className="text-xs font-bold text-accent hover:underline">
                {isNepali ? "क्यालेन्डर" : "Calendar"}
              </Link>
            </div>

            <div className="space-y-4">
              {featuredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-accent font-bold text-[10px] uppercase">
                      {evt.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      📅 {evt.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {l(evt.title)}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {l(evt.description)}
                  </p>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{l(evt.location)}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      👥 {evt.attendeesCount} {isNepali ? "दर्ता भएका" : "Registered"}
                    </span>
                    <Link
                      href={`/events#${evt.id}`}
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-colors"
                    >
                      {isNepali ? "दर्ता गर्नुहोस्" : "RSVP / Register"}
                    </Link>
                  </div>
                </div>
              ))}

              {/* World Hemophilia Day Banner */}
              <div className="p-5 rounded-2xl bg-gradient-crimson text-white shadow-lg space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-red-200">
                  {isNepali ? "वार्षिक राष्ट्रिय अभियान" : "Annual Global Campaign"}
                </div>
                <h4 className="font-extrabold text-base">
                  World Hemophilia Day — April 17
                </h4>
                <p className="text-xs text-red-100">
                  {isNepali
                    ? "नेपालका सातै प्रदेशमा प्रभातफेरी, निःशुल्क स्वास्थ्य शिविर तथा रक्तदान कार्यक्रम।"
                    : "Join nationwide awareness walks, screening camps, and lighting iconic monuments red."}
                </p>
                <div className="pt-1">
                  <Link
                    href="/events"
                    className="inline-block px-3 py-1.5 rounded bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition-colors"
                  >
                    {isNepali ? "सहभागी हुनुहोस्" : "Join Campaign"}
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </EditableContentWrapper>


      {/* 9. DONATION CALL TO ACTION (Controlled by Super Admin CMS) */}
      {features.onlineDonations && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-medical rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-200 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-red-400" />
              <span>{isNepali ? "मानवीय जीवनरक्षा कोष" : "Life-Saving Hemophilia Care Fund"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              {isNepali
                ? "तपाईंको सानो सहयोगले रक्तस्राव भएका बिरामीको ज्यान र जोर्नी जोगाउन सक्छ।"
                : "Your Generosity Provides Emergency Clotting Factor & Prevents Permanent Disability."}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              {isNepali
                ? "नेपालमा हजारौं बालबालिका तथा युवाहरू जीवनरक्षक फ्याक्टरको अभावमा छटपटाइरहेका छन्। eSewa, Khalti, QR कोड वा बैंक ट्रान्सफरमार्फत सोझै सहयोग गरी कर-छुट योग्य आधिकारिक रसिद प्राप्त गर्नुहोस्।"
                : "Contributions support emergency factor replenishment, child home care kits, and orthopedic rehabilitation. Official institutional tax-deductible receipt generated immediately."}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>eSewa & Khalti Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Digital Tax Receipt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Direct Patient Care</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-4">
            <h3 className="font-bold text-base text-white">
              {isNepali ? "सहयोग रकम छनोट गर्नुहोस्" : "Select Contribution Amount"}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/donate?amount=500"
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary-900 border border-white/20 transition-all"
              >
                NPR 500
              </Link>
              <Link
                href="/donate?amount=1500"
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary-900 border border-white/20 transition-all"
              >
                NPR 1,500
              </Link>
              <Link
                href="/donate?amount=5000"
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary-900 border border-white/20 transition-all"
              >
                NPR 5,000
              </Link>
              <Link
                href="/donate?amount=15000"
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary-900 border border-white/20 transition-all"
              >
                NPR 15,000
              </Link>
            </div>

            <Link
              href="/donate"
              className="block w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-extrabold text-sm shadow-xl transition-all"
            >
              {isNepali ? "अनलाइन सहयोग गर्नुहोस् (eSewa / Khalti / QR)" : "Proceed to Secure Donation"}
            </Link>

            <span className="text-[11px] text-slate-300 block">
              Social Welfare Council Approved • Transparent Annual Audits
            </span>
          </div>

        </div>
      </section>
      )}

      {/* Global Emergency Modal Trigger */}
      <EmergencyModal isOpen={emergencyModalOpen} onClose={() => setEmergencyModalOpen(false)} />

    </div>
  );
}
