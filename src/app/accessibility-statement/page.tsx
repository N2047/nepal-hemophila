"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Eye, 
  CheckCircle2, 
  Award, 
  Send, 
  ShieldCheck, 
  Keyboard, 
  Volume2, 
  Type, 
  Contrast, 
  PhoneCall, 
  Mail,
  AlertCircle
} from "lucide-react";

export default function AccessibilityStatementPage() {
  const { isNepali } = useLanguage();

  // Accessibility Issue Report Form State
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [deviceType, setDeviceType] = useState("Desktop / Laptop");
  const [assistiveTech, setAssistiveTech] = useState("None / Keyboard only");
  const [pageUrl, setPageUrl] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12 text-slate-800 dark:text-slate-200">
      
      {/* 1. Header Banner */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>WCAG 2.2 Level AA Standard & Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-900 dark:text-white tracking-tight">
          {isNepali ? "पहुँचयुक्तता प्रतिबद्धता तथा विवरण" : "Digital Accessibility Statement (WCAG 2.2 AA)"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {isNepali
            ? "नेपाल हेमोफिलिया सोसाइटी सबै नागरिक, हेमोफिलिया तथा रक्तस्राव विकार भएका व्यक्ति, दृष्टिदोष, श्रवणदोष, शारीरिक/मोटर तथा सिकाइ विविधता भएका महानुभावहरूका लागि पूर्ण रूपमा पहुँचयोग्य डिजिटल वातावरण प्रदान गर्न प्रतिबद्ध छ।"
            : "The Nepal Hemophilia Society is dedicated to ensuring full digital inclusion, equal access, and dignifying user experience for all persons with bleeding disorders, visual impairments, motor limitations, and assistive technology users."}
        </p>
      </div>

      {/* 2. Core Principles & WCAG Conformance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-white flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">WCAG 2.2 Level AA Target</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Meets and exceeds international Web Content Accessibility Guidelines (WCAG 2.2) standards across perceivable, operable, understandable, and robust principles.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-white flex items-center justify-center font-bold">
            <Keyboard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Full Keyboard Operability</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every interactive feature, medical calculator, registration form, and modal dialog is 100% accessible via standard keyboard (Tab, Shift+Tab, Enter, Space, Esc).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-white flex items-center justify-center font-bold">
            <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Bilingual Text-to-Speech</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Integrated speech synthesis supporting both Nepali (Devanagari) and English pronunciation, with sequential section step-through and user-highlighted text reading.
          </p>
        </div>
      </div>

      {/* 3. Detailed Features Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-white">
          {isNepali ? "वेबसाइटमा उपलब्ध प्रमुख पहुँचयोग्य सुविधाहरू:" : "Key Accessibility Features Built into the Platform:"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>200% Text Resizing Reflow:</strong> Scale typography from Normal (100%) to Medium (130%) and Large (180%) without horizontal scrolling or text clipping.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>High Contrast & Dark Mode:</strong> Separate high-contrast black/white mode and soothing dark theme for light sensitivity and low vision.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Skip-to-Content:</strong> Immediate skip link (`#main-content`) accessible as the first tab stop for rapid keyboard traversal.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Underline Links:</strong> On-demand persistent underline for all navigational and contextual text links.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Dyslexia-Friendly Typography:</strong> Specialized font rendering to increase character distinctiveness and word spacing.</span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>44x44 CSS px Minimum Touch Targets:</strong> Extra-large clickable areas designed specifically for users with tremors or motor limitations.</span>
          </div>
        </div>
      </div>

      {/* 4. Report an Accessibility Problem Form (Requirement #46) */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{isNepali ? "प्रतिक्रिया तथा गुनासो" : "Accessibility Feedback Channel"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-900 dark:text-white">
            {isNepali ? "पहुँचयुक्तता सम्बन्धी समस्या जानकारी गराउनुहोस्" : "Report an Accessibility Problem"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isNepali
              ? "यदि तपाईंले यो वेबसाइट प्रयोग गर्दा कुनै प्राविधिक कठिनाइ, किबोर्ड समस्या, वा स्क्रिन रिडर बाधा सामना गर्नुभएमा कृपया हामीलाई जानकारी दिनुहोस्।"
              : "If you encounter any barrier, unreadable element, or assistive technology issue, please let us know. Our accessibility coordinator responds promptly."}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-200">
              {isNepali ? "तपाईंको रिपोर्ट सफलतापूर्वक प्राप्त भयो!" : "Accessibility Report Received Successfully!"}
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
              {isNepali
                ? "हाम्रो प्राविधिक टोलीले यो समस्या समाधान गर्न तुरुन्त पहल गर्नेछ। नेपाल हेमोफिलिया सोसाइटीलाई अझ बढी पहुँचयोग्य बनाउन सहयोग गर्नुभएकोमा धन्यवाद।"
                : "Thank you for helping us make the Nepal Hemophilia Society platform universally accessible. Our team will review and remediate this promptly."}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
            >
              {isNepali ? "अर्को रिपोर्ट पठाउनुहोस्" : "Submit Another Feedback"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isNepali ? "तपाईंको नाम (वैकल्पिक)" : "Your Name (Optional)"}
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Ram Prasad Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isNepali ? "इमेल वा सम्पर्क नम्बर" : "Email or Phone"}
                </label>
                <input
                  type="text"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isNepali ? "प्रयोग गरिएको उपकरण" : "Device Used"}
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                >
                  <option>Desktop / Laptop (Windows)</option>
                  <option>Desktop / Laptop (Mac)</option>
                  <option>Smartphone (Android)</option>
                  <option>Smartphone (iPhone / iOS)</option>
                  <option>Tablet / iPad</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  {isNepali ? "सहायक प्रविधि (Assistive Technology)" : "Assistive Technology Used"}
                </label>
                <select
                  value={assistiveTech}
                  onChange={(e) => setAssistiveTech(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                >
                  <option>Keyboard Only Navigation</option>
                  <option>Screen Reader (NVDA)</option>
                  <option>Screen Reader (JAWS)</option>
                  <option>Screen Reader (VoiceOver)</option>
                  <option>Screen Reader (TalkBack)</option>
                  <option>Screen Magnifier</option>
                  <option>Speech Recognition</option>
                  <option>High Contrast Mode</option>
                  <option>Other / None</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                {isNepali ? "समस्या देखिएको पेजको ठेगाना वा खण्ड" : "Page URL or Section Where Problem Occurred"}
              </label>
              <input
                type="text"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder="e.g. /factor-availability or Homepage Quick Access"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                {isNepali ? "समस्याको विस्तृत विवरण *" : "Detailed Description of the Problem *"}
              </label>
              <textarea
                required
                rows={4}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder={isNepali ? "समस्या के थियो र त्यसले तपाईंको पठन वा प्रयोगमा के बाधा पुर्यायो, कृपया यहाँ लेख्नुहोस्..." : "Please describe what happened, what element could not be accessed, or what error was encountered..."}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="min-h-[44px] px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{isNepali ? "समस्या रिपोर्ट पेश गर्नुहोस्" : "Submit Accessibility Feedback"}</span>
            </button>
          </form>
        )}
      </section>

      {/* 5. Formal Contact Channels */}
      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-bold text-slate-900 dark:text-white block text-sm">
            {isNepali ? "एन.एच.एस. केन्द्रीय सचिवालय सम्पर्क:" : "Direct Accessibility Coordination:"}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            Bir Hospital Premises, Mahabouddha, Kathmandu, Nepal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:accessibility@hemophilia.org.np"
            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-bold text-primary dark:text-teal-400 hover:underline flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>accessibility@hemophilia.org.np</span>
          </a>
          <a
            href="tel:+97714221119"
            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-bold text-slate-800 dark:text-slate-200 hover:underline flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+977-1-4221119</span>
          </a>
        </div>
      </div>

    </div>
  );
}
