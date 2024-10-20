/**
 * In this version of data file, `Cell value` will contain data as either of string or array of strings
 *
 * Will try to render this type of `ComparisonDataType` in my `SPPTable`
 *
 */

// Generic Row Item Type for N comparisons
export type CDRowItemType<CELL_VALUE_TYPE> = {
  aspect: string;
  values: CELL_VALUE_TYPE[];  
};

// Generic Comparison Data Type for N comparisons
export type ComparisonDataType<CELL_VALUE_TYPE> = {
  uniqueId: string;
  title: string;
  headers: string[]; // Headers for N items
  rowData: CDRowItemType<CELL_VALUE_TYPE>[];
};

/** Generalized comparison data for "ArrayList vs LinkedList" */
const comparison_ArrayListVSLinkedList: ComparisonDataType<string> = {
  uniqueId: "Comparison_ArrayListVSLinkedList",
  title: "Comparison: ArrayList vs LinkedList",
  headers: ["ArrayList", "LinkedList"],
  rowData: [
    {
      aspect: "Underlying Data Structure",
      values: ["Resizable array", "Doubly linked list"],
    },
    {
      aspect: "Access Time (get())",
      values: [
        "O(1) - Fast random access due to direct indexing",
        "O(n) - Sequential access is required",
      ],
    },
    {
      aspect: "Insertion Time (add())",
      values: [
        "O(n) - Requires shifting elements when inserting in the middle or beginning",
        "O(1) - Efficient insertion at the beginning or middle",
      ],
    },
    {
      aspect: "Deletion Time (remove())",
      values: [
        "O(n) - Requires shifting elements when removing from the middle or beginning",
        "O(1) - Efficient removal from the beginning or middle",
      ],
    },
    {
      aspect: "Memory Usage",
      values: [
        "Less memory overhead as it only stores the elements",
        "More memory overhead due to storing node pointers",
      ],
    },
    {
      aspect: "Use Case",
      values: [
        "Better for frequent access operations",
        "Better for frequent insertion and deletion operations",
      ],
    },
  ],
};

/** Generalized comparison data for "Set vs List" */
const comparison_SetVSList: ComparisonDataType<string> = {
  uniqueId: "Comparison_SetVSList",
  title: "Comparison: Set vs List",
  headers: ["Set", "List"],
  rowData: [
    {
      aspect: "Duplicates",
      values: ["No duplicates allowed", "Allows duplicates"],
    },
    {
      aspect: "Order",
      values: ["No guaranteed order", "Maintains insertion order"],
    },
    {
      aspect: "Access Time",
      values: [
        "O(1) on average with HashSet, O(log n) with TreeSet",
        "O(n) for LinkedList, O(1) for ArrayList",
      ],
    },
    {
      aspect: "Use Case",
      values: [
        "Good when uniqueness of elements is needed",
        "Good when you need to maintain an ordered collection of elements",
      ],
    },
  ],
};

/** Generalized comparison data for "Spring vs Spring Boot" */
const comparison_SpringVSSpringBoot: ComparisonDataType<string> = {
  uniqueId: "Comparison_SpringVSSpringBoot",
  title: "Comparison: Spring vs Spring Boot",
  headers: ["Spring", "Spring Boot"],
  rowData: [
    {
      aspect: "Setup",
      values: [
        "Requires manual setup and configuration",
        "Provides auto-configuration to simplify setup",
      ],
    },
    {
      aspect: "Development Speed",
      values: [
        "Slower due to boilerplate and configuration",
        "Faster due to embedded server and defaults",
      ],
    },
    {
      aspect: "Project Structure",
      values: [
        "Requires separate server and manual dependency management",
        "Provides an embedded server and simplifies dependency management",
      ],
    },
    {
      aspect: "Use Case",
      values: [
        "Good for large-scale, complex applications with custom configurations",
        "Ideal for microservices and rapid development with minimal configuration",
      ],
    },
  ],
};

/** Sample comparison data for String vs StringBuffer vs StringBuilder */
const comparison_String_VS_StringBuffer_VS_StringBuilder: ComparisonDataType<string> =
  {
    uniqueId: "Comparison_String_VS_StringBuffer_VS_StringBuilder",
    title: "Comparison: String vs StringBuffer vs StringBuilder",
    headers: ["String", "StringBuffer", "StringBuilder"],
    rowData: [
      {
        aspect: "Mutability",
        values: ["Immutable", "Mutable", "Mutable"],
      },
      {
        aspect: "Thread Safety",
        values: [
          "Thread-safe by default",
          "Thread-safe, synchronized methods",
          "Not thread-safe",
        ],
      },
      {
        aspect: "Performance",
        values: [
          "Slower for multiple concatenations",
          "Slower due to synchronization overhead",
          "Faster in single-threaded environments",
        ],
      },
      {
        aspect: "Use Case",
        values: [
          "For constant, unchanging string values",
          "For multi-threaded string manipulations",
          "For single-threaded, high-performance string manipulations",
        ],
      },
    ],
  };

