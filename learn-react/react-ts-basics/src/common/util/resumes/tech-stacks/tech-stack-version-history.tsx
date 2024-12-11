import { TechStacks } from "../initial-records";

const javaVersionHistory = `
1.0 (23-Jan-1996)

### Java Version History

1. **Java 1.0 (Oak)**  
   **Release Date:** 23-Jan-1996  
   - Initial release with applet support for browsers.

2. **Java 1.1**  
   **Release Date:** 19-Feb-1997  
   - Added AWT event handling, JDBC, and inner classes.

3. **Java 1.2 (J2SE)**  
   **Release Date:** 08-Dec-1998  
   - Introduced Swing, Java Plugin, Collections Framework.  
   - Marked the transition to "Java 2 Platform."

4. **Java 1.3 (J2SE)**  
   **Release Date:** 08-May-2000  
   - Improved performance, introduced RMI over IIOP and JavaSound.

5. **Java 1.4 (J2SE)**  
   **Release Date:** 06-Feb-2002  
   - Added XML parsing, assert keyword, logging API, and chained exceptions.

6. **Java 5.0 (J2SE 5.0)**  
   **Release Date:** 30-Sep-2004  
   - Major updates: generics, annotations, autoboxing/unboxing, and enhanced \'for\' loop.

7. **Java 6 (Java SE 6)**  
   **Release Date:** 11-Dec-2006  
   - Focused on improvements: scripting via JSR 223, JDBC 4.0, and enhanced Web Services API.

8. **Java 7 (Java SE 7)**  
   **Release Date:** 07-Jul-2011  
   - Features: try-with-resources, switch on strings, and \'Fork/Join\' framework.

9. **Java 8 (Java SE 8)**  
   **Release Date:** 18-Mar-2014  
   - Game-changer: Lambda expressions, Stream API, \'Optional\', and Date/Time API.

10. **Java 9 (Java SE 9)**  
    **Release Date:** 21-Sep-2017  
    - Introduced modularity with Project Jigsaw, JShell (REPL), and HTTP/2 client.

11. **Java 10 (Java SE 10)**  
    **Release Date:** 20-Mar-2018  
    - Features: Local variable type inference (\'var\'), G1 heap improvements.

12. **Java 11 (Java SE 11)**  
    **Release Date:** 25-Sep-2018  
    - Long-Term Support (LTS) release. Added \'var\' in lambda, HTTP/2 client, and removed JavaFX.

13. **Java 12 (Java SE 12)**  
    **Release Date:** 19-Mar-2019  
    - Minor updates: JVM improvements and switch expressions (preview).

14. **Java 13 (Java SE 13)**  
    **Release Date:** 17-Sep-2019  
    - Features: Text blocks (preview) and dynamic CDS archives.

15. **Java 14 (Java SE 14)**  
    **Release Date:** 17-Mar-2020  
    - Features: Switch expressions, records (preview), and helpful null pointer exceptions.

16. **Java 15 (Java SE 15)**  
    **Release Date:** 15-Sep-2020  
    - Added sealed classes (preview) and hidden classes for frameworks.

17. **Java 16 (Java SE 16)**  
    **Release Date:** 16-Mar-2021  
    - Made records and pattern matching final.

18. **Java 17 (Java SE 17)**  
    **Release Date:** 14-Sep-2021  
    - LTS release: Sealed classes, pattern matching for switch, and removed RMI Activation.

19. **Java 18 (Java SE 18)**  
    **Release Date:** 22-Mar-2022  
    - Features: Simple web server, UTF-8 by default, and JEP 400.

20. **Java 19 (Java SE 19)**  
    **Release Date:** 20-Sep-2022  
    - Updates: Virtual threads (preview), structured concurrency, and pattern matching.

21. **Java 20 (Java SE 20)**  
    **Release Date:** 21-Mar-2023  
    - Continued previews: Record patterns, virtual threads, and vector API improvements.

22. **Java 21 (Java SE 21)**  
    **Release Date:** 19-Sep-2023  
    - LTS release: Finalized virtual threads and record patterns, reintroduced \'foreign\' API as stable.

---

Java continues to evolve with frequent feature-rich releases, emphasizing performance, developer productivity, and modern programming paradigms.

    `;

