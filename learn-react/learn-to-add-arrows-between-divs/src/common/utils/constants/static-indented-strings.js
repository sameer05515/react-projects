// static-indented-strings.js
import { buildTree as parseTreeDataV1 } from "../indentation-based-string-parser-to-tree-data";

const differentWaysToGenerateTreeDataInputString = `
Different ways to generate treeData
  From a flat array containing id and parentId fields
    Example use case: Converting hierarchical data from a relational database.
    Steps:
      1. Create a flat array with "id" and "parentId" fields.
      2. Implement a function to build tree structure from the flat array.
      3. Handle cases with multiple levels of hierarchy.
      4. Ensure the function can deal with missing or circular references.

  From a utility, which can generate tree data for given depth and number of children at each level
    Example use case: Generating mock data for testing or visualization.
    Steps:
      1. Define depth and number of children per level.
      2. Create a utility function to generate data based on these parameters.
      3. Use recursion or iteration to build the tree structure.
      4. Add additional properties like uniqueId, parentId, and level during generation.

  By transforming existing tree data
    Transforms treeData, which at least contains a children field having an array of child objects.
    Additional Information:
      - If uniqueId/parentId fields are not present in the object, they can be added by the utility.
      - If uniqueId/parentId fields are present, transformation can be adjusted to preserve these identifiers.
    Example use case: Modifying or enhancing existing hierarchical data structures.
    Steps:
      1. Read the existing tree data structure.
      2. Implement logic to add or adjust uniqueId/parentId fields if they are missing.
      3. Ensure that any transformations maintain the correct hierarchy.
      4. Add or update metadata such as levels or paths for each node.

  From a given string with new lines and indentation
    Example use case: Parsing structured text data into a hierarchical format.
    Steps:
      1. Define a format where indentation represents hierarchy.
      2. Implement parsing logic to convert indented text into tree data.
      3. Handle different levels of indentation to correctly build the tree structure.
      4. Consider edge cases like inconsistent or missing indentations.

  Using a Builder class approach
    Example use case: Creating complex tree data with a more controlled and fluent interface.
    Steps:
      1. Define a Builder class that allows adding nodes and children step-by-step.
      2. Implement methods to add children, set properties, and finalize the tree.
      3. Use the builder to generate the tree data, allowing flexible and readable tree construction.
      4. Validate the resulting tree to ensure all nodes are correctly linked.

  From a functional approach
    Example use case: Generating tree data in a more declarative and reusable manner.
    Steps:
      1. Create a set of pure functions to handle node creation, child addition, and tree building.
      2. Use higher-order functions or closures to manage the state of the tree as it is built.
      3. Ensure the approach remains flexible for various tree structures and use cases.
      4. Test and validate that the functions produce the expected tree structure.

  From a given string with key-value data and indentation
    Generates treeData from a string with structured data, where keys like name and description are separated by ###, and indentation indicates the hierarchy.
    Regular expressions are used to parse the string.
    Example use case: Converting structured text with key-value pairs into tree data.
    Steps:
      1. Define a format with key-value pairs separated by a delimiter (e.g., ###).
      2. Implement regex-based parsing logic to extract keys and values from the string.
      3. Use indentation to determine hierarchy and build the tree data.
      4. Validate the resulting structure to ensure the hierarchy is correctly represented.

  From an array containing strings and at most one string array
    Example use case: Converting a simple list structure where one element can be a nested list.
    Steps:
      1. Define the array where each element is either a string or a nested string array.
      2. Implement logic to iterate over the array and detect the nested array.
      3. For the nested array, treat it as a child node and add it under the appropriate parent.
      4. Construct the tree data by combining the strings as nodes and nested arrays as child nodes.
      5. Handle edge cases where there may be more than one nested array or none at all.

`;

