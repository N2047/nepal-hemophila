// ==============================================================================
// src/services/supabase/treatmentCentresService.ts
// Supabase Data Access Service for Treatment Centres
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { CmsTreatmentCentre } from '@/types/cms';
import { treatmentCentresData } from '@/data/mockData';

export const treatmentCentresService = {
  /**
   * Fetch all active treatment centres for public or admin display
   */
  async getAll(): Promise<CmsTreatmentCentre[]> {
    if (!isSupabaseConfigured()) {
      return defaultFallbackCentres();
    }

    const client = getSupabaseClient();
    if (!client) return defaultFallbackCentres();

    try {
      const { data, error } = await (client.from('treatment_centres') as any)
        .select('*')
        .eq('is_deleted', false)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return defaultFallbackCentres();
      }

      return data.map(mapDbToCmsCentre);
    } catch (err) {
      console.warn('Error fetching treatment centres from Supabase, using fallback:', err);
      return defaultFallbackCentres();
    }
  },

  /**
   * Create a new treatment centre in Supabase
   */
  async create(centre: Partial<CmsTreatmentCentre>): Promise<CmsTreatmentCentre | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const insertData = {
        name_en: centre.name?.en || 'New Treatment Centre',
        name_ne: centre.name?.np || 'नयाँ उपचार केन्द्र',
        hospital_type: centre.hospitalType || 'Regional Care',
        address_en: centre.address?.en || '',
        address_ne: centre.address?.np || '',
        phone: centre.phone || '',
        emergency_phone: centre.emergencyPhone || '',
        email: centre.email || '',
        hematologist_in_charge_en: centre.hematologistInCharge?.en || '',
        hematologist_in_charge_ne: centre.hematologistInCharge?.np || '',
        services: centre.services || [],
        factor_viii_available: centre.hasFactorStorage ?? true,
        factor_ix_available: true,
        pediatric_care: true,
        emergency_service: centre.has24Emergency ?? true,
        is_verified: centre.isOfficialPartner ?? true,
        status: (centre.status as string) || 'Active',
        display_order: centre.display_order || 99,
      };

      const { data, error } = await (client.from('treatment_centres') as any)
        .insert(insertData)
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error inserting centre:', error);
        return null;
      }

      return mapDbToCmsCentre(data);
    } catch (err) {
      console.error('Exception creating treatment centre:', err);
      return null;
    }
  },

  /**
   * Update an existing treatment centre
   */
  async update(id: string, updates: Partial<CmsTreatmentCentre>): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.name?.en) dbUpdates.name_en = updates.name.en;
      if (updates.name?.np) dbUpdates.name_ne = updates.name.np;
      if (updates.hospitalType) dbUpdates.hospital_type = updates.hospitalType;
      if (updates.address?.en) dbUpdates.address_en = updates.address.en;
      if (updates.address?.np) dbUpdates.address_ne = updates.address.np;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.emergencyPhone) dbUpdates.emergency_phone = updates.emergencyPhone;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.hematologistInCharge?.en) dbUpdates.hematologist_in_charge_en = updates.hematologistInCharge.en;
      if (updates.hematologistInCharge?.np) dbUpdates.hematologist_in_charge_ne = updates.hematologistInCharge.np;
      if (updates.services) dbUpdates.services = updates.services;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.display_order !== undefined) dbUpdates.display_order = updates.display_order;

      const { error } = await (client.from('treatment_centres') as any)
        .update(dbUpdates)
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception updating treatment centre:', err);
      return false;
    }
  },

  /**
   * Soft-delete (archive) a treatment centre
   */
  async delete(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('treatment_centres') as any)
        .update({ is_deleted: true, status: 'Archived', updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (err) {
      console.error('Exception deleting treatment centre:', err);
      return false;
    }
  }
};

function defaultFallbackCentres(): CmsTreatmentCentre[] {
  return treatmentCentresData.map((c, idx) => ({
    ...c,
    status: 'Published' as const,
    is_deleted: false,
    display_order: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function mapDbToCmsCentre(row: any): CmsTreatmentCentre {
  return {
    id: row.id,
    name: {
      en: row.name_en || 'Treatment Centre',
      np: row.name_ne || row.name_en || 'उपचार केन्द्र',
    },
    hospitalType: (row.hospital_type as any) || 'Regional Care',
    province: 'Bagmati',
    district: '',
    city: '',
    address: {
      en: row.address_en || '',
      np: row.address_ne || row.address_en || '',
    },
    phone: row.phone || '',
    emergencyPhone: row.emergency_phone || '',
    email: row.email || '',
    hematologistInCharge: {
      en: row.hematologist_in_charge_en || 'Hematology Team',
      np: row.hematologist_in_charge_ne || row.hematologist_in_charge_en || 'हेमाटोलोजी टिम',
    },
    services: Array.isArray(row.services) ? row.services : [],
    hasFactorStorage: row.factor_viii_available ?? true,
    has24Emergency: row.emergency_service ?? true,
    hasPhysiotherapy: true,
    hasCoagulationLab: true,
    latitude: row.latitude ? Number(row.latitude) : 27.7,
    longitude: row.longitude ? Number(row.longitude) : 85.3,
    directions: { en: '', np: '' },
    isOfficialPartner: row.is_verified ?? true,
    status: (row.status as any) || 'Published',
    is_deleted: row.is_deleted ?? false,
    display_order: row.display_order ?? 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
