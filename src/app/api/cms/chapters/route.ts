import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { ProvincialChapter } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.chapters : db.chapters.filter((c) => !c.is_deleted && (c.status === "Published" || !c.status));
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

    const newChapter: ProvincialChapter = {
      id: `chap-${Date.now()}`,
      provinceNameNp: body.provinceNameNp || "प्रादेशिक शाखा",
      provinceNameEn: body.provinceNameEn || "Provincial Chapter",
      cityNp: body.cityNp || "",
      cityEn: body.cityEn || "",
      coordinatorNameNp: body.coordinatorNameNp || "संयोजक",
      coordinatorNameEn: body.coordinatorNameEn || "Coordinator",
      phone: body.phone || "+977-1-4221119",
      email: body.email || "info@hemophilia-nepal.org.np",
      addressNp: body.addressNp || "",
      addressEn: body.addressEn || "",
      partnerHospitalNp: body.partnerHospitalNp || "",
      partnerHospitalEn: body.partnerHospitalEn || "",
      servicesNp: body.servicesNp || "",
      servicesEn: body.servicesEn || "",
      display_order: db.chapters.length + 1,
      status: body.status || "Published",
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.chapters.push(newChapter);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newChapter, message: "नयाँ प्रादेशिक शाखा सफलतापूर्वक थपियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
