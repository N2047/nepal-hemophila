import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized: Super Admin required" }, { status: 403 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const db = await getCmsDatabase();

    const idx = db.news.findIndex((n) => n.id === id || n.slug === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    const current = db.news[idx];
    db.news[idx] = {
      ...current,
      ...body,
      title: {
        en: body.title?.en ?? body.titleEn ?? current.title.en,
        np: body.title?.np ?? body.titleNp ?? current.title.np
      },
      summary: {
        en: body.summary?.en ?? body.summaryEn ?? current.summary.en,
        np: body.summary?.np ?? body.summaryNp ?? current.summary.np
      },
      content: {
        en: body.content?.en ?? body.contentEn ?? current.content.en,
        np: body.content?.np ?? body.contentNp ?? current.content.np
      },
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.news[idx], message: "समाचार सफलतापूर्वक सम्पादन भयो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized: Super Admin required" }, { status: 403 });
  }

  try {
    const { id } = params;
    const url = new URL(request.url);
    const permanent = url.searchParams.get("permanent") === "true";

    const db = await getCmsDatabase();
    const idx = db.news.findIndex((n) => n.id === id || n.slug === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
    }

    if (permanent) {
      db.news.splice(idx, 1);
    } else {
      db.news[idx].is_deleted = true;
      db.news[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "समाचार स्थायी रूपमा हटाइयो।" : "समाचार रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
