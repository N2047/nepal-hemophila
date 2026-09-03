import React from "react";
import { Metadata } from "next";
import { ChatBoard } from "@/components/chat/ChatBoard";
import {
  Server,
  Code,
  Sparkles,
  PhoneCall,
  ShieldAlert,
  MapPin,
  FileText,
  Activity,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Chat Board & n8n Assistant",
  description:
    "Official Nepal Hemophilia Society 24/7 AI Chat Board connected to n8n Webhook backend for clinical assistance, factor stocks, and patient care.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>२४/७ डिजिटल सहायता केन्द्र • 24/7 NHS Helpdesk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            NHS AI Chat Board & n8n Backend
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl">
            नेपाल हेमोफिलिया सोसाइटीको आधिकारिक AI च्याट बोर्ड। यो च्याट बोर्डले <strong>n8n Webhook</strong> मार्फत तपाईंको आफ्नै AI Agent / Workflow सँग सिधै सम्पर्क गर्न सक्छ र आपतकालीन रक्तस्राव सल्लाह, फ्याक्टर उपलब्धता र अस्पतालहरूको विवरण प्रदान गर्दछ।
          </p>
        </div>

        {/* Main Grid: Info/Guide Sidebar (Left) & Chat Board (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: FAQs & n8n Developer Guide */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Emergency Hotline Card */}
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-900 dark:text-red-200">
                    आपतकालीन हटलाइनहरू (Emergency)
                  </h3>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    तत्काल रक्तस्राव वा फ्याक्टर आवश्यकता भएमा:
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href="tel:014221119"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-red-200 dark:border-red-800 text-slate-800 dark:text-white font-semibold hover:border-red-500 transition-colors"
                >
                  <span>वीर अस्पताल हेमोफिलिया वार्ड</span>
                  <span className="text-red-600 font-bold flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" /> ०१-४२२१११९
                  </span>
                </a>
                <a
                  href="tel:9851000000"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-red-200 dark:border-red-800 text-slate-800 dark:text-white font-semibold hover:border-red-500 transition-colors"
                >
                  <span>NHS राष्ट्रिय हटलाइन</span>
                  <span className="text-red-600 font-bold flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" /> ९८५१००००००
                  </span>
                </a>
              </div>
            </div>

            {/* n8n Webhook Backend Guide */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    n8n Webhook जोड्ने तरिका (Setup Guide)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    How to connect your n8n workflow
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    १
                  </span>
                  <p>
                    आफ्नो <strong>n8n</strong> इन्स्ट्यान्स खोल्नुहोस् र नयाँ Workflow सिर्जना गर्नुहोस्। त्यसमा <code>Webhook</code> Node राख्नुहोस्।
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    २
                  </span>
                  <p>
                    Webhook को <strong>HTTP Method</strong> लाई <code>POST</code> र <strong>Response Mode</strong> लाई <code>Using 'Respond to Webhook' Node</code> मा सेट गर्नुहोस्।
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    ३
                  </span>
                  <p>
                    यसपछि <strong>AI Agent</strong> / <strong>OpenAI</strong> वा <strong>LLM Chain</strong> node जोड्नुहोस् र अन्त्यमा <code>Respond to Webhook</code> बाट <code>{`{ "output": "तपाईंको जवाफ..." }`}</code> फर्काउनुहोस्।
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    ४
                  </span>
                  <p>
                    च्याट बोर्डको माथिल्लो दायाँ कुनामा रहेको <strong>Settings ⚙️</strong> मा गएर आफ्नो Webhook URL पेस्ट गर्नुहोस् र <strong>Test</strong> गर्नुहोस्!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                सम्बन्धित सेवाहरू • Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/factor-availability"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-primary hover:shadow-sm transition-all border border-slate-200 dark:border-slate-700"
                >
                  <Activity className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-semibold truncate">फ्याक्टर ट्र्याकर</span>
                </Link>
                <Link
                  href="/treatment-centres"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-primary hover:shadow-sm transition-all border border-slate-200 dark:border-slate-700"
                >
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-semibold truncate">उपचार केन्द्रहरू</span>
                </Link>
                <Link
                  href="/membership"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-primary hover:shadow-sm transition-all border border-slate-200 dark:border-slate-700"
                >
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold truncate">बिरामी दर्ता</span>
                </Link>
                <Link
                  href="/emergency"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-red-600 hover:shadow-sm transition-all border border-slate-200 dark:border-slate-700"
                >
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold truncate">आपतकालीन गाइड</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Main Chat Board */}
          <div className="lg:col-span-7">
            <ChatBoard isFloating={false} className="min-h-[620px] max-h-[750px]" />
          </div>

        </div>
      </div>
    </div>
  );
}
