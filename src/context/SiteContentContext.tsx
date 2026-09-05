"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { 
  SiteContentData, 
  FeatureToggles, 
  VisionMissionData, 
  HeroContent, 
  EmergencyContacts, 
  SiteStatistics, 
  OrgDetails,
  NoticeItem, 
  NoticeInput, 
  NoticeUpdateInput 
} from "@/types/site-content";
import { useAuth } from "@/context/AuthContext";

const LOCAL_STORAGE_KEY = "nhs_site_content_cache_v1";

interface SiteContentContextType {
  content: SiteContentData | null;
  features: FeatureToggles;
  visionMission: VisionMissionData;
  hero: HeroContent;
  emergency: EmergencyContacts;
  stats: SiteStatistics;
  orgDetails: OrgDetails;
  notices: NoticeItem[];
  loading: boolean;
  saving: boolean;
  status: {
    type: "idle" | "saving" | "success" | "error";
    message?: string;
  };
  clearStatus: () => void;
  fetchSiteContent: () => Promise<void>;
  toggleFeature: (featureKey: keyof FeatureToggles, enabled: boolean) => Promise<boolean>;
  updateVisionMission: (data: Partial<VisionMissionData>) => Promise<boolean>;
  updateHero: (data: Partial<HeroContent>) => Promise<boolean>;
  updateEmergency: (data: Partial<EmergencyContacts>) => Promise<boolean>;
  updateStats: (data: Partial<SiteStatistics>) => Promise<boolean>;
  updateOrgDetails: (data: Partial<OrgDetails>) => Promise<boolean>;
  addNotice: (data: NoticeInput) => Promise<boolean>;
  updateNotice: (id: string, data: NoticeUpdateInput) => Promise<boolean>;
  deleteNotice: (id: string) => Promise<boolean>;
}

