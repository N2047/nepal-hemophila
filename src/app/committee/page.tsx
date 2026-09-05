import { Metadata } from "next";
import { CommitteeSection } from "@/components/committee/CommitteeSection";
import Link from "next/link";
import { ChevronRight, Home, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "केन्द्रीय कार्यसमिति (Central Executive Committee) | Nepal Hemophilia Society",
  description: "नेपाल हेमोफिलिया सोसाइटीको केन्द्रीय कार्यसमिति, पदाधिकारी तथा सदस्यहरूको आधिकारिक विवरण।",
};

export default function CommitteePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>गृहपृष्ठ</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/about" className="hover:text-white transition-colors">
              हाम्रो बारेमा
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-bold">केन्द्रीय कार्यसमिति</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Users className="w-3.5 h-3.5" />
            <span>राष्ट्रिय नेतृत्व तथा संरचना</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            केन्द्रीय कार्यसमिति (Central Executive Committee)
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            नेपालभरका हेमोफिलिया तथा वंशानुगत रक्तस्राव विकार भएका व्यक्तिहरूको स्वास्थ्य अधिकार, उपचार पहुँच, तथा संस्थागत विकासका लागि क्रियाशील केन्द्रीय कार्यसमिति।
          </p>
        </div>
      </section>

      {/* Main Committee Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <CommitteeSection showTitle={false} />
      </div>
    </div>
  );
}
