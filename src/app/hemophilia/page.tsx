"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  BookOpen, 
  Activity, 
  ShieldAlert, 
  Heart, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  Stethoscope, 
  HelpCircle,
  FileText,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function HemophiliaGuidePage() {
  const { isNepali, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: isNepali ? "हेमोफिलिया के हो र यो कसरी लाग्छ?" : "What is Hemophilia and how is it inherited?",
      a: isNepali
        ? "हेमोफिलिया एक वंशाणुगत (Genetic) रक्त विकार हो जसमा रगत जमाउने आवश्यक प्रोटिन (Clotting Factor) को कमी हुन्छ। यो मुख्यतया 'X' क्रोमोजोममार्फत आमाबाट छोरामा सर्दछ।"
        : "Hemophilia is an inherited genetic bleeding disorder where the blood does not clot properly due to a deficiency in clotting factors (Factor VIII or IX). It is an X-linked recessive condition primarily affecting males, with females generally being genetic carriers."
    },
    {
      q: isNepali ? "हेमोफिलिया 'ए' र 'बी' बीच के फरक छ?" : "What is the difference between Hemophilia A and Hemophilia B?",
      a: isNepali
        ? "हेमोफिलिया 'ए' मा फ्याक्टर ८ (Factor VIII) को कमी हुन्छ (करिब ८०-८५% बिरामीमा)। हेमोफिलिया 'बी' (क्रिसमस डिजिज) मा फ्याक्टर ९ (Factor IX) को कमी हुन्छ (करिब १५-२०% बिरामीमा)। दुवैको लक्षण उस्तै हुन्छ तर औषधि फरक हुन्छ।"
        : "Hemophilia A is caused by a deficiency of Clotting Factor VIII (affecting ~80-85% of cases), while Hemophilia B is caused by a deficiency of Clotting Factor IX (~15-20%). Both share identical clinical symptoms but require different factor replacement concentrates."
    },
    {
      q: isNepali ? "जोर्नीमा रगत जम्दा (Hemarthrosis) के गर्ने?" : "What should I do immediately during an acute joint bleed?",
      a: isNepali
        ? "तुरुन्तै R.I.C.E. प्राथमिक उपचार (आराम, बरफको सेकाइ, हल्का ब्यान्डेज र प्रभावित अंग माथि उठाउने) सुरु गर्नुहोस् र ढिला नगरी फ्याक्टर इन्जेक्सन लिन नजिकैको अस्पताल जानुहोस्।"
        : "Immediately initiate the R.I.C.E. protocol (Rest, Ice wrapped in cloth, gentle Compression, Elevation) and administer factor concentrate as quickly as possible to prevent permanent joint arthropathy."
    },
    {
      q: isNepali ? "हेमोफिलिया भएका व्यक्तिले कुन औषधि खानुहुँदैन?" : "Which painkillers or medicines should strictly be avoided?",
      a: isNepali
        ? "एस्पिरिन (Aspirin), ब्रुफिन (Ibuprofen), फ्लेक्सन, नेप्रोक्सेन जस्ता NSAIDs औषधि कदापि खानुहुँदैन। दुखाइको लागि प्यारासितामोल (Paracetamol) सुरक्षित मानिन्छ।"
        : "Strictly avoid Aspirin, Ibuprofen, Naproxen, and other Non-Steroidal Anti-Inflammatory Drugs (NSAIDs) because they impair platelet function and trigger severe bleeding. Paracetamol is the safe analgesic of choice."
    },
    {
      q: isNepali ? "महिला तथा किशोरीहरूमा पनि रक्त विकार हुन सक्छ?" : "Can women and girls have bleeding disorders?",
      a: isNepali
        ? "अवश्य। भन विलेब्रान्ड रोग (vWD), फ्याक्टर क्यारियर महिलाहरू तथा अन्य दुर्लभ रक्त विकारका कारण महिलाहरूमा अत्यधिक महिनावारी रक्तस्राव वा शल्यक्रियापछिको रक्तस्राव हुन सक्छ।"
        : "Yes. Von Willebrand Disease (vWD) affects males and females equally. Symptomatic female carriers of Hemophilia A and B can also experience low baseline factor levels, heavy menstrual bleeding (menorrhagia), and postpartum hemorrhages."
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isNepali ? "चिकित्सा तथा शैक्षिक निर्देशिका" : "Clinical & Educational Knowledge Hub"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "हेमोफिलिया तथा रक्तस्राव विकारबारे सम्पूर्ण जानकारी" : "Understanding Hemophilia & Inherited Bleeding Disorders"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीको चिकित्सा सल्लाहकार परिषदद्वारा तयार पारिएको प्रमाणमा आधारित नेपाली तथा अंग्रेजी क्लिनिकल निर्देशिका।"
              : "Evidence-based clinical guidelines, symptom identification, joint preservation, and emergency bleeding management aligned with international WFH standards."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section 1: What is Hemophilia? */}
        <section id="what-is" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>{isNepali ? "आधारभूत जानकारी" : "The Basics"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900">
              {isNepali ? "हेमोफिलिया के हो?" : "What is Hemophilia?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isNepali
                ? "हेमोफिलिया एक दुर्लभ, वंशाणुगत रक्त विकार हो जसमा रगत जम्ने स्वाभाविक प्रक्रिया अवरुद्ध हुन्छ। सामान्य मानिसमा चोट लाग्दा रगतमा रहेका १३ वटा क्लोटिङ फ्याक्टरहरूले मिलेर रगत जमाउँछन्। तर हेमोफिलिया भएका व्यक्तिमा फ्याक्टर ८ वा ९ को अभावका कारण रगत लामो समयसम्म बगिरहन्छ।"
                : "Hemophilia is a rare inherited bleeding disorder in which the blood doesn't clot normally because it lacks sufficient blood-clotting proteins (clotting factors). People with hemophilia do not bleed harder or faster than others, but they bleed for a much longer period of time, especially internally into joints and muscles."}
            </p>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-primary block text-sm">Hemophilia A</span>
                <span className="text-slate-600 block mt-1">Deficiency of <strong>Factor VIII</strong> (Factor 8). Accounts for ~80-85% of cases.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-accent block text-sm">Hemophilia B</span>
                <span className="text-slate-600 block mt-1">Deficiency of <strong>Factor IX</strong> (Factor 9). Also called Christmas Disease (~15-20%).</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-teal-700 block text-sm">Von Willebrand (vWD)</span>
                <span className="text-slate-600 block mt-1">Deficiency or dysfunction of <strong>vWF protein</strong>. Affects men and women equally.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-primary-50 p-6 rounded-2xl border border-primary-200 space-y-3">
            <h3 className="font-bold text-sm text-primary-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Inheritance & Genetics</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              The hemophilia gene is carried on the <strong>X chromosome</strong>. 
            </p>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>A mother who carries the gene has a <strong>50% chance</strong> with each pregnancy of passing it to a son (who will have hemophilia) or daughter (who will be a carrier).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>A father with hemophilia will pass the gene to <strong>all his daughters</strong> (all carriers), but <strong>none of his sons</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>About <strong>30% of cases</strong> arise from spontaneous new genetic mutations with no prior family history.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Severity Levels */}
        <section id="symptoms" className="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "गम्भीरता स्तर र लक्षणहरू" : "Clinical Severity Levels & Symptoms"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Severity depends on the percentage of normal clotting factor measured in the blood plasma:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border-2 border-red-400 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-red-600">Severe Hemophilia</span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">&lt; 1% Factor</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Frequent spontaneous internal bleeding into joints (knees, ankles, elbows) and deep muscles without obvious trauma. Requires regular prophylaxis or immediate on-demand factor infusion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-amber-700">Moderate Hemophilia</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">1% – 5% Factor</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bleeding occurs after minor injuries, dental extractions, sprains, or surgeries. Occasional spontaneous bleeds into joints may occur during strenuous activities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-teal-700">Mild Hemophilia</span>
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px]">5% – 40% Factor</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prolonged bleeding generally only follows major surgery, tooth extractions, or severe physical trauma. May remain undiagnosed until adulthood.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Joint Health & Physiotherapy */}
        <section id="joint-health" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>{isNepali ? "जोर्नी स्वास्थ्य" : "Joint Preservation"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900">
              {isNepali ? "जोर्नी स्वास्थ्य तथा फिजियोथेरापी" : "Joint Health & Hemophilic Arthropathy"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isNepali
                ? "हेमोफिलियामा बारम्बार घुँडा, कुहिनो वा गोलीगाँठोमा रगत जम्दा जोर्नीको कार्टिलेज नष्ट भई स्थायी अपाङ्गता हुन सक्छ। समयमै फ्याक्टर इन्जेक्सन र नियमित फिजियोथेरापीले जोर्नीलाई जोगाउँछ।"
                : "Repeated bleeding into the same joint (a 'target joint') causes chronic inflammation of the synovium (synovitis) and gradual erosion of cartilage, leading to hemophilic arthropathy and joint stiffness."}
            </p>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Isometric muscle strengthening:</strong> Builds muscular support around knees and ankles.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Safe Physical Activity:</strong> Swimming, stationary cycling, and walking are highly beneficial.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Early Warning Detection:</strong> Tingling warmth in joint must be treated before visible swelling.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-primary-900">
              {isNepali ? "आकस्मिक R.I.C.E. कार्यविधि" : "The Emergency R.I.C.E. First-Aid Standard"}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-primary block">1. REST</span>
                <span className="text-slate-600 text-[11px]">Stop activity and immobilize the bleeding limb immediately.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-primary block">2. ICE</span>
                <span className="text-slate-600 text-[11px]">Apply ice pack wrapped in a towel for 15-20 minutes.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-primary block">3. COMPRESS</span>
                <span className="text-slate-600 text-[11px]">Apply gentle elastic bandage for joint stabilization.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-primary block">4. ELEVATE</span>
                <span className="text-slate-600 text-[11px]">Keep limb raised above heart level to reduce swelling.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/emergency"
                className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>View Full Emergency Bleeding Action Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Comprehensive FAQs */}
        <section id="faq" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-900">
              {isNepali ? "बारम्बार सोधिने प्रश्नहरू (FAQs)" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isNepali
                ? "बिरामी, परिवार तथा स्याहारकर्ताहरूबाट धेरै सोधिने महत्वपूर्ण प्रश्न र उत्तरहरू।"
                : "Answers to common queries regarding daily living, diagnosis, treatment, and school life."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
