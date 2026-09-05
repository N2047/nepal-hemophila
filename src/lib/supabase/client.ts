// ==============================================================================
// src/lib/supabase/client.ts
// Browser Supabase Client Singleton with TypeScript Schema
// ==============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { getSupabaseUrl, getSupabaseAnonKey, isSupabaseConfigured } from './config';

let supabaseClientInstance: SupabaseClient<Database> | null = null;

/**
 * Returns a typed singleton Supabase client for client-side React components.
 * Returns null if Supabase environment variables have not been configured yet.
 */
export const getSupabaseClient = (): SupabaseClient<Database> | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseClientInstance) {
    const url = getSupabaseUrl();
    const anonKey = getSupabaseAnonKey();

    supabaseClientInstance = createClient<Database>(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  }

  return supabaseClientInstance;
};

// Export convenience alias
export const supabase = getSupabaseClient();
