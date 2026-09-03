"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, CheckCircle2, Award } from "lucide-react";

export default function AccessibilityStatementPage() {
  const { isNepali } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 text-slate-800">
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
          <Eye className="w-3.5 h-3.5" />
          <span>WCAG 2.1 AA Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-primary-900">
          {isNepali ? "पहुँच योग्यता प्रतिबद्धता (Accessibility Statement)" : "Accessibility Statement (WCAG 2.1 AA)"}
        </h1>
        <p className="text-xs text-slate-500">Committed to universal digital access for all citizens and persons with disabilities.</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-4 leading-relaxed">
        <p>
          Nepal Hemophilia Society is dedicated to ensuring that its digital platform is accessible to all individuals, including people with visual impairments, motor disabilities, learning differences, and cognitive variations.
        </p>

        <h3 className="font-bold text-base text-slate-900">Key Accessibility Features Implemented:</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
          <li><strong>Dedicated Accessibility Control Toolbar:</strong> Instant toggle for High Contrast mode, Font Resizing (100%, 120%, 140%), Dyslexia-friendly typography, and Reduced Motion.</li>
          <li><strong>Screen Reader Navigation:</strong> Full semantic HTML5 landmarks (`&lt;main&gt;`, `&lt;nav&gt;`, `&lt;header&gt;`, `&lt;footer&gt;`), ARIA attributes, and Skip-to-content links.</li>
          <li><strong>Complete Bilingual Support:</strong> Seamless English and Nepali (Devanagari) toggle across all navigation, clinical articles, and emergency triage forms.</li>
          <li><strong>Keyboard Operability:</strong> All interactive modals, search bars, and dropdown menus are fully navigable using <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[10px]">Tab</kbd>, <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[10px]">Enter</kbd>, and <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[10px]">Esc</kbd>.</li>
        </ul>

        <h3 className="font-bold text-base text-slate-900">Feedback and Assistance</h3>
        <p>
          If you experience any accessibility barrier while browsing, please contact our accessibility coordinator at: <a href="mailto:accessibility@hemophilia.org.np" className="text-primary font-semibold">accessibility@hemophilia.org.np</a>.
        </p>
      </div>
    </div>
  );
}
