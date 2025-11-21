# Learn to Add Arrows Between Divs

A React learning project focused on visualizing hierarchical tree data structures with arrows connecting parent and child nodes using the `react-archer` library.

## Overview

This project demonstrates how to render hierarchical tree data structures where nodes are connected by arrows to represent parent-child relationships. The component (`ReactArcherApp10`) visualizes tree data using the `react-archer` library, providing an interactive way to explore and display complex hierarchical relationships.

### Key Features

- **Hierarchy Visualization**: Nodes in the tree are displayed with arrows connecting them, visually representing their parent-child relationships
- **Dynamic Rendering**: Users can show or hide the children of each node using a button, dynamically adjusting the tree's appearance
- **Data Inspection**: JSON representation of the tree can be toggled on or off for debugging and data structure inspection
- **Interactive Configuration**: Modify configurations dynamically and see immediate updates in the tree data rendering
- **Multiple Data Sources**: Support for various data input methods including static arrays, generated tree data, and indented text parsing
- **Efficient Rendering**: Uses `useMemo` to optimize rendering and avoid unnecessary re-computations

## Project Aims

- **Create a Reusable Component**: Develop a component to render tree data where each object contains at least two fields: `name` and `children`
- **Automatic Field Addition**: The component automatically adds `uniqueId`, `level`, and `parentId` if they are not present in the tree data objects
- **Configuration Support**: Support various configuration settings to control appearance and behavior, including styling, visibility control, and expand/collapse functionality

## Technologies Used

- **React** 18.3.1
- **react-archer** 4.4.0 - Library for drawing arrows between React elements
- **react-select** 5.8.0 - Select component for dropdowns
- **Create React App** - Project scaffolding and build tools

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd learn-react/learn-to-add-arrows-between-divs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
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

## Project Structure

```
src/
├── components/
│   ├── MainComponent.jsx          # Main component with configuration UI
│   ├── examples/                  # Example components demonstrating various features
│   │   ├── arrow-connector/       # Arrow connector examples
│   │   ├── react-archer/          # react-archer library examples
│   │   ├── shared-data-use/       # Shared data usage examples
│   │   └── transform-tree-data/   # Tree data transformation examples
│   └── releases/                  # Released/stable component versions
│       └── react-archer-releases/
│           └── v1.0/              # Version 1.0 stable release
├── common/
│   ├── components/                # Reusable common components
│   │   ├── JSONDataViewer.jsx
│   │   ├── RadioButtonsComponent.jsx
│   │   ├── ToggleableIcon.jsx
│   │   └── TreeViewer.jsx
│   ├── hooks/                     # Custom React hooks
│   │   └── useTreeData.js
│   └── utils/                     # Utility functions
│       ├── tree-data-operation-utils.js
│       ├── tree-data-validations-util.js
│       ├── indentation-based-string-parser-to-tree-data.js
│       └── constants/             # Static data and constants
└── App.js                         # Root component
```

## Component Architecture

### Main Components

1. **`MainComponent`**: The main entry point that provides a configuration UI to select data sources and components to display
2. **`ReactArcherApp10`**: The main visualization component that renders tree structures with arrows
3. **`NodeComponent`**: Represents an individual node in the tree with expand/collapse functionality
4. **`LevelComponent`**: Groups nodes by their level in the tree hierarchy
5. **`ContainerComponent`**: Organizes the entire tree structure and handles data processing

### Key Utilities

- **Tree Data Generation**: Utilities to generate tree data from various sources:
  - From flat arrays with `id` and `parentId` fields
  - From depth and number of children per level
  - From existing tree structures
  - From indented text
  - From key-value data with indentation

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. In the application:
   - Select a data source mode (ArrayType or Generate Tree Data)
   - Choose a specific array type or configure tree generation parameters
   - Select a component to display
   - Interact with the tree visualization:
     - Click nodes to expand/collapse children
     - Toggle metadata display
     - View JSON representation of the data

## Default Configuration

The component supports default styling configurations:

```javascript
const defaultStyles = {
    levelItemStyle: {
        display: "flex",
        justifyContent: "space-between",
        gap: "5px",
    },
    nodeChildrenItemStyle: {
        marginBottom: "50px",
        display: "flex",
        justifyContent: "space-between",
    },
    nodeItemStyle: {
        padding: "10px",
        border: "1px solid red",
        fontSize: "10px",
    },
    configurationAndMetadataItemStyle: {
        padding: "10px",
        border: "10px solid green",
        fontSize: "10px",
        flex: "1",
    },
};
```

## Use Cases

This component is suitable for visualizing:
- Organizational charts
- File directory structures
- Design pattern trees
- Any hierarchical data structure requiring visual representation

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [react-archer documentation](https://github.com/pierpo/react-archer)

## Additional Documentation

- **Overview.md**: Detailed component breakdown and functionality
- **Target.md**: Project scope and requirements
- **TO-DO-LIST.md**: Current tasks and progress
