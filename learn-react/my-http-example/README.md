# My HTTP Example

A React application demonstrating HTTP requests and API interactions with a backend server. This project showcases various HTTP operations including fetching data, file searching, and displaying dynamic content.

## Features

- **Words Management**: Fetch and display words from a backend API
- **File Search**: Search for files by folder path and file extensions with filtering capabilities
- **File Viewer**: View file contents in a modal dialog
- **Checkbox Testing**: Interactive checkbox component examples
- **React Router**: Multi-page navigation with routing

## Tech Stack

- **React** 18.2.0
- **React Router DOM** 6.4.1
- **Bootstrap** 5.2.1
- **Create React App** 5.0.1

## Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- Backend API server running on `http://localhost:8989` (Spring Boot application)

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd my-http-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Backend API Requirements

This application requires a backend API server running on `http://localhost:8989`. The backend should provide the following endpoints:

- `GET http://localhost:8989/words/findAll` - Returns a list of words
- `GET http://localhost:8989/file-search/?fileName={path}&extensions={extensions}` - Searches for files
- `GET http://localhost:8989/stream/getFile?documentId={filePath}` - Streams file content

Make sure your backend server is running before starting the React application.

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

## Project Structure

```
src/
├── components/
│   ├── check-box/          # Checkbox testing component
│   ├── file-search/        # File search functionality
│   │   ├── FileSearchView.js
│   │   ├── FileSearchList.js
│   │   ├── FileSearchItem.js
│   │   └── FileViewerModal.js
│   ├── navbar/             # Navigation component
│   ├── UI/                 # Reusable UI components (Modal)
│   └── word-meaning/       # Words display component
├── constants/
│   └── GlobalConstants.js  # API base URL configuration
├── App.js                  # Main application component
└── index.js               # Application entry point
```

## Routes

The application includes the following routes:

- `/` - Home page
- `/words` - Display words fetched from the API
- `/file-search` - File search interface with filtering
- `/check-box` - Checkbox testing component

## Usage

1. Start the backend API server on `http://localhost:8989`
2. Start the React development server:
   ```bash
   npm start
   ```
3. Navigate to [http://localhost:3000](http://localhost:3000)
4. Use the navigation menu to explore different features:
   - **Words**: View words fetched from the API
   - **File Search**: Search for files by folder path and filter by extensions
   - **Check Box Test**: Test checkbox functionality

## File Search Feature

The file search component allows you to:
- Add multiple folder paths for searching
- Select file extensions to filter results (PDF, MP3, MP4, images, etc.)
- View search results in a list
- Click on files to view their contents in a modal dialog

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.2/)

## License

This project is private and for learning purposes.
