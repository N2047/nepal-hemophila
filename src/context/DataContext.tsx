"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  TreatmentCentre,
  FactorInventoryItem,
  NewsArticle,
  EventItem,
  ResourceItem,
  MembershipApplication,
  PatientRegistryRecord,
  SupportRequest,
  DonationRecord,
  ELearningCourse,
  AuditLog,
  FactorAvailabilityStatus,
  ProvinceName,
} from "@/types";
import {
  ProvincialChapter,
  MedicalAdvisor,
  GlobalWebsiteSettings,
  CmsDatabase
} from "@/types/cms";
import {
  treatmentCentresData,
  factorInventoryData,
  newsArticlesData,
  eventsData,
  resourcesData,
  elearningCoursesData,
  initialSupportRequests,
  initialMembershipApplications,
  initialDonationRecords,
  initialPatientRegistry,
  initialAuditLogs,
} from "@/data/mockData";
import { useAuth } from "./AuthContext";
import { 
  inventoryService, 
  supportService, 
  membershipService, 
  donationsService, 
  patientsService 
} from "@/services/supabase";

interface DataContextType {
  // Treatment Centres
  treatmentCentres: TreatmentCentre[];
  addTreatmentCentre: (centre: TreatmentCentre) => Promise<boolean>;
  updateTreatmentCentre: (id: string, centre: Partial<TreatmentCentre>) => Promise<boolean>;
  deleteTreatmentCentre: (id: string) => Promise<boolean>;

  // Factor Inventory
  factorInventory: FactorInventoryItem[];
  updateFactorStatus: (
    id: string,
    status: FactorAvailabilityStatus,
    approxUnits?: string,
    notes?: string
  ) => void;

  // News
  newsArticles: NewsArticle[];
  addNewsArticle: (article: NewsArticle) => Promise<boolean>;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => Promise<boolean>;
  deleteNewsArticle: (id: string) => Promise<boolean>;

