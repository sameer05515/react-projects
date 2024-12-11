export type CDRowItemType = {
  aspect: string;
  ArrayList: string;
  LinkedList: string;
};

export type ComparisonDataType = {
  title: string;
  differences: CDRowItemType[];
};

// Sample JSON data for comparison
export const comparisonData: ComparisonDataType = {
  title: "Comparison: ArrayList vs LinkedList",
  differences: [
    {
      aspect: "Underlying Data Structure",
      ArrayList: "Resizable array",
      LinkedList: "Doubly linked list",
    },
    {
      aspect: "Access Time (get())",
      ArrayList: "O(1) - Fast random access due to direct indexing",
      LinkedList: "O(n) - Sequential access is required",
    },
    {
      aspect: "Insertion Time (add())",
      ArrayList:
        "O(n) - Requires shifting elements when inserting in the middle or beginning",
      LinkedList: "O(1) - Efficient insertion at the beginning or middle",
    },
    {
      aspect: "Deletion Time (remove())",
      ArrayList:
        "O(n) - Requires shifting elements when removing from the middle or beginning",
      LinkedList: "O(1) - Efficient removal from the beginning or middle",
    },
    {
      aspect: "Memory Usage",
      ArrayList: "Less memory overhead as it only stores the elements",
      LinkedList: "More memory overhead due to storing node pointers",
    },
    {
      aspect: "Use Case",
      ArrayList: "Better for frequent access operations",
      LinkedList: "Better for frequent insertion and deletion operations",
    },
  ],
};
