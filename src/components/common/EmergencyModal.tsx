"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert, PhoneCall, AlertTriangle, MapPin, X, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const { isNepali } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
      >
        {/* Red Emergency Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full emergency-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="emergency-modal-title" className="text-lg sm:text-xl font-bold">
                {isNepali ? "आकस्मिक रक्तस्राव प्राथमिक सहयोग" : "Emergency Bleeding Assistance"}
              </h2>
              <p className="text-xs text-red-100">
                {isNepali ? "२४ सै घण्टा आकस्मिक सेवा र परामर्श" : "24/7 Emergency Triage & Factor Support"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Medical Disclaimer Alert */}
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg flex gap-3 text-red-900 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{isNepali ? "गम्भीर सूचना: " : "CRITICAL WARNING: "}</span>
              {isNepali
                ? "टाउकोको चोट, घाँटी सुन्निनु, अत्यधिक पेट दुखाइ वा अनियन्त्रित रक्तस्राव भएमा ढिला नगरी नजिकैको अस्पतालको आकस्मिक कक्षमा जानुहोस्।"
                : "For head trauma, throat swelling, severe abdominal pain, or heavy bleeding, proceed directly to the nearest hospital emergency room. Do NOT wait for symptoms to worsen."}
            </div>
          </div>

          {/* Quick Hotlines */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>{isNepali ? "तुरुन्त फोन सम्पर्क गर्नुहोस्" : "Direct Emergency Hotlines"}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
              <a
                href="tel:+97714221988"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:bg-red-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">Bir Hospital Emergency</div>
                  <div className="text-slate-500 text-xs">Central Referral Bank</div>
                </div>
                <span className="font-bold text-red-600 group-hover:scale-105 transition-transform">
                  01-4221988
                </span>
              </a>

              <a
                href="tel:+97714412505"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:bg-red-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">TUTH Maharajgunj ER</div>
                  <div className="text-slate-500 text-xs">Kathmandu Referral</div>
                </div>
                <span className="font-bold text-red-600 group-hover:scale-105 transition-transform">
                  01-4412505
                </span>
              </a>

              <a
                href="tel:+97714427452"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:bg-red-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">Kanti Children's ER</div>
                  <div className="text-slate-500 text-xs">Pediatric Bleeding Unit</div>
                </div>
                <span className="font-bold text-red-600 group-hover:scale-105 transition-transform">
                  01-4427452
                </span>
              </a>

              <a
                href="tel:+9779851000000"
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:bg-red-50/50 flex items-center justify-between group transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">NHS On-Call Hotline</div>
                  <div className="text-slate-500 text-xs">National Patient Support</div>
                </div>
                <span className="font-bold text-red-600 group-hover:scale-105 transition-transform">
                  9851000000
                </span>
              </a>
            </div>
          </div>

          {/* Rapid R.I.C.E. Guide */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-xs text-primary-900 uppercase tracking-wider mb-2">
              {isNepali ? "तत्काल R.I.C.E. प्राथमिक उपचार विधि" : "Immediate R.I.C.E. First-Aid"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-primary block">R - Rest</span>
                <span className="text-slate-500 text-[11px]">{isNepali ? "चोट लागेको भाग नचलाउनुहोस्" : "Immobilize joint"}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-primary block">I - Ice</span>
                <span className="text-slate-500 text-[11px]">{isNepali ? "कपडामा बेरी बरफ सेक्नुहोस्" : "15-20 mins wrapped"}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-primary block">C - Compress</span>
                <span className="text-slate-500 text-[11px]">{isNepali ? "हल्का ब्यान्डेज बाँध्नुहोस्" : "Gentle elastic wrap"}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-primary block">E - Elevate</span>
                <span className="text-slate-500 text-[11px]">{isNepali ? "मुटुको सतहभन्दा माथि उठाउनुहोस्" : "Elevate above heart"}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <Link
              href="/treatment-centres"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>{isNepali ? "नजिकैको उपचार केन्द्र खोज्नुहोस्" : "Find Nearest Hospital Centre"}</span>
            </Link>

            <Link
              href="/factor-availability"
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors"
            >
              <Activity className="w-4 h-4 text-accent" />
              <span>{isNepali ? "फ्याक्टर मौज्दात हेर्नुहोस्" : "Factor Stock"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
