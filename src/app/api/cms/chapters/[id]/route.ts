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

    const idx = db.chapters.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }

    db.chapters[idx] = {
      ...db.chapters[idx],
      ...body,
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.chapters[idx], message: "प्रादेशिक शाखा विवरण सफलतापूर्वक सम्पादन भयो।" });
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
    const idx = db.chapters.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Chapter not found" }, { status: 404 });
    }

    if (permanent) {
      db.chapters.splice(idx, 1);
    } else {
      db.chapters[idx].is_deleted = true;
      db.chapters[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "प्रादेशिक शाखा स्थायी रूपमा हटाइयो।" : "प्रादेशिक शाखा रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
