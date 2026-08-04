
+ IQMS — Interview Question Management System

Enterprise-grade personal interview-prep platform: questions, answers, code
snippets, interview experiences, spaced-repetition revisions, and analytics.

This repository is being built **incrementally, phase by phase**. This
README reflects **Phase 1 (Foundation) + Phase 2 (Authentication)**.

## Phase 2 scope (this delivery)

- Backend
  - `User`, `Role`, `RefreshToken` entities + repositories (`RefreshToken` is
    hashed with SHA-256 before persisting — a DB dump alone can't be used to
    forge a session)
  - `V3__alter_roles_add_audit_columns.sql` — fixes a Phase 1 schema gap where
    `roles` was missing the audit/soft-delete columns `BaseEntity` requires
  - `JwtTokenProvider` (HMAC-signed access + refresh JWTs), `JwtAuthenticationFilter`,
    `UserPrincipal` adapter, custom JSON 401/403 handlers, a Bucket4j
    `RateLimitingFilter` scoped to `/api/auth/**`
  - `AuthServiceImpl`: register, login (with 5-attempt account lockout),
    refresh (rotates the token on every use), logout (revokes it), forgot/reset
    password (single-use, 30-minute token, doesn't leak account existence)
  - Refresh tokens travel as an `HttpOnly`/`SameSite=Strict` cookie scoped to
    `/api/auth`; access tokens are returned in the JSON body for the frontend
    to hold in memory (see Phase 1's `apiClient.js`)
  - `AuthController` (`/api/auth/register|login|refresh|logout|forgot-password|reset-password`),
    `UserController` (`/api/users/me`, `/api/users/me/theme`)
  - `SecurityConfig` fully wired: stateless JWT auth, `@EnableMethodSecurity`
    for future `@PreAuthorize` rules, public allow-list for `/api/auth/**` +
    Swagger + health
  - Tests: `JwtTokenProviderTest` and `AuthServiceImplTest` (Mockito, every
    branch — duplicate checks, lockout, rotation, expiry), plus
    `AuthControllerIntegrationTest` (MockMvc + H2, no mocks) covering the full
    register → login → refresh-rotation → logout flow and rejecting a reused
    (rotated-away) refresh token
- Frontend
  - `authService.js`, Zod schemas mirroring the backend's password/username
    rules, `AuthContext` (silent-refresh bootstrap on load using the
    `HttpOnly` cookie), `ProtectedRoute`
  - `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `ResetPasswordPage`,
    plus a temporary `HomePage` behind the protected route so the full loop
    (login → protected page → logout) is demonstrable before real app pages exist
  - Fixed a bug in the Phase 1 Axios interceptor: a failed silent refresh on
    initial page load was recursively retrying and force-navigating to
    `/login` even for a visitor with no session at all

## Project structure

```
iqms/
├── backend/
│   └── src/main/java/com/iqms/
│       ├── config/          SecurityConfig, JwtProperties, CorsConfig, RedisConfig, OpenApiConfig, AuditorAwareImpl
│       ├── controller/       AuthController, UserController
│       ├── dto/               request | response | common
│       ├── entity/             BaseEntity, User, Role, RefreshToken
│       ├── exception/          domain exceptions + GlobalExceptionHandler
│       ├── mapper/             UserMapper (MapStruct)
│       ├── repository/         UserRepository, RoleRepository, RefreshTokenRepository
│       ├── security/           JwtTokenProvider, JwtAuthenticationFilter, UserPrincipal, CookieUtil, RateLimitingFilter, ...
│       ├── service / service/impl  AuthService, UserService, EmailService
│       └── util/               RoleConstants, CacheNames, TokenHashUtil
│   └── src/main/resources/db/migration/  V1 (schema), V2 (seed roles), V3 (roles audit-column fix)
├── frontend/
│   └── src/
│       ├── contexts/           ThemeModeContext, AuthContext
│       ├── layouts/             AuthLayout
│       ├── pages/                HomePage, auth/{Login,Register,ForgotPassword,ResetPassword}Page
│       ├── routes/               ProtectedRoute
│       ├── schemas/              authSchemas (Zod)
│       ├── services/             apiClient, authService, queryClient
│       └── theme/                light/dark MUI theme
├── docker/nginx/               top-level reverse-proxy config
├── .github/workflows/ci.yml
└── docker-compose.yml
```

## Running Phase 1 + 2 locally

### Docker Compose (recommended)

```bash
cp .env.example .env
# edit .env: set DB_PASSWORD, JWT_SECRET (openssl rand -base64 64), mail creds if you want real reset emails

docker compose up --build
```

- App (via proxy): http://localhost/ → redirects to `/login`
- Swagger UI: http://localhost:8080/swagger-ui.html — try `POST /api/auth/register`, then click "Authorize" with the returned `accessToken` to call `/api/users/me`
- Health check: http://localhost:8080/actuator/health

### Running backend tests

```bash
cd backend
mvn test
```

This runs `IqmsApplicationTests`, `JwtTokenProviderTest`, `AuthServiceImplTest`,
and `AuthControllerIntegrationTest` against the H2 `test` profile — no
external database needed.

> **Note on this sandbox:** as with Phase 1, this environment has no network
> access and no Maven/Node installed, so I could not execute `mvn test` /
> `npm run build` here to hand you a real log. Every file was written
> carefully and cross-checked (brace-balance, import, and constructor-order
> sanity passes), but please run the commands above and tell me if anything
> doesn't come up clean — I'll fix it before Phase 3.

## What's intentionally NOT in Phase 2

- No `Question`/`Technology`/`Category`/`Company`/`Tag` entities or endpoints yet
- No admin-only user management (listing/editing/deleting other users) —
  only self-service `/api/users/me`
- `RateLimitingFilter`'s token buckets are in-memory only; documented in its
  Javadoc as needing a Redis-backed Bucket4j proxy manager before running
  more than one backend replica

## Next: Phase 3 — Technology Module

CRUD for `Technology` (the first lookup/reference module), establishing the
controller → service → repository → entity → mapper pattern the remaining
lookup modules (Category, Company, Tag) will all follow.

**Waiting for your approval to proceed to Phase 3.**
