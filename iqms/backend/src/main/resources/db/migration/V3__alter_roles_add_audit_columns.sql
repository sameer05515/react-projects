-- Phase 1 shipped `roles` without the created_by/updated_by/soft-delete
-- columns that every other lookup table (technologies, categories,
-- companies, tags) has, and that BaseEntity requires of every entity that
-- extends it. Role extends BaseEntity for consistency with the rest of the
-- codebase, so bring the schema in line here rather than editing V1.
ALTER TABLE roles
    ADD COLUMN created_by VARCHAR(100) AFTER version,
    ADD COLUMN updated_by VARCHAR(100) AFTER created_by,
    ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE AFTER updated_by,
    ADD COLUMN deleted_date DATETIME(6) AFTER is_deleted;
