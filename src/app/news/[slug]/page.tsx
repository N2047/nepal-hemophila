"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  Tag, 
  Bookmark,
  Heart
} from "lucide-react";
import Link from "next/link";

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isNepali, l, lang } = useLanguage();
  const { newsArticles } = useData();

  const article = newsArticles.find((a) => a.slug === slug);
  const [activeLangTab, setActiveLangTab] = useState<"current" | "en" | "np">("current");

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Article Not Found</h1>
        <p className="text-sm text-slate-500">The requested news item or story could not be found.</p>
        <Link href="/news" className="inline-block px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs">
          Back to News
        </Link>
      </div>
    );
  }

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: l(article.title),
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* Top Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to News & Stories</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-bold text-xs uppercase tracking-wider">
              {article.category}
            </span>
            {article.isStoryConsentVerified && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Patient Consent Verified</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {l(article.title)}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <strong>{l(article.author)}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{article.publishedDate}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-72 sm:h-96 w-full bg-slate-100">
          <img
            src={article.featuredImage}
            alt={l(article.title)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dual Language Switcher for Article Reader */}
        <div className="flex items-center justify-between p-3 bg-slate-100 rounded-2xl">
          <span className="text-xs font-semibold text-slate-600">Article Translation:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveLangTab("en")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeLangTab === "en" || (activeLangTab === "current" && lang === "en")
                  ? "bg-primary text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLangTab("np")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                activeLangTab === "np" || (activeLangTab === "current" && lang === "np")
                  ? "bg-primary text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              नेपाली
            </button>
          </div>
        </div>

        {/* Full Article Content */}
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-slate-800">
          {activeLangTab === "np" || (activeLangTab === "current" && lang === "np") ? (
            <div className="whitespace-pre-line font-nepali">
              {article.content.np || article.content.en}
            </div>
          ) : (
            <div className="whitespace-pre-line">
              {article.content.en || article.content.np}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Related Tags:</span>
          {article.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            {isNepali ? "सम्बन्धित समाचार तथा कथाहरू" : "Related Articles"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all group space-y-2"
              >
                <span className="text-[10px] font-bold uppercase text-primary">{rel.category}</span>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {l(rel.title)}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{l(rel.summary)}</p>
              </Link>
            ))}
          </div>
        </div>

      </article>

    </div>
  );
}
