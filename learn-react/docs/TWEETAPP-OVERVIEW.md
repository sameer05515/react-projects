# TweetApp workspace overview

`TweetApp/` is the largest subtree under `learn-react`. It contains **multiple client stacks** and **multiple backends**, used as a playground for APIs, hooks, and cross-framework experiments—not a single installable app at the repo root.

## Frontends

| Path | Stack | Notes |
|------|--------|--------|
| [frontend/](../TweetApp/frontend/) | React (CRA), JavaScript | Primary JS client; Redux, hooks, large `src/` tree. See [frontend/README.md](../TweetApp/frontend/README.md). |
| [frontend-react-ts/](../TweetApp/frontend-react-ts/) | React (CRA), TypeScript | TS variant; see [frontend-react-ts/README.md](../TweetApp/frontend-react-ts/README.md). |
| [frontend-vue/](../TweetApp/frontend-vue/) | Vue 3, Vite | See [frontend-vue/README.md](../TweetApp/frontend-vue/README.md). |
| [frontend-angular/](../TweetApp/frontend-angular/) | Angular | Separate CLI workspace. See [frontend-angular/README.md](../TweetApp/frontend-angular/README.md). |

Inside the React folders you will find shared-style documentation under paths such as `src/common/best-practices/` and custom hooks (for example `useConsolidated`, `useSPPNavigation`—see root [references.md](../../references.md)).

## Backends

| Path | Stack | Notes |
|------|--------|--------|
| [backend/](../TweetApp/backend/) | Node.js | See backend `package.json` and any env samples for MongoDB/API setup. |
| [backend-spring-boot-2/](../TweetApp/backend-spring-boot-2/) | Spring Boot | Alternative Java API; see [backend-spring-boot-2/README.md](../TweetApp/backend-spring-boot-2/README.md). |

## Root README

The file [TweetApp/Readme.md](../TweetApp/Readme.md) focuses on **Docker Compose** commands and operational troubleshooting (for example MongoDB connection inside containers). Use it when running the stack with `docker-compose`, not as a feature list for the UI.

## Suggested approach

1. Pick **one** frontend (e.g. `frontend` or `frontend-react-ts`).
2. Pick **one** backend that matches your local or Docker setup.
3. `cd` into that app’s folder, `npm install`, then follow that folder’s README for env vars and `npm start` / `ng serve` / etc.

Cross-origin and API base URLs vary by project; align the client’s API configuration with whichever backend you run.