  // Events
  events: EventItem[];
  addEvent: (event: EventItem) => Promise<boolean>;
  updateEvent: (id: string, event: Partial<EventItem>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  registerForEvent: (eventId: string, userName: string, userEmail: string) => boolean;

  // Resources
  resources: ResourceItem[];
  addResource: (resource: ResourceItem) => Promise<boolean>;
  updateResource: (id: string, resource: Partial<ResourceItem>) => Promise<boolean>;
  deleteResource: (id: string) => Promise<boolean>;
  incrementDownloadCount: (id: string) => void;

  // Provincial Chapters
  chapters: ProvincialChapter[];
  addChapter: (chapter: Partial<ProvincialChapter>) => Promise<boolean>;
  updateChapter: (id: string, chapter: Partial<ProvincialChapter>) => Promise<boolean>;
  deleteChapter: (id: string) => Promise<boolean>;

  // Medical Advisors
  advisors: MedicalAdvisor[];
  addAdvisor: (advisor: Partial<MedicalAdvisor>) => Promise<boolean>;
  updateAdvisor: (id: string, advisor: Partial<MedicalAdvisor>) => Promise<boolean>;
  deleteAdvisor: (id: string) => Promise<boolean>;

  // Global Settings
  globalSettings: GlobalWebsiteSettings | null;
  updateGlobalSettings: (settings: Partial<GlobalWebsiteSettings>) => Promise<boolean>;

  // Support Requests
  supportRequests: SupportRequest[];
  submitSupportRequest: (req: Omit<SupportRequest, "id" | "trackingNumber" | "createdAt" | "updatedAt" | "status">) => SupportRequest;
  updateSupportStatus: (id: string, status: SupportRequest["status"], notes?: string, staff?: string) => void;

  // Membership Applications
  membershipApplications: MembershipApplication[];
  submitMembershipApplication: (app: Omit<MembershipApplication, "id" | "applicationNumber" | "submittedAt" | "status">) => MembershipApplication;
  updateMembershipStatus: (id: string, status: MembershipApplication["status"], notes?: string, membershipId?: string) => void;

  // Donations
  donations: DonationRecord[];
  submitDonation: (donation: Omit<DonationRecord, "id" | "receiptNumber" | "createdAt" | "isReceiptGenerated">) => DonationRecord;

  // E-Learning
  courses: ELearningCourse[];
  completedCourses: Record<string, { score: number; date: string; studentName: string }>;
  saveCourseCertificate: (courseId: string, studentName: string, score: number) => void;

  // Patient Registry (Confidential)
  patientRegistry: PatientRegistryRecord[];
  addPatientRecord: (record: PatientRegistryRecord) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  logAudit: (action: string, entity: string, entityId: string, details: string, result?: "SUCCESS" | "DENIED" | "WARNING") => void;

  // General Status & Refresh
  fetchCmsData: () => Promise<void>;
  loadingCms: boolean;

  // Overall Statistics
  stats: {
    totalPatients: number;
    totalMembers: number;
    totalCentres: number;
    totalDonationsNPR: number;
    totalFactorUnitsDistributed: number;
    totalEvents: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user, role } = useAuth();

  const [treatmentCentres, setTreatmentCentres] = useState<TreatmentCentre[]>(treatmentCentresData);
  const [factorInventory, setFactorInventory] = useState<FactorInventoryItem[]>(factorInventoryData);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(newsArticlesData);
  const [events, setEvents] = useState<EventItem[]>(eventsData);
  const [resources, setResources] = useState<ResourceItem[]>(resourcesData);
  const [chapters, setChapters] = useState<ProvincialChapter[]>([]);
  const [advisors, setAdvisors] = useState<MedicalAdvisor[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalWebsiteSettings | null>(null);
  const [loadingCms, setLoadingCms] = useState(true);

  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>(initialSupportRequests);
  const [membershipApplications, setMembershipApplications] = useState<MembershipApplication[]>(initialMembershipApplications);
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonationRecords);
  const [courses] = useState<ELearningCourse[]>(elearningCoursesData);
  const [patientRegistry, setPatientRegistry] = useState<PatientRegistryRecord[]>(initialPatientRegistry);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [completedCourses, setCompletedCourses] = useState<Record<string, { score: number; date: string; studentName: string }>>({});

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

  const logAudit = useCallback((
    action: string,
    entity: string,
    entityId: string,
    details: string,
    result: "SUCCESS" | "DENIED" | "WARNING" = "SUCCESS"
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
      userId: user?.id || "anonymous",
      userName: user?.name || "Public Guest",
      role: user?.role || "PUBLIC_USER",
      action,
      entity,
      entityId,
      ipAddress: "103.10.28.10 (Nepal Gateway)",
      result,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [user]);

  // Fetch all CMS persistent data from /api/cms
  const fetchCmsData = useCallback(async () => {
    try {
      setLoadingCms(true);
      const res = await fetch("/api/cms", { 
        headers: getHeaders(),
        cache: "no-store" 
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d: CmsDatabase = json.data;
          if (d.centres && d.centres.length > 0) setTreatmentCentres(d.centres);
          if (d.news && d.news.length > 0) setNewsArticles(d.news);
          if (d.events && d.events.length > 0) setEvents(d.events);
          if (d.resources && d.resources.length > 0) setResources(d.resources);
          if (d.chapters) setChapters(d.chapters);
          if (d.advisors) setAdvisors(d.advisors);
          if (d.settings) setGlobalSettings(d.settings);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch CMS persistent data, using defaults", err);
    } finally {
      setLoadingCms(false);
    }
  }, [getHeaders]);

  useEffect(() => {
    fetchCmsData();
  }, [fetchCmsData]);

  // 1. Treatment Centres CRUD
  const addTreatmentCentre = async (centre: TreatmentCentre): Promise<boolean> => {
    setTreatmentCentres((prev) => [centre, ...prev]);
    logAudit("CREATE_TREATMENT_CENTRE", "TreatmentCentre", centre.id, `Added treatment centre: ${centre.name.en}`);
    try {
      const res = await fetch("/api/cms/centres", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(centre)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateTreatmentCentre = async (id: string, update: Partial<TreatmentCentre>): Promise<boolean> => {
    setTreatmentCentres((prev) => prev.map((c) => (c.id === id ? { ...c, ...update } : c)));
    logAudit("UPDATE_TREATMENT_CENTRE", "TreatmentCentre", id, `Updated centre details.`);
    try {
      const res = await fetch(`/api/cms/centres/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(update)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteTreatmentCentre = async (id: string): Promise<boolean> => {
    setTreatmentCentres((prev) => prev.filter((c) => c.id !== id));
    logAudit("DELETE_TREATMENT_CENTRE", "TreatmentCentre", id, `Deleted centre.`);
    try {
      const res = await fetch(`/api/cms/centres/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // 2. Factor status update
  const updateFactorStatus = (
    id: string,
    status: FactorAvailabilityStatus,
    approxUnits?: string,
    notes?: string
  ) => {
    setFactorInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            availableUnitsApprox: approxUnits || item.availableUnitsApprox,
            lastUpdated: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
            updatedByRole: user?.name ? `${user.name} (${user.role})` : "Medical Coordinator",
            verificationStatus: "Verified",
            contactNotes: notes
              ? { en: notes, np: notes }
              : item.contactNotes,
          };
        }
        return item;
      })
    );
    logAudit("UPDATE_FACTOR_STATUS", "FactorInventoryItem", id, `Status updated to ${status} (${approxUnits || "N/A"})`);
    // Sync with Supabase factor_inventory and history
    inventoryService.update(id, {
      status,
      notes,
      verifiedBy: user?.name ? `${user.name} (${user.role})` : "Medical Coordinator",
    }).catch((e) => console.warn("Supabase factor inventory update fallback:", e));
  };

  // 3. News CRUD
  const addNewsArticle = async (article: NewsArticle): Promise<boolean> => {
    setNewsArticles((prev) => [article, ...prev]);
    logAudit("CREATE_NEWS", "NewsArticle", article.id, `Created news article: ${article.title.en}`);
    try {
      const res = await fetch("/api/cms/news", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(article)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateNewsArticle = async (id: string, article: Partial<NewsArticle>): Promise<boolean> => {
    setNewsArticles((prev) => prev.map((n) => (n.id === id ? { ...n, ...article } : n)));
    logAudit("UPDATE_NEWS", "NewsArticle", id, `Updated news article`);
    try {
      const res = await fetch(`/api/cms/news/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(article)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteNewsArticle = async (id: string): Promise<boolean> => {
    setNewsArticles((prev) => prev.filter((n) => n.id !== id));
    logAudit("DELETE_NEWS", "NewsArticle", id, `Deleted news article`);
    try {
      const res = await fetch(`/api/cms/news/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // 4. Events CRUD
  const addEvent = async (event: EventItem): Promise<boolean> => {
    setEvents((prev) => [event, ...prev]);
    logAudit("CREATE_EVENT", "EventItem", event.id, `Created event: ${event.title.en}`);
    try {
      const res = await fetch("/api/cms/events", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(event)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateEvent = async (id: string, update: Partial<EventItem>): Promise<boolean> => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...update } : e)));
    logAudit("UPDATE_EVENT", "EventItem", id, `Updated event details`);
    try {
      const res = await fetch(`/api/cms/events/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(update)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    logAudit("DELETE_EVENT", "EventItem", id, `Deleted event`);
    try {
      const res = await fetch(`/api/cms/events/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const registerForEvent = (eventId: string, userName: string, userEmail: string): boolean => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, attendeesCount: e.attendeesCount + 1 } : e))
    );
    logAudit("EVENT_RSVP", "EventRegistration", eventId, `Registration from ${userName} (${userEmail})`);
    return true;
  };

  // 5. Resources CRUD
  const addResource = async (resource: ResourceItem): Promise<boolean> => {
    setResources((prev) => [resource, ...prev]);
    logAudit("CREATE_RESOURCE", "ResourceItem", resource.id, `Uploaded resource: ${resource.title.en}`);
    try {
      const res = await fetch("/api/cms/resources", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(resource)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateResource = async (id: string, update: Partial<ResourceItem>): Promise<boolean> => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...update } : r)));
    logAudit("UPDATE_RESOURCE", "ResourceItem", id, `Updated resource`);
    try {
      const res = await fetch(`/api/cms/resources/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(update)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteResource = async (id: string): Promise<boolean> => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    logAudit("DELETE_RESOURCE", "ResourceItem", id, `Deleted resource`);
    try {
      const res = await fetch(`/api/cms/resources/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const incrementDownloadCount = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    logAudit("DOWNLOAD_RESOURCE", "ResourceItem", id, `Resource file downloaded`);
  };

  // 6. Provincial Chapters CRUD
  const addChapter = async (chapter: Partial<ProvincialChapter>): Promise<boolean> => {
    logAudit("CREATE_CHAPTER", "ProvincialChapter", chapter.id || "new", `Added provincial chapter: ${chapter.provinceNameEn}`);
    try {
      const res = await fetch("/api/cms/chapters", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(chapter)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateChapter = async (id: string, update: Partial<ProvincialChapter>): Promise<boolean> => {
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, ...update } : c)));
    logAudit("UPDATE_CHAPTER", "ProvincialChapter", id, `Updated provincial chapter`);
    try {
      const res = await fetch(`/api/cms/chapters/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(update)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteChapter = async (id: string): Promise<boolean> => {
    setChapters((prev) => prev.filter((c) => c.id !== id));
    logAudit("DELETE_CHAPTER", "ProvincialChapter", id, `Deleted provincial chapter`);
    try {
      const res = await fetch(`/api/cms/chapters/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // 7. Medical Advisors CRUD
  const addAdvisor = async (advisor: Partial<MedicalAdvisor>): Promise<boolean> => {
    logAudit("CREATE_ADVISOR", "MedicalAdvisor", advisor.id || "new", `Added medical advisor: ${advisor.nameEn}`);
    try {
      const res = await fetch("/api/cms/advisors", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(advisor)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const updateAdvisor = async (id: string, update: Partial<MedicalAdvisor>): Promise<boolean> => {
    setAdvisors((prev) => prev.map((a) => (a.id === id ? { ...a, ...update } : a)));
    logAudit("UPDATE_ADVISOR", "MedicalAdvisor", id, `Updated medical advisor`);
    try {
      const res = await fetch(`/api/cms/advisors/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(update)
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteAdvisor = async (id: string): Promise<boolean> => {
    setAdvisors((prev) => prev.filter((a) => a.id !== id));
    logAudit("DELETE_ADVISOR", "MedicalAdvisor", id, `Deleted medical advisor`);
    try {
      const res = await fetch(`/api/cms/advisors/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // 8. Global Settings
  const updateGlobalSettings = async (settings: Partial<GlobalWebsiteSettings>): Promise<boolean> => {
    setGlobalSettings((prev) => (prev ? { ...prev, ...settings } : (settings as any)));
    logAudit("UPDATE_SETTINGS", "GlobalWebsiteSettings", "settings", "Updated global site settings");
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ settings })
      });
      if (res.ok) {
        await fetchCmsData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Support Requests
  const submitSupportRequest = (
    req: Omit<SupportRequest, "id" | "trackingNumber" | "createdAt" | "updatedAt" | "status">
  ): SupportRequest => {
    const tracking = `NHS-SR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: SupportRequest = {
      ...req,
      id: `sr-${Date.now()}`,
      trackingNumber: tracking,
      status: "New",
      createdAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
    };
    setSupportRequests((prev) => [newReq, ...prev]);
    logAudit("SUBMIT_SUPPORT_REQUEST", "SupportRequest", newReq.id, `New support ticket: ${tracking} (${req.urgency})`);
    // Sync with Supabase support_requests
    supportService.submit(newReq).catch((e) => console.warn("Supabase support request fallback:", e));
    return newReq;
  };

  const updateSupportStatus = (
    id: string,
    status: SupportRequest["status"],
    notes?: string,
    staff?: string
  ) => {
    setSupportRequests((prev) =>
      prev.map((sr) =>
        sr.id === id
          ? {
              ...sr,
              status,
              resolutionNotes: notes || sr.resolutionNotes,
              assignedStaff: staff || sr.assignedStaff,
              updatedAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
            }
          : sr
      )
    );
    logAudit("UPDATE_SUPPORT_STATUS", "SupportRequest", id, `Status updated to ${status}`);
    supportService.updateStatus(id, status, notes).catch((e) => console.warn("Supabase support update fallback:", e));
  };

  // Membership Applications
  const submitMembershipApplication = (
    app: Omit<MembershipApplication, "id" | "applicationNumber" | "submittedAt" | "status">
  ): MembershipApplication => {
    const appNum = `NHS-APP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newApp: MembershipApplication = {
      ...app,
      id: `mem-app-${Date.now()}`,
      applicationNumber: appNum,
      status: "Submitted",
      submittedAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
    };
    setMembershipApplications((prev) => [newApp, ...prev]);
    logAudit("SUBMIT_MEMBERSHIP_APPLICATION", "MembershipApplication", newApp.id, `Application submitted: ${appNum} (${app.fullName})`);
    // Sync with Supabase membership_applications
    membershipService.submit(newApp).catch((e) => console.warn("Supabase membership submit fallback:", e));
    return newApp;
  };

  const updateMembershipStatus = (
    id: string,
    status: MembershipApplication["status"],
    notes?: string,
    membershipId?: string
  ) => {
    setMembershipApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              reviewerNotes: notes || app.reviewerNotes,
              reviewedAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
              membershipId: membershipId || app.membershipId,
            }
          : app
      )
    );
    logAudit("UPDATE_MEMBERSHIP_STATUS", "MembershipApplication", id, `Membership status updated to ${status}`);
    membershipService.updateStatus(id, status, notes).catch((e) => console.warn("Supabase membership update fallback:", e));
  };

  // Donations
  const submitDonation = (
    donation: Omit<DonationRecord, "id" | "receiptNumber" | "createdAt" | "isReceiptGenerated">
  ): DonationRecord => {
    const recNum = `NHS-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = {
      ...donation,
      id: `don-${Date.now()}`,
      receiptNumber: recNum,
      createdAt: new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }) + " NPT",
      isReceiptGenerated: true,
    };
    setDonations((prev) => [newDonation, ...prev]);
    logAudit("PROCESS_DONATION", "DonationRecord", newDonation.id, `Received ${donation.currency} ${donation.amount.toLocaleString()} via ${donation.paymentMethod}`);
    // Sync with Supabase donations
    donationsService.record({
      donorName: donation.donorName,
      amount: donation.amount,
      currency: donation.currency,
      paymentMethod: donation.paymentMethod,
      transactionReference: donation.transactionReference,
      donationType: donation.donationType,
    }).catch((e) => console.warn("Supabase donation sync fallback:", e));
    return newDonation;
  };

  // E-Learning
  const saveCourseCertificate = (courseId: string, studentName: string, score: number) => {
    setCompletedCourses((prev) => ({
      ...prev,
      [courseId]: {
        score,
        studentName,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      },
    }));
    logAudit("COMPLETE_ELEARNING_COURSE", "ELearningCertificate", courseId, `${studentName} completed course with score ${score}%`);
  };

  // Patient Registry
  const addPatientRecord = (record: PatientRegistryRecord) => {
    setPatientRegistry((prev) => [record, ...prev]);
    logAudit("ADD_PATIENT_RECORD", "PatientRegistryRecord", record.id, `Added patient registry code: ${record.patientCode}`);
    // Sync with Supabase patients (Strictly protected)
    patientsService.create(record).catch((e) => console.warn("Supabase patient registry sync fallback:", e));
  };

  // Aggregated Stats
  const totalDonationsNPR = donations
    .filter((d) => d.paymentStatus === "Completed")
    .reduce((acc, curr) => acc + (curr.currency === "NPR" ? curr.amount : curr.amount * 135), 0);

  const stats = {
    totalPatients: 984,
    totalMembers: 650,
    totalCentres: treatmentCentres.length,
    totalDonationsNPR,
    totalFactorUnitsDistributed: 184500,
    totalEvents: events.length,
  };

  return (
    <DataContext.Provider
      value={{
        treatmentCentres,
        addTreatmentCentre,
        updateTreatmentCentre,
        deleteTreatmentCentre,
        factorInventory,
        updateFactorStatus,
        newsArticles,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        resources,
        addResource,
        updateResource,
        deleteResource,
        incrementDownloadCount,
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
        supportRequests,
        submitSupportRequest,
        updateSupportStatus,
        membershipApplications,
        submitMembershipApplication,
        updateMembershipStatus,
        donations,
        submitDonation,
        courses,
        completedCourses,
        saveCourseCertificate,
        patientRegistry,
        addPatientRecord,
        auditLogs,
        logAudit,
        fetchCmsData,
        loadingCms,
        stats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
