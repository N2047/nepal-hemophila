import fs from "fs/promises";
import path from "path";
import { 
  CmsDatabase, 
  CmsNewsArticle, 
  CmsEventItem, 
  CmsResourceItem, 
  CmsTreatmentCentre, 
  ProvincialChapter, 
  MedicalAdvisor, 
  GlobalWebsiteSettings 
} from "@/types/cms";
import { 
  treatmentCentresData, 
  newsArticlesData, 
  eventsData, 
  resourcesData 
} from "@/data/mockData";

const DB_PATH = path.join(process.cwd(), "src", "data", "cms-db.json");

const defaultSettings: GlobalWebsiteSettings = {
  websiteNameNp: "नेपाल हेमोफिलिया सोसाइटी",
  websiteNameEn: "Nepal Hemophilia Society",
  taglineNp: "राष्ट्रिय बिरामी संस्था (स्था. १९९२)",
  taglineEn: "National Patient Organization (Est. 1992)",
  logoUrl: "/nhs-logo.jpg",
  faviconUrl: "/favicon.ico",
  primaryPhone: "+977-1-4221119",
  emergencyPhone: "+977-9851000000",
  email: "info@hemophilia-nepal.org.np",
  officeAddressNp: "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)",
  officeAddressEn: "Kathmandu, Nepal (Central Secretariat)",
  officeHoursNp: "आइतबार - शुक्रबार: बिहान १०:०० - साँझ ५:००",
  officeHoursEn: "Sunday - Friday: 10:00 AM - 5:00 PM",
  facebookUrl: "https://facebook.com/nepalhemophiliasociety",
  twitterUrl: "https://twitter.com/hemophilia_nepal",
  youtubeUrl: "https://youtube.com/@nepalhemophilia",
  linkedinUrl: "https://linkedin.com/company/nepal-hemophilia-society",
  defaultSeoTitle: "Nepal Hemophilia Society | Care, Dignity & Life-Saving Factors",
  defaultSeoDescription: "Official national patient organization representing bleeding disorders in Nepal. Access 24/7 emergency care, factor availability, and comprehensive clinical support.",
  footerDisclaimerNp: "यस वेबसाइटमा प्रस्तुत सामग्री केवल जनचेतना तथा शैक्षिक प्रयोजनका लागि हो। कुनै पनि औषधोपचार वा फ्याक्टर प्रयोग गर्नुअघि योग्य हेमाटोलोजिस्ट वा चिकित्सकको सल्लाह अनिवार्य लिनुहोस्।",
  footerDisclaimerEn: "The information on this platform is for educational and public advocacy purposes only. Always consult a certified hematologist or medical practitioner for clinical treatment protocols.",
  copyrightNp: "नेपाल हेमोफिलिया सोसाइटी। सर्वाधिकार सुरक्षित।",
  copyrightEn: "Nepal Hemophilia Society. All rights reserved.",
  swcRegNo: "१२९० (समाज कल्याण परिषद)",
  panNo: "३००१२३४५६",
  bankName: "राष्ट्रिय वाणिज्य बैंक (Rastriya Banijya Bank)",
  accountName: "नेपाल हेमोफिलिया सोसाइटी (Nepal Hemophilia Society)",
  accountNumber: "1090010002345001",
  branch: "विशाल बजार शाखा, काठमाडौं",
  swiftCode: "RBBANPKA",
  esewaId: "9851000000",
  qrCodeUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80"
};

