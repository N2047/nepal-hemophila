// ==============================================================================
// src/services/supabase/inventoryService.ts
// Supabase Data Access Service for Factor Inventory & Audit History
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { FactorInventoryItem } from '@/types';
import { factorInventoryData } from '@/data/mockData';

export const inventoryService = {
  /**
   * Fetch all factor inventory items joined with treatment centre details
   */
  async getAll(): Promise<FactorInventoryItem[]> {
    if (!isSupabaseConfigured()) {
      return factorInventoryData;
    }

    const client = getSupabaseClient();
    if (!client) return factorInventoryData;

    try {
      const { data, error } = await (client.from('factor_inventory') as any)
        .select(`
          *,
          treatment_centres (
            name_en,
            name_ne
          )
        `)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return factorInventoryData;
      }

      return data.map(mapDbToInventoryItem);
    } catch (err) {
      console.warn('Error fetching inventory from Supabase, using fallback:', err);
      return factorInventoryData;
    }
  },

  /**
   * Update factor inventory item and record audit history
   */
  async update(
    id: string,
    updates: {
      quantity?: number;
      status?: string;
      notes?: string;
      verifiedBy?: string;
    }
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      // 1. Fetch current record to capture history
      const { data: current } = await (client.from('factor_inventory') as any)
        .select('*')
        .eq('id', id)
        .single();

      if (!current) return false;

      // 2. Perform inventory update
      const dbUpdates: any = {
        last_verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      if (updates.quantity !== undefined) dbUpdates.quantity = updates.quantity;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.notes) dbUpdates.notes = updates.notes;
      if (updates.verifiedBy) dbUpdates.verified_by = updates.verifiedBy;

      const { error: updateError } = await (client.from('factor_inventory') as any)
        .update(dbUpdates)
        .eq('id', id);

      if (updateError) return false;

      // 3. Record audit history in factor_inventory_history table
      await (client.from('factor_inventory_history') as any).insert({
        inventory_id: id,
        previous_quantity: current.quantity,
        new_quantity: updates.quantity !== undefined ? updates.quantity : current.quantity,
        previous_status: current.status,
        new_status: updates.status || current.status,
        reason: updates.notes || 'Routine stock verification',
      });

      return true;
    } catch (err) {
      console.error('Exception updating inventory in Supabase:', err);
      return false;
    }
  }
};

function mapDbToInventoryItem(row: any): FactorInventoryItem {
  const centreName = row.treatment_centres;
  return {
    id: row.id,
    centreId: row.treatment_centre_id,
    hospitalName: {
      en: centreName?.name_en || 'Treatment Centre',
      np: centreName?.name_ne || centreName?.name_en || 'उपचार केन्द्र',
    },
    province: 'Bagmati',
    factorType: (row.factor_type as any) || 'Factor VIII',
    status: (row.status as any) || 'Available',
    availableUnitsApprox: `${row.quantity} ${row.unit || 'vials'} (${row.strength || ''})`,
    lastUpdated: row.last_verified_at || row.updated_at,
    updatedByRole: row.verified_by || 'Hospital Hematology Pharmacy',
    contactNotes: {
      en: row.notes || 'Emergency infusion quota active',
      np: row.notes || 'आपतकालीन इन्फ्युजन सेवा सक्रिय',
    },
    verificationStatus: 'Verified',
  };
}
