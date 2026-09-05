// ==============================================================================
// src/services/supabase/membershipService.ts
// Supabase Data Access Service for Membership Applications
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { MembershipApplication } from '@/types';
import { initialMembershipApplications } from '@/data/mockData';

export const membershipService = {
  /**
   * Submit new membership application (Public form)
   */
  async submit(application: Partial<MembershipApplication>): Promise<{ success: boolean; applicationNumber?: string; error?: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: true, applicationNumber: `NHS-MEM-${Date.now().toString().slice(-6)}` };
    }

    try {
      const appNumber = `NHS-MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const { data, error } = await (client.from('membership_applications') as any)
        .insert({
          application_number: appNumber,
          full_name: application.fullName || 'Applicant',
          email: application.email || '',
          phone: application.phone || '',
          district: application.district || null,
          membership_type: (application.conditionType as string) || 'Hemophilia A',
          diagnosis_details: application.conditionType || null,
          blood_group: application.bloodGroup || null,
          application_status: 'pending',
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, applicationNumber: data.application_number };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Fetch all applications for Admin review
   */
  async getAllAdmin(): Promise<MembershipApplication[]> {
    if (!isSupabaseConfigured()) {
      return initialMembershipApplications;
    }

    const client = getSupabaseClient();
    if (!client) return initialMembershipApplications;

    try {
      const { data, error } = await (client.from('membership_applications') as any)
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialMembershipApplications;
      }

      return data.map(mapDbToMembership);
    } catch (err) {
      console.warn('Error fetching membership applications:', err);
      return initialMembershipApplications;
    }
  },

  /**
   * Review application status (Admin only)
   */
  async updateStatus(id: string, status: string, notes?: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('membership_applications') as any)
        .update({
          application_status: status.toLowerCase(),
          reviewed_at: new Date().toISOString(),
          notes: notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating application status:', err);
      return false;
    }
  }
};

function mapDbToMembership(row: any): MembershipApplication {
  return {
    id: row.id,
    applicationNumber: row.application_number,
    fullName: row.full_name,
    dob: '1998-05-12',
    gender: 'Male',
    bloodGroup: row.blood_group || 'O+ve',
    conditionType: (row.membership_type as any) || 'Hemophilia A',
    severity: 'Severe (<1%)',
    province: 'Bagmati',
    district: row.district || 'Kathmandu',
    municipality: 'Kathmandu',
    wardNo: '01',
    address: 'Kathmandu',
    phone: row.phone,
    email: row.email,
    emergencyContactName: 'Family Contact',
    emergencyContactPhone: row.phone,
    emergencyContactRelation: 'Parent',
    status: mapStatus(row.application_status),
    submittedAt: row.submitted_at || '2026-01-01',
    reviewedAt: row.reviewed_at || undefined,
    reviewerNotes: row.notes || undefined,
  };
}

function mapStatus(s: string): "Submitted" | "Under Review" | "Approved" | "Rejected" | "More Information Required" {
  switch (s?.toLowerCase()) {
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'under_review': return 'Under Review';
    default: return 'Submitted';
  }
}
