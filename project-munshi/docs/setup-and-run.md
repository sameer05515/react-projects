# Setup and Run Guide

This guide explains how to run Project Munshi locally.

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- MongoDB running locally on `localhost:27017`

## Backend Setup

1. Go to backend folder:

```bash
cd backend
```

2. Verify MongoDB config in `src/main/resources/application.yml`:

- URI: `mongodb://localhost:27017/munshi`
- Database: `munshi`

3. Start backend:

```bash
mvn spring-boot:run
```

4. Verify backend:

- Health: `http://localhost:8080/api/health` (JSON: `status`, `message`)
- Projects API: `http://localhost:8080/api/projects`
- Swagger UI (SpringDoc): try `http://localhost:8080/swagger-ui.html` or `http://localhost:8080/swagger-ui/index.html` depending on your SpringDoc version; the redirect usually lands on the working path.

## Frontend Setup

1. Go to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

4. Open app:

- `http://localhost:3000`

## Environment and proxy

- The frontend calls the API with a **relative** base path `/api` (see `src/services/projectApi.ts`).
- In dev, **Vite** proxies `/api` to `http://localhost:8080` (see `frontend/vite.config.ts`), so the browser only talks to the Vite origin.
- In **production**, serve the built SPA and configure your host or env so `/api` reaches the real backend (reverse proxy, same origin, or an explicit API URL if you change the client).

## Project layout

```
project-munshi/
  backend/          Spring Boot + MongoDB
  frontend/         React + TypeScript + Vite
  docs/             Guides (this folder)
```

## Common Commands

### Backend

```bash
mvn test
mvn clean package
```

### Frontend

```bash
npm run lint
npm run build
npm run preview
```

## Troubleshooting

### Backend not connecting to MongoDB

- Confirm MongoDB is running
- Confirm URI and database name in `application.yml`

### Frontend cannot call backend

- Confirm backend is running on port `8080`
- Confirm Vite proxy config in `frontend/vite.config.ts`

### Port conflict

- Start frontend on another port:

```bash
npm run dev -- --port 3001
```

