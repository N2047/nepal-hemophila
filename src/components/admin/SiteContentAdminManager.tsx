"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/context/SiteContentContext";
import { useAuth } from "@/context/AuthContext";
import { NoticeItem, NoticeInput, FeatureToggles } from "@/types/site-content";
import { 
  Settings, 
  Megaphone, 
  Compass, 
  Layout, 
  ToggleLeft, 
  ToggleRight, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Lock,
  Sparkles,
  PhoneCall,
  Building2,
  Activity,
  Award,
  Target
} from "lucide-react";
import Link from "next/link";

export function SiteContentAdminManager() {
  const { role } = useAuth();
  const {
    features,
    visionMission,
    hero,
    emergency,
    stats,
    notices,
    saving,
    status,
    clearStatus,
    toggleFeature,
    updateVisionMission,
    updateHero,
    updateEmergency,
    updateStats,
    updateOrgDetails,
    orgDetails,
    addNotice,
    updateNotice,
    deleteNotice,
  } = useSiteContent();

  const isSuperAdmin = role === "SUPER_ADMIN";

  // Sub-tabs: "notices" | "visionMission" | "homepage" | "stats" | "orgDetails" | "features"
  const [activeSubTab, setActiveSubTab] = useState<"notices" | "visionMission" | "homepage" | "stats" | "orgDetails" | "features">("notices");

  // Notices Modal State
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);
  const [noticeTitleNp, setNoticeTitleNp] = useState("");
  const [noticeTitleEn, setNoticeTitleEn] = useState("");
  const [noticeContentNp, setNoticeContentNp] = useState("");
  const [noticeContentEn, setNoticeContentEn] = useState("");
  const [noticeCategory, setNoticeCategory] = useState<any>("सूचना");
  const [noticeIsUrgent, setNoticeIsUrgent] = useState(false);
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split("T")[0]);
  const [deletingNotice, setDeletingNotice] = useState<NoticeItem | null>(null);

  // Vision & Mission local form state
  const [vmVisionNp, setVmVisionNp] = useState(visionMission.visionNp);
  const [vmVisionEn, setVmVisionEn] = useState(visionMission.visionEn);
  const [vmMissionNp, setVmMissionNp] = useState(visionMission.missionNp);
  const [vmMissionEn, setVmMissionEn] = useState(visionMission.missionEn);

  // Hero local form state
  const [heroTitleNp, setHeroTitleNp] = useState(hero.titleNp);
  const [heroTitleEn, setHeroTitleEn] = useState(hero.titleEn);
  const [heroSubtitleNp, setHeroSubtitleNp] = useState(hero.subtitleNp);
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(hero.subtitleEn);
  const [heroBadgeNp, setHeroBadgeNp] = useState(hero.taglineBadgeNp);

  // Emergency local form state
  const [emgHotline1, setEmgHotline1] = useState(emergency.hotline1);
  const [emgHotline2, setEmgHotline2] = useState(emergency.hotline2);
  const [emgBir, setEmgBir] = useState(emergency.birHospitalContact);
  const [emgDisclaimerNp, setEmgDisclaimerNp] = useState(emergency.disclaimerNp);

  // Stats local form state
  const [statPatients, setStatPatients] = useState(stats.registeredPatients);
  const [statMembers, setStatMembers] = useState(stats.activeMembers);
  const [statCentres, setStatCentres] = useState(stats.treatmentCentresCount);
  const [statProvinces, setStatProvinces] = useState(stats.provincesCovered);
  const [statDistricts, setStatDistricts] = useState(stats.districtsReached);
  const [statFactorUnits, setStatFactorUnits] = useState(stats.factorDistributedUnits || "184K+");
  const [statHcpTrained, setStatHcpTrained] = useState(stats.hcpTrainedCount || 320);

  // OrgDetails local form state
  const [orgNameNp, setOrgNameNp] = useState(orgDetails?.orgNameNp || "नेपाल हेमोफिलिया सोसाइटी");
  const [orgNameEn, setOrgNameEn] = useState(orgDetails?.orgNameEn || "Nepal Hemophilia Society");
  const [orgPhone, setOrgPhone] = useState(orgDetails?.phone || "+977-1-4221119");
  const [orgEmergencyPhone, setOrgEmergencyPhone] = useState(orgDetails?.emergencyPhone || "+977-9851000000");
  const [orgEmail, setOrgEmail] = useState(orgDetails?.email || "info@hemophilia-nepal.org.np");
  const [orgAddressNp, setOrgAddressNp] = useState(orgDetails?.addressNp || "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)");
  const [orgOfficeHoursNp, setOrgOfficeHoursNp] = useState(orgDetails?.officeHoursNp || "आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००");
  const [orgSwcReg, setOrgSwcReg] = useState(orgDetails?.swcRegNo || "१२९० (समाज कल्याण परिषद)");
  const [orgPan, setOrgPan] = useState(orgDetails?.panNo || "३००१२३४५६");
  const [orgBankName, setOrgBankName] = useState(orgDetails?.bankName || "राष्ट्रिय वाणिज्य बैंक (Rastriya Banijya Bank)");
  const [orgAccountName, setOrgAccountName] = useState(orgDetails?.accountName || "नेपाल हेमोफिलिया सोसाइटी (Nepal Hemophilia Society)");
  const [orgAccountNumber, setOrgAccountNumber] = useState(orgDetails?.accountNumber || "1090010002345001");
  const [orgBranch, setOrgBranch] = useState(orgDetails?.branch || "विशाल बजार शाखा, काठमाडौं");
  const [orgSwift, setOrgSwift] = useState(orgDetails?.swiftCode || "RBBANPKA");
  const [orgEsewa, setOrgEsewa] = useState(orgDetails?.esewaId || "9851000000");

  // Open Notice Modal (Add or Edit)
  const openAddNoticeModal = () => {
    setEditingNotice(null);
    setNoticeTitleNp("");
    setNoticeTitleEn("");
    setNoticeContentNp("");
    setNoticeContentEn("");
    setNoticeCategory("सूचना");
    setNoticeIsUrgent(false);
    setNoticeDate(new Date().toISOString().split("T")[0]);
    setIsNoticeModalOpen(true);
  };

  const openEditNoticeModal = (notice: NoticeItem) => {
    setEditingNotice(notice);
    setNoticeTitleNp(notice.titleNp);
    setNoticeTitleEn(notice.titleEn || notice.titleNp);
    setNoticeContentNp(notice.contentNp);
    setNoticeContentEn(notice.contentEn || notice.contentNp);
    setNoticeCategory(notice.category);
    setNoticeIsUrgent(notice.isUrgent);
    setNoticeDate(notice.publishDate);
    setIsNoticeModalOpen(true);
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitleNp.trim()) return;

    if (editingNotice) {
      await updateNotice(editingNotice.id, {
        titleNp: noticeTitleNp.trim(),
        titleEn: noticeTitleEn.trim() || noticeTitleNp.trim(),
        contentNp: noticeContentNp.trim(),
        contentEn: noticeContentEn.trim() || noticeContentNp.trim(),
        category: noticeCategory,
        isUrgent: noticeIsUrgent,
        publishDate: noticeDate,
      });
    } else {
      await addNotice({
        titleNp: noticeTitleNp.trim(),
        titleEn: noticeTitleEn.trim() || noticeTitleNp.trim(),
        contentNp: noticeContentNp.trim(),
        contentEn: noticeContentEn.trim() || noticeContentNp.trim(),
        category: noticeCategory,
        isUrgent: noticeIsUrgent,
        publishDate: noticeDate,
        isActive: true,
        authorName: role === "SUPER_ADMIN" ? "सुपर एडमिनिस्ट्रेटर" : "एन.एच.एस. व्यवस्थापक",
      });
    }
    setIsNoticeModalOpen(false);
  };

  const handleDeleteNotice = async () => {
    if (!deletingNotice) return;
    await deleteNotice(deletingNotice.id);
    setDeletingNotice(null);
  };

  // Save Vision & Mission
  const handleSaveVisionMission = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVisionMission({
      visionNp: vmVisionNp.trim(),
      visionEn: vmVisionEn.trim(),
      missionNp: vmMissionNp.trim(),
      missionEn: vmMissionEn.trim(),
    });
  };

  // Save Homepage Texts
  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero({
      titleNp: heroTitleNp.trim(),
      titleEn: heroTitleEn.trim(),
      subtitleNp: heroSubtitleNp.trim(),
      subtitleEn: heroSubtitleEn.trim(),
      taglineBadgeNp: heroBadgeNp.trim(),
    });
    await updateEmergency({
      hotline1: emgHotline1.trim(),
      hotline2: emgHotline2.trim(),
      birHospitalContact: emgBir.trim(),
      disclaimerNp: emgDisclaimerNp.trim(),
    });
  };

  // Save Stats
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStats({
      registeredPatients: Number(statPatients) || 0,
      activeMembers: Number(statMembers) || 0,
      treatmentCentresCount: Number(statCentres) || 0,
      provincesCovered: Number(statProvinces) || 0,
      districtsReached: Number(statDistricts) || 0,
      factorDistributedUnits: String(statFactorUnits).trim(),
      hcpTrainedCount: Number(statHcpTrained) || 0,
    });
  };

  // Save Org Details
  const handleSaveOrgDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOrgDetails({
      orgNameNp: orgNameNp.trim(),
      orgNameEn: orgNameEn.trim(),
      phone: orgPhone.trim(),
      emergencyPhone: orgEmergencyPhone.trim(),
      email: orgEmail.trim(),
      addressNp: orgAddressNp.trim(),
      officeHoursNp: orgOfficeHoursNp.trim(),
      swcRegNo: orgSwcReg.trim(),
      panNo: orgPan.trim(),
      bankName: orgBankName.trim(),
      accountName: orgAccountName.trim(),
      accountNumber: orgAccountNumber.trim(),
      branch: orgBranch.trim(),
      swiftCode: orgSwift.trim(),
      esewaId: orgEsewa.trim(),
    });
  };

  const featureList: { key: keyof FeatureToggles; title: string; desc: string; icon: any }[] = [
    {
      key: "aiChatbot",
      title: "एआई च्याट सहायक (AI Hemophilia Chatbot)",
      desc: "वेबसाइटको दायाँ तल देखिने स्वचालित २४/७ रक्तस्राव प्राथमिक उपचार च्याट सहायक।",
      icon: Sparkles,
    },
    {
      key: "factorAvailabilityTracker",
      title: "फ्याक्टर उपलब्धता ट्र्याकर (Factor Stock Tracker)",
      desc: "सातै प्रदेशका अस्पतालहरूमा Factor VIII/IX मौज्दात हेर्ने प्रत्यक्ष ट्र्याकिङ प्रणाली।",
      icon: Activity,
    },
    {
      key: "onlineDonations",
      title: "अनलाइन सहयोग / दान प्रणाली (Donations & Ledger)",
      desc: "बिरामी उपचार कोषका लागि eSewa/FonePay/बैंक ट्रान्सफरमार्फत दान संकलन सुविधा।",
      icon: Target,
    },
    {
      key: "noticeBoardTicker",
      title: "सूचना बोर्ड तथा टिकर (Notices & Urgent Ticker)",
      desc: "महत्त्वपूर्ण सूचना, कार्यक्रम तथा आपतकालीन अलर्टहरू मुख्य पृष्ठमा देखाउने सुविधा।",
      icon: Megaphone,
    },
    {
      key: "emergencyAlertBanner",
      title: "आपतकालीन २४/७ हटलाइन ब्यानर (Emergency Banner)",
      desc: "वेबसाइटको माथि देखिने २४/७ रक्तस्राव आकस्मिक फोन नम्बर तथा प्राथमिक उपचार सूचना।",
      icon: PhoneCall,
    },
    {
      key: "elearningAcademy",
      title: "ई-लर्निङ एकेडेमी (E-Learning Academy)",
      desc: "बिरामी, परिवार र स्वास्थ्यकर्मीहरूका लागि अनलाइन तालिम तथा प्रमाणपत्र प्रणाली।",
      icon: Award,
    },
    {
      key: "onlineMembershipForm",
      title: "अनलाइन सदस्यता आवेदन (Membership Form)",
      desc: "नयाँ आजीवन तथा साधारण सदस्यताका लागि अनलाइन फारम भर्ने व्यवस्था।",
      icon: Layout,
    },
    {
      key: "statisticsCounter",
      title: "राष्ट्रिय तथ्याङ्क काउन्टर (Demographic Stats Counter)",
      desc: "९८४+ बिरामी, ८ उपचार केन्द्र तथा ६८ जिल्लाको प्रमाणीकरण काउन्टर।",
      icon: Compass,
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-bold">
            <Settings className="w-3.5 h-3.5" />
            <span>Universal No-Code CMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            वेबसाइट कन्टेन्ट तथा फिचर व्यवस्थापन
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            कोडिङ बिना नै सम्पूर्ण वेबसाइटका सूचना पोस्ट, भिजन-मिसन सम्पादन, मुख्य पृष्ठका अक्षरहरू परिमार्जन र आवश्यक नभएका फिचरहरू अन वा अफ (Show/Hide) गर्नुहोस्।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-primary border border-primary-200 hover:bg-primary-50 flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>वेबसाइट हेर्नुहोस्</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Save Status Banner */}
      {status.type !== "idle" && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between border transition-all animate-in fade-in ${
            status.type === "saving"
              ? "bg-slate-900 text-white border-slate-700"
              : status.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-red-50 text-red-900 border-red-300"
          }`}
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
            {status.type === "saving" && <Loader2 className="w-4 h-4 animate-spin text-amber-400" />}
            {status.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {status.type === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{status.message}</span>
          </div>
          <button onClick={clearStatus} className="text-xs font-semibold underline opacity-70 hover:opacity-100">
            हटाउनुहोस्
          </button>
        </div>
      )}

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "notices", label: `📢 सूचना तथा विज्ञप्ति (${notices.length})`, icon: Megaphone },
          { id: "visionMission", label: "🎯 भिजन, मिसन र उद्देश्य", icon: Compass },
          { id: "homepage", label: "🏠 मुख्य पृष्ठ टेक्स्ट", icon: Layout },
          { id: "stats", label: "📊 राष्ट्रिय तथ्याङ्क", icon: Activity },
          { id: "orgDetails", label: "🏢 सम्पर्क र बैंक विवरण", icon: PhoneCall },
          { id: "features", label: `⚙️ फिचर अन/अफ नियन्त्रण ${!isSuperAdmin ? "(Super Admin Only)" : ""}`, icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeSubTab === tab.id
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

      {/* ---------------- SUB-TAB 1: सूचना तथा घोषणा व्यवस्थापन (Notices) ---------------- */}
      {activeSubTab === "notices" && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>
              यहाँबाट कुनै पनि जरुरी सूचना, स्वास्थ्य शिविर वा प्रेस विज्ञप्ति <strong>सिधै पोस्ट</strong> गर्न सक्नुहुन्छ। पोस्ट भएका सूचनाहरू मुख्य पृष्ठको सूचना बोर्डमा तुरुन्तै प्रदर्शित हुनेछन्।
            </p>
            <button
              onClick={openAddNoticeModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ सूचना पोस्ट गर्नुहोस्</span>
            </button>
          </div>

          {/* Notices List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {notice.category}
                    </span>
                    {notice.isUrgent && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-100 text-red-700 uppercase">
                        🚨 जरुरी
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-snug">
                    {notice.titleNp}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {notice.contentNp}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {notice.publishDate}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditNoticeModal(notice)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-50 transition-colors"
                      title="सम्पादन गर्नुहोस्"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingNotice(notice)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="मेटाउनुहोस्"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 2: भिजन, मिसन र उद्देश्य (Vision & Mission) ---------------- */}
      {activeSubTab === "visionMission" && (
        <form onSubmit={handleSaveVisionMission} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">दूरदृष्टि र ध्येय (Vision & Mission) सम्पादन</h3>
              <p className="text-xs text-slate-500">यहाँ परिवर्तन गरिएको टेक्स्ट वेबसाइटको ‘हाम्रो बारेमा’ (About) पृष्ठमा तुरुन्त देखिनेछ।</p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>सेभ गर्नुहोस्</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                दूरदृष्टि (Vision) - नेपाली
              </label>
              <textarea
                rows={4}
                value={vmVisionNp}
                onChange={(e) => setVmVisionNp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
                placeholder="नेपालका सम्पूर्ण हेमोफिलिया तथा रक्त विकार..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Vision - English
              </label>
              <textarea
                rows={4}
                value={vmVisionEn}
                onChange={(e) => setVmVisionEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
                placeholder="A future where every individual with a bleeding disorder..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                ध्येय (Mission) - नेपाली
              </label>
              <textarea
                rows={4}
                value={vmMissionNp}
                onChange={(e) => setVmMissionNp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
                placeholder="निःशुल्क फ्याक्टर प्रतिस्थापन, विकेन्द्रीकृत प्रयोगशाला..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Mission - English
              </label>
              <textarea
                rows={4}
                value={vmMissionEn}
                onChange={(e) => setVmMissionEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
                placeholder="To decentralize specialized coagulation diagnosis..."
              />
            </div>
          </div>
        </form>
      )}

      {/* ---------------- SUB-TAB 3: मुख्य पृष्ठ टेक्स्ट सम्पादन (Homepage Texts) ---------------- */}
      {activeSubTab === "homepage" && (
        <form onSubmit={handleSaveHomepage} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">मुख्य पृष्ठका हेडलाइन र सूचना टेक्स्ट</h3>
              <p className="text-xs text-slate-500">हेरो ब्यानर, आपतकालीन सम्पर्क नम्बर तथा मुख्य सन्देशहरू सम्पादन गर्नुहोस्।</p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>सेभ गर्नुहोस्</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">ट्यागलाइन बैज (Tagline Badge)</label>
                <input
                  type="text"
                  value={heroBadgeNp}
                  onChange={(e) => setHeroBadgeNp(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">वीर अस्पताल सम्पर्क (Bir Hospital Hotline)</label>
                <input
                  type="text"
                  value={emgBir}
                  onChange={(e) => setEmgBir(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">मुख्य हेडलाइन (Main Headline - नेपाली)</label>
              <input
                type="text"
                value={heroTitleNp}
                onChange={(e) => setHeroTitleNp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">उपशीर्षक / मुख्य विवरण (Subtitle - नेपाली)</label>
              <textarea
                rows={3}
                value={heroSubtitleNp}
                onChange={(e) => setHeroSubtitleNp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">२४/७ हटलाइन १ (Hotline 1)</label>
                <input
                  type="text"
                  value={emgHotline1}
                  onChange={(e) => setEmgHotline1(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">२४/७ हटलाइन २ (Hotline 2)</label>
                <input
                  type="text"
                  value={emgHotline2}
                  onChange={(e) => setEmgHotline2(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ---------------- SUB-TAB 4: फिचर अन/अफ नियन्त्रण (Feature Visibility Toggles) ---------------- */}
      {activeSubTab === "features" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Super Admin Exclusive Feature Control</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">वेबसाइटका प्रमुख फिचरहरू अन/अफ गर्नुहोस्</h3>
              <p className="text-xs text-slate-500">
                कुनै फिचर हाललाई नचाहिने भएमा स्विच <strong>बन्द (OFF)</strong> गरेपछि सो फिचर सम्पूर्ण वेबसाइटबाट तुरुन्तै हट्नेछ/लुक्नेछ।
              </p>
            </div>
          </div>

          {!isSuperAdmin && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>फिचर हटाउने वा अन/अफ गर्ने अधिकार केवल <strong>SUPER_ADMIN</strong> लाई मात्र छ। अन्य एडमिनहरूका लागि यो सेक्सन केवल हेराइमा सीमित छ।</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featureList.map((item) => {
              const Icon = item.icon;
              const isEnabled = !!features[item.key];
              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-3xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                    isEnabled ? "bg-slate-50/60 border-slate-200" : "bg-red-50/20 border-red-200/60 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-2xl ${isEnabled ? "bg-primary-50 text-primary" : "bg-slate-200 text-slate-500"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded ${isEnabled ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"}`}>
                        स्थिति: {isEnabled ? "सक्रिय (Visible Online)" : "बन्द / लुकाइएको (Hidden)"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!isSuperAdmin || saving}
                    onClick={() => toggleFeature(item.key, !isEnabled)}
                    className={`shrink-0 p-1.5 rounded-2xl transition-all ${
                      isEnabled ? "text-emerald-600 hover:text-emerald-700" : "text-slate-400 hover:text-slate-600"
                    } ${!isSuperAdmin ? "cursor-not-allowed opacity-50" : ""}`}
                    title={isSuperAdmin ? (isEnabled ? "यो फिचर बन्द गर्नुहोस्" : "यो फिचर चालु गर्नुहोस्") : "केवल सुपर एडमिनले मात्र परिवर्तन गर्न सक्छ"}
                  >
                    {isEnabled ? (
                      <ToggleRight className="w-9 h-9" />
                    ) : (
                      <ToggleLeft className="w-9 h-9" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notice Add/Edit Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block">
                  सूचना व्यवस्थापन
                </span>
                <h3 className="text-lg font-bold text-white">
                  {editingNotice ? "सूचना सम्पादन गर्नुहोस्" : "नयाँ सूचना पोस्ट गर्नुहोस्"}
                </h3>
              </div>
              <button
                onClick={() => setIsNoticeModalOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">सूचनाको शीर्षक (Title - नेपाली) *</label>
                <input
                  type="text"
                  required
                  value={noticeTitleNp}
                  onChange={(e) => setNoticeTitleNp(e.target.value)}
                  placeholder="सूचनाको मुख्य शीर्षक लेख्नुहोस्..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">श्रेणी (Category)</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="सूचना">सूचना</option>
                    <option value="कार्यक्रम">कार्यक्रम</option>
                    <option value="आपतकालीन">आपतकालीन</option>
                    <option value="प्रेस विज्ञप्ति">प्रेस विज्ञप्ति</option>
                    <option value="सेवा">सेवा</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">प्रकाशन मिति (Date)</label>
                  <input
                    type="date"
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">सूचनाको पूर्ण विवरण (Content) *</label>
                <textarea
                  rows={4}
                  required
                  value={noticeContentNp}
                  onChange={(e) => setNoticeContentNp(e.target.value)}
                  placeholder="सूचना सम्बन्धी विस्तृत जानकारी यहाँ राख्नुहोस्..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentToggle"
                  checked={noticeIsUrgent}
                  onChange={(e) => setNoticeIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                />
                <label htmlFor="urgentToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                  यसलाई ‘अत्यन्त जरुरी’ (Urgent Alert) को रूपमा देखाउने
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  रद्द गर्नुहोस्
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 shadow"
                >
                  {saving ? "Saving..." : editingNotice ? "अपडेट गर्नुहोस्" : "पोस्ट गर्नुहोस्"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Notice Confirmation Modal */}
      {deletingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                के तपाईं यो सूचना हटाउन निश्चित हुनुहुन्छ?
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                "{deletingNotice.titleNp}"
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingNotice(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="button"
                onClick={handleDeleteNotice}
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 shadow"
              >
                {saving ? "हटाउँदै..." : "हटाउनुहोस् (Delete)"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