export const accenture_JavaUpskillingTraining_CourseContent: ComparisonDataType<
  string | string[]
> = {
  uniqueId: "id_for_Accenture_JavaUpskillingTraining_CourseContent",
  title:
    "Accenture _JavaUpskillingTraining CourseContent: First table rendered with heterogeneous row data",
  headers: ["Day", "Topic"],
  rowData: [
    {
      aspect: "",
      values: [
        "Day: 1",
        [
          "Object Oriented Programming",
          "Exception Handling",
          "Collection Framework and Generics",
        ],
      ],
    },
    {
      aspect: "",
      values: [
        "Day: 2",
        ["Multi-Threading in Java", "Overview of Junit", "Garbage Collection"],
      ],
    },
    {
      aspect: "",
      values: ["Day: 3", "Performance and Code Quality"],
    },
    {
      aspect: "",
      values: ["Day: 4", ["JEE Overview - MVC Framework", "Servlets and JSP"]],
    },
    {
      aspect: "",
      values: [
        "Day: 5",
        [
          "JSP/Servlet Scope Objects",
          "Session Management in Servlet/JSP",
          "AJAX - sample demo",
        ],
      ],
    },
    {
      aspect: "",
      values: ["Day: 6", "Basic and Advanced JavaScript"],
    },
    {
      aspect: "",
      values: ["Day: 7", "jQuery - JS library"],
    },
    {
      aspect: "",
      values: ["Day: 8", "Overview of Hibernate ORM"],
    },
    {
      aspect: "",
      values: [
        "Day: 9",
        [
          "Spring Core - DI",
          "Spring AOP, Logging and Transaction with Spring AOP",
        ],
      ],
    },
    {
      aspect: "",
      values: [
        "Day: 10",
        "Developing application using Spring MVC and introduction to Maven",
      ],
    },
    {
      aspect: "",
      values: ["Day: 11", ["Introduction to PL/SQL", "PL/SQL Fundamentals"]],
    },
    {
      aspect: "",
      values: [
        "Day: 12",
        "data types, cursors, control structure, SQL Advanced Cursor",
      ],
    },
  ],
};

/**
 * Generalized comparison data for
 * 1. "ArrayList vs LinkedList",
 * 2. "Set vs List",
 * 3. "Spring vs Spring Boot", and
 * 4. "String vs StringBuffer vs StringBuilder"
 *
 */
export const comparisonData: ComparisonDataType<string>[] = [
  { ...comparison_ArrayListVSLinkedList },
  { ...comparison_SetVSList },
  { ...comparison_SpringVSSpringBoot },
  { ...comparison_String_VS_StringBuffer_VS_StringBuilder },
];

const yaml1 = `
uniqueId: "Comparison_HashMapVSHashTable"
title: "Comparison: HashMap vs HashTable"
headers:
  - HashMap
  - HashTable
rowData:
  - aspect: "Null Keys/Values"
    values:
      - "Allows one null key and multiple null values"
      - "Does not allow null keys or null values"
  - aspect: "Thread-Safety"
    values:
      - "Not thread-safe; must be synchronized externally"
      - "Thread-safe; synchronized methods"
  - aspect: "Performance"
    values:
      - "Faster due to lack of synchronization overhead"
      - "Slower due to synchronization"
  - aspect: "Fail-Fast Iterators"
    values:
      - "Yes, iterators are fail-fast"
      - "No, iterators are not fail-fast"
  - aspect: "Usage in Concurrent Applications"
    values:
      - "Not suitable without external synchronization"
      - "Can be used in concurrent applications"
  - aspect: "Preferred Use Case"
    values:
      - "When you don’t need synchronization for faster performance"
      - "When thread-safety is required"

`;

