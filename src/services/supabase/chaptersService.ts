// ==============================================================================
// src/services/supabase/chaptersService.ts
// Supabase Data Access Service for Provincial Chapters
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { ProvincialChapter } from '@/types/cms';

export const chaptersService = {
  /**
   * Fetch all provincial chapters
   */
  async getAll(): Promise<ProvincialChapter[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await (client.from('provincial_chapters') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map(mapDbToChapter);
    } catch (err) {
      console.warn('Error fetching provincial chapters from Supabase:', err);
      return [];
    }
  },

  /**
   * Create new provincial chapter
   */
  async create(chapter: Partial<ProvincialChapter>): Promise<ProvincialChapter | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const insertData = {
        chapter_name: chapter.provinceNameEn || 'Provincial Chapter',
        chairperson: chapter.coordinatorNameEn || null,
        contact_person: chapter.coordinatorNameNp || null,
        phone: chapter.phone || null,
        email: chapter.email || null,
        address: chapter.addressEn || null,
        description_en: chapter.servicesEn || null,
        description_ne: chapter.servicesNp || null,
        status: (chapter.status as string) || 'Active',
        display_order: chapter.display_order || 99,
      };

      const { data, error } = await (client.from('provincial_chapters') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) return null;
      return mapDbToChapter(data);
    } catch (err) {
      console.error('Exception creating provincial chapter:', err);
      return null;
    }
  },

  /**
   * Update existing provincial chapter
   */
  async update(id: string, updates: Partial<ProvincialChapter>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.provinceNameEn) dbUpdates.chapter_name = updates.provinceNameEn;
      if (updates.coordinatorNameEn) dbUpdates.chairperson = updates.coordinatorNameEn;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.addressEn) dbUpdates.address = updates.addressEn;
      if (updates.servicesEn) dbUpdates.description_en = updates.servicesEn;
      if (updates.servicesNp) dbUpdates.description_ne = updates.servicesNp;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('provincial_chapters') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating provincial chapter:', err);
      return false;
    }
  },

  /**
   * Soft delete chapter
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('provincial_chapters') as any)
        .update({ is_deleted: true, status: 'Archived', updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting chapter:', err);
      return false;
    }
  }
};

function mapDbToChapter(row: any): ProvincialChapter {
  return {
    id: row.id,
    provinceNameNp: row.description_ne ? row.chapter_name : row.chapter_name,
    provinceNameEn: row.chapter_name,
    cityNp: row.address || '',
    cityEn: row.address || '',
    coordinatorNameNp: row.contact_person || row.chairperson || 'संयोजक',
    coordinatorNameEn: row.chairperson || 'Coordinator',
    phone: row.phone || '',
    email: row.email || '',
    addressNp: row.address || '',
    addressEn: row.address || '',
    partnerHospitalNp: 'प्रादेशिक अस्पताल',
    partnerHospitalEn: 'Provincial Referral Hospital',
    servicesNp: row.description_ne || '',
    servicesEn: row.description_en || '',
    display_order: row.display_order ?? 1,
    status: (row.status as any) || 'Published',
    is_deleted: row.is_deleted ?? false,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
