// ==============================================================================
// src/lib/supabase/admin.ts
// Privileged Server-Side Supabase Client (Service Role)
// STRICT SECURITY: Never bundle or execute in client-side code.
// ==============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { getSupabaseUrl } from './config';

let supabaseAdminInstance: SupabaseClient<Database> | null = null;

export const getSupabaseAdmin = (): SupabaseClient<Database> | null => {
  // Enforce server-side execution only
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: getSupabaseAdmin() cannot be called in client-side browser code.');
  }

  const url = getSupabaseUrl();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey || serviceKey.includes('placeholder')) {
    return null;
  }

  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient<Database>(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseAdminInstance;
};
