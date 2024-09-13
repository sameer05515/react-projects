import { TechStacks } from "../initial-records";

const javaKeyTopics = `
For a candidate with 14 years of Java experience, the following broader topics would be essential to highlight, covering a mix of technical expertise, architectural skills, and leadership qualities:  

---

### **1. Core Java Expertise**
   1. Advanced concepts: Generics, Collections, Streams, Lambdas.
   1. Multithreading and Concurrency (e.g., Locks, Executors, CompletableFuture).
   1. JVM internals (e.g., memory management, garbage collection tuning).
   1. Effective use of design patterns in Java.

---

### **2. Frameworks and Libraries**
   1. **Spring Framework**: Core, Spring Boot, Spring MVC, Spring Security, Spring Data, Spring Batch.
   1. **Hibernate/JPA**: Advanced ORM mappings, performance tuning, caching strategies.
   1. **Other frameworks**: Struts, Apache Camel, or alternative tools used in past projects.

---

### **3. Microservices Architecture**
   1. Design and development of RESTful APIs.
   1. Knowledge of gRPC, GraphQL.
   1. API Gateway usage and microservices orchestration (e.g., with Spring Cloud).
   1. Service discovery, load balancing, and distributed configuration management.
   1. Circuit breakers and resilience (e.g., Netflix OSS tools like Hystrix).

---

### **4. Cloud-Native Development**
   1. Experience with **AWS**, **Azure**, or **Google Cloud Platform**.
   1. Containerization with **Docker** and orchestration with **Kubernetes**.
   1. Cloud-native Java frameworks like **Quarkus** or **Micronaut**.
   1. Deployment automation using CI/CD pipelines (e.g., Jenkins, GitHub Actions).

---

### **5. DevOps and Tooling**
   1. Hands-on with build tools (**Maven**, **Gradle**).
   1. Monitoring and logging tools (**Prometheus**, **Grafana**, **ELK Stack**).
   1. Experience with configuration management (e.g., Ansible, Terraform).
   1. Version control systems (Git, Bitbucket, GitLab).

---

### **6. Software Architecture and Design**
   1. Expertise in designing scalable, distributed systems.
   1. Event-driven architecture using Kafka, RabbitMQ, or ActiveMQ.
   1. Domain-Driven Design (DDD) practices.
   1. SOLID principles and Clean Architecture.
   1. Understanding CAP theorem and NoSQL database usage.

---

### **7. Database Management**
   1. SQL proficiency: Optimized queries, stored procedures, triggers.
   1. Experience with relational databases: Oracle, PostgreSQL, MySQL.
   1. Non-relational databases: MongoDB, Cassandra, Redis.

---

### **8. Testing and Quality Assurance**
   1. Automated testing: JUnit, TestNG.
   1. Mocking frameworks: Mockito, WireMock.
   1. Integration testing of services.
   1. Performance testing tools: JMeter, Gatling.

---

### **9. Agile and Project Management**
   1. Agile methodologies: Scrum, Kanban.
   1. Experience as a **Tech Lead**, guiding teams in sprints.
   1. Collaboration tools: Jira, Confluence, Slack.

---

### **10. Emerging Technologies**
   1. **Reactive programming** (e.g., Project Reactor, RxJava).
   1. Hands-on with **GraphQL APIs**.
   1. Knowledge of **AI/ML frameworks** in Java (e.g., DL4J).

---

### **11. Mentorship and Leadership**
   1. Mentoring junior developers.
   1. Code reviews and maintaining coding standards.
   1. Conducting technical interviews and training sessions.
   1. Collaboration with stakeholders for requirement analysis.

---

### **12. Compliance and Security**
   1. Application security best practices (e.g., OWASP, SSL/TLS).
   1. Knowledge of GDPR, HIPAA compliance, or equivalent regulations.
   1. Secure authentication systems (OAuth2, JWT).

---

These topics align with the experience level of a seasoned Java developer and demonstrate technical mastery, thought leadership, and the ability to adapt to evolving tech landscapes.
`;

