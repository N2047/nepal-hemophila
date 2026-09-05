"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Officer, Member, CommitteeData, OfficerUpdateInput, MemberInput, MemberUpdateInput } from "@/types/committee";
import { useAuth } from "@/context/AuthContext";

interface CommitteeContextType {
  officers: Officer[];
  members: Member[];
  loading: boolean;
  saving: boolean;
  saveStatus: {
    type: "idle" | "saving" | "success" | "error";
    message?: string;
  };
  clearStatus: () => void;
  fetchCommittee: () => Promise<void>;
  updateOfficer: (id: string, input: OfficerUpdateInput) => Promise<boolean>;
  addMember: (input: MemberInput) => Promise<boolean>;
  updateMember: (id: string, input: MemberUpdateInput) => Promise<boolean>;
  deleteMember: (id: string) => Promise<boolean>;
  reorderMembers: (orderedIds: string[]) => Promise<boolean>;
  uploadPhoto: (file: File) => Promise<string | null>;
}

const CommitteeContext = createContext<CommitteeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "nhs_committee_data_v1";

export function CommitteeProvider({ children }: { children: React.ReactNode }) {
  const { user, role } = useAuth();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "idle" | "saving" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const clearStatus = useCallback(() => {
    setSaveStatus({ type: "idle" });
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

  const fetchCommittee = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/committee", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setOfficers(json.data.officers || []);
          setMembers(json.data.members || []);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          }
          return;
        }
      }
      throw new Error("Failed to fetch from API");
    } catch (err) {
      console.warn("Loading committee from localStorage fallback", err);
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            const data: CommitteeData = JSON.parse(cached);
            setOfficers(data.officers || []);
            setMembers(data.members || []);
          } catch (e) {
            console.error("Failed to parse cached committee data", e);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommittee();
  }, [fetchCommittee]);

  const updateOfficer = async (id: string, input: OfficerUpdateInput): Promise<boolean> => {
    setSaving(true);
    setSaveStatus({ type: "saving", message: "Saving..." });

    // Optimistic update
    const prevOfficers = [...officers];
    setOfficers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...input, updated_at: new Date().toISOString() } : o))
    );

    try {
      const res = await fetch(`/api/committee/officers/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update officer");
      }

      setSaveStatus({
        type: "success",
        message: "✓ विवरण सफलतापूर्वक अपडेट भयो।",
      });
      setTimeout(() => setSaveStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setOfficers(prevOfficers); // Revert
      setSaveStatus({
        type: "error",
        message: err.message || "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const addMember = async (input: MemberInput): Promise<boolean> => {
    setSaving(true);
    setSaveStatus({ type: "saving", message: "Saving..." });

    try {
      const res = await fetch(`/api/committee/members`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to add member");
      }

      if (json.data) {
        setMembers((prev) => [...prev, json.data]);
      } else {
        await fetchCommittee();
      }

      setSaveStatus({
        type: "success",
        message: "✓ नयाँ सदस्य सफलतापूर्वक थपियो।",
      });
      setTimeout(() => setSaveStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err.message || "सदस्य थप्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateMember = async (id: string, input: MemberUpdateInput): Promise<boolean> => {
    setSaving(true);
    setSaveStatus({ type: "saving", message: "Saving..." });

    const prevMembers = [...members];
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...input, updated_at: new Date().toISOString() } : m))
    );

    try {
      const res = await fetch(`/api/committee/members/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(input),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update member");
      }

      setSaveStatus({
        type: "success",
        message: "✓ विवरण सफलतापूर्वक अपडेट भयो।",
      });
      setTimeout(() => setSaveStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setMembers(prevMembers); // Revert
      setSaveStatus({
        type: "error",
        message: err.message || "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id: string): Promise<boolean> => {
    setSaving(true);
    setSaveStatus({ type: "saving", message: "Saving..." });

    const prevMembers = [...members];
    setMembers((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await fetch(`/api/committee/members/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete member");
      }

      setSaveStatus({
        type: "success",
        message: "✓ सदस्य सफलतापूर्वक हटाइयो।",
      });
      setTimeout(() => setSaveStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setMembers(prevMembers); // Revert
      setSaveStatus({
        type: "error",
        message: err.message || "सदस्य हटाउन सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const reorderMembers = async (orderedIds: string[]): Promise<boolean> => {
    setSaving(true);
    setSaveStatus({ type: "saving", message: "Saving..." });

    const prevMembers = [...members];
    const memberMap = new Map(members.map((m) => [m.id, m]));
    const newMembersList: Member[] = [];
    orderedIds.forEach((id, idx) => {
      const mem = memberMap.get(id);
      if (mem) {
        newMembersList.push({ ...mem, display_order: idx + 1 });
      }
    });

    setMembers(newMembersList);

    try {
      const res = await fetch(`/api/committee/members`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ orderedIds }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to reorder members");
      }

      setSaveStatus({
        type: "success",
        message: "✓ सदस्यहरूको क्रम सफलतापूर्वक अपडेट भयो।",
      });
      setTimeout(() => setSaveStatus({ type: "idle" }), 4000);
      return true;
    } catch (err: any) {
      setMembers(prevMembers); // Revert
      setSaveStatus({
        type: "error",
        message: err.message || "क्रम अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const headers: Record<string, string> = {
        "x-user-role": role,
      };
      if (user?.id) {
        headers["Authorization"] = `Bearer ${user.id}`;
      }

      const res = await fetch("/api/committee/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success && json.url) {
        return json.url;
      } else {
        throw new Error(json.message || "Photo upload failed");
      }
    } catch (err: any) {
      console.error("Photo upload error", err);
      throw err;
    }
  };

  return (
    <CommitteeContext.Provider
      value={{
        officers,
        members,
        loading,
        saving,
        saveStatus,
        clearStatus,
        fetchCommittee,
        updateOfficer,
        addMember,
        updateMember,
        deleteMember,
        reorderMembers,
        uploadPhoto,
      }}
    >
      {children}
    </CommitteeContext.Provider>
  );
}

export function useCommittee() {
  const context = useContext(CommitteeContext);
  if (!context) {
    throw new Error("useCommittee must be used within a CommitteeProvider");
  }
  return context;
}
