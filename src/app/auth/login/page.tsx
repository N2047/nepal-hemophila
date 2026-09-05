"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Building2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { isNepali } = useLanguage();
  const { loginWithCredentials, availableUsers } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const officialAccounts = [
    {
      roleName: "Super Admin (पूर्ण अधिकार)",
      role: "SUPER_ADMIN",
      name: "NepalHemo",
      email: "NepalHemo",
      password: "NHS123",
      scope: "Full CMS, User Roles, Audits & Database",
      icon: "👑"
    },
    {
      roleName: "Medical Admin (चिकित्सा व्यवस्थापक)",
      role: "MEDICAL_ADMIN",
      name: "Dr. Bishal Subedi",
      email: "medical@hemophilia.org.np",
      password: "Medical@NHS2026#Doc",
      scope: "Factor Stock Tracker, Clinical Guidelines & Centers",
      icon: "🩺"
    },
    {
      roleName: "Content Admin (सामग्री व्यवस्थापक)",
      role: "CONTENT_ADMIN",
      name: "Sita Adhikari",
      email: "content@hemophilia.org.np",
      password: "Content@NHS2026#Editor",
      scope: "News, Events, Patient Stories & Resources",
      icon: "✍️"
    },
    {
      roleName: "Provincial Admin (गण्डकी प्रदेश)",
      role: "PROVINCIAL_ADMIN",
      name: "Ramesh Thapa",
      email: "gandaki@hemophilia.org.np",
      password: "Gandaki@NHS2026#Prov",
      scope: "Regional Center Updates & Provincial Coordination",
      icon: "🏔️"
    },
    {
      roleName: "Finance Admin (वित्तीय व्यवस्थापक)",
      role: "FINANCE_ADMIN",
      name: "Gita Shrestha",
      email: "finance@hemophilia.org.np",
      password: "Finance@NHS2026#Audit",
      scope: "Donation Ledger, Tax Receipts & Annual Audit",
      icon: "💰"
    },
    {
      roleName: "Patient Portal (बिरामी खाता)",
      role: "PATIENT",
      name: "Aashish Tamang",
      email: "patient.aashish@gmail.com",
      password: "Patient@NHS2026#Care",
      scope: "Personal Bleeding Diary & Factor Log",
      icon: "🩹"
    },
    {
      roleName: "Member Portal (सदस्यता खाता)",
      role: "MEMBER",
      name: "Bikash Gurung",
      email: "bikash.member@gmail.com",
      password: "Member@NHS2026#Nepal",
      scope: "Digital Membership Card & AGM Voting",
      icon: "🎗️"
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const res = loginWithCredentials(email, password);
    if (!res.success) {
      setErrorMessage(res.message || "Invalid login credentials.");
      return;
    }

    if (res.role === "PATIENT") {
      router.push("/portal/patient");
    } else if (res.role === "MEMBER") {
      router.push("/portal/member");
    } else {
      router.push("/admin");
    }
  };

  const autofillAccount = (acc: typeof officialAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage("");
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-8 bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-5xl space-y-8">
        
        {/* Main Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Brand Panel */}
          <div className="lg:col-span-5 bg-gradient-medical text-white p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center font-black text-white text-sm shadow-md">
                NHS
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {isNepali ? "नेपाल हेमोफिलिया सोसाइटी" : "Nepal Hemophilia Society"}
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed">
                Official Institutional Portal & Administrative Management CMS.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure Role-Based Access (RBAC)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-PII Public Health Data Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted Audit Logging & Access Control</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-white/10 pt-3 flex justify-between">
              <span>SWC Reg: 1290</span>
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Official Portal Access</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {isNepali ? "व्यवस्थापक तथा सदस्य लगइन" : "Sign In to Institutional Account"}
              </h3>
              <p className="text-xs text-slate-500">Enter your authorized email address and secure password:</p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Official Email ID *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hemophilia.org.np"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In & Open Dashboard</span>
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500">
              Need access? Contact Central Secretariat at <a href="mailto:admin@hemophilia.org.np" className="text-primary font-semibold">admin@hemophilia.org.np</a>
            </div>

          </div>

        </div>

        {/* Official Credentials Reference Table (Requirement #57) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900">
                  {isNepali ? "आधिकारिक प्रयोगकर्ता खाता सूची" : "Official System Accounts Directory"}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Click <strong>"Auto-Fill"</strong> on any role to securely populate account and sign in:
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-primary-50 text-primary rounded-lg border border-primary-200 self-start sm:self-auto">
              7 Active Roles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Role & Official Name</th>
                  <th className="py-3 px-3">Login Email / ID</th>
                  <th className="py-3 px-3">Password Status</th>
                  <th className="py-3 px-3">Access Scope</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {officialAccounts.map((acc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{acc.icon}</span>
                        <div>
                          <div>{acc.roleName}</div>
                          <span className="text-[11px] font-normal text-slate-500">{acc.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-primary font-bold">{acc.email}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 font-bold tracking-widest bg-slate-50/80 px-2 rounded">
                      ••••••••
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-[11px]">{acc.scope}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => autofillAccount(acc)}
                        className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-[11px] shadow-sm transition-colors"
                      >
                        Auto-Fill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