const hibernateKeyTopics = `
For candidates with **8+ years of Hibernate experience**, the focus should be on showcasing expertise in ORM concepts, advanced features, and related ecosystems, along with architectural and optimization skills. Here are the **key broader topics**:  

---

### **1. Core Hibernate Expertise**
   1. **ORM Fundamentals**: Entity mapping, associations (One-to-One, One-to-Many, Many-to-Many), inheritance mapping.
   1. Understanding Hibernate Session, SessionFactory, and Transaction Management.
   1. Lazy loading vs. eager loading.
   1. HQL (Hibernate Query Language) and Criteria API.

---

### **2. Advanced Hibernate Features**
   1. **Second-Level Cache and Query Caching**: Configuring caching mechanisms (e.g., Ehcache, Hazelcast).
   1. Performance tuning: Fetch strategies, batch processing, and avoiding N+1 query problems.
   1. Native SQL integration and custom result mappings.
   1. Interceptors and event listeners for custom behavior.

---

### **3. JPA (Java Persistence API)**
   1. Use of Hibernate as a JPA provider.
   1. JPQL and named queries.
   1. Integration with container-managed environments.
   1. Entity lifecycle callbacks (e.g., \'@PrePersist\', \'@PostLoad\').

---

### **4. Database Design and Integration**
   1. Database schema generation and migrations using Hibernate tools.
   1. Advanced mapping techniques: Composite keys, embeddable types, and custom user types.
   1. Multi-tenancy architecture with Hibernate.
   1. Handling large datasets with pagination and streaming.

---

### **5. Hibernate in Distributed Systems**
   1. Working with distributed databases and consistency strategies.
   1. Integration with messaging systems (e.g., Kafka, RabbitMQ) and eventual consistency patterns.
   1. Concurrency handling with optimistic and pessimistic locking.

---

### **6. Spring and Hibernate Integration**
   1. Hibernate with **Spring Framework**: Spring Boot, Spring Data JPA.
   1. Transaction management with Spring and Hibernate.
   1. Repository pattern with custom queries and projections.

---

### **7. Performance Optimization**
   1. Profiling and debugging Hibernate queries.
   1. Using tools like Hibernate Statistics and SQL logs.
   1. Tuning database indices and Hibernate caching strategies.
   1. Avoiding pitfalls like over-fetching or unnecessary joins.

---

### **8. Microservices and Hibernate**
   1. Using Hibernate in a microservices architecture with shared or separate databases.
   1. Ensuring data consistency in distributed systems.
   1. Integration with RESTful APIs and GraphQL.

---

### **9. Testing Hibernate Applications**
   1. Unit testing with mock Hibernate sessions.
   1. Integration testing with an in-memory database (e.g., H2, HSQLDB).
   1. Ensuring transactional integrity during tests.

---

### **10. Deployment and Scalability**
   1. Hibernate configuration in containerized environments (e.g., Docker, Kubernetes).
   1. Scaling applications with Hibernate in cloud-native environments (e.g., AWS, Azure).
   1. Database sharding and replication with Hibernate.

---

### **11. Migration and Upgrades**
   1. Migration between Hibernate versions and understanding breaking changes.
   1. Upgrading from Hibernate-specific features to JPA standard implementations.
   1. Handling legacy databases and migrating to Hibernate ORM.

---

### **12. Cross-Cutting Concerns**
   1. Security: SQL injection prevention, encryption, and secure entity design.
   1. Logging and monitoring Hibernate performance with tools like ELK or Prometheus.
   1. Integration with other tools like Liquibase or Flyway for schema management.

---

### **13. Mentorship and Leadership**
   1. Providing guidance on ORM best practices.
   1. Conducting code reviews with a focus on efficient database interaction.
   1. Mentoring team members in using Hibernate effectively.

---

These topics demonstrate comprehensive expertise in Hibernate and its surrounding ecosystem, reflecting a strong foundation in ORM, database optimization, and architectural design.
`;

const reactJsKeyTopics=`
For candidates with **8+ years of ReactJS experience**, the focus should be on expertise in React fundamentals, modern patterns, state management, performance optimization, and ecosystem integration. Here are the **key broader topics**:  

---

### **1. Core ReactJS Expertise**
   1. **React Component Lifecycle**: Class components vs. functional components, lifecycle methods, and hooks (\'useState\', \'useEffect\', etc.).
   1. JSX and rendering patterns.
   1. Props and state management, context API.
   1. Controlled vs. uncontrolled components.

---

### **2. Modern React Patterns**
   1. **React Hooks**: Advanced usage of hooks like \'useReducer\', \'useMemo\', \'useCallback\', and custom hooks.
   1. Compound component patterns for reusable component design.
   1. Higher-order components (HOCs) and render props.
   1. Portals for rendering outside DOM hierarchy.

---

### **3. State Management**
   1. Built-in state management with Context API.
   1. Redux and Redux Toolkit: Middleware (e.g., Thunk, Saga) and advanced patterns.
   1. Alternatives like MobX, Zustand, or Recoil.
   1. Handling global state vs. local state.

---

### **4. React Router and Navigation**
   1. Deep understanding of **React Router** for SPA navigation.
   1. Dynamic routing and lazy loading routes.
   1. Nested routes and route guards.
   1. Handling browser history and query parameters.

---

### **5. Performance Optimization**
   1. React performance debugging with tools like React Profiler.
   1. Virtual DOM diffing and reconciliation process.
   1. Optimizing rendering with \'React.memo\', \'useMemo\', and \'useCallback\'.
   1. Avoiding unnecessary renders and re-renders.
   1. Code-splitting and lazy loading using \'React.lazy\' and \'Suspense\'.

---

### **6. Ecosystem Integration**
   1. Integration with RESTful APIs and GraphQL (e.g., Apollo Client).
   1. Managing WebSockets or real-time data in React.
   1. React Native for cross-platform mobile application development.
   1. Working with third-party component libraries like Material-UI, Ant Design, or Chakra UI.

---

### **7. Styling in React**
   1. Inline styles, CSS modules, and CSS-in-JS libraries (e.g., Styled Components, Emotion).
   1. Writing responsive designs using frameworks like Tailwind CSS or Bootstrap.
   1. Handling theming and dynamic styles.

---

### **8. Testing in React**
   1. Unit testing React components with **Jest** and **React Testing Library**.
   1. Integration testing with Cypress or Puppeteer.
   1. Mocking APIs and component props for isolated testing.
   1. Snapshot testing for UI consistency.

---

### **9. TypeScript with React**
   1. React component types: Props, state, and functional components.
   1. Generics and utility types in React with TypeScript.
   1. Type-safe integration with Redux and Context API.

---

### **10. Micro-Frontends**
   1. Building React-based micro-frontend architectures.
   1. Module federation for shared components between applications.
   1. Handling cross-application communication.

---

### **11. Accessibility (A11Y)**
   1. Writing accessible components: ARIA roles, keyboard navigation.
   1. Testing for accessibility using tools like Axe and Lighthouse.
   1. Internationalization (i18n) and localization (l10n).

---

### **12. Debugging and Monitoring**
   1. Debugging with tools like React DevTools and Redux DevTools.
   1. Error boundaries and fallback components.
   1. Monitoring React applications with tools like Sentry or Datadog.

---

### **13. Build and Deployment**
   1. Configuring Webpack, Vite, or other bundlers for React projects.
   1. Optimizing build sizes and production deployments.
   1. Continuous Integration/Continuous Deployment (CI/CD) pipelines for React applications.

---

### **14. Progressive Web Apps (PWA)**
   1. Building PWAs with React.
   1. Service workers and caching strategies.
   1. Offline-first development and push notifications.

---

### **15. Advanced Patterns**
   1. Server-side rendering (SSR) with Next.js or frameworks like Remix.
   1. Static site generation (SSG) for performance.
   1. Hydration and isomorphic React applications.

---

### **16. Collaboration and Leadership**
   1. Mentoring junior developers in React best practices.
   1. Leading code reviews and enforcing standards.
   1. Designing scalable and maintainable front-end architectures.

---

These broader topics reflect the deep expertise and leadership expected from someone with 8+ years of ReactJS experience, covering both foundational skills and advanced React concepts.
`;

