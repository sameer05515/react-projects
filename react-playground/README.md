# React Playground

A comprehensive React learning playground featuring examples and demonstrations of React concepts, hooks, and patterns.

## Features

This project demonstrates:

- **React Hooks**: useState, useEffect, useReducer, useContext
- **Component Patterns**: Class vs Functional Components
- **State Management**: Context API, useReducer patterns
- **Form Handling**: Contact forms with state management
- **Reactive Programming**: RxJS integration examples
- **HTTP Requests**: Axios-based data fetching

## Tech Stack

- React 18.2.0
- Bootstrap 5.2.3
- Axios 1.3.4
- RxJS 7.8.0
- React Testing Library

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/
│   ├── context-hook-ex/      # Context API examples
│   ├── reducer-hook-ex/      # useReducer examples
│   ├── useeffect-ex/         # useEffect examples
│   ├── usestate-ex/          # useState examples
│   └── save-form/            # Form handling examples
├── App.js                    # Main app (forms & context)
├── App_reducer.js            # useReducer examples
├── App_rxjs1.js              # RxJS examples (part 1)
├── App_rxjs2.js              # RxJS examples (part 2)
├── App_rxjs3.js              # RxJS examples (part 3)
└── index.js                  # Entry point
```

## Examples

### useState Hook
- Counter implementations (class & functional)
- Multiple state variables
- State with objects and arrays

### useEffect Hook
- Effect cleanup and dependencies
- Data fetching patterns
- Event listeners and intervals

### useReducer Hook
- Simple and complex state management
- Multiple reducers
- Data fetching with useReducer

### Context API
- Single and multiple context providers
- Nested component consumption

### Forms & RxJS
- Contact form with state management
- Observable patterns and reactive programming

## Usage

### Switching Examples

Update the import in `src/index.js`:

```javascript
import App from './App';           // Main app
import App from './App_reducer';   // useReducer examples
import App from './App_rxjs1';     // RxJS examples (or App_rxjs2/3)
```

Alternatively, uncomment components in `App.js` to explore different examples.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm test` | Run tests in watch mode |
| `npm run build` | Build for production |

## Resources

- [React Documentation](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Bootstrap](https://getbootstrap.com/docs/5.2/)
- [RxJS](https://rxjs.dev/)
- [Axios](https://axios-http.com/docs/intro)

---

**Note**: This is a learning playground project. Examples may be commented out in `App.js` - uncomment them to explore different concepts.
