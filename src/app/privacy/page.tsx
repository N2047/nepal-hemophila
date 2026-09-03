"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  const { isNepali } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Health Data Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-primary-900">
          {isNepali ? "गोपनीयता नीति तथा स्वास्थ्य डेटा सुरक्षा" : "Privacy Policy & Patient Data Safeguards"}
        </h1>
        <p className="text-xs text-slate-500">Last updated: August 2026 • Approved by Central Executive Committee</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
        <h3 className="font-bold text-base text-slate-900">1. Commitment to Health Data Confidentiality</h3>
        <p>
          Nepal Hemophilia Society (NHS) considers the privacy of people living with bleeding disorders of paramount importance. In compliance with the Privacy Act 2075 (2018) of Nepal and international HIPAA/GDPR health data principles, no personally identifiable information (PII), diagnostic factor levels, or medical consultations are ever made publicly accessible without explicit, verified written consent.
        </p>

        <h3 className="font-bold text-base text-slate-900">2. Collection of Information</h3>
        <p>
          We collect personal details (Name, Contact, Address, Bleeding Disorder Diagnosis) solely for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Emergency hospital clotting factor reservation and triage during acute trauma bleeds.</li>
          <li>Membership identity verification and issuing official NHS patient cards.</li>
          <li>Generating anonymized, aggregated national epidemiological statistics for government advocacy.</li>
        </ul>

        <h3 className="font-bold text-base text-slate-900">3. Anonymized Public Data</h3>
        <p>
          All statistical charts, demographic surveys, and research findings displayed on this public platform represent aggregated cohort data. Individual patient identities are fully shielded with secure hashed codes.
        </p>

        <h3 className="font-bold text-base text-slate-900">4. Contact Our Data Protection Officer</h3>
        <p>
          For queries or to request deletion of your membership records, contact: <a href="mailto:privacy@hemophilia.org.np" className="text-primary font-semibold">privacy@hemophilia.org.np</a>.
        </p>
      </div>
    </div>
  );
}
