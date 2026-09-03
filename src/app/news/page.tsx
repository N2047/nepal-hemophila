"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  FileText, 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  const { isNepali, l } = useLanguage();
  const { newsArticles } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Society News",
    "Medical Updates",
    "Patient Stories",
    "Advocacy",
    "Press Releases"
  ];

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.title.np.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-300">
            <FileText className="w-3.5 h-3.5" />
            <span>{isNepali ? "समाचार तथा कथाहरू" : "Official News & Patient Stories"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "सोसाइटी समाचार, क्लिनिकल अपडेट र अनुभवहरू" : "NHS Society News, Clinical Updates & Voices"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटीका गतिविधिहरू, राष्ट्रिय नीति संवाद, शिविर विवरण तथा बिरामीहरूका प्रेरणादायी अनुभवहरू।"
              : "Read verified press releases, clinical updates, national advocacy progress, and human-centered patient journeys."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news by title, keyword, or tag..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
            />
          </div>

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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.featuredImage}
                    alt={l(article.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-primary-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {l(article.title)}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {l(article.summary)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {l(article.author)}
                </span>
                <Link
                  href={`/news/${article.slug}`}
                  className="text-xs font-bold text-primary group-hover:text-primary-dark flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>

    </div>
  );
}
