# Version details

This workspace does **not** pin one global Node or React version for every folder. Each sample app or library declares its own stack in `package.json`, `pom.xml`, or similar.

## How to check versions for any subproject

- **Node / npm packages**: Open that folder’s `package.json` and read `dependencies` and `devDependencies`.
- **Java / Spring Boot**: Open `pom.xml` and check `<parent>` (Spring Boot) and `<java.version>`.
- **TypeScript**: Usually in `devDependencies` as `typescript`.

## Reference: project-munshi (pinned in repo)

These are indicative of what the Munshi app was built against; re-run installs to pick up compatible patch updates within semver ranges.

### Frontend (`project-munshi/frontend`)

| Tool / library | Typical range in repo |
|----------------|------------------------|
| Node.js | **18+** (see [setup-and-run.md](./project-munshi/docs/setup-and-run.md)) |
| React | ^18.2.0 |
| TypeScript | ^5.2.2 |
| Vite | ^5.0.8 |
| React Router | ^6.20.0 |
| marked | ^17.x |
| prismjs | ^1.30.x |
| papaparse | ^5.5.x |

### Backend (`project-munshi/backend`)

| Tool / library | Version |
|----------------|---------|
| Java | **17** |
| Spring Boot | **3.2.0** (parent POM) |
| SpringDoc OpenAPI (Swagger UI) | **2.3.0** |

## React and Node (general guidance)

- Prefer **current Node LTS** for new work; older tutorials in `learn-react` may still run on newer Node with occasional dependency warnings.
- React **18** is common across newer folders; some legacy CRA apps may differ—always read that folder’s README and `package.json`.

## Keeping this file accurate

When you upgrade a flagship project (e.g. Munshi), update the tables above. For the rest of the monorepo, rely on per-project `package.json` / `pom.xml` as the source of truth.
