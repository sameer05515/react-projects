export type CDRowItemType = {
  aspect: string;
  left: string;
  right: string;
};

export type ComparisonDataType = {
  uniqueId: string;
  title: string;
  leftHeader: string;
  rightHeader: string;
  differences: CDRowItemType[];
};

// Generalized comparison data for "ArrayList vs LinkedList"
const comparison_ArrayListVSLinkedList: ComparisonDataType = {
  uniqueId: "Comparison_ArrayListVSLinkedList",
  title: "Comparison: ArrayList vs LinkedList",
  leftHeader: "ArrayList",
  rightHeader: "LinkedList",
  differences: [
    {
      aspect: "Underlying Data Structure",
      left: "Resizable array",
      right: "Doubly linked list",
    },
    {
      aspect: "Access Time (get())",
      left: "O(1) - Fast random access due to direct indexing",
      right: "O(n) - Sequential access is required",
    },
    {
      aspect: "Insertion Time (add())",
      left: "O(n) - Requires shifting elements when inserting in the middle or beginning",
      right: "O(1) - Efficient insertion at the beginning or middle",
    },
    {
      aspect: "Deletion Time (remove())",
      left: "O(n) - Requires shifting elements when removing from the middle or beginning",
      right: "O(1) - Efficient removal from the beginning or middle",
    },
    {
      aspect: "Memory Usage",
      left: "Less memory overhead as it only stores the elements",
      right: "More memory overhead due to storing node pointers",
    },
    {
      aspect: "Use Case",
      left: "Better for frequent access operations",
      right: "Better for frequent insertion and deletion operations",
    },
  ],
};


// Generalized comparison data for "Set vs List"
const comparison_SetVSList: ComparisonDataType = {
  uniqueId: "Comparison_SetVSList",
  title: "Comparison: Set vs List",
  leftHeader: "Set",
  rightHeader: "List",
  differences: [
    {
      aspect: "Duplicates",
      left: "No duplicates allowed",
      right: "Allows duplicates",
    },
    {
      aspect: "Order",
      left: "No guaranteed order",
      right: "Maintains insertion order",
    },
    {
      aspect: "Access Time",
      left: "O(1) on average with HashSet, O(log n) with TreeSet",
      right: "O(n) for LinkedList, O(1) for ArrayList",
    },
    {
      aspect: "Use Case",
      left: "Good when uniqueness of elements is needed",
      right: "Good when you need to maintain an ordered collection of elements",
    },
  ],
};

// Generalized comparison data for "Spring vs Spring Boot"
const comparison_SpringVSSpringBoot: ComparisonDataType = {
  uniqueId: "Comparison_SpringVSSpringBoot",
  title: "Comparison: Spring vs Spring Boot",
  leftHeader: "Spring",
  rightHeader: "Spring Boot",
  differences: [
    {
      aspect: "Setup",
      left: "Requires manual setup and configuration",
      right: "Provides auto-configuration to simplify setup",
    },
    {
      aspect: "Development Speed",
      left: "Slower due to boilerplate and configuration",
      right: "Faster due to embedded server and defaults",
    },
    {
      aspect: "Project Structure",
      left: "Requires separate server and manual dependency management",
      right: "Provides an embedded server and simplifies dependency management",
    },
    {
      aspect: "Use Case",
      left: "Good for large-scale, complex applications with custom configurations",
      right:
        "Ideal for microservices and rapid development with minimal configuration",
    },
  ],
};

// Generalized comparison data for "ArrayList vs LinkedList", "Set vs List", and "Spring vs Spring Boot"
export const comparisonData: ComparisonDataType[] = [
  { ...comparison_ArrayListVSLinkedList },
  { ...comparison_SetVSList },
  { ...comparison_SpringVSSpringBoot },
];
