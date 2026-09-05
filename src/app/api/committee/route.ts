import { NextRequest, NextResponse } from "next/server";
import { getCommitteeData, saveCommitteeData, isAuthorizedSuperAdmin } from "@/services/committeeDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getCommitteeData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to load committee data", error: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: सुपर एडमिन मात्र अनुमति प्राप्त छ।" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    if (!body || !Array.isArray(body.officers) || !Array.isArray(body.members)) {
      return NextResponse.json(
        { success: false, message: "अमान्य डेटा ढाँचा।" },
        { status: 400 }
      );
    }

    await saveCommitteeData(body);
    return NextResponse.json({ success: true, message: "विवरण सफलतापूर्वक अपडेट भयो।" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
