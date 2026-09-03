"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Layers,
  Sparkles,
  X
} from "lucide-react";

export default function ResourcesPage() {
  const { isNepali, l } = useLanguage();
  const { resources, incrementDownloadCount } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [selectedFileType, setSelectedFileType] = useState<string>("All");

  // Document Preview Modal State
  const [previewItem, setPreviewItem] = useState<any>(null);

  const categories = [
    "All",
    "Guidelines",
    "Reports",
    "Brochures",
    "Forms",
    "Research Papers",
    "E-Learning"
  ];

  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.np.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesLang = selectedLanguage === "All" || item.language === selectedLanguage;
    const matchesFile = selectedFileType === "All" || item.fileType === selectedFileType;

    return matchesSearch && matchesCat && matchesLang && matchesFile;
  });

  const handleDownload = (id: string, title: string) => {
    incrementDownloadCount(id);
    alert(`Downloading: ${title} (${id})\nThank you for using the NHS Resource Library.`);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isNepali ? "डिजिटल स्रोत पुस्तकालय" : "Digital Resource & Document Repository"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "हेमोफिलिया स्रोत तथा शैक्षिक पुस्तकालय" : "Resource Library & Clinical Publications"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीद्वारा प्रकाशित निर्देशिका, ब्रोसर, वार्षिक प्रतिवेदन तथा दर्ता फारमहरू डाउनलोड गर्नुहोस्।"
              : "Search and download verified clinical guidelines, patient pocket handbooks, annual registry reports, and official application forms."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search document title, guideline, topic..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Language Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
              >
                <option value="All">All Languages</option>
                <option value="Nepali">Nepali (नेपाली)</option>
                <option value="English">English</option>
                <option value="Bilingual">Bilingual</option>
              </select>
            </div>

            {/* File Type Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
              >
                <option value="All">All File Formats</option>
                <option value="PDF">PDF Documents</option>
                <option value="DOCX">DOCX Documents</option>
                <option value="Video">Video Guides</option>
              </select>
            </div>

          </div>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-primary-50 text-primary font-bold text-[10px] uppercase">
                    {res.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {res.fileType} • {res.fileSize}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {l(res.title)}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {l(res.description)}
                </p>

                <div className="text-[11px] text-slate-500 space-y-0.5 pt-2 border-t border-slate-100">
                  <div><strong>Audience:</strong> {res.audience}</div>
                  <div><strong>Language:</strong> {res.language} • <strong>Year:</strong> {res.year}</div>
                  <div><strong>Downloads:</strong> {res.downloadCount.toLocaleString()} times</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewItem(res)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(res.id, l(res.title))}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Document Preview Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{previewItem.category}</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">{l(previewItem.title)}</h3>
                </div>
                <button onClick={() => setPreviewItem(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {l(previewItem.description)}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div><strong>Publisher:</strong> {l(previewItem.publisher)}</div>
                <div><strong>Author:</strong> {l(previewItem.author)}</div>
                <div><strong>Format:</strong> {previewItem.fileType} ({previewItem.fileSize})</div>
                <div><strong>Language:</strong> {previewItem.language}</div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewItem.id, l(previewItem.title));
                    setPreviewItem(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
