-- ==============================================================================
-- 006_storage_policies.sql
-- Nepal Hemophilia Society — Supabase Storage Buckets & Access Policies
-- ==============================================================================

-- 1. Create Storage Buckets if they don't exist
-- Note: 'public = true' enables direct asset downloads through public CDN URLs.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('site-images', 'site-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('news-images', 'news-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('event-images', 'event-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('resource-files', 'resource-files', true, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png']),
  ('profile-images', 'profile-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Enable RLS on storage.objects (if not already enabled)
-- Supabase natively enables RLS on storage.objects.

-- 3. Public Read Policy for all public buckets
DROP POLICY IF EXISTS "Public users can view published storage assets" ON storage.objects;
CREATE POLICY "Public users can view published storage assets"
ON storage.objects FOR SELECT
USING (
  bucket_id IN ('site-images', 'news-images', 'event-images', 'resource-files', 'profile-images')
);

-- 4. Authenticated Editors/Admins can upload to content buckets
DROP POLICY IF EXISTS "Authenticated editors can upload content files" ON storage.objects;
CREATE POLICY "Authenticated editors can upload content files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('site-images', 'news-images', 'event-images', 'resource-files') AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin', 'editor', 'provincial_admin')
    AND is_active = true
  )
);

-- 5. Authenticated Editors/Admins can update content files
DROP POLICY IF EXISTS "Authenticated editors can update content files" ON storage.objects;
CREATE POLICY "Authenticated editors can update content files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('site-images', 'news-images', 'event-images', 'resource-files') AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin', 'editor', 'provincial_admin')
    AND is_active = true
  )
);

-- 6. Authenticated Admins can delete storage files
DROP POLICY IF EXISTS "Authenticated admins can delete storage files" ON storage.objects;
CREATE POLICY "Authenticated admins can delete storage files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id IN ('site-images', 'news-images', 'event-images', 'resource-files') AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin')
    AND is_active = true
  )
);

-- 7. Users can upload their own profile pictures
DROP POLICY IF EXISTS "Users can manage own avatar" ON storage.objects;
CREATE POLICY "Users can manage own avatar"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'profile-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
