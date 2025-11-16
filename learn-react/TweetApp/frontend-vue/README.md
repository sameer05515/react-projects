# TweetApp - Vue Frontend

A minimal Vue 3 + Vite frontend wired to `http://localhost:3003` with login, signup, token storage, axios interceptors, and route guards.

## Scripts

- `pnpm i` or `npm i` or `yarn`
- `npm run dev` → http://localhost:5174
- `npm run build`
- `npm run preview` → http://localhost:4174

## Environment

You can override API base URL:

```
VITE_API_BASE_URL=http://localhost:3003
```

## API Endpoints

According to Swagger under “User”:

- `POST /users/login` → body `{ username, password }` → returns `{ token }`
- `POST /users/register` → body `{ username, password, email }` → returns `{}` with 201
- Errors typically return `{ error: string }`

Bearer token is sent via `Authorization: Bearer <token>`. 401 responses auto-logout and redirect to `/login`.


