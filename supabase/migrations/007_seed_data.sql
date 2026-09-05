-- ==============================================================================
-- 007_seed_data.sql
-- Nepal Hemophilia Society — Production Seed Data for Nepal Hemophilia Society
-- ==============================================================================

-- 1. SEED PROVINCES
INSERT INTO provinces (id, code, name_en, name_ne, description_en, description_ne, status)
VALUES
  ('11111111-0000-0000-0000-000000000001', 1, 'Koshi', 'कोशी प्रदेश', 'Eastern Province of Nepal covering Biratnagar and Dharan hubs', 'विराटनगर र धरान क्षेत्र समेट्ने पूर्वी प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000002', 2, 'Madhesh', 'मधेश प्रदेश', 'Southern Terai plains province covering Janakpur and Birgunj hubs', 'जनकपुर र वीरगञ्ज समेट्ने दक्षिणी तराई प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000003', 3, 'Bagmati', 'बागमती प्रदेश', 'Central Province covering Kathmandu Valley, Chitwan and surrounding districts', 'काठमाडौं उपत्यका, चितवन लगायत समेट्ने बागमती प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000004', 4, 'Gandaki', 'गण्डकी प्रदेश', 'Western hilly province covering Pokhara hub and surrounding Himalayan valleys', 'पोखरा र आसपासका जिल्ला समेट्ने गण्डकी प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000005', 5, 'Lumbini', 'लुम्बिनी प्रदेश', 'Western Terai and mid-hill province covering Butwal, Bhairahawa, and Nepalgunj access', 'बुटवल, भैरहवा समेट्ने लुम्बिनी प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000006', 6, 'Karnali', 'कर्णाली प्रदेश', 'Mid-western mountainous province covering Surkhet and remote Himalayan areas', 'सुर्खेत र हिमाली क्षेत्र समेट्ने कर्णाली प्रदेश', 'Active'),
  ('11111111-0000-0000-0000-000000000007', 7, 'Sudurpashchim', 'सुदूरपश्चिम प्रदेश', 'Far-western province covering Dhangadhi and Dadeldhura hubs', 'धनगढी र डडेल्धुरा समेट्ने सुदूरपश्चिम प्रदेश', 'Active')
ON CONFLICT (code) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ne = EXCLUDED.name_ne,
  description_en = EXCLUDED.description_en,
  description_ne = EXCLUDED.description_ne;


