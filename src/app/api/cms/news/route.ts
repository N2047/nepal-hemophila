import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { CmsNewsArticle } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.news : db.news.filter((n) => !n.is_deleted && (n.status === "Published" || !n.status));
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized: Super Admin required" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const db = await getCmsDatabase();

    const titleEn = body.title?.en || body.titleEn || "Untitled Article";
    const titleNp = body.title?.np || body.titleNp || titleEn;
    const slug = body.slug || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newArticle: CmsNewsArticle = {
      id: `news-${Date.now()}`,
      slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
      title: { en: titleEn, np: titleNp },
      summary: { en: body.summary?.en || body.summaryEn || "", np: body.summary?.np || body.summaryNp || "" },
      content: { en: body.content?.en || body.contentEn || "", np: body.content?.np || body.contentNp || "" },
      category: body.category || "Society News",
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(",").map((t: string) => t.trim()) : ["NHS"]),
      author: { en: body.author?.en || body.authorEn || "NHS Central Secretariat", np: body.author?.np || body.authorNp || "एन.एच.एस. केन्द्रीय सचिवालय" },
      publishedDate: body.publishedDate || new Date().toISOString().split("T")[0],
      featuredImage: body.featuredImage || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      readTime: body.readTime || "3 min read",
      status: body.status || "Published",
      is_deleted: false,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.news.unshift(newArticle);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newArticle, message: "नयाँ समाचार सफलतापूर्वक पोस्ट गरियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
