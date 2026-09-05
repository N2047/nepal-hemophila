// ==============================================================================
// src/services/supabase/postsService.ts
// Supabase Data Access Service for News Articles & Patient Stories
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { CmsNewsArticle } from '@/types/cms';
import { newsArticlesData } from '@/data/mockData';

export const postsService = {
  /**
   * Fetch published posts for public news page
   */
  async getPublished(category?: string): Promise<CmsNewsArticle[]> {
    const all = await this.getAllAdmin();
    return all.filter(p => !p.is_deleted && p.status === 'Published');
  },

  /**
   * Fetch all posts for CMS management
   */
  async getAllAdmin(): Promise<CmsNewsArticle[]> {
    if (!isSupabaseConfigured()) {
      return defaultFallbackPosts();
    }

    const client = getSupabaseClient();
    if (!client) return defaultFallbackPosts();

    try {
      const { data, error } = await (client.from('posts') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return defaultFallbackPosts();
      }

      return data.map(mapDbToCmsPost);
    } catch (err) {
      console.warn('Error fetching posts from Supabase, using fallback:', err);
      return defaultFallbackPosts();
    }
  },

  /**
   * Create a new article or story
   */
  async create(article: Partial<CmsNewsArticle>): Promise<CmsNewsArticle | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const slug = (article.title?.en || 'article')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + `-${Date.now().toString().slice(-4)}`;

      const insertData = {
        title_en: article.title?.en || 'Untitled Article',
        title_ne: article.title?.np || article.title?.en || 'शीर्षक विहीन',
        slug: article.slug || slug,
        excerpt_en: article.summary?.en || '',
        excerpt_ne: article.summary?.np || '',
        content_en: article.content?.en || '',
        content_ne: article.content?.np || '',
        featured_image: article.featuredImage || null,
        category: (article.category as string) || 'Society News',
        author: article.author?.en || 'NHS Secretariat',
        read_time: article.readTime || '4 min read',
        tags: article.tags || ['Hemophilia', 'Nepal'],
        is_featured: article.isFeatured ?? false,
        is_published: article.status === 'Published',
        consent_verified: article.isStoryConsentVerified ?? true,
        display_order: article.display_order || 99,
        published_at: article.publishedDate || new Date().toISOString(),
      };

      const { data, error } = await (client.from('posts') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error inserting post:', error);
        return null;
      }

      return mapDbToCmsPost(data);
    } catch (err) {
      console.error('Exception creating post in Supabase:', err);
      return null;
    }
  },

  /**
   * Update an existing article
   */
  async update(id: string, updates: Partial<CmsNewsArticle>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.title?.en) dbUpdates.title_en = updates.title.en;
      if (updates.title?.np) dbUpdates.title_ne = updates.title.np;
      if (updates.summary?.en) dbUpdates.excerpt_en = updates.summary.en;
      if (updates.summary?.np) dbUpdates.excerpt_ne = updates.summary.np;
      if (updates.content?.en) dbUpdates.content_en = updates.content.en;
      if (updates.content?.np) dbUpdates.content_ne = updates.content.np;
      if (updates.featuredImage) dbUpdates.featured_image = updates.featuredImage;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.status) {
        dbUpdates.status = updates.status;
        dbUpdates.is_published = updates.status === 'Published';
      }
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('posts') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating post in Supabase:', err);
      return false;
    }
  },

  /**
   * Soft-delete an article
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('posts') as any)
        .update({ is_deleted: true, is_published: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting post from Supabase:', err);
      return false;
    }
  }
};

function defaultFallbackPosts(): CmsNewsArticle[] {
  return newsArticlesData.map((art, idx) => ({
    ...art,
    status: 'Published' as const,
    is_deleted: false,
    display_order: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function mapDbToCmsPost(row: any): CmsNewsArticle {
  return {
    id: row.id,
    slug: row.slug || `post-${row.id}`,
    title: {
      en: row.title_en,
      np: row.title_ne || row.title_en,
    },
    summary: {
      en: row.excerpt_en || '',
      np: row.excerpt_ne || row.excerpt_en || '',
    },
    content: {
      en: row.content_en || '',
      np: row.content_ne || row.content_en || '',
    },
    category: (row.category as any) || 'Society News',
    tags: Array.isArray(row.tags) ? row.tags : ['Hemophilia'],
    author: {
      en: row.author || 'NHS Secretariat',
      np: row.author || 'एनएचएस सचिवालय',
    },
    publishedDate: row.published_at || row.created_at,
    featuredImage: row.featured_image || '/images/hero-bleed-awareness.jpg',
    isFeatured: row.is_featured ?? false,
    isStoryConsentVerified: row.consent_verified ?? true,
    isAnonymousStory: false,
    readTime: row.read_time || '4 min read',
    status: row.is_published ? 'Published' : 'Draft',
    is_deleted: row.is_deleted ?? false,
    display_order: row.display_order ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
