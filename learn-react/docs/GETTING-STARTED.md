# Getting started with `learn-react` projects

This folder is a **collection of independent samples**. There is **no root `package.json`** for all of `learn-react` at once. Each runnable app lives in its own directory (sometimes nested).

## General workflow

1. **Open the project folder** listed in [PROJECT-CATALOG.md](./PROJECT-CATALOG.md) under **Run from**.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server using that folder’s `package.json` **scripts** (see below).

If `npm install` fails, try the Node version recommended on the [main repo version notes](../../version-details.md) or use **Node LTS**; very old CRA templates may need older Node (see that project’s `package.json` / lockfile age).

## Create React App (`react-scripts`)

Most samples use **Create React App**. Typical scripts:

| Script | Purpose |
|--------|---------|
| `npm start` | Dev server (often port **3000**) |
| `npm test` | Tests |
| `npm run build` | Production build |

**Port in use:** set `PORT` (see notes in [Readme.md](../Readme.md#create-react-app-tool) in this folder) or stop the other process.

## Vite

Projects such as `react-ts-basics`, `jsx-renderer`, `my-resume-vite-app`, and `my-library-testing-vite-ts-lib-imported-in-js-proj` use Vite:

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (often **5173**) |
| `npm run build` | Build |
| `npm run preview` | Preview production build |

## Other tooling

- **Snowpack:** `graphql-full-course/client` uses `npm start` → `snowpack dev`.
- **Webpack library build:** `common-components` uses `npm run build` (no standard dev server in `package.json`; it is a bundled library).
- **TypeScript only:** `react-with-ts-ex1` compiles with `npm run compile-ts` (no SPA server).
- **Node/Express only:** folders like `GQL-Demo/graphql-sum-numbers`, `tasks-mgmt/TasksRest`, `react-express-mysql` expose `npm start` or `node`/`nodemon` entrypoints—read that folder’s `package.json` and README.

## Monorepos and nested frontends

Some directories contain **multiple** apps:

| Area | Notes |
|------|--------|
| **TweetApp** | Several frontends + backends; see [TWEETAPP-OVERVIEW.md](./TWEETAPP-OVERVIEW.md). |
| **builderbook** | Main app under `builderbook/`; book chapter code under `book/` (many `package.json` files). |
| **GQL-Demo** | CRA app in `graphql-sum-app/`; GraphQL server in `graphql-sum-numbers/`. |
| **rest-service-consumer** | `frontend/` (CRA), `backend/`, `api-testing/`. |
| **tasks-mgmt** | `my-tasks/` (CRA) and `TasksRest/` (Express API). |
| **dynamic-form-generation-proj** | GUI in `frontend/dynamic-form-generator-gui/`. |
| **ChatApp** | GUI in `my-chat-app-gui/`; WebSocket API in `my-chat-app-backend/websocket-api/`. |

Always **cd** into the path in the catalog before `npm install`.

## Backend services

Full-stack demos may need **MongoDB**, **MySQL**, or other services. Check each project’s README (TweetApp, `react-express-mysql`, `tasks-mgmt`, etc.) for connection strings and Docker commands.

## Where to look next

- [PROJECT-CATALOG.md](./PROJECT-CATALOG.md) — full list of projects and topics.
- [TWEETAPP-OVERVIEW.md](./TWEETAPP-OVERVIEW.md) — layout of the large TweetApp workspace.
- [../Readme.md](../Readme.md) — long-form React study notes (Academind course, hooks, links).
