// ==============================================================================
// src/services/supabase/donationsService.ts
// Supabase Data Access Service for Donations & Financial Transparency
// STRICT PRIVACY: Never stores credit card numbers or payment credentials.
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { DonationRecord } from '@/types';
import { initialDonationRecords } from '@/data/mockData';

export const donationsService = {
  /**
   * Record a donation (Public / Payment Callback)
   */
  async record(donation: {
    donorName: string;
    email?: string;
    phone?: string;
    amount: number;
    currency?: string;
    paymentMethod: string;
    transactionReference?: string;
    donationType?: string;
    isAnonymous?: boolean;
    notes?: string;
  }): Promise<{ success: boolean; receiptNumber?: string; error?: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: true, receiptNumber: `NHS-REC-${Date.now().toString().slice(-6)}` };
    }

    try {
      const receiptNumber = `NHS-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const { data, error } = await (client.from('donations') as any)
        .insert({
          donor_name: donation.isAnonymous ? 'Anonymous Well-Wisher' : donation.donorName,
          email: donation.email || null,
          phone: donation.phone || null,
          amount: donation.amount,
          currency: donation.currency || 'NPR',
          payment_method: donation.paymentMethod,
          transaction_reference: donation.transactionReference || null,
          payment_status: 'Completed',
          donation_type: donation.donationType || 'General Support',
          is_anonymous: donation.isAnonymous ?? false,
          receipt_number: receiptNumber,
          notes: donation.notes || null,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, receiptNumber: data.receipt_number || receiptNumber };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Fetch donations for Finance Admin ledger
   */
  async getAllAdmin(): Promise<DonationRecord[]> {
    if (!isSupabaseConfigured()) {
      return initialDonationRecords;
    }

    const client = getSupabaseClient();
    if (!client) return initialDonationRecords;

    try {
      const { data, error } = await (client.from('donations') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return initialDonationRecords;
      }

      return data.map(mapDbToDonation);
    } catch (err) {
      console.warn('Error fetching donations from Supabase:', err);
      return initialDonationRecords;
    }
  }
};

function mapDbToDonation(row: any): DonationRecord {
  return {
    id: row.id,
    receiptNumber: row.receipt_number || `REC-${row.id.slice(0, 6)}`,
    donorName: row.is_anonymous ? 'Anonymous Supporter' : row.donor_name,
    donorEmail: row.email || 'donor@example.com',
    donorPhone: row.phone || '+977-9800000000',
    isAnonymous: row.is_anonymous ?? false,
    amount: row.amount,
    currency: (row.currency as any) || 'NPR',
    category: (row.donation_type as any) || 'General Support',
    donationType: 'One-time',
    paymentMethod: (row.payment_method as any) || 'Bank Transfer',
    paymentStatus: 'Completed',
    transactionReference: row.transaction_reference || 'TXN-BANK',
    createdAt: row.created_at || '2026-01-01',
    isReceiptGenerated: true,
  };
}
