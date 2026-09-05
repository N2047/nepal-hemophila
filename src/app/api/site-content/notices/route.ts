import { NextRequest, NextResponse } from "next/server";
import { addNotice, isAuthorizedEditor } from "@/services/siteContentDb";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isAuthorizedEditor(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: केवल अधिकृत एडमिनहरूलाई मात्र सुचना पोस्ट गर्ने अनुमति छ।" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    if (!body.titleNp && !body.titleEn) {
      return NextResponse.json(
        { success: false, message: "सुचनाको शीर्षक अनिवार्य छ।" },
        { status: 400 }
      );
    }

    const newNotice = await addNotice({
      titleNp: body.titleNp || body.titleEn,
      titleEn: body.titleEn || body.titleNp,
      contentNp: body.contentNp || body.contentEn || "",
      contentEn: body.contentEn || body.contentNp || "",
      category: body.category || "सूचना",
      publishDate: body.publishDate || new Date().toISOString().split("T")[0],
      isUrgent: !!body.isUrgent,
      isActive: body.isActive !== false,
      authorName: body.authorName || "एन.एच.एस. सचिवालय",
      attachmentUrl: body.attachmentUrl || ""
    });

    return NextResponse.json({
      success: true,
      message: "✓ नयाँ सुचना सफलतापूर्वक पोस्ट भयो।",
      data: newNotice
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "सुचना पोस्ट गर्न सकिएन। पुनः प्रयास गर्नुहोस्।", error: error?.message },
      { status: 500 }
    );
  }
}