const springBootVersionHistory = `
1.0 (01-Apr-2014)

### Spring Boot Version History

1. **1.0.0.RELEASE** (01-Apr-2014)  
  Initial release of Spring Boot. Focused on convention-over-configuration, starter dependencies, and embedded servers.

2. **1.1.0.RELEASE** (27-May-2014)  
  Introduced enhancements in auto-configuration and dependency management.

1. **1.2.0.RELEASE** (09-Dec-2014)  
  Added support for Gradle-based projects, and introduced actuator improvements.

1. **1.3.0.RELEASE** (16-Dec-2015)  
  Support for remote shell, spring-cloud CLI, and various improvements to the actuator.

1. **1.4.0.RELEASE** (01-Aug-2016)  
  Added enhanced testing support including the \`@SpringBootTest\` annotation.

1. **1.5.0.RELEASE** (19-Jan-2017)  
  Compatibility with Spring Framework 4.3, and support for Kotlin.

1. **2.0.0.RELEASE** (01-Mar-2018)  
  Major release with Spring Framework 5.0 support. Introduced reactive programming support and updated actuator endpoints.

1. **2.1.0.RELEASE** (23-Oct-2018)  
  Enhanced Hibernate and JPA support, and improved Docker integration.

1. **2.2.0.RELEASE** (16-Oct-2019)  
  Java 13 support, improved startup performance, and extended actuator functionality.

1. **2.3.0.RELEASE** (15-May-2020)  
  Docker image generation via Cloud Native Buildpacks and Kubernetes support.

1. **2.4.0.RELEASE** (12-Nov-2020)  
  Enhanced support for configuration properties and improved support for Gradle.

1. **2.5.0.RELEASE** (20-May-2021)  
  Support for Java 16, updates to \`spring-native\`, and additional actuator improvements.

1. **2.6.0.RELEASE** (18-Nov-2021)  
  Improved testing support, enhancements for observability, and Kotlin 1.5 compatibility.

1. **2.7.0.RELEASE** (19-May-2022)  
  Long-term support release with extended maintenance and enhanced actuator metrics.

1. **3.0.0.RELEASE** (24-Nov-2022)  
  Support for Spring Framework 6.0, Java 17 baseline, and migration to Jakarta EE APIs.

1. **3.1.0.RELEASE** (18-May-2023)  
  Enhanced support for AOT (ahead-of-time) compilation, improved observability, and advanced testing utilities.
`;

