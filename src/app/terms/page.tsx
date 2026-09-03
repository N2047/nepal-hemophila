"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Scale, AlertTriangle, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  const { isNepali } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold">
          <Scale className="w-3.5 h-3.5" />
          <span>Terms & Medical Disclaimer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-primary-900">
          {isNepali ? "प्रयोगका सर्तहरू तथा चिकित्सा अस्वीकरण" : "Terms of Use & Medical Disclaimer"}
        </h1>
        <p className="text-xs text-slate-500">Official Institutional Operating Terms</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
        <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl text-red-900">
          <strong className="block font-bold">CRITICAL MEDICAL DISCLAIMER:</strong>
          The medical knowledge, clinical guidelines, and factor dosing formulas available on this platform are for educational and institutional coordination purposes only. They do NOT constitute personalized medical diagnosis, prescription, or individual emergency care. Always consult a licensed hematologist or physician during bleeding episodes.
        </div>

        <h3 className="font-bold text-base text-slate-900">1. Institutional Purpose</h3>
        <p>
          This website is the official digital platform of Nepal Hemophilia Society (NHS), a non-profit registered under SWC (Affiliation No. 1290). Content may be shared for non-commercial educational purposes with appropriate institutional citation.
        </p>

        <h3 className="font-bold text-base text-slate-900">2. Factor Availability Information</h3>
        <p>
          Hospital clotting factor stock levels are updated periodically based on hospital reports. Because emergency admissions can deplete stocks unexpectedly, users are advised to confirm directly with healthcare facilities before traveling.
        </p>
      </div>
    </div>
  );
}
