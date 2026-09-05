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

    const idx = db.events.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    const current = db.events[idx];
    db.events[idx] = {
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
      location: {
        en: body.location?.en ?? body.locationEn ?? current.location.en,
        np: body.location?.np ?? body.locationNp ?? current.location.np
      },
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.events[idx], message: "कार्यक्रम सफलतापूर्वक सम्पादन भयो।" });
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
    const idx = db.events.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }

    if (permanent) {
      db.events.splice(idx, 1);
    } else {
      db.events[idx].is_deleted = true;
      db.events[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "कार्यक्रम स्थायी रूपमा हटाइयो।" : "कार्यक्रम रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