const springVersionHistory = `
1. **1.0.0** (24-Mar-2004)  
   Initial release of the Spring Framework. Focused on dependency injection and AOP-based programming.

2. **1.2.0** (18-Aug-2005)  
   Improved Hibernate integration, new testing utilities, and added support for scheduling and asynchronous tasks.

3. **2.0.0** (02-Oct-2006)  
   Major update with support for AspectJ, simplified XML configuration, and improved web frameworks like Spring MVC.

4. **2.5.0** (19-Nov-2007)  
   Added annotation-based configuration (\`@Autowired\`, \`@Component\`) and Java 5 support.

5. **3.0.0** (15-Dec-2009)  
   Introduced JavaConfig support, REST support in Spring MVC, and full integration with Java EE 6.

6. **3.1.0** (13-Dec-2011)  
   Introduced caching support and environment profiles with \`@Profile\` annotation.

7. **3.2.0** (12-Dec-2012)  
   Improved asynchronous request processing, Java 8 readiness, and expanded REST support.

8. **4.0.0** (12-Dec-2013)  
   Support for Java 8, Groovy DSL, and WebSocket integration.

9. **4.1.0** (10-Sep-2014)  
   Enhanced annotation-based configuration and improved caching capabilities.

10. **4.2.0** (30-Jul-2015)  
    Introduced support for HTTP streaming and improved integration testing utilities.

11. **5.0.0** (28-Sep-2017)  
    Major release with support for Java 8/9, reactive programming (Project Reactor), and Spring WebFlux.

12. **5.1.0** (19-Sep-2018)  
    Enhanced Kotlin support, better integration with JDK 11, and performance improvements.

13. **5.2.0** (03-Oct-2019)  
    Added support for RSocket, GraalVM native images, and refined WebFlux capabilities.

14. **5.3.0** (20-Oct-2020)  
    Introduced native support for Java 15, functional bean registration, and enhanced observability.

15. **6.0.0** (16-Nov-2022)  
    Migrated to Jakarta EE APIs, set Java 17 as baseline, and introduced improved AOT (Ahead-of-Time) compilation support.

16. **6.1.0** (Sep-2023)  
    Improved observability integration, Kotlin enhancements, and advanced HTTP interfaces support.
`;

const reactJsVersionHistory = `
0.3.0 (29-May-2013)

### ReactJS Version History

1. **React 0.3.0 (May 2013)**  
   1. First open-source release by Facebook.
   2. Introduced the concept of components and the virtual DOM.

2. **React 0.5.0 (August 2013)**  
   1. Improved performance with \'key\' prop for list rendering.
   2. Added support for server-side rendering (SSR).

3. **React 0.9.0 (December 2013)**  
   1. Introduced the \'ref\' API for accessing DOM elements.
   2. Added more debugging tools for developers.

4. **React 0.12.0 (October 2014)**  
   1. Major improvements in React's developer tools.
   2. Deprecated \'React.createClass()\' in favor of ES6 classes.

5. **React 0.13.0 (March 2015)**  
   1. Official support for ES6 classes.
   2. Simplified state and lifecycle methods in functional components.

6. **React 0.14.0 (October 2015)**  
   1. Introduced functional, stateless components.
   2. Separated \'React\' and \'ReactDOM\' into different libraries for modularity.

7. **React 15.0.0 (April 2016)**  
   1. Major overhaul of the rendering engine.
   2. Added better support for SVGs and forms.
   3. Improved error messages and warnings during development.

8. **React 16.0.0 (September 2017)**  
   1. Introduced the new reconciliation algorithm ("Fiber").
   2. Added support for error boundaries with the \'componentDidCatch\' lifecycle method.
   3. Allowed returning fragments and strings from \'render()\'.

9. **React 16.3.0 (March 2018)**  
   1. Added the Context API for managing global state.
   2. Introduced \'getDerivedStateFromProps\' and \'getSnapshotBeforeUpdate\'.

10. **React 16.6.0 (October 2018)**  
    1. Introduced React.lazy for code-splitting.
    2. Added React.memo for optimizing functional components.

11. **React 16.8.0 (February 2019)**  
    1. Introduced Hooks (\'useState\', \'useEffect\', etc.), enabling state and lifecycle management in functional components.

12. **React 17.0.0 (October 2020)**  
    1. No breaking changes; focused on gradual upgrades.
    2. Enhanced support for event delegation.
    3. Improved compatibility for concurrent rendering.

13. **React 18.0.0 (March 2022)**  
    1. Introduced Concurrent Rendering for better user experiences.
    2. Added Suspense for data fetching.
    3. \'useId\' Hook for generating unique IDs on both client and server.

14. **React 18.2.0 (June 2022)**  
    1. Minor updates and bug fixes for the React 18 features.
    2. Improved developer experience for concurrent features.

React's journey reflects its focus on improving performance, scalability, and developer experience while ensuring backward compatibility and innovation.
`;

