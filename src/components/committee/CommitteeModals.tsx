"use client";

import React, { useState, useRef } from "react";
import { Officer, Member, OfficerUpdateInput, MemberInput, MemberUpdateInput } from "@/types/committee";
import { Upload, X, Trash2, Camera, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";

// Helper to convert file to base64 preview or upload
async function handleFileSelect(
  file: File,
  onSuccess: (url: string) => void,
  onError: (msg: string) => void,
  uploadFn?: (file: File) => Promise<string | null>
) {
  if (file.size > 5 * 1024 * 1024) {
    onError("फोटो ५MB भन्दा ठूलो हुन सक्दैन।");
    return;
  }
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type)) {
    onError("केवल JPG, PNG, वा WebP ढाँचा मात्र मान्य छ।");
    return;
  }

  // Upload to server if uploadFn provided
  if (uploadFn) {
    try {
      const url = await uploadFn(file);
      if (url) {
        onSuccess(url);
        return;
      }
    } catch (e: any) {
      console.warn("Server upload failed, falling back to data URL", e);
    }
  }

  // Fallback to data URL
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      onSuccess(reader.result);
    }
  };
  reader.readAsDataURL(file);
}

// ---------------- 1. Officer Edit Modal ----------------
interface OfficerEditModalProps {
  officer: Officer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: OfficerUpdateInput) => Promise<boolean>;
  uploadPhotoFn?: (file: File) => Promise<string | null>;
}

export function OfficerEditModal({
  officer,
  isOpen,
  onClose,
  onSave,
  uploadPhotoFn,
}: OfficerEditModalProps) {
  if (!isOpen || !officer) return null;

  const [position, setPosition] = useState(officer.position);
  const [name, setName] = useState(officer.name);
  const [address, setAddress] = useState(officer.address || "");
  const [phone, setPhone] = useState(officer.phone || "");
  const [experience, setExperience] = useState(officer.experience || "");
  const [photo, setPhoto] = useState(officer.photo || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    await handleFileSelect(
      file,
      (url) => {
        setPhoto(url);
        setUploading(false);
      },
      (err) => {
        setError(err);
        setUploading(false);
      },
      uploadPhotoFn
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("कृपया नाम थर अनिवार्य रूपमा भर्नुहोस्।");
      return;
    }
    setSaving(true);
    setError(null);
    const success = await onSave(officer.id, {
      position: position.trim() || officer.position,
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      experience: experience.trim(),
      photo,
    });
    setSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block">
              पदाधिकारी सम्पादन
            </span>
            <h3 className="text-lg font-bold text-white">{officer.position}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Photo Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Profile Photo (फोटो अपलोड)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                {photo ? (
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-50 text-primary-700 hover:bg-primary-100 flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{photo ? "नयाँ फोटो राख्नुहोस्" : "फोटो छान्नुहोस्"}</span>
                  </button>

                  {photo && (
                    <button
                      type="button"
                      onClick={() => setPhoto("")}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>हटाउनुहोस्</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">JPG, PNG, WebP (अधिकतम ५MB)</p>
              </div>
            </div>
          </div>

          {/* Position Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">पद (Position)</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">नाम थर (Full Name) *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="श्री ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Address & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">ठेगाना (Address)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="काठमाडौं, नेपाल"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">मोबाइल नं. (Mobile)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="९८५१००००००"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">कार्यअनुभव (Work Experience)</label>
            <textarea
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="संस्थागत तथा सामाजिक क्षेत्रमा अनुभव..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              रद्द गर्नुहोस्
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>विवरण सेभ गर्नुहोस्</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- 2. Member Form Modal (Add & Edit) ----------------
interface MemberModalProps {
  member?: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberInput | MemberUpdateInput) => Promise<boolean>;
  uploadPhotoFn?: (file: File) => Promise<string | null>;
  isNew?: boolean;
}

export function MemberModal({
  member,
  isOpen,
  onClose,
  onSave,
  uploadPhotoFn,
  isNew = false,
}: MemberModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState(member?.name || "");
  const [address, setAddress] = useState(member?.address || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [experience, setExperience] = useState(member?.experience || "");
  const [photo, setPhoto] = useState(member?.photo || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    await handleFileSelect(
      file,
      (url) => {
        setPhoto(url);
        setUploading(false);
      },
      (err) => {
        setError(err);
        setUploading(false);
      },
      uploadPhotoFn
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("कृपया नाम थर अनिवार्य रूपमा भर्नुहोस्।");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      experience: experience.trim(),
      photo,
      display_order: member?.display_order || 99,
    };

    const success = await onSave(payload);
    setSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 block">
              केन्द्रीय कार्यसमिति
            </span>
            <h3 className="text-lg font-bold text-white">
              {isNew ? "नयाँ सदस्य थप्नुहोस्" : "सदस्य विवरण सम्पादन"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Photo Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Profile Photo (फोटो)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                {photo ? (
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-50 text-primary-700 hover:bg-primary-100 flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{photo ? "नयाँ फोटो राख्नुहोस्" : "फोटो छान्नुहोस्"}</span>
                  </button>

                  {photo && (
                    <button
                      type="button"
                      onClick={() => setPhoto("")}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>हटाउनुहोस्</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">JPG, PNG, WebP (अधिकतम ५MB)</p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">नाम थर (Full Name) *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="श्री / श्रीमती ..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Address & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">ठेगाना (Address)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="जिल्ला, प्रदेश"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">मोबाइल नं. (Mobile)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="९८XXXXXXXX"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">कार्यअनुभव (Work Experience)</label>
            <textarea
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="संस्थागत, सामाजिक वा क्षेत्रीय कार्यअनुभव..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              रद्द गर्नुहोस्
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-600 transition-colors shadow flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isNew ? "सदस्य थप्नुहोस्" : "अपडेट गर्नुहोस्"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------- 3. Delete Confirmation Dialog ----------------
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  memberName?: string;
  loading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  memberName,
  loading = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-900">
            के तपाईं यो सदस्यलाई हटाउन निश्चित हुनुहुन्छ?
          </h3>
          {memberName && (
            <p className="text-xs font-bold text-slate-500">
              हटाउन लागिएको: <strong className="text-slate-700">{memberName}</strong>
            </p>
          )}
          <p className="text-xs text-slate-400">
            यो कार्य फिर्ता लिन सकिने छैन र डाटाबेसबाट तुरुन्त हट्नेछ।
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            रद्द गर्नुहोस् (Cancel)
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>हटाउँदै...</span>
              </>
            ) : (
              <span>हटाउनुहोस् (Delete)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