const javaScriptKeyTopics=`
For candidates with **10+ years of JavaScript experience**, the focus should be on their deep understanding of the language, mastery over advanced programming concepts, and expertise in modern tooling, frameworks, and ecosystem trends. Below are the **key broader topics**:

---

### **1. Core JavaScript Knowledge**
1. **ES5, ES6+, and Beyond**: Strong command of modern features like \'let\'/\'const\', arrow functions, template literals, destructuring, \'async/await\', modules, and optional chaining.
1. Advanced concepts:
  1. Closures and lexical scoping.
  1. Event loop and asynchronous programming (Promises, \'async/await\', callbacks).
  1. Prototypal inheritance and \'Object.create\'.
  1. Higher-order functions, currying, and functional programming techniques.
  1. Error handling and custom error types.
1. JavaScript strict mode and its implications.

---

### **2. Advanced JavaScript Concepts**
1. **Event Handling**:
  1. Understanding the event delegation and propagation (\'bubbling\' and \'capturing\').
  1. Custom events and \'EventTarget\'.
1. **Memory Management**:
  1. Garbage collection mechanisms.
  1. Avoiding memory leaks in long-running applications.
1. **Performance Optimization**:
  1. Debouncing, throttling, and lazy loading.
  1. Optimizing large data manipulations and DOM interactions.

---

### **3. DOM Manipulation**
1. Deep understanding of the **Document Object Model (DOM)**.
1. Native DOM APIs (\'querySelector\', \'addEventListener\', etc.).
1. Managing the Shadow DOM and custom elements.
1. Efficient DOM traversal and manipulation techniques.

---

### **4. Asynchronous Programming**
1. Promises and \'async/await\'.
1. Event loop and task queues (\'setTimeout\', \'setImmediate\', \'requestAnimationFrame\').
1. Understanding and using Web APIs (e.g., Fetch API, XMLHttpRequest).
1. Streams and Observables (RxJS or similar).

---

### **5. Modern JavaScript Frameworks & Libraries**
1. Expertise in one or more major frameworks/libraries (e.g., React, Angular, Vue.js).
1. Micro-frontend architectures and component-based design.
1. Familiarity with state management libraries (e.g., Redux, MobX, Zustand).
1. Building reusable component libraries.

---

### **6. Node.js and Backend Development**
1. Building RESTful and GraphQL APIs with Node.js.
1. Event-driven architecture and stream processing in Node.js.
1. Understanding middleware patterns (Express, Koa).
1. Working with file systems, child processes, and other Node.js core modules.

---

### **7. TypeScript**
1. Transitioning from JavaScript to TypeScript in large codebases.
1. Type definitions, generics, and utility types.
1. Type-safe integration with libraries and frameworks.
1. Using TypeScript in both front-end and back-end development.

---

### **8. Testing**
1. Writing unit tests with **Jest**, **Mocha**, or **Jasmine**.
1. Integration and end-to-end testing using tools like Cypress, Puppeteer, or Playwright.
1. Mocking APIs and modules in tests.
1. Code coverage analysis.

---

### **9. Build Tools and Bundlers**
1. Configuring and optimizing **Webpack**, **Vite**, or **Rollup**.
1. Understanding module systems (ES Modules, CommonJS, UMD).
1. Using Babel for JavaScript transpilation.
1. Minification, tree-shaking, and bundling optimizations.

---

### **10. Ecosystem Tools**
1. Package management with **npm**, **Yarn**, or **pnpm**.
1. Linting and formatting tools like **ESLint**, **Prettier**.
1. Debugging with browser dev tools and Node.js debuggers.
1. Setting up Continuous Integration/Deployment pipelines.

---

### **11. Security**
1. Preventing vulnerabilities like XSS, CSRF, and SQL Injection.
1. Securing Node.js applications (e.g., Helmet, rate limiting).
1. Understanding and mitigating supply chain attacks (e.g., npm dependency audits).

---

### **12. Browser APIs**
1. Mastery over Web APIs:
  1. WebSockets for real-time applications.
  1. IndexedDB, LocalStorage, and SessionStorage.
  1. Web Workers and Service Workers.
  1. Fetch and AJAX.
  1. Geolocation, Notifications, and Media APIs.

---

### **13. Performance Tuning**
1. Reducing runtime overhead with optimized algorithms and data structures.
1. Tools like Lighthouse, WebPageTest, or Chrome DevTools Performance Panel.
1. Lazy loading, code splitting, and asset optimization.

---

### **14. Front-End Architecture**
1. Single-page applications (SPAs) vs. multi-page applications (MPAs).
1. Component-based architecture.
1. Server-side rendering (SSR) and static site generation (SSG) with frameworks like Next.js or Nuxt.js.
1. Progressive web apps (PWAs) development.

---

### **15. Collaboration and Mentorship**
1. Leading large teams or projects with a focus on clean, maintainable code.
1. Conducting code reviews and enforcing best practices.
1. Mentoring junior developers and providing training on modern JavaScript.

---

### **16. JavaScript Evolution**
1. In-depth knowledge of ECMAScript proposals (TC39).
1. Contributions to or understanding of open-source JavaScript tools and libraries.

---

These topics comprehensively cover the expectations from someone with **10+ years of JavaScript experience**, emphasizing both technical expertise and leadership capabilities in building, scaling, and optimizing complex JavaScript applications.
`;

