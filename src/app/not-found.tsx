"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50 text-center">
      <div className="max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-accent flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 font-mono">Error 404 • Page Not Found</span>
          <h1 className="text-2xl font-black text-slate-900">Requested Page Unavailable</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you are trying to access may have moved or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/treatment-centres"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Find Treatment Centres
          </Link>
        </div>
      </div>
    </div>
  );
}
