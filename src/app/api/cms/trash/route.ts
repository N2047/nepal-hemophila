import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized: Super Admin required" }, { status: 403 });
  }

  try {
    const db = await getCmsDatabase();
    const trash = {
      news: db.news.filter((item) => item.is_deleted),
      events: db.events.filter((item) => item.is_deleted),
      resources: db.resources.filter((item) => item.is_deleted),
      centres: db.centres.filter((item) => item.is_deleted),
      chapters: db.chapters.filter((item) => item.is_deleted),
      advisors: db.advisors.filter((item) => item.is_deleted),
    };

    const totalDeleted = 
      trash.news.length + 
      trash.events.length + 
      trash.resources.length + 
      trash.centres.length + 
      trash.chapters.length + 
      trash.advisors.length;

    return NextResponse.json({
      success: true,
      data: trash,
      totalCount: totalDeleted
    });
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
    const { type, id } = body; // type: "news" | "events" | "resources" | "centres" | "chapters" | "advisors"
    const db = await getCmsDatabase();

    const collection = (db as any)[type];
    if (!collection || !Array.isArray(collection)) {
      return NextResponse.json({ success: false, message: "Invalid entity collection type" }, { status: 400 });
    }

    const item = collection.find((x: any) => x.id === id);
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found in database" }, { status: 404 });
    }

    item.is_deleted = false;
    item.updated_at = new Date().toISOString();

    await saveCmsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "✓ सामग्री सफलतापूर्वक रिसाइकल बिनबाट पुनर्स्थापना (Restored) गरियो।"
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized: Super Admin required" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { type, id } = body;
    const db = await getCmsDatabase();

    const collection = (db as any)[type];
    if (!collection || !Array.isArray(collection)) {
      return NextResponse.json({ success: false, message: "Invalid entity collection type" }, { status: 400 });
    }

    const idx = collection.findIndex((x: any) => x.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    collection.splice(idx, 1);
    await saveCmsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "✓ सामग्री स्थायी रूपमा नष्ट गरियो।"
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
