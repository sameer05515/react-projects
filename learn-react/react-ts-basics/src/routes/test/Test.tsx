import { useState } from "react";
import MarkdownComponent from "../../common/components/markdown-component/MarkdownComponent";
import {
  wageDetails,
  ctcDetails,
} from "../../common/util/wage-calculation/wage-calculation";
import { renderCard } from "../../common/components/custom-card/Card";

const str1 = `
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

const str2 = "**Prem** : I will earn 500Cr very soon.";
const str3 = `
- monolithic_modular_architecture
- client_server_architecture
`;

const markdownText = `
# Header
This is **bold** text and *italic* text.

- List item 1
- List item 2
`;

const str4 = "[`Status`]: Integrating MarkdownComponent";

const SpringBootVersionHistory = `
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

const strArr = [str1, str2, str3, str4, markdownText, SpringBootVersionHistory];

const Test = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div>
      <button
        onClick={() => setSelectedIndex((prev) => (prev + 1) % strArr.length)}
      >
        Selected Index: {selectedIndex}
      </button>
      <MarkdownComponent markdownText={strArr[selectedIndex]} />

      {renderCard({
        title: "CTC Data",
        objectToBeRendered: { wageDetails, ctcDetails },
      })}
    </div>
  );
};

export default Test;
