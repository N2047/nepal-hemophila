-- ==============================================================================
-- 004_rls_policies.sql: Comprehensive Row Level Security (RLS) Policies
-- Nepal Hemophilia Society (NHS) Database
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provincial_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factor_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factor_inventory_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.healthcare_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 1. PROFILES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
CREATE POLICY "Users can read their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id OR public.is_super_admin());

DROP POLICY IF EXISTS "Super Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Super Admins can manage all profiles" ON public.profiles
FOR ALL USING (public.is_super_admin());

-- -----------------------------------------------------------------------------
-- 2. PUBLIC READ TABLES (Provinces, Chapters, Centres, Committee, Settings, Stats)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view active provinces" ON public.provinces;
CREATE POLICY "Public can view active provinces" ON public.provinces
FOR SELECT USING (status = 'active' OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage provinces" ON public.provinces;
CREATE POLICY "Admins can manage provinces" ON public.provinces
FOR ALL USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Public can view published chapters" ON public.provincial_chapters;
CREATE POLICY "Public can view published chapters" ON public.provincial_chapters
FOR SELECT USING ((status = 'published' AND is_deleted = FALSE) OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage chapters" ON public.provincial_chapters;
CREATE POLICY "Admins can manage chapters" ON public.provincial_chapters
FOR ALL USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Public can view active treatment centres" ON public.treatment_centres;
CREATE POLICY "Public can view active treatment centres" ON public.treatment_centres
FOR SELECT USING ((status = 'active' AND is_deleted = FALSE) OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage treatment centres" ON public.treatment_centres;
CREATE POLICY "Admins can manage treatment centres" ON public.treatment_centres
FOR ALL USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Public can view factor inventory" ON public.factor_inventory;
CREATE POLICY "Public can view factor inventory" ON public.factor_inventory
FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admins can manage factor inventory" ON public.factor_inventory;
CREATE POLICY "Admins can manage factor inventory" ON public.factor_inventory
FOR ALL USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can view inventory history" ON public.factor_inventory_history;
CREATE POLICY "Admins can view inventory history" ON public.factor_inventory_history
FOR SELECT USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Public can view committee members" ON public.committee_members;
CREATE POLICY "Public can view committee members" ON public.committee_members
FOR SELECT USING ((status = 'active' AND is_deleted = FALSE) OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage committee members" ON public.committee_members;
CREATE POLICY "Admins can manage committee members" ON public.committee_members
FOR ALL USING (public.is_admin_or_higher());

DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings
FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Super Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Super Admins can manage site settings" ON public.site_settings
FOR ALL USING (public.is_super_admin());

DROP POLICY IF EXISTS "Public can view visible statistics" ON public.impact_statistics;
CREATE POLICY "Public can view visible statistics" ON public.impact_statistics
FOR SELECT USING (is_visible = TRUE OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage statistics" ON public.impact_statistics;
CREATE POLICY "Admins can manage statistics" ON public.impact_statistics
FOR ALL USING (public.is_admin_or_higher());

-- -----------------------------------------------------------------------------
-- 3. CONTENT (Notices, Posts, Events, Resources)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view published notices" ON public.notices;
CREATE POLICY "Public can view published notices" ON public.notices
FOR SELECT USING ((is_published = TRUE AND is_deleted = FALSE) OR public.is_editor_or_higher());

DROP POLICY IF EXISTS "Editors and Admins can manage notices" ON public.notices;
CREATE POLICY "Editors and Admins can manage notices" ON public.notices
FOR ALL USING (public.is_editor_or_higher());

DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts" ON public.posts
FOR SELECT USING ((is_published = TRUE AND is_deleted = FALSE) OR public.is_editor_or_higher());

DROP POLICY IF EXISTS "Editors and Admins can manage posts" ON public.posts;
CREATE POLICY "Editors and Admins can manage posts" ON public.posts
FOR ALL USING (public.is_editor_or_higher());

DROP POLICY IF EXISTS "Public can view published events" ON public.events;
CREATE POLICY "Public can view published events" ON public.events
FOR SELECT USING ((is_published = TRUE AND is_deleted = FALSE) OR public.is_editor_or_higher());

DROP POLICY IF EXISTS "Editors and Admins can manage events" ON public.events;
CREATE POLICY "Editors and Admins can manage events" ON public.events
FOR ALL USING (public.is_editor_or_higher());

DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;
CREATE POLICY "Anyone can register for events" ON public.event_registrations
FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins can view event registrations" ON public.event_registrations;
CREATE POLICY "Admins can view event registrations" ON public.event_registrations
FOR SELECT USING (public.is_editor_or_higher());

DROP POLICY IF EXISTS "Public can view published resources" ON public.resources;
CREATE POLICY "Public can view published resources" ON public.resources
FOR SELECT USING ((is_published = TRUE AND is_deleted = FALSE) OR public.is_editor_or_higher());

DROP POLICY IF EXISTS "Editors and Admins can manage resources" ON public.resources;
CREATE POLICY "Editors and Admins can manage resources" ON public.resources
FOR ALL USING (public.is_editor_or_higher());

DROP POLICY IF EXISTS "Public can view active healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Public can view active healthcare professionals" ON public.healthcare_professionals
FOR SELECT USING ((status = 'active' AND is_deleted = FALSE) OR public.is_admin_or_higher());

DROP POLICY IF EXISTS "Admins can manage healthcare professionals" ON public.healthcare_professionals;
CREATE POLICY "Admins can manage healthcare professionals" ON public.healthcare_professionals
FOR ALL USING (public.is_admin_or_higher());

-- -----------------------------------------------------------------------------
-- 4. SENSITIVE MEDICAL & USER DATA (PATIENTS, MEMBERSHIP, DONATIONS, SUPPORT)
-- -----------------------------------------------------------------------------

-- PATIENTS REGISTRY: NEVER EXPOSED TO ANONYMOUS OR GENERAL USERS
DROP POLICY IF EXISTS "Only Medical Admins and Super Admins can access patients" ON public.patients;
CREATE POLICY "Only Medical Admins and Super Admins can access patients" ON public.patients
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('super_admin', 'healthcare_professional')
        AND is_active = TRUE
    )
);

-- MEMBERSHIP: Public can submit application; Admins can review all
DROP POLICY IF EXISTS "Anyone can submit membership application" ON public.membership_applications;
CREATE POLICY "Anyone can submit membership application" ON public.membership_applications
FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins can view and review membership applications" ON public.membership_applications;
CREATE POLICY "Admins can view and review membership applications" ON public.membership_applications
FOR ALL USING (public.is_admin_or_higher());

-- DONATIONS: Public can insert donation record; Finance & Super Admin can view
DROP POLICY IF EXISTS "Anyone can record a donation" ON public.donations;
CREATE POLICY "Anyone can record a donation" ON public.donations
FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins can view donation records" ON public.donations;
CREATE POLICY "Admins can view donation records" ON public.donations
FOR ALL USING (public.is_admin_or_higher());

-- SUPPORT REQUESTS: Anyone can submit a ticket; Admins manage
DROP POLICY IF EXISTS "Anyone can submit a support request" ON public.support_requests;
CREATE POLICY "Anyone can submit a support request" ON public.support_requests
FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins can view and resolve support requests" ON public.support_requests;
CREATE POLICY "Admins can view and resolve support requests" ON public.support_requests
FOR ALL USING (public.is_admin_or_higher());

-- AUDIT LOGS: Super Admin only
DROP POLICY IF EXISTS "Super Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Super Admins can view audit logs" ON public.audit_logs
FOR SELECT USING (public.is_super_admin());

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs" ON public.audit_logs
FOR INSERT WITH CHECK (TRUE);
