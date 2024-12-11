# can we create a react library project using story book?

Yes, you can create a **React component library** using **Storybook**. Storybook is ideal for building and showcasing components in isolation, making it a great tool for developing libraries. Here’s how you can set up a React library project using Storybook:

### Steps to Create a React Library with Storybook

#### 1. **Set Up Your Project**

First, create a new project directory for your React component library:

```bash
npx create-react-app react-library --template typescript
cd react-library
```

#### 2. **Install Storybook**

Initialize Storybook in your project:

```bash
npx sb init
```

This will set up Storybook with the necessary dependencies and configuration files. It also adds the `.storybook` folder to your project.

#### 3. **Create Your First Component**

Let’s create a sample Button component for your library.

- **`src/components/Button.tsx`:**

```tsx
import React from 'react';

export interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, primary = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: primary ? '#0070f3' : '#eaeaea',
        color: primary ? '#fff' : '#000',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
};
```

#### 4. **Add Storybook Stories**

Now, let's create a story for the `Button` component.

- **`src/components/Button.stories.tsx`:**

```tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Library/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
};
```

#### 5. **Start Storybook**

Run Storybook to see your component in isolation:

```bash
npm run storybook
```

Now, you can view your button component and its different states (e.g., `Primary`, `Secondary`).

#### 6. **Prepare for Publishing**

Once your library components are ready, follow these steps to publish the library:

- **Modify `package.json`:**

```json
{
  "name": "react-library",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  }
}
```

- **Create a TypeScript Configuration (`tsconfig.json`):**

Make sure your `tsconfig.json` is set up to build for a library:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationDir": "./dist",
    "module": "ESNext",
    "target": "ES5",
    "jsx": "react",
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

- **Export Components in `src/index.ts`:**

```ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
```

- **Build the Library:**

```bash
npm run build
```

#### 7. **Publish to npm**

If you’re ready to share your library, you can publish it to npm.

1. Make sure you're logged in to npm:

   ```bash
   npm login
   ```

2. Publish your library:

   ```bash
   npm publish
   ```

### Benefits of Using Storybook for a React Library:

- **Component Development**: You can develop and test each component in isolation.
- **Documentation**: Storybook serves as an interactive documentation platform.
- **Visual Testing**: Ensure your components are visually correct across various states and configurations.

This setup will allow you to use **Storybook** not only for development but also for **showcasing and documenting** your components when sharing your library with others.

