export interface NoticeItem {
  id: string;
  titleNp: string;
  titleEn: string;
  contentNp: string;
  contentEn: string;
  category: "आपतकालीन" | "सूचना" | "कार्यक्रम" | "प्रेस विज्ञप्ति" | "सेवा";
  publishDate: string;
  isUrgent: boolean;
  isActive: boolean;
  authorName?: string;
  attachmentUrl?: string;
  created_at: string;
  updated_at: string;
}

export interface VisionMissionData {
  visionNp: string;
  visionEn: string;
  missionNp: string;
  missionEn: string;
  coreValues: {
    id: string;
    titleNp: string;
    titleEn: string;
    descNp?: string;
    descEn?: string;
  }[];
  strategicObjectives: {
    id: string;
    number: number;
    titleNp: string;
    titleEn: string;
    descNp: string;
    descEn: string;
  }[];
}

export interface FeatureToggles {
  // Master features that Super Admin can turn ON or OFF
  aiChatbot: boolean;
  factorAvailabilityTracker: boolean;
  onlineDonations: boolean;
  elearningAcademy: boolean;
  onlineMembershipForm: boolean;
  emergencyAlertBanner: boolean;
  noticeBoardTicker: boolean;
  statisticsCounter: boolean;
  communityStoriesSection: boolean;
  treatmentCentresLocator: boolean;
}

export interface HeroContent {
  taglineBadgeNp: string;
  taglineBadgeEn: string;
  titleNp: string;
  titleEn: string;
  subtitleNp: string;
  subtitleEn: string;
  ctaSupportTextNp: string;
  ctaSupportTextEn: string;
  ctaLearnTextNp: string;
  ctaLearnTextEn: string;
  ctaDonateTextNp: string;
  ctaDonateTextEn: string;
}

export interface EmergencyContacts {
  headlineNp: string;
  headlineEn: string;
  hotline1: string;
  hotline2: string;
  birHospitalContact: string;
  disclaimerNp: string;
  disclaimerEn: string;
}

export interface OrgDetails {
  orgNameNp: string;
  orgNameEn: string;
  taglineNp: string;
  taglineEn: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  addressNp: string;
  addressEn: string;
  officeHoursNp: string;
  officeHoursEn: string;
  swcRegNo: string;
  panNo: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  swiftCode: string;
  esewaId: string;
}

export interface SiteStatistics {
  registeredPatients: number;
  activeMembers: number;
  treatmentCentresCount: number;
  provincesCovered: number;
  districtsReached: number;
  factorDistributedUnits?: string;
  hcpTrainedCount?: number;
}

export interface SiteContentData {
  features: FeatureToggles;
  visionMission: VisionMissionData;
  hero: HeroContent;
  emergency: EmergencyContacts;
  stats: SiteStatistics;
  orgDetails: OrgDetails;
  notices: NoticeItem[];
  last_updated?: string;
}

export type NoticeInput = Omit<NoticeItem, "id" | "created_at" | "updated_at">;
export type NoticeUpdateInput = Partial<Omit<NoticeItem, "id" | "created_at" | "updated_at">>;
