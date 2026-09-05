import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { MedicalAdvisor } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.advisors : db.advisors.filter((a) => !a.is_deleted && (a.status === "Published" || !a.status));
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

    const newAdvisor: MedicalAdvisor = {
      id: `adv-${Date.now()}`,
      nameNp: body.nameNp || "चिकित्सक सल्लाहकार",
      nameEn: body.nameEn || "Medical Advisor",
      titleNp: body.titleNp || "सल्लाहकार",
      titleEn: body.titleEn || "Advisor",
      institutionNp: body.institutionNp || "",
      institutionEn: body.institutionEn || "",
      photo: body.photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      bioNp: body.bioNp || "",
      bioEn: body.bioEn || "",
      display_order: db.advisors.length + 1,
      status: body.status || "Published",
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.advisors.push(newAdvisor);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newAdvisor, message: "नयाँ सल्लाहकार सफलतापूर्वक थपियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