const differentWaysToRenderTreeData = `
Different ways to render tree data
  Using a recursive component
    Example use case: Rendering a tree with unlimited depth.
    Steps:
      1. Create a functional component that can render a node and its children.
      2. Inside the component, use recursion to render each node's children.
      3. Pass the node data as props to each recursive call.
      4. Apply styles and classes for better visualization of hierarchy.
      5. Handle edge cases, such as rendering leaf nodes differently or dealing with cycles.

  Using a flat structure with depth-based indentation
    Example use case: Rendering a tree where hierarchy is indicated by indentation rather than nested elements.
    Steps:
      1. Flatten the tree structure into a list of nodes with depth information.
      2. Render each node as a separate row or item, applying indentation based on its depth.
      3. Use CSS or inline styles to visually represent the depth level of each node.
      4. Handle cases where nodes at the same level need to be grouped or connected.

  Using a tree visualization library
    Example use case: Rendering complex trees with visual aids like connectors, icons, and expand/collapse functionality.
    Steps:
      1. Choose a tree visualization library (e.g., react-d3-tree, react-treebeard, or react-arborist).
      2. Pass the tree data structure to the library’s component.
      3. Configure the library options to customize the appearance and behavior.
      4. Implement event handlers for interactions such as node clicks, drag-and-drop, or expand/collapse.
      5. Extend or customize the library’s functionality as needed for specific use cases.

  Using a custom renderer with conditional rendering
    Example use case: Rendering tree data with specific conditions, such as showing/hiding certain nodes or levels.
    Steps:
      1. Implement a custom rendering function that takes the tree data and configuration options.
      2. Use conditional logic to determine which nodes or branches to render based on the configuration.
      3. Render the tree using loops, mapping, or recursion, applying the conditions at each step.
      4. Allow users to dynamically change the configuration and re-render the tree accordingly.

  Using a collapsible/expandable component
    Example use case: Rendering a tree where nodes can be expanded or collapsed to show/hide children.
    Steps:
      1. Create a component that renders a node and a toggle button or icon.
      2. Maintain state to track which nodes are expanded or collapsed.
      3. When a node is clicked, toggle its expanded/collapsed state.
      4. Conditionally render the children of the node based on its state.
      5. Provide smooth animations or transitions for better user experience.

  Rendering a tree with lazy loading
    Example use case: Rendering large trees where loading all nodes at once is inefficient.
    Steps:
      1. Implement a component that initially renders only the root nodes.
      2. When a node is expanded, fetch or generate its children dynamically.
      3. Use React’s state management to add the newly loaded children to the tree.
      4. Optimize performance by caching loaded nodes or using virtualization techniques.
      5. Handle cases where nodes have no children or where data loading fails.

  Using a grid or table-based layout
    Example use case: Rendering tree data in a tabular format, where hierarchy is represented by rows or columns.
    Steps:
      1. Flatten the tree data into rows, with each row representing a node and its depth level.
      2. Render the tree in a table, using columns to display node properties and indentation to indicate depth.
      3. Add expandable/collapsible rows if the tree is large or deeply nested.
      4. Customize the table with features like sorting, filtering, or inline editing.
      5. Handle edge cases such as cyclic dependencies or orphaned nodes.

  Rendering tree data as a memory map
    Example use case: Visualizing complex hierarchical data structures, with the ability to expand, collapse, and show metadata.
    Steps:
      1. Create a component that represents each node as a memory block or section.
      2. Render the tree data with each node displayed as a section within the memory map.
      3. Add functionality to expand/collapse sections to show or hide child nodes.
      4. Implement configuration options to show or hide metadata (e.g., node IDs, level information).
      5. Allow customization of visual styles, such as color schemes, borders, and fonts, based on node properties.
      6. Handle dynamic updates, such as re-rendering when configuration changes or when new data is provided.
      7. Implement optimization techniques to manage the rendering of large datasets, ensuring smooth interactions.

`;

// Example usage
const sampleInputStringWith1SpaceIndentationToBeReviewed = `
Root
 Child 1
  Grandchild 1
   Super-Grandchild 2
 Child 2
  Grandchild 3
`;

const sampleInputStringWith2SpaceIndentationToBeReviewed = `
Root
  Child 1
    Grandchild 1
    Grandchild 2
      Super Grandchild 1
  Child 2
    Grandchild 3
Rooe2
`;

