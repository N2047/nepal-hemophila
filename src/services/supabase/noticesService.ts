// ==============================================================================
// src/services/supabase/noticesService.ts
// Supabase Data Access Service for Official Announcements & Urgent Notices
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { NoticeItem, NoticeInput, NoticeUpdateInput } from '@/types/site-content';

export const noticesService = {
  /**
   * Fetch all active notices for public display
   */
  async getPublished(): Promise<NoticeItem[]> {
    const all = await this.getAllAdmin();
    return all.filter(n => n.isActive);
  },

  /**
   * Fetch all notices for admin management
   */
  async getAllAdmin(): Promise<NoticeItem[]> {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await (client.from('notices') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('published_at', { ascending: false });

      if (error || !data) {
        return [];
      }

      return data.map(mapDbToNotice);
    } catch (err) {
      console.warn('Error fetching notices from Supabase:', err);
      return [];
    }
  },

  /**
   * Create notice with optional image URL
   */
  async create(input: NoticeInput): Promise<NoticeItem | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const insertData = {
        title_en: input.titleEn || input.titleNp,
        title_ne: input.titleNp,
        content_en: input.contentEn || input.contentNp,
        content_ne: input.contentNp,
        notice_type: input.category || 'सूचना',
        priority: input.isUrgent ? 'Critical' : 'Medium',
        image_url: input.imageUrl || null,
        file_url: input.attachmentUrl || null,
        is_published: input.isActive ?? true,
        published_at: input.publishDate || new Date().toISOString(),
        target_audience: 'All',
      };

      const { data, error } = await (client.from('notices') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error inserting notice:', error);
        return null;
      }

      return mapDbToNotice(data);
    } catch (err) {
      console.error('Exception creating notice in Supabase:', err);
      return null;
    }
  },

  /**
   * Update notice
   */
  async update(id: string, input: NoticeUpdateInput): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (input.titleNp) dbUpdates.title_ne = input.titleNp;
      if (input.titleEn) dbUpdates.title_en = input.titleEn;
      if (input.contentNp) dbUpdates.content_ne = input.contentNp;
      if (input.contentEn) dbUpdates.content_en = input.contentEn;
      if (input.category) dbUpdates.notice_type = input.category;
      if (input.isUrgent !== undefined) dbUpdates.priority = input.isUrgent ? 'Critical' : 'Medium';
      if (input.imageUrl !== undefined) dbUpdates.image_url = input.imageUrl;
      if (input.attachmentUrl !== undefined) dbUpdates.file_url = input.attachmentUrl;
      if (input.isActive !== undefined) dbUpdates.is_published = input.isActive;
      if (input.publishDate) dbUpdates.published_at = input.publishDate;

      const { error } = await (client.from('notices') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating notice in Supabase:', err);
      return false;
    }
  },

  /**
   * Soft delete notice
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('notices') as any)
        .update({ is_deleted: true, is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting notice in Supabase:', err);
      return false;
    }
  }
};

function mapDbToNotice(row: any): NoticeItem {
  return {
    id: row.id,
    titleNp: row.title_ne,
    titleEn: row.title_en,
    contentNp: row.content_ne,
    contentEn: row.content_en,
    category: mapNoticeCategory(row.notice_type),
    publishDate: row.published_at,
    isUrgent: row.priority === 'Critical' || row.priority === 'High',
    isActive: row.is_published,
    imageUrl: row.image_url || undefined,
    attachmentUrl: row.file_url || undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapNoticeCategory(cat: string): "आपतकालीन" | "सूचना" | "कार्यक्रम" | "प्रेस विज्ञप्ति" | "सेवा" {
  switch (cat) {
    case 'Emergency':
    case 'आपतकालीन':
      return 'आपतकालीन';
    case 'Event':
    case 'कार्यक्रम':
      return 'कार्यक्रम';
    case 'Press':
    case 'प्रेस विज्ञप्ति':
      return 'प्रेस विज्ञप्ति';
    case 'Service':
    case 'सेवा':
      return 'सेवा';
    default:
      return 'सूचना';
  }
}
