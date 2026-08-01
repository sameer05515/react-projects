-- =====================================================================
-- IQMS Initial Schema
-- Conventions:
--   * UUID (CHAR(36)) primary keys
--   * Soft delete via is_deleted + deleted_date
--   * Optimistic locking via `version`
--   * Auditing via created_date / updated_date / created_by / updated_by
-- =====================================================================

-- ---------------------------------------------------------------------
-- roles
-- ---------------------------------------------------------------------
CREATE TABLE roles (
    id              CHAR(36)     NOT NULL PRIMARY KEY,
    name            VARCHAR(50)  NOT NULL,
    description     VARCHAR(255),
    created_date    DATETIME(6)  NOT NULL,
    updated_date    DATETIME(6),
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_roles_name UNIQUE (name)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- users
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id                   CHAR(36)     NOT NULL PRIMARY KEY,
    username             VARCHAR(50)  NOT NULL,
    email                VARCHAR(150) NOT NULL,
    password             VARCHAR(255) NOT NULL,
    first_name           VARCHAR(100),
    last_name            VARCHAR(100),
    avatar_url            VARCHAR(500),
    enabled              BOOLEAN      NOT NULL DEFAULT TRUE,
    account_non_locked   BOOLEAN      NOT NULL DEFAULT TRUE,
    failed_login_attempts INT         NOT NULL DEFAULT 0,
    password_reset_token  VARCHAR(255),
    password_reset_expiry DATETIME(6),
    theme_preference      VARCHAR(20) NOT NULL DEFAULT 'LIGHT',
    is_deleted           BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date         DATETIME(6),
    created_date         DATETIME(6)  NOT NULL,
    updated_date         DATETIME(6),
    created_by           VARCHAR(100),
    updated_by           VARCHAR(100),
    version              BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_users_username UNIQUE (username),
    CONSTRAINT uk_users_email UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE user_roles (
    user_id CHAR(36) NOT NULL,
    role_id CHAR(36) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
    id           CHAR(36)     NOT NULL PRIMARY KEY,
    token        VARCHAR(500) NOT NULL,
    user_id      CHAR(36)     NOT NULL,
    expiry_date  DATETIME(6)  NOT NULL,
    revoked      BOOLEAN      NOT NULL DEFAULT FALSE,
    created_date DATETIME(6)  NOT NULL,
    CONSTRAINT uk_refresh_tokens_token UNIQUE (token),
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- technologies / categories / companies / tags (lookup tables)
-- ---------------------------------------------------------------------
CREATE TABLE technologies (
    id           CHAR(36)     NOT NULL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    slug         VARCHAR(120) NOT NULL,
    icon         VARCHAR(255),
    description  VARCHAR(500),
    is_deleted   BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date DATETIME(6),
    created_date DATETIME(6)  NOT NULL,
    updated_date DATETIME(6),
    created_by   VARCHAR(100),
    updated_by   VARCHAR(100),
    version      BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_technologies_name UNIQUE (name),
    CONSTRAINT uk_technologies_slug UNIQUE (slug)
) ENGINE=InnoDB;

CREATE TABLE categories (
    id           CHAR(36)     NOT NULL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    slug         VARCHAR(120) NOT NULL,
    description  VARCHAR(500),
    is_deleted   BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date DATETIME(6),
    created_date DATETIME(6)  NOT NULL,
    updated_date DATETIME(6),
    created_by   VARCHAR(100),
    updated_by   VARCHAR(100),
    version      BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_categories_name UNIQUE (name),
    CONSTRAINT uk_categories_slug UNIQUE (slug)
) ENGINE=InnoDB;

CREATE TABLE companies (
    id           CHAR(36)     NOT NULL PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    slug         VARCHAR(170) NOT NULL,
    logo_url     VARCHAR(500),
    website      VARCHAR(255),
    is_deleted   BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date DATETIME(6),
    created_date DATETIME(6)  NOT NULL,
    updated_date DATETIME(6),
    created_by   VARCHAR(100),
    updated_by   VARCHAR(100),
    version      BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_companies_name UNIQUE (name),
    CONSTRAINT uk_companies_slug UNIQUE (slug)
) ENGINE=InnoDB;

CREATE TABLE tags (
    id           CHAR(36)     NOT NULL PRIMARY KEY,
    name         VARCHAR(60)  NOT NULL,
    slug         VARCHAR(80)  NOT NULL,
    is_deleted   BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date DATETIME(6),
    created_date DATETIME(6)  NOT NULL,
    updated_date DATETIME(6),
    created_by   VARCHAR(100),
    updated_by   VARCHAR(100),
    version      BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT uk_tags_name UNIQUE (name),
    CONSTRAINT uk_tags_slug UNIQUE (slug)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- questions
-- ---------------------------------------------------------------------
CREATE TABLE questions (
    id               CHAR(36)      NOT NULL PRIMARY KEY,
    title            VARCHAR(255)  NOT NULL,
    question         TEXT          NOT NULL,
    answer           LONGTEXT,
    code_snippet     LONGTEXT,
    code_language    VARCHAR(40),
    technology_id    CHAR(36),
    category_id      CHAR(36),
    company_id       CHAR(36),
    difficulty       VARCHAR(20)   NOT NULL DEFAULT 'MEDIUM',
    status           VARCHAR(20)   NOT NULL DEFAULT 'DRAFT',
    experience       TEXT,
    is_favorite      BOOLEAN       NOT NULL DEFAULT FALSE,
    is_bookmarked    BOOLEAN       NOT NULL DEFAULT FALSE,
    confidence       INT           NOT NULL DEFAULT 0,
    last_revised      DATETIME(6),
    next_revision     DATETIME(6),
    revision_count    INT           NOT NULL DEFAULT 0,
    is_deleted       BOOLEAN       NOT NULL DEFAULT FALSE,
    deleted_date     DATETIME(6),
    created_date     DATETIME(6)   NOT NULL,
    updated_date     DATETIME(6),
    created_by       VARCHAR(100),
    updated_by       VARCHAR(100),
    version          BIGINT        NOT NULL DEFAULT 0,
    CONSTRAINT fk_questions_technology FOREIGN KEY (technology_id) REFERENCES technologies(id),
    CONSTRAINT fk_questions_category   FOREIGN KEY (category_id)   REFERENCES categories(id),
    CONSTRAINT fk_questions_company    FOREIGN KEY (company_id)    REFERENCES companies(id)
) ENGINE=InnoDB;

CREATE INDEX idx_questions_technology ON questions(technology_id);
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_questions_company ON questions(company_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_next_revision ON questions(next_revision);
CREATE FULLTEXT INDEX idx_questions_fulltext ON questions(title, question, answer);

CREATE TABLE question_tags (
    question_id CHAR(36) NOT NULL,
    tag_id      CHAR(36) NOT NULL,
    PRIMARY KEY (question_id, tag_id),
    CONSTRAINT fk_question_tags_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT fk_question_tags_tag FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- interview_experiences
-- ---------------------------------------------------------------------
CREATE TABLE interview_experiences (
    id              CHAR(36)     NOT NULL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    company_id      CHAR(36),
    role            VARCHAR(150),
    round_details   LONGTEXT,
    outcome         VARCHAR(30)  NOT NULL DEFAULT 'PENDING',
    interview_date  DATE,
    rating          INT,
    is_deleted      BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date    DATETIME(6),
    created_date    DATETIME(6)  NOT NULL,
    updated_date    DATETIME(6),
    created_by      VARCHAR(100),
    updated_by      VARCHAR(100),
    version         BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT fk_experiences_company FOREIGN KEY (company_id) REFERENCES companies(id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- revisions (spaced-repetition history)
-- ---------------------------------------------------------------------
CREATE TABLE revisions (
    id             CHAR(36)    NOT NULL PRIMARY KEY,
    question_id    CHAR(36)    NOT NULL,
    revised_date   DATETIME(6) NOT NULL,
    confidence     INT         NOT NULL,
    next_revision  DATETIME(6),
    interval_days  INT         NOT NULL DEFAULT 1,
    notes          VARCHAR(500),
    created_date   DATETIME(6) NOT NULL,
    created_by     VARCHAR(100),
    version        BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT fk_revisions_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_revisions_question ON revisions(question_id);

-- ---------------------------------------------------------------------
-- attachments
-- ---------------------------------------------------------------------
CREATE TABLE attachments (
    id             CHAR(36)     NOT NULL PRIMARY KEY,
    question_id    CHAR(36)     NOT NULL,
    file_name      VARCHAR(255) NOT NULL,
    file_type      VARCHAR(100),
    file_size      BIGINT,
    storage_path   VARCHAR(500) NOT NULL,
    is_deleted     BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_date   DATETIME(6),
    created_date   DATETIME(6)  NOT NULL,
    created_by     VARCHAR(100),
    version        BIGINT       NOT NULL DEFAULT 0,
    CONSTRAINT fk_attachments_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- notes
-- ---------------------------------------------------------------------
CREATE TABLE notes (
    id           CHAR(36)    NOT NULL PRIMARY KEY,
    question_id  CHAR(36)    NOT NULL,
    content      TEXT        NOT NULL,
    is_deleted   BOOLEAN     NOT NULL DEFAULT FALSE,
    deleted_date DATETIME(6),
    created_date DATETIME(6) NOT NULL,
    updated_date DATETIME(6),
    created_by   VARCHAR(100),
    updated_by   VARCHAR(100),
    version      BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT fk_notes_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- audit_logs
-- ---------------------------------------------------------------------
CREATE TABLE audit_logs (
    id            CHAR(36)     NOT NULL PRIMARY KEY,
    entity_name   VARCHAR(100) NOT NULL,
    entity_id     CHAR(36)     NOT NULL,
    action        VARCHAR(20)  NOT NULL,
    performed_by  VARCHAR(100),
    old_value     LONGTEXT,
    new_value     LONGTEXT,
    ip_address    VARCHAR(45),
    created_date  DATETIME(6)  NOT NULL,
    CONSTRAINT idx_audit_logs_entity UNIQUE (id)
) ENGINE=InnoDB;

CREATE INDEX idx_audit_logs_entity_lookup ON audit_logs(entity_name, entity_id);
CREATE INDEX idx_audit_logs_created_date ON audit_logs(created_date);
