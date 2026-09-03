import { 
  TreatmentCentre, 
  FactorInventoryItem, 
  NewsArticle, 
  EventItem, 
  ResourceItem, 
  MembershipApplication, 
  PatientRegistryRecord, 
  SupportRequest, 
  DonationRecord, 
  ELearningCourse, 
  AuditLog,
  User 
} from "@/types";

export const initialUsers: User[] = [
  {
    id: "usr-superadmin",
    name: "Dr. Mukunda Sharma",
    email: "admin@hemophilia.org.np",
    password: "Admin@NHS2026#Nepal",
    role: "SUPER_ADMIN",
    province: "Bagmati",
    hospitalAffiliation: "NHS Central Secretariat",
    phone: "+977-9851012345",
  },
  {
    id: "usr-medicaladmin",
    name: "Dr. Bishal Subedi (Hematologist)",
    email: "medical@hemophilia.org.np",
    password: "Medical@NHS2026#Doc",
    role: "MEDICAL_ADMIN",
    province: "Bagmati",
    hospitalAffiliation: "Bir Hospital / TUTH",
    phone: "+977-9841234567",
  },
  {
    id: "usr-contentadmin",
    name: "Sita Adhikari",
    email: "content@hemophilia.org.np",
    password: "Content@NHS2026#Editor",
    role: "CONTENT_ADMIN",
    province: "Bagmati",
    phone: "+977-9801122334",
  },
  {
    id: "usr-provadmin",
    name: "Ramesh Thapa",
    email: "gandaki@hemophilia.org.np",
    password: "Gandaki@NHS2026#Prov",
    role: "PROVINCIAL_ADMIN",
    province: "Gandaki",
    hospitalAffiliation: "Pokhara Academy of Health Sciences",
    phone: "+977-9856012345",
  },
  {
    id: "usr-finance",
    name: "Gita Shrestha",
    email: "finance@hemophilia.org.np",
    password: "Finance@NHS2026#Audit",
    role: "FINANCE_ADMIN",
    province: "Bagmati",
    phone: "+977-9841890123",
  },
  {
    id: "usr-hcp",
    name: "Dr. Anupama Karki (Pediatric Hematologist)",
    email: "anupama.karki@kanti.gov.np",
    password: "Doctor@NHS2026#Kanti",
    role: "HEALTHCARE_PRO",
    province: "Bagmati",
    hospitalAffiliation: "Kanti Children's Hospital",
    phone: "+977-9812345678",
  },
  {
    id: "usr-member",
    name: "Bikash Gurung",
    email: "bikash.member@gmail.com",
    password: "Member@NHS2026#Nepal",
    role: "MEMBER",
    province: "Gandaki",
    memberId: "NHS-MEM-2024-0312",
    phone: "+977-9860123456",
  },
  {
    id: "usr-patient",
    name: "Aashish Tamang (Patient)",
    email: "patient.aashish@gmail.com",
    password: "Patient@NHS2026#Care",
    role: "PATIENT",
    province: "Bagmati",
    patientId: "NHS-P-2026-089",
    phone: "+977-9803456789",
  }
];

