// ==============================================================================
// src/services/supabase/committeeService.ts
// Supabase Data Access Service for Executive Committee & Medical Advisors
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export interface CommitteeMemberItem {
  id: string;
  nameNp: string;
  nameEn: string;
  designationNp: string;
  designationEn: string;
  category: 'officers' | 'members' | 'advisors';
  phone: string;
  email: string;
  addressNp: string;
  addressEn: string;
  photo?: string;
  bioNp?: string;
  bioEn?: string;
  display_order: number;
  status: string;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

export const committeeService = {
  /**
   * Fetch all committee members
   */
  async getAll(): Promise<CommitteeMemberItem[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await (client.from('committee_members') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map(mapDbToMember);
    } catch (err) {
      console.warn('Error fetching committee members from Supabase:', err);
      return [];
    }
  },

  /**
   * Create committee member
   */
  async create(member: Partial<CommitteeMemberItem>): Promise<CommitteeMemberItem | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const insertData = {
        full_name_en: member.nameEn || 'Member',
        full_name_ne: member.nameNp || member.nameEn || 'सदस्य',
        position_en: member.designationEn || 'Member',
        position_ne: member.designationNp || member.designationEn || 'सदस्य',
        category: member.category || 'members',
        email: member.email || null,
        phone: member.phone || null,
        address_en: member.addressEn || null,
        address_ne: member.addressNp || null,
        photo_url: member.photo || null,
        bio_en: member.bioEn || null,
        bio_ne: member.bioNp || null,
        display_order: member.display_order || 99,
        status: (member.status as string) || 'Published',
      };

      const { data, error } = await (client.from('committee_members') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) return null;
      return mapDbToMember(data);
    } catch (err) {
      console.error('Exception creating committee member:', err);
      return null;
    }
  },

  /**
   * Update committee member
   */
  async update(id: string, updates: Partial<CommitteeMemberItem>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.nameEn) dbUpdates.full_name_en = updates.nameEn;
      if (updates.nameNp) dbUpdates.full_name_ne = updates.nameNp;
      if (updates.designationEn) dbUpdates.position_en = updates.designationEn;
      if (updates.designationNp) dbUpdates.position_ne = updates.designationNp;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.addressEn) dbUpdates.address_en = updates.addressEn;
      if (updates.addressNp) dbUpdates.address_ne = updates.addressNp;
      if (updates.photo) dbUpdates.photo_url = updates.photo;
      if (updates.bioEn) dbUpdates.bio_en = updates.bioEn;
      if (updates.bioNp) dbUpdates.bio_ne = updates.bioNp;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('committee_members') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating committee member:', err);
      return false;
    }
  },

  /**
   * Soft delete member
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('committee_members') as any)
        .update({ is_deleted: true, status: 'Archived', updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting committee member:', err);
      return false;
    }
  }
};

function mapDbToMember(row: any): CommitteeMemberItem {
  return {
    id: row.id,
    nameNp: row.full_name_ne,
    nameEn: row.full_name_en,
    designationNp: row.position_ne,
    designationEn: row.position_en,
    category: (row.category as any) || 'members',
    phone: row.phone || '',
    email: row.email || '',
    addressNp: row.address_ne || '',
    addressEn: row.address_en || '',
    photo: row.photo_url || '',
    bioNp: row.bio_ne || '',
    bioEn: row.bio_en || '',
    display_order: row.display_order ?? 1,
    status: (row.status as any) || 'Published',
    is_deleted: row.is_deleted ?? false,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
