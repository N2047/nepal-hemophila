"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building2, 
  Target, 
  Compass, 
  History, 
  Users, 
  Stethoscope, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Award,
  ChevronRight,
  ArrowRight,
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { isNepali, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "leadership" | "provinces" | "governance">("overview");

  const boardMembers = [
    { name: "Mr. Mukunda Sharma", role: isNepali ? "अध्यक्ष" : "President", org: "NHS Central Committee", exp: "Patient Advocate since 1995" },
    { name: "Dr. Bishal Subedi", role: isNepali ? "उपाध्यक्ष (चिकित्सा)" : "Vice President (Medical)", org: "Senior Consultant Hematologist", exp: "Bir Hospital / NAMS" },
    { name: "Ms. Sita Adhikari", role: isNepali ? "महासचिव" : "General Secretary", org: "Patient Family Representative", exp: "Advocacy & Youth Programs" },
    { name: "Mr. Ramesh Thapa", role: isNepali ? "कोषाध्यक्ष" : "Treasurer", org: "Gandaki Provincial Chapter", exp: "Finance & Regional Operations" },
    { name: "Ms. Gita Shrestha", role: isNepali ? "कार्यसमिति सदस्य" : "Executive Member (Women & Girls)", org: "Bleeding Disorder Advocate", exp: "Women's Health Initiative" },
    { name: "Mr. Aashish Tamang", role: isNepali ? "युवा प्रतिनिधि" : "Youth Representative", org: "NHS Youth Wing", exp: "Digital & E-Learning Lead" }
  ];

  const medicalAdvisors = [
    { name: "Prof. Dr. Bishesh Poudyal", title: "Chief Clinical Advisor / Hematology", inst: "National Academy of Medical Sciences (Bir Hospital)" },
    { name: "Prof. Dr. Neebha Ojha", title: "Senior Consultant Hematologist", inst: "Tribhuvan University Teaching Hospital (TUTH)" },
    { name: "Dr. Anupama Karki", title: "Pediatric Hematologist / Oncologist", inst: "Kanti Children's Hospital" },
    { name: "Dr. Badri Chapagain", title: "Provincial Medical Coordinator", inst: "Bheri Hospital Nepalgunj" },
    { name: "Dr. Hemraj Pandey", title: "Sudurpashchim Clinical Liaison", inst: "Seti Provincial Hospital" }
  ];

  const provincialOffices = [
    { prov: "Koshi Province", city: "Dharan / Biratnagar", contact: "+977-25-525555", center: "BPKIHS Dharan", lead: "Dr. B. Karki (Coordinator)" },
    { prov: "Madhesh Province", city: "Janakpurdham", contact: "+977-41-520133", center: "Janakpur Provincial Hospital", lead: "Mr. R. Yadav (Coordinator)" },
    { prov: "Bagmati Province", city: "Kathmandu (Head Office)", contact: "+977-1-4221119", center: "Bir Hospital & TUTH", lead: "NHS Central Secretariat" },
    { prov: "Gandaki Province", city: "Pokhara", contact: "+977-61-520067", center: "Pokhara Academy of Health Sciences", lead: "Mr. R. Thapa (Coordinator)" },
    { prov: "Lumbini Province", city: "Nepalgunj / Butwal", contact: "+977-81-520120", center: "Bheri Hospital", lead: "Mr. S. Chaudhary (Coordinator)" },
    { prov: "Karnali Province", city: "Birendranagar, Surkhet", contact: "+977-83-520200", center: "Karnali Provincial Hospital", lead: "Mr. D. Khadka (Coordinator)" },
    { prov: "Sudurpashchim Province", city: "Dhangadhi", contact: "+977-91-521259", center: "Seti Provincial Hospital", lead: "Ms. K. Joshi (Coordinator)" }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isNepali ? "संस्थागत परिचय" : "About Nepal Hemophilia Society"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "हाम्रो बारेमा — इतिहास, नेतृत्व र संरचना" : "About NHS — History, Leadership & Governance"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटी (एन.एच.एस.) सन् १९९२ मा स्थापित, नेपाल सरकार तथा समाज कल्याण परिषदमा दर्ता भएको बिरामी-नेतृत्वको राष्ट्रिय गैर-नाफामूलक संस्था हो।"
              : "Nepal Hemophilia Society (NHS) is the recognized national patient-led organization representing thousands of citizens living with hemophilia and rare inherited bleeding disorders across Nepal."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
          {[
            { id: "overview", label: isNepali ? "संस्थागत विवरण" : "Overview & Vision", icon: Compass },
            { id: "history", label: isNepali ? "इतिहास" : "History in Nepal", icon: History },
            { id: "leadership", label: isNepali ? "नेतृत्व तथा सल्लाहकार" : "Leadership & Advisors", icon: Users },
            { id: "provinces", label: isNepali ? "७ प्रदेश शाखाहरू" : "7 Provincial Chapters", icon: MapPin },
            { id: "governance", label: isNepali ? "सुशासन र नीतिहरू" : "Governance & Ethics", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Vision */}
        {activeTab === "overview" && (
          <div className="pt-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-black">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "दूरदृष्टि (Vision)" : "Our Vision"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isNepali
                    ? "नेपालका सम्पूर्ण हेमोफिलिया तथा रक्त विकार भएका व्यक्तिहरूले पूर्ण स्वास्थ्य, मर्यादा, समान अधिकार र सक्रिय जीवन बाँच्न पाउने समाजको निर्माण।"
                    : "A future where every individual with a bleeding disorder in Nepal enjoys accessible treatment, physical dignity, social equality, and full life potential."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-black">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "ध्येय (Mission)" : "Our Mission"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isNepali
                    ? "निःशुल्क फ्याक्टर प्रतिस्थापन, विकेन्द्रीकृत प्रयोगशाला परीक्षण, फिजियोथेरापी, मनोसामाजिक सहयोग र नीतिगत पैरवीमार्फत जीवनस्तर उकास्ने।"
                    : "To decentralize specialized coagulation diagnosis, guarantee national factor supply, provide comprehensive psychosocial care, and advocate for universal health coverage."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "मूल्यमान्यता (Core Values)" : "Core Values"}
                </h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Patient-Centered Dignity</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Medical Credibility & Ethics</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Financial Transparency</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Inclusivity Across 7 Provinces</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-primary-900">
                {isNepali ? "रणनीतिक उद्देश्यहरू (२०२४-२०३०)" : "Strategic Objectives (2024-2030)"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-primary">1.</span>
                  <span><strong>Universal Factor Access:</strong> Advocate for permanent government budget allocation to provide free Factor VIII and IX across provincial hospitals.</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-primary">2.</span>
                  <span><strong>Diagnostic Decentralization:</strong> Equip all 7 provincial teaching laboratories with automated aPTT/PT assays and factor quantification capabilities.</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-primary">3.</span>
                  <span><strong>Preventing Disability:</strong> Expand joint health screening and physiotherapy rehabilitation clinics to minimize chronic hemophilic arthropathy.</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-primary">4.</span>
                  <span><strong>Child & Youth Empowerment:</strong> Support educational continuity for children with bleeding disorders through school accommodation frameworks.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: History */}
        {activeTab === "history" && (
          <div className="pt-8 space-y-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "नेपालमा हेमोफिलिया हेरचाह र एन.एच.एस.को इतिहास" : "History of Hemophilia Care & NHS in Nepal"}
            </h2>

            <div className="border-l-2 border-primary-200 pl-6 space-y-8 relative">
              
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow" />
                <span className="text-xs font-bold text-primary block">1992</span>
                <h4 className="font-bold text-base text-slate-900">Foundation of Nepal Hemophilia Society</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Founded by a small group of determined patients and families in Kathmandu who lacked access to any clotting factor concentrates and relied on dangerous whole blood or fresh frozen plasma (FFP) transfusions.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow" />
                <span className="text-xs font-bold text-primary block">2000</span>
                <h4 className="font-bold text-base text-slate-900">WFH National Member Organization (NMO) Affiliation</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  NHS was officially recognized as the National Member Organization of the World Federation of Hemophilia (WFH), opening humanitarian channels for donated factor concentrates.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow" />
                <span className="text-xs font-bold text-primary block">2010</span>
                <h4 className="font-bold text-base text-slate-900">Establishment of Bir Hospital Hemophilia Day Care</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Partnered with the National Academy of Medical Sciences (NAMS) to create Nepal's first dedicated outpatient infusion and joint evaluation room.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                <span className="text-xs font-bold text-accent block">2020 - Present</span>
                <h4 className="font-bold text-base text-slate-900">Decentralization to All 7 Provinces & National Registry</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Formed provincial chapters in Koshi, Madhesh, Gandaki, Lumbini, Karnali, and Sudurpashchim. Launched the secure national patient registry and continuous professional training for regional doctors.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Leadership & Advisors */}
        {activeTab === "leadership" && (
          <div className="pt-8 space-y-12">
            
            {/* Executive Committee */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>{isNepali ? "केन्द्रीय कार्यसमिति" : "Central Executive Committee"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boardMembers.map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary font-black flex items-center justify-center text-sm">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{m.name}</h4>
                      <p className="text-xs font-semibold text-accent">{m.role}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{m.org} • {m.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Advisory Council */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>{isNepali ? "चिकित्सा सल्लाहकार परिषद" : "Medical Advisory Council"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicalAdvisors.map((doc, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/60 shadow-sm space-y-1.5">
                    <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                    <p className="text-xs font-semibold text-teal-800">{doc.title}</p>
                    <p className="text-[11px] text-slate-600">{doc.inst}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: 7 Provincial Chapters */}
        {activeTab === "provinces" && (
          <div className="pt-8 space-y-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                {isNepali ? "७ वटै प्रदेश शाखाहरू र सम्पर्क" : "NHS 7 Provincial Chapters & Coordination Hubs"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isNepali
                  ? "प्रत्येक प्रदेशमा स्थानीय समन्वय समिति, उपचार केन्द्र सम्पर्क र बिरामी सहयोग डेस्क सञ्चालनमा छन्।"
                  : "Dedicated provincial coordinators provide emergency hospital liaison, factor distribution, and localized family support."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {provincialOffices.map((p, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-primary-900">{p.prov}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-primary-50 text-primary font-semibold">Active</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>📍 <strong>City:</strong> {p.city}</div>
                    <div>🏥 <strong>Hospital Hub:</strong> {p.center}</div>
                    <div>👤 <strong>Lead:</strong> {p.lead}</div>
                    <div>📞 <strong>Hotline:</strong> <a href={`tel:${p.contact}`} className="text-accent font-semibold">{p.contact}</a></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Governance & Policies */}
        {activeTab === "governance" && (
          <div className="pt-8 space-y-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
              {isNepali ? "सुशासन, आचारसंहिता तथा पारदर्शिता" : "Governance, Safeguarding & Institutional Policies"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">Patient Data Privacy & HIPAA Alignment</h4>
                <p className="text-xs text-slate-600">
                  Strict zero-public PII rule. All medical records, factor registries, and consultations are encrypted and strictly access-controlled.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <FileText className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-sm text-slate-900">Financial Audit & Tax Transparency</h4>
                <p className="text-xs text-slate-600">
                  Audited annual financial statements submitted annually to Social Welfare Council (SWC) and Inland Revenue Department (IRD).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <HeartHandshake className="w-5 h-5 text-accent" />
                <h4 className="font-bold text-sm text-slate-900">Child Safeguarding & Vulnerable Adults</h4>
                <p className="text-xs text-slate-600">
                  Mandatory background verification and ethics training for all staff and volunteers engaging in pediatric care camps.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-slate-900">Anti-Corruption & Procurement Code</h4>
                <p className="text-xs text-slate-600">
                  Competitive bidding and strict non-profit compliance for all equipment, factor cold chain, and medical supplies.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/transparency"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow transition-colors"
              >
                <span>View Audited Financial Statements & SWC Filings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