export const treatmentCentresData: TreatmentCentre[] = [
  {
    id: "tc-bir",
    name: {
      en: "Bir Hospital (National Academy of Medical Sciences - NAMS)",
      np: "वीर अस्पताल (राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान - न्याम्स)"
    },
    hospitalType: "National Referral",
    province: "Bagmati",
    district: "Kathmandu",
    city: "Kathmandu",
    address: {
      en: "Mahabouddha, Kantipath, Kathmandu",
      np: "महाबौद्ध, कान्तिपथ, काठमाडौं"
    },
    phone: "+977-1-4221119",
    emergencyPhone: "+977-1-4221988",
    email: "hematology@birhospital.gov.np",
    hematologistInCharge: {
      en: "Dr. Bishesh Poudyal & Hematology Care Team",
      np: "डा. विशेष पौड्याल तथा हेमाटोलोजी टिम"
    },
    services: [
      "24/7 Factor Infusion Emergency",
      "Factor VIII & IX Storage Bank",
      "Comprehensive Coagulation Lab",
      "Joint Care & Orthopedic Support",
      "NHS Patient Support Desk"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: 27.7058,
    longitude: 85.3134,
    directions: {
      en: "Located in central Kathmandu near Tundikhel and Ratnapark. Hematology Day Care is on the 3rd floor of the Surgical Block.",
      np: "काठमाडौंको मुटु रत्नपार्क र टुँडिखेल नजिक। हेमाटोलोजी डे-केयर सर्जिकल भवनको तेस्रो तल्लामा अवस्थित छ।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-tuth",
    name: {
      en: "Tribhuvan University Teaching Hospital (TUTH)",
      np: "त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल (टि.यु.टि.एच.)"
    },
    hospitalType: "National Referral",
    province: "Bagmati",
    district: "Kathmandu",
    city: "Maharajgunj, Kathmandu",
    address: {
      en: "Maharajgunj, Kathmandu 44600",
      np: "महाराजगञ्ज, काठमाडौं ४४६००"
    },
    phone: "+977-1-4412303",
    emergencyPhone: "+977-1-4412505",
    email: "info@tuth.org.np",
    hematologistInCharge: {
      en: "Prof. Dr. Neebha Ojha / Hematology Unit",
      np: "प्रा. डा. निभा ओझा / हेमाटोलोजी युनिट"
    },
    services: [
      "Inpatient Care & ICU Bleeding Protocol",
      "Factor VIII, IX & Inhibitor Management",
      "Specialized Pediatric & Adult Hematology",
      "Advanced Coagulation Testing",
      "Rehabilitation & Physiotherapy Unit"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: 27.7354,
    longitude: 85.3312,
    directions: {
      en: "Located in Maharajgunj along Ring Road north. Emergency wing operates 24/7 with on-call duty doctors.",
      np: "महाराजगञ्ज चक्रपथ उत्तर। २४ सै घण्टा आकस्मिक सेवा र अन-कल चिकित्सक उपलब्ध।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-kanti",
    name: {
      en: "Kanti Children's Hospital",
      np: "कान्ति बाल अस्पताल"
    },
    hospitalType: "National Referral",
    province: "Bagmati",
    district: "Kathmandu",
    city: "Maharajgunj, Kathmandu",
    address: {
      en: "Maharajgunj, Kathmandu (Adjacent to TUTH)",
      np: "महाराजगञ्ज, काठमाडौं (टि.यु. शिक्षण अस्पताल नजिक)"
    },
    phone: "+977-1-4411550",
    emergencyPhone: "+977-1-4427452",
    email: "pediatrics@kantichildrenhospital.gov.np",
    hematologistInCharge: {
      en: "Dr. Anupama Karki / Pediatric Oncology & Hematology",
      np: "डा. अनुपमा कार्की / बाल रक्त तथा क्यान्सर युनिट"
    },
    services: [
      "Dedicated Pediatric Bleeding Disorder Clinic",
      "Infant & Child Factor Infusion",
      "Home Prophylaxis Training for Parents",
      "Genetic Counselling & Family Screening",
      "Child Development & Physical Therapy"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: 27.7371,
    longitude: 85.3325,
    directions: {
      en: "Nepal's primary national pediatric hospital. Pediatric bleeding emergency triage located in Emergency Room 1.",
      np: "नेपालको प्रमुख केन्द्रीय बाल अस्पताल। बाल रक्तस्राव आकस्मिक कक्ष १ मा उपलब्ध।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-bpkihs",
    name: {
      en: "B.P. Koirala Institute of Health Sciences (BPKIHS)",
      np: "बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान"
    },
    hospitalType: "Provincial Teaching",
    province: "Koshi",
    district: "Sunsari",
    city: "Dharan",
    address: {
      en: "Ghopa, Dharan, Sunsari District, Koshi Province",
      np: "घोपा, धरान, सुनसरी जिल्ला, कोशी प्रदेश"
    },
    phone: "+977-25-525555",
    emergencyPhone: "+977-25-521017",
    email: "bpkihs@bpkihs.edu",
    hematologistInCharge: {
      en: "Department of Internal Medicine & Pediatrics",
      np: "इन्टर्नल मेडिसिन तथा बालरोग विभाग"
    },
    services: [
      "Koshi Province Regional Factor Storage",
      "Emergency Bleeding Management",
      "Clinical Pathology & aPTT / PT testing",
      "Orthopedic Surgery & Rehabilitation"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: 26.8123,
    longitude: 87.2835,
    directions: {
      en: "Main medical campus in Dharan, serving all districts of eastern Nepal.",
      np: "धरानको मुख्य मेडिकल क्याम्पस, पूर्वी नेपालका सबै जिल्लाहरूलाई सेवा प्रदान गर्दछ।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-pokhara",
    name: {
      en: "Pokhara Academy of Health Sciences (Western Regional Hospital)",
      np: "पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान (पश्चिमाञ्चल क्षेत्रीय अस्पताल)"
    },
    hospitalType: "Provincial Teaching",
    province: "Gandaki",
    district: "Kaski",
    city: "Pokhara",
    address: {
      en: "Ramghat, Pokhara-10, Kaski, Gandaki Province",
      np: "रामघाट, पोखरा-१०, कास्की, गण्डकी प्रदेश"
    },
    phone: "+977-61-520067",
    emergencyPhone: "+977-61-524074",
    email: "info@pahs.gov.np",
    hematologistInCharge: {
      en: "Dr. Ramesh Thapa & Gandaki NHS Clinical Team",
      np: "डा. रमेश थापा तथा गण्डकी क्लिनिकल टोली"
    },
    services: [
      "Gandaki Province Factor Distribution Hub",
      "Physiotherapy & Joint Synovitis Care",
      "Emergency Factor Injections",
      "Patient Peer Support Meetups"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: 28.2120,
    longitude: 83.9934,
    directions: {
      en: "Located in Ramghat, Pokhara. NHS Gandaki branch operates a dedicated coordination desk inside the hospital premises.",
      np: "रामघाट, पोखरामा अवस्थित। अस्पताल परिसरमा एन.एच.एस. गण्डकी सम्पर्क डेस्क सञ्चालनमा छ।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-bheri",
    name: {
      en: "Bheri Provincial Hospital",
      np: "भेरी प्रादेशिक अस्पताल"
    },
    hospitalType: "Provincial Teaching",
    province: "Lumbini",
    district: "Banke",
    city: "Nepalgunj",
    address: {
      en: "Hospital Road, Nepalgunj, Banke, Lumbini Province",
      np: "अस्पताल रोड, नेपालगन्ज, बाँके, लुम्बिनी प्रदेश"
    },
    phone: "+977-81-520120",
    emergencyPhone: "+977-81-520288",
    email: "bherihospital@gmail.com",
    hematologistInCharge: {
      en: "Dr. Badri Chapagain / Emergency & Medicine",
      np: "डा. बद्री चापागाईं / आकस्मिक तथा मेडिसिन"
    },
    services: [
      "Lumbini & Mid-Western Factor Reserve",
      "Emergency Bleeding Stabilization",
      "Blood Bank & Plasma Support",
      "Referral Link to Central Centers"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: false,
    hasCoagulationLab: true,
    latitude: 28.0500,
    longitude: 81.6167,
    directions: {
      en: "Main provincial hospital in Nepalgunj serving Banke, Bardiya, Surkhet and mid-western districts.",
      np: "नेपालगन्जको प्रमुख प्रादेशिक अस्पताल।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-seti",
    name: {
      en: "Seti Provincial Hospital",
      np: "सेती प्रादेशिक अस्पताल"
    },
    hospitalType: "Provincial Teaching",
    province: "Sudurpashchim",
    district: "Kailali",
    city: "Dhangadhi",
    address: {
      en: "Hospital Road, Dhangadhi, Kailali, Sudurpashchim",
      np: "अस्पताल रोड, धनगढी, कैलाली, सुदूरपश्चिम प्रदेश"
    },
    phone: "+977-91-521259",
    emergencyPhone: "+977-91-525000",
    email: "setihospital@yahoo.com",
    hematologistInCharge: {
      en: "Dr. Hemraj Pandey & Provincial Medical Team",
      np: "डा. हेमराज पाण्डे तथा प्रादेशिक मेडिकल टिम"
    },
    services: [
      "Sudurpashchim Emergency Factor Point",
      "Basic Bleeding Triage & First-Aid",
      "Patient Identification & Counselling"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: false,
    hasCoagulationLab: false,
    latitude: 28.6942,
    longitude: 80.5900,
    directions: {
      en: "Centrally located in Dhangadhi town near the district administration.",
      np: "धनगढी बजारको केन्द्रमा जिल्ला प्रशासन नजिक।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-karnali",
    name: {
      en: "Karnali Provincial Hospital",
      np: "कर्णाली प्रादेशिक अस्पताल"
    },
    hospitalType: "Provincial Teaching",
    province: "Karnali",
    district: "Surkhet",
    city: "Birendranagar",
    address: {
      en: "Birendranagar-4, Surkhet, Karnali Province",
      np: "वीरेन्द्रनगर-४, सुर्खेत, कर्णाली प्रदेश"
    },
    phone: "+977-83-520200",
    emergencyPhone: "+977-83-520300",
    email: "karnalihospital@gmail.com",
    hematologistInCharge: {
      en: "Dr. Dambar Khadka / Medical Director",
      np: "डा. डम्बर खड्का / मेडिकल निर्देशक"
    },
    services: [
      "Karnali Emergency Bleeding Care",
      "Telemedicine Link with Central Hematologists",
      "Factor Distribution on Medical Referral"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: true,
    hasCoagulationLab: false,
    latitude: 28.6019,
    longitude: 81.6338,
    directions: {
      en: "Situated in Birendranagar Surkhet, serves remote mountain districts of Karnali.",
      np: "वीरेन्द्रनगर सुर्खेतमा अवस्थित, कर्णालीका दुर्गम जिल्लाहरूलाई सेवा पुर्‍याउँछ।"
    },
    isOfficialPartner: true
  },
  {
    id: "tc-janakpur",
    name: {
      en: "Janakpur Provincial Hospital",
      np: "जनकपुर प्रादेशिक अस्पताल"
    },
    hospitalType: "Provincial Teaching",
    province: "Madhesh",
    district: "Dhanusha",
    city: "Janakpurdham",
    address: {
      en: "Bhanu Chowk, Janakpurdham, Madhesh Province",
      np: "भानु चोक, जनकपुरधाम, मधेश प्रदेश"
    },
    phone: "+977-41-520133",
    emergencyPhone: "+977-41-520444",
    email: "janakpurhospital@gov.np",
    hematologistInCharge: {
      en: "Dr. Ram Naresh Pandit & Pediatric Team",
      np: "डा. रामनरेश पण्डित तथा बालरोग टोली"
    },
    services: [
      "Madhesh Province Bleeding Emergency Unit",
      "Factor VIII & IX Emergency Injections",
      "Patient Registration Support"
    ],
    hasFactorStorage: true,
    has24Emergency: true,
    hasPhysiotherapy: false,
    hasCoagulationLab: false,
    latitude: 26.7288,
    longitude: 85.9244,
    directions: {
      en: "Located near Bhanu Chowk in Janakpurdham.",
      np: "जनकपुरधामको भानु चोक नजिक अवस्थित।"
    },
    isOfficialPartner: true
  }
];

export const factorInventoryData: FactorInventoryItem[] = [
  {
    id: "fi-1",
    centreId: "tc-bir",
    hospitalName: {
      en: "Bir Hospital (NAMS) - Central Bank",
      np: "वीर अस्पताल (न्याम्स) - केन्द्रीय भण्डार"
    },
    province: "Bagmati",
    factorType: "Factor VIII",
    status: "Available",
    availableUnitsApprox: "18,500 IU (250 IU & 500 IU Vials)",
    lastUpdated: "2026-09-01 18:30 NPT",
    updatedByRole: "Medical Admin / NHS Central",
    contactNotes: {
      en: "Immediate emergency dispensation available via Hematology Day Care. Carry NHS Patient Card.",
      np: "हेमाटोलोजी डे-केयरमार्फत आकस्मिक वितरण उपलब्ध। एन.एच.एस. बिरामी परिचयपत्र साथमा ल्याउनुहोला।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-2",
    centreId: "tc-bir",
    hospitalName: {
      en: "Bir Hospital (NAMS)",
      np: "वीर अस्पताल (न्याम्स)"
    },
    province: "Bagmati",
    factorType: "Factor IX",
    status: "Available",
    availableUnitsApprox: "7,200 IU (500 IU Vials)",
    lastUpdated: "2026-09-01 18:30 NPT",
    updatedByRole: "Medical Admin",
    contactNotes: {
      en: "Adequate stock for acute Hemophilia B bleeds.",
      np: "हेमोफिलिया 'बी' आकस्मिक रक्तस्रावका लागि पर्याप्त मौज्दात।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-3",
    centreId: "tc-kanti",
    hospitalName: {
      en: "Kanti Children's Hospital",
      np: "कान्ति बाल अस्पताल"
    },
    province: "Bagmati",
    factorType: "Factor VIII",
    status: "Available",
    availableUnitsApprox: "9,000 IU (Pediatric Dosages)",
    lastUpdated: "2026-09-01 15:45 NPT",
    updatedByRole: "Pediatric Hematologist",
    contactNotes: {
      en: "Priority reserved for pediatric patients (<14 years) and home prophylaxis training.",
      np: "१४ वर्ष मुनिका बालबालिका तथा बालबालिका प्रोफाइल्याक्सिसका लागि प्राथमिकता।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-4",
    centreId: "tc-pokhara",
    hospitalName: {
      en: "Pokhara Academy of Health Sciences",
      np: "पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान"
    },
    province: "Gandaki",
    factorType: "Factor VIII",
    status: "Limited",
    availableUnitsApprox: "3,500 IU (Urgent Resupply Requested)",
    lastUpdated: "2026-09-01 12:00 NPT",
    updatedByRole: "Provincial Admin",
    contactNotes: {
      en: "Limited stock reserved for life/limb threatening bleeds. Contact NHS Gandaki hotline before travel: +977-9856012345.",
      np: "सीमित मौज्दात आकस्मिक जीवनरक्षक अवस्थाका लागि सुरक्षित। यात्रा गर्नुअघि गण्डकी हटलाइनमा सम्पर्क गर्नुहोस्।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-5",
    centreId: "tc-pokhara",
    hospitalName: {
      en: "Pokhara Academy of Health Sciences",
      np: "पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान"
    },
    province: "Gandaki",
    factorType: "Factor IX",
    status: "Available",
    availableUnitsApprox: "4,000 IU",
    lastUpdated: "2026-09-01 12:00 NPT",
    updatedByRole: "Provincial Admin",
    contactNotes: {
      en: "Available in Western Regional Hospital Pharmacy cold storage.",
      np: "पश्चिमाञ्चल क्षेत्रीय अस्पताल फार्मेसी कोल्ड स्टोरमा उपलब्ध।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-6",
    centreId: "tc-bpkihs",
    hospitalName: {
      en: "BP Koirala Institute of Health Sciences Dharan",
      np: "बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान धरान"
    },
    province: "Koshi",
    factorType: "Factor VIII",
    status: "Available",
    availableUnitsApprox: "8,000 IU",
    lastUpdated: "2026-08-31 16:20 NPT",
    updatedByRole: "Koshi Chapter Coordinator",
    contactNotes: {
      en: "Available 24/7 in Emergency Blood & Factor Bank.",
      np: "आकस्मिक रक्त तथा फ्याक्टर बैंकमा २४ सै घण्टा उपलब्ध।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-7",
    centreId: "tc-bheri",
    hospitalName: {
      en: "Bheri Provincial Hospital Nepalgunj",
      np: "भेरी प्रादेशिक अस्पताल नेपालगन्ज"
    },
    province: "Lumbini",
    factorType: "Factor VIII",
    status: "Limited",
    availableUnitsApprox: "2,000 IU",
    lastUpdated: "2026-08-30 14:10 NPT",
    updatedByRole: "Duty Doctor",
    contactNotes: {
      en: "Call hospital emergency desk to confirm batch before travel.",
      np: "यात्रा गर्नुअघि अस्पतालको आकस्मिक कक्षमा सम्पर्क गरी मौज्दात यकिन गर्नुहोस्।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-8",
    centreId: "tc-seti",
    hospitalName: {
      en: "Seti Provincial Hospital Dhangadhi",
      np: "सेती प्रादेशिक अस्पताल धनगढी"
    },
    province: "Sudurpashchim",
    factorType: "Factor VIII",
    status: "Contact Hospital",
    availableUnitsApprox: "Verification in progress",
    lastUpdated: "2026-08-29 11:30 NPT",
    updatedByRole: "Medical Admin",
    contactNotes: {
      en: "Shipment in transit from Kathmandu central warehouse. Call +977-91-521259.",
      np: "काठमाडौंबाट ढुवानी प्रक्रियामा रहेको। फोन +९७७-९१-५२१२५९ मा सम्पर्क गर्नुहोस्।"
    },
    verificationStatus: "Pending"
  },
  {
    id: "fi-9",
    centreId: "tc-karnali",
    hospitalName: {
      en: "Karnali Provincial Hospital Surkhet",
      np: "कर्णाली प्रादेशिक अस्पताल सुर्खेत"
    },
    province: "Karnali",
    factorType: "Factor VIII",
    status: "Limited",
    availableUnitsApprox: "1,500 IU",
    lastUpdated: "2026-08-28 17:00 NPT",
    updatedByRole: "Provincial Coordinator",
    contactNotes: {
      en: "Reserved for acute trauma. Transport support available through NHS Karnali.",
      np: "आकस्मिक चोटपटकका लागि सुरक्षित। यातायात सहयोग एन.एच.एस. कर्णालीमार्फत उपलब्ध।"
    },
    verificationStatus: "Verified"
  },
  {
    id: "fi-10",
    centreId: "tc-tuth",
    hospitalName: {
      en: "TUTH Maharajgunj (Inhibitor / Rare Factors)",
      np: "टि.यु. शिक्षण अस्पताल (इन्हिबिटर / दुर्लभ फ्याक्टर)"
    },
    province: "Bagmati",
    factorType: "FEIBA / APCC",
    status: "Contact Hospital",
    availableUnitsApprox: "Special authorization required",
    lastUpdated: "2026-09-01 10:00 NPT",
    updatedByRole: "Super Admin",
    contactNotes: {
      en: "Bypassing agents for high-responder inhibitors require consultant hematologist approval.",
      np: "इन्हिबिटर भएका बिरामीका लागि बाइपासिङ एजेन्ट वरिष्ठ हेमाटोलोजिस्टको सिफारिसमा उपलब्ध।"
    },
    verificationStatus: "Verified"
  }
];

export const newsArticlesData: NewsArticle[] = [
  {
    id: "news-1",
    slug: "world-hemophilia-day-2026-nepal-call-for-equitable-factor-access",
    title: {
      en: "World Hemophilia Day: NHS Urges Government to Include Factor Replacement in Basic Health Package",
      np: "विश्व हेमोफिलिया दिवस: आधारभूत स्वास्थ्य सेवा प्याकेजमा फ्याक्टर प्रतिस्थापन समावेश गर्न एन.एच.एस.को माग"
    },
    summary: {
      en: "On the occasion of World Hemophilia Day, Nepal Hemophilia Society convened a national policy dialogue calling for decentralized coagulation diagnostics and sustained national budget allocation for clotting factors.",
      np: "विश्व हेमोफिलिया दिवसको अवसरमा नेपाल हेमोफिलिया सोसाइटीद्वारा आयोजित राष्ट्रिय संवादमा सातै प्रदेशमा रक्त परीक्षण तथा जीवनरक्षक फ्याक्टरका लागि दिगो बजेट व्यवस्था गर्न सरकारसँग माग गरियो।"
    },
    content: {
      en: `KATHMANDU — Nepal Hemophilia Society (NHS) brought together hematologists, representatives from the Ministry of Health and Population (MoHP), World Health Organization delegates, and patient advocates at the central convention hall in Kathmandu.\n\nHighlighting the theme of 'Equitable Access for All: Recognizing All Bleeding Disorders', NHS President underscored that while humanitarian donations from the World Federation of Hemophilia (WFH) have saved thousands of lives in Nepal over the past two decades, the time has come for the Government of Nepal to institutionalize national procurement of Factor VIII, Factor IX, and bypassing agents within the national health insurance framework.\n\nKey policy recommendations submitted include:\n1. Establishing specialized coagulation testing facilities in all 7 provincial teaching hospitals.\n2. Mandating free emergency factor infusion across provincial emergency departments.\n3. Expanding physiotherapy and musculoskeletal rehabilitation for hemophilic arthropathy prevention.\n4. Providing recognized disability identification cards without bureaucratic obstacles to all citizens living with severe bleeding disorders.`,
      np: `काठमाडौं — नेपाल हेमोफिलिया सोसाइटी (एन.एच.एस.) ले स्वास्थ्य तथा जनसंख्या मन्त्रालय, विश्व स्वास्थ्य संगठनका प्रतिनिधिहरू, वरिष्ठ हेमाटोलोजिस्ट तथा बिरामी प्रतिनिधिहरूको उपस्थितिमा राष्ट्रिय नीति संवाद कार्यक्रम सम्पन्न गरेको छ।\n\n'सबैका लागि समान पहुँच' भन्ने मूल नाराका साथ आयोजित कार्यक्रममा अध्यक्षले विगत दुई दशकदेखि विश्व हेमोफिलिया महासंघ (WFH) बाट प्राप्त मानवीय सहयोगले हजारौं जीवन रक्षा गरेको भए तापनि अब नेपाल सरकारले राष्ट्रिय स्वास्थ्य बीमा तथा आधारभूत स्वास्थ्य सेवामार्फत फ्याक्टरको स्थायी खरिद गर्नुपर्ने आवश्यकता औंल्याउनुभयो।`
    },
    category: "Advocacy",
    tags: ["World Hemophilia Day", "Advocacy", "Policy", "MoHP", "Factor Access"],
    author: {
      en: "NHS Communications Bureau",
      np: "एन.एच.एस. सञ्चार विभाग"
    },
    publishedDate: "2026-08-28",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    readTime: "4 min read"
  },
  {
    id: "news-2",
    slug: "gandaki-province-physiotherapy-camp-rehabilitates-50-hemophilia-patients",
    title: {
      en: "Comprehensive Joint Health & Physiotherapy Camp Held in Pokhara",
      np: "पोखरामा वृहत् जोर्नी स्वास्थ्य तथा फिजियोथेरापी शिविर सम्पन्न"
    },
    summary: {
      en: "Fifty patients with severe and moderate hemophilia received specialized musculoskeletal assessments, customized exercise regimens, and assistive splints during the 3-day rehabilitation workshop in Gandaki Province.",
      np: "गण्डकी प्रदेशमा आयोजित ३ दिने शिविरमा ५० जना हेमोफिलियाका बिरामीहरूको जोर्नी परीक्षण, सुधारात्मक कसरत र अर्थोपेडिक सहयोग प्रदान गरियो।"
    },
    content: {
      en: `POKHARA — Repeated bleeding into knees, elbows, and ankles remains the primary cause of chronic disability in individuals with hemophilia. To address hemophilic arthropathy, NHS Gandaki Provincial Chapter in partnership with Pokhara Academy of Health Sciences conducted an intensive Joint Health Camp.\n\nSpecialist physiotherapists demonstrated safe isometric muscle strengthening exercises that protect vulnerable joints from recurrent target joint bleeds. Each patient received a personalized rehabilitation roadmap and cold packs for home R.I.C.E. management.`,
      np: `पोखरा — हेमोफिलिया भएका व्यक्तिहरूमा बारम्बार हुने जोर्नी रक्तस्रावका कारण अपाङ्गता हुने जोखिम न्यूनीकरण गर्न एन.एच.एस. गण्डकी शाखाले पोखरा स्वास्थ्य विज्ञान प्रतिष्ठानसँगको सहकार्यमा विशेष शिविर सञ्चालन गर्‍यो।`
    },
    category: "Society News",
    tags: ["Physiotherapy", "Gandaki", "Joint Health", "Rehabilitation"],
    author: {
      en: "NHS Gandaki Chapter",
      np: "एन.एच.एस. गण्डकी शाखा"
    },
    publishedDate: "2026-08-15",
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    readTime: "3 min read"
  },
  {
    id: "news-3",
    slug: "patient-story-journey-from-remote-village-to-college-graduate",
    title: {
      en: "Patient Journey: Living with Dignity — How Timely Care Transformed Aashish's Life",
      np: "बिरामी अनुभव: मर्यादापूर्ण जीवन — समयमै उपचारले कसरी बदलियो आशिषको भविष्य"
    },
    summary: {
      en: "Diagnosed with severe Hemophilia A at age 4 in Sindhupalchok, Aashish shares his inspiring journey of managing bleeds with NHS support and graduating with a degree in Information Technology.",
      np: "सिन्धुपाल्चोकमा ४ वर्षको उमेरमा गम्भीर हेमोफिलिया 'ए' पत्ता लागेका आशिषले एन.एच.एस.को निरन्तर सहयोगमा कसरी सूचना प्रविधिमा स्नातक पूरा गरे भन्ने प्रेरक कथा।"
    },
    content: {
      en: `“When I was a child, a single knee bleed meant weeks of agonizing pain in bed without knowing what was wrong. My parents took me to traditional healers and multiple clinics, but nobody had heard of hemophilia in our village.\n\nEverything changed when we reached Bir Hospital and connected with the Nepal Hemophilia Society. For the first time, we learned that my blood was missing Factor VIII. With access to donated factor concentrates and training on early warning signs, I was able to attend school regularly.\n\nToday, I have graduated with a computer science degree and work remotely as a software developer. My message to every parent in Nepal is: Hemophilia is not a curse. With early diagnosis, factor support, and determination, our children can achieve every dream.”\n\n*Note: Story published with full explicit consent.*`,
      np: `“म सानो छँदा घुँडामा रगत जम्दा हप्तौंसम्म असह्य पीडा हुन्थ्यो। हाम्रो गाउँमा कसैलाई हेमोफिलियाबारे थाहा थिएन।\n\nजब हामी काठमाडौं आएर नेपाल हेमोफिलिया सोसाइटीको सम्पर्कमा पुग्यौं, तब मैले नयाँ जीवन पाएँ। आज म कम्प्युटर इन्जिनियरिङमा स्नातक पूरा गरी काम गरिरहेको छु। हेमोफिलिया कुनै श्राप होइन, सही उपचार र स्याहार पाएमा हामी समाजमा गर्वका साथ अघि बढ्न सक्छौं।”\n\n*नोट: बिरामीको पूर्ण सहमतिमा प्रकाशित कथा।*`
    },
    category: "Patient Stories",
    tags: ["Patient Stories", "Inspiration", "Youth", "Education", "Living with Hemophilia"],
    author: {
      en: "NHS Editorial Board",
      np: "एन.एच.एस. सम्पादकीय बोर्ड"
    },
    publishedDate: "2026-08-05",
    featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    isStoryConsentVerified: true,
    isAnonymousStory: false,
    readTime: "5 min read"
  },
  {
    id: "news-4",
    slug: "national-guidelines-updated-for-pediatric-bleeding-management",
    title: {
      en: "Updated Clinical Protocols for Pediatric Bleeding Emergencies Released",
      np: "बाल रक्तस्राव आकस्मिक व्यवस्थापनका लागि नयाँ क्लिनिकल निर्देशिका जारी"
    },
    summary: {
      en: "NHS Medical Advisory Council in collaboration with national pediatric hematologists has published the 2026 Clinical Reference Standard for acute pediatric bleed management.",
      np: "नेपाल हेमोफिलिया सोसाइटीको चिकित्सा सल्लाहकार परिषदद्वारा बाल रक्तस्राव आकस्मिक व्यवस्थापन सम्बन्धी २०२६ को नयाँ निर्देशिका सार्वजनिक गरिएको छ।"
    },
    content: {
      en: `The new guidelines provide clear step-by-step algorithms for emergency room clinicians managing head trauma, iliopsoas hematomas, and severe joint bleeds in children with hemophilia. Free digital copies are accessible through the NHS Resource Library.`,
      np: `यो निर्देशिकामा आपतकालीन कक्षका चिकित्सकहरूका लागि टाउकोको चोट, मांसपेशी रक्तस्राव र जोर्नी रक्तस्रावको तत्काल उपचारका लागि विस्तृत कार्यविधि समावेश गरिएको छ।`
    },
    category: "Medical Updates",
    tags: ["Guidelines", "Pediatrics", "Emergency Care", "Protocols"],
    author: {
      en: "Medical Advisory Council",
      np: "चिकित्सा सल्लाहकार परिषद"
    },
    publishedDate: "2026-07-20",
    featuredImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    readTime: "4 min read"
  }
];

export const eventsData: EventItem[] = [
  {
    id: "evt-1",
    slug: "national-hemophilia-conference-2026",
    title: {
      en: "National Hemophilia & Bleeding Disorders Conference 2026",
      np: "राष्ट्रिय हेमोफिलिया तथा रक्तस्राव विकार सम्मेलन २०२६"
    },
    description: {
      en: "A 2-day national gathering of hematologists, physicians, nurses, physiotherapists, policymakers, and patient representatives focusing on national factor procurement, modern prophylaxis, and multidisciplinary care models.",
      np: "हेमाटोलोजिस्ट, चिकित्सक, नर्स, फिजियोथेरापिस्ट र बिरामी प्रतिनिधिहरूको २ दिने राष्ट्रिय सम्मेलन।"
    },
    date: "2026-10-15",
    endDate: "2026-10-16",
    time: "09:00 AM - 05:00 PM NPT",
    location: {
      en: "Nepal Academy Hall, Kamaladi, Kathmandu",
      np: "नेपाल प्रज्ञा प्रतिष्ठान, कमलादी, काठमाडौं"
    },
    isOnline: false,
    category: "Conference",
    organizer: {
      en: "Nepal Hemophilia Society Central Executive Committee",
      np: "नेपाल हेमोफिलिया सोसाइटी केन्द्रीय कार्यसमिति"
    },
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    registrationOpen: true,
    registrationDeadline: "2026-10-05",
    attendeesCount: 185,
    documents: [
      {
        title: {
          en: "Conference Agenda & Speaker Schedule (PDF)",
          np: "सम्मेलन कार्यतालिका तथा वक्ताहरूको विवरण (PDF)"
        },
        url: "#",
        size: "1.4 MB"
      }
    ]
  },
  {
    id: "evt-2",
    slug: "world-hemophilia-day-awareness-rally-and-health-camp",
    title: {
      en: "World Hemophilia Day 2027: National Awareness Walk & Screening",
      np: "विश्व हेमोफिलिया दिवस २०२७: राष्ट्रिय प्रभातफेरी तथा स्वास्थ्य परीक्षण"
    },
    description: {
      en: "Annual walkathon starting from Bhrikutimandap to Basantapur Durbar Square, followed by free blood grouping and coagulation screening for suspected bleeding disorders.",
      np: "भृकुटीमण्डपबाट सुरु भई वसन्तपुर दरबार क्षेत्रसम्म प्रभातफेरी तथा निःशुल्क रगत परीक्षण शिविर।"
    },
    date: "2027-04-17",
    time: "07:00 AM - 01:00 PM NPT",
    location: {
      en: "Bhrikutimandap Garden, Kathmandu",
      np: "भृकुटीमण्डप, काठमाडौं"
    },
    isOnline: false,
    category: "World Hemophilia Day",
    organizer: {
      en: "NHS Central Secretariat & Youth Wing",
      np: "एन.एच.एस. केन्द्रीय सचिवालय तथा युवा समूह"
    },
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    registrationOpen: true,
    registrationDeadline: "2027-04-15",
    attendeesCount: 340
  },
  {
    id: "evt-3",
    slug: "online-cme-emergency-factor-replacement-for-district-doctors",
    title: {
      en: "Online CME Webinar: Emergency Factor Dosing & Triage for Primary Care Doctors",
      np: "अनलाइन सीएमई वेबिनार: प्राथमिक स्वास्थ्य चिकित्सकहरूका लागि आकस्मिक फ्याक्टर मात्रा तथा व्यवस्थापन"
    },
    description: {
      en: "Accredited continuous medical education session for district medical officers across all 7 provinces regarding acute hemophilia bleed stabilization before emergency referral.",
      np: "सातै प्रदेशका जिल्ला अस्पतालका चिकित्सकहरूका लागि आकस्मिक हेमोफिलिया व्यवस्थापन सम्बन्धी अनलाइन प्रशिक्षण।"
    },
    date: "2026-09-25",
    time: "06:30 PM - 08:30 PM NPT",
    location: {
      en: "Zoom Virtual Hall (Link shared upon registration)",
      np: "जुम भर्चुअल मिटिङ (दर्ता पश्चात लिङ्क उपलब्ध गराइनेछ)"
    },
    isOnline: true,
    onlineLink: "https://zoom.us/j/nhs-cme-emergency",
    category: "CME Training",
    organizer: {
      en: "NHS Medical Advisory Council",
      np: "एन.एच.एस. चिकित्सा सल्लाहकार परिषद"
    },
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    registrationOpen: true,
    registrationDeadline: "2026-09-24",
    attendeesCount: 94
  }
];

export const resourcesData: ResourceItem[] = [
  {
    id: "res-1",
    title: {
      en: "NHS Clinical Guidelines for the Management of Hemophilia in Nepal (2026 Edition)",
      np: "नेपालमा हेमोफिलिया व्यवस्थापनका लागि क्लिनिकल निर्देशिका (२०२६ संस्करण)"
    },
    description: {
      en: "Comprehensive evidence-based clinical protocols approved by the NHS Medical Advisory Council for diagnosis, acute bleed management, prophylaxis, and orthopedic rehabilitation.",
      np: "निदान, आकस्मिक उपचार, प्रोफाइल्याक्सिस तथा पुनर्स्थापना सम्बन्धी प्रमाणमा आधारित राष्ट्रिय निर्देशिका।"
    },
    category: "Guidelines",
    audience: "Healthcare Professionals",
    language: "Bilingual",
    year: 2026,
    fileType: "PDF",
    fileUrl: "/documents/NHS_Clinical_Guidelines_2026.pdf",
    fileSize: "3.2 MB",
    downloadCount: 1420,
    thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    author: {
      en: "NHS Medical Advisory Council",
      np: "एन.एच.एस. चिकित्सा सल्लाहकार परिषद"
    },
    publisher: {
      en: "Nepal Hemophilia Society Publications",
      np: "नेपाल हेमोफिलिया सोसाइटी प्रकाशन"
    }
  },
  {
    id: "res-2",
    title: {
      en: "Emergency Bleeding First-Aid & R.I.C.E. Protocol (Illustrated Guide)",
      np: "आकस्मिक रक्तस्राव प्राथमिक उपचार तथा R.I.C.E. विधि (सचित्र पुस्तिका)"
    },
    description: {
      en: "A step-by-step visual pocket guide in Nepali and English for patients, parents, school teachers, and emergency responders on managing joint and muscle bleeds.",
      np: "बिरामी, अभिभावक तथा शिक्षकहरूका लागि जोर्नी र मांसपेशी रक्तस्राव हुँदा अपनाउनुपर्ने प्राथमिक उपचारको सचित्र हातेपुस्तिका।"
    },
    category: "Brochures",
    audience: "Patients & Families",
    language: "Nepali",
    year: 2026,
    fileType: "PDF",
    fileUrl: "/documents/NHS_Emergency_FirstAid_RICE_Guide.pdf",
    fileSize: "1.8 MB",
    downloadCount: 2890,
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    author: {
      en: "NHS Patient Welfare Committee",
      np: "एन.एच.एस. बिरामी कल्याण समिति"
    },
    publisher: {
      en: "Nepal Hemophilia Society",
      np: "नेपाल हेमोफिलिया सोसाइटी"
    }
  },
  {
    id: "res-3",
    title: {
      en: "Nepal Hemophilia Annual Registry & Demographic Survey Report 2025/26",
      np: "नेपाल हेमोफिलिया वार्षिक तथ्याङ्क तथा जनसांख्यिकीय सर्वेक्षण प्रतिवेदन २०२५/२६"
    },
    description: {
      en: "Official statistical report documenting registered cases across all 7 provinces, severity distributions, factor utilization data, and diagnostic gaps in Nepal.",
      np: "नेपालका सातै प्रदेशमा दर्ता भएका बिरामीहरूको संख्या, रोगको गम्भीरता, फ्याक्टर वितरण तथा चुनौतीहरू समेटिएको वार्षिक आधिकारिक प्रतिवेदन।"
    },
    category: "Reports",
    audience: "Policymakers",
    language: "English",
    year: 2025,
    fileType: "PDF",
    fileUrl: "/documents/NHS_Annual_Survey_Report_2025.pdf",
    fileSize: "4.5 MB",
    downloadCount: 980,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    author: {
      en: "NHS Data & Registry Bureau",
      np: "एन.एच.एस. तथ्याङ्क विभाग"
    },
    publisher: {
      en: "Nepal Hemophilia Society",
      np: "नेपाल हेमोफिलिया सोसाइटी"
    }
  },
  {
    id: "res-4",
    title: {
      en: "School Accommodation Guide for Children with Bleeding Disorders",
      np: "रक्तस्राव विकार भएका बालबालिकाका लागि विद्यालय सहयोगी निर्देशिका"
    },
    description: {
      en: "Guide for teachers, principals, and school nurses on providing a safe, inclusive learning environment for students with hemophilia.",
      np: "हेमोफिलिया भएका विद्यार्थीहरूलाई विद्यालयमा सुरक्षित, मर्यादित र समावेशी वातावरण प्रदान गर्न शिक्षकहरूका लागि तयार पारिएको निर्देशिका।"
    },
    category: "Brochures",
    audience: "General Public",
    language: "Nepali",
    year: 2025,
    fileType: "PDF",
    fileUrl: "/documents/NHS_School_Guide.pdf",
    fileSize: "1.2 MB",
    downloadCount: 1650,
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    author: {
      en: "NHS Youth & Education Wing",
      np: "एन.एच.एस. शिक्षा तथा युवा शाखा"
    },
    publisher: {
      en: "Nepal Hemophilia Society",
      np: "नेपाल हेमोफिलिया सोसाइटी"
    }
  },
  {
    id: "res-5",
    title: {
      en: "Official Membership & Patient Registration Form (Printable)",
      np: "आधिकारिक सदस्यता तथा बिरामी दर्ता फारम (प्रिन्ट योग्य)"
    },
    description: {
      en: "Standard paper application form for registration in rural areas without continuous internet access.",
      np: "इन्टरनेट पहुँच नभएका ग्रामीण क्षेत्रका लागि आधिकारिक कागजी दर्ता फारम।"
    },
    category: "Forms",
    audience: "Patients & Families",
    language: "Nepali",
    year: 2026,
    fileType: "PDF",
    fileUrl: "/documents/NHS_Membership_Form.pdf",
    fileSize: "0.6 MB",
    downloadCount: 3100,
    thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    author: {
      en: "NHS Secretariat",
      np: "एन.एच.एस. सचिवालय"
    },
    publisher: {
      en: "Nepal Hemophilia Society",
      np: "नेपाल हेमोफिलिया सोसाइटी"
    }
  }
];

export const elearningCoursesData: ELearningCourse[] = [
  {
    id: "course-1",
    slug: "hemophilia-basics-for-families",
    title: {
      en: "Hemophilia 101: Comprehensive Family & Caregiver Guide",
      np: "हेमोफिलिया आधारभूत ज्ञान: परिवार तथा अभिभावक निर्देशिका"
    },
    shortDesc: {
      en: "Learn the fundamentals of bleeding disorders, early bleed detection, home care, and how to safeguard joint health.",
      np: "रक्तस्राव विकारका आधारभूत पक्षहरू, प्रारम्भिक लक्षण पहिचान, घरायसी हेरचाह तथा जोर्नी सुरक्षा सम्बन्धी ज्ञान।"
    },
    fullDesc: {
      en: "This interactive self-paced course is designed by pediatric hematologists and senior nurses for patients, parents, and caregivers. Gain the confidence and practical skills required to recognize bleeds early, administer immediate first-aid, and work closely with your regional healthcare center.",
      np: "यो कोर्स बिरामी, आमाबुवा तथा स्याहारकर्ताहरूका लागि तयार पारिएको हो। यसले रक्तस्रावका लक्षण चाँडो पहिचान गर्न र प्राथमिक उपचार गर्न सहयोग पुर्‍याउँछ।"
    },
    targetAudience: "Patients & Families",
    durationMinutes: 45,
    modulesCount: 4,
    level: "Beginner",
    coverImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    modules: [
      {
        id: "m1",
        title: {
          en: "Module 1: Understanding Hemophilia & Inheritance",
          np: "खण्ड १: हेमोफिलिया के हो र यो कसरी सर्छ?"
        },
        content: {
          en: "Hemophilia is an inherited genetic condition where blood does not clot normally due to a deficiency in specific clotting proteins (Factor VIII in Hemophilia A, Factor IX in Hemophilia B). Because the gene is located on the X chromosome, it primarily affects males while females are generally genetic carriers or may experience milder bleeding tendencies.",
          np: "हेमोफिलिया एक वंशाणुगत समस्या हो जसमा रगत जमाउने फ्याक्टरको कमीका कारण रगत ढिलो जम्छ वा जम्दैन।"
        },
        duration: "10 mins",
        bulletPoints: [
          {
            en: "Difference between Hemophilia A (Factor VIII) and Hemophilia B (Factor IX)",
            np: "हेमोफिलिया 'ए' (फ्याक्टर ८) र 'बी' (फ्याक्टर ९) बीचको भिन्नता"
          },
          {
            en: "Inheritance patterns: X-linked recessive genetics explained simply",
            np: "वंशाणुगत हस्तान्तरण प्रक्रियाको सरल व्याख्या"
          },
          {
            en: "Why bleeding does not mean faster bleeding, but bleeding for a longer duration",
            np: "हेमोफिलियामा रगत छिटो बग्ने होइन, धेरै बेरसम्म बगिरहने समस्या हुन्छ"
          }
        ]
      },
      {
        id: "m2",
        title: {
          en: "Module 2: Recognizing Bleeds Early & Urgent Warning Signs",
          np: "खण्ड २: रक्तस्रावका प्रारम्भिक लक्षण तथा खतराका संकेतहरू"
        },
        content: {
          en: "Internal bleeding into joints (hemarthrosis) and muscles often begins with subtle tingling, warmth, or stiffness before visible swelling occurs. Treating the bleed immediately with clotting factor prevents permanent joint damage.",
          np: "जोर्नीभित्रको रक्तस्राव सुन्निनुभन्दा अगाडि नै हल्का तातोपन, झमझमाहट वा कडापनबाट सुरु हुन्छ। यसलाई समयमै पहिचान गरी उपचार गर्नुपर्छ।"
        },
        duration: "12 mins",
        bulletPoints: [
          {
            en: "Target joints: Knees, elbows, and ankles are most susceptible",
            np: "जोखिमयुक्त जोर्नीहरू: घुँडा, कुहिनो र गोलीगाँठो"
          },
          {
            en: "Red-flag emergencies: Head trauma, neck swelling, abdominal pain, blood in urine",
            np: "अति खतराका संकेत: टाउकोमा चोट, घाँटी सुन्निनु, पेट दुख्नु, पिसाबमा रगत देखिनु"
          },
          {
            en: "When to rush to hospital emergency immediately",
            np: "तुरुन्त अस्पतालको आकस्मिक कक्षमा पुग्नुपर्ने अवस्थाहरू"
          }
        ]
      },
      {
        id: "m3",
        title: {
          en: "Module 3: The R.I.C.E. First-Aid Protocol",
          np: "खण्ड ३: R.I.C.E. प्राथमिक उपचार कार्यविधि"
        },
        content: {
          en: "Whenever an acute bleed is suspected, remember R.I.C.E. — Rest, Ice (Cold Compression), Compression (Gentle support, not tight tourniquets), and Elevation. While R.I.C.E. reduces pain and swelling, clotting factor replacement must follow as quickly as possible.",
          np: "रक्तस्राव शंका लाग्ने बित्तिकै R.I.C.E. विधि अपनाउनुहोस् — आराम (Rest), बरफको सेकाइ (Ice), हल्का ब्यान्डेज (Compression), र प्रभावित अंग माथि उठाउने (Elevation)।"
        },
        duration: "10 mins",
        bulletPoints: [
          {
            en: "Rest: Stop all physical activity immediately to limit tissue damage",
            np: "आराम: थप क्षति हुन नदिन तुरुन्त हिँडडुल वा खेलकुद बन्द गर्नुहोस्"
          },
          {
            en: "Ice: Apply wrapped cold packs for 15-20 mins (Never apply bare ice directly to skin)",
            np: "बरफ: कपडामा बेरेर १५-२० मिनेट सेक्नुहोस् (सिधै छालामा बरफ नराख्नुहोस्)"
          },
          {
            en: "Compression: Use elastic crepe bandage gently for joint stability",
            np: "ब्यान्डेज: जोर्नीलाई स्थिर राख्न हल्कासँग क्रेप ब्यान्डेज बाँध्नुहोस्"
          },
          {
            en: "Elevation: Keep the injured limb above heart level when resting",
            np: "माथि उठाउने: सुत्दा वा बस्दा प्रभावित हात वा खुट्टा मुटुको सतहभन्दा माथि राख्नुहोस्"
          }
        ]
      },
      {
        id: "m4",
        title: {
          en: "Module 4: Daily Life, Physical Activity & Safe Habits",
          np: "खण्ड ४: दैनिक जीवन, सुरक्षित व्यायाम तथा सावधानीहरू"
        },
        content: {
          en: "Physical fitness strengthens muscles and protects joints from spontaneous bleeds. Low-impact sports such as swimming, walking, and stationary cycling are highly recommended, while high-contact sports (rugby, boxing) should be avoided. Always avoid Aspirin and NSAIDs (Ibuprofen) as they inhibit platelets and worsen bleeding.",
          np: "नियमित र सुरक्षित व्यायामले मांसपेशी बलियो बनाउँछ र जोर्नी जोगाउँछ। पौडी खेल्ने र हिँड्ने जस्ता सुरक्षित व्यायाम राम्रो मानिन्छ। एस्पिरिन र आइबुप्रोफेन जस्ता औषधि कहिल्यै खानुहुँदैन।"
        },
        duration: "13 mins",
        bulletPoints: [
          {
            en: "Safe vs high-risk physical activities for hemophilia patients",
            np: "सुरक्षित र जोखिमयुक्त खेलकुद तथा गतिविधिहरू"
          },
          {
            en: "Medications to strictly avoid: Aspirin, Ibuprofen, Naproxen",
            np: "कदापि प्रयोग गर्न नहुने औषधिहरू: एस्पिरिन, ब्रुफिन, फ्लेक्सन"
          },
          {
            en: "Dental hygiene and regular soft-brush cleaning to prevent gum bleeds",
            np: "दाँतको सरसफाइ र नरम ब्रसको प्रयोग"
          }
        ]
      }
    ],
    quiz: [
      {
        question: {
          en: "Which clotting factor is deficient in Hemophilia A?",
          np: "हेमोफिलिया 'ए' मा कुन फ्याक्टरको कमी हुन्छ?"
        },
        options: [
          { en: "Factor IX (Nine)", np: "फ्याक्टर ९" },
          { en: "Factor VIII (Eight)", np: "फ्याक्टर ८" },
          { en: "Factor VII (Seven)", np: "फ्याक्टर ७" },
          { en: "Factor XI (Eleven)", np: "फ्याक्टर ११" }
        ],
        correctIndex: 1,
        explanation: {
          en: "Hemophilia A is caused by a deficiency of Factor VIII, while Hemophilia B is caused by a deficiency of Factor IX.",
          np: "हेमोफिलिया 'ए' फ्याक्टर ८ को कमीले हुन्छ भने हेमोफिलिया 'बी' फ्याक्टर ९ को कमीले हुन्छ।"
        }
      },
      {
        question: {
          en: "What does the 'I' stand for in the emergency R.I.C.E. first-aid protocol?",
          np: "R.I.C.E. प्राथमिक उपचार विधिमा 'I' को अर्थ के हो?"
        },
        options: [
          { en: "Injection", np: "इन्जेक्सन" },
          { en: "Ice / Cold compression", np: "बरफको सेकाइ (Ice)" },
          { en: "Isolation", np: "एकान्तबास" },
          { en: "Intake of fluids", np: "तरल पदार्थ सेवन" }
        ],
        correctIndex: 1,
        explanation: {
          en: "R.I.C.E. stands for Rest, Ice, Compression, and Elevation.",
          np: "R.I.C.E. को अर्थ Rest (आराम), Ice (बरफको सेकाइ), Compression (ब्यान्डेज), र Elevation (माथि उठाउने) हो।"
        }
      },
      {
        question: {
          en: "Which common over-the-counter painkiller should individuals with hemophilia STRICTLY AVOID?",
          np: "हेमोफिलिया भएका व्यक्तिहरूले कुन दुखाइ कम गर्ने औषधि कदापि खानुहुँदैन?"
        },
        options: [
          { en: "Paracetamol", np: "प्यारासितामोल" },
          { en: "Aspirin & Ibuprofen (NSAIDs)", np: "एस्पिरिन र आइबुप्रोफेन" },
          { en: "Vitamin C", np: "भिटामिन सी" },
          { en: "Antacids", np: "एन्टासिड" }
        ],
        correctIndex: 1,
        explanation: {
          en: "Aspirin, Ibuprofen and other NSAIDs thin the blood and disrupt platelet function, drastically increasing bleeding risk. Paracetamol is the preferred safe painkiller.",
          np: "एस्पिरिन र आइबुप्रोफेनले रगत पातलो बनाउँछ र रक्तस्राव बढाउँछ। प्यारासितामोल सुरक्षित विकल्प हो।"
        }
      }
    ]
  },
  {
    id: "course-2",
    slug: "emergency-triage-for-healthcare-workers",
    title: {
      en: "Acute Bleeding Management for ER Clinicians & Nurses",
      np: "आकस्मिक कक्षका स्वास्थ्यकर्मीहरूका लागि रक्तस्राव व्यवस्थापन"
    },
    shortDesc: {
      en: "Clinical dosage calculations, target factor level attainment, head trauma protocols, and inhibitor handling.",
      np: "फ्याक्टर मात्रा गणना, टाउकोको चोट व्यवस्थापन र आकस्मिक हेरचाह निर्देशिका।"
    },
    fullDesc: {
      en: "Designed for emergency physicians, medical officers, and staff nurses across Nepal's provincial and district hospitals. Covers acute stabilization, calculating IU factor requirements based on body weight, and recognizing compartment syndrome.",
      np: "यो कोर्स अस्पतालका आकस्मिक कक्षमा कार्यरत चिकित्सक तथा नर्सहरूका लागि हो।"
    },
    targetAudience: "Nurses & Medical Students",
    durationMinutes: 60,
    modulesCount: 3,
    level: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    modules: [
      {
        id: "em1",
        title: {
          en: "Module 1: Dosing Calculation for Factor VIII and Factor IX",
          np: "खण्ड १: फ्याक्टर ८ र ९ को मात्रा गणना विधि"
        },
        content: {
          en: "Formula for Factor VIII: Required IU = Body Weight (kg) × Desired Factor Level Rise (%) × 0.5. For Factor IX: Required IU = Body Weight (kg) × Desired Level Rise (%) × 1.0 (or 1.2 depending on vial type). Target factor levels for life-threatening bleeds (head, GI, major surgery) is 80-100%, and for moderate joint bleeds is 30-50%.",
          np: "फ्याक्टर ८ को मात्रा = तौल (केजी) × आवश्यक प्रतिशत × ०.५। फ्याक्टर ९ को मात्रा = तौल (केजी) × आवश्यक प्रतिशत × १.०।"
        },
        duration: "20 mins",
        bulletPoints: [
          {
            en: "1 IU/kg of Factor VIII raises plasma level by approximately 2% (0.02 IU/mL)",
            np: "१ युनिट/केजी फ्याक्टर ८ ले रगतमा करिब २% स्तर बढाउँछ"
          },
          {
            en: "Target level guidelines: 80-100% for intracranial, 30-50% for joint bleeds",
            np: "टाउकोको चोटमा ८०-१००% र जोर्नीमा ३०-५०% स्तर कायम गर्नुपर्छ"
          }
        ]
      },
      {
        id: "em2",
        title: {
          en: "Module 2: Management of Suspected Head Injury & Trauma",
          np: "खण्ड २: टाउकोको चोट तथा दुर्घटना व्यवस्थापन"
        },
        content: {
          en: "CRITICAL CLINICAL RULE: In any hemophilia patient presenting with head trauma, ALWAYS INFUSE CLOTTING FACTOR FIRST before sending for CT scan or further diagnostic imaging. Never delay factor infusion to await radiology confirmation.",
          np: "अति महत्वपूर्ण नियम: हेमोफिलियाका बिरामीमा टाउकोको चोट लाग्दा सिटि-स्क्यानको रिपोर्ट नपर्खी तुरुन्त फ्याक्टर इन्जेक्सन दिनुपर्छ।"
        },
        duration: "20 mins",
        bulletPoints: [
          {
            en: "Rule: Factor First, Radiology Second",
            np: "नियम: पहिले फ्याक्टर, त्यसपछि रेडियोलोजी/सिटि स्क्यान"
          },
          {
            en: "Monitor vitals, pupillary response, and Glasgow Coma Scale (GCS) continuously",
            np: "बिरामीको चेतना स्तर (GCS) र रक्तचाप निरन्तर निगरानी गर्नुहोस्"
          }
        ]
      },
      {
        id: "em3",
        title: {
          en: "Module 3: Safe Venipuncture & Infusion Technique",
          np: "खण्ड ३: सुरक्षित नसा खोजी तथा इन्फ्युजन विधि"
        },
        content: {
          en: "Always preserve peripheral veins in hemophilia patients. Use butterfly needles (23G-25G). Avoid intramuscular (IM) injections as they cause deep, painful muscle hematomas. Apply gentle pressure on venipuncture site for at least 5-10 minutes post-infusion.",
          np: "बिरामीको नसा जोगाउन २३-२५ गेजको बटरफ्लाइ सुई प्रयोग गर्नुहोस्। मासुमा लगाइने (IM) इन्जेक्सन कहिल्यै नलगाउनुहोस्।"
        },
        duration: "20 mins",
        bulletPoints: [
          {
            en: "NEVER administer intramuscular (IM) injections or medications",
            np: "मासुमा दिइने सुई (IM Injection) कदापि नदिनुहोस्"
          },
          {
            en: "Apply firm direct pressure without rubbing for 5-10 minutes",
            np: "सुई झिकेपछि नमिचीकन ५-१० मिनेटसम्म सफा कपासले थिचिराख्नुहोस्"
          }
        ]
      }
    ],
    quiz: [
      {
        question: {
          en: "When a hemophilia patient presents with blunt head injury, what is the mandatory immediate clinical action?",
          np: "हेमोफिलियाको बिरामी टाउकोको चोट लागेर आउँदा पहिलो अनिवार्य कदम के हो?"
        },
        options: [
          { en: "Send immediately to CT scan and await radiologist report", np: "पहिले सिटि-स्क्यान गराएर रिपोर्ट कुर्नु" },
          { en: "Administer 100% target clotting factor immediately, then proceed to CT imaging", np: "तुरुन्त १००% फ्याक्टर दिएर मात्र सिटि-स्क्यान गराउनु" },
          { en: "Give Ibuprofen for headache and observe for 6 hours", np: "ब्रुफिन दिएर ६ घण्टा निगरानीमा राख्नु" },
          { en: "Perform a lumbar puncture", np: "लम्बर पञ्चर गर्नु" }
        ],
        correctIndex: 1,
        explanation: {
          en: "In hemophilia, intracranial hemorrhage is rapidly fatal. Clotting factor must be infused immediately at 100% target before any diagnostic CT scan or imaging delays.",
          np: "हेमोफिलियामा टाउकोको रक्तस्राव ज्यानमारा हुन सक्ने भएकाले सिटि-स्क्यानको रिपोर्ट नपर्खी तुरुन्त फ्याक्टर दिनुपर्छ।"
        }
      }
    ]
  }
];

export const initialSupportRequests: SupportRequest[] = [
  {
    id: "sr-101",
    trackingNumber: "NHS-SR-2026-0812",
    requesterName: "Prakash Sharma (Father of child with Hemo A)",
    isAnonymous: false,
    phone: "+977-9841987654",
    email: "prakash.sharma@yahoo.com",
    province: "Bagmati",
    hospitalNear: "Bir Hospital",
    requestType: "Emergency Factor Need",
    urgency: "Emergency (Immediate)",
    description: "My 7-year-old son sustained a right knee trauma at school today. Joint is visibly swollen and warm. Need 500 IU Factor VIII for immediate infusion.",
    status: "In Progress",
    assignedStaff: "Dr. Bishal Subedi",
    createdAt: "2026-09-01 19:40 NPT",
    updatedAt: "2026-09-01 20:15 NPT",
    resolutionNotes: "Contacted father; reserved 500 IU Factor VIII at Bir Hospital Day Care. Patient arriving at ER."
  },
  {
    id: "sr-102",
    trackingNumber: "NHS-SR-2026-0811",
    requesterName: "Sunita Chaudhary",
    isAnonymous: false,
    phone: "+977-9807654321",
    province: "Lumbini",
    hospitalNear: "Bheri Hospital",
    requestType: "Disability Card Support",
    urgency: "Standard",
    description: "Seeking official recommendation letter from NHS for local municipality disability card renewal.",
    status: "New",
    createdAt: "2026-09-01 11:20 NPT",
    updatedAt: "2026-09-01 11:20 NPT"
  },
  {
    id: "sr-103",
    trackingNumber: "NHS-SR-2026-0810",
    requesterName: "Anonymous Patient",
    isAnonymous: true,
    phone: "+977-9812344321",
    province: "Gandaki",
    hospitalNear: "Pokhara Regional Hospital",
    requestType: "Physiotherapy Booking",
    urgency: "Standard",
    description: "Chronic left ankle flexion contracture. Want to schedule appointment with Gandaki NHS physiotherapist.",
    status: "Resolved",
    assignedStaff: "Ramesh Thapa",
    createdAt: "2026-08-30 14:00 NPT",
    updatedAt: "2026-08-31 16:30 NPT",
    resolutionNotes: "Booked session with Physiotherapy Unit for Sept 5, 2026."
  }
];

export const initialMembershipApplications: MembershipApplication[] = [
  {
    id: "mem-app-01",
    applicationNumber: "NHS-APP-2026-041",
    fullName: "Rohan Manandhar",
    dob: "2008-06-14",
    gender: "Male",
    bloodGroup: "O+ve",
    conditionType: "Hemophilia A",
    severity: "Severe (<1%)",
    province: "Bagmati",
    district: "Lalitpur",
    municipality: "Lalitpur Metropolitan City",
    wardNo: "5",
    address: "Patan Dhoka, Lalitpur",
    phone: "+977-9841556677",
    email: "rohan.manandhar@gmail.com",
    emergencyContactName: "Krishna Manandhar (Father)",
    emergencyContactPhone: "+977-9851099887",
    emergencyContactRelation: "Father",
    status: "Under Review",
    submittedAt: "2026-08-31 14:20 NPT",
    reviewerNotes: "Diagnostic lab report from Bir Hospital verified. Awaiting executive approval."
  },
  {
    id: "mem-app-02",
    applicationNumber: "NHS-APP-2026-042",
    fullName: "Kamala Devi Joshi",
    dob: "1995-11-23",
    gender: "Female",
    bloodGroup: "A+ve",
    conditionType: "vWD",
    severity: "Moderate (1-5%)",
    province: "Sudurpashchim",
    district: "Kailali",
    municipality: "Dhangadhi Sub-Metropolitan",
    wardNo: "2",
    address: "Main Road, Dhangadhi",
    phone: "+977-9812998877",
    email: "kamala.joshi@gmail.com",
    emergencyContactName: "Gopal Joshi (Spouse)",
    emergencyContactPhone: "+977-9848123456",
    emergencyContactRelation: "Spouse",
    status: "Approved",
    submittedAt: "2026-08-25 10:15 NPT",
    reviewedAt: "2026-08-27 15:30 NPT",
    reviewerNotes: "Approved by NHS Central Committee. Membership ID allocated.",
    membershipId: "NHS-MEM-2026-0188"
  }
];

export const initialDonationRecords: DonationRecord[] = [
  {
    id: "don-001",
    receiptNumber: "NHS-REC-2026-0924",
    donorName: "Binod Chaudhary Foundation",
    donorEmail: "csr@chaudharygroup.com",
    donorPhone: "+977-1-5525041",
    donorPanOrCitizenship: "PAN: 300124890",
    isAnonymous: false,
    amount: 150000,
    currency: "NPR",
    category: "Emergency Factor Fund",
    donationType: "One-time",
    paymentMethod: "Bank Transfer",
    paymentStatus: "Completed",
    transactionReference: "NABIL-TXN-99881234",
    createdAt: "2026-08-30 11:45 NPT",
    isReceiptGenerated: true
  },
  {
    id: "don-002",
    receiptNumber: "NHS-REC-2026-0925",
    donorName: "Pooja Gurung",
    donorEmail: "pooja.g@gmail.com",
    donorPhone: "+977-9841112233",
    isAnonymous: false,
    amount: 5000,
    currency: "NPR",
    category: "Physiotherapy & Joint Rehab",
    donationType: "Monthly",
    paymentMethod: "eSewa",
    paymentStatus: "Completed",
    transactionReference: "ESEWA-7889102",
    createdAt: "2026-09-01 14:10 NPT",
    isReceiptGenerated: true
  },
  {
    id: "don-003",
    receiptNumber: "NHS-REC-2026-0926",
    donorName: "Anonymous Well-Wisher",
    donorEmail: "supporter@gmail.com",
    donorPhone: "+977-98XXXXXXXX",
    isAnonymous: true,
    amount: 10000,
    currency: "NPR",
    category: "Child Education & Youth",
    donationType: "One-time",
    paymentMethod: "Khalti",
    paymentStatus: "Completed",
    transactionReference: "KHALTI-9012345",
    createdAt: "2026-09-01 16:30 NPT",
    isReceiptGenerated: true
  }
];

export const initialPatientRegistry: PatientRegistryRecord[] = [
  {
    id: "pr-01",
    patientCode: "NHS-P-2026-001",
    diagnosis: "Hemophilia A",
    severity: "Severe (<1%)",
    factorBaselineLevel: "< 0.8%",
    inhibitorStatus: "Negative",
    currentRegimen: "Low-Dose Prophylaxis",
    primaryTreatmentCentre: "Bir Hospital (NAMS)",
    province: "Bagmati",
    district: "Kathmandu",
    targetJoints: ["Right Knee", "Left Elbow"],
    lastBleedDate: "2026-08-18",
    lastInfusionDate: "2026-08-30",
    annualBleedRateApprox: 4,
    physiotherapyEnrolled: true,
    disabilityCardHeld: true
  },
  {
    id: "pr-02",
    patientCode: "NHS-P-2026-002",
    diagnosis: "Hemophilia B",
    severity: "Moderate (1-5%)",
    factorBaselineLevel: "2.4%",
    inhibitorStatus: "Negative",
    currentRegimen: "On-Demand",
    primaryTreatmentCentre: "Pokhara Academy of Health Sciences",
    province: "Gandaki",
    district: "Kaski",
    targetJoints: ["Right Ankle"],
    lastBleedDate: "2026-07-22",
    lastInfusionDate: "2026-07-23",
    annualBleedRateApprox: 2,
    physiotherapyEnrolled: true,
    disabilityCardHeld: true
  },
  {
    id: "pr-03",
    patientCode: "NHS-P-2026-003",
    diagnosis: "Von Willebrand Disease",
    severity: "Mild (5-40%)",
    factorBaselineLevel: "14%",
    inhibitorStatus: "Not Tested",
    currentRegimen: "On-Demand",
    primaryTreatmentCentre: "BP Koirala Institute of Health Sciences",
    province: "Koshi",
    district: "Morang",
    targetJoints: [],
    lastBleedDate: "2026-06-10",
    lastInfusionDate: "2026-06-10",
    annualBleedRateApprox: 1,
    physiotherapyEnrolled: false,
    disabilityCardHeld: false
  },
  {
    id: "pr-04",
    patientCode: "NHS-P-2026-004",
    diagnosis: "Hemophilia A",
    severity: "Severe (<1%)",
    factorBaselineLevel: "< 0.5%",
    inhibitorStatus: "High Responder (>=5 BU)",
    currentRegimen: "On-Demand",
    primaryTreatmentCentre: "TUTH Maharajgunj",
    province: "Bagmati",
    district: "Bhaktapur",
    targetJoints: ["Both Knees", "Right Shoulder"],
    lastBleedDate: "2026-08-25",
    lastInfusionDate: "2026-08-26",
    annualBleedRateApprox: 9,
    physiotherapyEnrolled: true,
    disabilityCardHeld: true
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "aud-001",
    timestamp: "2026-09-01 20:15:32 NPT",
    userId: "usr-medicaladmin",
    userName: "Dr. Bishal Subedi",
    role: "MEDICAL_ADMIN",
    action: "UPDATE_SUPPORT_REQUEST",
    entity: "SupportRequest",
    entityId: "NHS-SR-2026-0812",
    ipAddress: "103.10.28.45 (Kathmandu)",
    result: "SUCCESS",
    details: "Assigned urgent factor reservation at Bir Hospital Day Care."
  },
  {
    id: "aud-002",
    timestamp: "2026-09-01 18:30:10 NPT",
    userId: "usr-superadmin",
    userName: "Dr. Mukunda Sharma",
    role: "SUPER_ADMIN",
    action: "UPDATE_FACTOR_INVENTORY",
    entity: "FactorInventoryItem",
    entityId: "fi-1",
    ipAddress: "103.10.28.12 (Kathmandu)",
    result: "SUCCESS",
    details: "Updated Factor VIII inventory for Bir Hospital to 18,500 IU after WFH batch verification."
  },
  {
    id: "aud-003",
    timestamp: "2026-09-01 16:30:05 NPT",
    userId: "system",
    userName: "Payment Webhook",
    role: "PUBLIC_USER",
    action: "PROCESS_DONATION",
    entity: "DonationRecord",
    entityId: "don-003",
    ipAddress: "202.51.88.10 (Khalti Gateway)",
    result: "SUCCESS",
    details: "Processed NPR 10,000 donation for Child Education & Youth."
  },
  {
    id: "aud-004",
    timestamp: "2026-08-31 14:20:00 NPT",
    userId: "usr-contentadmin",
    userName: "Sita Adhikari",
    role: "CONTENT_ADMIN",
    action: "PUBLISH_NEWS",
    entity: "NewsArticle",
    entityId: "news-1",
    ipAddress: "103.10.28.15",
    result: "SUCCESS",
    details: "Published World Hemophilia Day policy dialogue article in bilingual format."
  }
];

export const provinceStats = [
  { province: "Koshi", patients: 124, centres: 2, coverage: "85%" },
  { province: "Madhesh", patients: 98, centres: 2, coverage: "70%" },
  { province: "Bagmati", patients: 382, centres: 4, coverage: "95%" },
  { province: "Gandaki", patients: 116, centres: 2, coverage: "80%" },
  { province: "Lumbini", patients: 142, centres: 2, coverage: "75%" },
  { province: "Karnali", patients: 46, centres: 1, coverage: "50%" },
  { province: "Sudurpashchim", patients: 68, centres: 1, coverage: "60%" }
];

export const diagnosisBreakdown = [
  { name: "Hemophilia A (Factor VIII)", value: 680, color: "#0F3A66" },
  { name: "Hemophilia B (Factor IX)", value: 165, color: "#DC2626" },
  { name: "Von Willebrand Disease (vWD)", value: 92, color: "#0D9488" },
  { name: "Rare Bleeding Disorders (VII, XI, XIII)", value: 39, color: "#D97706" }
];