const typeScriptKeyTopics=`
For candidates with **10+ years of TypeScript experience**, the focus should be on their deep expertise in TypeScript's type system, integration with large-scale projects, and contributions to robust, maintainable, and scalable codebases. Below are the **key broader topics**:

---

### **1. TypeScript Fundamentals**
1. **Core TypeScript Features**:
  1. Types (\'string\', \'number\', \'boolean\', \'any\', \'unknown\', \'void\', etc.).
  1. Advanced types (\'union\', \'intersection\', \'mapped types\', \'conditional types\').
  1. Type aliases and interfaces.
  1. Enums (const and regular).
  1. Literal types.
1. Type assertions and non-null assertions.
1. Working with modules (\'import/export\' syntax).

---

### **2. Advanced TypeScript Type System**
1. Generics:
  1. Creating reusable, type-safe functions and components.
  1. Constraints and default generics.
1. Advanced utility types (\'Partial\', \'Required\', \'Pick\', \'Omit\', \'Readonly\', \'Record\').
1. Template literal types.
1. Recursive types.
1. Index signatures and key remapping.
1. Type inference and contextual typing.
1. Advanced conditional types (\'infer\' keyword, distributed conditional types).

---

### **3. Object-Oriented Programming with TypeScript**
1. Strong understanding of OOP principles:
  1. Classes and inheritance.
  1. Abstract classes and interfaces.
  1. Access modifiers (\'public\', \'protected\', \'private\').
  1. Static members and methods.
  1. \'readonly\' properties.
1. Mixins and composition.

---

### **4. TypeScript and Functional Programming**
1. Functional programming concepts in TypeScript:
  1. Pure functions and immutability.
  1. Higher-order functions.
  1. Composition and currying.
1. Utility types for FP: \'ReturnType\', \'Parameters\', \'Extract\', and \'Exclude\'.

---

### **5. TypeScript in Large-Scale Applications**
1. Managing large codebases with TypeScript:
  1. Modularization and organization of types.
  1. Using namespaces and modules effectively.
  1. Breaking down monolithic applications.
1. Strategies for migrating from JavaScript to TypeScript.
1. Handling type definitions for third-party libraries.
1. Strategies for versioning and maintaining type-safe APIs.

---

### **6. Integration with Frontend Frameworks**
1. **React**:
  1. Typing props and state.
  1. Functional and class components with TypeScript.
  1. Context API and hooks with TypeScript (\'useReducer\', \'useContext\').
  1. Higher-order components (HOCs).
1. **Angular**:
  1. Strong typing in services, directives, and components.
1. **Vue**:
  1. Using TypeScript in Vue components (\'defineComponent\', \'setup\').

---

### **7. Integration with Backend Frameworks**
1. Using TypeScript with **Node.js**:
  1. Typing Express.js middleware, routes, and request/response objects.
  1. Working with async/await and Promises in TypeScript.
  1. Building type-safe REST and GraphQL APIs.
1. Integration with ORMs like **TypeORM** and **Prisma**.
1. Microservices and TypeScript in serverless architectures.

---

### **8. TypeScript Tooling and Ecosystem**
1. Linting and code quality tools:
  1. Configuring **ESLint** and **TSLint**.
  1. Prettier integration with TypeScript.
1. Building and bundling:
  1. Using TypeScript with **Webpack**, **Rollup**, and **Vite**.
  1. Configuring the TypeScript compiler (\'tsconfig.json\').
1. Package management:
  1. Publishing type-safe libraries to npm.
  1. Managing \'@types\' packages.

---

### **9. TypeScript and Testing**
1. Writing type-safe tests with **Jest**, **Mocha**, or **Cypress**.
1. Typing test utilities and mock functions.
1. Using TypeScript with tools like **React Testing Library** or **Supertest** for API testing.
1. End-to-end testing with strong typing.

---

### **10. Advanced TypeScript Features**
1. Decorators (experimental feature).
1. Working with \'Proxy\' and \'Reflect\'.
1. Advanced metaprogramming techniques with TypeScript.
1. Conditional types with \'infer\' and type manipulation.
1. Declaration merging.

---

### **11. TypeScript Performance Optimization**
1. Optimizing compilation speed.
1. Using \'skipLibCheck\', \'incremental\', and \'composite\' options in \'tsconfig.json\'.
1. Reducing bundle size with tree-shaking and ES Modules.
1. Managing type-checking complexity in large codebases.

---

### **12. TypeScript in DevOps and CI/CD**
1. Setting up CI/CD pipelines for type checking.
1. Type-safe API documentation and generation (e.g., Swagger with TypeScript).
1. Generating type-safe SDKs from APIs or schemas.

---

### **13. TypeScript for API Design**
1. Designing type-safe REST APIs.
1. Using TypeScript with GraphQL (e.g., Apollo, type-graphql).
1. Schema validation and type generation with tools like **Zod** or **io-ts**.

---

### **14. Security with TypeScript**
1. Using TypeScript for stricter runtime validation.
1. Type-safe input validation with tools like \'zod\' or \'yup\'.
1. Preventing vulnerabilities by enforcing strict null checks and type safety.

---

### **15. Mentorship and Leadership**
1. Teaching and mentoring developers transitioning to TypeScript.
1. Conducting code reviews with an emphasis on type safety and maintainability.
1. Advocating for best practices in large teams.

---

### **16. Contributions to TypeScript Community**
1. Writing and publishing type definitions (\'@types\').
1. Contributing to TypeScript open-source projects or tools.
1. Evangelizing TypeScript adoption and best practices within organizations.

---

These topics highlight the advanced skills and expertise expected from a professional with **10+ years of TypeScript experience**, focusing on building robust, scalable, and maintainable applications while contributing to organizational and community growth.
`;

