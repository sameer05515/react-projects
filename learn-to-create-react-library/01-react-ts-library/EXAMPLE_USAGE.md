# Example Usage

This document provides example code for using the library in different project types.

## TypeScript + ESM Project

```typescript
// App.tsx
import React, { useState } from 'react';
import { Button, Input } from 'react-ts-library-01';
import type { ButtonProps, InputProps } from 'react-ts-library-01';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
      alert('Form submitted!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h1>Example Form</h1>
      
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        error={error}
        fullWidth
      />
      
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="secondary" onClick={() => setEmail('')}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default App;
```

## CommonJS Project

```javascript
// app.js
const React = require('react');
const { Button, Input } = require('react-ts-library-01');

function App() {
  const [name, setName] = React.useState('');

  return (
    React.createElement('div', { style: { padding: '2rem' } },
      React.createElement(Input, {
        label: 'Your Name',
        value: name,
        onChange: (e) => setName(e.target.value),
        placeholder: 'Enter your name'
      }),
      React.createElement(Button, {
        variant: 'primary',
        onClick: () => alert(`Hello, ${name}!`)
      }, 'Greet')
    )
  );
}

module.exports = App;
```

## ES Modules (JavaScript)

```javascript
// App.js
import { Button, Input } from 'react-ts-library-01';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <Input
        label="Search"
        type="search"
        placeholder="Type to search..."
        fullWidth
      />
      
      <div style={{ marginTop: '1rem' }}>
        <Button variant="primary" size="large">
          Search
        </Button>
      </div>
    </div>
  );
}

export default App;
```

## React with JSX (Babel)

```jsx
// App.jsx
import React from 'react';
import { Button, Input } from 'react-ts-library-01';

export default function App() {
  return (
    <>
      <h2>Button Variants</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      
      <h2>Button Sizes</h2>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      
      <h2>Input Examples</h2>
      <Input label="Text Input" type="text" />
      <Input label="Email" type="email" error="Invalid email" />
      <Input label="Full Width" fullWidth />
    </>
  );
}
```

