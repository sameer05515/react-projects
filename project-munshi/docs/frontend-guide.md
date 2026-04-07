# Frontend Guide

This guide covers core frontend behavior and user flows in `project-munshi/frontend`.

## Core Stack

- React 18
- TypeScript
- Vite
- React Router
- `marked` for markdown rendering
- `prismjs` for syntax highlighting
- `papaparse` for CSV parsing/import

## Main Screens

- Projects List (`/projects`)
- Create Project (`/projects/new`)
- Edit Project (`/projects/:id/edit`)
- Project Details (`/projects/:id`)

## Key UI Features

### Project CRUD

- Create and edit using `ProjectForm`
- View all projects in `ProjectList` using cards
- Open single project in `ProjectDetails`

### Delete Confirmation

- Deleting from list/details opens a custom confirmation modal
- User must confirm before delete API call is triggered

### Markdown Description

- Project description supports markdown syntax
- Rendered via `MarkdownRenderer` component
- Code blocks highlighted with Prism theme and language plugins

### Search and Filter

- Search by name
- Filter by project status (`ACTIVE`, `COMPLETED`, `ON_HOLD`, `CANCELLED`)

### CSV Bulk Import

- Triggered from Projects List using **Import CSV**
- CSV is parsed client-side, validated, previewed, then bulk-posted to backend

## Important Components

- `ProjectList.tsx`: listing, filters, delete flow, CSV import trigger
- `ProjectCard.tsx`: project summary display
- `ProjectDetails.tsx`: full details + markdown rendering
- `ConfirmationModal.tsx`: reusable confirm dialog
- `CsvImport.tsx`: CSV upload, validation, result summary
- `MarkdownRenderer.tsx`: markdown-to-HTML rendering and Prism highlight

## API Service Layer

`src/services/projectApi.ts` centralizes backend calls:

- `getAllProjects()`
- `getProjectById(id)`
- `createProject(project)`
- `updateProject(id, project)`
- `deleteProject(id)`
- `searchProjectsByName(name)`
- `getProjectsByStatus(status)`
- `getProjectsByOwner(owner)`
- `createProjectsBulk(projects)`

## Frontend Validation Notes

- CSV validation checks required fields and status values
- Date values are converted to ISO before sending
- Validation errors are shown in import result panel

## Styling Notes

- Component-scoped CSS files for modular styling
- Dark mode styling present in several components
- Modal and import UI are responsive for smaller screens

