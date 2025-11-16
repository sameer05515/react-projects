import { availableOutputTypes } from "../../../common/components/Smart/Editor/v3";

export const Status = {
  OPEN: "Open",
  CLOSED: "Closed",
  UNKNOWN: "Unknown",
};

export const StatusOrder = {
  [Status.OPEN]: 0,
  [Status.CLOSED]: 1,
  [Status.UNKNOWN]: 2,
};

export const ClassSuffixForStatus = {
  [Status.OPEN]: "info",
  [Status.CLOSED]: "success",
  [Status.UNKNOWN]: "warning",
};

export const ThinkTankItemType = {
  ToDo: "to-do",
  RawQuestion: "raw-question",
  YetToBeDecided: "yet-to-be-decided",
};

export const getHeaderForThinkTankItemType = (itemType = "") => {
  if (!itemType || typeof itemType !== "string") {
    return "Yet to be decided";
  }
  switch (itemType) {
    case ThinkTankItemType.ToDo:
      return "To Do";
    case ThinkTankItemType.RawQuestion:
      return "Raw Question";
    default:
      return "Yet to be decided";
  }
};

export class ThinkTankItem {
  constructor(
    smartContent = { content: "Missing Content!!!", textOutputType: availableOutputTypes.HTML },
    createdDate,
    status = Status.OPEN,
    closedOn = "",
    isUrgent = false,
    isImportant = false,
    hasGroomed = false,
    itemType = ThinkTankItemType.YetToBeDecided
  ) {
    this.smartContent =
      smartContent && smartContent.content ? smartContent : { content: "Missing Content!!!", textOutputType: availableOutputTypes.HTML };
    this.createdDate = createdDate || "";
    this.closedOn = closedOn || "";
    this.status = status || Status.UNKNOWN;
    this.isUrgent = isUrgent;
    this.isImportant = isImportant;
    this.hasGroomed = hasGroomed;
    this.itemType = itemType || ThinkTankItemType.YetToBeDecided;
  }

  /**
   * Static method to create a Page instance from raw data
   *
   * @deprecated
   *
   * Please use fromObject method instead. As this method relies on order, which may cause issues in future.
   *
   * We are also finding ways in javascript or typescript to restrict user to use direct new operator use , as current constructor itself relies on order of values.
   * */
  static fromData(smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType) {
    return new ThinkTankItem(smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType);
  }

  // Static method to create a Page instance from object
  static fromObject(
    { smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType } = {
      smartContent: { content: "Missing Content!!!", textOutputType: availableOutputTypes.HTML },
      createdDate: "",
      status: "",
      closedOn: "",
      isUrgent: false,
      isImportant: false,
      hasGroomed: false,
      itemType: ThinkTankItemType.YetToBeDecided,
    }
  ) {
    return new ThinkTankItem(smartContent, createdDate, status, closedOn, isUrgent, isImportant, hasGroomed, itemType);
  }
}

const defaultFilterFn = (todo) => todo.status !== Status.CLOSED;

export const getFilteredTodos = (todos = [], filterFn = defaultFilterFn) => todos.filter((todo) => filterFn?.(todo));

/**
 * Sorts an array of Todo objects by a given key.
 * @param {ThinkTankItem[]} todos - Array of Todo objects.
 * @param {string} key - The key to sort by (e.g., "name", "createdDate").
 * @param {boolean} [ascending=true] - Whether to sort in ascending order.
 * @returns {ThinkTankItem[]} - Sorted array of Todo objects.
 */
export function sortTodosByKey(todos, key, ascending = true) {
  return todos.slice().sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
}

/**
 * Sorts an array of Todo objects by createdDate.
 * @param {ThinkTankItem[]} todos - Array of Todo objects.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order.
 * @returns {ThinkTankItem[]} - Sorted array of Todo objects.
 */
export function sortTodosByCreatedDate(todos, ascending = true) {
  return todos.slice().sort((a, b) => {
    const dateA = new Date(a.createdDate);
    const dateB = new Date(b.createdDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Sorts an array of Todo objects by closedOn date.
 * @param {ThinkTankItem[]} todos - Array of Todo objects.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order.
 * @returns {ThinkTankItem[]} - Sorted array of Todo objects.
 */
export function sortTodosByClosedOnDate(todos, ascending = true) {
  return todos.slice().sort((a, b) => {
    const dateA = a.closedOn ? new Date(a.closedOn) : new Date(0);
    const dateB = b.closedOn ? new Date(b.closedOn) : new Date(0);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Sorts an array of Todo objects by urgency and importance.
 * Urgent Todos appear first, followed by important Todos.
 * @param {ThinkTankItem[]} todos - Array of Todo objects.
 * @returns {ThinkTankItem[]} - Sorted array of Todo objects.
 */
export function sortTodosByUrgencyAndImportance(todos) {
  return todos.slice().sort((a, b) => {
    if (a.isUrgent !== b.isUrgent) return b.isUrgent - a.isUrgent;
    if (a.isImportant !== b.isImportant) return b.isImportant - a.isImportant;
    return 0;
  });
}

export function sortTodosByGroomed(todos) {
  return todos.slice().sort((a, b) => {
    if (a.hasGroomed !== b.hasGroomed) return b.hasGroomed - a.hasGroomed;
    // if (a.isImportant !== b.isImportant) return b.isImportant - a.isImportant;
    return 0;
  });
}

/**
 * Sorts an array of Todo objects by status.
 * Order: OPEN -> IN_PROGRESS -> CLOSED -> UNKNOWN.
 * @param {ThinkTankItem[]} todos - Array of Todo objects.
 * @param {Object} StatusOrder - Mapping of status to priority (lower is higher priority).
 * @returns {ThinkTankItem[]} - Sorted array of Todo objects.
 */
export function sortTodosByStatus(todos, statusOrder = StatusOrder) {
  return todos.slice().sort((a, b) => {
    const statusA = statusOrder[a.status] ?? Number.MAX_VALUE;
    const statusB = statusOrder[b.status] ?? Number.MAX_VALUE;
    return statusA - statusB;
  });
}
