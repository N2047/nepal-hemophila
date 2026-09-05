-- ==============================================================================
-- 001_initial_schema.sql: Core Operational Tables & Enums
-- Nepal Hemophilia Society (NHS) Database
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROVINCES
CREATE TABLE IF NOT EXISTS public.provinces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) NOT NULL UNIQUE,
    name_ne VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    description_en TEXT,
    description_ne TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROVINCIAL CHAPTERS
CREATE TABLE IF NOT EXISTS public.provincial_chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    chapter_name VARCHAR(255) NOT NULL,
    chairperson VARCHAR(255),
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(255),
    city_en VARCHAR(100),
    city_ne VARCHAR(100),
    partner_hospital_en VARCHAR(255),
    partner_hospital_ne VARCHAR(255),
    services_en TEXT,
    services_ne TEXT,
    description_en TEXT,
    description_ne TEXT,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    display_order INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TREATMENT CENTRES
CREATE TABLE IF NOT EXISTS public.treatment_centres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_ne VARCHAR(255) NOT NULL,
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    hospital_type VARCHAR(50) DEFAULT 'Regional Care',
    district VARCHAR(100),
    city VARCHAR(100),
    address_en TEXT,
    address_ne TEXT,
    phone VARCHAR(50),
    emergency_phone VARCHAR(50),
    email VARCHAR(100),
    hematologist_en VARCHAR(255),
    hematologist_ne VARCHAR(255),
    services JSONB DEFAULT '[]'::jsonb,
    has_factor_storage BOOLEAN DEFAULT TRUE,
    has_24_emergency BOOLEAN DEFAULT TRUE,
    has_physiotherapy BOOLEAN DEFAULT FALSE,
    has_coagulation_lab BOOLEAN DEFAULT FALSE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    directions_en TEXT,
    directions_ne TEXT,
    is_official_partner BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FACTOR INVENTORY
CREATE TABLE IF NOT EXISTS public.factor_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    treatment_centre_id UUID REFERENCES public.treatment_centres(id) ON DELETE CASCADE,
    factor_type VARCHAR(50) NOT NULL CHECK (factor_type IN ('Factor VIII', 'Factor IX', 'FEIBA / APCC', 'Emicizumab', 'vWF Concentrate', 'Cryoprecipitate', 'Other')),
    brand VARCHAR(100),
    strength VARCHAR(50),
    quantity NUMERIC DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'IU',
    available_units_approx VARCHAR(50),
    status VARCHAR(30) DEFAULT 'Available' CHECK (status IN ('Available', 'Limited', 'Contact Hospital', 'Not Available', 'Information Pending')),
    verification_status VARCHAR(20) DEFAULT 'Reported' CHECK (verification_status IN ('Verified', 'Reported', 'Pending')),
    contact_notes_en TEXT,
    contact_notes_ne TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    verified_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FACTOR INVENTORY HISTORY
