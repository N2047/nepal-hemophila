import { 
  TreatmentCentre, 
  NewsArticle, 
  EventItem, 
  ResourceItem, 
  FactorInventoryItem 
} from "./index";

export type ContentStatus = "Published" | "Draft" | "Archived" | "Hidden";

export interface ProvincialChapter {
  id: string;
  provinceNameNp: string;
  provinceNameEn: string;
  cityNp: string;
  cityEn: string;
  coordinatorNameNp: string;
  coordinatorNameEn: string;
  phone: string;
  email: string;
  addressNp: string;
  addressEn: string;
  partnerHospitalNp: string;
  partnerHospitalEn: string;
  servicesNp?: string;
  servicesEn?: string;
  display_order: number;
  status: ContentStatus;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicalAdvisor {
  id: string;
  nameNp: string;
  nameEn: string;
  titleNp: string;
  titleEn: string;
  institutionNp: string;
  institutionEn: string;
  photo?: string;
  bioNp?: string;
  bioEn?: string;
  display_order: number;
  status: ContentStatus;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CmsNewsArticle extends NewsArticle {
  status?: ContentStatus;
  is_deleted?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CmsEventItem extends EventItem {
  featuredImage?: string;
  maxCapacity?: number;
  status?: ContentStatus;
  is_deleted?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CmsResourceItem extends ResourceItem {
  downloadUrl?: string;
  status?: ContentStatus;
  is_deleted?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CmsTreatmentCentre extends TreatmentCentre {
  status?: ContentStatus;
  is_deleted?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GlobalWebsiteSettings {
  websiteNameNp: string;
  websiteNameEn: string;
  taglineNp: string;
  taglineEn: string;
  logoUrl: string;
  faviconUrl: string;
  primaryPhone: string;
  emergencyPhone: string;
  email: string;
  officeAddressNp: string;
  officeAddressEn: string;
  officeHoursNp: string;
  officeHoursEn: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  footerDisclaimerNp: string;
  footerDisclaimerEn: string;
  copyrightNp: string;
  copyrightEn: string;
  swcRegNo: string;
  panNo: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  swiftCode: string;
  esewaId: string;
  qrCodeUrl?: string;
  // Dynamic aliases
  addressNp?: string;
  addressEn?: string;
  contactPhone?: string;
  contactEmail?: string;
  emergencyHotline?: string;
  swcAffiliationNo?: string;
  panNumber?: string;
}

export interface CmsDatabase {
  news: CmsNewsArticle[];
  events: CmsEventItem[];
  resources: CmsResourceItem[];
  centres: CmsTreatmentCentre[];
  chapters: ProvincialChapter[];
  advisors: MedicalAdvisor[];
  settings: GlobalWebsiteSettings;
  last_updated: string;
}
