-- ==============================================================================
-- 005_functions_and_views.sql
-- Nepal Hemophilia Society — Secure Functions, Non-PII Aggregate Views & Auditing
-- ==============================================================================

-- 1. NON-PII PUBLIC AGGREGATE VIEW FOR PATIENT STATISTICS
-- Strictly prevents any PII exposure to public anonymous users.
-- Only aggregated counts, ratios, and category groupings are returned.

CREATE OR REPLACE VIEW view_public_patient_stats AS
SELECT
  COUNT(*)::INTEGER AS total_registered_patients,
  COUNT(CASE WHEN diagnosis_type = 'Hemophilia A' THEN 1 END)::INTEGER AS count_hemophilia_a,
  COUNT(CASE WHEN diagnosis_type = 'Hemophilia B' THEN 1 END)::INTEGER AS count_hemophilia_b,
  COUNT(CASE WHEN diagnosis_type = 'Von Willebrand Disease' THEN 1 END)::INTEGER AS count_vwd,
  COUNT(CASE WHEN diagnosis_type NOT IN ('Hemophilia A', 'Hemophilia B', 'Von Willebrand Disease') THEN 1 END)::INTEGER AS count_other_bleeding_disorders,
  COUNT(CASE WHEN severity = 'Severe' THEN 1 END)::INTEGER AS count_severe,
  COUNT(CASE WHEN severity = 'Moderate' THEN 1 END)::INTEGER AS count_moderate,
  COUNT(CASE WHEN severity = 'Mild' THEN 1 END)::INTEGER AS count_mild,
  COUNT(CASE WHEN inhibitor_status = 'Positive' THEN 1 END)::INTEGER AS count_inhibitor_positive,
  COUNT(CASE WHEN sex = 'Male' THEN 1 END)::INTEGER AS count_male,
  COUNT(CASE WHEN sex = 'Female' THEN 1 END)::INTEGER AS count_female,
  COUNT(DISTINCT province_id)::INTEGER AS provinces_with_patients
FROM patients
WHERE status = 'Active';

COMMENT ON VIEW view_public_patient_stats IS 'Sanitized aggregate patient statistics for public dashboards and transparency reports. Contains zero PII.';

-- Grant public read to this view
GRANT SELECT ON view_public_patient_stats TO anon, authenticated;


-- 2. NON-PII PATIENTS BY PROVINCE AGGREGATE VIEW
CREATE OR REPLACE VIEW view_patients_by_province AS
SELECT
  p.id AS province_id,
  p.name_en AS province_name_en,
  p.name_ne AS province_name_ne,
  p.code AS province_code,
  COUNT(pt.id)::INTEGER AS patient_count,
  COUNT(CASE WHEN pt.diagnosis_type = 'Hemophilia A' THEN 1 END)::INTEGER AS hemophilia_a_count,
  COUNT(CASE WHEN pt.diagnosis_type = 'Hemophilia B' THEN 1 END)::INTEGER AS hemophilia_b_count,
  COUNT(CASE WHEN pt.severity = 'Severe' THEN 1 END)::INTEGER AS severe_count
FROM provinces p
LEFT JOIN patients pt ON pt.province_id = p.id AND pt.status = 'Active'
GROUP BY p.id, p.name_en, p.name_ne, p.code
ORDER BY p.code ASC;

GRANT SELECT ON view_patients_by_province TO anon, authenticated;


-- 3. PUBLIC IMPACT METRICS RPC FUNCTION
-- Returns clean JSON combining key indicators for the public homepage and impact page
CREATE OR REPLACE FUNCTION get_public_impact_metrics()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  total_pts INTEGER;
  total_centres INTEGER;
  provinces_count INTEGER;
  factor_units BIGINT;
BEGIN
  SELECT COUNT(*) INTO total_pts FROM patients WHERE status = 'Active';
  SELECT COUNT(*) INTO total_centres FROM treatment_centres WHERE status = 'Active';
  SELECT COUNT(DISTINCT province_id) INTO provinces_count FROM treatment_centres WHERE status = 'Active';
  SELECT COALESCE(SUM(quantity), 0) INTO factor_units FROM factor_inventory WHERE status IN ('Available', 'Limited');

  result := jsonb_build_object(
    'registered_patients', total_pts,
    'treatment_centres', total_centres,
    'provinces_covered', provinces_count,
    'available_factor_units', factor_units,
    'last_updated', NOW()
  );

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_public_impact_metrics() TO anon, authenticated;


-- 4. INCREMENT RESOURCE DOWNLOAD COUNTER RPC
CREATE OR REPLACE FUNCTION increment_resource_download(res_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE resources
  SET download_count = download_count + 1
  WHERE id = res_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_resource_download(UUID) TO anon, authenticated;


-- 5. AUDIT LOGGING TRIGGER FUNCTION
-- Captures state transitions and changes on mission-critical institutional tables
CREATE OR REPLACE FUNCTION log_institutional_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_action TEXT;
  v_record_id UUID;
  v_old JSONB;
  v_new JSONB;
BEGIN
  v_user_id := auth.uid();
  v_action := TG_OP;

  IF (TG_OP = 'DELETE') THEN
    v_record_id := OLD.id;
    v_old := to_jsonb(OLD);
    v_new := NULL;
  ELSIF (TG_OP = 'INSERT') THEN
    v_record_id := NEW.id;
    v_old := NULL;
    v_new := to_jsonb(NEW);
  ELSE
    v_record_id := NEW.id;
    v_old := to_jsonb(OLD);
    v_new := to_jsonb(NEW);
  END IF;

  -- Filter out sensitive authentication tokens/passwords if any
  IF v_old IS NOT NULL THEN
    v_old := v_old - 'password' - 'token' - 'secret';
  END IF;
  IF v_new IS NOT NULL THEN
    v_new := v_new - 'password' - 'token' - 'secret';
  END IF;

  INSERT INTO audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data,
    created_at
  ) VALUES (
    v_user_id,
    v_action,
    TG_TABLE_NAME,
    v_record_id,
    v_old,
    v_new,
    NOW()
  );

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Attach audit triggers to sensitive and critical operational tables
DROP TRIGGER IF EXISTS audit_patients_trigger ON patients;
CREATE TRIGGER audit_patients_trigger
AFTER INSERT OR UPDATE OR DELETE ON patients
FOR EACH ROW EXECUTE FUNCTION log_institutional_audit();

DROP TRIGGER IF EXISTS audit_membership_trigger ON membership_applications;
CREATE TRIGGER audit_membership_trigger
AFTER INSERT OR UPDATE OR DELETE ON membership_applications
FOR EACH ROW EXECUTE FUNCTION log_institutional_audit();

DROP TRIGGER IF EXISTS audit_notices_trigger ON notices;
CREATE TRIGGER audit_notices_trigger
AFTER INSERT OR UPDATE OR DELETE ON notices
FOR EACH ROW EXECUTE FUNCTION log_institutional_audit();

DROP TRIGGER IF EXISTS audit_inventory_trigger ON factor_inventory;
CREATE TRIGGER audit_inventory_trigger
AFTER INSERT OR UPDATE OR DELETE ON factor_inventory
FOR EACH ROW EXECUTE FUNCTION log_institutional_audit();
