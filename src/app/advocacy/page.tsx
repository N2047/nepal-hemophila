"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Megaphone, 
  Scale, 
  ShieldCheck, 
  HeartHandshake, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Award
} from "lucide-react";
import Link from "next/link";

export default function AdvocacyPage() {
  const { isNepali, t } = useLanguage();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Megaphone className="w-3.5 h-3.5" />
            <span>{isNepali ? "पैरवी तथा अधिकार" : "National Patient Advocacy & Human Rights"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "उपचारको अधिकार, निःशुल्क फ्याक्टर र सामाजिक न्याय" : "The Right to Treatment, Free Clotting Factor & Equal Opportunity"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपालको संविधान, अपाङ्गता अधिकार ऐन तथा सर्वव्यापी स्वास्थ्य पहुँच (UHC) का आधारमा हेमोफिलियाका बिरामीहरूको जीवनरक्षाका लागि एन.एच.एस.को निरन्तर पैरवी।"
              : "Advocating with the Government of Nepal, Parliament, and Provincial Ministries for sustainable clotting factor budgets, decentralized diagnostics, and disability protection."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Core Pillars of NHS Advocacy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-accent flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Right to Life & Health (Constitution)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Article 35 of the Constitution of Nepal establishes health as a fundamental right. We demand that life-saving clotting factors be treated as essential emergency medicines.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">National Health Insurance & UHC</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Advocating for the inclusion of Factor VIII, Factor IX, and bypassing agents within the Social Health Insurance Scheme without prohibitive annual caps.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Disability Rights Act Compliance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ensuring all municipalities across Nepal recognize severe hemophilia under the Rights of Persons with Disabilities Act 2074 (2017) without bureaucratic hurdles.
            </p>
          </div>
        </div>

        {/* 2024-2030 National Policy Demands */}
        <section className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "सरकारसमक्ष एन.एच.एस.का प्रमुख ५ नीतिगत मागहरू" : "NHS Five-Point National Policy Agenda"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Submitted to the Ministry of Health and Population (MoHP) and Parliamentary Health Committee:
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-slate-900 block">Dedicated Annual Factor Procurement Budget:</strong>
                Permanent federal budget allocation to procure minimum 5 million IU of clotting factor annually, transitioning from donation dependency to national sustainability.
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-slate-900 block">Decentralized Coagulation Labs in 7 Provinces:</strong>
                Equipping all provincial hospitals with automated clotting assays so rural patients do not travel hundreds of kilometers to Kathmandu for basic diagnosis.
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-slate-900 block">Pediatric Prophylaxis Protocol Implementation:</strong>
                Initiating low-dose regular prophylaxis for children aged 1–10 to stop debilitating joint bleeds before irreversible arthropathy occurs.
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <strong className="text-slate-900 block">Multidisciplinary Comprehensive Care Centres (CCC):</strong>
                Establishing dedicated hematology-orthopedic-physiotherapy daycare units in Bir Hospital, TUTH, Kanti, BPKIHS, and Pokhara Academy.
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center shrink-0">5</span>
              <div>
                <strong className="text-slate-900 block">Inclusive School & Employment Accommodation:</strong>
                National guidelines for schools and public employers prohibiting discrimination against individuals with inherited bleeding disorders.
              </div>
            </div>
          </div>
        </section>

        {/* Action Call */}
        <div className="text-center pt-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow"
          >
            <span>Download NHS Policy Submissions & Evidence Briefs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
