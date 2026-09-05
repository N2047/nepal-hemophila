import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAuthorizedSuperAdmin } from "@/services/committeeDb";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export async function POST(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: केवल सुपर एडमिनलाई मात्र फोटो अपलोड गर्ने अधिकार छ।" },
      { status: 403 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "committee");
  await fs.mkdir(uploadDir, { recursive: true });

  const contentType = request.headers.get("content-type") || "";

  try {
    // 1. Check if multipart/form-data
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("photo") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: "कुनै फोटो फाइल भेटिएन।" },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: "फोटोको साइज ५MB भन्दा बढी हुन सक्दैन।" },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "केवल JPG, JPEG, PNG, वा WebP ढाँचा मात्र मान्य छ।" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`;
      const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext.toLowerCase()) ? ext.toLowerCase() : ".jpg";
      const filename = `comm-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${safeExt}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const publicUrl = `/uploads/committee/${filename}`;
      return NextResponse.json({
        success: true,
        message: "फोटो सफलतापूर्वक अपलोड भयो।",
        url: publicUrl
      });
    }

    // 2. Check if JSON with base64 data
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const base64Data = body.image || body.photo;

      if (!base64Data || typeof base64Data !== "string") {
        return NextResponse.json(
          { success: false, message: "कुनै फोटो डेटा भेटिएन।" },
          { status: 400 }
        );
      }

      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        // If it's already an external or local URL, just return it
        if (base64Data.startsWith("http") || base64Data.startsWith("/")) {
          return NextResponse.json({ success: true, url: base64Data });
        }
        return NextResponse.json(
          { success: false, message: "अमान्य बेस६४ फोटो ढाँचा।" },
          { status: 400 }
        );
      }

      const mimeType = matches[1];
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { success: false, message: "केवल JPG, JPEG, PNG, वा WebP ढाँचा मात्र मान्य छ।" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(matches[2], "base64");
      if (buffer.length > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: "फोटोको साइज ५MB भन्दा बढी हुन सक्दैन।" },
          { status: 400 }
        );
      }

      const ext = mimeType.split("/")[1] === "jpeg" ? ".jpg" : `.${mimeType.split("/")[1]}`;
      const filename = `comm-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const publicUrl = `/uploads/committee/${filename}`;
      return NextResponse.json({
        success: true,
        message: "फोटो सफलतापूर्वक अपलोड भयो।",
        url: publicUrl
      });
    }

    return NextResponse.json(
      { success: false, message: "असमर्थित कन्टेन्ट प्रकार।" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "फोटो अपलोड गर्दा त्रुटि भयो: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
