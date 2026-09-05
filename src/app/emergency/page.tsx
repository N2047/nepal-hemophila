"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ShieldAlert, 
  PhoneCall, 
  AlertTriangle, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Flame,
  Stethoscope
} from "lucide-react";
import Link from "next/link";
import { useSiteContent } from "@/context/SiteContentContext";

export default function EmergencyPage() {
  const { isNepali, t } = useLanguage();
  const { emergency, orgDetails } = useSiteContent();

  const hotline1 = emergency.hotline1 || orgDetails.emergencyPhone || "+977-9851000000";
  const hotline2 = emergency.hotline2 || orgDetails.phone || "+977-1-4221119";

  return (
    <div className="space-y-12 pb-16">
      
      {/* Red Emergency Header Banner */}
      <section className="bg-red-600 text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider emergency-pulse">
            <ShieldAlert className="w-4 h-4" />
            <span>{isNepali ? "२४/७ आकस्मिक रक्तस्राव व्यवस्थापन" : "24/7 Emergency Bleeding Action Guide"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {isNepali ? "आकस्मिक रक्तस्राव हुँदा के गर्ने?" : "Acute Bleeding Emergency Protocol"}
          </h1>
          <p className="text-sm sm:text-base text-red-100 max-w-3xl leading-relaxed">
            {isNepali
              ? "रक्तस्राव विकार भएका व्यक्तिहरूमा गम्भीर चोटपटक लाग्दा ढिलाइ नगरी तत्काल फ्याक्टर प्रतिस्थापन र प्राथमिक उपचार सुरु गर्नुपर्छ।"
              : "In bleeding disorders, time is tissue and life. Recognize emergency warning signs, initiate immediate first-aid, and contact your nearest factor center without delay."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Critical Red-Flag Warning Signs */}
        <section className="bg-red-50 border-2 border-red-500 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600 text-white rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-red-900">
                {isNepali ? "अति खतराका संकेतहरू (तुरुन्त आकस्मिक कक्षमा जानुहोस्)" : "Life-Threatening Emergencies (Proceed Directly to Hospital ER)"}
              </h2>
              <p className="text-xs text-red-700">
                {isNepali ? "यी लक्षणहरू देखिएमा सिटि-स्क्यान वा अन्य जाँच नपर्खी तत्काल फ्याक्टर दिनुपर्छ।" : "Do NOT wait for test results. Infuse clotting factor immediately."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-2xl border border-red-200 space-y-2">
              <span className="font-extrabold text-red-700 block text-base">🧠 Head & Neck Trauma</span>
              <p className="text-slate-600">
                Blow to the head, severe headache, confusion, drowsiness, vomiting, or neck swelling restricting breathing.
              </p>
              <span className="inline-block font-bold text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Target Factor: 100%
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-red-200 space-y-2">
              <span className="font-extrabold text-red-700 block text-base">🫁 Throat & Airway Bleeds</span>
              <p className="text-slate-600">
                Difficulty swallowing, hoarseness, throat fullness, or airway obstruction following infection or trauma.
              </p>
              <span className="inline-block font-bold text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Target Factor: 100%
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-red-200 space-y-2">
              <span className="font-extrabold text-red-700 block text-base">🩸 Abdominal / GI Bleeds</span>
              <p className="text-slate-600">
                Severe abdominal pain, swelling, vomiting blood (hematemesis), or black tarry stools (melena).
              </p>
              <span className="inline-block font-bold text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Target Factor: 80–100%
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-red-200 space-y-2">
              <span className="font-extrabold text-red-700 block text-base">💪 Iliopsoas & Compartment</span>
              <p className="text-slate-600">
                Inability to straighten hip/groin, numbness in thigh, or tense swollen forearm/calf muscle compressing nerves.
              </p>
              <span className="inline-block font-bold text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Target Factor: 80–100%
              </span>
            </div>
          </div>
        </section>

        {/* 24/7 Immediate Contact Hotlines */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-accent" />
            <span>{isNepali ? "२४/७ आकस्मिक सम्पर्क हटलाइनहरू" : "Immediate 24/7 Duty Hospital Hotlines"}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="font-bold text-sm text-slate-900 block">Bir Hospital (Central Bank)</span>
              <p className="text-xs text-slate-500">Kantipath, Kathmandu</p>
              <a href="tel:+97714221988" className="inline-block px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-sm rounded-lg transition-colors">
                📞 01-4221988 / 4221119
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="font-bold text-sm text-slate-900 block">TUTH Maharajgunj Emergency</span>
              <p className="text-xs text-slate-500">Maharajgunj, Kathmandu</p>
              <a href="tel:+97714412505" className="inline-block px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-sm rounded-lg transition-colors">
                📞 01-4412505
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="font-bold text-sm text-slate-900 block">Kanti Children's Hospital</span>
              <p className="text-xs text-slate-500">Pediatric Bleeding Room</p>
              <a href="tel:+97714427452" className="inline-block px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-sm rounded-lg transition-colors">
                📞 01-4427452
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="font-bold text-sm text-slate-900 block">NHS National On-Call Line</span>
              <p className="text-xs text-slate-500">Patient Assistance Bureau (24/7)</p>
              <a href={`tel:${hotline1.replace(/\s+/g, '')}`} className="inline-block px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-lg transition-colors shadow">
                📞 {hotline1}
              </a>
              {hotline2 && hotline2 !== hotline1 && (
                <div className="pt-1">
                  <a href={`tel:${hotline2.replace(/\s+/g, '')}`} className="text-xs font-bold text-red-600 hover:underline">
                    Alt: {hotline2}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Step-by-Step Triage Algorithm */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
            {isNepali ? "आकस्मिक प्राथमिक उपचार चरणहरू" : "Step-by-Step Bleeding First-Aid Workflow"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900">STOP & ASSESS</h4>
              <p className="text-slate-600">
                Immediately stop all physical movement. Identify whether the bleed is a peripheral joint bleed or a life-threatening internal injury.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900">APPLY R.I.C.E.</h4>
              <p className="text-slate-600">
                Rest limb, apply cold pack wrapped in towel for 15-20 mins, wrap gently with elastic crepe bandage, and elevate above heart level.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent text-white font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900">FACTOR INFUSION</h4>
              <p className="text-slate-600">
                Administer prescribed Factor VIII or IX replacement as soon as possible. Carry NHS Patient Identity Card to hospital.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-black flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900">REHABILITATION</h4>
              <p className="text-slate-600">
                Once pain subsides (24-48 hours), begin gentle isometric muscle movements with physiotherapist guidance to prevent stiffness.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Route Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/treatment-centres"
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Find Treatment Centres Across 7 Provinces</span>
          </Link>
          <Link
            href="/factor-availability"
            className="px-6 py-3.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-accent" />
            <span>Check Live Factor Availability Status</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
