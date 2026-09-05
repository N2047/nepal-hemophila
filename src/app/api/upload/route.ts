import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAuthorizedSuperAdmin } from "@/services/cmsDb";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/svg+xml",
  "application/pdf"
];

export async function POST(request: NextRequest) {
  if (!isAuthorizedSuperAdmin(request)) {
    return NextResponse.json(
      { success: false, message: "अनधिकृत पहुँच: केवल सुपर एडमिनलाई मात्र मिडिया अपलोड गर्ने अधिकार छ।" },
      { status: 403 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "cms");
  await fs.mkdir(uploadDir, { recursive: true });

  const contentType = request.headers.get("content-type") || "";

  try {
    // 1. Multipart form upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = (formData.get("file") || formData.get("photo") || formData.get("image")) as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: "कुनै फाइल प्राप्त भएन।" },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: "फाइल साइज १०MB भन्दा बढी हुन सक्दैन।" },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "केवल JPG, PNG, WebP, SVG वा PDF फाइल मात्र अपलोड गर्न सकिन्छ।" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`;
      const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".pdf"].includes(ext.toLowerCase()) ? ext.toLowerCase() : ".jpg";
      const filename = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${safeExt}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const publicUrl = `/uploads/cms/${filename}`;
      return NextResponse.json({
        success: true,
        message: "फाइल सफलतापूर्वक अपलोड भयो।",
        url: publicUrl,
        filename
      });
    }

    // 2. Base64 JSON upload
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const base64Data = body.file || body.photo || body.image;

      if (!base64Data || typeof base64Data !== "string") {
        return NextResponse.json(
          { success: false, message: "कुनै डेटा प्राप्त भएन।" },
          { status: 400 }
        );
      }

      if (base64Data.startsWith("http") || base64Data.startsWith("/")) {
        return NextResponse.json({ success: true, url: base64Data });
      }

      const matches = base64Data.match(/^data:([A-Za-z0-9\/\-+.]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json(
          { success: false, message: "अमान्य बेस६४ ढाँचा।" },
          { status: 400 }
        );
      }

      const mimeType = matches[1];
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { success: false, message: "केवल JPG, PNG, WebP वा PDF फाइल मात्र मान्य छ।" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(matches[2], "base64");
      if (buffer.length > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, message: "फाइल साइज १०MB भन्दा बढी हुन सक्दैन।" },
          { status: 400 }
        );
      }

      let ext = ".jpg";
      if (mimeType.includes("png")) ext = ".png";
      else if (mimeType.includes("webp")) ext = ".webp";
      else if (mimeType.includes("pdf")) ext = ".pdf";
      else if (mimeType.includes("svg")) ext = ".svg";

      const filename = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const publicUrl = `/uploads/cms/${filename}`;
      return NextResponse.json({
        success: true,
        message: "फाइल सफलतापूर्वक अपलोड भयो।",
        url: publicUrl,
        filename
      });
    }

    return NextResponse.json(
      { success: false, message: "Unsupported Content-Type" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
