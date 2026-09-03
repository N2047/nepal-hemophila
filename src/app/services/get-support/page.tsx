"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { ProvinceName } from "@/types";
import { 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  AlertTriangle, 
  PhoneCall, 
  MapPin, 
  FileText,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function GetSupportPage() {
  const { isNepali } = useLanguage();
  const { submitSupportRequest } = useData();

  const [requesterName, setRequesterName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState<ProvinceName>("Bagmati");
  const [hospitalNear, setHospitalNear] = useState("Bir Hospital");
  const [requestType, setRequestType] = useState<any>("Emergency Factor Need");
  const [urgency, setUrgency] = useState<any>("Emergency (Immediate)");
  const [description, setDescription] = useState("");

  const [submittedTicket, setSubmittedTicket] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submitSupportRequest({
      requesterName: isAnonymous ? "Anonymous Patient" : requesterName,
      isAnonymous,
      phone,
      email,
      province,
      hospitalNear,
      requestType,
      urgency,
      description,
    });
    setSubmittedTicket(result);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-crimson text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-black tracking-wider uppercase">
            <ShieldAlert className="w-4 h-4" />
            <span>{isNepali ? "बिरामी सहायता डेस्क" : "Patient Care & Assistance Intake"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "सहयोग तथा आपतकालीन अनुरोध फारम" : "Request Medical & Patient Support"}
          </h1>
          <p className="text-sm sm:text-base text-red-100 max-w-3xl leading-relaxed">
            {isNepali
              ? "आकस्मिक फ्याक्टर आवश्यकता, अस्पताल समन्वय, फिजियोथेरापी, वा सरकारी अपाङ्गता परिचयपत्र प्राप्तिका लागि तुरुन्त अनुरोध पेश गर्नुहोस्।"
              : "Submit a confidential support ticket for emergency clotting factor, clinical referral, rehabilitation, or disability advocacy."}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {submittedTicket ? (
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                {isNepali ? "अनुरोध सफलतापूर्वक दर्ता भयो" : "Support Request Submitted"}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Ticket Tracking ID: <span className="text-primary font-mono">{submittedTicket.trackingNumber}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                {isNepali
                  ? "हाम्रो अन-कल मेडिकल टोली तथा सम्बन्धित प्रदेश शाखाले तपाईंलाई तुरुन्त सम्पर्क गर्नेछ।"
                  : "Our NHS Medical Duty Officer has been notified. We will contact you at your provided phone number immediately."}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div><strong>Requester:</strong> {submittedTicket.requesterName}</div>
              <div><strong>Urgency:</strong> <span className="font-bold text-accent">{submittedTicket.urgency}</span></div>
              <div><strong>Service:</strong> {submittedTicket.requestType}</div>
              <div><strong>Province:</strong> {submittedTicket.province}</div>
              <div><strong>Status:</strong> <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">{submittedTicket.status}</span></div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+97714221119"
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency Line (01-4221119)</span>
              </a>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-primary-900">
                {isNepali ? "अनुरोध विवरण भर्नुहोस्" : "Submit Support Request"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isNepali ? "तपाईंको स्वास्थ्य सम्बन्धी जानकारी पूर्ण रूपमा गोप्य राखिनेछ।" : "Your health details are protected with strict confidentiality."}
              </p>
            </div>

            {/* Request Type & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Support Category *</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="Emergency Factor Need">🚨 Emergency Clotting Factor Need</option>
                  <option value="Medical Advice Referral">🩺 Hospital / Specialist Referral</option>
                  <option value="Physiotherapy Booking">🏃 Physiotherapy & Joint Care</option>
                  <option value="Psychological Counselling">🤝 Counselling & Family Support</option>
                  <option value="Disability Card Support">📜 Government Disability ID Card</option>
                  <option value="Travel Assistance">🚗 Rural Emergency Travel Support</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Urgency Level *</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary font-bold text-accent"
                >
                  <option value="Emergency (Immediate)">⚡ Emergency (Immediate / Acute Bleed)</option>
                  <option value="Urgent (<24h)">⏱️ Urgent (Within 24 Hours)</option>
                  <option value="Standard">📋 Standard Inquiries (1-2 Days)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required={!isAnonymous}
                  disabled={isAnonymous}
                  value={isAnonymous ? "Anonymous Patient" : requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                  placeholder="e.g. Ramesh Thapa"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977-98XXXXXXXX"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <label htmlFor="anon" className="text-xs text-slate-600 cursor-pointer">
                Submit as <strong>Anonymous Story / Support Ticket</strong> (Only on-call duty staff will see phone)
              </label>
            </div>

            {/* Location & Hospital Near */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Province *</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="Bagmati">Bagmati Province</option>
                  <option value="Gandaki">Gandaki Province</option>
                  <option value="Koshi">Koshi Province</option>
                  <option value="Lumbini">Lumbini Province</option>
                  <option value="Madhesh">Madhesh Province</option>
                  <option value="Karnali">Karnali Province</option>
                  <option value="Sudurpashchim">Sudurpashchim Province</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nearest Hospital Centre</label>
                <input
                  type="text"
                  value={hospitalNear}
                  onChange={(e) => setHospitalNear(e.target.value)}
                  placeholder="e.g. Bir Hospital, Pokhara Academy..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Describe the Bleeding Emergency or Request *</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify affected joint/injury, patient age, diagnosis (Hemophilia A/B), factor IU required, and current condition..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>{isNepali ? "अनुरोध पेश गर्नुहोस् (Submit Request)" : "Submit Emergency / Support Ticket"}</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
