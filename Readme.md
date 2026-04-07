# Learn to Create React Projects

A curated workspace for learning and building React projects, including libraries, utilities, testing patterns, and full-stack sample apps.

## Documentation map

| Document | Description |
|----------|-------------|
| [docs/WORKSPACE-OVERVIEW.md](./docs/WORKSPACE-OVERVIEW.md) | What lives in each top-level folder and suggested learning paths. |
| [documentation.md](./documentation.md) | Curated links to official docs (React, testing, bundlers, APIs). |
| [references.md](./references.md) | Videos and articles (planned vs completed). |
| [version-details.md](./version-details.md) | How versions work in this monorepo; Munshi stack snapshot. |
| [key-terminologies.md](./key-terminologies.md) | Glossary for React and common tooling terms. |
| [project-munshi](./project-munshi) | Full-stack app: [README](./project-munshi/README.md) and [docs/](./project-munshi/docs/) (setup, API, frontend, CSV, architecture). |

## Prerequisites

Before starting, make sure you have:

- Basic JavaScript, HTML, and CSS knowledge
- Latest LTS [Node.js](https://nodejs.org/) (`npm` is included)
- Git basics
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)
- Familiarity with browser DevTools
- React fundamentals (components, props, state, hooks)
- Optional: TypeScript basics

## learn-react folder

Dozens of sample apps live under [learn-react](./learn-react/). See the **[project catalog](./learn-react/docs/PROJECT-CATALOG.md)** and [getting started](./learn-react/docs/GETTING-STARTED.md) guide there.

## Active Modules

- `In-Progress`: [learn-to-create-react-library](./learn-to-create-react-library)
- `In-Progress`: [learn-to-create-utility-library](./learn-to-create-utility-library)
- `In-Progress`: [project-munshi](./project-munshi)

## Planned Modules

- [learn-to-test-react-components](./learn-to-test-react-components)
- [learn-to-use-material-ui](./learn-to-use-material-ui)
- [learn-to-integrate-redux](./learn-to-integrate-redux)
- [learn-to-build-react-forms](./learn-to-build-react-forms)
- [learn-to-implement-routing-with-react-router](./learn-to-implement-routing-with-react-router)
- [learn-to-implement-server-side-rendering](./learn-to-implement-server-side-rendering)
- [learn-to-use-tailwind-css-with-react](./learn-to-use-tailwind-css-with-react)

## Highlight: project-munshi

`project-munshi` is a full-stack project (React + Spring Boot + MongoDB) for project management.

Recent implemented capabilities:

- Soft delete support for projects (`deleted: true/false`)
- Optional API query handling for status/deleted filtering
- Markdown description rendering using `marked` + syntax highlight using `prismjs`
- Delete confirmation popup before project delete
- Bulk project creation from CSV import

## Additional Topics to Explore

- Debugging React applications
- Performance optimization in React apps
- Core and advanced React hooks
- Creating reusable custom hooks
- Testing with Jest and React Testing Library
- API integration using Fetch/Axios
- Styling approaches (CSS Modules, Styled Components, Emotion)

## Learning Resources

- [Learn X in Y Minutes playlist](https://www.youtube.com/watch?v=iiADhChRriM&list=PLZlA0Gpn_vH85jM1TWO6TdCtSr6ruglWn)
- [references.md](./references.md)
- [documentation.md](./documentation.md)
- [version-details.md](./version-details.md)
- [key-terminologies.md](./key-terminologies.md)

