-- Seed default roles required by RBAC. Fixed UUIDs so application code can
-- reference them deterministically (see com.iqms.util.RoleConstants).
INSERT INTO roles (id, name, description, created_date, version) VALUES
  ('00000000-0000-0000-0000-000000000001', 'ADMIN', 'Full administrative access to IQMS', UTC_TIMESTAMP(6), 0),
  ('00000000-0000-0000-0000-000000000002', 'USER',  'Standard user with access to personal question bank', UTC_TIMESTAMP(6), 0);
