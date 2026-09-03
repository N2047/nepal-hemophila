"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert, PhoneCall, MapPin, Heart } from "lucide-react";

export function MobileActionBar() {
  const { isNepali } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-1.5 px-3">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center">
        
        {/* Support */}
        <Link
          href="/services/get-support"
          className="flex flex-col items-center justify-center p-1.5 rounded-lg text-slate-700 hover:text-accent hover:bg-slate-50 transition-colors"
        >
          <ShieldAlert className="w-5 h-5 text-accent" />
          <span className="text-[10px] font-bold mt-0.5">
            {isNepali ? "सहयोग" : "Support"}
          </span>
        </Link>

        {/* Emergency */}
        <Link
          href="/emergency"
          className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 text-red-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-bold mt-0.5">
            {isNepali ? "आकस्मिक" : "Emergency"}
          </span>
        </Link>

        {/* Centres */}
        <Link
          href="/treatment-centres"
          className="flex flex-col items-center justify-center p-1.5 rounded-lg text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors"
        >
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-bold mt-0.5">
            {isNepali ? "केन्द्रहरू" : "Centres"}
          </span>
        </Link>

        {/* Donate */}
        <Link
          href="/donate"
          className="flex flex-col items-center justify-center p-1.5 rounded-lg text-slate-700 hover:text-red-600 hover:bg-slate-50 transition-colors"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="text-[10px] font-bold mt-0.5">
            {isNepali ? "दान" : "Donate"}
          </span>
        </Link>

      </div>
    </div>
  );
}