const planToPublishReactArcherV1AsLibraryProject = `
Develop a "library project having a custom React functional component"
  steps
    1. Develop a basic React library project having a simple Custom Button component.
      1.1 Set up a new project using a tool like Create React Library or Rollup to bundle the library.
      1.2 Create a basic \`Button\` component with customizable props like \`label\`, \`onClick\`, and \`style\`.
      1.3 Write unit tests for the \`Button\` component using a testing library like Jest and React Testing Library.
      1.4 Ensure the component is well-documented with clear usage instructions.
      1.5 Build the library and verify the output.
	  
    2. Publish it on an npm repo and use it in a consumer project.
      2.1 Register for an npm account and set up authentication on your local machine.
      2.2 Publish the \`Button\` component to the npm repository.
      2.3 Create a new consumer project, install the published library, and use the \`Button\` component.
      2.4 Verify that the component works as expected in the consumer project.

    3. Use some basic hooks from React and develop a new, more configurable Component.
      3.1 Introduce React hooks like \`useState\`, \`useEffect\`, and \`useMemo\` to create a component with dynamic behavior.
      3.2 For example, create a \`ToggleButton\` component that changes its state when clicked, using \`useState\`.
      3.3 Make the \`ToggleButton\` more configurable with props like \`initialState\`, \`onToggle\`, and \`disabled\`.
      3.4 Do testing, manually and using any library:
        3.4.1 Manually test the component in a local development environment.
        3.4.2 Use Jest and React Testing Library for automated tests.
        3.4.3 Consider using Cypress for end-to-end testing if the component's interaction with the DOM is complex.

    4. Publish it on an npm repo and use it in another consumer project.
      4.1 Publish the updated library containing the \`ToggleButton\` component to npm.
      4.2 Create a new consumer project or use the existing one to install and test the \`ToggleButton\` component.
      4.3 Validate that the component integrates well with different projects.

    5. Gradually increase confidence and publish a few more complex components.
      5.1 Plan and develop more complex components, such as a \`Dropdown\`, \`Modal\`, or \`TreeView\`.
      5.2 Use advanced React patterns like context, custom hooks, and higher-order components (HOCs).
      5.3 Perform rigorous testing for these components, including edge cases and accessibility considerations.
      5.4 Continue to publish and validate the components in different consumer projects.

    6. Publish the first version of the target component \`ReactArcherV1\` with basic functionality.
      6.1 Develop the \`ReactArcherV1\` component, focusing on rendering hierarchical tree data.
      6.2 Ensure the component is configurable and can handle various tree structures.
      6.3 Write comprehensive tests and documentation for \`ReactArcherV1\`.
      6.4 Publish the first version of \`ReactArcherV1\` to npm.
      6.5 Create a demo project to showcase the component's features and use cases.

  pre-requisites
    - Basic understanding of React and JavaScript ES6+.
    - Familiarity with npm, version control (Git), and package management.
    - Knowledge of testing libraries like Jest, React Testing Library, and Cypress.
    - Experience with bundling tools like Rollup or Webpack for creating React libraries.
    - Access to a GitHub repository to host the project code.

  additional steps
    - Set up continuous integration (CI) to automate testing and deployment using tools like GitHub Actions or Travis CI.
    - Implement versioning and changelog management using tools like semantic-release or conventional commits.
    - Gather feedback from users and iterate on the component based on real-world usage.
    - Monitor the npm package for downloads and issues, and maintain the library with regular updates and bug fixes.
    - Consider adding TypeScript support for better type checking and developer experience.

`;

const possibleTechStacks = `
Application Development: Possible tech stacks to develop an application that can render tree data, considering technologies from Java, its frameworks, JavaScript, ReactJS, and Angular
    Backend
        Java
            Spring Boot
            Jakarta EE (formerly Java EE)
            Micronaut
            Quarkus
            Vert.x
        Database
            MySQL
            PostgreSQL
            MongoDB
            Oracle DB
            Hibernate (ORM)
        REST API Development
            Spring MVC
            Jersey
            JAX-RS
            Micronaut
    Frontend
        JavaScript
            ReactJS
                React Router
                Redux / Context API
                React Query / SWR
                Styled Components / Emotion
            Angular
                Angular CLI
                RxJS
                Angular Material
            Vanilla JavaScript
            TypeScript
        Styling
            CSS / SCSS
            Bootstrap
            Material UI
            Tailwind CSS
        Frontend Tools
            Webpack
            Babel
            ESLint / Prettier
    Full-Stack Development
        MEAN Stack
            MongoDB
            Express.js
            Angular
            Node.js
        MERN Stack
            MongoDB
            Express.js
            ReactJS
            Node.js
        Spring Boot + ReactJS
        Spring Boot + Angular
    DevOps
        CI/CD
            Jenkins
            GitLab CI/CD
            GitHub Actions
        Containerization
            Docker
            Kubernetes
        Cloud Platforms
            AWS
            Google Cloud Platform (GCP)
            Microsoft Azure

`;

