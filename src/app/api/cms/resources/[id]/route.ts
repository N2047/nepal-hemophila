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

    const idx = db.resources.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Resource not found" }, { status: 404 });
    }

    const current = db.resources[idx];
    db.resources[idx] = {
      ...current,
      ...body,
      title: {
        en: body.title?.en ?? body.titleEn ?? current.title.en,
        np: body.title?.np ?? body.titleNp ?? current.title.np
      },
      description: {
        en: body.description?.en ?? body.descriptionEn ?? current.description.en,
        np: body.description?.np ?? body.descriptionNp ?? current.description.np
      },
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.resources[idx], message: "स्रोत सामग्री सफलतापूर्वक सम्पादन भयो।" });
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
    const idx = db.resources.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Resource not found" }, { status: 404 });
    }

    if (permanent) {
      db.resources.splice(idx, 1);
    } else {
      db.resources[idx].is_deleted = true;
      db.resources[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "स्रोत सामग्री स्थायी रूपमा हटाइयो।" : "स्रोत सामग्री रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
