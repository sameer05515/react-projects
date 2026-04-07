# Backend API Reference

Base URL: `http://localhost:8080`

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
| `deleted` | boolean | No | Soft delete flag, default `false` |

## Endpoints

### 1) Create project

- **POST** `/api/projects`
- Body: `ProjectRequest`
- Returns: created `ProjectResponse`

### 2) Get all projects

- **GET** `/api/projects`
- Optional query param:
  - `status` (boolean, default `false`)
  - `status=false`: only active (not deleted) projects
  - `status=true`: include deleted projects

> Note: Query parameter name is `status`, but behavior controls deleted inclusion.

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
- Body: array of `ProjectRequest`
- Returns: array of created `ProjectResponse`

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

## Error Behavior

- Validation errors: `400 Bad Request`
- Missing/deleted project for ID routes: `404 Not Found` behavior via exception handling
- Unexpected server errors: `500 Internal Server Error`