const nextJsVersionHistory = `
1.0 (25-Oct-2016)

### Next.js Version History

1. **Next.js 1.0.0 (October 2016)**  
   1. Initial release by Zeit (now Vercel).  
   2. Focused on server-side rendering (SSR) and zero-config setup.

2. **Next.js 2.0.0 (March 2017)**  
   1. Introduced support for dynamic imports and code splitting.
   2. Added custom server support for advanced routing.

3. **Next.js 3.0.0 (August 2017)**  
   1. Added support for static exports.  
   2. Introduced a plugin system for extending webpack configuration.  

4. **Next.js 4.0.0 (October 2017)**  
   1. Added support for React 16.  
   2. Improved performance and optimized build times.

5. **Next.js 5.0.0 (February 2018)**  
   1. Added \'next/link\' and \'next/router\' for client-side navigation.  
   2. Introduced multi-zone support for hybrid applications.  

6. **Next.js 6.0.0 (June 2018)**  
   1. Improved support for AMP (Accelerated Mobile Pages).  
   2. Added built-in CSS support with scoped CSS modules.

7. **Next.js 7.0.0 (October 2018)**  
   1. Introduced automatic static optimization for faster performance.  
   2. Enhanced error overlay for development.  

8. **Next.js 8.0.0 (February 2019)**  
   1. Added support for serverless deployment.  
   2. Introduced API routes for server-side logic.  

9. **Next.js 9.0.0 (July 2019)**  
   1. Introduced \'getStaticProps\' and \'getServerSideProps\' for data fetching.  
   2. Added dynamic routing with file-based routes.  

10. **Next.js 9.3.0 (March 2020)**  
    1. Added Incremental Static Regeneration (ISR).  
    2. Introduced \'getStaticPaths\' for dynamic static pages.  

11. **Next.js 10.0.0 (October 2020)**  
    1. Added built-in image optimization with the \'next/image\' component.  
    2. Introduced Internationalized Routing (i18n).  

12. **Next.js 11.0.0 (June 2021)**  
    1. Added support for Webpack 5 by default.  
    2. Introduced Conformance for enforcing best practices.  

13. **Next.js 12.0.0 (October 2021)**  
    1. Launched Rust-based compiler for faster builds.  
    2. Introduced Middleware for edge rendering.  
    3. Added support for React Server Components (experimental).  

14. **Next.js 13.0.0 (October 2022)**  
    1. Introduced the App Router with React Server Components and Layouts.  
    2. Added support for the Turbopack bundler (experimental).  

15. **Next.js 13.4.0 (May 2023)**  
    1. Improved App Router stability and performance.  
    2. Enhanced streaming with server actions.

16. **Next.js 14.0.0 (October 2023)**  
    1. Added stable support for server actions.  
    2. Improved Turbopack support for production builds.  

Next.js has consistently evolved to provide a cutting-edge framework for modern web applications, offering seamless integration of SSR, static generation, and client-side rendering.
`;

