"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Stethoscope, 
  Calculator, 
  BookOpen, 
  FileText, 
  Award, 
  CheckCircle2, 
  Download, 
  AlertTriangle,
  Activity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function HealthcareProsPage() {
  const { isNepali, t } = useLanguage();

  // Factor Dosing Calculator State
  const [patientWeightKg, setPatientWeightKg] = useState<number>(50);
  const [factorType, setFactorType] = useState<"Factor VIII" | "Factor IX">("Factor VIII");
  const [bleedSeverity, setBleedSeverity] = useState<"Minor Joint" | "Major Muscle / Trauma" | "Life-Threatening / Head">("Major Muscle / Trauma");

  // Dosing logic:
  // Target % Rise:
  // Minor: 30-40%
  // Major: 50-60%
  // Life-Threatening: 80-100%
  const getTargetRise = () => {
    if (bleedSeverity === "Minor Joint") return 35;
    if (bleedSeverity === "Major Muscle / Trauma") return 55;
    return 100;
  };

  const calculateRequiredIU = () => {
    const targetRise = getTargetRise();
    if (factorType === "Factor VIII") {
      // Required IU = Weight (kg) × Desired Rise (%) × 0.5
      return Math.round(patientWeightKg * targetRise * 0.5);
    } else {
      // Required IU = Weight (kg) × Desired Rise (%) × 1.0 (or 1.2)
      return Math.round(patientWeightKg * targetRise * 1.0);
    }
  };

  const calculatedIU = calculateRequiredIU();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-300">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{isNepali ? "स्वास्थ्यकर्मी क्लिनिकल पोर्टल" : "Clinical Practice & Healthcare Portal"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "चिकित्सक तथा स्वास्थ्यकर्मीहरूका लागि क्लिनिकल स्रोतहरू" : "Clinical Resources for Physicians, Hematologists & Nurses"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीको चिकित्सा सल्लाहकार परिषदद्वारा स्वीकृत राष्ट्रिय उपचार निर्देशिका, फ्याक्टर मात्रा क्यालकुलेटर, प्रयोगशाला कार्यविधि तथा निरन्तर चिकित्सा शिक्षा (CME)।"
              : "Access WFH-aligned national bleeding management guidelines, coagulation laboratory workflows, factor dosing calculators, and CME accredited modules."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Interactive Factor Dosing Calculator */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-50 text-primary rounded-xl">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-primary-900">
                  {isNepali ? "फ्याक्टर मात्रा सन्दर्भ क्यालकुलेटर" : "Factor Dosing Reference Calculator"}
                </h2>
                <p className="text-xs text-slate-500">
                  Based on WFH standard plasma volume recovery formulas.
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200 hidden sm:inline">
              Clinical Reference Tool
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Factor Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">1. Select Clotting Factor Deficient</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFactorType("Factor VIII")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      factorType === "Factor VIII"
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Factor VIII (Hemophilia A)
                  </button>
                  <button
                    onClick={() => setFactorType("Factor IX")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      factorType === "Factor IX"
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Factor IX (Hemophilia B)
                  </button>
                </div>
              </div>

              {/* Patient Weight */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>2. Patient Body Weight (kg)</span>
                  <span className="text-primary font-mono text-sm">{patientWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={120}
                  value={patientWeightKg}
                  onChange={(e) => setPatientWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Pediatric (5 kg)</span>
                  <span>Adult (60 kg)</span>
                  <span>120 kg</span>
                </div>
              </div>

              {/* Bleed Severity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">3. Bleed Location & Severity Level</label>
                <select
                  value={bleedSeverity}
                  onChange={(e) => setBleedSeverity(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <option value="Minor Joint">Minor / Early Hemarthrosis (Target: 30–40% Rise)</option>
                  <option value="Major Muscle / Trauma">Major Joint, Muscle Bleed or Dental (Target: 50–60% Rise)</option>
                  <option value="Life-Threatening / Head">Life-Threatening: Head Trauma, GI, Major Surgery (Target: 80–100% Rise)</option>
                </select>
              </div>

            </div>

            {/* Calculated Dose Result Display */}
            <div className="lg:col-span-5 bg-gradient-medical text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Recommended Initial Infusion Dose
              </span>

              <div className="py-2">
                <span className="text-4xl sm:text-5xl font-black text-white block font-mono">
                  {calculatedIU.toLocaleString()} IU
                </span>
                <span className="text-xs text-slate-200 block mt-1">
                  Target Factor Peak: <strong>{getTargetRise()}%</strong>
                </span>
              </div>

              <div className="p-3 bg-white/10 rounded-xl text-left text-[11px] text-slate-200 space-y-1 border border-white/10">
                <div>• <strong>Formula:</strong> {factorType === "Factor VIII" ? "Weight (kg) × Desired Rise (%) × 0.5" : "Weight (kg) × Desired Rise (%) × 1.0"}</div>
                <div>• <strong>Half-life:</strong> {factorType === "Factor VIII" ? "~8-12 hours (Re-dose q12h if severe)" : "~18-24 hours (Re-dose q24h)"}</div>
              </div>

              <span className="text-[10px] text-slate-300 block italic">
                Educational dosing guide only. Clinical judgment must prevail in individual patient presentations.
              </span>
            </div>

          </div>
        </section>

        {/* Clinical Guidelines & Protocols */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "राष्ट्रिय क्लिनिकल प्रोटोकल तथा निर्देशिकाहरू" : "National Clinical Protocols & Guidelines"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Download official guidelines ratified by the Nepal Hemophilia Society Medical Advisory Council:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-sm text-slate-900">NHS Hemophilia Clinical Reference Standard 2026</h3>
                <p className="text-xs text-slate-600">Complete multi-specialty protocol for emergency, inpatient, orthopedic, and pediatric care in Nepal.</p>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2">
                <Download className="w-3.5 h-3.5" /> Download Full Guideline (PDF)
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <FileText className="w-6 h-6 text-teal-700" />
                <h3 className="font-bold text-sm text-slate-900">Coagulation Laboratory & aPTT Mixing Standard</h3>
                <p className="text-xs text-slate-600">Standard operating procedures for district and provincial lab technicians conducting factor assays and inhibitor screening.</p>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline pt-2">
                <Download className="w-3.5 h-3.5" /> Download SOPs (PDF)
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <FileText className="w-6 h-6 text-accent" />
                <h3 className="font-bold text-sm text-slate-900">Dental Care & Minor Surgical Bleed Prevention</h3>
                <p className="text-xs text-slate-600">Pre-operative factor coverage and tranexamic acid mouthwash protocols for dentists and surgeons.</p>
              </div>
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2">
                <Download className="w-3.5 h-3.5" /> Download Dental Protocol (PDF)
              </Link>
            </div>
          </div>
        </section>

        {/* CME Training Call to Action */}
        <section className="p-8 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary font-bold text-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Accredited Medical CME Academy</span>
            </div>
            <h3 className="text-xl font-bold text-primary-900">
              Online Continuous Medical Education (CME) Modules
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Complete accredited training modules on acute bleeding triage, safe pediatric venipuncture, and joint health rehabilitation. Receive instant digital Certificates of Completion.
            </p>
          </div>

          <Link
            href="/elearning"
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Launch NHS E-Learning Academy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>

    </div>
  );
}
