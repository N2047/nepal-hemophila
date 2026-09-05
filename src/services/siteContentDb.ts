import fs from "fs/promises";
import path from "path";
import { 
  SiteContentData, 
  FeatureToggles, 
  VisionMissionData, 
  HeroContent, 
  EmergencyContacts, 
  SiteStatistics,
  OrgDetails,
  NoticeItem, 
  NoticeInput, 
  NoticeUpdateInput 
} from "@/types/site-content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { noticesService } from "@/services/supabase/noticesService";

const DB_PATH = path.join(process.cwd(), "src", "data", "site-content-db.json");

export async function getSiteContent(): Promise<SiteContentData> {
  let content: SiteContentData;
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    content = JSON.parse(raw) as SiteContentData;
    if (!content.features || !content.visionMission || !content.hero || !content.notices) {
      throw new Error("Invalid structure");
    }
  } catch (error) {
    content = getDefaultSiteContent();
    try {
      await saveSiteContent(content);
    } catch (e) {}
  }

  // If Supabase is configured, pull live notices from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supaNotices = await noticesService.getAllAdmin();
      if (supaNotices && supaNotices.length > 0) {
        content.notices = supaNotices;
      }
    } catch (err) {
      console.warn("Supabase notices load fallback:", err);
    }
  }

  return content;
}

export async function saveSiteContent(data: SiteContentData): Promise<void> {
  data.last_updated = new Date().toISOString();
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Local filesystem write skipped (serverless environment):", fsErr);
  }
}

export async function updateFeatures(features: Partial<FeatureToggles>): Promise<FeatureToggles> {
  const data = await getSiteContent();
  data.features = { ...data.features, ...features };
  await saveSiteContent(data);
  return data.features;
}

export async function updateVisionMission(vm: Partial<VisionMissionData>): Promise<VisionMissionData> {
  const data = await getSiteContent();
  data.visionMission = { ...data.visionMission, ...vm };
  await saveSiteContent(data);
  return data.visionMission;
}

export async function updateHero(hero: Partial<HeroContent>): Promise<HeroContent> {
  const data = await getSiteContent();
  data.hero = { ...data.hero, ...hero };
  await saveSiteContent(data);
  return data.hero;
}

export async function updateEmergency(emergency: Partial<EmergencyContacts>): Promise<EmergencyContacts> {
  const data = await getSiteContent();
  data.emergency = { ...data.emergency, ...emergency };
  await saveSiteContent(data);
  return data.emergency;
}

export async function updateStats(stats: Partial<SiteStatistics>): Promise<SiteStatistics> {
  const data = await getSiteContent();
  data.stats = { ...data.stats, ...stats };
  await saveSiteContent(data);
  return data.stats;
}

export async function updateOrgDetails(orgDetails: Partial<OrgDetails>): Promise<OrgDetails> {
  const data = await getSiteContent();
  data.orgDetails = { ...data.orgDetails, ...orgDetails };
  await saveSiteContent(data);
  return data.orgDetails;
}

