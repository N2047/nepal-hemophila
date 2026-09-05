import { NextRequest, NextResponse } from "next/server";
import { addMember, reorderMembers, isAuthorizedSuperAdmin } from "@/services/committeeDb";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: सुपर एडमिन मात्र अनुमति प्राप्त छ।" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "नाम थर अनिवार्य छ।" },
        { status: 400 }
      );
    }

    const newMember = await addMember({
      name: body.name.trim(),
      address: body.address?.trim() || "",
      phone: body.phone?.trim() || "",
      experience: body.experience?.trim() || "",
      photo: body.photo || "",
      display_order: body.display_order
    });

    return NextResponse.json({
      success: true,
      message: "नयाँ सदस्य सफलतापूर्वक थपियो।",
      data: newMember
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "सदस्य थप्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
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
    if (!body.orderedIds || !Array.isArray(body.orderedIds)) {
      return NextResponse.json(
        { success: false, message: "अमान्य क्रम विवरण।" },
        { status: 400 }
      );
    }

    const updatedList = await reorderMembers(body.orderedIds);
    return NextResponse.json({
      success: true,
      message: "सदस्यहरूको क्रम सफलतापूर्वक अपडेट भयो।",
      data: updatedList
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "क्रम अपडेट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