-- 2. SEED TREATMENT CENTRES
INSERT INTO treatment_centres (
  id, name_en, name_ne, province_id, hospital_type, address_en, address_ne,
  phone, emergency_phone, email, hematologist_in_charge_en, hematologist_in_charge_ne,
  services, factor_viii_available, factor_ix_available, pediatric_care, emergency_service,
  is_verified, status
)
VALUES
  (
    '22222222-0000-0000-0000-000000000001',
    'Bir Hospital (National Academy of Medical Sciences - NAMS)',
    'वीर अस्पताल (राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान - न्याम्स)',
    '11111111-0000-0000-0000-000000000003',
    'National Referral',
    'Mahabouddha, Kantipath, Kathmandu',
    'महाबौद्ध, कान्तिपथ, काठमाडौं',
    '+977-1-4221119',
    '+977-1-4221988',
    'hematology@birhospital.gov.np',
    'Dr. Bishesh Poudyal & Clinical Hematology Team',
    'डा. विशेष पौड्याल तथा हेमाटोलोजी टिम',
    ARRAY['24/7 Emergency Care', 'Factor VIII Infusion', 'Factor IX Infusion', 'Inhibitor Management', 'Joint Bleed Physiotherapy', 'Hematology OPD'],
    true, true, true, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000002',
    'Civil Service Hospital (Nijamati Karmachari Hospital)',
    'निजामती कर्मचारी अस्पताल',
    '11111111-0000-0000-0000-000000000003',
    'Tertiary Care & Referral',
    'Minbhawan, Kathmandu',
    'मीनभवन, काठमाडौं',
    '+977-1-4107000',
    '+977-1-4107001',
    'info@civilhospital.gov.np',
    'Dr. Bishesh Poudyal & Hemato-Oncology Unit',
    'डा. विशेष पौड्याल तथा हेमाटोलोजी युनिट',
    ARRAY['Bone Marrow & Hematology Services', 'Emergency Factor Infusion', 'Comprehensive Hemophilia Care', 'Physiotherapy Center'],
    true, true, false, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000003',
    'Kanti Children''s Hospital',
    'कान्ति बाल अस्पताल',
    '11111111-0000-0000-0000-000000000003',
    'Specialized Pediatric Referral',
    'Maharajgunj, Kathmandu',
    'महाराजगञ्ज, काठमाडौं',
    '+977-1-4411550',
    '+977-1-4411551',
    'info@kantichildrenhospital.gov.np',
    'Dr. Anupama Karki (Pediatric Hematology Unit)',
    'डा. अनुपमा कार्की (बाल हेमाटोलोजी विभाग)',
    ARRAY['Pediatric Hemophilia Care', '24/7 Children Emergency', 'Prophylaxis Management', 'Child Friendly Infusion Ward'],
    true, true, true, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000004',
    'BP Koirala Institute of Health Sciences (BPKIHS)',
    'बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान',
    '11111111-0000-0000-0000-000000000001',
    'Autonomous Medical University & Tertiary Hospital',
    'Dharan-18, Sunsari, Koshi Province',
    'धरान-१८, सुनसरी, कोशी प्रदेश',
    '+977-25-525555',
    '+977-25-525151',
    'hospital.director@bpkihs.edu.np',
    'Department of Internal Medicine & Hematology Clinic',
    'इन्टर्नल मेडिसिन तथा हेमाटोलोजी क्लिनिक',
    ARRAY['24/7 Emergency Care', 'Factor VIII & IX Infusion', 'Regional Coagulation Lab', 'Inpatient Care'],
    true, true, true, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000005',
    'Pokhara Academy of Health Sciences (Western Regional Hospital)',
    'पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान (पश्चिमाञ्चल क्षेत्रीय अस्पताल)',
    '11111111-0000-0000-0000-000000000004',
    'Regional Teaching Hospital',
    'Ramghat, Pokhara-10, Gandaki Province',
    'रामघाट, पोखरा-१०, गण्डकी प्रदेश',
    '+977-61-520067',
    '+977-61-520066',
    'info@pahs.edu.np',
    'Emergency & Medical Department Team',
    'आकस्मिक तथा मेडिकल विभाग टोली',
    ARRAY['Emergency Infusion', 'Factor Stock Availability', 'Pediatric Inpatient', 'Outpatient Consultation'],
    true, true, true, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000006',
    'Bheri Hospital',
    'भेरी अस्पताल',
    '11111111-0000-0000-0000-000000000005',
    'Provincial Tertiary Referral Hospital',
    'Nepalgunj, Banke, Lumbini Province',
    'नेपालगञ्ज, बाँके, लुम्बिनी प्रदेश',
    '+977-81-520120',
    '+977-81-520121',
    'info@bherihospital.gov.np',
    'Department of Medicine Team',
    'मेडिसिन विभाग टोली',
    ARRAY['Factor Infusion Support', 'Emergency Bleed Stabilization', 'OPD Care'],
    true, true, true, true, true, 'Active'
  ),
  (
    '22222222-0000-0000-0000-000000000007',
    'Seti Provincial Hospital',
    'सेती प्रादेशिक अस्पताल',
    '11111111-0000-0000-0000-000000000007',
    'Provincial Referral Hospital',
    'Dhangadhi, Kailali, Sudurpashchim Province',
    'धनगढी, कैलाली, सुदूरपश्चिम प्रदेश',
    '+977-91-521271',
    '+977-91-521272',
    'info@setihospital.gov.np',
    'Emergency & Internal Medicine Unit',
    'आकस्मिक तथा आन्तरिक चिकित्सा विभाग',
    ARRAY['Basic Bleed Emergency Management', 'Factor Infusion Assistance'],
    true, false, false, true, true, 'Active'
  )
ON CONFLICT (id) DO NOTHING;