CREATE TABLE IF NOT EXISTS public.factor_inventory_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_id UUID REFERENCES public.factor_inventory(id) ON DELETE CASCADE,
    treatment_centre_id UUID REFERENCES public.treatment_centres(id) ON DELETE CASCADE,
    factor_type VARCHAR(50) NOT NULL,
    old_status VARCHAR(30),
    new_status VARCHAR(30),
    old_quantity NUMERIC,
    new_quantity NUMERIC,
    change_type VARCHAR(50) DEFAULT 'STOCK_UPDATE',
    updated_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NOTICES
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255),
    title_ne VARCHAR(255) NOT NULL,
    content_en TEXT,
    content_ne TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'सूचना' CHECK (category IN ('सूचना', 'कार्यक्रम', 'आपतकालीन', 'प्रेस विज्ञप्ति', 'सेवा', 'general', 'emergency', 'medical', 'government', 'event', 'announcement')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_urgent BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    attachment_url TEXT,
    author_name VARCHAR(100) DEFAULT 'एन.एच.एस. सचिवालय',
    published_at DATE DEFAULT CURRENT_DATE,
    expires_at DATE,
    created_by UUID,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. POSTS (News, Advocacy, Patient Stories)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title_en VARCHAR(255) NOT NULL,
    title_ne VARCHAR(255) NOT NULL,
    summary_en TEXT,
    summary_ne TEXT,
    content_en TEXT NOT NULL,
    content_ne TEXT NOT NULL,
    featured_image TEXT,
    category VARCHAR(50) DEFAULT 'Society News' CHECK (category IN ('Society News', 'Medical Updates', 'Patient Stories', 'Advocacy', 'Press Releases', 'Events')),
    tags JSONB DEFAULT '[]'::jsonb,
    author_en VARCHAR(100) DEFAULT 'NHS Editorial Board',
    author_ne VARCHAR(100) DEFAULT 'एन.एच.एस. सम्पादक मण्डल',
    is_featured BOOLEAN DEFAULT FALSE,
    is_story_consent_verified BOOLEAN DEFAULT FALSE,
    is_anonymous_story BOOLEAN DEFAULT FALSE,
    read_time VARCHAR(20) DEFAULT '4 min',
    is_published BOOLEAN DEFAULT TRUE,
    published_at DATE DEFAULT CURRENT_DATE,
    created_by UUID,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title_en VARCHAR(255) NOT NULL,
    title_ne VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_ne TEXT NOT NULL,
    event_type VARCHAR(50) DEFAULT 'Conference',
    category VARCHAR(50) DEFAULT 'Conference' CHECK (category IN ('World Hemophilia Day', 'Conference', 'Workshop', 'Youth Camp', 'CME Training', 'Webinar')),
    start_date DATE NOT NULL,
    end_date DATE,
    time VARCHAR(100),
    location_en VARCHAR(255),
    location_ne VARCHAR(255),
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    organizer_en VARCHAR(255) DEFAULT 'Nepal Hemophilia Society',
    organizer_ne VARCHAR(255) DEFAULT 'नेपाल हेमोफिलिया सोसाइटी',
    is_online BOOLEAN DEFAULT FALSE,
    online_link TEXT,
    registration_enabled BOOLEAN DEFAULT FALSE,
    registration_deadline DATE,
    capacity INT,
    attendees_count INT DEFAULT 0,
    image_url TEXT,
    documents JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EVENT REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    organization VARCHAR(255),
    registration_status VARCHAR(20) DEFAULT 'confirmed' CHECK (registration_status IN ('confirmed', 'waitlisted', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. RESOURCES (Guidelines, Reports, Publications)
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_ne VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ne TEXT,
    category VARCHAR(50) DEFAULT 'Guidelines' CHECK (category IN ('Guidelines', 'Reports', 'Publications', 'Brochures', 'Fact Sheets', 'Posters', 'Forms', 'Research Papers', 'E-Learning')),
    audience VARCHAR(50) DEFAULT 'Patients & Families',
    language VARCHAR(20) DEFAULT 'Bilingual',
    year INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    file_type VARCHAR(20) DEFAULT 'PDF',
    file_url TEXT NOT NULL,
    file_size VARCHAR(50),
    download_count INT DEFAULT 0,
    thumbnail_url TEXT,
    author_en VARCHAR(100),
    author_ne VARCHAR(100),
    publisher_en VARCHAR(100),
    publisher_ne VARCHAR(100),
    is_published BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. HEALTHCARE PROFESSIONALS
CREATE TABLE IF NOT EXISTS public.healthcare_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    specialization VARCHAR(255),
    institution VARCHAR(255),
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    phone VARCHAR(50),
    email VARCHAR(100),
    photo_url TEXT,
    bio_en TEXT,
    bio_ne TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. COMMITTEE MEMBERS (Board & Advisors)
CREATE TABLE IF NOT EXISTS public.committee_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_np VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    designation_np VARCHAR(255) NOT NULL,
    designation_en VARCHAR(255) NOT NULL,
    role_category VARCHAR(50) DEFAULT 'executive' CHECK (role_category IN ('executive', 'advisor', 'staff', 'patron')),
    photo_url TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    bio_np TEXT,
    bio_en TEXT,
    display_order INT DEFAULT 0,
    tenure VARCHAR(50) DEFAULT '2024 - 2027',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. IMPACT / HOMEPAGE STATISTICS
CREATE TABLE IF NOT EXISTS public.impact_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    statistic_key VARCHAR(100) NOT NULL UNIQUE,
    label_en VARCHAR(100) NOT NULL,
    label_ne VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    suffix VARCHAR(20) DEFAULT '+',
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN (
            'provinces', 'provincial_chapters', 'treatment_centres', 
            'factor_inventory', 'notices', 'posts', 'events', 
            'resources', 'healthcare_professionals', 'committee_members', 
            'site_settings', 'impact_statistics'
        )
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_set_updated_at ON public.%I;', tbl);
        EXECUTE format('CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', tbl);
    END LOOP;
END;
$$;
