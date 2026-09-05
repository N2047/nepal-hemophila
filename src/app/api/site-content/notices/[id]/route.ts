import { NextRequest, NextResponse } from "next/server";
import { updateNotice, deleteNotice, isAuthorizedEditor } from "@/services/siteContentDb";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedEditor(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच।" },
      { status: 403 }
    );
  }

  try {
    const id = params.id;
    const body = await request.json();

    const updated = await updateNotice(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "सुचना फेला परेन।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✓ सुचना सफलतापूर्वक अपडेट भयो।",
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "सुचना अपडेट गर्न सकिएन।", error: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedEditor(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच।" },
      { status: 403 }
    );
  }

  try {
    const id = params.id;
    const deleted = await deleteNotice(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "सुचना फेला परेन वा मेटाउन सकिएन।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✓ सुचना सफलतापूर्वक हटाइयो।"
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "सुचना मेटाउन सकिएन।", error: error?.message },
      { status: 500 }
    );
  }
}