const treeDataCreationAndVisualization = `
Purpose: Tree data Creation and Visualization
  Definitions
    1. Node
      Each item of given tree structured array. 
        Minimum Required fields
          uniqueId
            type string
            should
              not be null or empty
              be unique across all nodes of given treeData
          parentId
            type string
          name
          children
    2. Tree data
      Data having array structure and each item of Tree data should have one children array, which again contain
    3. Level
      number, starting from "0" for all nodes having parentId "" (an empty string)
  Possible Operations
    1. Creation
    2. Validation
    3. Visualization
    4. Searching a node in Tree Data
      Purpose of Searching
`;

const treeDataCreationAndVisualizationToBeReviewed = `
Purpose: Tree Data Creation and Visualization

Definitions:
  1. Node:
    Each item of a given tree-structured array.
    Minimum Required Fields:
      uniqueId:
        type: string
        should:
          not be null or empty
          be unique across all nodes of given treeData
      parentId:
        type: string
        description: References the uniqueId of the parent node. If the node is a root, parentId is an empty string.
      name:
        type: string
        description: A human-readable name for the node.
      children:
        type: array
        description: Array of child nodes, can be empty.
        
  2. Tree Data:
    A hierarchical structure in an array format, where each item corresponds to a node. The children array recursively contains further nodes, forming the tree.

  3. Level:
    A number starting from "0" for all nodes having parentId "" (an empty string). Each subsequent level increases by 1 for child nodes.
    
Possible Operations:

  1. Creation:
    - Adding new nodes to the tree structure.
    - Ensure that new nodes have unique \`uniqueId\`s and correctly set \`parentId\`.

  2. Validation:
    - Verify that each node has a unique \`uniqueId\`.
    - Check that \`parentId\` exists and references an existing node or is an empty string for root nodes.
    - Validate the overall structure for consistency.

  3. Visualization:
    - Render the tree structure visually (e.g., as a nested list or a tree diagram).
    - Show hierarchical relationships between nodes with proper indentation or graphical connectors.

  4. Searching a Node in Tree Data:
    Purpose of Searching:
      - Locate a node by its \`uniqueId\`, \`name\`, or other criteria.
      - Return the node's path or the node object itself.
      - Implement depth-first or breadth-first search algorithms.
      
  5. Updating a Node:
    - Modify the properties of an existing node, such as \`name\` or \`parentId\`.
    - Ensure that the update does not violate tree structure integrity (e.g., \`uniqueId\` uniqueness).

  6. Deletion:
    - Remove a node and all its descendants from the tree.
    - Reassign orphans (if any) or handle them according to specific rules (e.g., move to root, delete, etc.).
    
  7. Counting Nodes:
    - Count the total number of nodes in the tree.
    - Count the number of nodes at each level.

  8. Traversal:
    - Traverse the tree in various orders (pre-order, post-order, in-order for binary trees, etc.).
    - Apply a function to each node during traversal.
`;

const reactArcherV1ValidationsAndWorkArounds = `
ReactArcherV1 (Referred as TreeDataVisualizer): Expectations, Possible use cases and Validations
  Expectations 
  Possible use cases
  Validations
    For treeData
      TreeDataVisualizer should render a given tree structure array
      TreeDataVisualizer should render Indented String
    For "configuration" object
    For styling
    For Contexts
      Every TreeDataVisualizer components' props should
        not interfere with each other
      Changing configuration of a TreeDataVisualizer component should
        only appear in that component
        not change configurations of other TreeDataVisualizer components
`;

