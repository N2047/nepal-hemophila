// ==============================================================================
// src/services/supabase/storageService.ts
// Supabase Storage Service for Image & File Uploads
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export type StorageBucket = 
  | 'site-images'
  | 'news-images'
  | 'event-images'
  | 'resource-files'
  | 'profile-images';

export const storageService = {
  /**
   * Upload a file to Supabase Storage with graceful fallback to /api/upload
   */
  async uploadFile(
    file: File,
    bucket: StorageBucket = 'site-images',
    folder: string = 'uploads'
  ): Promise<{ url: string | null; error?: string }> {
    // If Supabase is not configured, fall back to Next.js /api/upload route
    if (!isSupabaseConfigured()) {
      return uploadViaLocalApi(file);
    }

    const client = getSupabaseClient();
    if (!client) {
      return uploadViaLocalApi(file);
    }

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}_${sanitizedName}`;

      const { data, error } = await client.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.warn('Supabase storage upload error, attempting fallback:', error.message);
        return uploadViaLocalApi(file);
      }

      const { data: publicData } = client.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return { url: publicData.publicUrl };
    } catch (err: any) {
      console.error('Exception in Supabase upload, using fallback:', err);
      return uploadViaLocalApi(file);
    }
  }
};

async function uploadViaLocalApi(file: File): Promise<{ url: string | null; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      return { url: null, error: 'Upload failed' };
    }

    const json = await res.json();
    return { credentials: true, url: json.url || json.path || null } as any;
  } catch (err: any) {
    return { url: null, error: err.message };
  }
}
