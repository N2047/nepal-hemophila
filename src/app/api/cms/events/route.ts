import { NextRequest, NextResponse } from "next/server";
import { getCmsDatabase, saveCmsDatabase, isAuthorizedSuperAdmin } from "@/services/cmsDb";
import { CmsEventItem } from "@/types/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getCmsDatabase();
    const isSuper = isAuthorizedSuperAdmin(request);
    const list = isSuper ? db.events : db.events.filter((e) => !e.is_deleted && (e.status === "Published" || !e.status));
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

    const titleEn = body.title?.en || body.titleEn || "New Event";
    const titleNp = body.title?.np || body.titleNp || titleEn;
    const locationEn = body.location?.en || body.locationEn || "Kathmandu, Nepal";
    const locationNp = body.location?.np || body.locationNp || locationEn;

    const eventImg = body.featuredImage || body.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80";
    const newEvent: CmsEventItem = {
      id: `evt-${Date.now()}`,
      slug: body.slug || `event-${Date.now()}`,
      title: { en: titleEn, np: titleNp },
      description: { en: body.description?.en || body.descriptionEn || "", np: body.description?.np || body.descriptionNp || "" },
      date: body.date || new Date().toISOString().split("T")[0],
      time: body.time || "10:00 AM - 4:00 PM NPT",
      location: { en: locationEn, np: locationNp },
      category: body.category || "Conference",
      image: eventImg,
      featuredImage: eventImg,
      organizer: typeof body.organizer === "object" && body.organizer !== null ? body.organizer : {
        en: typeof body.organizer === "string" ? body.organizer : "Nepal Hemophilia Society",
        np: "नेपाल हेमोफिलिया सोसाइटी"
      },
      registrationOpen: body.registrationOpen !== false,
      registrationDeadline: body.registrationDeadline || body.date || new Date().toISOString().split("T")[0],
      attendeesCount: Number(body.attendeesCount) || 0,
      maxCapacity: Number(body.maxCapacity) || 100,
      isOnline: !!body.isOnline,
      onlineLink: body.onlineLink || "",
      status: body.status || "Published",
      is_deleted: false,
      display_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    db.events.unshift(newEvent);
    await saveCmsDatabase(db);

    return NextResponse.json({ success: true, data: newEvent, message: "नयाँ कार्यक्रम सफलतापूर्वक थपियो।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
