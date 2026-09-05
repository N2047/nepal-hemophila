// ==============================================================================
// src/services/supabase/resourcesService.ts
// Supabase Data Access Service for Guidelines, Clinical Manuals & Downloads
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { CmsResourceItem } from '@/types/cms';
import { resourcesData } from '@/data/mockData';

export const resourcesService = {
  /**
   * Fetch published resources for public downloads
   */
  async getPublished(category?: string): Promise<CmsResourceItem[]> {
    const all = await this.getAllAdmin();
    return all.filter(r => !r.is_deleted && r.status === 'Published');
  },

  /**
   * Fetch all resources for CMS management
   */
  async getAllAdmin(): Promise<CmsResourceItem[]> {
    if (!isSupabaseConfigured()) {
      return defaultFallbackResources();
    }

    const client = getSupabaseClient();
    if (!client) return defaultFallbackResources();

    try {
      const { data, error } = await client
        .from('resources')
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return defaultFallbackResources();
      }

      return data.map(mapDbToCmsResource);
    } catch (err) {
      console.warn('Error fetching resources from Supabase, using fallback:', err);
      return defaultFallbackResources();
    }
  },

  /**
   * Create a new resource item
   */
  async create(resource: Partial<CmsResourceItem>): Promise<CmsResourceItem | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const fileFmt = (resource as any).fileFormat || (resource as any).fileType || 'PDF';
      const insertData = {
        title_en: resource.title?.en || 'Untitled Document',
        title_ne: resource.title?.np || resource.title?.en || 'कागजात',
        description_en: resource.description?.en || '',
        description_ne: resource.description?.np || '',
        category: (resource.category as string) || 'Clinical Guidelines',
        resource_type: fileFmt,
        file_url: resource.fileUrl || resource.downloadUrl || null,
        file_size: resource.fileSize || '1.5 MB',
        file_format: fileFmt,
        author: resource.author?.en || 'Nepal Hemophilia Society',
        is_published: resource.status === 'Published',
        display_order: resource.display_order || 99,
      };

      const { data, error } = await (client.from('resources') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error inserting resource:', error);
        return null;
      }

      return mapDbToCmsResource(data);
    } catch (err) {
      console.error('Exception creating resource in Supabase:', err);
      return null;
    }
  },

  /**
   * Update an existing resource
   */
  async update(id: string, updates: Partial<CmsResourceItem>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.title?.en) dbUpdates.title_en = updates.title.en;
      if (updates.title?.np) dbUpdates.title_ne = updates.title.np;
      if (updates.description?.en) dbUpdates.description_en = updates.description.en;
      if (updates.description?.np) dbUpdates.description_ne = updates.description.np;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.fileUrl || updates.downloadUrl) {
        dbUpdates.file_url = updates.fileUrl || updates.downloadUrl;
      }
      if (updates.status) {
        dbUpdates.status = updates.status;
        dbUpdates.is_published = updates.status === 'Published';
      }
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('resources') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating resource in Supabase:', err);
      return false;
    }
  },

  /**
   * Soft-delete a resource
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('resources') as any)
        .update({ is_deleted: true, is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting resource from Supabase:', err);
      return false;
    }
  },

  /**
   * Track downloads using Supabase RPC
   */
  async recordDownload(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (!client) return;

    try {
      await (client.rpc as any)('increment_resource_download', { res_id: id });
    } catch (e) {
      // Non-critical metric
    }
  }
};

function defaultFallbackResources(): CmsResourceItem[] {
  return resourcesData.map((res, idx) => ({
    ...res,
    status: 'Published' as const,
    is_deleted: false,
    display_order: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function mapDbToCmsResource(row: any): CmsResourceItem {
  return {
    id: row.id,
    title: {
      en: row.title_en,
      np: row.title_ne || row.title_en,
    },
    description: {
      en: row.description_en || '',
      np: row.description_ne || row.description_en || '',
    },
    category: 'Guidelines',
    fileType: 'PDF',
    fileSize: row.file_size || '1.5 MB',
    language: 'Bilingual',
    audience: 'Healthcare Professionals',
    year: 2026,
    thumbnail: row.thumbnail_url || '/images/resources/guidelines.jpg',
    author: {
      en: row.author || 'Nepal Hemophilia Society',
      np: row.author || 'नेपाल हेमोफिलिया सोसाइटी',
    },
    publisher: {
      en: 'Nepal Hemophilia Society',
      np: 'नेपाल हेमोफिलिया सोसाइटी',
    },
    fileUrl: row.file_url || '/downloads/hemophilia-management-nepal.pdf',
    downloadUrl: row.file_url || '/downloads/hemophilia-management-nepal.pdf',
    downloadCount: row.download_count || 0,
    status: row.is_published ? 'Published' : 'Draft',
    is_deleted: row.is_deleted ?? false,
    display_order: row.display_order ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
