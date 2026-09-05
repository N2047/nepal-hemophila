import { NextRequest, NextResponse } from "next/server";
import { updateMember, deleteMember, isAuthorizedSuperAdmin } from "@/services/committeeDb";

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

    const updated = await updateMember(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "सदस्य फेला परेन।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "सदस्यको विवरण सफलतापूर्वक अपडेट भयो।",
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "विवरण अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const deleted = await deleteMember(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "सदस्य फेला परेन वा हटाउन सकिएन।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "सदस्य सफलतापूर्वक हटाइयो।"
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "सदस्य हटाउन सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
