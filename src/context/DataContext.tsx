"use client";

import React, { createContext, useContext, useState } from "react";
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

interface DataContextType {
  // Treatment Centres
  treatmentCentres: TreatmentCentre[];
  addTreatmentCentre: (centre: TreatmentCentre) => void;
  updateTreatmentCentre: (id: string, centre: Partial<TreatmentCentre>) => void;
  deleteTreatmentCentre: (id: string) => void;

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
  addNewsArticle: (article: NewsArticle) => void;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Events
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string, userName: string, userEmail: string) => boolean;

  // Resources
  resources: ResourceItem[];
  addResource: (resource: ResourceItem) => void;
  updateResource: (id: string, resource: Partial<ResourceItem>) => void;
  deleteResource: (id: string) => void;
  incrementDownloadCount: (id: string) => void;

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
  const { user } = useAuth();

  const [treatmentCentres, setTreatmentCentres] = useState<TreatmentCentre[]>(treatmentCentresData);
  const [factorInventory, setFactorInventory] = useState<FactorInventoryItem[]>(factorInventoryData);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(newsArticlesData);
  const [events, setEvents] = useState<EventItem[]>(eventsData);
  const [resources, setResources] = useState<ResourceItem[]>(resourcesData);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>(initialSupportRequests);
  const [membershipApplications, setMembershipApplications] = useState<MembershipApplication[]>(initialMembershipApplications);
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonationRecords);
  const [courses] = useState<ELearningCourse[]>(elearningCoursesData);
  const [patientRegistry, setPatientRegistry] = useState<PatientRegistryRecord[]>(initialPatientRegistry);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [completedCourses, setCompletedCourses] = useState<Record<string, { score: number; date: string; studentName: string }>>({});

  const logAudit = (
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
  };

  // Treatment Centre CRUD
  const addTreatmentCentre = (centre: TreatmentCentre) => {
    setTreatmentCentres((prev) => [centre, ...prev]);
    logAudit("CREATE_TREATMENT_CENTRE", "TreatmentCentre", centre.id, `Added treatment centre: ${centre.name.en}`);
  };

  const updateTreatmentCentre = (id: string, update: Partial<TreatmentCentre>) => {
    setTreatmentCentres((prev) => prev.map((c) => (c.id === id ? { ...c, ...update } : c)));
    logAudit("UPDATE_TREATMENT_CENTRE", "TreatmentCentre", id, `Updated centre details.`);
  };

  const deleteTreatmentCentre = (id: string) => {
    setTreatmentCentres((prev) => prev.filter((c) => c.id !== id));
    logAudit("DELETE_TREATMENT_CENTRE", "TreatmentCentre", id, `Deleted centre.`);
  };

  // Factor status update
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
  };

  // News CRUD
  const addNewsArticle = (article: NewsArticle) => {
    setNewsArticles((prev) => [article, ...prev]);
    logAudit("CREATE_NEWS", "NewsArticle", article.id, `Created news article: ${article.title.en}`);
  };

  const updateNewsArticle = (id: string, article: Partial<NewsArticle>) => {
    setNewsArticles((prev) => prev.map((n) => (n.id === id ? { ...n, ...article } : n)));
    logAudit("UPDATE_NEWS", "NewsArticle", id, `Updated news article`);
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles((prev) => prev.filter((n) => n.id !== id));
    logAudit("DELETE_NEWS", "NewsArticle", id, `Deleted news article`);
  };

  // Events CRUD
  const addEvent = (event: EventItem) => {
    setEvents((prev) => [event, ...prev]);
    logAudit("CREATE_EVENT", "EventItem", event.id, `Created event: ${event.title.en}`);
  };

  const updateEvent = (id: string, update: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...update } : e)));
    logAudit("UPDATE_EVENT", "EventItem", id, `Updated event details`);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    logAudit("DELETE_EVENT", "EventItem", id, `Deleted event`);
  };

  const registerForEvent = (eventId: string, userName: string, userEmail: string): boolean => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, attendeesCount: e.attendeesCount + 1 } : e))
    );
    logAudit("EVENT_RSVP", "EventRegistration", eventId, `Registration from ${userName} (${userEmail})`);
    return true;
  };

  // Resources CRUD
  const addResource = (resource: ResourceItem) => {
    setResources((prev) => [resource, ...prev]);
    logAudit("CREATE_RESOURCE", "ResourceItem", resource.id, `Uploaded resource: ${resource.title.en}`);
  };

  const updateResource = (id: string, update: Partial<ResourceItem>) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...update } : r)));
    logAudit("UPDATE_RESOURCE", "ResourceItem", id, `Updated resource`);
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    logAudit("DELETE_RESOURCE", "ResourceItem", id, `Deleted resource`);
  };

  const incrementDownloadCount = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    logAudit("DOWNLOAD_RESOURCE", "ResourceItem", id, `Resource file downloaded`);
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
  };

  // Aggregated Stats
  const totalDonationsNPR = donations
    .filter((d) => d.paymentStatus === "Completed")
    .reduce((acc, curr) => acc + (curr.currency === "NPR" ? curr.amount : curr.amount * 135), 0);

  const stats = {
    totalPatients: 984, // Verified demographic base
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
