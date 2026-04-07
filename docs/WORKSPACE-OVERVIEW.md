# Workspace overview

This repository is a **monorepo-style learning workspace**: many independent folders, each with its own `package.json` or build files. There is no single root `npm install`; you open and run projects **per folder**.

## Top-level areas

| Directory | Purpose |
|-----------|---------|
| [learn-react](../learn-react/) | Largest area: CRA/Vite apps, Redux, GraphQL, TweetApp, tutorials, and small experiments. Each subfolder is usually self-contained. **Indexed in** [learn-react/docs/PROJECT-CATALOG.md](../learn-react/docs/PROJECT-CATALOG.md). |
| [learn-react-and-next-ts](../learn-react-and-next-ts/) | Next.js and TypeScript examples (e.g. `next-ts-basics`, `spp-tweet-app-with-next-ts`). |
| [learn-to-create-react-library](../learn-to-create-react-library/) | Publishing React libraries with Vite/Rollup, Storybook, and playground apps. |
| [learn-to-create-utility-library](../learn-to-create-utility-library/) | TypeScript utility libraries (e.g. Vite-based `ts-library-with-vite`). |
| [learn-to-test-react-components](../learn-to-test-react-components/) | Jest, Vitest, RTL, mocking, TDD examples, and troubleshooting notes. |
| [learn-to-use-material-ui](../learn-to-use-material-ui/) | Material UI learning samples. |
| [learn-typescript](../learn-typescript/) | TypeScript-only or TS-first small projects. |
| [project-munshi](../project-munshi/) | **Full-stack reference app**: React (Vite) + Spring Boot + MongoDB. See [project-munshi README](../project-munshi/README.md). |
| [problem-mgmt-nosql-frontend](../problem-mgmt-nosql-frontend/) | Frontend app (Vite) related to problem management. |
| [node-service-frontend](../node-service-frontend/) | Node-oriented frontend utilities/components. |
| [Interview-questions-metadata](../Interview-questions-metadata/) | Curated interview notes and metadata (separate from React tutorials). |

## Suggested learning paths

1. **React fundamentals** — Start in `learn-react` with smaller apps (e.g. calculator, routing demos), then larger ones as needed.
2. **Testing** — Use `learn-to-test-react-components`; read [Common-Error-Warnings-And-Troubleshooting.md](../learn-to-test-react-components/Common-Error-Warnings-And-Troubleshooting.md) when tests fail in unfamiliar ways.
3. **Libraries** — Follow `learn-to-create-react-library` and `learn-to-create-utility-library` when you need publishable packages and local playground consumption.
4. **Full-stack** — Run [project-munshi](../project-munshi/) end-to-end using [setup-and-run.md](../project-munshi/docs/setup-and-run.md).

## Root documentation index

| File | Contents |
|------|----------|
| [Readme.md](../Readme.md) | Goals, prerequisites, active vs planned modules, highlights. |
| [documentation.md](../documentation.md) | Curated links to official docs (React, testing, build tools, APIs). |
| [references.md](../references.md) | Videos and articles (planned vs completed). |
| [version-details.md](../version-details.md) | How versions are managed across this repo. |
| [key-terminologies.md](../key-terminologies.md) | Short glossary for React and related tooling. |
| [React-Optimization-Tips.md](../React-Optimization-Tips.md) | Performance-oriented notes. |

## Working effectively in this repo

- **Dependencies**: Run `npm install` (or `pnpm`/`yarn` if the project uses them) inside the **project folder** that contains `package.json`.
- **Ports**: Multiple apps default to `3000` or `5173`; if a port is busy, use the CLI flag documented in that project’s README or Vite/React scripts.
- **Git**: Treat each subdirectory as a potential mini-project; commits often touch one area at a time to keep history readable.
