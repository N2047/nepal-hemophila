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

    const idx = db.advisors.findIndex((a) => a.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Advisor not found" }, { status: 404 });
    }

    db.advisors[idx] = {
      ...db.advisors[idx],
      ...body,
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.advisors[idx], message: "सल्लाहकार विवरण सफलतापूर्वक सम्पादन भयो।" });
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
    const idx = db.advisors.findIndex((a) => a.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Advisor not found" }, { status: 404 });
    }

    if (permanent) {
      db.advisors.splice(idx, 1);
    } else {
      db.advisors[idx].is_deleted = true;
      db.advisors[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "सल्लाहकार स्थायी रूपमा हटाइयो।" : "सल्लाहकार रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
