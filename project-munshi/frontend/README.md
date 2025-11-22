# Frontend - React Application

A modern React frontend application for the Munshi project, built with Vite, TypeScript, and React Router. This application provides a user-friendly interface for managing projects with full CRUD operations.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Components](#components)
- [API Integration](#api-integration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Browser Support](#browser-support)

## Prerequisites

- **Node.js 18+** and npm/yarn/pnpm
- **Backend service** running on `http://localhost:8080` (optional, for full functionality)

## Getting Started

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
   Or using yarn:
   ```bash
   yarn install
   ```
   
   Or using pnpm:
   ```bash
   pnpm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The application will start on `http://localhost:3000` and automatically reload when you make changes.

### Building for Production

Build the application for production:
```bash
npm run build
```

The production build will be created in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx      # Application header with navigation
│   │   ├── ProjectList.tsx # List view of all projects
│   │   ├── ProjectCard.tsx # Individual project card component
│   │   ├── ProjectForm.tsx # Form for creating/editing projects
│   │   └── ProjectDetails.tsx # Project detail view
│   ├── services/           # API service layer
│   │   └── projectApi.ts   # Project API service functions
│   ├── types/              # TypeScript type definitions
│   │   └── project.ts      # Project-related types
│   ├── App.tsx             # Main application component with routing
│   ├── App.css             # Application styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React features
- 📘 **TypeScript** - Type-safe development
- 🎨 **Modern CSS** - Responsive design with CSS variables
- 🔄 **API Proxy** - Automatic proxy to backend API (`/api` → `http://localhost:8080/api`)
- 🛣️ **React Router** - Client-side routing
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔍 **Project Management** - Full CRUD operations for projects

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Configuration

### API Proxy

The Vite dev server is configured to proxy API requests to the backend:

- Frontend requests to `/api/*` are automatically forwarded to `http://localhost:8080/api/*`
- This allows you to make API calls without CORS issues during development

Configuration in `vite.config.ts`:
```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

### Port Configuration

The development server runs on port `3000` by default. You can change this in `vite.config.ts`.

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- ES2020 target
- React JSX support
- Strict type checking
- Module resolution for bundlers

## Components

### Header
Navigation header with links to projects list and create new project.

### ProjectList
Displays all projects in a grid/list view with search and filter capabilities.

### ProjectCard
Individual project card component showing project summary information.

### ProjectForm
Form component for creating new projects or editing existing ones. Supports two modes:
- `create` - For creating new projects
- `edit` - For editing existing projects

### ProjectDetails
Detailed view of a single project with all information and actions.

## API Integration

The frontend communicates with the backend through the `projectApi` service located in `src/services/projectApi.ts`.

### Available API Methods

- `getAllProjects()` - Fetch all projects
- `getProjectById(id)` - Fetch a single project by ID
- `createProject(project)` - Create a new project
- `updateProject(id, project)` - Update an existing project
- `deleteProject(id)` - Delete a project
- `searchProjectsByName(name)` - Search projects by name
- `getProjectsByStatus(status)` - Filter projects by status
- `getProjectsByOwner(owner)` - Filter projects by owner

### Example Usage

```typescript
import { projectApi } from './services/projectApi';

// Get all projects
const projects = await projectApi.getAllProjects();

// Create a new project
const newProject = await projectApi.createProject({
  name: 'My Project',
  description: 'Project description',
  status: 'ACTIVE',
  startDate: '2024-01-01T00:00:00',
  owner: 'John Doe',
  tags: ['web', 'react']
});
```

## Development

### Adding New Components

Create new components in `src/components/`:

```typescript
// src/components/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

interface MyComponentProps {
  // Define props here
}

const MyComponent: React.FC<MyComponentProps> = ({ /* props */ }) => {
  return (
    <div className="my-component">
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### Adding New Routes

Routes are configured in `App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyComponent from './components/MyComponent';

// Add new route
<Route path="/my-route" element={<MyComponent />} />
```

### Styling

- Use component-specific CSS files (e.g., `ComponentName.css`)
- Use `App.css` for application-wide component styles
- Use `index.css` for global styles and CSS variables
- Consider CSS modules or CSS-in-JS solutions for larger projects

### TypeScript Types

Define types in `src/types/`:

```typescript
// src/types/myType.ts
export interface MyType {
  id: string;
  name: string;
  // ... other fields
}
```

## Building for Production

### Build Process

1. Run the build command:
   ```bash
   npm run build
   ```

2. The build process will:
   - Type-check the code (`tsc`)
   - Bundle and optimize assets (`vite build`)
   - Output to `dist/` directory

3. Preview the production build:
   ```bash
   npm run preview
   ```

### Production Deployment

The `dist/` directory contains the production-ready files. Deploy these files to any static hosting service such as:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any web server (nginx, Apache, etc.)

## Backend Integration

The frontend is configured to work with the Spring Boot backend:

1. **Start the backend server** on `http://localhost:8080`
2. **Start the frontend dev server** on `http://localhost:3000`
3. The frontend will automatically proxy API requests to the backend
4. API calls use the `/api` prefix which is proxied to the backend

### Environment Configuration

For production, you may need to configure the API base URL. Create a `.env` file:

```env
VITE_API_BASE_URL=http://your-backend-url:8080
```

Then update `src/services/projectApi.ts` to use the environment variable:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
```

## Dependencies

### Production Dependencies

- **react** (^18.2.0) - React library
- **react-dom** (^18.2.0) - React DOM rendering
- **react-router-dom** (^6.20.0) - Client-side routing

### Development Dependencies

- **@types/react** - TypeScript types for React
- **@types/react-dom** - TypeScript types for React DOM
- **@typescript-eslint/eslint-plugin** - ESLint plugin for TypeScript
- **@typescript-eslint/parser** - ESLint parser for TypeScript
- **@vitejs/plugin-react** - Vite plugin for React
- **eslint** - JavaScript/TypeScript linter
- **eslint-plugin-react-hooks** - ESLint rules for React hooks
- **eslint-plugin-react-refresh** - ESLint plugin for React refresh
- **typescript** - TypeScript compiler
- **vite** - Build tool and dev server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3001
```

### API Connection Issues

- Ensure the backend server is running on `http://localhost:8080`
- Check the browser console for CORS errors
- Verify the proxy configuration in `vite.config.ts`

### Build Errors

- Run `npm run lint` to check for linting errors
- Ensure all TypeScript types are correctly defined
- Check that all imports are correct

## License

This project is part of the Munshi project.