const css3KeyTopics=`
For candidates with **10+ years of CSS/CSS3 experience**, the focus should be on their mastery of CSS fundamentals, advanced techniques, responsive design, and contributions to scalable and maintainable UI architectures. Below are the **key broader topics**:

---

### **1. CSS Fundamentals**
1. Core CSS properties for layout, positioning, and styling:
  1. Box model, margins, padding, borders.
  1. Display (\'block\', \'inline\', \'inline-block\', \'none\').
  1. Positioning (\'static\', \'relative\', \'absolute\', \'fixed\', \'sticky\').
  1. Z-index and stacking contexts.
1. CSS selectors (simple, combinators, attribute selectors, pseudo-classes, and pseudo-elements).
1. Understanding specificity, inheritance, and the cascade.

---

### **2. CSS3 Features**
1. **Transitions and Animations**:
  1. Smooth transitions with \'transition\' property.
  1. Keyframe animations with \'@keyframes\'.
1. **Transforms**:
  1. 2D and 3D transformations (\'translate\', \'rotate\', \'scale\', \'skew\').
1. **Gradients**:
  1. Linear and radial gradients.
1. **Flexbox**:
  1. Building flexible and responsive layouts.
  1. Using properties like \'justify-content\', \'align-items\', \'flex-grow\', \'flex-basis\'.
1. **Grid Layout**:
  1. Creating advanced grid-based layouts.
  1. Defining rows, columns, and gaps using \'grid-template\' and \'grid-area\'.

---

### **3. Responsive Design**
1. Media queries for different screen sizes and devices.
1. Fluid grids and layouts using percentages and \'max-width\'.
1. CSS units for responsiveness:
  1. Absolute (\'px\') vs relative (\'em\', \'rem\', \'vw\', \'vh\', \'%\').
1. Mobile-first design principles.
1. Adaptive images with \'object-fit\' and \'picture\' element.

---

### **4. Modern CSS Techniques**
1. **Custom Properties (CSS Variables)**:
  1. Declaring and using variables for theming.
  1. Dynamic updates with JavaScript.
1. **CSS Functions**:
  1. Using functions like \'calc()\', \'clamp()\', \'min()\', \'max()\'.
1. **Pseudo-Elements and Pseudo-Classes**:
  1. Styling dynamic states (\':hover\', \':focus\', \':nth-child\', \':last-child\').
  1. Enhancing UI with \'::before\' and \'::after\'.
1. **Clipping and Masking**:
  1. Techniques using \'clip-path\' and \'mask-image\'.

---

### **5. Cross-Browser Compatibility**
1. Understanding CSS vendor prefixes (\'-webkit-\', \'-ms-\', \'-moz-\').
1. Ensuring compatibility with older browsers.
1. Tools like **Can I Use** for feature support.
1. Writing fallbacks for unsupported features.

---

### **6. CSS Architecture and Maintainability**
1. CSS methodologies:
  1. BEM (Block-Element-Modifier) for scalable and reusable styles.
  1. OOCSS (Object-Oriented CSS).
  1. SMACSS (Scalable and Modular Architecture for CSS).
1. Modular CSS organization in large projects.
1. Using **@import** and modular CSS files.
1. Naming conventions and consistent patterns.

---

### **7. CSS Preprocessors and Tools**
1. Expertise in CSS preprocessors:
  1. **SASS/SCSS**:
    1. Nesting, variables, mixins, and extends.
    1. Loops and conditionals.
  1. **LESS**:
    1. Mixins and variables.
1. PostCSS for modern CSS tooling.
1. Building CSS pipelines with tools like **Webpack**, **Gulp**, or **Vite**.

---

### **8. Performance Optimization**
1. Minimizing CSS for faster loading:
  1. Critical CSS and above-the-fold rendering.
  1. Using tools like PurgeCSS or UnCSS to remove unused styles.
1. Leveraging CSS shorthand properties for efficiency.
1. Avoiding excessive specificity and overly complex selectors.
1. Lazy-loading stylesheets for non-critical CSS.

---

### **9. Accessibility (A11y) in CSS**
1. Styling for visually impaired users:
  1. Focus states and keyboard navigability.
  1. Using ARIA roles and visually hidden techniques.
1. Contrast ratios and readable typography for accessibility.
1. Responsive typography and accessible font sizes.

---

### **10. Typography and Iconography**
1. Typography principles:
  1. Fonts, line heights, letter spacing, text alignment.
  1. Web fonts integration (e.g., Google Fonts).
1. Using CSS for advanced text effects:
  1. \'text-shadow\', \'text-stroke\', \'letter-spacing\'.
1. Icon integration:
  1. Using icon fonts or SVG for scalable icons.
  1. Styling with \'font-awesome\' or custom SVG sprites.

---

### **11. CSS Frameworks and Libraries**
1. Deep expertise with CSS frameworks:
  1. **Bootstrap**, **Foundation**, or similar.
  1. Customizing framework variables and extending components.
1. Understanding and extending utility-first CSS libraries like **Tailwind CSS**.

---

### **12. Integration with JavaScript and Frameworks**
1. Dynamically applying styles with JavaScript.
1. Styling libraries like:
  1. **Styled-Components** (CSS-in-JS).
  1. **Emotion**.
  1. **JSS**.
1. CSS bindings in popular libraries:
  1. React (e.g., \'className\', \'styled-components\').
  1. Angular (e.g., \'ngClass\', \'ngStyle\').

---

### **13. Grid Systems and Layout Strategies**
1. Building responsive grids manually or with frameworks.
1. Creating reusable layout components.
1. Understanding intrinsic and extrinsic sizing.

---

### **14. Debugging CSS**
1. Using browser developer tools for debugging.
1. Inspecting and editing styles in real-time.
1. Tools like **Stylelint** for linting and style errors.

---

### **15. Mentorship and Leadership**
1. Teaching CSS best practices to junior developers.
1. Conducting style audits and code reviews.
1. Leading CSS architecture for large-scale projects.

---

### **16. CSS Trends and Emerging Features**
1. Mastery of cutting-edge features:
  1. **Subgrid** in CSS Grid Layout.
  1. **Container Queries**.
  1. **@layer** for defining style layers.
1. Exploring future CSS specifications.

---

These topics emphasize the advanced expertise expected from a professional with **10+ years of CSS/CSS3 experience**, showcasing their ability to create responsive, maintainable, and scalable UI designs.
`;

