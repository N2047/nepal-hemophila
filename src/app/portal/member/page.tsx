"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, 
  Award, 
  CheckCircle2, 
  Download, 
  Calendar, 
  FileText, 
  QrCode,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function MemberPortalPage() {
  const { isNepali } = useLanguage();
  const { user } = useAuth();

  const memberProfile = {
    name: user?.name || "Bikash Gurung",
    memberId: user?.memberId || "NHS-MEM-2024-0312",
    joinedDate: "2024-01-15",
    chapter: "Gandaki Provincial Chapter (Pokhara)",
    type: "Life Member",
    status: "Active (Good Standing)",
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      
      {/* Header */}
      <div className="bg-gradient-medical text-white py-10 px-4 sm:px-8 border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-300">
              <Users className="w-3.5 h-3.5" />
              <span>NHS Member Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Member Dashboard — {memberProfile.name}
            </h1>
            <p className="text-xs text-slate-200">
              Member ID: <span className="font-mono font-bold text-amber-300">{memberProfile.memberId}</span> • Chapter: {memberProfile.chapter}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Digital Membership ID Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <div className="bg-gradient-medical text-white rounded-3xl p-8 border-4 border-primary-700 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-white text-xs">
                  NHS
                </div>
                <div>
                  <h3 className="font-bold text-base text-white leading-tight">NEPAL HEMOPHILIA SOCIETY</h3>
                  <span className="text-[10px] text-slate-300">Official National Identity Card • SWC 1290</span>
                </div>
              </div>
              <Award className="w-6 h-6 text-amber-300" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Member Name</span>
              <h2 className="text-2xl font-black text-amber-300">{memberProfile.name}</h2>
              <span className="font-mono text-xs text-slate-200 block">ID: {memberProfile.memberId}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-200 pt-2 border-t border-white/15">
              <div>
                <span className="text-[10px] text-slate-400 block">Membership Type</span>
                <strong className="text-white">{memberProfile.type}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className="text-emerald-300 font-bold">● {memberProfile.status}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-white/10">
              <span>Valid Throughout Nepal</span>
              <span>Bir Hospital Premises, Kathmandu</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-primary-900">Member Privileges & Participation</h3>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AGM & Voting Rights:</strong> Right to vote and stand for election during the National General Assembly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Priority Emergency Support:</strong> Direct coordination with regional duty hematologists during hospital admissions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Educational & Youth Camps:</strong> Free participation in annual family conferences and youth leadership workshops.</span>
              </li>
            </ul>

            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Print Official Digital Membership Card</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