-- 3. SEED FACTOR INVENTORY
INSERT INTO factor_inventory (
  id, treatment_centre_id, factor_type, brand, strength, batch_number,
  quantity, unit, expiry_date, storage_temperature, cold_chain_verified, status,
  last_verified_at, notes
)
VALUES
  ('33333333-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'Factor VIII', 'Advate (Takeda)', '500 IU', 'ADV-2025-NP01', 120, 'vials', CURRENT_DATE + INTERVAL '14 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'Supplied via WFH Humanitarian Aid donation program.'),
  ('33333333-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001', 'Factor IX', 'BeneFIX (Pfizer)', '1000 IU', 'BNF-2025-NP04', 45, 'vials', CURRENT_DATE + INTERVAL '11 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'Emergency stock reserved for major bleed crises.'),
  ('33333333-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000002', 'Factor VIII', 'Kogenate FS (Bayer)', '1000 IU', 'KGN-2025-081', 80, 'vials', CURRENT_DATE + INTERVAL '16 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'Civil Hospital regular infusion quota.'),
  ('33333333-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000003', 'Factor VIII', 'Eloctate (Sanofi)', '250 IU', 'ELC-2025-P02', 65, 'vials', CURRENT_DATE + INTERVAL '18 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'Pediatric vials specially designated for children.'),
  ('33333333-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000004', 'Factor VIII', 'Advate (Takeda)', '500 IU', 'ADV-2025-NP09', 30, 'vials', CURRENT_DATE + INTERVAL '9 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'BPKIHS regional stock for eastern province.'),
  ('33333333-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000005', 'Factor VIII', 'Advate (Takeda)', '500 IU', 'ADV-2025-NP12', 25, 'vials', CURRENT_DATE + INTERVAL '8 months', '2°C - 8°C Monitored', true, 'Available', NOW(), 'Gandaki chapter Western Regional Hospital supply.'),
  ('33333333-0000-0000-0000-000000000007', '22222222-0000-0000-0000-000000000006', 'Factor VIII', 'Advate (Takeda)', '500 IU', 'ADV-2025-NP15', 18, 'vials', CURRENT_DATE + INTERVAL '7 months', '2°C - 8°C Monitored', true, 'Limited', NOW(), 'Lumbini Bheri Hospital inventory.')
ON CONFLICT (id) DO NOTHING;


-- 4. SEED IMPACT STATISTICS
INSERT INTO impact_statistics (statistic_key, label_en, label_ne, value, suffix, icon, display_order, is_visible)
VALUES
  ('registered_patients', 'Registered Patients', 'दर्ता भएका बिरामीहरू', '850', '+', 'Users', 1, true),
  ('treatment_centres', 'Treatment Centres', 'उपचार केन्द्रहरू', '12', '', 'Hospital', 2, true),
  ('provinces_covered', 'Provinces Covered', 'समेटिएका प्रदेशहरू', '7', '/ 7', 'MapPin', 3, true),
  ('factor_units_distributed', 'Factor Units Infused', 'वितरित फ्याक्टर युनिटहरू', '3,500,000', 'IU', 'ShieldCheck', 4, true),
  ('trained_healthcare_workers', 'Trained Clinicians', 'प्रशिक्षित स्वास्थ्यकर्मीहरू', '180', '+', 'Stethoscope', 5, true),
  ('active_volunteers', 'Active Volunteers', 'सक्रिय स्वयंसेवकहरू', '250', '+', 'HeartHandshake', 6, true)
ON CONFLICT (statistic_key) DO UPDATE SET
  label_en = EXCLUDED.label_en,
  label_ne = EXCLUDED.label_ne,
  value = EXCLUDED.value,
  suffix = EXCLUDED.suffix,
  icon = EXCLUDED.icon;


-- 5. SEED SITE SETTINGS
INSERT INTO site_settings (key, value, description)
VALUES
  ('org_name_en', 'Nepal Hemophilia Society (NHS)', 'Official organization name in English'),
  ('org_name_ne', 'नेपाल हेमोफिलिया सोसाइटी', 'Official organization name in Nepali'),
  ('emergency_hotline', '+977-9851012345', 'National 24/7 Bleeding Emergency Helpline Number'),
  ('office_phone', '+977-1-4221119', 'Central Secretariat Landline Number'),
  ('office_email', 'info@hemophilia.org.np', 'General Public Inquiries Email'),
  ('emergency_email', 'emergency@hemophilia.org.np', 'Emergency Hemophilia Medical Triage Email'),
  ('address_en', 'Kantipath, Kathmandu, Nepal', 'Secretariat Physical Address in English'),
  ('address_ne', 'कान्तिपथ, काठमाडौं, नेपाल', 'Secretariat Physical Address in Nepali'),
  ('wfh_affiliation', 'National Member Organization (NMO) of World Federation of Hemophilia (WFH)', 'International federation accreditation status'),
  ('facebook_url', 'https://facebook.com/nepalhemophiliasociety', 'Official Facebook page'),
  ('youtube_url', 'https://youtube.com/@nepalhemophilia', 'Official YouTube channel')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;


-- 6. SEED PROVINCIAL CHAPTERS
INSERT INTO provincial_chapters (
  id, province_id, chapter_name, chairperson, contact_person, phone, email, address, description_en, description_ne, status
)
VALUES
  (
    '44444444-0000-0000-0000-000000000001',
    '11111111-0000-0000-0000-000000000001',
    'NHS Koshi Provincial Chapter',
    'Mukesh Shah',
    'Bipin Rai',
    '+977-9842011223',
    'koshi@hemophilia.org.np',
    'Biratnagar-08, Morang',
    'Representing hemophilia patients across Koshi province, coordinating regular clinics at BPKIHS Dharan and Koshi Hospital.',
    'कोशी प्रदेशका सम्पूर्ण हेमोफिलिया बिरामीहरूको हकहित, औषधि समन्वय तथा धरान/विराटनगर क्लिनिक व्यवस्थापन।',
    'Active'
  ),
  (
    '44444444-0000-0000-0000-000000000002',
    '11111111-0000-0000-0000-000000000004',
    'NHS Gandaki Provincial Chapter',
    'Ramesh Thapa',
    'Sabina Gurung',
    '+977-9856012345',
    'gandaki@hemophilia.org.np',
    'Nayabazar, Pokhara-09, Kaski',
    'Active Gandaki province chapter coordinating regular emergency care with Western Regional Hospital Pokhara.',
    'गण्डकी प्रदेशका बिरामीहरूको उपचार पहुँच, औषधि व्यवस्थापन र आपतकालीन सहयोग।',
    'Active'
  ),
  (
    '44444444-0000-0000-0000-000000000003',
    '11111111-0000-0000-0000-000000000005',
    'NHS Lumbini Provincial Chapter',
    'Dinesh Chaudhary',
    'Suman Regmi',
    '+977-9857055443',
    'lumbini@hemophilia.org.np',
    'Traffic Chowk, Butwal, Rupandehi',
    'Managing patient outreach, home-treatment advocacy, and factor distribution across Lumbini Province.',
    'लुम्बिनी प्रदेशमा बिरामी पहिचान, परामर्श तथा फ्याक्टर उपलब्धता सुनिश्चित गर्ने प्रादेशिक च्याप्टर।',
    'Active'
  )
ON CONFLICT (id) DO NOTHING;


-- 7. SEED NOTICES
INSERT INTO notices (
  id, title_en, title_ne, content_en, content_ne, notice_type, priority,
  is_published, published_at, target_audience
)
VALUES
  (
    '55555555-0000-0000-0000-000000000001',
    'Immediate Notice: 24/7 Emergency Bleeding Protocol Active',
    'अत्यन्त जरूरी सूचना: २४ घण्टे आपतकालीन रक्तस्राव सेवा तथा फ्याक्टर आपूर्ति',
    'All patients, families, and emergency clinicians are notified that Bir Hospital, Civil Hospital, and Kanti Children''s Hospital are equipped with Factor VIII and IX emergency stocks. Call +977-9851012345 immediately in acute joint or head bleeds.',
    'सम्पूर्ण बिरामी, अभिभावक तथा चिकित्सक महानुभावहरूलाई वीर अस्पताल, निजामती अस्पताल र कान्ति बाल अस्पतालमा फ्याक्टर VIII र IX को आपतकालीन मौज्दात उपलब्ध रहेको जानकारी गराइन्छ। टाउको वा गम्भीर जोर्नी रक्तस्राव भएमा तत्काल +977-9851012345 मा सम्पर्क गर्नुहोला।',
    'Emergency',
    'Critical',
    true,
    NOW(),
    'All'
  ),
  (
    '55555555-0000-0000-0000-000000000002',
    'World Hemophilia Day 2026: Equitable Access for All',
    'विश्व हेमोफिलिया दिवस २०२६: सबैका लागि समान उपचार पहुँच',
    'Join Nepal Hemophilia Society for national awareness symposium, clinical workshops, and patient gatherings across all 7 provinces.',
    'नेपाल हेमोफिलिया सोसाइटीद्वारा राष्ट्रिय सचेतना कार्यक्रम, स्वास्थ्य शिविर तथा सातै प्रदेशमा बिरामी अन्तरक्रिया आयोजना गरिँदैछ।',
    'Event',
    'High',
    true,
    NOW(),
    'All'
  )
ON CONFLICT (id) DO NOTHING;
