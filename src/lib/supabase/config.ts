// ==============================================================================
// src/lib/supabase/config.ts
// Configuration & Environment Helpers for Supabase
// ==============================================================================

export const getSupabaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  );
};

export const getSupabaseAnonKey = (): string => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ''
  );
};

/**
 * Validates whether Supabase environment variables are provided and non-empty.
 * Allows the application to gracefully fall back to local seed/mock data when
 * Supabase is not configured yet or during transitional deployments.
 */
export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return Boolean(
    url &&
    key &&
    url.startsWith('http') &&
    !url.includes('placeholder') &&
    !key.includes('placeholder')
  );
};
