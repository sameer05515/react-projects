# React TypeScript Library 01

A React TypeScript library with custom Button and Input components that supports CommonJS (CJS), ES Modules (ESM), and TypeScript projects.

## Features

- ✅ **Custom Button Component** with variants (primary, secondary, danger) and sizes (small, medium, large)
- ✅ **Custom Input Component** with label, error handling, and full-width option
- ✅ **TypeScript Support** with full type definitions
- ✅ **Multiple Module Formats**: CJS, ESM, and UMD builds
- ✅ **CSS Modules** for scoped styling
- ✅ **React 18** compatible

## Installation

```bash
npm install react-ts-library-01
```

## Usage

### TypeScript Projects (ESM)

```typescript
import { Button, Input } from 'react-ts-library-01';
import type { ButtonProps, InputProps } from 'react-ts-library-01';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click Me
      </Button>
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error="Please enter a valid email"
      />
    </div>
  );
}
```

### CommonJS Projects

```javascript
const { Button, Input } = require('react-ts-library-01');

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click Me
      </Button>
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
}
```

### ES Modules (JavaScript)

```javascript
import { Button, Input } from 'react-ts-library-01';

function App() {
  return (
    <div>
      <Button variant="secondary" size="large">
        Submit
      </Button>
      
      <Input
        label="Username"
        type="text"
        fullWidth
      />
    </div>
  );
}
```

## Components

### Button

A customizable button component with multiple variants and sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `children` | `React.ReactNode` | - | Button content |
| All standard HTML button attributes | - | - | Passed through to the button element |

#### Examples

```tsx
// Primary button
<Button variant="primary">Primary</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With all standard button props
<Button onClick={() => alert('Clicked!')} disabled>
  Disabled Button
</Button>
```

### Input

A customizable input component with label and error handling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label text |
| `error` | `string` | - | Error message to display |
| `fullWidth` | `boolean` | `false` | Make input full width |
| All standard HTML input attributes | - | - | Passed through to the input element |

#### Examples

```tsx
// Basic input
<Input type="text" placeholder="Enter text" />

// With label
<Input label="Email" type="email" placeholder="your@email.com" />

// With error
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Full width
<Input label="Full Name" fullWidth />

// All standard input props
<Input
  label="Age"
  type="number"
  min={0}
  max={120}
  required
/>
```

## Development

### Build

```bash
npm run build
```

This will generate:
- `dist/index.es.js` - ES Module build
- `dist/index.cjs.js` - CommonJS build
- `dist/index.umd.js` - UMD build
- `dist/types/` - TypeScript type definitions

### Development Mode

```bash
npm run dev
```

## Storybook

This project includes Storybook for component development and documentation.

### Start Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can:
- View all component variants and states
- Interact with components in isolation
- See component documentation
- Test different props and configurations

### Build Storybook

```bash
npm run build-storybook
```

This generates a static Storybook build in the `storybook-static` directory.

## Testing

This project uses Vitest for unit testing.

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Files

- `lib/components/Button/Button.test.tsx` - Button component tests
- `lib/components/Input/Input.test.tsx` - Input component tests

Tests cover:
- Component rendering
- Prop handling
- User interactions
- Accessibility attributes
- Error states

## Module Formats

This library supports three module formats:

1. **ES Modules (ESM)**: Use `import` syntax
2. **CommonJS (CJS)**: Use `require()` syntax
3. **UMD**: Universal Module Definition for browser use

The package.json exports field automatically selects the correct format based on your project's module system.

## TypeScript Support

Full TypeScript support is included with type definitions in `dist/types/`. The library exports both component implementations and their TypeScript interfaces:

```typescript
import { Button, Input, type ButtonProps, type InputProps } from 'react-ts-library-01';
```

## License

MIT