const html5KeyTopics=`
For candidates with **10+ years of HTML/HTML5 experience**, the focus should be on their expertise in core HTML features, modern web development practices, and building accessible, semantic, and performant web pages. Below are the **key broader topics**:

---

### **1. Core HTML Fundamentals**
1. Understanding the structure of HTML documents:
  1. \'<!DOCTYPE>\', \'<html>\', \'<head>\', \'<body>\'.
1. Semantic HTML elements:
  1. \'<header>\', \'<footer>\', \'<section>\', \'<article>\', \'<nav>\', \'<aside>\'.
1. Inline vs block elements:
  1. Inline: \'<span>\', \'<a>\', \'<img>\'.
  1. Block: \'<div>\', \'<p>\', \'<ul>\', \'<table>\'.
1. Forms and inputs:
  1. \'<form>\', \'<input>\', \'<textarea>\', \'<select>\', \'<button>\'.
  1. Attributes: \'name\', \'id\', \'value\', \'placeholder\', \'required\', \'disabled\'.

---

### **2. HTML5 Features**
1. New semantic elements:
  1. \'<main>\', \'<figure>\', \'<figcaption>\', \'<time>\', \'<mark>\', \'<progress>\'.
1. Media elements:
  1. Audio: \'<audio>\' with \'controls\', \'autoplay\'.
  1. Video: \'<video>\' with \'controls\', \'poster\'.
1. Canvas and SVG:
  1. \'<canvas>\' for drawing graphics.
  1. Inline SVG for scalable vector graphics.
1. Improved form elements:
  1. New input types: \'email\', \'tel\', \'date\', \'color\', \'range\'.
  1. Validation attributes: \'pattern\', \'min\', \'max\', \'step\'.
1. Local storage and session storage:
  1. Using \'localStorage\' and \'sessionStorage\' for client-side data storage.

---

### **3. Semantic and Accessible Markup**
1. Writing meaningful, semantic HTML for better readability and SEO.
1. Using \'<aria-*>\' attributes for accessibility.
1. Landmarks and roles:
  1. \'<nav role="navigation">\', \'<main>\', \'<header>\', \'<footer>\'.
1. Keyboard navigability and focus management:
  1. \'tabindex\', \'accesskey\', and focusable elements.
1. Enhancing accessibility with screen reader compatibility.

---

### **4. Document Object Model (DOM) Structure**
1. Understanding the DOM tree:
  1. Elements, attributes, and nodes.
1. HTML element hierarchy and nesting rules.
1. Proper use of IDs and classes for styling and JavaScript hooks.

---

### **5. Forms and Data Handling**
1. Advanced form controls:
  1. \'<datalist>\', \'<fieldset>\', \'<legend>\', \'<output>\'.
1. Accessibility and usability in forms:
  1. Grouping inputs with \'<fieldset>\'.
  1. Associating labels with inputs using \'for\' and \'id\'.
1. Form validation:
  1. Built-in validation with \'required\', \'pattern\', \'minlength\', \'maxlength\'.
  1. Custom validation using JavaScript.

---

### **6. Cross-Browser Compatibility**
1. Understanding HTML5 feature support in different browsers.
1. Writing polyfills for unsupported features.
1. Tools like **Modernizr** to detect HTML5 feature support.

---

### **7. Responsive Design with HTML**
1. Mobile-first design:
  1. \'<meta name="viewport" content="width=device-width, initial-scale=1.0">\'.
1. Using HTML for responsive images:
  1. \'<picture>\' and \'<source>\' for adaptive images.
  1. Attributes: \'srcset\', \'sizes\', \'loading="lazy"\'.
1. Using media queries in conjunction with semantic elements.

---

### **8. HTML Performance Optimization**
1. Reducing page load time:
  1. Minimizing HTML size and whitespace.
  1. Using asynchronous loading for external scripts: \'async\' and \'defer\'.
1. Optimizing image delivery:
  1. Using modern formats like WebP.
  1. Specifying dimensions with \'width\' and \'height\' attributes.
1. Leveraging caching:
  1. Using \'meta\' tags and HTTP headers.

---

### **9. Metadata and SEO Optimization**
1. Writing metadata for improved SEO:
  1. \'<meta name="description">\', \'<meta name="keywords">\'.
1. Social media integration:
  1. Open Graph tags: \'<meta property="og:title">\', \'<meta property="og:image">\'.
  1. Twitter cards: \'<meta name="twitter:card">\', \'<meta name="twitter:title">\'.
1. Structured data with JSON-LD:
  1. Adding rich snippets for search engines.

---

### **10. HTML Integration with Other Technologies**
1. Linking HTML with CSS:
  1. Using \'<link>\' for external stylesheets.
  1. Embedding styles with \'<style>\'.
1. Linking HTML with JavaScript:
  1. Using \'<script>\' for inline and external scripts.
  1. Dynamic content injection using JavaScript.
1. Integration with frameworks:
  1. React, Angular, or Vue-based component rendering.
1. Server-side rendering (SSR):
  1. Pre-rendering HTML on the server.

---

### **11. HTML Templates**
1. Using \'<template>\' and \'<slot>\' for reusable components.
1. Shadow DOM integration for encapsulated styling and functionality.

---

### **12. HTML Standards and Best Practices**
1. Writing W3C-compliant HTML.
1. Using validators to ensure markup correctness.
1. Avoiding deprecated or obsolete elements:
  1. \'<font>\', \'<center>\', \'<marquee>\'.
1. Following security practices:
  1. Preventing XSS by sanitizing user input.

---

### **13. Debugging and Validation**
1. Tools for debugging HTML:
  1. Browser developer tools.
  1. Online validators like **W3C Markup Validation Service**.
1. Identifying and fixing semantic or structural issues.

---

### **14. HTML Internationalization**
1. Supporting multiple languages with \'lang\' attribute.
1. Right-to-left (RTL) text support using \'dir="rtl"\'.
1. Using \'<meta charset="UTF-8">\' for encoding.

---

### **15. Leadership and Mentorship**
1. Establishing best practices for HTML in teams.
1. Reviewing code for accessibility, performance, and maintainability.
1. Training junior developers in semantic and accessible HTML.

---

### **16. Emerging Trends and Features**
1. Exploring new HTML standards:
  1. \'<dialog>\' for modals.
  1. \'<details>\' and \'<summary>\' for collapsible content.
1. Integration with web components:
  1. Building custom reusable components with \'<template>\' and Shadow DOM.
1. Advancements in lazy-loading and resource optimization.

---

These broader topics showcase a **10+ year HTML/HTML5 expert's** ability to build semantic, performant, and scalable web applications while leveraging modern best practices and emerging trends.
`;