const myDevelopmentJourneyTechnologyStackWise = `
My Development Journey (Technology stack wise)
  Overall tech-stack Summary
    Java
      experience: 14 years      
      last used: current
      use cases:
        Created REST APIs (latest)
        Created GraphQL APIs (latest)
    Javascript
      experience: 10+ years
  Company and Projects
    GreenApple WebWare, New Delhi, India
      Overall tech-stack (Company Level)
    HCL Infosystems Ltd, Noida, India
      Overall tech-stack (Company Level)
    Novelvox
      Overall tech-stack (Company Level)
    Concentrix
      Overall tech-stack (Company Level)
    Accenture
      Overall tech-stack (Company Level)
    Mynd Integrated Solutions Ltd
      Overall tech-stack (Company Level)
    Dhani stocks Limited
      Overall tech-stack (Company Level)
    RSystems International Pvt Ltd
      Overall tech-stack (Company Level)
    EVC Ventures
      Overall tech-stack (Company Level)
    Zycus Infotech Pvt. Ltd
      Overall tech-stack (Company Level)
      Projects
        ESG Lythouse
          techstack: 
            Backend: 
              Java/J2EE, Spring Boot, Spring GraphQL
            Database: 
              MongoDB
            Frontend: 
              ReactJS
            Architecture: 
              Micro-Frontend and Microservices
            Communication: 
              REST and GraphQL
            Deployment: 
              Deployed on AWS EKS, leveraging cloud infrastructure for high availability and performance.
  
  Personal Projects
    TweetApp
    TreeDataVisualizer
    BCE API
    Chat Renderer  

  Certifications
    Java8
    React
    Docker and K8s
    Github Actions

  Education and Degree
    B. Tech (CSE)
`;

const useCasesForBackendFrontEndDatabase=`
Use-Cases
  Front-end
    User Authentication: Login and registration forms, password reset functionality.
    Data Display: Fetching and displaying data from APIs, such as lists, tables, charts, and graphs.
    Forms and Validation: Creating dynamic forms with validation rules and error handling.
    Navigation: Implementing routing and navigation between different views or pages.
    State Management: Managing and synchronizing application state across components.
    Responsive Design: Ensuring the application is usable and looks good on various screen sizes.
    Real-time Updates: Displaying real-time data using WebSockets or other techniques.
    User Interactions: Handling user input and interactions like clicks, drags, and hovers.
    Animations and Transitions: Adding visual feedback and improving user experience with animations.
      Fade In/Out: 
	      Gradually increasing or decreasing the opacity of an element.
      Slide In/Out: 
	      Moving an element into or out of view from a specific direction (top, bottom, left, right).
      Scale: 
	      Increasing or decreasing the size of an element.
      Rotate: 
	      Rotating an element around a fixed point.
      Bounce: 
	      Creating a bouncing effect for an element.
      Shake: 
	      Creating a shaking or jittering effect for an element.
      Flip: 
	      Flipping an element around its horizontal or vertical axis.
      Spin: 
	      Continuously rotating an element.
      Hover Effects: 
	      Animations triggered when an element is hovered over.
      Parallax Scrolling: 
	      Creating a 3D effect where background images move slower than foreground images.
      Keyframe Animations: 
	      Defining complex animations with multiple stages using keyframes.
      Transitions: 
	      Smoothly changing properties such as color, size, or position over a given duration.
      Morphing: 
	      Gradually changing one shape into another.
      Loading Spinners: 
	      Indicating that content is loading with a rotating or pulsing effect.
      Accordion: 
	      Expanding or collapsing sections of content.	
    Localization: Supporting multiple languages and regional settings.
	
  Backend
    User Authentication and Authorization: Handling user registration, login, password resets, and access control.
    Data Management: CRUD (Create, Read, Update, Delete) operations on databases.
    API Development: Creating RESTful or GraphQL APIs for client-side applications to consume.
    File Upload and Storage: Handling file uploads, processing, and storing files on the server.
    Email Notifications: Sending automated emails for various events such as registration confirmation, password reset, and notifications.
    Payment Processing: Integrating payment gateways to handle transactions securely.
    Logging and Monitoring: Keeping track of application logs, monitoring performance, and tracking errors.
    Data Processing: Performing server-side data processing tasks such as data validation, transformation, and aggregation.
    Background Jobs: Handling time-consuming tasks asynchronously using job queues.
    Caching: Implementing caching mechanisms to improve performance and reduce load on the database.
    Session Management: Managing user sessions to maintain state across requests.
    WebSockets: Enabling real-time communication between the server and clients.
    Security: Implementing security measures such as data encryption, protection against SQL injection, CSRF, and XSS attacks.
    Third-party Integrations: Connecting with external services and APIs such as social media platforms, analytics services, and cloud storage providers.
    Microservices: Decomposing a monolithic application into smaller, independently deployable services.  
`;

