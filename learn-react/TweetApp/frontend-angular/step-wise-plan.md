# Step-wise Plan to Mimic UI of `http://localhost:3002`

Goal: Recreate the UX/UI in the new Angular frontend so it matches the existing app at `http://localhost:3002` with functional parity and clean architecture.

## Phase 0 — Discovery & Baseline
- Capture UI inventory (screens, dialogs, flows) from `http://localhost:3002`.
- Note layout primitives (header, sidebar, content, footer), spacing, colors, typography.
- Export/record any design tokens (colors, font sizes, radii) and reusable patterns (cards, tables, forms, menus).
- Identify core feature areas (e.g., Topics, Tasks, Tags, Links, Memory Maps, Auth).
- Confirm API base URL and environment configuration.

Deliverables:
- Screenshot set per screen/flow.
- UI components list and page map.
- Known constraints (3rd-party libs, widgets).

## Phase 1 — Shell, Theme, Navigation
- App shell: header, sidebar, content container with responsive behavior.
- Theme layer: define SCSS variables for colors, spacing, typography.
- Global styles: normalize, typography, utility classes where needed.
- Router structure: lazy-ready route tree and breadcrumbs placeholders.

Deliverables:
- `AppShellComponent` (header, sidebar toggle, content slot).
- Global SCSS variables and base styles.
- Base routes wired and visible in the shell.

## Phase 2 — Page Scaffolding (Read-Only)
- Recreate page layouts to match visual structure of `3002`:
  - Dashboard/Landing (if applicable)
  - Topics list/details
  - Tasks list/details
  - Tags list/details
  - Links list/details
  - Memory Maps list/details
- Use Angular standalone components; stub static content first to match layout/spacing.

Deliverables:
- All pages render with correct layout and placeholders (no interactions yet).

## Phase 3 — Core Components
- Buttons, Inputs, Selects, Textareas, Toggles, Badges/Chips.
- Cards, Tabs, Accordions, Breadcrumbs, Pagination.
- Data Table (sortable headers, empty/Loading states), Toolbar.
- Modal/Drawer, Toast/Inline alerts.
- Rebuild any custom widgets used on `3002` (e.g., tree, markdown previewer) as Angular components.

Deliverables:
- `shared/ui` components with inputs/outputs (accessibility-first).
- Demo page of each component for QA.

## Phase 4 — Data Wiring & Services
- Finalize services for: Topics, Tasks, Tags, Links, Memory Maps, Auth.
- Integrate list/detail pages with live data:
  - List: pagination/sort/search (as on `3002`).
  - Detail: view/edit panels, related entities, sections.
- Error/loading/empty states consistent with `3002`.

Deliverables:
- Feature pages with live data and stable error handling.
- Shared HTTP error interceptor (optional).

## Phase 5 — Forms & Validation
- Create/update forms aligned to `3002` UX:
  - Field-level and form-level validation.
  - Inline errors, disabled states, save/cancel patterns.
  - Confirmation dialogs for destructive actions.
- Auto-focus and keyboard navigability.

Deliverables:
- Reactive forms with validators and accessibility compliance.

## Phase 6 — Navigation Details
- Deep links, query params, and back-navigation parity.
- Breadcrumbs reflecting hierarchy like `3002`.
- Guarding flows (auth/unsaved-changes) if present on `3002`.

Deliverables:
- Route guards, resolvers (where needed), complete nav parity.

## Phase 7 — Polish & Consistency
- Spacing and typography parity audit (pixel/spacing pass).
- Hover/focus/active states match `3002`.
- Skeletons/placeholders for initial loads.
- Empty states and “no results” messages aligned to tone.

Deliverables:
- Visual parity checklist complete.

## Phase 8 — Performance & Accessibility
- On-demand/lazy loading for heavy routes and components.
- Image/icon optimization; reduce bundle via standalone imports.
- Keyboard traps, tab order, ARIA attributes, color contrast.
- Lighthouse (PWA/Performance/Accessibility) baseline ≥ `3002`.

Deliverables:
- Perf report and accessibility fixes applied.

## Phase 9 — Testing & Release
- E2E smoke for primary flows (Cypress/Playwright).
- Component and service tests for critical logic.
- Error-path tests (network failures).
- Build pipeline and environment switching documented.

Deliverables:
- QA signoff with parity matrix, deployment instructions.

---

## Concrete Task Breakdown (Initial Sprints)
1. Shell & Nav
   - Implement `AppShellComponent` (header, sidebar, content).
   - Insert router outlets and nav links mirroring `3002`.
2. Shared UI
   - Buttons, Inputs, Selects, Textareas
   - Cards, Modal, Table, Alert/Toast
3. Topics & Tasks
   - List pages with toolbar (search/add) and table.
   - Create/Edit dialogs with validation.
4. Tags, Links, Memory Maps
   - List + create/edit parity.
5. Details/Relations
   - Detail panels with related entities (as per `3002`).
6. UX Polish
   - States (loading, empty, error), focus rings, keyboard.
7. Final Parity Pass
   - Visual diff to `3002`, fix spacing/typography.

Notes:
- Use `environment.apiBaseUrl` or `window.__env` to point to real backend.
- Keep styles SCSS-based and component-scoped; centralize tokens in `styles.scss`.
- Prefer standalone components and feature directories for clear ownership.


