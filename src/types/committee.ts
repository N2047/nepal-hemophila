export interface Officer {
  id: string;
  position: string;
  name: string;
  address: string;
  phone: string;
  experience: string;
  photo?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  name: string;
  address: string;
  phone: string;
  experience: string;
  photo?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CommitteeData {
  officers: Officer[];
  members: Member[];
  last_updated?: string;
}

export type OfficerUpdateInput = Partial<Omit<Officer, "id" | "created_at" | "updated_at">>;
export type MemberInput = Omit<Member, "id" | "created_at" | "updated_at">;
export type MemberUpdateInput = Partial<Omit<Member, "id" | "created_at" | "updated_at">>;
