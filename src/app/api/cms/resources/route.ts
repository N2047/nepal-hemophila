import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { CmsResourceItem } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.resources : db.resources.filter((r) => !r.is_deleted && (r.status === "Published" || !r.status));
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

    const titleEn = body.title?.en || body.titleEn || "New Resource Document";
    const titleNp = body.title?.np || body.titleNp || titleEn;

    const fileUrl = body.fileUrl || body.downloadUrl || "/docs/nhs-guide.pdf";
    const newResource: CmsResourceItem = {
      id: `res-${Date.now()}`,
      title: { en: titleEn, np: titleNp },
      description: { en: body.description?.en || body.descriptionEn || "", np: body.description?.np || body.descriptionNp || "" },
      category: body.category || "Guidelines",
      audience: body.audience || "Patients & Families",
      language: body.language || "Bilingual",
      year: Number(body.year) || new Date().getFullYear(),
      fileType: body.fileType || "PDF",
      fileUrl: fileUrl,
      downloadUrl: fileUrl,
      fileSize: body.fileSize || "1.2 MB",
      downloadCount: 0,
      thumbnail: body.thumbnail || "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80",
      author: typeof body.author === "object" && body.author !== null ? body.author : {
        en: typeof body.author === "string" ? body.author : "NHS Medical Board",
        np: "एन.एच.एस. मेडिकल बोर्ड"
      },
      publisher: typeof body.publisher === "object" && body.publisher !== null ? body.publisher : {
        en: typeof body.publisher === "string" ? body.publisher : "Nepal Hemophilia Society",
        np: "नेपाल हेमोफिलिया सोसाइटी"
      },
      status: body.status || "Published",
      is_deleted: false,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.resources.unshift(newResource);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newResource, message: "नयाँ स्रोत सामग्री सफलतापूर्वक थपियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
