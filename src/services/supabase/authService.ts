// ==============================================================================
// src/services/supabase/authService.ts
// Supabase Authentication & Profile Management
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { User, Role } from '@/types';

export interface AuthSessionResponse {
  user: User | null;
  session: any | null;
  error?: string;
}

export const authService = {
  /**
   * Log in user with email and password via Supabase Auth
   */
  async login(email: string, password: string): Promise<AuthSessionResponse> {
    if (!isSupabaseConfigured()) {
      return { user: null, session: null, error: 'Supabase is not configured' };
    }

    const client = getSupabaseClient();
    if (!client) {
      return { user: null, session: null, error: 'Failed to initialize Supabase client' };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return { user: null, session: null, error: error?.message || 'Login failed' };
      }

      // Fetch profile associated with this user
      const { data: profile } = await (client.from('profiles') as any)
        .select('*')
        .eq('id', data.user.id)
        .single();

      const userRole: Role = mapDbRoleToAppRole(profile?.role || 'viewer');

      const appUser: User = {
        id: data.user.id,
        name: profile?.full_name || data.user.email?.split('@')[0] || 'User',
        email: data.user.email || '',
        role: userRole,
        phone: profile?.phone || undefined,
        hospitalAffiliation: profile?.hospital_affiliation || undefined,
        avatar: profile?.avatar_url || undefined,
      };

      return { user: appUser, session: data.session };
    } catch (err: any) {
      return { user: null, session: null, error: err?.message || 'Unexpected login error' };
    }
  },

  /**
   * Log out the current user
   */
  async logout(): Promise<{ error?: string }> {
    if (!isSupabaseConfigured()) return {};
    const client = getSupabaseClient();
    if (!client) return {};

    try {
      const { error } = await client.auth.signOut();
      if (error) return { error: error.message };
      return {};
    } catch (err: any) {
      return { error: err.message };
    }
  },

  /**
   * Request password reset email
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is not configured' };
    }
    const client = getSupabaseClient();
    if (!client) return { success: false, error: 'Client unavailable' };

    try {
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Get currently active session and user
   */
  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured()) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data: { session } } = await client.auth.getSession();
      if (!session || !session.user) return null;

      const { data: profile } = await (client.from('profiles') as any)
        .select('*')
        .eq('id', session.user.id)
        .single();

      return {
        id: session.user.id,
        name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        role: mapDbRoleToAppRole(profile?.role || 'viewer'),
        phone: profile?.phone || undefined,
        hospitalAffiliation: profile?.hospital_affiliation || undefined,
        avatar: profile?.avatar_url || undefined,
      };
    } catch {
      return null;
    }
  }
};

function mapDbRoleToAppRole(dbRole: string): Role {
  switch (dbRole) {
    case 'super_admin':
      return 'SUPER_ADMIN';
    case 'admin':
      return 'SUPER_ADMIN';
    case 'editor':
      return 'CONTENT_ADMIN';
    case 'provincial_admin':
      return 'PROVINCIAL_ADMIN';
    case 'healthcare_professional':
      return 'HEALTHCARE_PRO';
    case 'member':
      return 'MEMBER';
    default:
      return 'PUBLIC_USER';
  }
}
