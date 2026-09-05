-- ==============================================================================
-- 003_sensitive_and_ops.sql: Patient Registry, Membership, Donations, Support & Audit
-- Nepal Hemophilia Society (NHS) Database
-- ==============================================================================

-- 1. PATIENTS (Strictly Sensitive Patient Registry)
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_code VARCHAR(50) NOT NULL UNIQUE, -- e.g. NHS-P-2026-048
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    district VARCHAR(100),
    diagnosis_type VARCHAR(100) NOT NULL CHECK (diagnosis_type IN ('Hemophilia A', 'Hemophilia B', 'Von Willebrand Disease', 'Factor VII Deficiency', 'Factor XIII Deficiency', 'Other Bleeding Disorder')),
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('Severe (<1%)', 'Moderate (1-5%)', 'Mild (5-40%)', 'Unknown')),
    factor_baseline_level VARCHAR(50),
    inhibitor_status VARCHAR(50) DEFAULT 'Negative' CHECK (inhibitor_status IN ('Negative', 'Low Responder (<5 BU)', 'High Responder (>=5 BU)', 'Not Tested')),
    current_regimen VARCHAR(100) DEFAULT 'On-Demand' CHECK (current_regimen IN ('On-Demand', 'Low-Dose Prophylaxis', 'Standard Prophylaxis', 'Emicizumab')),
    primary_treatment_centre_id UUID REFERENCES public.treatment_centres(id) ON DELETE SET NULL,
    date_of_birth DATE,
    age INT,
    sex VARCHAR(20) CHECK (sex IN ('Male', 'Female', 'Other')),
    blood_group VARCHAR(10),
    treatment_status VARCHAR(50) DEFAULT 'Active',
    membership_status VARCHAR(50) DEFAULT 'Registered',
    disability_card_held BOOLEAN DEFAULT FALSE,
    physiotherapy_enrolled BOOLEAN DEFAULT FALSE,
    annual_bleed_rate_approx NUMERIC,
    registration_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deceased', 'transferred')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MEMBERSHIP APPLICATIONS
CREATE TABLE IF NOT EXISTS public.membership_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. NHS-MEM-2026-089
    full_name VARCHAR(255) NOT NULL,
    dob DATE,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    blood_group VARCHAR(10),
    condition_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50),
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    district VARCHAR(100),
    municipality VARCHAR(100),
    ward_no VARCHAR(20),
    address TEXT,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    emergency_contact_relation VARCHAR(100),
    application_status VARCHAR(50) DEFAULT 'pending' CHECK (application_status IN ('pending', 'under_review', 'approved', 'rejected', 'suspended')),
    membership_id VARCHAR(50),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DONATIONS (No credit card data stored)
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(50) NOT NULL UNIQUE,
    donor_name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(50),
    donor_pan_or_citizenship VARCHAR(50),
    is_anonymous BOOLEAN DEFAULT FALSE,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) DEFAULT 'NPR' CHECK (currency IN ('NPR', 'USD')),
    category VARCHAR(100) DEFAULT 'General Support',
    donation_type VARCHAR(50) DEFAULT 'One-time' CHECK (donation_type IN ('One-time', 'Monthly')),
    payment_method VARCHAR(50) DEFAULT 'eSewa' CHECK (payment_method IN ('eSewa', 'Khalti', 'Fonepay QR', 'Bank Transfer', 'International Card', 'Other')),
    transaction_reference VARCHAR(100) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Completed' CHECK (payment_status IN ('Completed', 'Pending Verification', 'Failed', 'Refunded')),
    is_receipt_generated BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SUPPORT REQUESTS
CREATE TABLE IF NOT EXISTS public.support_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. NHS-SR-9412
    requester_name VARCHAR(255) NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    province_id UUID REFERENCES public.provinces(id) ON DELETE SET NULL,
    hospital_near VARCHAR(255),
    request_type VARCHAR(100) NOT NULL CHECK (request_type IN (
        'Patient Support',
        'Factor Request',
        'Emergency',
        'Membership',
        'General Inquiry',
        'Healthcare Professional',
        'Emergency Factor Need',
        'Medical Advice Referral',
        'Physiotherapy Booking',
        'Psychological Counselling',
        'Disability Card Support',
        'Travel Assistance',
        'Other'
    )),
    urgency VARCHAR(50) DEFAULT 'Standard' CHECK (urgency IN ('Emergency (Immediate)', 'Urgent (<24h)', 'Standard', 'low', 'medium', 'high', 'emergency')),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed', 'archived')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    user_name VARCHAR(255),
    role VARCHAR(50),
    action VARCHAR(50) NOT NULL CHECK (action IN (
        'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 
        'APPROVE', 'REJECT', 'ROLE_CHANGE', 'LOGIN', 'LOGOUT', 'STOCK_UPDATE'
    )),
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(100),
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(50),
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('patients', 'membership_applications', 'donations', 'support_requests')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_set_updated_at ON public.%I;', tbl);
        EXECUTE format('CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', tbl);
    END LOOP;
END;
$$;
