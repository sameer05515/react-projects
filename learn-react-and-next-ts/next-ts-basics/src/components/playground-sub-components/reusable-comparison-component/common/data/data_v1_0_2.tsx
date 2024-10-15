// Generic Row Item Type for N comparisons
export type CDRowItemType<T> = {
  aspect: string;
  values: T[];
};

// Generic Comparison Data Type for N comparisons
export type ComparisonDataType<T> = {
  uniqueId: string;
  title: string;
  headers: string[]; // Headers for N items
  differences: CDRowItemType<T>[];
};

// Sample comparison data for String vs StringBuffer vs StringBuilder
export const comparisonData: ComparisonDataType<string> = {
  uniqueId: "1",
  title: "Comparison: String vs StringBuffer vs StringBuilder",
  headers: ["String", "StringBuffer", "StringBuilder"],
  differences: [
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