const defaultContent: SiteContentData = {
  features: {
    aiChatbot: true,
    factorAvailabilityTracker: true,
    onlineDonations: true,
    elearningAcademy: true,
    onlineMembershipForm: true,
    emergencyAlertBanner: true,
    noticeBoardTicker: true,
    statisticsCounter: true,
    communityStoriesSection: true,
    treatmentCentresLocator: true,
  },
  visionMission: {
    visionNp: "नेपालका सम्पूर्ण हेमोफिलिया तथा रक्त विकार भएका व्यक्तिहरूले पूर्ण स्वास्थ्य, मर्यादा, समान अधिकार र सक्रिय जीवन बाँच्न पाउने समाजको निर्माण।",
    visionEn: "A future where every individual with a bleeding disorder in Nepal enjoys accessible treatment, physical dignity, social equality, and full life potential.",
    missionNp: "निःशुल्क फ्याक्टर प्रतिस्थापन, विकेन्द्रीकृत प्रयोगशाला परीक्षण, फिजियोथेरापी, मनोसामाजिक सहयोग र नीतिगत पैरवीमार्फत जीवनस्तर उकास्ने।",
    missionEn: "To decentralize specialized coagulation diagnosis, guarantee national factor supply, provide comprehensive psychosocial care, and advocate for universal health coverage.",
    coreValues: [],
    strategicObjectives: [],
  },
  hero: {
    taglineBadgeNp: "राष्ट्रिय बिरामी संस्था • नेपाल",
    taglineBadgeEn: "National Bleeding Disorders Organization • Nepal",
    titleNp: "रक्तस्राव विकार भएका प्रत्येक नागरिकको स्वास्थ्य, मर्यादा र समान अवसर।",
    titleEn: "Building a Future Where Every Person with Bleeding Disorders Lives with Health, Dignity and Equal Opportunity.",
    subtitleNp: "नेपाल हेमोफिलिया सोसाइटी (NHS) सन् १९९२ देखि नेपालभरका हेमोफिलिया बिरामीहरूको उपचार पहुँच, फ्याक्टर आपूर्ति, अधिकार र मानवीय मर्यादाका लागि समर्पित राष्ट्रिय गैर-नाफामूलक संस्था हो।",
    subtitleEn: "Nepal Hemophilia Society (NHS) is the national patient-led organization dedicated to diagnosis, factor access, comprehensive clinical care, social dignity, and human rights across all 7 provinces of Nepal.",
    ctaSupportTextNp: "बिरामी सहयोग लिनुहोस्",
    ctaSupportTextEn: "Get Patient Support",
    ctaLearnTextNp: "हेमोफिलियाबारे बुझ्नुहोस्",
    ctaLearnTextEn: "Understand Hemophilia",
    ctaDonateTextNp: "सहयोग / दान गर्नुहोस्",
    ctaDonateTextEn: "Donate Now",
  },
  emergency: {
    headlineNp: "आकस्मिक रक्तस्राव २४/७ हटलाइन तथा प्राथमिक उपचार सहायता",
    headlineEn: "Emergency 24/7 Bleeding Protocol & Clinical Guidance",
    hotline1: "+977-1-4221119",
    hotline2: "+977-9851000000",
    birHospitalContact: "वीर अस्पताल केन्द्रीय हेमोफिलिया केयर: ०१-४२२१११९",
    disclaimerNp: "गम्भीर चोटपटक वा टाउको, घाँटी वा पेटमा रक्तस्राव भए तुरुन्त नजिकको अस्पतालको आकस्मिक कक्षमा जानुहोस् वा फ्याक्टर इन्फ्युजन लिनुहोस्।",
    disclaimerEn: "For acute internal bleeding or trauma, seek emergency hospital care immediately.",
  },
  stats: {
    registeredPatients: 984,
    activeMembers: 650,
    treatmentCentresCount: 8,
    provincesCovered: 7,
    districtsReached: 68,
    factorDistributedUnits: "184K+",
    hcpTrainedCount: 320,
  },
  orgDetails: {
    orgNameNp: "नेपाल हेमोफिलिया सोसाइटी",
    orgNameEn: "Nepal Hemophilia Society",
    taglineNp: "राष्ट्रिय बिरामी संस्था (स्था. १९९२)",
    taglineEn: "National Patient Organization (Est. 1992)",
    phone: "+977-1-4221119",
    emergencyPhone: "+977-9851000000",
    email: "info@hemophilia-nepal.org.np",
    addressNp: "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)",
    addressEn: "Kathmandu, Nepal (Central Secretariat)",
    officeHoursNp: "आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००",
    officeHoursEn: "Sunday - Friday: 10:00 AM - 5:00 PM",
    swcRegNo: "१२९० (समाज कल्याण परिषद)",
    panNo: "३००१२३४५६",
    bankName: "राष्ट्रिय वाणिज्य बैंक (Rastriya Banijya Bank)",
    accountName: "नेपाल हेमोफिलिया सोसाइटी (Nepal Hemophilia Society)",
    accountNumber: "1090010002345001",
    branch: "विशाल बजार शाखा, काठमाडौं",
    swiftCode: "RBBANPKA",
    esewaId: "9851000000",
  },
  notices: [],
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const { user, role } = useAuth();
  const [content, setContent] = useState<SiteContentData>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "saving" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const clearStatus = useCallback(() => {
    setStatus({ type: "idle" });
  }, []);

  const getHeaders = useCallback(() => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-user-role": role,
    };
    if (user?.id) {
      headers["Authorization"] = `Bearer ${user.id}`;
    }
    return headers;
  }, [user, role]);

  const fetchSiteContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/site-content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setContent(json.data);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          }
          return;
        }
      }
      throw new Error("Failed to fetch from API");
    } catch (err) {
      console.warn("Loading site-content from cache", err);
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            setContent(JSON.parse(cached));
          } catch (e) {}
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSiteContent();
  }, [fetchSiteContent]);

  // Generic content updater
  const updateContent = async (payload: Partial<SiteContentData>): Promise<boolean> => {
    setSaving(true);
    setStatus({ type: "saving", message: "Saving..." });

    const prevContent = { ...content };
    // Optimistic
    setContent((prev) => ({ ...prev, ...payload }));

    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update content");
      }

      setStatus({
        type: "success",
        message: "✓ विवरण सफलतापूर्वक अपडेट भयो।",
      });
      setTimeout(() => setStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setContent(prevContent); // Revert
      setStatus({
        type: "error",
        message: err.message || "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Toggle master feature (Super Admin only)
  const toggleFeature = async (featureKey: keyof FeatureToggles, enabled: boolean): Promise<boolean> => {
    const updatedFeatures = { ...content.features, [featureKey]: enabled };
    return await updateContent({ features: updatedFeatures });
  };

  // Update Vision & Mission
  const updateVisionMission = async (data: Partial<VisionMissionData>): Promise<boolean> => {
    const updated = { ...content.visionMission, ...data };
    return await updateContent({ visionMission: updated });
  };

  // Update Hero Headline & CTAs
  const updateHero = async (data: Partial<HeroContent>): Promise<boolean> => {
    const updated = { ...content.hero, ...data };
    return await updateContent({ hero: updated });
  };

  // Update Emergency Bar Contacts
  const updateEmergency = async (data: Partial<EmergencyContacts>): Promise<boolean> => {
    const updated = { ...content.emergency, ...data };
    return await updateContent({ emergency: updated });
  };

  // Update Statistics
  const updateStats = async (data: Partial<SiteStatistics>): Promise<boolean> => {
    const updated = { ...content.stats, ...data };
    return await updateContent({ stats: updated });
  };

  // Update Organization Details & Banking
  const updateOrgDetails = async (data: Partial<OrgDetails>): Promise<boolean> => {
    const updated = { ...content.orgDetails, ...data };
    return await updateContent({ orgDetails: updated });
  };

  // Add Notice
  const addNotice = async (data: NoticeInput): Promise<boolean> => {
    setSaving(true);
    setStatus({ type: "saving", message: "Saving..." });

    try {
      const res = await fetch("/api/site-content/notices", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to add notice");
      }

      if (json.data) {
        setContent((prev) => ({
          ...prev,
          notices: [json.data, ...prev.notices],
        }));
      } else {
        await fetchSiteContent();
      }

      setStatus({
        type: "success",
        message: "✓ नयाँ सुचना सफलतापूर्वक पोस्ट भयो।",
      });
      setTimeout(() => setStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "सुचना पोस्ट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Update Notice
  const updateNotice = async (id: string, data: NoticeUpdateInput): Promise<boolean> => {
    setSaving(true);
    setStatus({ type: "saving", message: "Saving..." });

    const prevNotices = [...content.notices];
    setContent((prev) => ({
      ...prev,
      notices: prev.notices.map((n) => (n.id === id ? { ...n, ...data, updated_at: new Date().toISOString() } : n)),
    }));

    try {
      const res = await fetch(`/api/site-content/notices/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update notice");
      }

      setStatus({
        type: "success",
        message: "✓ सुचना सफलतापूर्वक अपडेट भयो।",
      });
      setTimeout(() => setStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setContent((prev) => ({ ...prev, notices: prevNotices })); // Revert
      setStatus({
        type: "error",
        message: err.message || "सुचना अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Delete Notice
  const deleteNotice = async (id: string): Promise<boolean> => {
    setSaving(true);
    setStatus({ type: "saving", message: "Saving..." });

    const prevNotices = [...content.notices];
    setContent((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
    }));

    try {
      const res = await fetch(`/api/site-content/notices/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete notice");
      }

      setStatus({
        type: "success",
        message: "✓ सुचना सफलतापूर्वक हटाइयो।",
      });
      setTimeout(() => setStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setContent((prev) => ({ ...prev, notices: prevNotices })); // Revert
      setStatus({
        type: "error",
        message: err.message || "सुचना हटाउन सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        features: content.features,
        visionMission: content.visionMission,
        hero: content.hero,
        emergency: content.emergency,
        stats: content.stats,
        orgDetails: content.orgDetails,
        notices: content.notices,
        loading,
        saving,
        status,
        clearStatus,
        fetchSiteContent,
        toggleFeature,
        updateVisionMission,
        updateHero,
        updateEmergency,
        updateStats,
        updateOrgDetails,
        addNotice,
        updateNotice,
        deleteNotice,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