const microservicesKeyPoints=`
For candidates with **10+ years of Microservices experience**, the focus should be on advanced concepts and practices in building, deploying, and maintaining microservices in production environments. Below are the **key broader topics**:

---

### **1. Microservices Architecture Design**
1. **Core principles**: 
  1. Single Responsibility Principle (SRP), Independence, Decentralization, and Domain-Driven Design (DDD).
1. **Microservices vs Monolithic Architecture**:
  1. Advantages and trade-offs between microservices and monolithic systems.
1. **Microservices patterns**:
  1. API Gateway, Service Discovery, Circuit Breaker, CQRS (Command Query Responsibility Segregation).
1. **Designing for fault tolerance**: 
  1. Redundancy, graceful degradation, and self-healing systems.

---

### **2. Domain-Driven Design (DDD) and Bounded Contexts**
1. **Defining bounded contexts**: 
  1. Identifying and isolating different domains within a business.
1. **Strategic design in microservices**: 
  1. Aggregating, isolating, and managing different services.
1. **Entities, Aggregates, Repositories**: 
  1. Implementing core concepts of DDD in microservice design.

---

### **3. Service Communication Patterns**
1. **Synchronous vs Asynchronous Communication**:
  1. REST (JSON, XML), gRPC, WebSockets for real-time communication.
  1. Message Brokers (Kafka, RabbitMQ, etc.) for asynchronous communication.
1. **Event-driven architecture**:
  1. Implementing event sourcing and handling events between services.
1. **API Design and Versioning**:
  1. RESTful APIs, GraphQL, and their role in microservices communication.
  1. API Gateway pattern for API aggregation and routing.

---

### **4. Distributed Data Management**
1. **Database per service**:
  1. Decentralized data management, database consistency in microservices.
1. **Event Sourcing and CQRS**:
  1. Storing events and separating read and write models.
1. **Data replication and eventual consistency**:
  1. Handling distributed data and ensuring data consistency.
1. **Transaction management in distributed systems**:
  1. Saga pattern for long-running transactions.
  1. Managing eventual consistency and atomicity.

---

### **5. Service Discovery**
1. **Dynamic service discovery**:
  1. Using tools like **Consul**, **Eureka**, or **Zookeeper**.
1. **DNS-based service discovery**:
  1. Implementing DNS-based service registration and lookup.

---

### **6. Security in Microservices**
1. **Authentication and Authorization**:
  1. OAuth2, OpenID Connect, JWT for secure inter-service communication.
1. **Identity management**:
  1. Identity providers (IDPs), SSO, and user management.
1. **API Security**:
  1. Securing REST/gRPC APIs with HTTPS, rate limiting, and API gateways.
1. **Data encryption and privacy**:
  1. Secure data transmission (SSL/TLS), encryption at rest, and in transit.

---

### **7. Containerization and Orchestration**
1. **Docker and Containers**:
  1. Building and packaging microservices in Docker containers.
1. **Kubernetes**:
  1. Kubernetes architecture and orchestration for managing microservices at scale.
  1. Deployment strategies: Rolling updates, blue-green deployment, canary releases.
1. **Service Mesh**:
  1. Implementing **Istio**, **Linkerd**, and **Consul** for managing inter-service communication, traffic routing, and security.

---

### **8. Scalability and Performance**
1. **Horizontal scaling**:
  1. Scaling microservices by replicating instances across multiple nodes.
1. **Load balancing**:
  1. Strategies and tools for load balancing in microservices (e.g., Nginx, HAProxy, Istio).
1. **Caching strategies**:
  1. Distributed caching with **Redis**, **Memcached**.
  1. Cache management strategies like **Cache-Aside** and **Write-Through**.
1. **Latency and throughput optimization**:
  1. Optimizing microservice performance and response time.

---

### **9. Monitoring, Logging, and Observability**
1. **Centralized logging**:
  1. Tools: **ELK Stack (Elasticsearch, Logstash, Kibana)**, **Splunk**, **Fluentd**.
1. **Distributed tracing**:
  1. **Jaeger**, **Zipkin** for tracing service calls and understanding latencies.
1. **Metrics and alerting**:
  1. Prometheus, Grafana for real-time monitoring and setting up alerts.
1. **Health checks and service monitoring**:
  1. Implementing \`/health\` endpoints, using **Consul** and **Prometheus** for health monitoring.

---

### **10. Continuous Integration / Continuous Delivery (CI/CD)**
1. **CI/CD pipelines**:
  1. Tools: **Jenkins**, **GitLab CI**, **CircleCI**, **Travis CI** for automating the build, test, and deployment process.
1. **Infrastructure as Code (IaC)**:
  1. Using **Terraform**, **Ansible**, **CloudFormation** to automate infrastructure provisioning and management.
1. **Blue-Green and Canary Deployments**:
  1. Implementing safe deployment strategies to reduce downtime and risk.

---

### **11. Fault Tolerance and Resilience**
1. **Resilience patterns**:
  1. Circuit Breaker (with **Hystrix**, **Resilience4j**), Retry, Timeout, Bulkhead.
1. **Fallback and Graceful Degradation**:
  1. Designing systems that can continue operating under failure conditions.
1. **Retry and Backoff strategies**:
  1. Handling transient failures with exponential backoff and retries.

---

### **12. Testing Microservices**
1. **Unit Testing**:
  1. Mocking external dependencies and writing isolated tests.
1. **Integration Testing**:
  1. Testing interactions between microservices and dependencies.
1. **Contract Testing**:
  1. **Pact** for consumer-driven contract testing.
1. **End-to-End Testing**:
  1. Automated end-to-end testing tools like **Cypress**, **Selenium**, **Postman**.

---

### **13. DevOps Practices and Automation**
1. **Microservices deployment pipelines**:
  1. Automating deployments with **Jenkins**, **GitLab**, **AWS CodePipeline**.
1. **Container orchestration and scaling**:
  1. Managing microservices at scale with **Kubernetes** or **Docker Swarm**.
1. **Automation**:
  1. Automating repetitive tasks, monitoring, testing, and deployment for a microservices environment.

---

### **14. Cloud-Native Microservices**
1. **Serverless architecture**:
  1. Using serverless compute services like **AWS Lambda**, **Azure Functions**, and **Google Cloud Functions**.
1. **Cloud providers**:
  1. Deployment and orchestration on **AWS**, **Azure**, **Google Cloud**.
1. **Managed services**:
  1. Leveraging managed database services, queues, and caches in cloud environments.

---

### **15. Legacy Systems Integration**
1. **Handling hybrid architectures**:
  1. Integrating monolithic and microservices-based systems.
1. **Database migration**:
  1. Managing migrations from monolithic to microservices architectures.
1. **Data consistency**:
  1. Ensuring data consistency between legacy and microservices applications.

---

### **16. Emerging Trends and Technologies**
1. **Service Mesh**:
  1. Using **Istio**, **Linkerd**, or **Consul** to manage inter-service communication, security, and traffic management.
1. **GraphQL**:
  1. Implementing GraphQL as a service layer for data aggregation.
1. **Event-Driven Microservices**:
  1. Moving towards fully event-driven architecture using tools like **Apache Kafka**, **RabbitMQ**.

---

These broader topics reflect the expertise expected from candidates with **10+ years of Microservices experience** and emphasize the application of various best practices, technologies, and strategies across the entire lifecycle of microservices-based systems.
`;

