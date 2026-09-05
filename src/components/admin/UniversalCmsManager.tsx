"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  NewsArticle, 
  EventItem, 
  ResourceItem, 
  TreatmentCentre, 
  ProvinceName 
} from "@/types";
import { 
  ProvincialChapter, 
  MedicalAdvisor, 
  GlobalWebsiteSettings, 
  ContentStatus 
} from "@/types/cms";
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  MapPin, 
  Building2, 
  Stethoscope, 
  Settings, 
  Trash2, 
  Plus, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff, 
  Archive, 
  RotateCcw, 
  Search, 
  ExternalLink,
  ShieldAlert,
  Phone,
  Mail,
  HelpCircle,
  Sparkles,
  Heart
} from "lucide-react";

export function UniversalCmsManager() {
  const { role } = useAuth();
  const { isNepali } = useLanguage();
  const {
    newsArticles,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    resources,
    addResource,
    updateResource,
    deleteResource,
    treatmentCentres,
    addTreatmentCentre,
    updateTreatmentCentre,
    deleteTreatmentCentre,
    chapters,
    addChapter,
    updateChapter,
    deleteChapter,
    advisors,
    addAdvisor,
    updateAdvisor,
    deleteAdvisor,
    globalSettings,
    updateGlobalSettings,
    fetchCmsData,
    loadingCms
  } = useData();

  // Active module tab
  const [activeTab, setActiveTab] = useState<
    "news" | "events" | "resources" | "centres" | "chapters" | "advisors" | "settings" | "trash"
  >("news");

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get("sub");
      const tab = params.get("tab");
      if (tab === "trash" || sub === "trash") setActiveTab("trash");
      else if (sub === "events") setActiveTab("events");
      else if (sub === "resources") setActiveTab("resources");
      else if (sub === "centres") setActiveTab("centres");
      else if (sub === "chapters") setActiveTab("chapters");
      else if (sub === "advisors") setActiveTab("advisors");
      else if (sub === "settings") setActiveTab("settings");
      else if (sub === "news") setActiveTab("news");
    }
  }, []);

  const isSuperAdmin = role === "SUPER_ADMIN";

  // General Notification state
  const [statusMessage, setStatusMessage] = useState<{ type: "idle" | "success" | "error" | "loading"; text?: string }>({ type: "idle" });
  const showMessage = (type: "success" | "error" | "loading", text: string) => {
    setStatusMessage({ type, text });
    if (type !== "loading") {
      setTimeout(() => setStatusMessage({ type: "idle" }), 4000);
    }
  };

  // Search filter inside active tab
  const [searchQuery, setSearchQuery] = useState("");

  // ==========================================
  // NEWS MODAL & EDIT STATE
  // ==========================================
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newsTitleEn, setNewsTitleEn] = useState("");
  const [newsTitleNp, setNewsTitleNp] = useState("");
  const [newsSummaryEn, setNewsSummaryEn] = useState("");
  const [newsSummaryNp, setNewsSummaryNp] = useState("");
  const [newsContentEn, setNewsContentEn] = useState("");
  const [newsContentNp, setNewsContentNp] = useState("");
  const [newsCategory, setNewsCategory] = useState<any>("Society News");
  const [newsAuthorEn, setNewsAuthorEn] = useState("NHS Secretariat");
  const [newsAuthorNp, setNewsAuthorNp] = useState("एन.एच.एस. सचिवालय");
  const [newsImage, setNewsImage] = useState("");
  const [newsTags, setNewsTags] = useState("NHS, Hemophilia");
  const [newsStatus, setNewsStatus] = useState<ContentStatus>("Published");
  const [uploadingImage, setUploadingImage] = useState(false);

  const openAddNewsModal = () => {
    setEditingNews(null);
    setNewsTitleEn("");
    setNewsTitleNp("");
    setNewsSummaryEn("");
    setNewsSummaryNp("");
    setNewsContentEn("");
    setNewsContentNp("");
    setNewsCategory("Society News");
    setNewsAuthorEn("NHS Central Secretariat");
    setNewsAuthorNp("एन.एच.एस. केन्द्रीय सचिवालय");
    setNewsImage("https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80");
    setNewsTags("NHS, Hemophilia, Care");
    setNewsStatus("Published");
    setIsNewsModalOpen(true);
  };

  const openEditNewsModal = (article: NewsArticle) => {
    setEditingNews(article);
    setNewsTitleEn(article.title.en);
    setNewsTitleNp(article.title.np || article.title.en);
    setNewsSummaryEn(article.summary.en);
    setNewsSummaryNp(article.summary.np || article.summary.en);
    setNewsContentEn(article.content?.en || article.summary.en);
    setNewsContentNp(article.content?.np || article.summary.np || article.summary.en);
    setNewsCategory(article.category);
    setNewsAuthorEn(article.author?.en || "NHS Secretariat");
    setNewsAuthorNp(article.author?.np || "एन.एच.एस. सचिवालय");
    setNewsImage(article.featuredImage);
    setNewsTags(article.tags?.join(", ") || "NHS");
    setNewsStatus((article as any).status || "Published");
    setIsNewsModalOpen(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleEn.trim() && !newsTitleNp.trim()) return;

    showMessage("loading", "समाचार सेभ हुँदैछ...");

    const tagsArray = newsTags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingNews) {
      const ok = await updateNewsArticle(editingNews.id, {
        title: { en: newsTitleEn, np: newsTitleNp || newsTitleEn },
        summary: { en: newsSummaryEn, np: newsSummaryNp || newsSummaryEn },
        content: { en: newsContentEn, np: newsContentNp || newsContentEn },
        category: newsCategory,
        author: { en: newsAuthorEn, np: newsAuthorNp },
        featuredImage: newsImage,
        tags: tagsArray,
        status: newsStatus
      } as any);
      if (ok) {
        showMessage("success", "✓ समाचार सफलतापूर्वक अद्यावधिक भयो।");
        setIsNewsModalOpen(false);
      } else {
        showMessage("error", "समाचार अपडेट गर्न सकिएन।");
      }
    } else {
      const slug = newsTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `news-${Date.now()}`;
      const ok = await addNewsArticle({
        id: `news-${Date.now()}`,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        title: { en: newsTitleEn, np: newsTitleNp || newsTitleEn },
        summary: { en: newsSummaryEn, np: newsSummaryNp || newsSummaryEn },
        content: { en: newsContentEn || newsSummaryEn, np: newsContentNp || newsSummaryNp || newsSummaryEn },
        category: newsCategory,
        author: { en: newsAuthorEn, np: newsAuthorNp },
        publishedDate: new Date().toISOString().split("T")[0],
        featuredImage: newsImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
        readTime: "3 min read",
        tags: tagsArray,
        status: newsStatus
      } as any);
      if (ok) {
        showMessage("success", "✓ नयाँ समाचार सफलतापूर्वक प्रकाशित भयो।");
        setIsNewsModalOpen(false);
      } else {
        showMessage("error", "समाचार प्रकाशित गर्न सकिएन।");
      }
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-user-role": role,
        },
        body: formData
      });

      const json = await res.json();
      if (res.ok && json.success && json.url) {
        setter(json.url);
        showMessage("success", "✓ तस्बिर सफलतापूर्वक अपलोड भयो।");
      } else {
        showMessage("error", json.message || "तस्बिर अपलोड असफल भयो।");
      }
    } catch (err: any) {
      showMessage("error", err.message || "तस्बिर अपलोड गर्न सकिएन।");
    } finally {
      setUploadingImage(false);
    }
  };

  // ==========================================
  // EVENTS MODAL & STATE
  // ==========================================
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [evtTitleEn, setEvtTitleEn] = useState("");
  const [evtTitleNp, setEvtTitleNp] = useState("");
  const [evtDescEn, setEvtDescEn] = useState("");
  const [evtDescNp, setEvtDescNp] = useState("");
  const [evtDate, setEvtDate] = useState(new Date().toISOString().split("T")[0]);
  const [evtTime, setEvtTime] = useState("10:00 AM - 4:00 PM NPT");
  const [evtLocEn, setEvtLocEn] = useState("Kathmandu, Nepal");
  const [evtLocNp, setEvtLocNp] = useState("काठमाडौं, नेपाल");
  const [evtCategory, setEvtCategory] = useState<any>("Conference");
  const [evtImage, setEvtImage] = useState("");
  const [evtOrganizer, setEvtOrganizer] = useState("Nepal Hemophilia Society");
  const [evtCapacity, setEvtCapacity] = useState(150);
  const [evtStatus, setEvtStatus] = useState<ContentStatus>("Published");

  const openAddEventModal = () => {
    setEditingEvent(null);
    setEvtTitleEn("");
    setEvtTitleNp("");
    setEvtDescEn("");
    setEvtDescNp("");
    setEvtDate(new Date().toISOString().split("T")[0]);
    setEvtTime("10:00 AM - 4:00 PM NPT");
    setEvtLocEn("Kathmandu, Nepal");
    setEvtLocNp("काठमाडौं, नेपाल");
    setEvtCategory("Conference");
    setEvtImage("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
    setEvtOrganizer("Nepal Hemophilia Society");
    setEvtCapacity(150);
    setEvtStatus("Published");
    setIsEventModalOpen(true);
  };

  const openEditEventModal = (evt: EventItem) => {
    setEditingEvent(evt);
    setEvtTitleEn(evt.title.en);
    setEvtTitleNp(evt.title.np || evt.title.en);
    setEvtDescEn(evt.description.en);
    setEvtDescNp(evt.description.np || evt.description.en);
    setEvtDate(evt.date);
    setEvtTime(evt.time);
    setEvtLocEn(evt.location.en);
    setEvtLocNp(evt.location.np || evt.location.en);
    setEvtCategory(evt.category);
    setEvtImage((evt as any).featuredImage || evt.image || "");
    setEvtOrganizer(typeof evt.organizer === "string" ? evt.organizer : (evt.organizer?.en || "Nepal Hemophilia Society"));
    setEvtCapacity((evt as any).maxCapacity || evt.attendeesCount || 150);
    setEvtStatus((evt as any).status || "Published");
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("loading", "कार्यक्रम सेभ हुँदैछ...");

    if (editingEvent) {
      const ok = await updateEvent(editingEvent.id, {
        title: { en: evtTitleEn, np: evtTitleNp || evtTitleEn },
        description: { en: evtDescEn, np: evtDescNp || evtDescNp },
        date: evtDate,
        time: evtTime,
        location: { en: evtLocEn, np: evtLocNp || evtLocEn },
        category: evtCategory,
        featuredImage: evtImage,
        organizer: evtOrganizer,
        maxCapacity: evtCapacity,
        status: evtStatus
      } as any);
      if (ok) {
        showMessage("success", "✓ कार्यक्रम सफलतापूर्वक अद्यावधिक भयो।");
        setIsEventModalOpen(false);
      } else {
        showMessage("error", "कार्यक्रम अपडेट गर्न सकिएन।");
      }
    } else {
      const ok = await addEvent({
        id: `evt-${Date.now()}`,
        title: { en: evtTitleEn, np: evtTitleNp || evtTitleEn },
        description: { en: evtDescEn, np: evtDescNp || evtDescNp },
        date: evtDate,
        time: evtTime,
        location: { en: evtLocEn, np: evtLocNp || evtLocEn },
        category: evtCategory,
        featuredImage: evtImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        organizer: evtOrganizer,
        attendeesCount: 0,
        maxCapacity: evtCapacity,
        registrationRequired: true,
        isOnline: false,
        status: evtStatus
      } as any);
      if (ok) {
        showMessage("success", "✓ नयाँ कार्यक्रम सफलतापूर्वक थपियो।");
        setIsEventModalOpen(false);
      } else {
        showMessage("error", "कार्यक्रम थप्न सकिएन।");
      }
    }
  };

  // ==========================================
  // TREATMENT CENTRES MODAL & STATE
  // ==========================================
  const [isCentreModalOpen, setIsCentreModalOpen] = useState(false);
  const [editingCentre, setEditingCentre] = useState<TreatmentCentre | null>(null);
  const [tcNameEn, setTcNameEn] = useState("");
  const [tcNameNp, setTcNameNp] = useState("");
  const [tcType, setTcType] = useState<any>("Provincial Referral");
  const [tcProvince, setTcProvince] = useState<ProvinceName>("Bagmati");
  const [tcDistrict, setTcDistrict] = useState("Kathmandu");
  const [tcCity, setTcCity] = useState("Kathmandu");
  const [tcAddressEn, setTcAddressEn] = useState("");
  const [tcAddressNp, setTcAddressNp] = useState("");
  const [tcPhone, setTcPhone] = useState("+977-1-4221119");
  const [tcDoctorEn, setTcDoctorEn] = useState("");
  const [tcDoctorNp, setTcDoctorNp] = useState("");
  const [tcHasFactor, setTcHasFactor] = useState(true);
  const [tcHasPhysio, setTcHasPhysio] = useState(true);
  const [tcStatus, setTcStatus] = useState<ContentStatus>("Published");

  const openAddCentreModal = () => {
    setEditingCentre(null);
    setTcNameEn("");
    setTcNameNp("");
    setTcType("Provincial Referral");
    setTcProvince("Bagmati");
    setTcDistrict("");
    setTcCity("");
    setTcAddressEn("");
    setTcAddressNp("");
    setTcPhone("+977-1-4221119");
    setTcDoctorEn("");
    setTcDoctorNp("");
    setTcHasFactor(true);
    setTcHasPhysio(true);
    setTcStatus("Published");
    setIsCentreModalOpen(true);
  };

  const openEditCentreModal = (c: TreatmentCentre) => {
    setEditingCentre(c);
    setTcNameEn(c.name.en);
    setTcNameNp(c.name.np || c.name.en);
    setTcType(c.hospitalType);
    setTcProvince(c.province);
    setTcDistrict(c.district);
    setTcCity(c.city);
    setTcAddressEn(c.address.en);
    setTcAddressNp(c.address.np || c.address.en);
    setTcPhone(c.phone);
    setTcDoctorEn(c.hematologistInCharge.en);
    setTcDoctorNp(c.hematologistInCharge.np || c.hematologistInCharge.en);
    setTcHasFactor(c.hasFactorStorage);
    setTcHasPhysio(c.hasPhysiotherapy);
    setTcStatus((c as any).status || "Published");
    setIsCentreModalOpen(true);
  };

  const handleSaveCentre = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("loading", "उपचार केन्द्र सेभ हुँदैछ...");

    const centreData: Partial<TreatmentCentre> = {
      name: { en: tcNameEn, np: tcNameNp || tcNameEn },
      hospitalType: tcType,
      province: tcProvince,
      district: tcDistrict || "District",
      city: tcCity || "City",
      address: { en: tcAddressEn || tcCity, np: tcAddressNp || tcAddressEn || tcCity },
      phone: tcPhone,
      hematologistInCharge: { en: tcDoctorEn || "Medical Team", np: tcDoctorNp || "स्वास्थ्य टोली" },
      hasFactorStorage: tcHasFactor,
      hasPhysiotherapy: tcHasPhysio,
      has24Emergency: true,
      hasCoagulationLab: true,
      services: ["Factor Replacement", "Emergency Care"],
      isOfficialPartner: true,
      status: tcStatus
    } as any;

    if (editingCentre) {
      const ok = await updateTreatmentCentre(editingCentre.id, centreData);
      if (ok) {
        showMessage("success", "✓ उपचार केन्द्र विवरण अद्यावधिक भयो।");
        setIsCentreModalOpen(false);
      } else {
        showMessage("error", "उपचार केन्द्र अपडेट गर्न सकिएन।");
      }
    } else {
      const ok = await addTreatmentCentre({
        id: `tc-${Date.now()}`,
        ...centreData
      } as TreatmentCentre);
      if (ok) {
        showMessage("success", "✓ नयाँ उपचार केन्द्र थपियो।");
        setIsCentreModalOpen(false);
      } else {
        showMessage("error", "उपचार केन्द्र थप्न सकिएन।");
      }
    }
  };

  // ==========================================
  // PROVINCIAL CHAPTERS MODAL & STATE
  // ==========================================
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<ProvincialChapter | null>(null);
  const [chProvNp, setChProvNp] = useState("");
  const [chProvEn, setChProvEn] = useState("");
  const [chCityNp, setChCityNp] = useState("");
  const [chCityEn, setChCityEn] = useState("");
  const [chCoordNp, setChCoordNp] = useState("");
  const [chCoordEn, setChCoordEn] = useState("");
  const [chPhone, setChPhone] = useState("");
  const [chEmail, setChEmail] = useState("");
  const [chHospNp, setChHospNp] = useState("");
  const [chHospEn, setChHospEn] = useState("");

  const openAddChapterModal = () => {
    setEditingChapter(null);
    setChProvNp("");
    setChProvEn("");
    setChCityNp("");
    setChCityEn("");
    setChCoordNp("");
    setChCoordEn("");
    setChPhone("+977-");
    setChEmail("info@hemophilia-nepal.org.np");
    setChHospNp("");
    setChHospEn("");
    setIsChapterModalOpen(true);
  };

  const openEditChapterModal = (ch: ProvincialChapter) => {
    setEditingChapter(ch);
    setChProvNp(ch.provinceNameNp);
    setChProvEn(ch.provinceNameEn);
    setChCityNp(ch.cityNp);
    setChCityEn(ch.cityEn);
    setChCoordNp(ch.coordinatorNameNp);
    setChCoordEn(ch.coordinatorNameEn);
    setChPhone(ch.phone);
    setChEmail(ch.email);
    setChHospNp(ch.partnerHospitalNp);
    setChHospEn(ch.partnerHospitalEn);
    setIsChapterModalOpen(true);
  };

  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("loading", "शाखा विवरण सेभ हुँदैछ...");

    const payload = {
      provinceNameNp: chProvNp,
      provinceNameEn: chProvEn,
      cityNp: chCityNp,
      cityEn: chCityEn,
      coordinatorNameNp: chCoordNp,
      coordinatorNameEn: chCoordEn,
      phone: chPhone,
      email: chEmail,
      partnerHospitalNp: chHospNp,
      partnerHospitalEn: chHospEn,
      addressNp: `${chCityNp}, ${chProvNp}`,
      addressEn: `${chCityEn}, ${chProvEn}`
    };

    if (editingChapter) {
      const ok = await updateChapter(editingChapter.id, payload);
      if (ok) {
        showMessage("success", "✓ प्रादेशिक शाखा विवरण अद्यावधिक भयो।");
        setIsChapterModalOpen(false);
      } else {
        showMessage("error", "शाखा विवरण अपडेट गर्न सकिएन।");
      }
    } else {
      const ok = await addChapter(payload);
      if (ok) {
        showMessage("success", "✓ नयाँ प्रादेशिक शाखा थपियो।");
        setIsChapterModalOpen(false);
      } else {
        showMessage("error", "शाखा थप्न सकिएन।");
      }
    }
  };

  // ==========================================
  // MEDICAL ADVISORS MODAL & STATE
  // ==========================================
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<MedicalAdvisor | null>(null);
  const [advNameNp, setAdvNameNp] = useState("");
  const [advNameEn, setAdvNameEn] = useState("");
  const [advTitleNp, setAdvTitleNp] = useState("");
  const [advTitleEn, setAdvTitleEn] = useState("");
  const [advInstNp, setAdvInstNp] = useState("");
  const [advInstEn, setAdvInstEn] = useState("");
  const [advPhoto, setAdvPhoto] = useState("");
  const [advBioNp, setAdvBioNp] = useState("");
  const [advBioEn, setAdvBioEn] = useState("");

  const openAddAdvisorModal = () => {
    setEditingAdvisor(null);
    setAdvNameNp("");
    setAdvNameEn("");
    setAdvTitleNp("वरिष्ठ हेमाटोलोजिस्ट");
    setAdvTitleEn("Senior Consultant Hematologist");
    setAdvInstNp("");
    setAdvInstEn("");
    setAdvPhoto("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80");
    setAdvBioNp("");
    setAdvBioEn("");
    setIsAdvisorModalOpen(true);
  };

  const openEditAdvisorModal = (adv: MedicalAdvisor) => {
    setEditingAdvisor(adv);
    setAdvNameNp(adv.nameNp);
    setAdvNameEn(adv.nameEn);
    setAdvTitleNp(adv.titleNp);
    setAdvTitleEn(adv.titleEn);
    setAdvInstNp(adv.institutionNp);
    setAdvInstEn(adv.institutionEn);
    setAdvPhoto(adv.photo || "");
    setAdvBioNp(adv.bioNp || "");
    setAdvBioEn(adv.bioEn || "");
    setIsAdvisorModalOpen(true);
  };

  const handleSaveAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("loading", "सल्लाहकार विवरण सेभ हुँदैछ...");

    const payload = {
      nameNp: advNameNp,
      nameEn: advNameEn,
      titleNp: advTitleNp,
      titleEn: advTitleEn,
      institutionNp: advInstNp,
      institutionEn: advInstEn,
      photo: advPhoto,
      bioNp: advBioNp,
      bioEn: advBioEn
    };

    if (editingAdvisor) {
      const ok = await updateAdvisor(editingAdvisor.id, payload);
      if (ok) {
        showMessage("success", "✓ सल्लाहकार विवरण अद्यावधिक भयो।");
        setIsAdvisorModalOpen(false);
      } else {
        showMessage("error", "सल्लाहकार विवरण अपडेट गर्न सकिएन।");
      }
    } else {
      const ok = await addAdvisor(payload);
      if (ok) {
        showMessage("success", "✓ नयाँ सल्लाहकार थपियो।");
        setIsAdvisorModalOpen(false);
      } else {
        showMessage("error", "सल्लाहकार थप्न सकिएन।");
      }
    }
  };

  // ==========================================
  // RECYCLE BIN / TRASH STATE
  // ==========================================
  const [trashData, setTrashData] = useState<any>({ news: [], events: [], resources: [], centres: [], chapters: [], advisors: [] });
  const [loadingTrash, setLoadingTrash] = useState(false);

  const fetchTrash = async () => {
    try {
      setLoadingTrash(true);
      const res = await fetch("/api/cms/trash", {
        headers: { "x-user-role": role }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setTrashData(json.data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTrash(false);
    }
  };

  useEffect(() => {
    if (activeTab === "trash") {
      fetchTrash();
    }
  }, [activeTab]);

  const handleRestore = async (type: string, id: string) => {
    showMessage("loading", "पुनर्स्थापना गरिँदैछ...");
    try {
      const res = await fetch("/api/cms/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-role": role },
        body: JSON.stringify({ type, id })
      });
      if (res.ok) {
        showMessage("success", "✓ सामग्री सफलतापूर्वक रिस्टोर गरियो।");
        await fetchTrash();
        await fetchCmsData();
      }
    } catch (e) {
      showMessage("error", "रिस्टोर गर्न सकिएन।");
    }
  };

  const handlePermanentDelete = async (type: string, id: string) => {
    if (!confirm("⚠️ के तपाईं यो सामग्री स्थायी रूपमा मेटाउन निश्चित हुनुहुन्छ? यो कार्य उल्टाउन सकिने छैन।")) {
      return;
    }
    showMessage("loading", "स्थायी रूपमा मेटाइँदैछ...");
    try {
      const res = await fetch("/api/cms/trash", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-user-role": role },
        body: JSON.stringify({ type, id })
      });
      if (res.ok) {
        showMessage("success", "✓ सामग्री स्थायी रूपमा नष्ट गरियो।");
        await fetchTrash();
        await fetchCmsData();
      }
    } catch (e) {
      showMessage("error", "मेटाउन सकिएन।");
    }
  };

  // ==========================================
  // WEBSITE SETTINGS LOCAL FORM STATE
  // ==========================================
  const [stNameNp, setStNameNp] = useState(globalSettings?.websiteNameNp || "नेपाल हेमोफिलिया सोसाइटी");
  const [stNameEn, setStNameEn] = useState(globalSettings?.websiteNameEn || "Nepal Hemophilia Society");
  const [stPhone, setStPhone] = useState(globalSettings?.primaryPhone || "+977-1-4221119");
  const [stEmergency, setStEmergency] = useState(globalSettings?.emergencyPhone || "+977-9851000000");
  const [stEmail, setStEmail] = useState(globalSettings?.email || "info@hemophilia-nepal.org.np");
  const [stAddressNp, setStAddressNp] = useState(globalSettings?.officeAddressNp || "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)");
  const [stAddressEn, setStAddressEn] = useState(globalSettings?.officeAddressEn || "Kathmandu, Nepal (Central Secretariat)");
  const [stHoursNp, setStHoursNp] = useState(globalSettings?.officeHoursNp || "आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००");
  const [stFacebook, setStFacebook] = useState(globalSettings?.facebookUrl || "https://facebook.com/nepalhemophiliasociety");
  const [stTwitter, setStTwitter] = useState(globalSettings?.twitterUrl || "https://twitter.com/hemophilia_nepal");
  const [stYoutube, setStYoutube] = useState(globalSettings?.youtubeUrl || "https://youtube.com/@nepalhemophilia");
  const [stSeoTitle, setStSeoTitle] = useState(globalSettings?.defaultSeoTitle || "Nepal Hemophilia Society");
  const [stSeoDesc, setStSeoDesc] = useState(globalSettings?.defaultSeoDescription || "");
  const [stDisclaimerNp, setStDisclaimerNp] = useState(globalSettings?.footerDisclaimerNp || "");

  useEffect(() => {
    if (globalSettings) {
      setStNameNp(globalSettings.websiteNameNp);
      setStNameEn(globalSettings.websiteNameEn);
      setStPhone(globalSettings.primaryPhone);
      setStEmergency(globalSettings.emergencyPhone);
      setStEmail(globalSettings.email);
      setStAddressNp(globalSettings.officeAddressNp);
      setStAddressEn(globalSettings.officeAddressEn);
      setStHoursNp(globalSettings.officeHoursNp);
      setStFacebook(globalSettings.facebookUrl);
      setStTwitter(globalSettings.twitterUrl);
      setStYoutube(globalSettings.youtubeUrl);
      setStSeoTitle(globalSettings.defaultSeoTitle);
      setStSeoDesc(globalSettings.defaultSeoDescription);
      setStDisclaimerNp(globalSettings.footerDisclaimerNp);
    }
  }, [globalSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    showMessage("loading", "सेटिङ सेभ हुँदैछ...");
    const ok = await updateGlobalSettings({
      websiteNameNp: stNameNp,
      websiteNameEn: stNameEn,
      primaryPhone: stPhone,
      emergencyPhone: stEmergency,
      email: stEmail,
      officeAddressNp: stAddressNp,
      officeAddressEn: stAddressEn,
      officeHoursNp: stHoursNp,
      facebookUrl: stFacebook,
      twitterUrl: stTwitter,
      youtubeUrl: stYoutube,
      defaultSeoTitle: stSeoTitle,
      defaultSeoDescription: stSeoDesc,
      footerDisclaimerNp: stDisclaimerNp
    });
    if (ok) {
      showMessage("success", "✓ वेबसाइट सेटिङहरू सफलतापूर्वक अद्यावधिक भए।");
    } else {
      showMessage("error", "सेटिङ अपडेट गर्न सकिएन।");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-slate-900 text-white p-6 sm:p-8 border-b border-primary-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wide">
              Central Content Management Hub
            </span>
            <span className="text-xs text-slate-300">पूर्ण वेबसाइट व्यवस्थापन</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            वेबसाइट कन्टेन्ट तथा सामग्री व्यवस्थापन प्रणाली (CMS)
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            यस प्यानलबाट कुनै पनि कोड नछोई समाचार, कार्यक्रम, स्रोत सामग्री, उपचार केन्द्र, प्रादेशिक शाखा र वेबसाइट सेटिङहरू सजिलै सम्पादन गर्न सकिन्छ।
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>वेबसाइट हेर्नुहोस्</span>
          </Link>
        </div>
      </div>

      {/* Global Status Toast */}
      {statusMessage.type !== "idle" && (
        <div
          className={`mx-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold transition-all shadow-md ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
              : statusMessage.type === "error"
              ? "bg-red-50 text-red-900 border border-red-300"
              : "bg-slate-900 text-white"
          }`}
        >
          {statusMessage.type === "loading" && <Loader2 className="w-4 h-4 animate-spin text-amber-400" />}
          {statusMessage.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {statusMessage.type === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="px-6 border-b border-slate-200">
        <div className="flex flex-wrap gap-2 pb-3">
          {[
            { id: "news", label: `📰 समाचार तथा कथाहरू (${newsArticles.length})`, count: newsArticles.length },
            { id: "events", label: `📅 कार्यक्रमहरू (${events.length})`, count: events.length },
            { id: "resources", label: `📚 रिसोर्स फाइलहरू (${resources.length})`, count: resources.length },
            { id: "centres", label: `🏥 उपचार केन्द्रहरू (${treatmentCentres.length})`, count: treatmentCentres.length },
            { id: "chapters", label: `📍 ७ प्रादेशिक शाखाहरू (${chapters.length})`, count: chapters.length },
            { id: "advisors", label: `🩺 मेडिकल सल्लाहकार (${advisors.length})`, count: advisors.length },
            { id: "settings", label: "🌐 वेबसाइट सेटिङ र सम्पर्क", count: null },
            { id: "trash", label: "🗑️ रिसाइकल बिन (Trash)", count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. NEWS & STORIES TAB */}
      {/* ========================================================================= */}
      {activeTab === "news" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">समाचार, विज्ञप्ति तथा बिरामीका अनुभवहरू</h3>
              <p className="text-xs text-slate-500">द्विभाषी (नेपाली र अंग्रेजी) शीर्षक, विवरण, क्याटगोरी र तस्बिर व्यवस्थापन गर्नुहोस्।</p>
            </div>
            <button
              onClick={openAddNewsModal}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ समाचार थप्नुहोस्</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">शीर्षक (Title)</th>
                  <th className="py-3 px-3">वर्ग (Category)</th>
                  <th className="py-3 px-3">मिति (Date)</th>
                  <th className="py-3 px-3">स्थिति (Status)</th>
                  <th className="py-3 px-3 text-right">कार्यहरू (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {newsArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 max-w-sm">
                      <div className="truncate">{art.title.np || art.title.en}</div>
                      <div className="text-[11px] text-slate-400 truncate">{art.title.en}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-bold text-[10px]">
                        {art.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{art.publishedDate}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        (art as any).status === "Draft"
                          ? "bg-amber-100 text-amber-800"
                          : (art as any).status === "Archived"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {(art as any).status || "Published"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => openEditNewsModal(art)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-[11px] font-bold transition-colors"
                      >
                        सम्पादन
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`के तपाईं "${art.title.np || art.title.en}" लाई मेटाउन निश्चित हुनुहुन्छ?`)) {
                            deleteNewsArticle(art.id);
                            showMessage("success", "✓ समाचार रिसाइकल बिनमा सारियो।");
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete to Trash"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. EVENTS TAB */}
      {/* ========================================================================= */}
      {activeTab === "events" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">सम्मेलन, शिविर तथा कार्यक्रम क्यालेन्डर</h3>
              <p className="text-xs text-slate-500">कार्यक्रमको मिति, समय, स्थान, दर्ता क्षमता र विवरण व्यवस्थापन गर्नुहोस्।</p>
            </div>
            <button
              onClick={openAddEventModal}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ कार्यक्रम थप्नुहोस्</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">कार्यक्रम (Title)</th>
                  <th className="py-3 px-3">मिति र समय</th>
                  <th className="py-3 px-3">स्थान (Location)</th>
                  <th className="py-3 px-3">वर्ग (Category)</th>
                  <th className="py-3 px-3 text-right">कार्यहरू (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 max-w-sm">
                      <div className="truncate">{evt.title.np || evt.title.en}</div>
                      <div className="text-[11px] text-slate-400 truncate">{evt.title.en}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-mono text-slate-700">{evt.date}</div>
                      <div className="text-[10px] text-slate-400">{evt.time}</div>
                    </td>
                    <td className="py-3 px-3">{evt.location.np || evt.location.en}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px]">
                        {evt.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => openEditEventModal(evt)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-[11px] font-bold transition-colors"
                      >
                        सम्पादन
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`के तपाईं "${evt.title.np || evt.title.en}" लाई हटाउन निश्चित हुनुहुन्छ?`)) {
                            deleteEvent(evt.id);
                            showMessage("success", "✓ कार्यक्रम रिसाइकल बिनमा सारियो।");
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TREATMENT CENTRES TAB */}
      {/* ========================================================================= */}
      {activeTab === "centres" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">उपचार केन्द्र तथा अस्पताल निर्देशिका</h3>
              <p className="text-xs text-slate-500">सातै प्रदेशका सरकारी तथा शिक्षण अस्पताल, सम्पर्क नम्बर, फ्याक्टर भण्डारण र चिकित्सक विवरण।</p>
            </div>
            <button
              onClick={openAddCentreModal}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ केन्द्र थप्नुहोस्</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">अस्पतालको नाम</th>
                  <th className="py-3 px-3">प्रदेश र जिल्ला</th>
                  <th className="py-3 px-3">सम्पर्क फोन</th>
                  <th className="py-3 px-3">फ्याक्टर स्टक</th>
                  <th className="py-3 px-3 text-right">कार्यहरू</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {treatmentCentres.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 max-w-sm">
                      <div className="truncate">{c.name.np || c.name.en}</div>
                      <div className="text-[11px] text-slate-400">{c.hospitalType}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-primary">{c.province}</span>
                      <span className="text-slate-400 text-[11px] block">{c.district}</span>
                    </td>
                    <td className="py-3 px-3 font-mono">{c.phone}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        c.hasFactorStorage ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {c.hasFactorStorage ? "उपलब्ध छ" : "सीमित"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => openEditCentreModal(c)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded-lg text-[11px] font-bold transition-colors"
                      >
                        सम्पादन
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`के तपाईं "${c.name.np || c.name.en}" लाई हटाउन निश्चित हुनुहुन्छ?`)) {
                            deleteTreatmentCentre(c.id);
                            showMessage("success", "✓ उपचार केन्द्र हटाइयो।");
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PROVINCIAL CHAPTERS TAB */}
      {/* ========================================================================= */}
      {activeTab === "chapters" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">७ प्रादेशिक शाखाहरूको सञ्जाल</h3>
              <p className="text-xs text-slate-500">प्रत्येक प्रदेशका सम्पर्क कार्यालय, संयोजक, सम्पर्क फोन, इमेल र साझेदार अस्पताल।</p>
            </div>
            <button
              onClick={openAddChapterModal}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ शाखा थप्नुहोस्</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((ch) => (
              <div key={ch.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{ch.provinceNameNp}</h4>
                    <span className="text-[11px] text-slate-500">{ch.provinceNameEn}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold text-[10px]">
                    {ch.cityNp || ch.cityEn}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div><strong>संयोजक:</strong> {ch.coordinatorNameNp || ch.coordinatorNameEn}</div>
                  <div><strong>सम्पर्क:</strong> <span className="font-mono">{ch.phone}</span></div>
                  <div><strong>इमेल:</strong> <span className="font-mono text-[11px]">{ch.email}</span></div>
                  <div className="text-[11px] text-slate-500"><strong>अस्पताल:</strong> {ch.partnerHospitalNp || ch.partnerHospitalEn}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => openEditChapterModal(ch)}
                    className="px-3 py-1 bg-white hover:bg-primary hover:text-white rounded-lg text-xs font-bold border border-slate-200 transition-colors"
                  >
                    सम्पादन
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`के तपाईं "${ch.provinceNameNp}" शाखालाई हटाउन निश्चित हुनुहुन्छ?`)) {
                        deleteChapter(ch.id);
                        showMessage("success", "✓ प्रादेशिक शाखा हटाइयो।");
                      }
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MEDICAL ADVISORS TAB */}
      {/* ========================================================================= */}
      {activeTab === "advisors" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">चिकित्सक तथा क्लिनिकल सल्लाहकार परिषद</h3>
              <p className="text-xs text-slate-500">नेपालका प्रमुख अस्पतालका हेमाटोलोजिस्ट, बाल रोग विशेषज्ञ तथा सल्लाहकारहरू।</p>
            </div>
            <button
              onClick={openAddAdvisorModal}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ नयाँ सल्लाहकार थप्नुहोस्</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisors.map((adv) => (
              <div key={adv.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img src={adv.photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"} alt={adv.nameEn} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{adv.nameNp || adv.nameEn}</h4>
                    <span className="text-[11px] text-primary font-semibold block">{adv.titleNp || adv.titleEn}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">{adv.institutionNp || adv.institutionEn}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => openEditAdvisorModal(adv)}
                    className="px-3 py-1 bg-slate-50 hover:bg-primary hover:text-white rounded-lg text-xs font-bold border border-slate-200 transition-colors"
                  >
                    सम्पादन
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`के तपाईं "${adv.nameNp || adv.nameEn}" लाई हटाउन निश्चित हुनुहुन्छ?`)) {
                        deleteAdvisor(adv.id);
                        showMessage("success", "✓ सल्लाहकार हटाइयो।");
                      }
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. WEBSITE SETTINGS & CONTACT */}
      {/* ========================================================================= */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="p-6 space-y-6 max-w-4xl">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">ग्लोबल वेबसाइट सेटिङ, सम्पर्क तथा फुटर विवरण</h3>
            <p className="text-xs text-slate-500">यहाँ गरिएको परिवर्तन सम्पूर्ण वेबसाइटको हेडर, फुटर र सम्पर्क पृष्ठमा तुरुन्त देखिन्छ।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">संस्थाको नाम (नेपाली)</label>
              <input
                type="text"
                value={stNameNp}
                onChange={(e) => setStNameNp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Organization Name (English)</label>
              <input
                type="text"
                value={stNameEn}
                onChange={(e) => setStNameEn(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">सचिवालय टेलिफोन नम्बर</label>
              <input
                type="text"
                value={stPhone}
                onChange={(e) => setStPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 text-red-600">२४/७ आकस्मिक हटलाइन (Emergency Phone)</label>
              <input
                type="text"
                value={stEmergency}
                onChange={(e) => setStEmergency(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-mono font-bold text-red-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">आधिकारिक इमेल</label>
              <input
                type="email"
                value={stEmail}
                onChange={(e) => setStEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">कार्यालय समय (Office Hours)</label>
              <input
                type="text"
                value={stHoursNp}
                onChange={(e) => setStHoursNp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">केन्द्रीय सचिवालय ठेगाना (नेपाली)</label>
              <input
                type="text"
                value={stAddressNp}
                onChange={(e) => setStAddressNp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Central Secretariat Address (English)</label>
              <input
                type="text"
                value={stAddressEn}
                onChange={(e) => setStAddressEn(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">फेसबुक लिङ्क (Facebook URL)</label>
              <input
                type="url"
                value={stFacebook}
                onChange={(e) => setStFacebook(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">युट्युब लिङ्क (YouTube URL)</label>
              <input
                type="url"
                value={stYoutube}
                onChange={(e) => setStYoutube(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Default SEO शीर्षक (Title Tag)</label>
              <input
                type="text"
                value={stSeoTitle}
                onChange={(e) => setStSeoTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">चिकित्सा अस्वीकरण (Footer Medical Disclaimer)</label>
              <textarea
                rows={3}
                value={stDisclaimerNp}
                onChange={(e) => setStDisclaimerNp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md"
            >
              ✓ सेटिङहरू सुरक्षित गर्नुहोस् (Save Settings)
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 7. RECYCLE BIN / TRASH TAB */}
      {/* ========================================================================= */}
      {activeTab === "trash" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">🗑️ रिसाइकल बिन (Recycle Bin / Soft Deleted Content)</h3>
              <p className="text-xs text-slate-500">गल्तीले हटाइएका सामग्रीहरू यहाँबाट पुनर्स्थापना (Restore) गर्न वा स्थायी रूपमा मेटाउन सकिन्छ।</p>
            </div>
            <button
              onClick={fetchTrash}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ताजा गर्नुहोस्</span>
            </button>
          </div>

          {loadingTrash ? (
            <div className="p-8 text-center text-xs text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
              <span>डिलिट गरिएका सामग्रीहरू लोड हुँदैछ...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Deleted News */}
              {trashData.news?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400">हटाइएका समाचारहरू ({trashData.news.length})</h4>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    {trashData.news.map((item: any) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-xs gap-3">
                        <span className="font-semibold text-slate-800 truncate">{item.title.np || item.title.en}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleRestore("news", item.id)}
                            className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] hover:bg-emerald-200"
                          >
                            पुनर्स्थापना (Restore)
                          </button>
                          <button
                            onClick={() => handlePermanentDelete("news", item.id)}
                            className="px-2.5 py-1 rounded bg-red-100 text-red-800 font-bold text-[11px] hover:bg-red-200"
                          >
                            स्थायी मेटाउनुहोस्
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deleted Events */}
              {trashData.events?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400">हटाइएका कार्यक्रमहरू ({trashData.events.length})</h4>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    {trashData.events.map((item: any) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-xs gap-3">
                        <span className="font-semibold text-slate-800 truncate">{item.title.np || item.title.en}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleRestore("events", item.id)}
                            className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] hover:bg-emerald-200"
                          >
                            पुनर्स्थापना (Restore)
                          </button>
                          <button
                            onClick={() => handlePermanentDelete("events", item.id)}
                            className="px-2.5 py-1 rounded bg-red-100 text-red-800 font-bold text-[11px] hover:bg-red-200"
                          >
                            स्थायी मेटाउनुहोस्
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deleted Centres */}
              {trashData.centres?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400">हटाइएका उपचार केन्द्रहरू ({trashData.centres.length})</h4>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    {trashData.centres.map((item: any) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-xs gap-3">
                        <span className="font-semibold text-slate-800 truncate">{item.name.np || item.name.en}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleRestore("centres", item.id)}
                            className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] hover:bg-emerald-200"
                          >
                            पुनर्स्थापना (Restore)
                          </button>
                          <button
                            onClick={() => handlePermanentDelete("centres", item.id)}
                            className="px-2.5 py-1 rounded bg-red-100 text-red-800 font-bold text-[11px] hover:bg-red-200"
                          >
                            स्थायी मेटाउनुहोस्
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!trashData.news?.length && !trashData.events?.length && !trashData.centres?.length && !trashData.chapters?.length) && (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  ✓ रिसाइकल बिन खाली छ। कुनै पनि सामग्री मेटाइएको छैन।
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS FOR ADDING / EDITING */}
      {/* ========================================================================= */}
      {/* 1. News Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveNews} className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-4 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingNews ? "समाचार सम्पादन गर्नुहोस्" : "नयाँ समाचार लेख सिर्जना गर्नुहोस्"}
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary-50 text-primary font-bold">
                CMS Editor
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">नेपाली शीर्षक (Nepali Title) *</label>
                <input
                  type="text"
                  required
                  value={newsTitleNp}
                  onChange={(e) => setNewsTitleNp(e.target.value)}
                  placeholder="समाचारको नेपाली शीर्षक..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Title *</label>
                <input
                  type="text"
                  required
                  value={newsTitleEn}
                  onChange={(e) => setNewsTitleEn(e.target.value)}
                  placeholder="Article English title..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">वर्ग (Category)</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                >
                  <option value="Society News">Society News (सोसाइटी समाचार)</option>
                  <option value="Medical Updates">Medical Updates (क्लिनिकल अपडेट)</option>
                  <option value="Patient Stories">Patient Stories (बिरामीका अनुभव)</option>
                  <option value="Advocacy">Advocacy (नीतिगत पैरवी)</option>
                  <option value="Press Releases">Press Releases (प्रेस विज्ञप्ति)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">प्रकाशन स्थिति (Status)</label>
                <select
                  value={newsStatus}
                  onChange={(e) => setNewsStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                >
                  <option value="Published">Published (तुरुन्त सार्वजनिक)</option>
                  <option value="Draft">Draft (ड्राफ्ट - सार्वजनिक नहुने)</option>
                  <option value="Archived">Archived (संग्रहित)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">फिचर्ड फोटो (Featured Image URL वा सिधै अपलोड)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newsImage}
                    onChange={(e) => setNewsImage(e.target.value)}
                    placeholder="https://... वा फाइल अपलोड गर्नुहोस्"
                    className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                  <label className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1 shrink-0 border border-slate-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "अपलोड हुँदै..." : "फोटो अपलोड"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setNewsImage)}
                    />
                  </label>
                </div>
                {newsImage && (
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-200 mt-1">
                    <img src={newsImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">नेपाली संक्षिप्त विवरण (Summary - Nepali)</label>
                <textarea
                  rows={2}
                  required
                  value={newsSummaryNp}
                  onChange={(e) => setNewsSummaryNp(e.target.value)}
                  placeholder="छोटो नेपाली सारांश..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">English Summary</label>
                <textarea
                  rows={2}
                  value={newsSummaryEn}
                  onChange={(e) => setNewsSummaryEn(e.target.value)}
                  placeholder="Short English summary..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">पूर्ण लेख सामग्री (Full Content - नेपाली)</label>
                <textarea
                  rows={4}
                  value={newsContentNp}
                  onChange={(e) => setNewsContentNp(e.target.value)}
                  placeholder="विस्तृत विवरण, अनुच्छेदहरू..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali leading-relaxed"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewsModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md"
              >
                ✓ समाचार सुरक्षित गर्नुहोस्
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Events Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveEvent} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingEvent ? "कार्यक्रम सम्पादन गर्नुहोस्" : "नयाँ कार्यक्रम थप्नुहोस्"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">कार्यक्रमको नेपाली शीर्षक *</label>
                <input
                  type="text"
                  required
                  value={evtTitleNp}
                  onChange={(e) => setEvtTitleNp(e.target.value)}
                  placeholder="कार्यक्रमको शीर्षक..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Event Title (English)</label>
                <input
                  type="text"
                  value={evtTitleEn}
                  onChange={(e) => setEvtTitleEn(e.target.value)}
                  placeholder="Title in English..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">मिति (Date)</label>
                <input
                  type="date"
                  required
                  value={evtDate}
                  onChange={(e) => setEvtDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">समय (Time)</label>
                <input
                  type="text"
                  value={evtTime}
                  onChange={(e) => setEvtTime(e.target.value)}
                  placeholder="उदा. 10:00 AM - 4:00 PM"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">स्थान (Location)</label>
                <input
                  type="text"
                  value={evtLocNp}
                  onChange={(e) => setEvtLocNp(e.target.value)}
                  placeholder="काठमाडौं / पोखरा / जुम मिटिङ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">विवरण (Description)</label>
                <textarea
                  rows={3}
                  value={evtDescNp}
                  onChange={(e) => setEvtDescNp(e.target.value)}
                  placeholder="कार्यक्रमको विस्तृत विवरण..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                ✓ कार्यक्रम सुरक्षित गर्नुहोस्
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. Treatment Centre Modal */}
      {isCentreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveCentre} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200 my-8">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              {editingCentre ? "उपचार केन्द्र सम्पादन गर्नुहोस्" : "नयाँ उपचार केन्द्र थप्नुहोस्"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">अस्पतालको नाम (नेपाली) *</label>
                <input
                  type="text"
                  required
                  value={tcNameNp}
                  onChange={(e) => setTcNameNp(e.target.value)}
                  placeholder="उदा. वीर अस्पताल / वि.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Hospital Name (English)</label>
                <input
                  type="text"
                  value={tcNameEn}
                  onChange={(e) => setTcNameEn(e.target.value)}
                  placeholder="Hospital name in English..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">प्रदेश (Province)</label>
                <select
                  value={tcProvince}
                  onChange={(e) => setTcProvince(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                >
                  <option value="Bagmati">बागमती प्रदेश (Bagmati)</option>
                  <option value="Gandaki">गण्डकी प्रदेश (Gandaki)</option>
                  <option value="Koshi">कोशी प्रदेश (Koshi)</option>
                  <option value="Lumbini">लुम्बिनी प्रदेश (Lumbini)</option>
                  <option value="Madhesh">मधेश प्रदेश (Madhesh)</option>
                  <option value="Karnali">कर्णाली प्रदेश (Karnali)</option>
                  <option value="Sudurpashchim">सुदूरपश्चिम प्रदेश (Sudurpashchim)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">जिल्ला / सहर (District / City)</label>
                <input
                  type="text"
                  value={tcDistrict}
                  onChange={(e) => setTcDistrict(e.target.value)}
                  placeholder="काठमाडौं / धरान / पोखरा"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">सम्पर्क टेलिफोन</label>
                <input
                  type="text"
                  value={tcPhone}
                  onChange={(e) => setTcPhone(e.target.value)}
                  placeholder="+977-..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">हेमाटोलोजिस्ट / सम्पर्क व्यक्ति</label>
                <input
                  type="text"
                  value={tcDoctorNp}
                  onChange={(e) => setTcDoctorNp(e.target.value)}
                  placeholder="डा. ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center gap-4 sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tcHasFactor}
                    onChange={(e) => setTcHasFactor(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span>फ्याक्टर भण्डारण उपलब्ध छ (Factor Storage Bank)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tcHasPhysio}
                    onChange={(e) => setTcHasPhysio(e.target.checked)}
                    className="w-4 h-4 rounded text-primary"
                  />
                  <span>फिजियोथेरापी सेवा (Physiotherapy Available)</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCentreModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                ✓ सुरक्षित गर्नुहोस्
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Chapters Modal */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveChapter} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200 my-8">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              {editingChapter ? "प्रादेशिक शाखा सम्पादन" : "नयाँ प्रादेशिक शाखा"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">प्रदेशको नाम (नेपाली) *</label>
                <input
                  type="text"
                  required
                  value={chProvNp}
                  onChange={(e) => setChProvNp(e.target.value)}
                  placeholder="उदा. कोशी प्रदेश"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Province Name (English)</label>
                <input
                  type="text"
                  value={chProvEn}
                  onChange={(e) => setChProvEn(e.target.value)}
                  placeholder="Koshi Province..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">सहर / सदरमुकाम</label>
                <input
                  type="text"
                  value={chCityNp}
                  onChange={(e) => setChCityNp(e.target.value)}
                  placeholder="धरान / विराटनगर"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">संयोजक / सम्पर्क व्यक्ति</label>
                <input
                  type="text"
                  value={chCoordNp}
                  onChange={(e) => setChCoordNp(e.target.value)}
                  placeholder="डा. / श्री ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">सम्पर्क नम्बर</label>
                <input
                  type="text"
                  value={chPhone}
                  onChange={(e) => setChPhone(e.target.value)}
                  placeholder="+977-..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">इमेल</label>
                <input
                  type="email"
                  value={chEmail}
                  onChange={(e) => setChEmail(e.target.value)}
                  placeholder="koshi@hemophilia-nepal.org.np"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">साझेदार अस्पताल (Partner Hospital)</label>
                <input
                  type="text"
                  value={chHospNp}
                  onChange={(e) => setChHospNp(e.target.value)}
                  placeholder="उदा. बीपी कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsChapterModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                ✓ सुरक्षित गर्नुहोस्
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. Advisors Modal */}
      {isAdvisorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveAdvisor} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200 my-8">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              {editingAdvisor ? "सल्लाहकार विवरण सम्पादन" : "नयाँ सल्लाहकार थप्नुहोस्"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">चिकित्सकको नाम (नेपाली) *</label>
                <input
                  type="text"
                  required
                  value={advNameNp}
                  onChange={(e) => setAdvNameNp(e.target.value)}
                  placeholder="प्रा. डा. ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Doctor Name (English)</label>
                <input
                  type="text"
                  value={advNameEn}
                  onChange={(e) => setAdvNameEn(e.target.value)}
                  placeholder="Prof. Dr. ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">पद / विशेषज्ञता (नेपाली)</label>
                <input
                  type="text"
                  value={advTitleNp}
                  onChange={(e) => setAdvTitleNp(e.target.value)}
                  placeholder="वरिष्ठ हेमाटोलोजिस्ट"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title / Specialty (English)</label>
                <input
                  type="text"
                  value={advTitleEn}
                  onChange={(e) => setAdvTitleEn(e.target.value)}
                  placeholder="Senior Consultant Hematologist"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">अस्पताल / प्रतिष्ठान</label>
                <input
                  type="text"
                  value={advInstNp}
                  onChange={(e) => setAdvInstNp(e.target.value)}
                  placeholder="वीर अस्पताल / त्रिवि शिक्षण अस्पताल"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">फोटो URL वा सिधै अपलोड</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={advPhoto}
                    onChange={(e) => setAdvPhoto(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1 border border-slate-200">
                    <Upload className="w-3.5 h-3.5" />
                    <span>अपलोड</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, setAdvPhoto)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAdvisorModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                रद्द गर्नुहोस्
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
              >
                ✓ सुरक्षित गर्नुहोस्
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