const myPlans=`
My future development plans
	Motivation
		Adaptability is key in the ever-evolving tech landscape
		
	Consolidate knowledge about 
		My career journey
		My personal and professional projects
		
	Tasks to be done in next 6 months
		Get new job as early as possible
		Collect information about all my personal projects
			Data-Structures used in my personal projects so far
				TreeData
					Also referred as Hierarchical data		
						Essential part of Hierarchical Data
							Name
							Children or parent id ( to derive parent child relation)
						Optional parts (As per business logic)
							Description
							metadata
							created on
							updated on
							is private
							read only
							soft delete
							relations
					Different forms of TreeData (Details will be available in seperate section)
						Topic
						Section
						Group
						View
						Category
						Question
						Answer
						Link
						Memory Map and Memory Relations (or just relations) (Latest one)
							Inspiration to create a component to visualize tree-data in a brand new component connected with Arrows
							Later realized, older tree view could be used too to visualize data
							Memory map
								may contain
									relations with other Memory Maps or other Data Structures, mentioned above
										examples of relations
											with other data structures
										different categories of relations
											Transitive Relations
												Examples:
													is a refinement of
													is a prerequisite for
													leads to
											Reflexive Relations
												Examples:
													is identical to
													is informed by
											Symmetric Relations
												Examples:
													contrasts with
													is an alternative to
											Asymmetric Relations
												Examples:
													is a consequence of
													is a prerequisite for
											Antisymmetric Relations
												Examples:
													is a refinement of
											Non-Transitive Relations
												Examples:
													complements
													is informed by
											Irreflexive Relations
												Examples:
													contrasts with
													is a consequence of
											Partial Orders
												Examples:
													leads to
											Hierarchical Relations
												Examples:
													is a refinement of
									skeleton (raw form of tree data, stored as json or indented text format (initially))
						
						
		Optimize code
		Document and revise all key concepts
		Get knowledge to create library development for
			Creating JavaScript utilities and publishing on NPM repo
			Creating ReactJS custom components and publishing on NPM repo
			Creating Java utility jars and finding ways to publish them in Maven Artifactory
	Long term plans
		Networking and Community Engagement
			Attend industry conferences, meetups, and webinars to expand your professional network
			Engage with other developers, share your experiences, and learn from theirs
		Version Control and Collaboration
			Familiarize yourself with Git and platforms like GitHub or GitLab
			Collaborate on open-source projects or contribute to existing repositories
		Soft Skills Development
			Improve your communication skills, both written and verbal
			Learn about effective time management, teamwork, and conflict resolution
		Explore New Technologies
			Keep an eye on emerging technologies and trends
			Experiment with frameworks, libraries, and tools beyond your current stack
		Security Awareness
			Understand common security vulnerabilities and best practices
			Learn about secure coding techniques and how to prevent common attacks
		Continuous Learning
			Allocate time for continuous learning—whether through online courses, tutorials, or reading technical blogs
			Stay up-to-date with the latest developments in your field

`

