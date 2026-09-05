// ==============================================================================
// src/services/supabase/supportService.ts
// Supabase Data Access Service for Patient Support & Emergency Requests
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { SupportRequest } from '@/types';
import { initialSupportRequests } from '@/data/mockData';

export const supportService = {
  /**
   * Submit support or emergency request (Public)
   */
  async submit(request: Partial<SupportRequest>): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: true };
    }

    try {
      const { error } = await (client.from('support_requests') as any)
        .insert({
          request_type: request.requestType || 'Emergency Factor Need',
          name: request.requesterName || 'Citizen',
          phone: request.phone || '',
          email: request.email || null,
          district: request.hospitalNear || null,
          message: request.description || '',
          urgency: request.urgency || 'Standard',
          status: 'new',
        });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Fetch all requests for Admin triage
   */
  async getAllAdmin(): Promise<SupportRequest[]> {
    if (!isSupabaseConfigured()) {
      return initialSupportRequests;
    }

    const client = getSupabaseClient();
    if (!client) return initialSupportRequests;

    try {
      const { data, error } = await (client.from('support_requests') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialSupportRequests;
      }

      return data.map(mapDbToSupport);
    } catch (err) {
      console.warn('Error fetching support requests:', err);
      return initialSupportRequests;
    }
  },

  /**
   * Update support request status
   */
  async updateStatus(id: string, status: string, notes?: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('support_requests') as any)
        .update({
          status: status.toLowerCase(),
          notes: notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating support request:', err);
      return false;
    }
  }
};

function mapDbToSupport(row: any): SupportRequest {
  return {
    id: row.id,
    trackingNumber: `NHS-SR-${row.id.slice(0, 6)}`,
    requesterName: row.name,
    isAnonymous: false,
    province: 'Bagmati',
    phone: row.phone,
    email: row.email || undefined,
    requestType: (row.request_type as any) || 'Emergency Factor Need',
    urgency: (row.urgency as any) || 'Emergency (Immediate)',
    description: row.message,
    status: mapStatus(row.status),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    assignedStaff: row.assigned_to || undefined,
    resolutionNotes: row.notes || undefined,
  };
}

function mapStatus(s: string): 'New' | 'In Progress' | 'Resolved' | 'Archived' {
  switch (s?.toLowerCase()) {
    case 'in_progress': return 'In Progress';
    case 'resolved': return 'Resolved';
    case 'closed': return 'Archived';
    default: return 'New';
  }
}
