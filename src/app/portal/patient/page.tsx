"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText,
  User,
  MapPin,
  Lock,
  Download
} from "lucide-react";
import Link from "next/link";

interface BleedLogEntry {
  id: string;
  date: string;
  joint: string;
  cause: "Spontaneous" | "Trauma / Fall" | "Physical Activity" | "Dental / Surgery";
  factorInfused: string;
  factorVialBatch: string;
  painLevel: number;
  notes: string;
}

export default function PatientPortalPage() {
  const { isNepali } = useLanguage();
  const { user } = useAuth();
  const { supportRequests, logAudit } = useData();

  // Personal Patient Profile
  const patientProfile = {
    patientCode: user?.patientId || "NHS-P-2026-089",
    name: user?.name || "Aashish Tamang",
    dob: "2002-04-12",
    diagnosis: "Severe Hemophilia A (Factor VIII Deficiency)",
    baselineLevel: "< 0.8% (Severe)",
    inhibitorStatus: "Negative (Last tested: 2026-03)",
    primaryHospital: "Bir Hospital (NAMS) - Hematology Day Care",
    leadPhysician: "Dr. Bishesh Poudyal",
    targetJoints: ["Right Knee", "Left Ankle"],
    emergencyContact: "Krishna Tamang (Father) - +977-9841000000",
  };

  // Bleeding & Infusion Log State
  const [bleedLogs, setBleedLogs] = useState<BleedLogEntry[]>([
    {
      id: "log-1",
      date: "2026-08-30",
      joint: "Right Knee",
      cause: "Physical Activity",
      factorInfused: "500 IU Factor VIII",
      factorVialBatch: "WFH-F8-2026-9912",
      painLevel: 6,
      notes: "Swelling reduced within 6 hours post-infusion. R.I.C.E. applied.",
    },
    {
      id: "log-2",
      date: "2026-08-12",
      joint: "Left Ankle",
      cause: "Spontaneous",
      factorInfused: "500 IU Factor VIII",
      factorVialBatch: "WFH-F8-2026-8841",
      painLevel: 5,
      notes: "Early morning tingling sensation. Factor infused immediately.",
    }
  ]);

  const [showAddLog, setShowAddLog] = useState(false);
  const [newLogJoint, setNewLogJoint] = useState("Right Knee");
  const [newLogCause, setNewLogCause] = useState<any>("Spontaneous");
  const [newLogFactor, setNewLogFactor] = useState("500 IU Factor VIII");
  const [newLogBatch, setNewLogBatch] = useState("BATCH-2026-09");
  const [newLogPain, setNewLogPain] = useState(5);
  const [newLogNotes, setNewLogNotes] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: BleedLogEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      joint: newLogJoint,
      cause: newLogCause,
      factorInfused: newLogFactor,
      factorVialBatch: newLogBatch,
      painLevel: newLogPain,
      notes: newLogNotes,
    };
    setBleedLogs([newEntry, ...bleedLogs]);
    logAudit("ADD_PATIENT_BLEED_LOG", "BleedLogEntry", newEntry.id, `Patient logged bleed in ${newLogJoint}`);
    setShowAddLog(false);
    setNewLogNotes("");
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      
      {/* Header */}
      <div className="bg-gradient-medical text-white py-10 px-4 sm:px-8 border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
              <Lock className="w-3.5 h-3.5" />
              <span>Confidential Patient Health Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {patientProfile.name}
            </h1>
            <p className="text-xs text-slate-200">
              Patient ID: <span className="font-mono font-bold text-amber-300">{patientProfile.patientCode}</span> • Hospital: {patientProfile.primaryHospital}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/services/get-support"
              className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs shadow-md transition-colors"
            >
              🚨 Emergency Factor Request
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Patient Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-primary-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span>Clinical Profile & Diagnostics</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
              ● Active NHS Registry Patient
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Diagnosis</span>
              <span className="font-bold text-slate-900 text-sm">{patientProfile.diagnosis}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Factor Baseline Level</span>
              <span className="font-bold text-red-600 text-sm">{patientProfile.baselineLevel}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Inhibitor Test</span>
              <span className="font-bold text-emerald-700 text-sm">{patientProfile.inhibitorStatus}</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block font-semibold">Target Joints</span>
              <span className="font-bold text-slate-900 text-sm">{patientProfile.targetJoints.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Bleeding Diary & Factor Log */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-primary-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                <span>Personal Bleeding & Factor Infusion Diary</span>
              </h2>
              <p className="text-xs text-slate-500">Track all acute bleeds and factor infusions to review with your hematologist.</p>
            </div>

            <button
              onClick={() => setShowAddLog(true)}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Log Bleed / Infusion</span>
            </button>
          </div>

          <div className="space-y-3">
            {bleedLogs.map((log) => (
              <div key={log.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">📍 {log.joint}</span>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                      {log.cause}
                    </span>
                  </div>
                  <span className="text-slate-400">📅 {log.date}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                  <div><strong>Dose Infused:</strong> {log.factorInfused}</div>
                  <div><strong>Vial Batch:</strong> <span className="font-mono">{log.factorVialBatch}</span></div>
                  <div><strong>Pain Level (1-10):</strong> {log.painLevel}/10</div>
                </div>

                {log.notes && (
                  <p className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 mt-1">
                    "{log.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add Log Modal */}
          {showAddLog && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <form onSubmit={handleAddLog} className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Record Bleed / Infusion</h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Affected Joint / Muscle</label>
                  <select
                    value={newLogJoint}
                    onChange={(e) => setNewLogJoint(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Right Knee">Right Knee</option>
                    <option value="Left Knee">Left Knee</option>
                    <option value="Right Elbow">Right Elbow</option>
                    <option value="Left Elbow">Left Elbow</option>
                    <option value="Right Ankle">Right Ankle</option>
                    <option value="Left Ankle">Left Ankle</option>
                    <option value="Muscle Hematoma">Muscle Hematoma</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Cause of Bleed</label>
                  <select
                    value={newLogCause}
                    onChange={(e) => setNewLogCause(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  >
                    <option value="Spontaneous">Spontaneous (Without trauma)</option>
                    <option value="Trauma / Fall">Trauma / Fall / Injury</option>
                    <option value="Physical Activity">Physical Activity / Strain</option>
                    <option value="Dental / Surgery">Dental Extraction / Minor Surgery</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Factor Dose Infused</label>
                  <input
                    type="text"
                    required
                    value={newLogFactor}
                    onChange={(e) => setNewLogFactor(e.target.value)}
                    placeholder="e.g. 500 IU Factor VIII"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Vial Batch Number</label>
                  <input
                    type="text"
                    value={newLogBatch}
                    onChange={(e) => setNewLogBatch(e.target.value)}
                    placeholder="e.g. WFH-F8-2026-9912"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Notes & Recovery</label>
                  <textarea
                    rows={2}
                    value={newLogNotes}
                    onChange={(e) => setNewLogNotes(e.target.value)}
                    placeholder="Describe swelling, recovery, ice pack..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLog(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
