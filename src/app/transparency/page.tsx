"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Building2, 
  CheckCircle2, 
  Scale,
  Award,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function TransparencyPage() {
  const { isNepali, t } = useLanguage();

  const auditReports = [
    { year: "Fiscal Year 2081/82 (2024/25)", auditor: "R. Sharma & Associates, Chartered Accountants", status: "Unqualified (Clean Opinion)", file: "NHS_Audited_Report_2081_82.pdf", size: "2.4 MB" },
    { year: "Fiscal Year 2080/81 (2023/24)", auditor: "R. Sharma & Associates, Chartered Accountants", status: "Unqualified (Clean Opinion)", file: "NHS_Audited_Report_2080_81.pdf", size: "2.1 MB" },
    { year: "Fiscal Year 2079/80 (2022/23)", auditor: "B. Joshi & Co., Chartered Accountants", status: "Unqualified (Clean Opinion)", file: "NHS_Audited_Report_2079_80.pdf", size: "1.9 MB" },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isNepali ? "पारदर्शिता तथा सुशासन" : "Financial Transparency & Governance"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "लेखापरीक्षण, वार्षिक प्रतिवेदन तथा सुशासन" : "Audit Reports, Annual Filings & Governance Disclosures"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटी (SWC दर्ता नं. १२९०) को पूर्ण वित्तीय जवाफदेहिता, बाह्य चार्टर्ड एकाउन्टेन्ट लेखापरीक्षण प्रतिवेदन तथा समाज कल्याण परिषद विवरण।"
              : "Download certified audited balance sheets, Social Welfare Council (SWC) compliance disclosures, tax clearance certificates, and procurement guidelines."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* SWC & Legal Credibility Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Legal Registration</span>
            <h3 className="font-bold text-base text-slate-900">Social Welfare Council (SWC)</h3>
            <p className="text-xs text-slate-600">Affiliation No. 1290 (Kathmandu District Administration Office Reg. 312/049/050).</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tax & Revenue Compliance</span>
            <h3 className="font-bold text-base text-slate-900">Inland Revenue Department</h3>
            <p className="text-xs text-slate-600">Permanent Account Number (PAN): 300124890. Annual tax clearance maintained.</p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Global Affiliation</span>
            <h3 className="font-bold text-base text-slate-900">World Federation of Hemophilia</h3>
            <p className="text-xs text-slate-600">Accredited National Member Organization (NMO) for Nepal since 2000.</p>
          </div>
        </div>

        {/* Audited Financial Statements */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "वार्षिक लेखापरीक्षण प्रतिवेदनहरू (Audited Balance Sheets)" : "Audited Financial Statements"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Conducted independently by certified Chartered Accountants in compliance with Nepal Accounting Standards:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {auditReports.map((rep, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      {rep.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{rep.size}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{rep.year}</h3>
                  <p className="text-xs text-slate-500">Audited by: {rep.auditor}</p>
                </div>

                <button
                  onClick={() => alert(`Downloading: ${rep.file}`)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audit Report (PDF)</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Policies */}
        <section id="policies" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "संस्थागत नीति तथा आचारसंहिता" : "Core Governance & Safeguarding Policies"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Official institutional operating frameworks ratified by the General Assembly:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Scale className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-slate-900">NHS Constitution & Bylaws</h4>
              <p className="text-slate-600">Democratic election, term limits, and board duties.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="font-bold text-slate-900">Anti-Corruption & Whistleblower</h4>
              <p className="text-slate-600">Zero tolerance for fraud, bribery or conflict of interest.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold text-slate-900">Factor Cold-Chain Quality</h4>
              <p className="text-slate-600">Strict temperature logging and batch verification SOPs.</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <h4 className="font-bold text-slate-900">Child & Family Safeguarding</h4>
              <p className="text-slate-600">Protection guidelines for pediatric health camps.</p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