const jUnitVersionHistory=`
Here's the version history of **JUnit**, a popular testing framework for Java, in a numbered list:

1. **JUnit 1.0** (May 2000)
   1. Initial release of JUnit by Kent Beck and Erich Gamma.
   1. Introduced the concept of unit testing for Java applications.

2. **JUnit 2.0** (Dec 2000)
   1. Introduced annotations and improved support for running tests.
   1. Also, the concept of test suites was added.

3. **JUnit 3.0** (Mar 2002)
   1. Introduced \'setUp()\' and \'tearDown()\' methods for preparing and cleaning up test environments.
   1. Enhanced support for assertions.

4. **JUnit 3.8** (Dec 2003)
   1. Added features like \'@Test\' annotations.
   1. More flexible and scalable in organizing tests.
   1. Introduced the \'TestCase\' class.

5. **JUnit 4.0** (Jun 2006)
   1. Major update, introducing annotations such as \'@Before\', \'@After\', \'@BeforeClass\', \'@AfterClass\', and \'@Test\'.
   1. Removed the need for extending the \'TestCase\' class.
   1. The framework became more flexible with the introduction of JUnit runner and test suites.

6. **JUnit 4.4** (Jul 2007)
   1. Improved exception handling, \'assertThrows\', and more flexibility with custom runners.

7. **JUnit 5.0** (Sep 2017)
   1. Major overhaul, with a new architecture consisting of three sub-projects: JUnit Platform, JUnit Jupiter, and JUnit Vintage.
     1. **JUnit Platform**: Provides the foundation for launching tests on different environments.
     1. **JUnit Jupiter**: Introduced a new programming model and test engine based on annotations like \'@Test\', \'@BeforeEach\', \'@AfterEach\'.
     1. **JUnit Vintage**: Ensures backward compatibility with JUnit 3 and JUnit 4.

8. **JUnit 5.1** (Nov 2017)
   1. Included support for testing with \'@ParameterizedTest\'.
   1. Improvements to the JUnit Jupiter framework.

9. **JUnit 5.2** (Sep 2018)
   1. More extensive support for parameterized tests and extensions.
   1. Improved integration with IDEs and build tools.

10. **JUnit 5.3** (Nov 2018)
    1. Added more enhancements, including better support for parameterized tests and assertions.

11. **JUnit 5.4** (Apr 2019)
    1. Introduced new ways to use test extensions and enhancements to the lifecycle hooks for tests.

12. **JUnit 5.5** (Sep 2019)
    1. Performance optimizations and improvements in test discovery.
    1. Enhanced support for running tests in parallel.

13. **JUnit 5.6** (Mar 2020)
    1. Continued performance improvements and bug fixes.
    1. Support for more robust integrations with tools like Maven, Gradle, and IDEs.

14. **JUnit 5.7** (Jul 2020)
    1. New extension model improvements.
    1. Better support for Java 16 and new JDKs.
    1. Introduced support for conditional test execution.

15. **JUnit 5.8** (Aug 2021)
    1. Focused on improved user experience and performance.
    1. Extended support for JUnit Platform for better reporting and feedback.

16. **JUnit 5.9** (Sep 2022)
    1. Significant improvements in testing capabilities and integration with build systems.
    1. More flexible conditions for test executions, and better support for running tests on different platforms.

Each release of JUnit has steadily improved and introduced new features to help developers write robust, maintainable, and efficient unit tests for Java applications.
`;

