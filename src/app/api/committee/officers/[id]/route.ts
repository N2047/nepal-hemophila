import { NextRequest, NextResponse } from "next/server";
import { updateOfficer, isAuthorizedSuperAdmin } from "@/services/committeeDb";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: सुपर एडमिन मात्र अनुमति प्राप्त छ।" },
      { status: 403 }
    );
  }

  try {
    const id = params.id;
    const body = await request.json();

    const updated = await updateOfficer(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "पदाधिकारी फेला परेन।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "पदाधिकारीको विवरण सफलतापूर्वक अपडेट भयो।",
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
