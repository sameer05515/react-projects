# Backend API reference

Base URL (local): `http://localhost:8080`

All JSON endpoints use `Content-Type: application/json` unless noted.

## Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Liveness check. Returns JSON such as `status: UP` and a short `message`. |

## Projects

Project endpoints are under `/api/projects`.

## Project Model

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | No | Auto-generated |
| `name` | string | Yes | Project name |
| `description` | string | No | Supports markdown text from frontend |
| `status` | string | Yes | `ACTIVE`, `COMPLETED`, `ON_HOLD`, `CANCELLED` |
| `startDate` | datetime | Yes | ISO format |
| `endDate` | datetime | No | ISO format |
| `owner` | string | No | Owner name |
| `tags` | string[] | No | Array of tags |
| `createdAt` | datetime | No | Auto-managed |
| `updatedAt` | datetime | No | Auto-managed |
| `deleted` | boolean | No | Stored in MongoDB for soft delete; **not** included in `ProjectResponse` JSON (clients infer removal from list endpoints). |

## Endpoints

### 1) Create project

- **POST** `/api/projects`
- Body: `ProjectRequest`
- Returns: created `ProjectResponse`

### 2) Get all projects

- **GET** `/api/projects`
- Optional query parameter: **`status`** (boolean, default `false`).
  - In the OpenAPI description this flag is documented as **“Include deleted projects”**.
  - `false` (default): return only projects where `deleted` is not true (active list).
  - `true`: return all projects, including soft-deleted ones.

> Naming note: the query parameter is called `status`, but it does **not** filter by project status (`ACTIVE`, `ON_HOLD`, …). Use [Filter by status](#7-filter-by-status) for that.

### 3) Get project by id

- **GET** `/api/projects/{id}`
- Deleted projects are treated as not found.

### 4) Update project

- **PUT** `/api/projects/{id}`
- Body: `ProjectRequest`
- Deleted projects are treated as not found.

### 5) Delete project (soft delete)

- **DELETE** `/api/projects/{id}`
- Does not remove DB record.
- Sets `deleted=true` and updates `updatedAt`.

### 6) Search by name

- **GET** `/api/projects/search?name={name}`
- Returns non-deleted projects only.

### 7) Filter by status

- **GET** `/api/projects/status/{status}`
- Returns non-deleted projects only.

### 8) Filter by owner

- **GET** `/api/projects/owner/{owner}`
- Returns non-deleted projects only.

### 9) Bulk create projects

- **POST** `/api/projects/bulk`
- Body: JSON array of `ProjectRequest` objects
- **201 Created** with body: array of created `ProjectResponse`
- **400** if validation fails on the payload

## Sample Requests

### Create one project

```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Revamp",
    "description": "Rebuild landing page",
    "status": "ACTIVE",
    "startDate": "2026-03-01T00:00:00",
    "owner": "Asha",
    "tags": ["frontend","marketing"]
  }'
```

### Get all non-deleted projects

```bash
curl "http://localhost:8080/api/projects"
```

### Get all projects including deleted

```bash
curl "http://localhost:8080/api/projects?status=true"
```

### Bulk create

```bash
curl -X POST http://localhost:8080/api/projects/bulk \
  -H "Content-Type: application/json" \
  -d '[
    {
      "name": "CRM Migration",
      "status": "ACTIVE",
      "startDate": "2026-01-10T00:00:00",
      "owner": "Nina"
    },
    {
      "name": "Mobile App QA",
      "status": "ON_HOLD",
      "startDate": "2026-02-01T00:00:00",
      "owner": "Ravi"
    }
  ]'
```

## Request validation (create / update / bulk)

`ProjectRequest` requires:

- `name` — non-blank string  
- `status` — non-blank string (use values like `ACTIVE`, `COMPLETED`, `ON_HOLD`, `CANCELLED`)  
- `startDate` — required non-null datetime  

Optional: `description`, `endDate`, `owner`, `tags` (string array).

## Error behavior

- Validation errors: **400 Bad Request**
- Missing project or soft-deleted project on **GET by id** / **PUT** / **DELETE**: **404** (per service rules)
- Successful soft delete: **204 No Content**
- Unexpected server errors: **500 Internal Server Error**

For response shapes on errors, see `GlobalExceptionHandler` and `ErrorResponse` in the backend source.

