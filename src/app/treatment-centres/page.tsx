"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { ProvinceName } from "@/types";
import { 
  MapPin, 
  Search, 
  PhoneCall, 
  Mail, 
  CheckCircle2, 
  Navigation, 
  Building2, 
  Stethoscope, 
  ShieldCheck,
  Filter,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function TreatmentCentresPage() {
  const { isNepali, l } = useLanguage();
  const { treatmentCentres } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("All");
  const [filterFactorOnly, setFilterFactorOnly] = useState(false);
  const [filterPhysioOnly, setFilterPhysioOnly] = useState(false);

  const provinces: (ProvinceName | "All")[] = [
    "All",
    "Bagmati",
    "Gandaki",
    "Koshi",
    "Lumbini",
    "Madhesh",
    "Karnali",
    "Sudurpashchim"
  ];

  const filteredCentres = treatmentCentres.filter((c) => {
    const matchesSearch =
      c.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.np.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvince = selectedProvince === "All" || c.province === selectedProvince;
    const matchesFactor = !filterFactorOnly || c.hasFactorStorage;
    const matchesPhysio = !filterPhysioOnly || c.hasPhysiotherapy;

    return matchesSearch && matchesProvince && matchesFactor && matchesPhysio;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isNepali ? "उपचार केन्द्र निर्देशिका" : "National Treatment Centre Network"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "नेपालभरिका हेमोफिलिया उपचार केन्द्रहरू" : "Find Hemophilia Treatment Centres in Nepal"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपालका सातै प्रदेशमा रहेका सरकारी तथा शिक्षण अस्पतालहरू, जहाँ क्लोटिङ फ्याक्टर भण्डारण, आकस्मिक इन्फ्युजन तथा हेमाटोलोजी परामर्श सेवा उपलब्ध छ।"
              : "Search national referral and provincial teaching hospitals providing factor concentrates, 24/7 emergency infusions, and specialized coagulation diagnostics."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Search & Filter Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isNepali ? "अस्पताल, जिल्ला वा शहरको नाम खोज्नुहोस्..." : "Search hospital name, city, district..."}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Province Selector */}
            <div className="md:col-span-6 flex flex-wrap gap-1.5 items-center">
              {provinces.map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedProvince === prov
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>

          </div>

          {/* Checkbox Quick Filters */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <span className="font-semibold text-slate-500">Filter Facilities:</span>
            
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterFactorOnly}
                onChange={(e) => setFilterFactorOnly(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>🩸 Clotting Factor Storage Bank</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterPhysioOnly}
                onChange={(e) => setFilterPhysioOnly(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>🩺 Physiotherapy Unit On-Site</span>
            </label>

            <span className="ml-auto text-xs text-slate-500">
              Showing <strong>{filteredCentres.length}</strong> of {treatmentCentres.length} Centres
            </span>
          </div>
        </div>

        {/* Directory Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCentres.map((centre) => (
            <div
              key={centre.id}
              id={centre.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-primary-50 text-primary font-bold text-[10px] uppercase tracking-wider mb-1">
                      {centre.province} Province • {centre.hospitalType}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {l(centre.name)}
                    </h3>
                  </div>
                  {centre.isOfficialPartner && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px] shrink-0 flex items-center gap-1 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>NHS Partner</span>
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{l(centre.address)} ({centre.city}, {centre.district})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Lead Specialist:</strong> {l(centre.hematologistInCharge)}</span>
                  </div>
                </div>

                {/* Facility Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {centre.hasFactorStorage && (
                    <span className="px-2 py-0.5 rounded bg-red-50 text-accent font-semibold text-[10px] border border-red-200">
                      🩸 Factor Bank
                    </span>
                  )}
                  {centre.has24Emergency && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                      ⚡ 24/7 ER Infusion
                    </span>
                  )}
                  {centre.hasPhysiotherapy && (
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-200">
                      🏃 Physiotherapy
                    </span>
                  )}
                  {centre.hasCoagulationLab && (
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold text-[10px] border border-amber-200">
                      🔬 aPTT / Factor Lab
                    </span>
                  )}
                </div>

                {/* Services List */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-slate-700 text-[11px] block">Key Services:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                    {centre.services.map((svc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  📍 {l(centre.directions)}
                </p>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${centre.emergencyPhone}`}
                    className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                    <span>ER: {centre.emergencyPhone}</span>
                  </a>
                  <a
                    href={`tel:${centre.phone}`}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs hidden sm:inline-flex items-center gap-1"
                  >
                    <span>General: {centre.phone}</span>
                  </a>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${centre.latitude},${centre.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {filteredCentres.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="font-bold text-base text-slate-700">No Treatment Centres Match Your Criteria</h3>
            <p className="text-xs text-slate-500">Try resetting filters or searching a different district.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedProvince("All");
                setFilterFactorOnly(false);
                setFilterPhysioOnly(false);
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