const defaultChapters: ProvincialChapter[] = [
  {
    id: "chap-koshi",
    provinceNameNp: "कोशी प्रदेश",
    provinceNameEn: "Koshi Province",
    cityNp: "धरान / विराटनगर",
    cityEn: "Dharan / Biratnagar",
    coordinatorNameNp: "डा. बी. कार्की (संयोजक)",
    coordinatorNameEn: "Dr. B. Karki (Coordinator)",
    phone: "+977-25-525555",
    email: "koshi@hemophilia-nepal.org.np",
    addressNp: "बीपी कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान परिसर, धरान",
    addressEn: "BPKIHS Hospital Premises, Dharan",
    partnerHospitalNp: "बीपी कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान (धरान)",
    partnerHospitalEn: "B.P. Koirala Institute of Health Sciences (BPKIHS)",
    servicesNp: "आकस्मिक फ्याक्टर इन्फ्युजन, बिरामी परामर्श, प्रादेशिक शिविर",
    servicesEn: "Emergency factor infusion, patient counselling, regional outreach camps",
    display_order: 1,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-madhesh",
    provinceNameNp: "मधेश प्रदेश",
    provinceNameEn: "Madhesh Province",
    cityNp: "जनकपुरधाम",
    cityEn: "Janakpurdham",
    coordinatorNameNp: "श्री आर. यादव (संयोजक)",
    coordinatorNameEn: "Mr. R. Yadav (Coordinator)",
    phone: "+977-41-520133",
    email: "madhesh@hemophilia-nepal.org.np",
    addressNp: "जनकपुर प्रादेशिक अस्पताल मार्ग, जनकपुर",
    addressEn: "Janakpur Provincial Hospital Road, Janakpur",
    partnerHospitalNp: "जनकपुर प्रादेशिक अस्पताल",
    partnerHospitalEn: "Janakpur Provincial Hospital",
    servicesNp: "स्थानीय फ्याक्टर स्टक, प्राथमिक उपचार सहायता, बिरामी दर्ता",
    servicesEn: "Local factor stock, first-aid guidance, patient registration",
    display_order: 2,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-bagmati",
    provinceNameNp: "बागमती प्रदेश",
    provinceNameEn: "Bagmati Province",
    cityNp: "काठमाडौं (केन्द्रीय सचिवालय)",
    cityEn: "Kathmandu (Central Secretariat)",
    coordinatorNameNp: "एन.एच.एस. केन्द्रीय सचिवालय",
    coordinatorNameEn: "NHS Central Secretariat",
    phone: "+977-1-4221119",
    email: "bagmati@hemophilia-nepal.org.np",
    addressNp: "महाबौद्ध, कान्तिपथ, काठमाडौं",
    addressEn: "Mahabouddha, Kantipath, Kathmandu",
    partnerHospitalNp: "वीर अस्पताल तथा त्रिवि शिक्षण अस्पताल",
    partnerHospitalEn: "Bir Hospital & TUTH Maharajgunj",
    servicesNp: "केन्द्रीय फ्याक्टर बैंक, हेमाटोलोजी डे-केयर, नीतिगत पैरवी, राष्ट्रिय हेल्पलाइन",
    servicesEn: "National factor repository, hematology day-care, policy advocacy, 24/7 hotline",
    display_order: 3,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-gandaki",
    provinceNameNp: "गण्डकी प्रदेश",
    provinceNameEn: "Gandaki Province",
    cityNp: "पोखरा",
    cityEn: "Pokhara",
    coordinatorNameNp: "श्री रमेश थापा (संयोजक)",
    coordinatorNameEn: "Mr. Ramesh Thapa (Coordinator)",
    phone: "+977-61-520067",
    email: "gandaki@hemophilia-nepal.org.np",
    addressNp: "रामघाट, पोखरा (स्वास्थ्य विज्ञान प्रतिष्ठान नजिक)",
    addressEn: "Ramghat, Pokhara (Near PAHS Hospital)",
    partnerHospitalNp: "पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान (पश्चिमाञ्चल अस्पताल)",
    partnerHospitalEn: "Pokhara Academy of Health Sciences (Western Regional Hospital)",
    servicesNp: "फ्याक्टर आपूर्ति, फिजियोथेरापी पुनर्स्थापना, पारिवारिक परामर्श",
    servicesEn: "Factor supply, physiotherapy rehabilitation, family peer-counselling",
    display_order: 4,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-lumbini",
    provinceNameNp: "लुम्बिनी प्रदेश",
    provinceNameEn: "Lumbini Province",
    cityNp: "नेपालगञ्ज / बुटवल",
    cityEn: "Nepalgunj / Butwal",
    coordinatorNameNp: "श्री एस. चौधरी (संयोजक)",
    coordinatorNameEn: "Mr. S. Chaudhary (Coordinator)",
    phone: "+977-81-520120",
    email: "lumbini@hemophilia-nepal.org.np",
    addressNp: "भेरी अस्पताल कम्पाउन्ड, नेपालगञ्ज",
    addressEn: "Bheri Hospital Compound, Nepalgunj",
    partnerHospitalNp: "भेरी अस्पताल तथा लुम्बिनी प्रादेशिक अस्पताल",
    partnerHospitalEn: "Bheri Hospital & Lumbini Provincial Hospital",
    servicesNp: "आकस्मिक क्लिनिकल इन्फ्युजन, पश्चिमी जिल्ला आपूर्ति सञ्जाल",
    servicesEn: "Emergency clinical infusions, western regional distribution network",
    display_order: 5,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-karnali",
    provinceNameNp: "कर्णाली प्रदेश",
    provinceNameEn: "Karnali Province",
    cityNp: "वीरेन्द्रनगर, सुर्खेत",
    cityEn: "Birendranagar, Surkhet",
    coordinatorNameNp: "श्री डी. खड्का (संयोजक)",
    coordinatorNameEn: "Mr. D. Khadka (Coordinator)",
    phone: "+977-83-520200",
    email: "karnali@hemophilia-nepal.org.np",
    addressNp: "कर्णाली प्रादेशिक अस्पताल परिसर, सुर्खेत",
    addressEn: "Karnali Provincial Hospital Premises, Surkhet",
    partnerHospitalNp: "कर्णाली प्रादेशिक अस्पताल, सुर्खेत",
    partnerHospitalEn: "Karnali Provincial Hospital, Surkhet",
    servicesNp: "दुर्गम जिल्ला समन्वय, आपतकालीन हवाई/सडक सहयोग, फ्याक्टर भण्डारण",
    servicesEn: "Remote district coordination, emergency transport liaison, factor storage",
    display_order: 6,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "chap-sudurpashchim",
    provinceNameNp: "सुदूरपश्चिम प्रदेश",
    provinceNameEn: "Sudurpashchim Province",
    cityNp: "धनगढी",
    cityEn: "Dhangadhi",
    coordinatorNameNp: "श्रीमती के. जोशी (संयोजक)",
    coordinatorNameEn: "Ms. K. Joshi (Coordinator)",
    phone: "+977-91-521259",
    email: "sudurpashchim@hemophilia-nepal.org.np",
    addressNp: "सेती प्रादेशिक अस्पताल क्षेत्र, धनगढी",
    addressEn: "Seti Provincial Hospital Area, Dhangadhi",
    partnerHospitalNp: "सेती प्रादेशिक अस्पताल, धनगढी",
    partnerHospitalEn: "Seti Provincial Hospital, Dhangadhi",
    servicesNp: "फ्याक्टर भण्डार, बिरामी पहिचान शिविर, सीमावर्ती समन्वय",
    servicesEn: "Factor reserve depot, diagnostic camps, cross-border treatment liaison",
    display_order: 7,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const defaultAdvisors: MedicalAdvisor[] = [
  {
    id: "adv-1",
    nameNp: "प्रा. डा. विशेष पौड्याल",
    nameEn: "Prof. Dr. Bishesh Poudyal",
    titleNp: "प्रमुख क्लिनिकल सल्लाहकार / वरिष्ठ हेमाटोलोजिस्ट",
    titleEn: "Chief Clinical Advisor / Senior Consultant Hematologist",
    institutionNp: "राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान (वीर अस्पताल)",
    institutionEn: "National Academy of Medical Sciences (Bir Hospital)",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    bioNp: "नेपालमा हेमोफिलिया उपचार, बोनम्यारो प्रत्यारोपण तथा रक्त विकार क्लिनिकल प्रोटोकल विकासमा २ दशकभन्दा लामो नेतृत्वदायी योगदान।",
    bioEn: "Over two decades of clinical leadership in coagulation medicine, bone marrow transplantation, and national bleeding protocol formulation.",
    display_order: 1,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "adv-2",
    nameNp: "प्रा. डा. निभा ओझा",
    nameEn: "Prof. Dr. Neebha Ojha",
    titleNp: "वरिष्ठ हेमाटोलोजिस्ट तथा प्राध्यापक",
    titleEn: "Senior Consultant Hematologist & Professor",
    institutionNp: "त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल (TUTH), महाराजगञ्ज",
    institutionEn: "Tribhuvan University Teaching Hospital (TUTH)",
    photo: "https://images.unsplash.com/photo-1594824813590-77a8d5069a53?auto=format&fit=crop&w=400&q=80",
    bioNp: "महिला तथा बालबालिकामा हुने रक्तस्राव विकार अनुसन्धान तथा क्लिनिकल शिक्षणमा अग्रणी।",
    bioEn: "Pioneer in bleeding disorder diagnostics among women and pediatric populations, clinical teaching, and laboratory quality control.",
    display_order: 2,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "adv-3",
    nameNp: "डा. अनुपमा कार्की",
    nameEn: "Dr. Anupama Karki",
    titleNp: "बाल हेमाटोलोजिस्ट तथा अन्कोलोजिस्ट",
    titleEn: "Pediatric Hematologist & Oncologist",
    institutionNp: "कान्ति बाल अस्पताल, काठमाडौं",
    institutionEn: "Kanti Children's Hospital, Kathmandu",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    bioNp: "नवजात शिशु तथा बालबालिकामा हेमोफिलिया निदान, प्रारम्भिक फ्याक्टर प्रोफिल्याक्सिस तथा बाल संयुक्त स्वास्थ्य हेरचाह विशेषज्ञ।",
    bioEn: "Specialist in early pediatric hemophilia intervention, home prophylaxis management, and comprehensive pediatric joint preservation.",
    display_order: 3,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "adv-4",
    nameNp: "डा. बद्री चापागाईं",
    nameEn: "Dr. Badri Chapagain",
    titleNp: "प्रादेशिक क्लिनिकल संयोजक",
    titleEn: "Provincial Medical Coordinator",
    institutionNp: "भेरी अस्पताल, नेपालगञ्ज",
    institutionEn: "Bheri Hospital, Nepalgunj",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    bioNp: "पश्चिम नेपालका अस्पतालहरूमा आकस्मिक फ्याक्टर इन्फ्युजन प्रोटोकल तथा स्थानीय स्वास्थ्यकर्मी तालिममा सक्रिय।",
    bioEn: "Coordinating clinical factor availability, emergency infusions, and healthcare provider CME trainings across Western Nepal.",
    display_order: 4,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "adv-5",
    nameNp: "डा. हेमराज पाण्डे",
    nameEn: "Dr. Hemraj Pandey",
    titleNp: "सुदूरपश्चिम क्लिनिकल सम्पर्क अधिकृत",
    titleEn: "Sudurpashchim Clinical Liaison",
    institutionNp: "सेती प्रादेशिक अस्पताल, धनगढी",
    institutionEn: "Seti Provincial Hospital, Dhangadhi",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    bioNp: "सुदूरपश्चिमका दुर्गम जिल्लाहरूबाट आउने बिरामीहरूको आकस्मिक उपचार तथा फ्याक्टर आपूर्ति व्यवस्थापनमा समर्पित।",
    bioEn: "Dedicated to emergency bleeding triage, factor dispatch, and patient stabilization in Far-Western Nepal.",
    display_order: 5,
    status: "Published",
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function getDefaultCmsDatabase(): CmsDatabase {
  return {
    news: newsArticlesData.map((art, idx) => ({
      ...art,
      status: "Published" as const,
      is_deleted: false,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),
    events: eventsData.map((evt, idx) => ({
      ...evt,
      status: "Published" as const,
      is_deleted: false,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),
    resources: resourcesData.map((res, idx) => ({
      ...res,
      status: "Published" as const,
      is_deleted: false,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),
    centres: treatmentCentresData.map((c, idx) => ({
      ...c,
      status: "Published" as const,
      is_deleted: false,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })),
    chapters: defaultChapters,
    advisors: defaultAdvisors,
    settings: defaultSettings,
    last_updated: new Date().toISOString()
  };
}

export async function getCmsDatabase(): Promise<CmsDatabase> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const data = JSON.parse(raw) as CmsDatabase;
    if (!data.news || !data.events || !data.resources || !data.centres || !data.chapters || !data.settings) {
      throw new Error("Invalid CMS schema structure");
    }
    return data;
  } catch (error) {
    console.warn("CMS DB not found or invalid, initializing default cms-db.json", error);
    const defaults = getDefaultCmsDatabase();
    await saveCmsDatabase(defaults);
    return defaults;
  }
}

export async function saveCmsDatabase(data: CmsDatabase): Promise<void> {
  data.last_updated = new Date().toISOString();
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Authorization check helper
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
