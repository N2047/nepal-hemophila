// ==============================================================================
// src/services/supabase/eventsService.ts
// Supabase Data Access Service for Events & Workshops
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { CmsEventItem } from '@/types/cms';
import { eventsData } from '@/data/mockData';

export const eventsService = {
  /**
   * Fetch published events for public site
   */
  async getPublished(): Promise<CmsEventItem[]> {
    const all = await this.getAllAdmin();
    return all.filter(e => !e.is_deleted && e.status === 'Published');
  },

  /**
   * Fetch all events for CMS management
   */
  async getAllAdmin(): Promise<CmsEventItem[]> {
    if (!isSupabaseConfigured()) {
      return defaultFallbackEvents();
    }

    const client = getSupabaseClient();
    if (!client) return defaultFallbackEvents();

    try {
      const { data, error } = await (client.from('events') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return defaultFallbackEvents();
      }

      return data.map(mapDbToCmsEvent);
    } catch (err) {
      console.warn('Error fetching events from Supabase, using fallback:', err);
      return defaultFallbackEvents();
    }
  },

  /**
   * Create a new event
   */
  async create(event: Partial<CmsEventItem>): Promise<CmsEventItem | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const insertData = {
        title_en: event.title?.en || 'Untitled Event',
        title_ne: event.title?.np || event.title?.en || 'शीर्षक विहीन कार्यक्रम',
        description_en: event.description?.en || '',
        description_ne: event.description?.np || '',
        event_type: event.category || 'Workshop',
        start_date: event.date || new Date().toISOString().split('T')[0],
        location_en: event.location?.en || 'Kathmandu',
        location_ne: event.location?.np || 'काठमाडौं',
        organizer: event.organizer?.en || 'Nepal Hemophilia Society',
        registration_enabled: event.registrationOpen ?? true,
        registration_url: event.onlineLink || null,
        capacity: event.maxCapacity || 100,
        image_url: event.image || event.featuredImage || null,
        is_published: event.status === 'Published',
        display_order: event.display_order || 99,
      };

      const { data, error } = await (client.from('events') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error inserting event:', error);
        return null;
      }

      return mapDbToCmsEvent(data);
    } catch (err) {
      console.error('Exception creating event in Supabase:', err);
      return null;
    }
  },

  /**
   * Update an existing event
   */
  async update(id: string, updates: Partial<CmsEventItem>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.title?.en) dbUpdates.title_en = updates.title.en;
      if (updates.title?.np) dbUpdates.title_ne = updates.title.np;
      if (updates.description?.en) dbUpdates.description_en = updates.description.en;
      if (updates.description?.np) dbUpdates.description_ne = updates.description.np;
      if (updates.category) dbUpdates.event_type = updates.category;
      if (updates.date) dbUpdates.start_date = updates.date;
      if (updates.location?.en) dbUpdates.location_en = updates.location.en;
      if (updates.location?.np) dbUpdates.location_ne = updates.location.np;
      if (updates.status) {
        dbUpdates.status = updates.status;
        dbUpdates.is_published = updates.status === 'Published';
      }
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('events') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating event in Supabase:', err);
      return false;
    }
  },

  /**
   * Soft-delete an event
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('events') as any)
        .update({ is_deleted: true, is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting event from Supabase:', err);
      return false;
    }
  }
};

function defaultFallbackEvents(): CmsEventItem[] {
  return eventsData.map((evt, idx) => ({
    ...evt,
    status: 'Published' as const,
    is_deleted: false,
    display_order: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function mapDbToCmsEvent(row: any): CmsEventItem {
  return {
    id: row.id,
    slug: `event-${row.id}`,
    title: {
      en: row.title_en,
      np: row.title_ne || row.title_en,
    },
    description: {
      en: row.description_en || '',
      np: row.description_ne || row.description_en || '',
    },
    date: row.start_date,
    time: '10:00 AM - 4:00 PM',
    location: {
      en: row.location_en || 'Kathmandu',
      np: row.location_ne || row.location_en || 'काठमाडौं',
    },
    isOnline: false,
    category: (row.event_type as any) || 'Workshop',
    organizer: {
      en: row.organizer || 'Nepal Hemophilia Society',
      np: row.organizer || 'नेपाल हेमोफिलिया सोसाइटी',
    },
    image: row.image_url || '/images/events/workshop.jpg',
    featuredImage: row.image_url || '/images/events/workshop.jpg',
    registrationOpen: row.registration_enabled ?? true,
    registrationDeadline: row.start_date,
    attendeesCount: 45,
    maxCapacity: row.capacity || 100,
    status: row.is_published ? 'Published' : 'Draft',
    is_deleted: row.is_deleted ?? false,
    display_order: row.display_order ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
