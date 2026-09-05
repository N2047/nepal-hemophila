import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { GlobalWebsiteSettings } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);

    if (isSuper) {
      return NextResponse.json({
        success: true,
        data: db
      });
    }

    // Public view: filter out deleted, draft, and hidden items
    const publicDb = {
      ...db,
      news: db.news.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
      events: db.events.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
      resources: db.resources.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
      centres: db.centres.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
      chapters: db.chapters.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
      advisors: db.advisors.filter((item) => !item.is_deleted && (item.status === "Published" || !item.status)),
    };

    return NextResponse.json({
      success: true,
      data: publicDb
    });
  } catch (error: any) {
    console.error("Failed to fetch CMS DB:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load website content." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: केवल सुपर एडमिनलाई मात्र सेटिङ परिवर्तन गर्ने अनुमति छ।" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const db = await getCmsDatabase();

    if (body.settings) {
      db.settings = { ...db.settings, ...(body.settings as Partial<GlobalWebsiteSettings>) };
    }

    await saveCmsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "वेबसाइट सेटिङहरू सफलतापूर्वक अद्यावधिक गरियो।",
      data: db.settings
    });
  } catch (error: any) {
    console.error("Failed to update CMS settings:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
