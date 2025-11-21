# Dynamic Form Generator GUI

A React-based application for dynamically generating and rendering forms based on JSON schemas. This project demonstrates how to create flexible, reusable form components that can handle various input types and display submitted data in a structured format.

## Features

- **Dynamic Form Rendering**: Generate forms dynamically based on a schema configuration
- **Multiple Input Types**: Supports text, email, password, number, textarea, select, and checkbox fields
- **Data Visualization**: Render submitted form data in a structured, readable format
- **Schema-Based Configuration**: Define form fields using simple JSON schemas

## Project Structure

```
src/
├── components/
│   ├── DyanmicFormDashboard.jsx    # Main dashboard component
│   ├── form/
│   │   ├── generate/
│   │   │   └── DynamicFormGenerator.jsx    # Form generator (to be developed)
│   │   └── render/
│   │       └── DynamicFormRenderer.jsx      # Form renderer component
│   └── data/
│       └── render/
│           └── DynamicDataRenderer.jsx      # Data visualization component
├── App.js                              # Root component
└── index.js                            # Application entry point
```

## Components

### DynamicFormRenderer

Renders forms dynamically based on a schema object. Supports the following field types:
- `text` - Text input
- `email` - Email input
- `password` - Password input
- `number` - Number input
- `textarea` - Multi-line text input
- `select` - Dropdown select (requires `options` array)
- `checkbox` - Checkbox input

**Example Schema:**
```javascript
const formSchema = {
  name: {
    label: "Name",
    type: "text"
  },
  email: {
    label: "Email",
    type: "email"
  },
  gender: {
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"]
  },
  subscribe: {
    label: "Subscribe to Newsletter",
    type: "checkbox"
  }
};
```

### DynamicDataRenderer

Displays submitted form data in a structured format, handling:
- Primitive values (strings, numbers, booleans)
- Arrays (rendered as unordered lists)
- Objects (rendered as nested lists)
- Null values

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd dynamic-form-generator-gui
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Usage Example

```javascript
import DynamicFormRenderer from './components/form/render/DynamicFormRenderer';

const formSchema = {
  name: {
    label: "Name",
    type: "text"
  },
  email: {
    label: "Email",
    type: "email"
  }
};

const handleSubmit = (formData) => {
  console.log('Form submitted:', formData);
};

<DynamicFormRenderer schema={formSchema} onSubmit={handleSubmit} />
```

## Technologies Used

- **React** 18.2.0 - UI library
- **React DOM** 18.2.0 - React rendering
- **React Scripts** 5.0.1 - Build tooling (Create React App)

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## Future Enhancements

- [ ] Complete the `DynamicFormGenerator` component for visual form schema creation
- [ ] Add form validation
- [ ] Support for nested form fields
- [ ] Add styling and improved UI/UX
- [ ] Add form field dependencies and conditional rendering
