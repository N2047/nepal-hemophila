"use client";

import React, { useState } from "react";
import { useCommittee } from "@/context/CommitteeContext";
import { useAuth } from "@/context/AuthContext";
import { Officer, Member, OfficerUpdateInput, MemberInput, MemberUpdateInput } from "@/types/committee";
import { OfficerEditModal, MemberModal, DeleteConfirmModal } from "@/components/committee/CommitteeModals";
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  GripVertical, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  MapPin,
  Phone,
  Briefcase,
  Eye,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

export function CommitteeAdminManager() {
  const { role } = useAuth();
  const {
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
  } = useCommittee();

  const isSuperAdmin = role === "SUPER_ADMIN";

  // Sub-tab selection: "all" | "officers" | "members"
  const [activeSubTab, setActiveSubTab] = useState<"officers" | "members">("officers");

  // Modals
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Drag & drop / reordering state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Move member up/down helper
  const handleMoveMember = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === members.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newMembers = [...members];
    const temp = newMembers[index];
    newMembers[index] = newMembers[targetIndex];
    newMembers[targetIndex] = temp;

    const orderedIds = newMembers.map((m) => m.id);
    await reorderMembers(orderedIds);
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newMembers = [...members];
    const [moved] = newMembers.splice(draggedIndex, 1);
    newMembers.splice(targetIndex, 0, moved);

    setDraggedIndex(null);
    const orderedIds = newMembers.map((m) => m.id);
    await reorderMembers(orderedIds);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;
    setIsDeleting(true);
    await deleteMember(deletingMember.id);
    setIsDeleting(false);
    setDeletingMember(null);
  };

  if (!isSuperAdmin) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center max-w-lg mx-auto space-y-3">
        <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
        <h3 className="text-lg font-bold text-amber-900">सुरक्षा प्रतिबन्ध</h3>
        <p className="text-xs text-amber-700 leading-relaxed">
          केन्द्रीय कार्यसमिति व्यवस्थापन गर्न केवल <strong>SUPER_ADMIN</strong> लाई मात्र अधिकार छ। कृपया सुपर एडमिन खाताबाट लगइन गर्नुहोस्।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>केन्द्रीय नेतृत्व व्यवस्थापन</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            केन्द्रीय कार्यसमिति व्यवस्थापन
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            यहाँबाट केन्द्रीय पदाधिकारीहरू (६ जना) तथा सदस्यहरूको विवरण, फोटो, पद तथा क्रम व्यवस्थापन गर्नुहोस्। गरिएको परिवर्तन तुरुन्तै वेबसाइटको पब्लिक पेजमा लागू हुनेछ।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => fetchCommittee()}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेस</span>
          </button>
          <Link
            href="/about#leadership"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-primary border border-primary-200 hover:bg-primary-50 flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>पब्लिक पेज हेर्नुहोस्</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Save Status Notification Banner */}
      {saveStatus.type !== "idle" && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between border transition-all animate-in fade-in ${
            saveStatus.type === "saving"
              ? "bg-slate-900 text-white border-slate-700"
              : saveStatus.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-red-50 text-red-900 border-red-300"
          }`}
        >
          <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
            {saveStatus.type === "saving" && <Loader2 className="w-4 h-4 animate-spin text-amber-400" />}
            {saveStatus.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {saveStatus.type === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{saveStatus.message}</span>
          </div>
          <button onClick={clearStatus} className="text-xs font-semibold underline opacity-70 hover:opacity-100">
            हटाउनुहोस्
          </button>
        </div>
      )}

      {/* Sub Tabs: पदाधिकारी vs सदस्यहरु */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab("officers")}
            className={`py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === "officers"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>पदाधिकारी ({officers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("members")}
            className={`py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === "members"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>सदस्यहरु ({members.length})</span>
          </button>
        </div>

        {activeSubTab === "members" && (
          <button
            onClick={() => setIsAddingMember(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>नयाँ सदस्य थप्नुहोस् (Add Member)</span>
          </button>
        )}
      </div>

      {/* TAB 1: पदाधिकारी व्यवस्थापन (Officers - Exactly 6 fixed positions) */}
      {activeSubTab === "officers" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-50 via-white to-primary-50/20 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 flex items-center justify-between shadow-xs">
            <p className="leading-relaxed">
              केन्द्रीय कार्यसमितिमा <strong className="text-primary-900 font-bold">६ वटा निश्चित पदहरू</strong> रहेका छन्। पदको विवरण, फोटो, मोबाइल वा कार्यअनुभव सम्पादन गर्न सम्बन्धित कार्डको <strong className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">[Edit]</strong> बटन थिच्नुहोस्।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                {/* Top Badge & Edit Button */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-red-700 bg-gradient-to-r from-red-50 via-rose-50 to-red-50/70 border border-red-200 shadow-xs">
                    {officer.position}
                  </span>
                  <button
                    onClick={() => setEditingOfficer(officer)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-primary hover:text-white transition-colors flex items-center gap-1 border border-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Profile Photo & Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    {officer.photo ? (
                      <img src={officer.photo} alt={officer.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary-700 text-white font-black text-xl flex items-center justify-center">
                        {officer.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{officer.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span>{officer.address || "ठेगाना नभएको"}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span>{officer.phone || "सम्पर्क नभएको"}</span>
                    </p>
                  </div>
                </div>

                {/* Experience snippet */}
                {officer.experience && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-600 line-clamp-2">
                    {officer.experience}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: सदस्यहरु व्यवस्थापन (Members - Dynamic CRUD & Reordering) */}
      {activeSubTab === "members" && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>
              सदस्यहरूलाई <strong>Drag & Drop</strong> वा <strong>तीर (Arrows)</strong> द्वारा क्रम परिवर्तन गर्न सकिन्छ। क्रम फेरिएपछि डाटाबेस स्वतः अपडेट हुन्छ।
            </p>
            <span className="font-bold text-slate-800 font-mono">
              कुल सदस्य संख्या: {members.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((member, index) => (
              <div
                key={member.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={`bg-white rounded-3xl border transition-all duration-200 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                  draggedIndex === index
                    ? "border-primary-400 opacity-50 ring-2 ring-primary/20 scale-95"
                    : "border-slate-200"
                }`}
              >
                {/* Header: Drag Handle, Order #, and Action Buttons */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                      title="तानेर क्रम मिलाउनुहोस्"
                    >
                      <GripVertical className="w-4 h-4" />
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 font-mono">
                      #{member.display_order}
                    </span>
                  </div>

                  {/* Reorder Arrows & Edit/Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveMember(index, "up")}
                      disabled={index === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 transition-colors"
                      title="माथि सार्नुहोस्"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveMember(index, "down")}
                      disabled={index === members.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 transition-colors"
                      title="तल सार्नुहोस्"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-4 bg-slate-200 mx-1" />

                    <button
                      onClick={() => setEditingMember(member)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-50 transition-colors"
                      title="सम्पादन गर्नुहोस्"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingMember(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="हटाउनुहोस्"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Member Info (NO "पद" field) */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-700 text-white font-black text-xl flex items-center justify-center">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">{member.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span>{member.address || "ठेगाना नभएको"}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Phone className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span>{member.phone || "सम्पर्क नभएको"}</span>
                    </p>
                  </div>
                </div>

                {/* Experience */}
                {member.experience && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-600 line-clamp-2">
                    {member.experience}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
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
