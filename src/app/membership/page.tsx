"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { ProvinceName } from "@/types";
import { 
  Users, 
  CheckCircle2, 
  Search, 
  FileText, 
  ShieldCheck, 
  Send, 
  Clock, 
  AlertCircle,
  Award,
  IdCard
} from "lucide-react";

export default function MembershipPage() {
  const { isNepali } = useLanguage();
  const { membershipApplications, submitMembershipApplication } = useData();

  const [activeTab, setActiveTab] = useState<"apply" | "track">("apply");

  // Application form state
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<any>("Male");
  const [bloodGroup, setBloodGroup] = useState("O+ve");
  const [conditionType, setConditionType] = useState<any>("Hemophilia A");
  const [severity, setSeverity] = useState<any>("Severe (<1%)");
  const [province, setProvince] = useState<ProvinceName>("Bagmati");
  const [district, setDistrict] = useState("Kathmandu");
  const [municipality, setMunicipality] = useState("Kathmandu Metropolitan");
  const [wardNo, setWardNo] = useState("1");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("Parent / Guardian");
  const [consentGiven, setConsentGiven] = useState(false);

  const [createdApp, setCreatedApp] = useState<any>(null);

  // Status tracking state
  const [trackAppNumber, setTrackAppNumber] = useState("");
  const [trackedResult, setTrackedResult] = useState<any>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert("Please check the consent box to proceed.");
      return;
    }

    const app = submitMembershipApplication({
      fullName,
      dob,
      gender,
      bloodGroup,
      conditionType,
      severity,
      province,
      district,
      municipality,
      wardNo,
      address,
      phone,
      email,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
      emergencyContactRelation: emergencyRelation,
    });
    setCreatedApp(app);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackAppNumber.trim().toUpperCase();
    const found = membershipApplications.find(
      (a) => a.applicationNumber.toUpperCase() === query || (a.membershipId && a.membershipId.toUpperCase() === query)
    );
    setTrackedResult(found || null);
    setTrackSearched(true);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-300">
            <Users className="w-3.5 h-3.5" />
            <span>{isNepali ? "संस्थागत सदस्यता" : "Official Society Membership"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "नेपाल हेमोफिलिया सोसाइटी सदस्यता आवेदन तथा स्थिति" : "NHS Membership Application & Status"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "हेमोफिलिया भएका व्यक्तिहरू, परिवार, स्वास्थ्यकर्मी तथा सहयोगी महानुभावहरूले अनलाइन सदस्यता दर्ता गर्न र आफ्नो आवेदनको स्थिति हेर्न सक्नुहुन्छ।"
              : "Register as a patient member or general society supporter. Obtain an official NHS digital identity card and voting membership rights."}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("apply")}
            className={`py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === "apply"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isNepali ? "नयाँ सदस्यता आवेदन फारम" : "New Membership Application"}</span>
          </button>

          <button
            onClick={() => setActiveTab("track")}
            className={`py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === "track"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{isNepali ? "आवेदन स्थिति जाँच (Track Status)" : "Track Application Status"}</span>
          </button>
        </div>

        {/* Tab 1: Apply Form */}
        {activeTab === "apply" && (
          <div>
            {createdApp ? (
              <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    {isNepali ? "आवेदन सफलतापूर्वक प्राप्त भयो" : "Application Successfully Received"}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Application ID: <span className="text-primary font-mono">{createdApp.applicationNumber}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                    {isNepali
                      ? "तपाईंको आवेदन एन.एच.एस. केन्द्रीय कार्यसमितिमा समीक्षाधीन छ। स्वीकृति पश्चात आधिकारिक सदस्यता परिचयपत्र जारी गरिनेछ।"
                      : "Your application is under verification by the NHS Central Secretariat. You will receive SMS confirmation once approved."}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div><strong>Applicant:</strong> {createdApp.fullName}</div>
                  <div><strong>Condition:</strong> {createdApp.conditionType} ({createdApp.severity || "N/A"})</div>
                  <div><strong>Province:</strong> {createdApp.province}</div>
                  <div><strong>Status:</strong> <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">{createdApp.status}</span></div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setCreatedApp(null);
                      setTrackAppNumber(createdApp.applicationNumber);
                      setActiveTab("track");
                    }}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm"
                  >
                    Track This Application Now
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleApply}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-primary-900">
                    {isNepali ? "सदस्यता आवेदन फारम" : "NHS Membership Application Form"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {isNepali ? "कृपया आफ्ना सही व्यक्तिगत र चिकित्सा विवरणहरू भर्नुहोस्।" : "Please enter accurate personal and diagnostic details."}
                  </p>
                </div>

                {/* Section 1: Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Personal Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rohan Manandhar"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Gender *</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Blood Group *</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-red-600"
                      >
                        <option value="A+ve">A +ve</option>
                        <option value="A-ve">A -ve</option>
                        <option value="B+ve">B +ve</option>
                        <option value="B-ve">B -ve</option>
                        <option value="AB+ve">AB +ve</option>
                        <option value="AB-ve">AB -ve</option>
                        <option value="O+ve">O +ve</option>
                        <option value="O-ve">O -ve</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Medical Condition */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Diagnosis & Bleeding Disorder Profile</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Bleeding Condition Type *</label>
                      <select
                        value={conditionType}
                        onChange={(e) => setConditionType(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary"
                      >
                        <option value="Hemophilia A">Hemophilia A (Factor VIII Deficiency)</option>
                        <option value="Hemophilia B">Hemophilia B (Factor IX Deficiency)</option>
                        <option value="vWD">Von Willebrand Disease (vWD)</option>
                        <option value="Other Bleeding Disorder">Other Rare Clotting Deficiency</option>
                        <option value="Carrier">Genetic Carrier (Female)</option>
                        <option value="Caregiver / General Member">Parent / Caregiver / Supporter Member</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Severity Level (if known)</label>
                      <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                      >
                        <option value="Severe (<1%)">Severe (&lt; 1% Factor)</option>
                        <option value="Moderate (1-5%)">Moderate (1% – 5%)</option>
                        <option value="Mild (5-40%)">Mild (5% – 40%)</option>
                        <option value="Unknown">Not Yet Tested / Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Address & Location */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Location & Address</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Province *</label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
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
                      <label className="text-xs font-bold text-slate-700">District *</label>
                      <input
                        type="text"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Municipality / Ward *</label>
                      <input
                        type="text"
                        required
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977-98XXXXXXXX"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">4. Emergency Contact</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Emergency Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        placeholder="e.g. Krishna Manandhar"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Emergency Phone *</label>
                      <input
                        type="tel"
                        required
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        placeholder="+977-98XXXXXXXX"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Relationship *</label>
                      <input
                        type="text"
                        required
                        value={emergencyRelation}
                        onChange={(e) => setEmergencyRelation(e.target.value)}
                        placeholder="e.g. Father / Mother / Spouse"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="consent" className="cursor-pointer leading-relaxed">
                    I declare that the information provided is accurate. I consent to Nepal Hemophilia Society securely storing this demographic and health profile for medical emergency coordination, factor distribution, and society membership privileges under strict data privacy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Membership Application</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Status */}
        {activeTab === "track" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div className="max-w-xl mx-auto text-center space-y-2">
              <h2 className="text-xl font-bold text-primary-900">
                {isNepali ? "सदस्यता आवेदन स्थिति ट्र्याकिङ" : "Track Your Application or Membership ID"}
              </h2>
              <p className="text-xs text-slate-500">
                {isNepali ? "आफ्नो आवेदन नम्बर (जस्तै NHS-APP-2026-041) वा सदस्यता नम्बर प्रविष्ट गर्नुहोस्:" : "Enter your Application Number (e.g. NHS-APP-2026-041) to check review progress:"}
              </p>

              <form onSubmit={handleTrack} className="flex gap-2 pt-2">
                <input
                  type="text"
                  required
                  value={trackAppNumber}
                  onChange={(e) => setTrackAppNumber(e.target.value)}
                  placeholder="NHS-APP-2026-XXX"
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm uppercase font-mono focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* Results */}
            {trackSearched && trackedResult && (
              <div className="pt-6 border-t border-slate-200 space-y-6 animate-in fade-in duration-200 max-w-xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">Application Status</span>
                      <h3 className="font-bold text-base text-slate-900">{trackedResult.fullName}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                      trackedResult.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : trackedResult.status === "Under Review"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      ● {trackedResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                    <div><strong>App Number:</strong> <span className="font-mono">{trackedResult.applicationNumber}</span></div>
                    <div><strong>Condition:</strong> {trackedResult.conditionType}</div>
                    <div><strong>Province:</strong> {trackedResult.province}</div>
                    <div><strong>Submitted:</strong> {trackedResult.submittedAt}</div>
                  </div>

                  {trackedResult.reviewerNotes && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                      <strong>Executive Review Note:</strong> {trackedResult.reviewerNotes}
                    </div>
                  )}

                  {/* If Approved: Display Digital Membership Badge */}
                  {trackedResult.status === "Approved" && (
                    <div className="p-5 bg-gradient-medical text-white rounded-2xl space-y-2 shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">NEPAL HEMOPHILIA SOCIETY</span>
                        <Award className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="pt-1">
                        <div className="text-lg font-extrabold">{trackedResult.fullName}</div>
                        <div className="text-xs text-slate-300 font-mono">Member ID: {trackedResult.membershipId}</div>
                      </div>
                      <div className="pt-2 text-[11px] text-slate-300 flex justify-between">
                        <span>{trackedResult.conditionType} ({trackedResult.bloodGroup})</span>
                        <span>{trackedResult.province} Chapter</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {trackSearched && !trackedResult && (
              <div className="text-center py-10 text-slate-500 space-y-2">
                <AlertCircle className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No Application Found for "{trackAppNumber}"</p>
                <p className="text-xs text-slate-400">Please double check your application ID format (e.g. NHS-APP-2026-041).</p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