const stepsToProcessAnIndentedStringToTransformItIntoTreeData=`
Steps to process an indented String to transform it into Tree Data
    1. Validate Input String
        1.1 Ensure input is a string
        1.2 Validate the string contains lines of text
            1.2.1 Trim each line of unnecessary whitespace
            1.2.2 Filter out any empty lines
    2. Determine Indentation Levels
        2.1 Calculate indentation level for each line
        2.2 Store indentation levels in an array
    3. Validate Indentation Consistency
        3.1 Check if all indentation levels are equal
            3.1.1 If equal, create a flat hierarchy with level 0
        3.2 Calculate the difference between consecutive indentation levels
        3.3 Validate consistency of indentation differences
            3.3.1 If inconsistent, return an error
    4. Build Tree Structure
        4.1 Compute levels for each line based on indentation
        4.2 Append each line with its computed level and initialize children array
        4.3 Fill in parent IDs for each line based on computed levels
        4.4 Transform the flat structure into a hierarchical tree
    5. Return Tree Data
        5.1 If all steps are successful, return the tree data
        5.2 If any step fails, return the corresponding error message

`;

const memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV1=`
Plan to visualize memory maps' skeleton
	Quick revision: Fields in memory maps
		name
		uniqueId
		parentId
		children
		skeleton: containing "indented string"
	Plan
		Step 1: display memory maps in tree
			Fetch memory maps
				1. get all memory maps
				  to be displayed as root node
					Initially, till there is no stable condition to identify "root node", get all memory maps
			Display memory maps with "Tree" component
		Step 2: Add action "Visualize skeleton" in each memory map item's Actions options
		Step 3: on click of "Visualize skeleton" action option
			Display its skeleton in Tree view
			
			
Plan to link another Memory map with any skeleton item as its related/linked/child memory map [To be reviewed, once first plan is done]
	Plan is to maintain relation of any "skeleton item" with another memory map in seperate list as "skeletonItemToMemoryMapRelations" in skeleton's Memory map object, so that 
		
`;

const memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV2=`
Plan to visualize memory maps' skeleton
	Quick revision: Fields in memory maps
		name
		uniqueId
		parentId
		children
		skeleton: containing "indented string"
	Plan
		Step 1: display memory maps in tree
			Fetch memory maps
				1. get all memory maps
					to be displayed as root node
					Initially, till there is no stable condition to identify "root node", get all memory maps
			Display memory maps with "Tree" component
		Step 2: Add action "Visualize skeleton" in each memory map item's Actions options
		Step 3: on click of "Visualize skeleton" action option
			Display its skeleton in Tree view
		Step 4: Implement filtering and searching within the tree
			Allow filtering memory maps based on fields like name or uniqueId
			Enable search functionality to locate specific nodes within the tree
		Step 5: Handle large data sets
			Paginate or lazy-load memory maps to optimize performance
			Consider collapsible nodes to manage tree size
		
Plan to link another Memory map with any skeleton item as its related/linked/child memory map [To be reviewed, once first plan is done]
	Plan is to maintain relation of any "skeleton item" with another memory map in separate list as "skeletonItemToMemoryMapRelations" in skeleton's Memory map object, so that 
	Step 1: Add functionality to link skeleton items with other memory maps
		Allow users to select and link a memory map as a related/linked/child to a specific skeleton item
	Step 2: Display linked memory maps in the tree view
		Visually distinguish linked memory maps from regular skeleton items
		Optionally, show a summary or tooltip when hovering over linked items
	Step 3: Manage and update links
		Provide options to edit or remove existing links
		Ensure updates are reflected in the tree view immediately
	Step 4: Validate relationships
		Prevent circular references or invalid parent-child relationships
		Implement validation rules to maintain data integrity

`