const yaml2 = `
uniqueId: "Comparison_HashMapVSHashTable"
title: "Comparison: HashMap vs HashTable"
headers:
  - HashMap
  - HashTable
rowData:
  - aspect: "Null Keys/Values"
    values:
      - "Allows one null key and multiple null values"
      - "Does not allow null keys or null values"
  - aspect: "Thread-Safety"
    values:
      - "Not thread-safe; must be synchronized externally"
      - "Thread-safe; synchronized methods"
  - aspect: "Performance"
    values:
      - "Faster due to lack of synchronization overhead"
      - "Slower due to synchronization"
  - aspect: "Fail-Fast Iterators"
    values:
      - "Yes, iterators are fail-fast"
      - "No, iterators are not fail-fast"
  - aspect: "Usage in Concurrent Applications"
    values:
      - "Not suitable without external synchronization"
      - "Can be used in concurrent applications"
  - aspect: "Preferred Use Case"
    values:
      - "When you don’t need synchronization for faster performance"
      - "When thread-safety is required"

`;

const yaml3_valid = `
uniqueId: "Comparison_AbstractionVsEncapsulation"
title: "Comparison: Abstraction vs Encapsulation"
headers:
  - Abstraction
  - Encapsulation
rowData:
  - aspect: "Definition"
    values:
      - |
        **Abstraction** focuses on hiding the implementation details and showing only the essential features of the object. 
        It allows focusing on what the object does rather than how it does it.
      - |
        **Encapsulation** is about bundling the data (variables) and the methods (functions) that operate on the data into a single unit or class. 
        It also restricts access to the data by exposing only what is necessary.
  - aspect: "Purpose"
    values:
      - |
        **Abstraction** is used to reduce complexity by hiding unnecessary details and allowing the programmer to focus on high-level operations.
      - |
        **Encapsulation** is used to protect the data from unwanted access and modification, ensuring controlled interaction with object properties.
  - aspect: "Focus"
    values:
      - |
        **Abstraction** focuses on the outside view of an object or what the object represents.
      - |
        **Encapsulation** focuses on how the object performs its operations and protects its data.
  - aspect: "Implementation"
    values:
      - |
        **Abstraction** is implemented using abstract classes or interfaces, which declare methods without providing their implementation.
      - |
        **Encapsulation** is implemented using access modifiers such as \`private\`, \`protected\`, and \`public\` to control access to the class members.
  - aspect: "Real-World Example"
    values:
      - |
        **Abstraction**: When you use a coffee machine, you only need to know how to select a coffee type and press a button, 
        without understanding the internal process.
      - |
        **Encapsulation**: A real-world example would be a capsule in medicine, which contains the necessary components, 
        but hides them from direct access.
  - aspect: "Use Case"
    values:
      - |
        **Abstraction**: Useful when you want to create a blueprint for multiple objects that share common functionality.
      - |
        **Encapsulation**: Useful when you need to protect an object's integrity by controlling access to its internal state.

`;

const yaml3_invalid = `
uniqueId: "Comparison_AbstractionVsEncapsulation"
title: "Comparison: Abstraction vs Encapsulation"
headers:
  - Abstraction
  - Encapsulation
rowData:
  - aspect: "Definition"
    values: |
      - **Abstraction** focuses on hiding the implementation details and showing only the essential features of the object. It allows focusing on what the object does rather than how it does it.
      - **Encapsulation** is about bundling the data (variables) and the methods (functions) that operate on the data into a single unit or class. It also restricts access to the data by exposing only what is necessary.
  - aspect: "Purpose"
    values: |
      - **Abstraction** is used to reduce complexity by hiding unnecessary details and allowing the programmer to focus on high-level operations.
      - **Encapsulation** is used to protect the data from unwanted access and modification, ensuring controlled interaction with object properties.
  - aspect: "Focus"
    values: |
      - **Abstraction** focuses on the outside view of an object or what the object represents.
      - **Encapsulation** focuses on how the object performs its operations and protects its data.
  - aspect: "Implementation"
    values: |
      - **Abstraction** is implemented using abstract classes or interfaces, which declare methods without providing their implementation.
      - **Encapsulation** is implemented using access modifiers such as \`private\`, \`protected\`, and \`public\` to control access to the class members.
  - aspect: "Real-World Example"
    values: |
      - **Abstraction**: When you use a coffee machine, you only need to know how to select a coffee type and press a button, without understanding the internal process.
      - **Encapsulation**: A real-world example would be a capsule in medicine, which contains the necessary components, but hides them from direct access.
  - aspect: "Use Case"
    values: |
      - **Abstraction**: Useful when you want to create a blueprint for multiple objects that share common functionality.
      - **Encapsulation**: Useful when you need to protect an object's integrity by controlling access to its internal state.

`;
