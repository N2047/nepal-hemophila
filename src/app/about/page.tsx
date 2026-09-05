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
import { CommitteeSection } from "@/components/committee/CommitteeSection";
import { useSiteContent } from "@/context/SiteContentContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { EditableContentWrapper } from "@/components/common/EditableContentWrapper";
import { Edit3 } from "lucide-react";

export default function AboutPage() {
  const { isNepali, t } = useLanguage();
  const { role } = useAuth();
  const { visionMission } = useSiteContent();
  const { advisors, chapters } = useData();
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "leadership" | "provinces" | "governance">("overview");

  React.useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#", "").toLowerCase();
        let targetTab: "overview" | "history" | "leadership" | "provinces" | "governance" | null = null;
        if (hash === "overview" || hash === "vision") {
          targetTab = "overview";
        } else if (hash === "history") {
          targetTab = "history";
        } else if (hash === "leadership" || hash === "board" || hash === "committee") {
          targetTab = "leadership";
        } else if (hash === "provinces" || hash === "chapters") {
          targetTab = "provinces";
        } else if (hash === "governance" || hash === "ethics") {
          targetTab = "governance";
        }
        if (targetTab) {
          setActiveTab(targetTab);
          setTimeout(() => {
            document.getElementById("about-tabs-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const fallbackAdvisors = [
    { nameNp: "प्रा. डा. विशेष पौड्याल", nameEn: "Prof. Dr. Bishesh Poudyal", titleNp: "प्रमुख क्लिनिकल सल्लाहकार / हेमाटोलोजी", titleEn: "Chief Clinical Advisor / Hematology", instNp: "राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान (वीर अस्पताल)", instEn: "Bir Hospital (NAMS)" },
    { nameNp: "प्रा. डा. निभा ओझा", nameEn: "Prof. Dr. Neebha Ojha", titleNp: "वरिष्ठ हेमाटोलोजिस्ट", titleEn: "Senior Consultant Hematologist", instNp: "त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल (TUTH)", instEn: "Tribhuvan University Teaching Hospital (TUTH)" },
    { nameNp: "डा. अनुपमा कार्की", nameEn: "Dr. Anupama Karki", titleNp: "बाल हेमाटोलोजिस्ट / अन्कोलोजिस्ट", titleEn: "Pediatric Hematologist / Oncologist", instNp: "कान्ति बाल अस्पताल", instEn: "Kanti Children's Hospital" },
    { nameNp: "डा. बद्री चापागाईं", nameEn: "Dr. Badri Chapagain", titleNp: "प्रादेशिक क्लिनिकल संयोजक", titleEn: "Provincial Medical Coordinator", instNp: "भेरी अस्पताल, नेपालगञ्ज", instEn: "Bheri Hospital Nepalgunj" },
    { nameNp: "डा. हेमराज पाण्डे", nameEn: "Dr. Hemraj Pandey", titleNp: "सुदूरपश्चिम क्लिनिकल सम्पर्क", titleEn: "Sudurpashchim Clinical Liaison", instNp: "सेती प्रादेशिक अस्पताल", instEn: "Seti Provincial Hospital" }
  ];

  const fallbackOffices = [
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
        <div id="about-tabs-container" className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
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

        {/* Tab 1: Institutional Overview */}
        {activeTab === "overview" && (
          <EditableContentWrapper label="भिजन र मिसन सम्पादन गर्नुहोस्" adminUrl="/admin?tab=site-content">
            <div className="pt-8 space-y-12">
              
              {/* Vision & Mission Cards */}
              <div id="vision" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-primary-50/50 border border-primary-200/80 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-primary-950">
                    {t("vision.title")}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isNepali ? (visionMission?.visionNp || t("vision.text")) : (visionMission?.visionEn || t("vision.text"))}
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-teal-50/50 border border-teal-200/80 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-teal-950">
                    {t("mission.title")}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isNepali ? (visionMission?.missionNp || t("mission.text")) : (visionMission?.missionEn || t("mission.text"))}
                  </p>
                </div>
              </div>

              {/* Core Institutional Objectives */}
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-primary-900">
                    {isNepali ? "संस्थागत मुख्य उद्देश्यहरू" : "Key Strategic Objectives of NHS"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      num: "01",
                      title: isNepali ? "निःशुल्क फ्याक्टर आपूर्ति" : "Universal Factor Access",
                      desc: isNepali ? "नेपालका सबै बिरामीलाई जीवनरक्षक क्लोटिङ फ्याक्टर निःशुल्क र नियमित उपलब्ध गराउन सरकारसँग पैरवी।" : "Advocating for government budget allocation to ensure free and continuous clotting factor replacement therapy."
                    },
                    {
                      num: "02",
                      title: isNepali ? "सटीक प्रयोगशाला निदान" : "Decentralized Diagnostics",
                      desc: isNepali ? "काठमाडौं बाहिरका प्रादेशिक अस्पतालहरूमा कोगुलेसन फ्याक्टर परीक्षण प्रयोगशाला विस्तार।" : "Equipping regional medical laboratories with factor assay capabilities for early and accurate bleeding diagnosis."
                    },
                    {
                      num: "03",
                      title: isNepali ? "व्यापक पुनर्स्थापना तथा हेरचाह" : "Comprehensive Care & Physio",
                      desc: isNepali ? "जोर्नी अपांगता रोक्न नियमित फिजियोथेरापी, मनोसामाजिक परामर्श तथा घरेलु प्राथमिक उपचार तालिम।" : "Providing specialized physiotherapy, joint preservation clinics, and home-treatment empowerment workshops."
                    },
                    {
                      num: "04",
                      title: isNepali ? "राष्ट्रिय बिरामी दर्ता (Registry)" : "National Patient Registry",
                      desc: isNepali ? "नेपालभरका अनुमानित ५,००० हेमोफिलिया बिरामीहरूलाई पहिचान गरी डिजिटल हेल्थ ट्र्याकिङमा समेट्ने।" : "Maintaining a secure, nationwide digital registry to map epidemiology, factor consumption, and clinical outcomes."
                    }
                  ].map((obj, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <span className="text-2xl font-black text-primary/30 block font-mono">{obj.num}</span>
                      <h4 className="font-bold text-base text-slate-900">{obj.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </EditableContentWrapper>
        )}

        {/* Tab 2: History & Milestones */}
        {activeTab === "history" && (
          <div id="history" className="pt-8 max-w-4xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                {isNepali ? "नेपालमा हेमोफिलिया आन्दोलनको ३ दशक" : "Three Decades of NHS: Chronology & Milestones"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isNepali
                  ? "सन् १९९२ मा सीमित बिरामी परिवारबाट सुरु भएको नेपाल हेमोफिलिया सोसाइटी आज ७ वटै प्रदेशमा सेवा सञ्जाल भएको राष्ट्रिय संस्था बनेको छ।"
                  : "From zero available factor concentrates in the 1990s to an accredited national network delivering 184,000+ factor units annually."}
              </p>
            </div>

            <div className="space-y-8 border-l-2 border-primary-200 pl-6 ml-3">
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
            
            {/* Dynamic Central Executive Committee */}
            <div id="leadership">
              <CommitteeSection showTitle={true} />
            </div>

            {/* Medical Advisory Council */}
            <EditableContentWrapper label="मेडिकल सल्लाहकार सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=advisors">
              <div id="advisors" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                    <span>{isNepali ? "चिकित्सा सल्लाहकार परिषद" : "Medical Advisory Council"}</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {(advisors && advisors.length > 0 ? advisors.length : fallbackAdvisors.length)} सल्लाहकार चिकित्सकहरू
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(advisors && advisors.length > 0 ? advisors : fallbackAdvisors).map((doc: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/60 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-teal-200 shrink-0">
                          <img src={doc.photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} alt={doc.nameEn || doc.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{isNepali ? (doc.nameNp || doc.name) : (doc.nameEn || doc.name)}</h4>
                          <p className="text-xs font-semibold text-teal-800">{isNepali ? (doc.titleNp || doc.title) : (doc.titleEn || doc.title)}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 pt-1 border-t border-teal-100">{isNepali ? (doc.institutionNp || doc.inst) : (doc.institutionEn || doc.inst)}</p>
                      {doc.bioNp && <p className="text-[11px] text-slate-500 line-clamp-2">{isNepali ? doc.bioNp : doc.bioEn}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </EditableContentWrapper>

          </div>
        )}

        {/* Tab 4: 7 Provincial Chapters */}
        {activeTab === "provinces" && (
          <EditableContentWrapper label="प्रादेशिक शाखाहरू सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=chapters">
            <div id="provinces" className="pt-8 space-y-6">
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
                {(chapters && chapters.length > 0 ? chapters : fallbackOffices).map((p: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-sm text-primary-900">
                        {isNepali ? (p.provinceNameNp || p.prov) : (p.provinceNameEn || p.prov)}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                        {isNepali ? (p.cityNp || p.city) : (p.cityEn || p.city)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1.5">
                      <div>🏥 <strong>अस्पताल:</strong> {isNepali ? (p.partnerHospitalNp || p.center) : (p.partnerHospitalEn || p.center)}</div>
                      <div>👤 <strong>संयोजक:</strong> {isNepali ? (p.coordinatorNameNp || p.lead) : (p.coordinatorNameEn || p.lead)}</div>
                      <div>📞 <strong>फोन:</strong> <a href={`tel:${(p.phone || p.contact).replace(/[^0-9+]/g, "")}`} className="text-primary font-mono font-semibold hover:underline">{p.phone || p.contact}</a></div>
                      {p.email && <div>✉️ <strong>इमेल:</strong> <a href={`mailto:${p.email}`} className="text-slate-500 font-mono text-[11px] hover:underline">{p.email}</a></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </EditableContentWrapper>
        )}

        {/* Tab 5: Governance & Ethics */}
        {activeTab === "governance" && (
          <div className="pt-8 max-w-4xl space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                {isNepali ? "संस्थागत सुशासन, आर्थिक पारदर्शिता र दर्ता" : "Institutional Governance, Legal Status & Ethics"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isNepali
                  ? "नेपाल हेमोफिलिया सोसाइटी प्रचलित कानुनअनुसार दर्ता भई नियमित वार्षिक लेखापरीक्षण (Audit) गराउने लोकतान्त्रिक संस्था हो।"
                  : "Adhering to the highest standards of NGO governance, independent statutory audits, and patient confidentiality."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h4 className="font-bold text-base text-slate-900">कानूनी दर्ता विवरण</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li>• <strong>जिल्ला प्रशासन कार्यालय काठमाडौं:</strong> दर्ता नं. २४५/२०४९</li>
                  <li>• <strong>समाज कल्याण परिषद (SWC):</strong> आवद्धता नं. १२९०</li>
                  <li>• <strong>स्थायी लेखा नम्बर (PAN):</strong> ३००१२३४५६</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <FileText className="w-8 h-8 text-emerald-600" />
                <h4 className="font-bold text-base text-slate-900">पारदर्शिता तथा वार्षिक प्रतिवेदन</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  संस्थाका वार्षिक सामाजिक लेखापरीक्षण तथा बाह्य चार्टर्ड एकाउन्टेन्ट प्रतिवेदनहरू सार्वजनिक गरिन्छ।
                </p>
                <div className="pt-2">
                  <Link href="/transparency" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <span>पारदर्शिता पोर्टल हेर्नुहोस्</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