const IndentedStringArrayTypes = {
  DIFFERENT_WAYS_TO_GENERATE_TREEDATA: "DIFFERENT_WAYS_TO_GENERATE_TREEDATA",
  DIFFERENT_WAYS_TO_RENDER_TREEDATA: "DIFFERENT_WAYS_TO_RENDER_TREE_DATA",
  PLAN_TO_PUBLISH_ReactArcherV1_AS_LIBRARY_PROJECT_DATA:
    "PLAN_TO_PUBLISH_ReactArcherV1_AS_LIBRARY_PROJECT_DATA",
  POSSIBLE_TECH_STACKS_TO_DEVELOP_TREE_DATA_RENDERER:
    "POSSIBLE_TECH_STACKS_TO_DEVELOP_TREE_DATA_RENDERER",
  TREE_DATA_CREATION_AND_VISUALIZATION_DATA:
    "TREE_DATA_CREATION_AND_VISUALIZATION_DATA",
  treeDataCreationAndVisualizationToBeReviewed: "treeDataCreationAndVisualizationToBeReviewed",
  sampleInputStringWith1SpaceIndentationToBeReviewed: "sampleInputStringWith1SpaceIndentationToBeReviewed",
  sampleInputStringWith2SpaceIndentationToBeReviewed: "sampleInputStringWith2SpaceIndentationToBeReviewed",
  ReactArcherV1_VALIDATIONS_AND_WORK_AROUNDS_DATA:
    "ReactArcherV1_VALIDATIONS_AND_WORK_AROUNDS_DATA",
  INTERVIEW_PREP_My_TechnologyStackWise_Carreer_Journey: "myDevelopmentJourneyTechnologyStackWise",
  INTERVIEW_PREP_useCasesForBackendFrontEndDatabase: "useCasesForBackendFrontEndDatabase",
  INTERVIEW_PREP_myPlans:"myPlans",
  memoryMapsVisualizationAndLinkingV1:"memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV1",
  memoryMapsVisualizationAndLinkingV2:"memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV2",
  Steps_to_process_an_indented_String_to_transform_it_into_Tree_Data: "stepsToProcessAnIndentedStringToTransformItIntoTreeData"
};

const IndentedStringArrays = [
  {
    name: IndentedStringArrayTypes.DIFFERENT_WAYS_TO_GENERATE_TREEDATA,
    value: differentWaysToGenerateTreeDataInputString,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.DIFFERENT_WAYS_TO_RENDER_TREEDATA,
    value: differentWaysToRenderTreeData,
    type: "INDENTED_STRING_ARRAY"
  },
  {
    name: IndentedStringArrayTypes.PLAN_TO_PUBLISH_ReactArcherV1_AS_LIBRARY_PROJECT_DATA,
    value: planToPublishReactArcherV1AsLibraryProject,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.POSSIBLE_TECH_STACKS_TO_DEVELOP_TREE_DATA_RENDERER,
    value: possibleTechStacks,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.TREE_DATA_CREATION_AND_VISUALIZATION_DATA,
    value: treeDataCreationAndVisualization,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.treeDataCreationAndVisualizationToBeReviewed,
    value: treeDataCreationAndVisualizationToBeReviewed,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.sampleInputStringWith1SpaceIndentationToBeReviewed,
    value: sampleInputStringWith1SpaceIndentationToBeReviewed,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.sampleInputStringWith2SpaceIndentationToBeReviewed,
    value: sampleInputStringWith2SpaceIndentationToBeReviewed,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.ReactArcherV1_VALIDATIONS_AND_WORK_AROUNDS_DATA,
    value: reactArcherV1ValidationsAndWorkArounds,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.INTERVIEW_PREP_My_TechnologyStackWise_Carreer_Journey,
    value: myDevelopmentJourneyTechnologyStackWise,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.INTERVIEW_PREP_useCasesForBackendFrontEndDatabase,
    value: useCasesForBackendFrontEndDatabase,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.INTERVIEW_PREP_myPlans,
    value: myPlans,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.Steps_to_process_an_indented_String_to_transform_it_into_Tree_Data,
    value: stepsToProcessAnIndentedStringToTransformItIntoTreeData,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.memoryMapsVisualizationAndLinkingV1,
    value: memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV1,
    type: "INDENTED_STRING_ARRAY",
  },
  {
    name: IndentedStringArrayTypes.memoryMapsVisualizationAndLinkingV2,
    value: memoryMapsVisualizationAndLinkingSkeletonItemWithAnotherMemoryMapV2,
    type: "INDENTED_STRING_ARRAY",
  },
  
];

const getIndentedStringArrayForType = (type) => {
  const item = IndentedStringArrays.find((array) => array.name === type);
  if (!item) return [];
  const { data, isValid, message } = parseTreeDataV1(item.value);
  if (!isValid) {
    console.error(message);
    return [];
  }

  return data;
};

export { IndentedStringArrayTypes, getIndentedStringArrayForType };
