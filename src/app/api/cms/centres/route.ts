import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { CmsTreatmentCentre } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.centres : db.centres.filter((c) => !c.is_deleted && (c.status === "Published" || !c.status));
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

    const nameEn = body.name?.en || body.nameEn || "New Treatment Centre";
    const nameNp = body.name?.np || body.nameNp || nameEn;
    const addressEn = body.address?.en || body.addressEn || "Nepal";
    const addressNp = body.address?.np || body.addressNp || addressEn;

    const newCentre: CmsTreatmentCentre = {
      id: `tc-${Date.now()}`,
      name: { en: nameEn, np: nameNp },
      hospitalType: body.hospitalType || "Provincial Hospital",
      province: body.province || "Bagmati",
      district: body.district || "Kathmandu",
      city: body.city || "Kathmandu",
      address: { en: addressEn, np: addressNp },
      phone: body.phone || "+977-1-4221119",
      emergencyPhone: body.emergencyPhone || "+977-9851000000",
      email: body.email || "info@hemophilia-nepal.org.np",
      hematologistInCharge: {
        en: body.hematologistInCharge?.en || body.doctorEn || "Lead Medical Team",
        np: body.hematologistInCharge?.np || body.doctorNp || "प्रमुख स्वास्थ्य टोली"
      },
      services: Array.isArray(body.services) ? body.services : (body.services ? body.services.split(",").map((s: string) => s.trim()) : ["Factor Infusion"]),
      hasFactorStorage: !!body.hasFactorStorage,
      has24Emergency: body.has24Emergency !== false,
      hasPhysiotherapy: !!body.hasPhysiotherapy,
      hasCoagulationLab: !!body.hasCoagulationLab,
      isOfficialPartner: body.isOfficialPartner !== false,
      latitude: typeof body.latitude === "number" ? body.latitude : (parseFloat(body.latitude) || 27.7172),
      longitude: typeof body.longitude === "number" ? body.longitude : (parseFloat(body.longitude) || 85.3240),
      directions: {
        en: body.directions?.en || body.directionsEn || "Located within the main hospital complex.",
        np: body.directions?.np || body.directionsNp || "अस्पतालको मुख्य परिसरभित्र अवस्थित।"
      },
      status: body.status || "Published",
      is_deleted: false,
      display_order: db.centres.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.centres.unshift(newCentre);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newCentre, message: "नयाँ उपचार केन्द्र सफलतापूर्वक थपियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