// Notices CRUD
export async function addNotice(input: NoticeInput): Promise<NoticeItem> {
  if (isSupabaseConfigured()) {
    try {
      const supaItem = await noticesService.create(input);
      if (supaItem) return supaItem;
    } catch (e) {
      console.warn("Supabase addNotice fallback to local:", e);
    }
  }

  const data = await getSiteContent();
  const newNotice: NoticeItem = {
    ...input,
    id: `not-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  data.notices.unshift(newNotice); // Prepend so newest is first
  await saveSiteContent(data);
  return newNotice;
}

export async function updateNotice(id: string, input: NoticeUpdateInput): Promise<NoticeItem | null> {
  if (isSupabaseConfigured()) {
    try {
      await noticesService.update(id, input);
    } catch (e) {
      console.warn("Supabase updateNotice fallback to local:", e);
    }
  }

  const data = await getSiteContent();
  const idx = data.notices.findIndex((n) => n.id === id);
  if (idx === -1) return null;

  data.notices[idx] = {
    ...data.notices[idx],
    ...input,
    updated_at: new Date().toISOString()
  };

  await saveSiteContent(data);
  return data.notices[idx];
}

export async function deleteNotice(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      await noticesService.delete(id);
    } catch (e) {
      console.warn("Supabase deleteNotice fallback to local:", e);
    }
  }

  const data = await getSiteContent();
  const initLen = data.notices.length;
  data.notices = data.notices.filter((n) => n.id !== id);
  if (data.notices.length === initLen) return false;

  await saveSiteContent(data);
  return true;
}

// Permissions Check
export function isAuthorizedSuperAdmin(request: Request): boolean {
  const userRole = request.headers.get("x-user-role");
  const authHeader = request.headers.get("authorization");
  if (userRole === "SUPER_ADMIN") return true;
  if (authHeader && (authHeader.includes("usr-superadmin") || authHeader.includes("SUPER_ADMIN"))) {
    return true;
  }
  try {
    const url = new URL(request.url);
    const queryRole = url.searchParams.get("userRole") || url.searchParams.get("role");
    if (queryRole === "SUPER_ADMIN") return true;
  } catch (e) {}

  return false;
}

export function isAuthorizedEditor(request: Request): boolean {
  const userRole = request.headers.get("x-user-role");
  const authHeader = request.headers.get("authorization");
  const allowedRoles = ["SUPER_ADMIN", "CONTENT_ADMIN", "MEDICAL_ADMIN", "PROVINCIAL_ADMIN", "FINANCE_ADMIN"];
  if (userRole && allowedRoles.includes(userRole)) return true;
  if (authHeader && allowedRoles.some((r) => authHeader.includes(r))) return true;

  try {
    const url = new URL(request.url);
    const queryRole = url.searchParams.get("userRole") || url.searchParams.get("role");
    if (queryRole && allowedRoles.includes(queryRole)) return true;
  } catch (e) {}

  return false;
}

function getDefaultSiteContent(): SiteContentData {
  return {
    features: {
      aiChatbot: true,
      factorAvailabilityTracker: true,
      onlineDonations: true,
      elearningAcademy: true,
      onlineMembershipForm: true,
      emergencyAlertBanner: true,
      noticeBoardTicker: true,
      statisticsCounter: true,
      communityStoriesSection: true,
      treatmentCentresLocator: true
    },
    visionMission: {
      visionNp: "नेपालका सम्पूर्ण हेमोफिलिया तथा रक्त विकार भएका व्यक्तिहरूले पूर्ण स्वास्थ्य, मर्यादा, समान अधिकार र सक्रिय जीवन बाँच्न पाउने समाजको निर्माण।",
      visionEn: "A future where every individual with a bleeding disorder in Nepal enjoys accessible treatment, physical dignity, social equality, and full life potential.",
      missionNp: "निःशुल्क फ्याक्टर प्रतिस्थापन, विकेन्द्रीकृत प्रयोगशाला परीक्षण, फिजियोथेरापी, मनोसामाजिक सहयोग र नीतिगत पैरवीमार्फत जीवनस्तर उकास्ने।",
      missionEn: "To decentralize specialized coagulation diagnosis, guarantee national factor supply, provide comprehensive psychosocial care, and advocate for universal health coverage.",
      coreValues: [],
      strategicObjectives: []
    },
    hero: {
      taglineBadgeNp: "राष्ट्रिय बिरामी संस्था • नेपाल",
      taglineBadgeEn: "National Bleeding Disorders Organization • Nepal",
      titleNp: "रक्तस्राव विकार भएका प्रत्येक नागरिकको स्वास्थ्य, मर्यादा र समान अवसर।",
      titleEn: "Building a Future Where Every Person with Bleeding Disorders Lives with Health, Dignity and Equal Opportunity.",
      subtitleNp: "नेपाल हेमोफिलिया सोसाइटी (NHS) सन् १९९२ देखि नेपालभरका हेमोफिलिया बिरामीहरूको उपचार पहुँच, फ्याक्टर आपूर्ति, अधिकार र मानवीय मर्यादाका लागि समर्पित राष्ट्रिय गैर-नाफामूलक संस्था हो।",
      subtitleEn: "Nepal Hemophilia Society (NHS) is the national patient-led organization dedicated to diagnosis, factor access, comprehensive clinical care, social dignity, and human rights across all 7 provinces of Nepal.",
      ctaSupportTextNp: "बिरामी सहयोग लिनुहोस्",
      ctaSupportTextEn: "Get Patient Support",
      ctaLearnTextNp: "हेमोफिलियाबारे बुझ्नुहोस्",
      ctaLearnTextEn: "Understand Hemophilia",
      ctaDonateTextNp: "सहयोग / दान गर्नुहोस्",
      ctaDonateTextEn: "Donate Now"
    },
    emergency: {
      headlineNp: "आकस्मिक रक्तस्राव २४/७ हटलाइन तथा प्राथमिक उपचार सहायता",
      headlineEn: "Emergency 24/7 Bleeding Protocol & Clinical Guidance",
      hotline1: "+977-1-4221119",
      hotline2: "+977-9851000000",
      birHospitalContact: "वीर अस्पताल केन्द्रीय हेमोफिलिया केयर: ०१-४२२१११९",
      disclaimerNp: "गम्भीर चोटपटक वा टाउको, घाँटी वा पेटमा रक्तस्राव भए तुरुन्त नजिकको अस्पतालको आकस्मिक कक्षमा जानुहोस् वा फ्याक्टर इन्फ्युजन लिनुहोस्।",
      disclaimerEn: "For acute internal bleeding or trauma, seek emergency hospital care immediately."
    },
    stats: {
      registeredPatients: 984,
      activeMembers: 650,
      treatmentCentresCount: 8,
      provincesCovered: 7,
      districtsReached: 68,
      factorDistributedUnits: "184K+",
      hcpTrainedCount: 320
    },
    orgDetails: {
      orgNameNp: "नेपाल हेमोफिलिया सोसाइटी",
      orgNameEn: "Nepal Hemophilia Society",
      taglineNp: "राष्ट्रिय बिरामी संस्था (स्था. १९९२)",
      taglineEn: "National Patient Organization (Est. 1992)",
      phone: "+977-1-4221119",
      emergencyPhone: "+977-9851000000",
      email: "info@hemophilia-nepal.org.np",
      addressNp: "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)",
      addressEn: "Kathmandu, Nepal (Central Secretariat)",
      officeHoursNp: "आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००",
      officeHoursEn: "Sunday - Friday: 10:00 AM - 5:00 PM",
      swcRegNo: "१२९० (समाज कल्याण परिषद)",
      panNo: "३००१२३४५६",
      bankName: "राष्ट्रिय वाणिज्य बैंक (Rastriya Banijya Bank)",
      accountName: "नेपाल हेमोफिलिया सोसाइटी (Nepal Hemophilia Society)",
      accountNumber: "1090010002345001",
      branch: "विशाल बजार शाखा, काठमाडौं",
      swiftCode: "RBBANPKA",
      esewaId: "9851000000"
    },
    notices: [],
    last_updated: new Date().toISOString()
  };
}
