"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { FactorAvailabilityStatus, ProvinceName } from "@/types";
import { 
  Activity, 
  AlertTriangle, 
  Search, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Edit,
  Save,
  X
} from "lucide-react";
import Link from "next/link";
import { useSiteContent } from "@/context/SiteContentContext";

export default function FactorAvailabilityPage() {
  const { isNepali, l } = useLanguage();
  const { factorInventory, updateFactorStatus } = useData();
  const { role, isAuthenticated } = useAuth();
  const { features } = useSiteContent();

  const [selectedFactorType, setSelectedFactorType] = useState<string>("All");
  const [selectedProvince, setSelectedProvince] = useState<string>("All");
  const [searchHospital, setSearchHospital] = useState("");

  // Editing state for authorized medical coordinators
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<FactorAvailabilityStatus>("Available");
  const [editUnits, setEditUnits] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const canEdit = ["SUPER_ADMIN", "MEDICAL_ADMIN", "PROVINCIAL_ADMIN"].includes(role);

  const startEdit = (item: typeof factorInventory[0]) => {
    setEditingItemId(item.id);
    setEditStatus(item.status);
    setEditUnits(item.availableUnitsApprox || "");
    setEditNotes(item.contactNotes.en || "");
  };

  const saveEdit = (id: string) => {
    updateFactorStatus(id, editStatus, editUnits, editNotes);
    setEditingItemId(null);
  };

  const filteredItems = factorInventory.filter((item) => {
    const matchesFactor = selectedFactorType === "All" || item.factorType === selectedFactorType;
    const matchesProvince = selectedProvince === "All" || item.province === selectedProvince;
    const matchesSearch =
      item.hospitalName.en.toLowerCase().includes(searchHospital.toLowerCase()) ||
      item.hospitalName.np.toLowerCase().includes(searchHospital.toLowerCase());
    return matchesFactor && matchesProvince && matchesSearch;
  });

  const getStatusBadge = (status: FactorAvailabilityStatus) => {
    switch (status) {
      case "Available":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 w-fit">● Available</span>;
      case "Limited":
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1 w-fit">⚠️ Limited Stock</span>;
      case "Contact Hospital":
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center gap-1 w-fit">📞 Contact Hospital</span>;
      case "Not Available":
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs flex items-center gap-1 w-fit">✖ Out of Stock</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 w-fit">⏳ Pending</span>;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Activity className="w-3.5 h-3.5" />
            <span>{isNepali ? "प्रत्यक्ष मौज्दात निगरानी" : "National Factor Inventory Monitor"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "नेपालका अस्पतालहरूमा फ्याक्टर उपलब्धता तालिका" : "Live Clotting Factor Availability in Nepal"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "केन्द्रीय तथा प्रादेशिक अस्पतालहरूमा फ्याक्टर ८, फ्याक्टर ९, इन्हिबिटर औषधि तथा प्लाज्माको पछिल्लो अद्यावधिक मौज्दात।"
              : "Real-time stock indicators for Factor VIII, Factor IX, and bypassing agents across referral hospitals."}
          </p>
        </div>
      </section>

      {!features.factorAvailabilityTracker ? (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-inner">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isNepali ? "फ्याक्टर मौज्दात ट्रयाकर हाल निष्क्रिय छ" : "Factor Stock Tracker is Temporarily Inactive"}
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {isNepali 
              ? "व्यवस्थापकीय निर्णय अनुसार वा मौज्दात अडिटको क्रममा यो सुविधा हाल निष्क्रिय गरिएको छ। आपतकालीन फ्याक्टर आवश्यक परेमा कृपया तत्काल २४/७ हटलाइनमा सम्पर्क गर्नुहोस्।"
              : "This module is currently disabled by administration for updates or periodic stock verification. In case of emergency bleeding, please call our 24/7 hospital hotlines immediately."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/emergency" className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>{isNepali ? "२४/७ आपतकालीन सम्पर्क" : "Emergency Contact"}</span>
            </Link>
            {role === "SUPER_ADMIN" && (
              <Link href="/admin?tab=site-content" className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold text-sm shadow flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>फिचर पुन: सुचारु गर्नुहोस् (Super Admin)</span>
              </Link>
            )}
          </div>
        </div>
      ) : (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* MANDATORY Medical Travel Disclaimer (Requirement #21) */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-2xl flex items-start gap-3.5 text-amber-900 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-amber-950 block">
              {isNepali ? "अत्यावश्यक यात्रा पूर्व सूचना:" : "MANDATORY PRE-TRAVEL ADVISORY:"}
            </span>
            <p className="leading-relaxed">
              {isNepali
                ? "“अस्पतालहरूमा फ्याक्टर मौज्दात आकस्मिक आपतकालीन बिरामीका कारण जुनसुकै बेला परिवर्तन हुन सक्छ। कृपया यात्रा गर्नुअघि सम्बन्धित अस्पताल वा एन.एच.एस. सम्पर्क व्यक्तिसँग फोनमा यकिन गर्नुहोस्।”"
                : "“Availability information may change rapidly due to acute emergencies. Please confirm directly with the healthcare facility or duty hematologist before travelling from remote districts.”"}
            </p>
          </div>
        </div>

        {/* Authorized Editor Notification */}
        {canEdit && (
          <div className="p-4 rounded-xl bg-primary-50 border border-primary-200 text-xs text-primary-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span><strong>Medical Coordinator Mode:</strong> You have authorization to update hospital factor stock levels.</span>
            </div>
            <span className="text-[11px] font-semibold text-primary">Role: {role}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Search by Hospital */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchHospital}
                onChange={(e) => setSearchHospital(e.target.value)}
                placeholder="Search hospital name..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Factor Type Selector */}
            <select
              value={selectedFactorType}
              onChange={(e) => setSelectedFactorType(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="All">All Factor Types</option>
              <option value="Factor VIII">Factor VIII (Hemophilia A)</option>
              <option value="Factor IX">Factor IX (Hemophilia B)</option>
              <option value="FEIBA / APCC">FEIBA / APCC (Inhibitors)</option>
              <option value="Emicizumab">Emicizumab</option>
            </select>

            {/* Province Selector */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary"
            >
              <option value="All">All 7 Provinces</option>
              <option value="Bagmati">Bagmati Province</option>
              <option value="Gandaki">Gandaki Province</option>
              <option value="Koshi">Koshi Province</option>
              <option value="Lumbini">Lumbini Province</option>
              <option value="Madhesh">Madhesh Province</option>
              <option value="Karnali">Karnali Province</option>
              <option value="Sudurpashchim">Sudurpashchim Province</option>
            </select>

          </div>
        </div>

        {/* Live Factor Inventory Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Hospital & Province</th>
                  <th className="py-3.5 px-4">Factor Type</th>
                  <th className="py-3.5 px-4">Availability Status</th>
                  <th className="py-3.5 px-4">Approx Units / Details</th>
                  <th className="py-3.5 px-4">Last Verified</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      <div>{l(item.hospitalName)}</div>
                      <span className="text-[11px] font-normal text-slate-500">{item.province} Province</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-extrabold text-primary-900 bg-primary-50 px-2 py-0.5 rounded border border-primary-200 text-xs">
                        {item.factorType}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {editingItemId === item.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as any)}
                          className="p-1.5 border rounded-lg text-xs bg-white"
                        >
                          <option value="Available">Available</option>
                          <option value="Limited">Limited</option>
                          <option value="Contact Hospital">Contact Hospital</option>
                          <option value="Not Available">Not Available</option>
                        </select>
                      ) : (
                        getStatusBadge(item.status)
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {editingItemId === item.id ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={editUnits}
                            onChange={(e) => setEditUnits(e.target.value)}
                            placeholder="Units e.g. 5,000 IU"
                            className="p-1 border rounded text-xs w-full"
                          />
                          <input
                            type="text"
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            placeholder="Notes..."
                            className="p-1 border rounded text-xs w-full"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium text-slate-800">{item.availableUnitsApprox}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{l(item.contactNotes)}</div>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.lastUpdated}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">By: {item.updatedByRole}</div>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {canEdit && editingItemId === item.id ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                            title="Save Changes"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : canEdit ? (
                        <button
                          onClick={() => startEdit(item)}
                          className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                          title="Update Status"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      ) : (
                        <Link
                          href={`/treatment-centres#${item.centreId}`}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Call Hospital →
                        </Link>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      )}

    </div>
  );
}
