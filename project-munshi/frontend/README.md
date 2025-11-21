# Frontend - React Application

A modern React frontend application for the Munshi project, built with Vite and TypeScript.

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend service running on `http://localhost:8080` (optional, for full functionality)

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
├── public/              # Static assets
├── src/
│   ├── components/      # React components (create as needed)
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React features
- 📘 **TypeScript** - Type-safe development
- 🎨 **Modern CSS** - Responsive design with CSS variables
- 🔄 **API Proxy** - Automatic proxy to backend API (`/api` → `http://localhost:8080/api`)
- 🛣️ **React Router** - Ready for routing (already installed)

## Configuration

### API Proxy

The Vite dev server is configured to proxy API requests to the backend:

- Frontend requests to `/api/*` are automatically forwarded to `http://localhost:8080/api/*`
- This allows you to make API calls without CORS issues during development

### Port Configuration

The development server runs on port `3000` by default. You can change this in `vite.config.ts`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Adding New Features

### Creating Components

Create new components in `src/components/`:

```typescript
// src/components/MyComponent.tsx
import React from 'react';

const MyComponent: React.FC = () => {
  return <div>My Component</div>;
};

export default MyComponent;
```

### Adding Routing

Install React Router (already included) and configure routes in `App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Add routes in your App component
```

### Styling

- Use `App.css` for component-specific styles
- Use `index.css` for global styles
- Consider adding CSS modules or a CSS-in-JS solution for larger projects

## Backend Integration

The frontend is configured to work with the Spring Boot backend:

1. Start the backend server on `http://localhost:8080`
2. The frontend will automatically proxy API requests
3. Check the health status indicator on the homepage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the Munshi project.

