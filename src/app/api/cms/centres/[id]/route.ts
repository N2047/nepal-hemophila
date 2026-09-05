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

    const idx = db.centres.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Centre not found" }, { status: 404 });
    }

    const current = db.centres[idx];
    db.centres[idx] = {
      ...current,
      ...body,
      name: {
        en: body.name?.en ?? body.nameEn ?? current.name.en,
        np: body.name?.np ?? body.nameNp ?? current.name.np
      },
      address: {
        en: body.address?.en ?? body.addressEn ?? current.address.en,
        np: body.address?.np ?? body.addressNp ?? current.address.np
      },
      updated_at: new Date().toISOString()
    };

    await saveCmsDatabase(db);
    return NextResponse.json({ success: true, data: db.centres[idx], message: "उपचार केन्द्र सफलतापूर्वक सम्पादन भयो।" });
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
    const idx = db.centres.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Centre not found" }, { status: 404 });
    }

    if (permanent) {
      db.centres.splice(idx, 1);
    } else {
      db.centres[idx].is_deleted = true;
      db.centres[idx].updated_at = new Date().toISOString();
    }

    await saveCmsDatabase(db);
    return NextResponse.json({ 
      success: true, 
      message: permanent ? "उपचार केन्द्र स्थायी रूपमा हटाइयो।" : "उपचार केन्द्र रिसाइकल बिन (Trash) मा सारियो।" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
