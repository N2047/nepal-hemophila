"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  BookOpen, 
  MapPin, 
  Activity, 
  Users, 
  ShieldAlert, 
  Heart, 
  ShieldCheck, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Download,
  Search,
  Sparkles,
  TrendingUp,
  UserCheck,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { provinceStats, diagnosisBreakdown } from "@/data/mockData";
import { CommitteeAdminManager } from "@/components/admin/CommitteeAdminManager";
import { SiteContentAdminManager } from "@/components/admin/SiteContentAdminManager";
import { UniversalCmsManager } from "@/components/admin/UniversalCmsManager";

export default function AdminDashboardPage() {
  const { isNepali, l } = useLanguage();
  const { user, role, hasRole, loginAs } = useAuth();
  const {
    stats,
    newsArticles,
    addNewsArticle,
    deleteNewsArticle,
    events,
    resources,
    treatmentCentres,
    factorInventory,
    updateFactorStatus,
    membershipApplications,
    updateMembershipStatus,
    supportRequests,
    updateSupportStatus,
    donations,
    auditLogs,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    "overview" | "cms" | "site-content" | "committee" | "news" | "events" | "resources" | "centres" | "factor" | "membership" | "support" | "donations" | "audits" | "trash"
  >("cms");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "committee") {
        setActiveTab("committee");
      } else if (tabParam === "site-content") {
        setActiveTab("site-content");
      } else if (tabParam === "cms") {
        setActiveTab("cms");
      } else if (tabParam === "trash") {
        setActiveTab("trash");
      } else if (tabParam === "overview") {
        setActiveTab("overview");
      }
    }
  }, []);

  // Super Admin Password Gate & Credential State
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false);
  const [adminIdInput, setAdminIdInput] = useState<string>("");
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isUnlocked = localStorage.getItem("nhs_admin_session") === "unlocked";
      if (isUnlocked) {
        loginAs("SUPER_ADMIN");
        setAdminUnlocked(true);
      }
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = adminIdInput.trim();
    const pass = adminPasswordInput.trim();

    if (
      (id.toLowerCase() === "nepalhemo" || id.toLowerCase() === "admin@hemophilia.org.np") &&
      pass === "NHS123"
    ) {
      loginAs("SUPER_ADMIN");
      localStorage.setItem("nhs_admin_session", "unlocked");
      setAdminUnlocked(true);
      setLoginError("");
    } else {
      setLoginError("अमान्य लगइन विवरण! कृपया आफ्नो सही Admin ID र Password प्रविष्ट गर्नुहोस्।");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("nhs_admin_session");
    setAdminUnlocked(false);
    setAdminPasswordInput("");
  };

  // Quick Create News Form Modal State
  const [showAddNews, setShowAddNews] = useState(false);
  const [newsTitleEn, setNewsTitleEn] = useState("");
  const [newsTitleNp, setNewsTitleNp] = useState("");
  const [newsSummaryEn, setNewsSummaryEn] = useState("");
  const [newsSummaryNp, setNewsSummaryNp] = useState("");
  const [newsCategory, setNewsCategory] = useState<any>("Society News");

  // Role Protection check
  const isAuthorized = ["SUPER_ADMIN", "CONTENT_ADMIN", "MEDICAL_ADMIN", "PROVINCIAL_ADMIN", "FINANCE_ADMIN"].includes(role);

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newsTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    addNewsArticle({
      id: `news-${Date.now()}`,
      slug,
      title: { en: newsTitleEn, np: newsTitleNp || newsTitleEn },
      summary: { en: newsSummaryEn, np: newsSummaryNp || newsSummaryEn },
      content: { en: newsSummaryEn, np: newsSummaryNp || newsSummaryEn },
      category: newsCategory,
      tags: ["NHS", newsCategory],
      author: { en: user?.name || "NepalHemo", np: user?.name || "NepalHemo" },
      publishedDate: new Date().toISOString().split("T")[0],
      featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      readTime: "3 min read",
    });
    setShowAddNews(false);
    setNewsTitleEn("");
    setNewsTitleNp("");
    setNewsSummaryEn("");
    setNewsSummaryNp("");
  };

  // 1. If not unlocked, display the Super Admin Login Gate
  if (!adminUnlocked) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-slate-300 text-slate-900 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md border border-amber-500">
              <Lock className="w-8 h-8" />
            </div>
            <div className="pt-2">
              <span className="px-3 py-1 rounded-md bg-amber-400 text-black font-black text-xs uppercase tracking-wider border border-amber-500 shadow-sm">
                NHS Central CMS • v1.0.4-prod
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black pt-1">
              Institutional Admin Login
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              संस्थागत सुपर एडमिन प्यानलमा पहुँचका लागि आधिकारिक आइडी र पासवर्ड प्रविष्ट गर्नुहोस्।
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-black block">
                Admin ID (प्रयोगकर्ता आइडी) *
              </label>
              <input
                type="text"
                required
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="प्रणाली आइडी राख्नुहोस्"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-black font-extrabold text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-black block">
                Password (पासवर्ड) *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-black font-mono font-extrabold text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-black text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-amber-500"
            >
              <KeyRound className="w-4 h-4" />
              <span>प्रणालीमा प्रवेश गर्नुहोस् (Log In)</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2 text-center">
            <Link
              href="/"
              className="text-xs font-black text-primary hover:underline flex items-center justify-center gap-1 pt-1"
            >
              <span>← मुख्य वेबसाइटमा फर्कनुहोस् (Back to Public Site)</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unlocked Admin Dashboard View with High-Contrast Black Header
  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      
      {/* Top Admin Header (High Contrast Black Typography) */}
      <div className="bg-white border-b-2 border-slate-300 py-6 px-4 sm:px-8 shadow-sm text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-400 text-black font-black text-xs uppercase tracking-wider border border-amber-500 shadow-sm">
                NHS Central CMS
              </span>
              <span className="text-xs text-black font-black font-mono">v1.0.4-prod</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Institutional Administration Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-black">
              <span className="text-black font-extrabold text-sm sm:text-base">
                Logged in as: <strong className="text-black font-black underline underline-offset-4">NepalHemo</strong>
              </span>
              <span className="text-black font-bold hidden sm:inline">•</span>
              <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-400 px-3 py-1 rounded-xl shadow-xs">
                <span className="text-black font-black text-xs sm:text-sm">Password:</span>
                <input
                  type="password"
                  value={adminPasswordInput || "NHS123"}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="bg-white border-2 border-black rounded-lg px-2.5 py-0.5 text-black font-mono font-black text-sm w-28 tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                  placeholder="••••••••"
                  title="Super Admin Password (Masked)"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-bold text-xs border border-slate-300 transition-colors"
            >
              ← Public Website
            </Link>
            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition-colors shadow flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>लगआउट गर्नुहोस् (Lock)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Navigation Sidebar Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          {[
            { id: "cms", label: "🌐 सम्पूर्ण CMS (Website Content Management)", icon: Sparkles },
            { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
            { id: "site-content", label: "⚙️ फिचर तथा हेडलाइन व्यवस्थापन", icon: LayoutDashboard },
            { id: "committee", label: "👥 केन्द्रीय कार्यसमिति", icon: Users },
            { id: "membership", label: `Memberships (${membershipApplications.filter(m => m.status === 'Submitted').length} pending)`, icon: Users },
            { id: "support", label: `Support Tickets (${supportRequests.filter(s => s.status === 'New').length} new)`, icon: ShieldAlert },
            { id: "factor", label: "Factor Inventory", icon: Activity },
            { id: "donations", label: "Donations & Ledger", icon: Heart },
            { id: "audits", label: "Security Audit Logs", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Patients</span>
                <span className="text-2xl font-black text-primary block">{stats.totalPatients}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Registered in Registry</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Members</span>
                <span className="text-2xl font-black text-teal-700 block">{stats.totalMembers}</span>
                <span className="text-[10px] text-slate-500">Active Society Members</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Care Centres</span>
                <span className="text-2xl font-black text-slate-900 block">{stats.totalCentres}</span>
                <span className="text-[10px] text-primary font-semibold">Across 7 Provinces</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Donations</span>
                <span className="text-xl font-black text-emerald-700 block font-mono">
                  NPR {stats.totalDonationsNPR.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified Receipts</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Factor Distributed</span>
                <span className="text-2xl font-black text-accent block">184.5K IU</span>
                <span className="text-[10px] text-red-600 font-semibold">This Fiscal Year</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Open Tickets</span>
                <span className="text-2xl font-black text-amber-600 block">
                  {supportRequests.filter((s) => s.status !== "Resolved").length}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">Awaiting Triage</span>
              </div>
            </div>

            {/* Analytical Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900">Province Demographic Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={provinceStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <XAxis dataKey="province" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                      <Bar dataKey="patients" fill="#0F3A66" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900">Diagnosis Ratio</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diagnosisBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {diagnosisBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MEMBERSHIP APPLICATIONS REVIEW */}
        {activeTab === "membership" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Membership Applications Intake</h2>
                <p className="text-xs text-slate-500">Review, verify medical diagnostic attachments, and allocate official NHS Membership IDs.</p>
              </div>
              <span className="text-xs font-bold text-primary">{membershipApplications.length} Total Applications</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">App Number</th>
                    <th className="py-3 px-3">Full Name</th>
                    <th className="py-3 px-3">Condition & Blood</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {membershipApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-primary">{app.applicationNumber}</td>
                      <td className="py-3.5 px-3 font-semibold text-slate-900">{app.fullName}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-bold text-[10px]">
                          {app.conditionType} ({app.bloodGroup})
                        </span>
                      </td>
                      <td className="py-3.5 px-3">{app.district}, {app.province}</td>
                      <td className="py-3.5 px-3 font-mono">{app.phone}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          app.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "Under Review"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        {app.status !== "Approved" && (
                          <button
                            onClick={() => {
                              const newId = `NHS-MEM-2026-${Math.floor(100 + Math.random() * 900)}`;
                              updateMembershipStatus(app.id, "Approved", "Verified by Central Executive Committee", newId);
                            }}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] mr-1.5 shadow-sm"
                          >
                            ✓ Approve
                          </button>
                        )}
                        {app.status === "Submitted" && (
                          <button
                            onClick={() => updateMembershipStatus(app.id, "Under Review", "Diagnostic lab report undergoing medical verification")}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px]"
                          >
                            Review
                          </button>
                        )}
                        {app.membershipId && (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold">
                            ID: {app.membershipId}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SUPPORT REQUESTS TRIAGE */}
        {activeTab === "support" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Emergency & Patient Support Requests</h2>
                <p className="text-xs text-slate-500">Triage acute bleed tickets, assign regional duty officers, and log resolution notes.</p>
              </div>
            </div>

            <div className="space-y-3">
              {supportRequests.map((req) => (
                <div
                  key={req.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    req.urgency === "Emergency (Immediate)"
                      ? "bg-red-50/50 border-red-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{req.trackingNumber}</span>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        req.urgency === "Emergency (Immediate)" ? "bg-red-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {req.urgency}
                      </span>
                    </div>
                    <span className="text-slate-400">{req.createdAt}</span>
                  </div>

                  <div className="py-3 space-y-2 text-xs text-slate-700">
                    <div className="flex flex-wrap gap-4 font-semibold text-slate-900">
                      <span>👤 {req.requesterName}</span>
                      <span>📞 {req.phone}</span>
                      <span>📍 {req.province} (Near {req.hospitalNear || "N/A"})</span>
                      <span>🏷️ {req.requestType}</span>
                    </div>
                    <p className="bg-white p-3 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                      "{req.description}"
                    </p>
                    {req.resolutionNotes && (
                      <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-900 text-[11px]">
                        <strong>Resolution Note:</strong> {req.resolutionNotes} (Assigned: {req.assignedStaff || "NHS Team"})
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">Status: <strong className="text-slate-800">{req.status}</strong></span>
                    <div className="flex gap-1.5">
                      {req.status !== "Resolved" && (
                        <button
                          onClick={() => {
                            const note = prompt("Enter resolution details / Factor dispensed:");
                            if (note) updateSupportStatus(req.id, "Resolved", note, user?.name || "Duty Officer");
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm"
                        >
                          ✓ Mark Resolved
                        </button>
                      )}
                      {req.status === "New" && (
                        <button
                          onClick={() => updateSupportStatus(req.id, "In Progress", "Coordinator dispatched / Factor reserved", user?.name || "Duty Officer")}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs"
                        >
                          Assign to Me
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FACTOR INVENTORY CMS */}
        {activeTab === "factor" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Hospital Factor Inventory Tracker</h2>
                <p className="text-xs text-slate-500">Manage real-time factor stocks and emergency guidance notes.</p>
              </div>
              <Link href="/factor-availability" className="text-xs font-bold text-primary hover:underline">
                View Public Table →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Hospital</th>
                    <th className="py-3 px-3">Province</th>
                    <th className="py-3 px-3">Factor Type</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Approx Units</th>
                    <th className="py-3 px-3">Last Verified</th>
                    <th className="py-3 px-3 text-right">Quick Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {factorInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900">{l(item.hospitalName)}</td>
                      <td className="py-3 px-3">{item.province}</td>
                      <td className="py-3 px-3 font-bold text-primary">{item.factorType}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.status === "Available" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">{item.availableUnitsApprox}</td>
                      <td className="py-3 px-3 text-slate-400">{item.lastUpdated}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const newUnits = prompt("Enter new approximate factor units:", item.availableUnitsApprox);
                            if (newUnits) updateFactorStatus(item.id, "Available", newUnits);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-primary hover:text-white font-semibold text-[11px] transition-colors"
                        >
                          Update Units
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: NEWS CMS */}
        {activeTab === "news" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">News, Bulletins & Patient Stories CMS</h2>
                <p className="text-xs text-slate-500">Publish bilingual news, press releases, and consent-verified patient journeys.</p>
              </div>
              <button
                onClick={() => setShowAddNews(true)}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create Article</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Author</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {newsArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-slate-900 max-w-xs truncate">{l(art.title)}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-bold text-[10px]">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500">{art.publishedDate}</td>
                      <td className="py-3.5 px-3">{l(art.author)}</td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => deleteNewsArticle(art.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Creating News */}
            {showAddNews && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <form onSubmit={handleCreateNews} className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Create New Bilingual Article</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">English Title *</label>
                    <input
                      type="text"
                      required
                      value={newsTitleEn}
                      onChange={(e) => setNewsTitleEn(e.target.value)}
                      placeholder="Title in English..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nepali Title (नेपाली शीर्षक) *</label>
                    <input
                      type="text"
                      required
                      value={newsTitleNp}
                      onChange={(e) => setNewsTitleNp(e.target.value)}
                      placeholder="नेपालीमा शीर्षक..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-nepali"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                    >
                      <option value="Society News">Society News</option>
                      <option value="Medical Updates">Medical Updates</option>
                      <option value="Patient Stories">Patient Stories</option>
                      <option value="Advocacy">Advocacy</option>
                      <option value="Press Releases">Press Releases</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">English Summary / Content</label>
                    <textarea
                      rows={3}
                      required
                      value={newsSummaryEn}
                      onChange={(e) => setNewsSummaryEn(e.target.value)}
                      placeholder="Content text in English..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nepali Summary / Content (नेपाली विवरण)</label>
                    <textarea
                      rows={3}
                      value={newsSummaryNp}
                      onChange={(e) => setNewsSummaryNp(e.target.value)}
                      placeholder="नेपालीमा विवरण..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-nepali"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddNews(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: SECURITY AUDIT LOGS */}
        {activeTab === "audits" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Security & Administrative Audit Trail</h2>
                <p className="text-xs text-slate-500">Immutable timestamped logs of all administrative actions and sensitive health data access.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">User & Role</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Target Entity</th>
                    <th className="py-3 px-3">IP Address</th>
                    <th className="py-3 px-3">Result</th>
                    <th className="py-3 px-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 whitespace-nowrap text-slate-500">{log.timestamp}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{log.userName} ({log.role})</td>
                      <td className="py-3 px-3 font-bold text-primary">{log.action}</td>
                      <td className="py-3 px-3">{log.entity}</td>
                      <td className="py-3 px-3 text-slate-400">{log.ipAddress}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {log.result}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-sans text-xs">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: DONATIONS & FINANCIAL LEDGER */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Donation & Contribution Ledger</h2>
                <p className="text-xs text-slate-500">Real-time ledger of verified contributions and digital receipts.</p>
              </div>
              <button
                onClick={() => alert("Exporting financial ledger as CSV...")}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Ledger (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Receipt No.</th>
                    <th className="py-3 px-3">Donor Name</th>
                    <th className="py-3 px-3">Fund Category</th>
                    <th className="py-3 px-3">Amount (NPR)</th>
                    <th className="py-3 px-3">Gateway</th>
                    <th className="py-3 px-3">Txn Ref</th>
                    <th className="py-3 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-accent">{d.receiptNumber}</td>
                      <td className="py-3.5 px-3 font-semibold text-slate-900">{d.donorName}</td>
                      <td className="py-3.5 px-3">{d.category}</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-700">NPR {d.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[10px]">
                          {d.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">{d.transactionReference}</td>
                      <td className="py-3.5 px-3 text-slate-400 text-[11px]">{d.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: UNIVERSAL MASTER CMS */}
        {(activeTab === "cms" || activeTab === "trash" || activeTab === "news" || activeTab === "events" || activeTab === "resources" || activeTab === "centres") && (
          <UniversalCmsManager />
        )}

        {/* TAB: SITE CONTENT & FEATURE CMS */}
        {activeTab === "site-content" && (
          <SiteContentAdminManager />
        )}

        {/* TAB: CENTRAL WORKING COMMITTEE MANAGEMENT */}
        {activeTab === "committee" && (
          <CommitteeAdminManager />
        )}

      </div>

    </div>
  );
}
