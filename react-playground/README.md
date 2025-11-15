# React Playground

A comprehensive React learning playground featuring various examples and demonstrations of React concepts, hooks, and patterns.

## Overview

This project serves as a hands-on learning environment for exploring React features, including:
- React Hooks (useState, useEffect, useReducer, useContext)
- Class Components vs Functional Components
- Context API
- Form Handling
- RxJS Integration
- HTTP Requests with Axios

## Technologies

- **React** 18.2.0
- **React DOM** 18.2.0
- **Bootstrap** 5.2.3 - For styling and UI components
- **Axios** 1.3.4 - For HTTP requests
- **RxJS** 7.8.0 - For reactive programming examples
- **React Testing Library** - For testing utilities

## Project Structure

```
src/
├── components/
│   ├── context-hook-ex/      # Context API examples
│   ├── reducer-hook-ex/      # useReducer hook examples
│   ├── useeffect-ex/         # useEffect hook examples
│   ├── usestate-ex/          # useState hook examples
│   └── save-form/            # Form handling examples
├── App.js                    # Main app component
├── App_reducer.js            # useReducer examples
├── App_rxjs1.js              # RxJS examples (part 1)
├── App_rxjs2.js              # RxJS examples (part 2)
├── App_rxjs3.js              # RxJS examples (part 3)
└── index.js                  # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd react-playground
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) documentation for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Examples Included

### useState Hook Examples
- Basic counter implementations
- Multiple state variables
- State with objects and arrays
- Comparison between class and functional components

### useEffect Hook Examples
- Effect cleanup
- Conditional effects
- Data fetching
- Mouse event listeners
- Interval timers

### useReducer Hook Examples
- Simple and complex state management
- Multiple useReducer hooks
- Data fetching with useReducer

### Context API Examples
- Single and multiple context providers
- Consuming context in nested components

### Form Handling
- Contact form with state management
- Form data persistence
- Contact list display

### RxJS Integration
- Observable patterns
- Reactive programming examples
- Multiple RxJS implementation approaches

## Switching Between Examples

To explore different examples, update the import in `src/index.js`:

```javascript
// For main app with forms and context
import App from './App';

// For reducer examples
import App from './App_reducer';

// For RxJS examples
import App from './App_rxjs1';  // or App_rxjs2, App_rxjs3
```

You can also uncomment different components in `App.js` to see various examples.

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.2/)
- [RxJS Documentation](https://rxjs.dev/)
- [Axios Documentation](https://axios-http.com/docs/intro)

## Notes

- This is a learning/playground project - feel free to experiment and modify the code
- Some examples may be commented out - uncomment them in `App.js` to see them in action
- The project uses Create React App for build configuration
