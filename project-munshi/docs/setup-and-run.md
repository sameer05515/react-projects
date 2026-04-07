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

- API: `http://localhost:8080/api/projects`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

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

## Environment and Proxy Notes

- Frontend API base is `/api`.
- Vite proxy forwards `/api/*` to `http://localhost:8080`.
- In production, point frontend API calls to your deployed backend URL.

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