export const TechStackKeyBroaderTopics: Record<string, string> = {
  [TechStacks.JAVA]: javaKeyTopics,
  [TechStacks.Java8Plus]: "",
  [TechStacks.SpringBoot]: "",
  [TechStacks.Spring]: "",
  [TechStacks.JDBC]: "",
  [TechStacks.JasperReports]: "",
  [TechStacks.Junit]: "",
  [TechStacks.Swing]: "",
  [TechStacks.J2ee_jee]: "",
  [TechStacks.JSP]: "",
  [TechStacks.Servlets]: "",
  [TechStacks.Hibernate]: hibernateKeyTopics,

  [TechStacks.ReactJS]: reactJsKeyTopics,
  [TechStacks.NextJS]: "",
  [TechStacks.JavaScript]: javaScriptKeyTopics,
  [TechStacks.EcmaScript]: "",
  [TechStacks.TypeScript]: typeScriptKeyTopics,
  [TechStacks.Ajax]: "",
  [TechStacks.CSS]: css3KeyTopics,
  [TechStacks.HTML]: html5KeyTopics,

  [TechStacks.Microservices]: microservicesKeyPoints,
  [TechStacks.Docker]: "",
  [TechStacks.Kubernetes]: "",
  [TechStacks.Maven]: "",
  [TechStacks.Gradle]: "",
  [TechStacks.Ant]: "",
  [TechStacks.ApplicationServer]: "", // Broad concept without version history
  [TechStacks.Tomcat]: "",
  [TechStacks.Weblogic]: "",
  [TechStacks.Websphere]: "",
  [TechStacks.Database]: "", // Broad category
  [TechStacks.RelationalDatabases]: "",
  [TechStacks.MySQL]: "",
  [TechStacks.NoSQLDatabases]: "",
  [TechStacks.MongoDB]: "",
  [TechStacks.VersionControl]: "",
  [TechStacks.CVS]: "",
  [TechStacks.SVN]: "",
  [TechStacks.GIT]: "",
  [TechStacks.GitHub]: "",
  [TechStacks.BitBucket]: "",
  [TechStacks.GitLab]: "",
};
