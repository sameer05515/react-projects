# Key terminologies

Short definitions for terms you will see across this repository and in React documentation.

## React core

| Term | Meaning |
|------|---------|
| **Component** | A reusable UI piece: a function (or class) that returns elements. |
| **JSX** | Syntax that looks like HTML in JavaScript; compiled to `React.createElement` calls. |
| **Props** | Read-only inputs passed from parent to child. |
| **State** | Data owned by a component that can change over time and triggers re-renders when updated (e.g. `useState`). |
| **Hook** | Functions starting with `use` that let function components use state, effects, context, etc. (`useState`, `useEffect`, …). |
| **Effect** | Side work tied to the component lifecycle (API calls, subscriptions, DOM sync), usually via `useEffect`. |
| **Context** | A way to pass data through the tree without prop-drilling at every level (`createContext`, `useContext`). |
| **Ref** | A mutable box (e.g. `useRef`) often used for DOM nodes or values that should not trigger re-renders when changed. |
| **Controlled component** | An input whose value is driven by React state; updates flow through `onChange` → `setState`. |
| **Key (lists)** | A stable identifier in lists so React can reconcile items efficiently; avoid using array index when order changes. |

## Rendering and performance

| Term | Meaning |
|------|---------|
| **Virtual DOM** | React’s lightweight description of UI used to diff against the previous render and update the real DOM. |
| **Reconciliation** | The process of comparing virtual trees and applying minimal DOM updates. |
| **Memoization** | Caching a computed result (`useMemo`) or a callback (`useCallback`) to avoid redundant work. |
| **`React.memo`** | Higher-order component that skips re-rendering a child if props are shallow-equal. |

## Ecosystem and tooling

| Term | Meaning |
|------|---------|
| **Bundler** | Tool that bundles modules for the browser (e.g. Webpack, Vite’s Rollup-based build). |
| **Transpiler** | Converts modern JS/TS to a target version (e.g. Babel, TypeScript compiler). |
| **HMR** | Hot Module Replacement: updates modules in the browser without a full page reload (strong in Vite). |
| **ESLint** | Linter for JavaScript/TypeScript; enforces style and catches common bugs. |
| **RTL (React Testing Library)** | Encourages testing components as users interact with them (queries by role/label, not implementation details). |

## Data and APIs

| Term | Meaning |
|------|---------|
| **REST** | HTTP resources with verbs (GET/POST/PUT/DELETE) and JSON bodies; Munshi’s backend uses this style. |
| **BFF** | Backend for Frontend: an API tailored to a specific client’s needs. |
| **CRUD** | Create, Read, Update, Delete operations on resources. |

## Munshi-specific (soft delete)

| Term | Meaning |
|------|---------|
| **Soft delete** | Marking a record as deleted (`deleted: true`) instead of removing it from the database; Munshi uses this for projects. |

For official definitions and patterns, start with [React documentation](https://react.dev/) and the links in [documentation.md](./documentation.md).