const j2eeJeeVersionHistory=`
Here’s the version history of **J2EE** (Java 2 Platform, Enterprise Edition), which later became **JEE** (Java Platform, Enterprise Edition), and finally transitioned to **Jakarta EE**:

1. **J2EE 1.2** (Dec 1999)
   1. First official release of J2EE, focused on enterprise applications and added support for Servlets, JSP (JavaServer Pages), and EJB (Enterprise JavaBeans).
   1. Introduced core technologies like JNDI (Java Naming and Directory Interface), JDBC, and JMS (Java Message Service).

2. **J2EE 1.3** (Sep 2001)
   1. Improved EJBs with version 2.0.
   1. Introduced the **JSP 1.2** specification and the **Servlet 2.3** specification.
   1. Added JTA (Java Transaction API) and the **JavaMail API**.

3. **J2EE 1.4** (Nov 2003)
   1. Introduced Web Services support, including JAX-RPC and JAX-RI for SOAP-based communication.
   1. Enhanced support for EJB 2.1 and included the **JMS 1.1** specification.
   1. Added features like **JCA** (Java Connector Architecture) and **JSP 2.0**.

4. **Java EE 5** (May 2006)
   1. Renamed from **J2EE** to **Java EE**.
   1. Introduced EJB 3.0 with annotations and POJOs (Plain Old Java Objects), significantly simplifying enterprise Java development.
   1. Major updates to **JSP 2.1** and **Servlet 2.5**.
   1. Introduced **JSF** (JavaServer Faces) for building user interfaces.

5. **Java EE 6** (Dec 2009)
   1. Introduced **Contexts and Dependency Injection (CDI)** and **JSF 2.0**.
   1. Simplified EJB 3.1 and added support for **JPA 2.0** (Java Persistence API).
   1. Focused on annotations and conventions-over-configuration approach.
   1. **Servlet 3.0** and **JAX-RS 1.0** (Java API for RESTful Web Services) were also part of this release.

6. **Java EE 7** (Jun 2013)
   1. Introduced new features for **WebSocket**, **Batch Processing**, and **Concurrency**.
   1. Enhanced **JPA 2.1** and **JAX-RS 2.0**.
   1. Focused on making Java EE easier to use, with improvements to CDI and JMS.

7. **Java EE 8** (Sep 2017)
   1. Final release before the transition to the **Eclipse Foundation** and the renaming to **Jakarta EE**.
   1. Introduced **Java API for JSON Binding (JSON-B)** and **JSON Processing (JSON-P)**.
   1. Updated **Servlet 4.0** to support **HTTP/2**.
   1. Other improvements to **JSP**, **JSF**, and **EJB**.

8. **Jakarta EE 9** (Dec 2020)
   1. After the transition to the Eclipse Foundation, **Java EE** was renamed to **Jakarta EE**.
   1. **Jakarta EE 9** focused on the migration of Java EE APIs to the **Jakarta** namespace.
   1. No new features were added, but it was a crucial step for the transition.

9. **Jakarta EE 9.1** (May 2021)
   1. Minor update to **Jakarta EE 9** with support for **Java SE 11** and a few bug fixes.
   1. This version marked the continuation of the transition towards more modular, cloud-native enterprise applications.

10. **Jakarta EE 10** (Jun 2022)
    1. Major update with several new features and updates to existing specifications like **Jakarta REST**, **Jakarta CDI**, **Jakarta JMS**, and **Jakarta Security**.
    1. Introduced updates for better cloud-native and microservices support.
    1. Enhanced compatibility with **MicroProfile** for building microservices in Java.

Each version of J2EE/Java EE/Jakarta EE has evolved to accommodate the growing needs of enterprise application development, with an increasing focus on simplicity, modularity, and cloud-native architecture.
`;

const hibernateVersionHistory=`
Here's the version history of **Hibernate**, a widely-used Java-based ORM (Object-Relational Mapping) framework:  

---

### Hibernate Version History  

1. **Hibernate 1.0** (2001)  
   1. Initial release by Gavin King.  
   1. Provided basic ORM functionality for mapping Java objects to relational database tables.  

2. **Hibernate 2.0** (2003)  
   1. Improved mapping features and query capabilities.  
   1. Introduced the **Hibernate Query Language (HQL)**.  

3. **Hibernate 3.0** (2005)  
   1. Added support for **annotations**.  
   1. Introduced **Filters**, **Hibernate Validator**, and integration with **JPA 1.0**.  
   1. Enhanced caching mechanisms with support for second-level caching.  

4. **Hibernate 3.5** (2010)  
   1. Full support for **Java Persistence API (JPA 2.0)**.  
   1. Focused on standardizing persistence for Java EE applications.  

5. **Hibernate 4.0** (2011)  
   1. Major restructuring of the Hibernate Core.  
   1. Improved support for **caching providers** and **multi-tenancy**.  
   1. Introduced a service registry to enhance modularity.  

6. **Hibernate 5.0** (2015)  
   1. Added support for **Java 8**, including the new **Date and Time API**.  
   1. Enhanced capabilities for multi-tenancy and batch processing.  
   1. Introduced **Envers** for auditing and history tracking.  
   1. Expanded HQL with new syntax and features.  

7. **Hibernate 5.1 to 5.4** (2016–2021)  
   1. Iterative updates for better **JPA 2.1 and 2.2** support.  
   1. Integration with frameworks like Spring and better compatibility with **Java 9+**.  
   1. Improved performance optimizations for high-throughput applications.  

8. **Hibernate 6.0** (Mar 2022)  
   1. Major rewrite of the internal architecture.  
   1. Added support for **Jakarta Persistence (JPA 3.0)** after the migration from Java EE to Jakarta EE.  
   1. Improved query processing and schema generation.  
   1. Enhanced compatibility with modern SQL databases and cloud platforms.  

9. **Hibernate 6.1** (2023)  
   1. Focused on **native database capabilities** like JSON and spatial data.  
   1. Enhanced integration with **Java 17** and **Jakarta EE 10**.  
   1. Further improvements to multi-tenancy and reactive programming features.  

---

Hibernate continues to evolve as a crucial tool in Java development, providing developers with robust ORM functionality, tight integration with Java EE/Jakarta EE, and compatibility with modern database features.
`;

