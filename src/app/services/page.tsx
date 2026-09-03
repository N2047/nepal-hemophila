"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ShieldAlert, 
  Users, 
  MapPin, 
  Activity, 
  PhoneCall, 
  HeartHandshake, 
  Stethoscope, 
  FileText, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const { isNepali, t } = useLanguage();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isNepali ? "बिरामी तथा परिवार सेवाहरू" : "Comprehensive Patient & Family Services"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "बिरामी र परिवारका लागि सेवा तथा सहयोग कार्यक्रमहरू" : "NHS Patient Care Services & Support Network"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीले रक्तस्राव विकार भएका व्यक्ति तथा उनीहरूका परिवारलाई आकस्मिक फ्याक्टर आपूर्ति, उपचार केन्द्र समन्वय, फिजियोथेरापी, मनोसामाजिक परामर्श तथा अधिकार पैरवी प्रदान गर्दछ।"
              : "Explore our full suite of patient services, including acute bleeding emergency triage, hospital coordination, physiotherapy joint rehabilitation, peer support groups, and membership identity cards."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Service 1: Urgent Help */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-accent flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Emergency Factor & Triage Request</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Submit an urgent support ticket for acute joint or trauma bleeds. On-call duty medical officers coordinate emergency factor reservation at nearest hospital day care.
              </p>
            </div>
            <Link href="/services/get-support" className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline pt-2">
              Request Emergency Help →
            </Link>
          </div>

          {/* Service 2: Treatment Centre Finder */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Hospital & Treatment Centre Network</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Directory of national referral and provincial hospitals across all 7 provinces equipped with factor storage, coagulation labs, and hematology specialists.
              </p>
            </div>
            <Link href="/treatment-centres" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2">
              Find Nearest Centre →
            </Link>
          </div>

          {/* Service 3: Factor Availability Monitor */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Live Factor Availability Tracker</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Real-time stock indicators for Factor VIII, Factor IX, and bypassing agents across hospitals with verified pre-travel advisories and resupply updates.
              </p>
            </div>
            <Link href="/factor-availability" className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline pt-2">
              Check Factor Stock →
            </Link>
          </div>

          {/* Service 4: Online Membership & ID */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Membership & Patient Digital ID</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Apply online for society membership and obtain an official NHS Patient Identity Card detailing diagnosis, severity, blood group, and emergency contacts.
              </p>
            </div>
            <Link href="/membership" className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline pt-2">
              Apply or Track Application →
            </Link>
          </div>

          {/* Service 5: Physiotherapy & Joint Care */}
          <div id="physio-counselling" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Physiotherapy & Rehabilitation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Specialized musculoskeletal assessments, custom exercise regimens, cold-pack supplies, and splints to prevent and rehabilitate hemophilic arthropathy.
              </p>
            </div>
            <Link href="/services/get-support" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline pt-2">
              Book Rehabilitation Support →
            </Link>
          </div>

          {/* Service 6: Disability Card Support */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Government Disability Card Advocacy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                NHS provides clinical diagnosis verification and official recommendation letters to assist patients in obtaining municipal disability identification cards.
              </p>
            </div>
            <Link href="/services/get-support" className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline pt-2">
              Request Recommendation Letter →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
