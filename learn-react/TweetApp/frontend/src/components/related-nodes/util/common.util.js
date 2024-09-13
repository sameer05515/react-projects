
// Constants for node item types and relation direction types
const NODE_ITEM_TYPES = {
    category: "category",
    question: "question",
    topic: "topic",
    section: "section",
    link: "link",
    techStack: "tech-stack",
    memoryMap: "memory-map",
    conversation: "conversation",
    message: "message",
  };
  
  const RELATION_DIRECTION_TYPES = {
    previous: "previous",
    next: "next",
  };
  
  const CONSTANTS = {
    DRAFT_RELATION_ID_PREFIX: "DRAFT_RELATION_ID_",
  };
  
  // Utility functions
  const generateOptions = (obj) =>
    Object.keys(obj).map((key) => ({
      value: key,
      label: key,
    }));
  
  const deleteObjectById = (arr, uniqueId, idFieldName = "uniqueId") =>
    arr.filter((obj) => obj[idFieldName] !== uniqueId);
  
  const updateOrAdd = (arr, newObj, idFieldName = "uniqueId") => {
    const index = arr.findIndex(
      (obj) => obj[idFieldName] === newObj[idFieldName]
    );
    if (index !== -1) {
      arr[index] = newObj;
    } else {
      arr.push(newObj);
    }
    return arr;
  };

  export {deleteObjectById, updateOrAdd, generateOptions, CONSTANTS, RELATION_DIRECTION_TYPES, NODE_ITEM_TYPES};

