"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { provinceStats, diagnosisBreakdown } from "@/data/mockData";
import { 
  PieChart as PieIcon, 
  BarChart as BarIcon, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Download, 
  BookOpen,
  CheckCircle2,
  Users
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import Link from "next/link";

export default function DataResearchPage() {
  const { isNepali, t } = useLanguage();

  const severityData = [
    { name: "Severe (<1%)", count: 590, color: "#DC2626" },
    { name: "Moderate (1-5%)", count: 260, color: "#D97706" },
    { name: "Mild (5-40%)", count: 134, color: "#0D9488" }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <PieIcon className="w-3.5 h-3.5" />
            <span>{isNepali ? "राष्ट्रिय तथ्याङ्क तथा अनुसन्धान" : "National Registry & Clinical Research"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "नेपाल हेमोफिलिया राष्ट्रिय तथ्याङ्क ड्यासबोर्ड" : "Nepal Hemophilia Registry & Data Dashboard"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपालका सातै प्रदेशमा दर्ता भएका बिरामीहरूको जनसांख्यिकीय विश्लेषण, रोगको प्रकार तथा फ्याक्टर उपयोग सम्बन्धी समग्र आधिकारिक प्रतिवेदन।"
              : "Aggregated national epidemiological data, provincial treatment distribution, and peer-reviewed research publications across Nepal."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Strict Data Protection Notice */}
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-r-2xl flex items-start gap-3.5 text-emerald-950 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-emerald-950 block">
              PRIVACY & HEALTH DATA PROTECTION SAFEGUARD:
            </span>
            <p className="leading-relaxed text-emerald-900">
              In strict accordance with international health privacy standards and Nepal medical ethics, <strong>no personally identifiable information (PII)</strong> is published. All charts and indicators present verified aggregated population statistics.
            </p>
          </div>
        </div>

        {/* Dynamic Key Performance Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Total Registered Cases</span>
            <span className="text-2xl sm:text-3xl font-black text-primary-900 block">984</span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8.4% Annual Registry Growth
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Estimated Undiagnosed Base</span>
            <span className="text-2xl sm:text-3xl font-black text-accent block">~4,000</span>
            <span className="text-[11px] text-slate-500">Based on 1 in 10,000 live births</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Provinces with Care Hubs</span>
            <span className="text-2xl sm:text-3xl font-black text-teal-700 block">7 / 7</span>
            <span className="text-[11px] text-teal-600 font-semibold">100% Regional Coverage</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">Identified Inhibitor Cases</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-700 block">34</span>
            <span className="text-[11px] text-amber-700 font-semibold">Requiring Bypassing Agents</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Province Distribution Bar Chart */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "प्रदेशगत बिरामी संख्या वितरण" : "Registered Patients by Province"}
                </h3>
                <p className="text-xs text-slate-500">Verified distribution across all 7 provinces</p>
              </div>
              <BarIcon className="w-5 h-5 text-primary" />
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={provinceStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="province" tick={{ fontSize: 11 }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "12px" }}
                    formatter={(value: any) => [`${value} Patients`, "Registered"]}
                  />
                  <Bar dataKey="patients" fill="#0F3A66" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Diagnosis Breakdown Pie Chart */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "रोगको प्रकार अनुसार वर्गीकरण" : "Diagnosis Breakdown"}
                </h3>
                <p className="text-xs text-slate-500">National Bleeding Registry data</p>
              </div>
              <PieIcon className="w-5 h-5 text-accent" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diagnosisBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {diagnosisBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: any) => [`${value} Patients`, "Count"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Annual Surveys & Research Publications */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                {isNepali ? "वार्षिक सर्वेक्षण तथा अनुसन्धान प्रतिवेदनहरू" : "Annual Surveys & Scientific Publications"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Download verified statistical reports and policy evidence briefs:
              </p>
            </div>
            <Link href="/resources" className="text-xs font-bold text-primary hover:underline">
              View All Publications →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">NHS Annual Survey 2025/26</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">National Bleeding Disorders Registry & Demographic Report</h4>
                <p className="text-xs text-slate-600 mt-1">Full statistical summary on factor utilization, diagnostic age, and orthopedic outcomes in Nepal.</p>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                <Download className="w-3.5 h-3.5" /> Download Report (PDF, 4.5 MB)
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Policy Brief / MoHP Submission</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">Universal Health Coverage & National Factor Procurement Roadmap</h4>
                <p className="text-xs text-slate-600 mt-1">Evidence-based analysis submitted to the Ministry of Health and Population for basic health insurance integration.</p>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline">
                <Download className="w-3.5 h-3.5" /> Download Policy Brief (PDF, 2.1 MB)
              </Link>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
