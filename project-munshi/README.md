# Project Munshi

Project Munshi is a full-stack project management application built with:

- Frontend: React + TypeScript + Vite
- Backend: Spring Boot + MongoDB

It supports project CRUD, soft delete, markdown descriptions, and CSV bulk import.

## Documentation index

- [Architecture](./docs/architecture.md) — layers, data flow, dev vs production
- [Setup and Run Guide](./docs/setup-and-run.md)
- [Backend API Reference](./docs/backend-api.md)
- [Frontend Guide](./docs/frontend-guide.md)
- [CSV Import Guide](./docs/csv-import.md)

## Quick Start

### 1) Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

### 2) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Key Features

- Create, update, view, and search projects
- Soft delete (`deleted=true`) instead of hard delete
- Optional inclusion of deleted projects in list API
- Markdown project descriptions using `marked`
- Code syntax highlighting in descriptions using `prismjs`
- Delete confirmation modal in UI
- CSV import for creating multiple projects in one action

