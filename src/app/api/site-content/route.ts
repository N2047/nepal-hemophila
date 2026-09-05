import { NextRequest, NextResponse } from "next/server";
import { 
  getSiteContent, 
  saveSiteContent, 
  isAuthorizedSuperAdmin, 
  isAuthorizedEditor 
} from "@/services/siteContentDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSiteContent();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "साइट कन्टेन्ट लोड गर्न सकिएन।", error: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedEditor(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: केवल अधिकृत एडमिनहरूलाई मात्र सम्पादन अनुमति छ।" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const current = await getSiteContent();

    // If attempting to modify `features` (turning features on/off), MUST be SUPER_ADMIN
    if (body.features && JSON.stringify(body.features) !== JSON.stringify(current.features)) {
      if (!isAuthorizedSuperAdmin(request)) {
        return NextResponse.json(
          { success: false, message: "फिचर हटाउने वा अन/अफ गर्ने अधिकार केवल सुपर एडमिनलाई मात्र छ।" },
          { status: 403 }
        );
      }
      current.features = { ...current.features, ...body.features };
    }

    if (body.visionMission) {
      current.visionMission = { ...current.visionMission, ...body.visionMission };
    }
    if (body.hero) {
      current.hero = { ...current.hero, ...body.hero };
    }
    if (body.emergency) {
      current.emergency = { ...current.emergency, ...body.emergency };
    }
    if (body.stats) {
      current.stats = { ...current.stats, ...body.stats };
    }
    if (body.orgDetails) {
      current.orgDetails = { ...current.orgDetails, ...body.orgDetails };
    }
    if (Array.isArray(body.notices)) {
      current.notices = body.notices;
    }

    await saveSiteContent(current);
    return NextResponse.json({
      success: true,
      message: "✓ विवरण सफलतापूर्वक अपडेट भयो।",
      data: current
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