export const TechStackVersionHistory: Record<string, string> = {
  [TechStacks.JAVA]: javaVersionHistory,
  [TechStacks.Java8Plus]: "Java 8 (18-Mar-2014)",
  [TechStacks.SpringBoot]: springBootVersionHistory,
  [TechStacks.Spring]: springVersionHistory,
  [TechStacks.JDBC]: "",
  [TechStacks.JasperReports]: "",
  [TechStacks.Junit]: jUnitVersionHistory,
  [TechStacks.Swing]: "",
  [TechStacks.J2ee_jee]: j2eeJeeVersionHistory,
  [TechStacks.JSP]: "",
  [TechStacks.Servlets]: "",
  [TechStacks.Hibernate]:hibernateVersionHistory,

  [TechStacks.ReactJS]: reactJsVersionHistory,
  [TechStacks.NextJS]: nextJsVersionHistory,
  [TechStacks.JavaScript]: "ECMAScript 1.0 (Jun-1997)",
  [TechStacks.EcmaScript]: "1st Edition (Jun-1997)",
  [TechStacks.TypeScript]: "1.0 (01-Oct-2012)",
  [TechStacks.Ajax]: "",
  [TechStacks.CSS]: "",
  [TechStacks.HTML]: "",

  [TechStacks.Microservices]: "Concept emerged ~2010",
  [TechStacks.Docker]: "1.0 (13-Mar-2013)",
  [TechStacks.Kubernetes]: "1.0 (21-Jul-2015)",
  [TechStacks.Maven]: "1.0 (13-Jul-2004)",
  [TechStacks.Gradle]: "0.7 (01-Feb-2008)",
  [TechStacks.Ant]: "1.0 (19-Jul-2000)",
  [TechStacks.ApplicationServer]: "", // Broad concept without version history
  [TechStacks.Tomcat]: "3.0 (03-Dec-1999)",
  [TechStacks.Weblogic]: "1.0 (08-Dec-1995)",
  [TechStacks.Websphere]: "3.0 (01-Jun-1998)",
  [TechStacks.Database]: "", // Broad category
  [TechStacks.RelationalDatabases]: "Introduced ~1970s",
  [TechStacks.MySQL]: "3.23 (May-1995)",
  [TechStacks.NoSQLDatabases]: "Concept emerged ~2000s",
  [TechStacks.MongoDB]: "1.0 (11-Feb-2009)",
  [TechStacks.VersionControl]: "Concept emerged ~1970s",
  [TechStacks.CVS]: "1.0 (19-Nov-1990)",
  [TechStacks.SVN]: "1.0 (23-Feb-2004)",
  [TechStacks.GIT]: "1.0 (07-Apr-2005)",
  [TechStacks.GitHub]: "Launched (10-Apr-2008)",
  [TechStacks.BitBucket]: "Launched (06-Sep-2008)",
  [TechStacks.GitLab]: "Launched (22-Oct-2011)",
};
