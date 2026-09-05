// ==============================================================================
// src/services/supabase/statisticsService.ts
// Supabase Data Access Service for Homepage Metrics & Non-PII Aggregates
// ==============================================================================

import { getSupabaseClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export interface ImpactStatisticItem {
  id: string;
  statisticKey: string;
  labelEn: string;
  labelNe: string;
  value: string;
  suffix?: string;
  icon?: string;
  displayOrder: number;
}

export interface PublicPatientAggregate {
  totalRegisteredPatients: number;
  countHemophiliaA: number;
  countHemophiliaB: number;
  countVWD: number;
  countOther: number;
  countSevere: number;
  countModerate: number;
  countMild: number;
  countInhibitorPositive: number;
  countMale: number;
  countFemale: number;
  provincesWithPatients: number;
}

export const statisticsService = {
  /**
   * Fetch impact statistics for homepage counters
   */
  async getImpactStatistics(): Promise<ImpactStatisticItem[]> {
    if (!isSupabaseConfigured()) {
      return fallbackImpactStatistics();
    }

    const client = getSupabaseClient();
    if (!client) return fallbackImpactStatistics();

    try {
      const { data, error } = await (client.from('impact_statistics') as any)
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return fallbackImpactStatistics();
      }

      return data.map((row: any) => ({
        id: row.id,
        statisticKey: row.statistic_key,
        labelEn: row.label_en,
        labelNe: row.label_ne,
        value: row.value,
        suffix: row.suffix || '',
        icon: row.icon || 'Users',
        displayOrder: row.display_order,
      }));
    } catch (err) {
      console.warn('Error fetching statistics from Supabase:', err);
      return fallbackImpactStatistics();
    }
  },

  /**
   * Update a specific homepage statistic value
   */
  async updateStatistic(statisticKey: string, newValue: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('impact_statistics') as any)
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .eq('statistic_key', statisticKey);

      return !error;
    } catch (err) {
      console.error('Exception updating impact statistic:', err);
      return false;
    }
  },

  /**
   * Fetch Non-PII Public Patient Aggregates from secure database view
   * STRICT SECURITY: Zero personal identification information returned.
   */
  async getPublicPatientAggregates(): Promise<PublicPatientAggregate | null> {
    if (!isSupabaseConfigured()) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await (client.from('view_public_patient_stats') as any)
        .select('*')
        .single();

      if (error || !data) return null;

      return {
        totalRegisteredPatients: data.total_registered_patients,
        countHemophiliaA: data.count_hemophilia_a,
        countHemophiliaB: data.count_hemophilia_b,
        countVWD: data.count_vwd,
        countOther: data.count_other_bleeding_disorders,
        countSevere: data.count_severe,
        countModerate: data.count_moderate,
        countMild: data.count_mild,
        countInhibitorPositive: data.count_inhibitor_positive,
        countMale: data.count_male,
        countFemale: data.count_female,
        provincesWithPatients: data.provinces_with_patients,
      };
    } catch (err) {
      console.warn('Error fetching aggregate patient stats:', err);
      return null;
    }
  }
};

function fallbackImpactStatistics(): ImpactStatisticItem[] {
  return [
    { id: '1', statisticKey: 'registered_patients', labelEn: 'Registered Patients', labelNe: 'दर्ता भएका बिरामीहरू', value: '850', suffix: '+', icon: 'Users', displayOrder: 1 },
    { id: '2', statisticKey: 'treatment_centres', labelEn: 'Treatment Centres', labelNe: 'उपचार केन्द्रहरू', value: '12', suffix: '', icon: 'Hospital', displayOrder: 2 },
    { id: '3', statisticKey: 'provinces_covered', labelEn: 'Provinces Covered', labelNe: 'समेटिएका प्रदेशहरू', value: '7', suffix: '/ 7', icon: 'MapPin', displayOrder: 3 },
    { id: '4', statisticKey: 'factor_units_distributed', labelEn: 'Factor Units Infused', labelNe: 'वितरित फ्याक्टर युनिटहरू', value: '3.5M', suffix: 'IU', icon: 'ShieldCheck', displayOrder: 4 },
  ];
}
