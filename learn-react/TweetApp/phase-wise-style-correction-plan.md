## Phase-wise Style Correction Plan

This document captures the proposed approach for finishing and validating the project-wide Tailwind CSS conversion. Each phase builds on the previous work and should conclude with visual verification plus lint/test validation before moving forward.

### Preparation (applies to all phases)
- Confirm Tailwind config is up to date (`tailwind.config.js`) with shared colors, spacing, fonts.
- Ensure Bootstrap assets/packages remain removed and no residual global styles conflict with Tailwind.
- Establish a baseline visual regression checklist (critical pages per feature) and lightweight Percy/Storybook screenshots if available.
- Keep ESLint + Stylelint (if any) running in watch mode to catch regressions quickly.

### Phase 1 – Core User-Facing Components
- Target: global layouts, navigation, dashboard, essential forms, feed/list cards.
- Tasks:
  - Inventory remaining inline styles or legacy classes in `components/*` and `pages/*`.
  - Replace form controls (inputs, selects, buttons) with Tailwind utility stacks; leverage shared button/badge components.
  - Normalize spacing/typography scales using Tailwind tokens (`text-sm`, `tracking-wide`, etc.).
  - Update cards/lists to consistent shadow, border, and hover states.
  - Smoke-test auth/login, dashboard, and any public landing pages.

### Phase 2 – Common & Shared Components
- Target: reusable primitives (`CustomButton`, `HoverableSpan`, `RatingComponent`, `TreeViewer`, Smart Editor/Previewer variants).
- Tasks:
  - Replace any remaining style objects/CSS modules with Tailwind classes unless module-driven animations are required.
  - For dynamic styling, prefer className composition helpers (clsx/cx) or conditional arrays over inline objects.
  - Validate component story/docs and ensure props expose Tailwind-friendly extension points.
  - Add regression stories/tests for tree viewer expansion, smart editor states, badges, etc.

### Phase 3 – Feature-Specific Domains
- Target: Links Management, Memory Maps, Related Nodes, My Reports, Old Tasks.
- Tasks:
  - Audit each feature directory for leftover Bootstrap markup (grid classes, `btn`, `card`, etc.).
  - Convert complex layouts using Tailwind flex/grid utilities.
  - Pay special attention to Smart Editor integration, preview panes, and diagram/tree areas where overflow handling matters.
  - Validate forms (create/update) and data tables for responsive breakpoints.

### Phase 4 – ApnaPlayground & Demo Components
- Target: experimental/demo components and playground utilities.
- Tasks:
  - Remove any ad-hoc inline styling used for rapid prototyping; replace with documented Tailwind patterns.
  - Ensure demos showcase canonical styling so new contributors copy correct patterns.
  - Update README/playground instructions to mention Tailwind tokens instead of Bootstrap utilities.

### Phase 5 – Modal & HOC Components
- Target: modal dialogs, drawers, toasts, higher-order wrappers (loading, auth guards, error boundaries).
- Tasks:
  - Standardize backdrop, z-index, and animation behavior using Tailwind + minimal CSS modules when animation curves are complex.
  - Ensure focus traps and accessibility attributes remain intact (aria-modal, aria-labelledby).
  - Replace Bootstrap modal classes with Tailwind spacing/transition utilities; verify scroll locking.

### Phase 6 – Cleanup & Optimization
- Tasks:
  - Delete unused style objects, CSS files, and dead imports uncovered during conversion.
  - De-duplicate Tailwind class strings via shared components or `@apply` inside layered utilities if necessary.
  - Run `npm run lint` and `npm run test` to ensure no new warnings.
  - Execute a full visual QA pass across critical user journeys; capture before/after screenshots for sign-off.

### Post-Conversion Checklist
- Confirm no `bootstrap`/`react-bootstrap` dependencies in `package.json`, `node_modules`, or import graphs.
- Verify `index.js` (or entry) does not import Bootstrap CSS.
- Update documentation/ADR to describe Tailwind-only styling strategy and contribution guidelines.
- Plan future enhancements (e.g., theme switcher, design tokens) leveraging Tailwind config extensions.

### Ownership & Tracking
- Create issues or project board cards per phase, linking affected directories.
- Assign reviewers familiar with Tailwind best practices.
- Require before/after screenshots or Storybook references in PR descriptions.

Following this plan will keep the conversion scoped, reviewable, and easy to validate while ensuring the final UI is consistent and maintainable.

