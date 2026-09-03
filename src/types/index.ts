export type Language = "en" | "np";

export type Role = 
  | "SUPER_ADMIN" 
  | "CONTENT_ADMIN" 
  | "MEDICAL_ADMIN" 
  | "PROVINCIAL_ADMIN" 
  | "FINANCE_ADMIN" 
  | "HEALTHCARE_PRO" 
  | "MEMBER" 
  | "PATIENT" 
  | "PUBLIC_USER";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  province?: string;
  hospitalAffiliation?: string;
  memberId?: string;
  patientId?: string;
  phone?: string;
  avatar?: string;
}

export type ProvinceName = 
  | "Koshi" 
  | "Madhesh" 
  | "Bagmati" 
  | "Gandaki" 
  | "Lumbini" 
  | "Karnali" 
  | "Sudurpashchim";

export interface LocalizedString {
  en: string;
  np: string;
}

export interface TreatmentCentre {
  id: string;
  name: LocalizedString;
  hospitalType: "National Referral" | "Provincial Teaching" | "Regional Care" | "Community Centre";
  province: ProvinceName;
  district: string;
  city: string;
  address: LocalizedString;
  phone: string;
  emergencyPhone: string;
  email: string;
  hematologistInCharge: LocalizedString;
  services: string[];
  hasFactorStorage: boolean;
  has24Emergency: boolean;
  hasPhysiotherapy: boolean;
  hasCoagulationLab: boolean;
  latitude: number;
  longitude: number;
  directions: LocalizedString;
  isOfficialPartner: boolean;
}

export type FactorAvailabilityStatus = 
  | "Available" 
  | "Limited" 
  | "Contact Hospital" 
  | "Not Available" 
  | "Information Pending";

export interface FactorInventoryItem {
  id: string;
  centreId: string;
  hospitalName: LocalizedString;
  province: ProvinceName;
  factorType: "Factor VIII" | "Factor IX" | "FEIBA / APCC" | "Emicizumab" | "vWF Concentrate" | "Cryoprecipitate";
  status: FactorAvailabilityStatus;
  availableUnitsApprox?: string;
  lastUpdated: string;
  updatedByRole: string;
  contactNotes: LocalizedString;
  verificationStatus: "Verified" | "Reported" | "Pending";
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  category: "Society News" | "Medical Updates" | "Patient Stories" | "Advocacy" | "Press Releases";
  tags: string[];
  author: LocalizedString;
  publishedDate: string;
  featuredImage: string;
  isFeatured?: boolean;
  isStoryConsentVerified?: boolean;
  isAnonymousStory?: boolean;
  readTime: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  endDate?: string;
  time: string;
  location: LocalizedString;
  isOnline: boolean;
  onlineLink?: string;
  category: "World Hemophilia Day" | "Conference" | "Workshop" | "Youth Camp" | "CME Training" | "Webinar";
  organizer: LocalizedString;
  image: string;
  registrationOpen: boolean;
  registrationDeadline: string;
  attendeesCount: number;
  documents?: { title: LocalizedString; url: string; size: string }[];
}

export interface ResourceItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category: "Guidelines" | "Reports" | "Publications" | "Brochures" | "Fact Sheets" | "Posters" | "Forms" | "Research Papers" | "E-Learning";
  audience: "Patients & Families" | "Healthcare Professionals" | "General Public" | "Policymakers" | "Researchers";
  language: "Bilingual" | "English" | "Nepali";
  year: number;
  fileType: "PDF" | "DOCX" | "XLSX" | "PPTX" | "Video" | "External Link";
  fileUrl: string;
  fileSize: string;
  downloadCount: number;
  thumbnail: string;
  author: LocalizedString;
  publisher: LocalizedString;
}

export interface MembershipApplication {
  id: string;
  applicationNumber: string;
  fullName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  conditionType: "Hemophilia A" | "Hemophilia B" | "vWD" | "Other Bleeding Disorder" | "Carrier" | "Caregiver / General Member";
  severity?: "Severe (<1%)" | "Moderate (1-5%)" | "Mild (5-40%)" | "Unknown";
  province: ProvinceName;
  district: string;
  municipality: string;
  wardNo: string;
  address: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  status: "Submitted" | "Under Review" | "Approved" | "Rejected" | "More Information Required";
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  membershipId?: string;
}

export interface PatientRegistryRecord {
  id: string;
  patientCode: string; // e.g. NHS-P-2026-048 (Protected Code)
  diagnosis: "Hemophilia A" | "Hemophilia B" | "Von Willebrand Disease" | "Factor VII Deficiency" | "Factor XIII Deficiency";
  severity: "Severe (<1%)" | "Moderate (1-5%)" | "Mild (5-40%)";
  factorBaselineLevel: string;
  inhibitorStatus: "Negative" | "Low Responder (<5 BU)" | "High Responder (>=5 BU)" | "Not Tested";
  currentRegimen: "On-Demand" | "Low-Dose Prophylaxis" | "Standard Prophylaxis" | "Emicizumab";
  primaryTreatmentCentre: string;
  province: ProvinceName;
  district: string;
  targetJoints: string[];
  lastBleedDate: string;
  lastInfusionDate: string;
  annualBleedRateApprox: number;
  physiotherapyEnrolled: boolean;
  disabilityCardHeld: boolean;
}

export interface SupportRequest {
  id: string;
  trackingNumber: string;
  requesterName: string;
  isAnonymous: boolean;
  phone: string;
  email?: string;
  province: ProvinceName;
  hospitalNear?: string;
  requestType: "Emergency Factor Need" | "Medical Advice Referral" | "Physiotherapy Booking" | "Psychological Counselling" | "Disability Card Support" | "Travel Assistance";
  urgency: "Emergency (Immediate)" | "Urgent (<24h)" | "Standard";
  description: string;
  status: "New" | "In Progress" | "Resolved" | "Archived";
  assignedStaff?: string;
  createdAt: string;
  updatedAt: string;
  resolutionNotes?: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPanOrCitizenship?: string;
  isAnonymous: boolean;
  amount: number;
  currency: "NPR" | "USD";
  category: "General Support" | "Emergency Factor Fund" | "Patient Treatment & Care" | "Physiotherapy & Joint Rehab" | "Child Education & Youth" | "World Hemophilia Day";
  donationType: "One-time" | "Monthly";
  paymentMethod: "eSewa" | "Khalti" | "Fonepay QR" | "Bank Transfer" | "International Card";
  paymentStatus: "Completed" | "Pending Verification" | "Failed";
  transactionReference: string;
  createdAt: string;
  isReceiptGenerated: boolean;
}

export interface ELearningCourse {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  targetAudience: "Patients & Families" | "Community Health Workers" | "Nurses & Medical Students" | "First Responders";
  durationMinutes: number;
  modulesCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  coverImage: string;
  modules: {
    id: string;
    title: LocalizedString;
    content: LocalizedString;
    duration: string;
    videoUrl?: string;
    bulletPoints: LocalizedString[];
  }[];
  quiz: {
    question: LocalizedString;
    options: LocalizedString[];
    correctIndex: number;
    explanation: LocalizedString;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: Role;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  result: "SUCCESS" | "DENIED" | "WARNING";
  details: string;
}
