"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useData } from "@/context/DataContext";
import { EditableContentWrapper } from "@/components/common/EditableContentWrapper";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Send, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";

export function Footer() {
  const { lang, t, isNepali } = useLanguage();
  const { orgDetails, features } = useSiteContent();
  const { globalSettings } = useData();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
  };

  return (
    <footer className="bg-primary-950 text-slate-300 pt-16 pb-20 lg:pb-12 border-t-4 border-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Newsletter & Emergency Banner in Footer */}
        <div className="bg-primary-900/90 rounded-2xl p-6 sm:p-8 mb-12 border border-primary-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {isNepali ? "एन.एच.एस. त्रैमासिक समाचारपत्र सदस्यता" : "Subscribe to NHS National Hemophilia Bulletins"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {isNepali
                ? "नयाँ उपचार विधि, फ्याक्टर उपलब्धता सूचना, शिविर तथा राष्ट्रिय नीति अपडेटहरू इमेलमा प्राप्त गर्नुहोस्।"
                : "Receive evidence-based clinical updates, provincial treatment camp schedules, and factor policy reports."}
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 sm:w-80">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isNepali ? "तपाईंको इमेल ठेगाना" : "Enter your email address"}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-primary-950 text-white placeholder:text-slate-400 border border-primary-700 text-xs sm:text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-lg bg-accent hover:bg-accent-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md shrink-0"
            >
              <span>{isNepali ? "सदस्यता लिनुहोस्" : "Subscribe"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {newsletterSubmitted && (
          <div className="mb-8 p-3 rounded-lg bg-emerald-900/80 border border-emerald-600 text-white text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isNepali ? "धन्यवाद! तपाईंको इमेल सफलतापूर्वक दर्ता भएको छ।" : "Thank you! You are now subscribed to NHS bulletins."}</span>
          </div>
        )}

        {/* 5-Column Institutional Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-primary-800/80">
          
          {/* Column 1: Organization Overview */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shadow-sm shrink-0 border border-slate-700">
                <img
                  src="/nhs-logo.jpg"
                  alt="Nepal Hemophilia Society"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-white text-base leading-tight">
                {isNepali ? "नेपाल हेमोफिलिया सोसाइटी" : "Nepal Hemophilia Society"}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-amber-400 block mb-1">
                Social Welfare Council (SWC) Reg. No. {globalSettings?.swcAffiliationNo || "1290"}
              </span>
              <span className="text-[11px] text-slate-400 block">
                PAN: {globalSettings?.panNumber || "300123456"} | National Patient Organization
              </span>
            </div>
          </div>

          {/* Column 2: About NHS */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              {t("nav.about")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">{t("nav.aboutSub.overview")}</Link></li>
              <li><Link href="/about#vision" className="hover:text-white transition-colors">{t("nav.aboutSub.visionMission")}</Link></li>
              <li><Link href="/about#leadership" className="hover:text-white transition-colors">{t("nav.aboutSub.board")}</Link></li>
              <li><Link href="/about#advisors" className="hover:text-white transition-colors">{t("nav.aboutSub.advisors")}</Link></li>
              <li><Link href="/about#provinces" className="hover:text-white transition-colors">{t("nav.aboutSub.provinces")}</Link></li>
              <li><Link href="/transparency" className="hover:text-white text-emerald-400 font-medium transition-colors">{t("nav.aboutSub.annualReports")}</Link></li>
              <li><Link href="/transparency#policies" className="hover:text-white transition-colors">{t("nav.aboutSub.policies")}</Link></li>
            </ul>
          </div>

          {/* Column 3: Clinical & Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              {isNepali ? "ज्ञान तथा स्रोतहरू" : "Clinical & Resources"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/hemophilia" className="hover:text-white transition-colors">{t("nav.hemoSub.whatIs")}</Link></li>
              <li><Link href="/emergency" className="hover:text-red-400 text-red-300 font-medium transition-colors">🚨 {t("nav.hemoSub.emergencyCare")}</Link></li>
              <li><Link href="/treatment-centres" className="hover:text-white transition-colors">📍 {t("findCentre")}</Link></li>
              <li><Link href="/factor-availability" className="hover:text-white transition-colors">🩸 {t("factorAvailability")}</Link></li>
              <li><Link href="/healthcare-professionals" className="hover:text-white transition-colors">{t("nav.healthcarePros")}</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">{t("nav.resources")}</Link></li>
              <li><Link href="/elearning" className="hover:text-white text-amber-300 font-medium transition-colors">🎓 {t("nav.elearning")}</Link></li>
            </ul>
          </div>

          {/* Column 4: Get Involved & Advocacy */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              {t("nav.getInvolved")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/membership" className="hover:text-white transition-colors">{t("membership")} (Online Application)</Link></li>
              <li><Link href="/donate" className="hover:text-white font-bold text-red-400 transition-colors">❤️ {t("donateNow")} (eSewa / Khalti / Bank)</Link></li>
              <li><Link href="/advocacy" className="hover:text-white transition-colors">{t("nav.advocacy")}</Link></li>
              <li><Link href="/data-research" className="hover:text-white transition-colors">{t("nav.registry")}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t("nav.news")}</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">{t("nav.events")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Column 5: Central Secretariat & Contact */}
          <div className="space-y-3">
            <EditableContentWrapper label="सम्पर्क सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=settings">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2">
                  {isNepali ? "केन्द्रीय कार्यालय" : "Head Office & Contact"}
                </h4>
                <div className="space-y-2.5 text-xs text-slate-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{isNepali ? (globalSettings?.addressNp || orgDetails?.addressNp || "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)") : (globalSettings?.addressEn || orgDetails?.addressEn || "Kathmandu, Nepal (Central Secretariat)")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                    <a href={`tel:${(globalSettings?.contactPhone || orgDetails?.phone || "+97714221119").replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors">{globalSettings?.contactPhone || orgDetails?.phone || "+977-1-4221119"}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href={`mailto:${globalSettings?.contactEmail || orgDetails?.email || "info@hemophilia-nepal.org.np"}`} className="hover:text-white transition-colors">{globalSettings?.contactEmail || orgDetails?.email || "info@hemophilia-nepal.org.np"}</a>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wide mb-1">
                    24/7 Emergency Line:
                  </div>
                  <a 
                    href={`tel:${(globalSettings?.emergencyHotline || orgDetails?.emergencyPhone || "+9779851000000").replace(/[^0-9+]/g, "")}`} 
                    className="inline-block px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-200 font-mono text-xs font-bold hover:bg-red-900 transition-colors"
                  >
                    📞 {globalSettings?.emergencyHotline || orgDetails?.emergencyPhone || "+977-9851000000"}
                  </a>
                </div>
              </div>
            </EditableContentWrapper>
          </div>

        </div>

        {/* Medical Safety Disclaimer */}
        <div className="py-6 border-b border-primary-900 text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
          <p className="font-medium text-slate-300 mb-1">
            ⚠️ {isNepali ? "चिकित्सा अस्वीकरण" : "Medical & Institutional Disclaimer"}:
          </p>
          <p>
            {t("footer.disclaimer")}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {isNepali ? "नेपाल हेमोफिलिया सोसाइटी।" : "Nepal Hemophilia Society."} {isNepali ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/accessibility-statement" className="hover:text-white transition-colors font-bold text-amber-300">
              ♿ {isNepali ? "पहुँचयुक्तता (Accessibility)" : "WCAG 2.2 Accessibility"}
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
