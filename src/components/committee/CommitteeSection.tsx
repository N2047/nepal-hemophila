"use client";

import React, { useState } from "react";
import { useCommittee } from "@/context/CommitteeContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { OfficerCard } from "./OfficerCard";
import { MemberCard } from "./MemberCard";
import { OfficerEditModal, MemberModal, DeleteConfirmModal } from "./CommitteeModals";
import { Officer, Member, OfficerUpdateInput, MemberUpdateInput } from "@/types/committee";
import { 
  Users, 
  ShieldCheck, 
  Settings, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface CommitteeSectionProps {
  showTitle?: boolean;
}

export function CommitteeSection({ showTitle = true }: CommitteeSectionProps) {
  const { isNepali } = useLanguage();
  const { role } = useAuth();
  const {
    officers,
    members,
    loading,
    saving,
    saveStatus,
    clearStatus,
    updateOfficer,
    updateMember,
    deleteMember,
    addMember,
    uploadPhoto,
  } = useCommittee();

  const isSuperAdmin = role === "SUPER_ADMIN";
  const [inPlaceEditEnabled, setInPlaceEditEnabled] = useState(false);

  // Modal states
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Organize officers into 1 (President) - 3 (Sr VP, VP, GS) - 2 (Secretary, Treasurer)
  // Fallback to display_order if positions change
  const president =
    officers.find((o) => o.position.trim() === "अध्यक्ष" || o.display_order === 1) ||
    officers[0];

  const middleOfficers = officers.filter(
    (o) =>
      o.id !== president?.id &&
      (o.display_order === 2 ||
        o.display_order === 3 ||
        o.display_order === 4 ||
        ["बरिष्ठ–उपाध्यक्ष", "उपाध्यक्ष", "महासचिव"].includes(o.position.trim()))
  ).slice(0, 3);

  const bottomOfficers = officers.filter(
    (o) =>
      o.id !== president?.id &&
      !middleOfficers.some((m) => m.id === o.id)
  ).slice(0, 2);

  // Remaining officers if any extra exist
  const otherOfficers = officers.filter(
    (o) =>
      o.id !== president?.id &&
      !middleOfficers.some((m) => m.id === o.id) &&
      !bottomOfficers.some((b) => b.id === o.id)
  );

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;
    setIsDeleting(true);
    await deleteMember(deletingMember.id);
    setIsDeleting(false);
    setDeletingMember(null);
  };

  return (
    <div className="space-y-16 py-6" id="central-committee-section">
      
      {/* Super Admin Status Toast */}
      {saveStatus.type !== "idle" && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all animate-in slide-in-from-bottom-4 border ${
            saveStatus.type === "saving"
              ? "bg-slate-900 text-white border-slate-700"
              : saveStatus.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-red-600 text-white border-red-500"
          }`}
        >
          {saveStatus.type === "saving" && <Loader2 className="w-5 h-5 animate-spin" />}
          {saveStatus.type === "success" && <CheckCircle2 className="w-5 h-5" />}
          {saveStatus.type === "error" && <AlertCircle className="w-5 h-5" />}
          <span className="text-xs sm:text-sm font-bold">{saveStatus.message}</span>
          <button onClick={clearStatus} className="text-white/70 hover:text-white ml-2 text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Super Admin In-Place Notice Bar */}
      {isSuperAdmin && (
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-primary-900 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>👑 सुपर एडमिन लगइन हुनुहुन्छ। कार्यसमिति व्यवस्थापन सुविधा उपलब्ध छ।</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInPlaceEditEnabled(!inPlaceEditEnabled)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                inPlaceEditEnabled
                  ? "bg-primary text-white shadow"
                  : "bg-white text-primary border border-primary-200 hover:bg-primary-100"
              }`}
            >
              {inPlaceEditEnabled ? "सम्पादन मोड बन्द गर्नुहोस्" : "✏️ सिधै सम्पादन गर्नुहोस्"}
            </button>
            <Link
              href="/admin?tab=committee"
              className="px-3 py-1.5 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>CMS प्यानल खोल्नुहोस्</span>
            </Link>
          </div>
        </div>
      )}

      {/* Section 1: केन्द्रीय कार्यसमिति पदाधिकारी (Executive Officers) */}
      <div className="space-y-8">
        {showTitle && (
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isNepali ? "केन्द्रीय नेतृत्व" : "Central Leadership"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span>{isNepali ? "केन्द्रीय कार्यसमिति" : "Central Executive Committee"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isNepali
                ? "नेपाल हेमोफिलिया सोसाइटीको राष्ट्रिय नीति, सुशासन तथा व्यवस्थापकीय नेतृत्व गर्ने पदाधिकारीहरू।"
                : "Executive office bearers governing national bleeding disorder advocacy, care, and operations."}
            </p>
          </div>
        )}

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-xs font-semibold">कार्यसमितिको विवरण लोड हुँदैछ...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* 1. ROW 1: अध्यक्ष (President) - Prominently in center */}
            {president && (
              <div className="max-w-md mx-auto">
                <OfficerCard
                  officer={president}
                  isSuperAdmin={inPlaceEditEnabled}
                  onEdit={(off) => setEditingOfficer(off)}
                />
              </div>
            )}

            {/* Visual connector line for desktop hierarchy */}
            <div className="hidden md:flex flex-col items-center justify-center -my-2 opacity-30">
              <div className="w-0.5 h-4 bg-primary" />
              <div className="w-2/3 h-0.5 bg-primary" />
            </div>

            {/* 2. ROW 2: बरिष्ठ–उपाध्यक्ष, उपाध्यक्ष, महासचिव (3 Cards) */}
            {middleOfficers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {middleOfficers.map((officer) => (
                  <OfficerCard
                    key={officer.id}
                    officer={officer}
                    isSuperAdmin={inPlaceEditEnabled}
                    onEdit={(off) => setEditingOfficer(off)}
                  />
                ))}
              </div>
            )}

            {/* 3. ROW 3: सचिव, कोषाध्यक्ष (2 Cards Centered) */}
            {bottomOfficers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {bottomOfficers.map((officer) => (
                  <OfficerCard
                    key={officer.id}
                    officer={officer}
                    isSuperAdmin={inPlaceEditEnabled}
                    onEdit={(off) => setEditingOfficer(off)}
                  />
                ))}
              </div>
            )}

            {/* Fallback for any extra officer beyond the 6 */}
            {otherOfficers.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
                {otherOfficers.map((officer) => (
                  <OfficerCard
                    key={officer.id}
                    officer={officer}
                    isSuperAdmin={inPlaceEditEnabled}
                    onEdit={(off) => setEditingOfficer(off)}
                  />
                ))}
              </div>
            )}

          </div>
        )}
      </div>

      {/* Section 2: सदस्यहरु (Committee Members) */}
      <div className="pt-8 border-t border-slate-200 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>{isNepali ? "कार्यसमिति सदस्यहरू" : "Executive Members"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isNepali ? "सदस्यहरु" : "Committee Members"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isNepali
              ? "नेपालका विभिन्न प्रदेश तथा क्षेत्रबाट प्रतिनिधित्व गर्नुहुने कार्यसमिति सदस्य महानुभावहरू।"
              : "Elected and nominated central committee members representing regions across Nepal."}
          </p>

          {/* Super Admin Quick Add Member Button */}
          {isSuperAdmin && inPlaceEditEnabled && (
            <div className="pt-2">
              <button
                onClick={() => setIsAddingMember(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ नयाँ सदस्य थप्नुहोस् (Add Member)</span>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isSuperAdmin={inPlaceEditEnabled}
                onEdit={(mem) => setEditingMember(mem)}
                onDelete={(mem) => setDeletingMember(mem)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals for Inline Editing */}
      <OfficerEditModal
        officer={editingOfficer}
        isOpen={!!editingOfficer}
        onClose={() => setEditingOfficer(null)}
        onSave={async (id, data) => {
          return await updateOfficer(id, data);
        }}
        uploadPhotoFn={uploadPhoto}
      />

      <MemberModal
        member={editingMember}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSave={async (data) => {
          if (editingMember) {
            return await updateMember(editingMember.id, data);
          }
          return false;
        }}
        uploadPhotoFn={uploadPhoto}
      />

      <MemberModal
        isOpen={isAddingMember}
        onClose={() => setIsAddingMember(false)}
        onSave={async (data) => {
          return await addMember(data as any);
        }}
        uploadPhotoFn={uploadPhoto}
        isNew={true}
      />

      <DeleteConfirmModal
        isOpen={!!deletingMember}
        memberName={deletingMember?.name}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDeleteConfirm}
        loading={isDeleting}
      />

    </div>
  );
}
