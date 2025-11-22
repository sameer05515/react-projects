// Topic.service.js

const { Topic, TopicSection } = require("./Topic.model");
const { v4: uuidv4 } = require("uuid");

const createTopic = async (topicData) => {
  return await Topic.create(topicData);
};

/**
 * Create multiple topics in one request.
 * @param {Array<{ name: string, parentId?: string, description?: string, smartContent?: object, tags?: string[], occurenceDate?: string|Date }>} topicPayloads
 * @returns {{ created: Array, errors: Array<{ index: number, message: string }> }}
 */
const createTopicsBulk = async (topicPayloads) => {
  if (!Array.isArray(topicPayloads) || topicPayloads.length === 0) {
    return { created: [], errors: [] };
  }
  const created = [];
  const errors = [];
  for (let i = 0; i < topicPayloads.length; i++) {
    const payload = topicPayloads[i];
    try {
      const doc = {
        name: payload.name != null ? String(payload.name).trim() : "",
        parentId: payload.parentId != null ? payload.parentId : "",
        description: payload.description != null ? payload.description : undefined,
        smartContent: payload.smartContent != null ? payload.smartContent : undefined,
        tags: Array.isArray(payload.tags) ? payload.tags : [],
        occurenceDate:
          payload.occurenceDate != null
            ? new Date(payload.occurenceDate)
            : new Date(),
      };
      if (!doc.name) {
        errors.push({ index: i, message: "Name is required" });
        continue;
      }
      const topic = await Topic.create(doc);
      created.push(topic.toObject ? topic.toObject() : topic);
    } catch (err) {
      errors.push({
        index: i,
        message: err.message || "Failed to create topic",
      });
    }
  }
  return { created, errors };
};

const updateTopicByUniqueId = async (uniqueId, topicData) => {
  try {
    let topic = await Topic.findOne({ uniqueId });
    if (!topic) {
      throw new Error("Task not found");
    }
    // console.log(`topicData : ${JSON.stringify(topicData)}`)
    const {
      parentId,
      name,
      description,
      smartContent,
      tags,
      occurenceDate,
      children,
    } = topicData;
    if (topicData.published === true) {
      throw new Error("Use PUT /:uniqueId/publish to publish a topic");
    }
    if (topicData.published === false) {
      topic.published = false;
    }
    topic.parentId = parentId || topic.parentId;
    topic.name = name || topic.name;
    topic.description = description || topic.description;
    topic.tags = tags && tags.length >= 0 ? tags : topic.tags;
    topic.occurenceDate =
      occurenceDate != null ? occurenceDate : topic.occurenceDate;
    topic.smartContent = smartContent || topic.smartContent;
    topic.updatedDate = new Date();
    topic = await topic.save();
    const childrenIds = children || [];
    // console.log(`childrenIds: ${childrenIds}`)
    await Topic.updateMany(
      { uniqueId: { $in: childrenIds } },
      { parentId: topic.uniqueId }
    );
    return topic;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllTopics = async () => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1,
      description: 1,
      smartContent: 1,
      tags: 1,
      published: 1,
    };
    // console.log(`[Topic.service]: [getAllTopics]: Going to fetch all topics`);
    const topics = await getTopics(null, { ...selectFields });
    return topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Flatten tree of topics into a single array (for export).
 * Each item has uniqueId, name, parentId, description, smartContent, tags, ancestors, sections.
 */
function flattenTopics(tree, ancestors = []) {
  if (!tree || !Array.isArray(tree)) return [];
  const list = [];
  for (const node of tree) {
    const item = {
      uniqueId: node.uniqueId,
      name: node.name,
      parentId: node.parentId || null,
      description: node.description != null ? node.description : "",
      smartContent: node.smartContent != null ? node.smartContent : null,
      tags: node.tags || [],
      published: node.published === true,
      ancestors: ancestors.map((a) => ({ uniqueId: a.uniqueId, name: a.name })),
      sections: node.sections || [],
    };
    list.push(item);
    if (node.children && node.children.length > 0) {
      const nextAncestors = [...ancestors, { uniqueId: node.uniqueId, name: node.name }];
      list.push(...flattenTopics(node.children, nextAncestors));
    }
  }
  return list;
}

const getAllTopicsFlat = async () => {
  const tree = await getAllTopics();
  return flattenTopics(tree);
};

const sectionExportFields = {
  uniqueId: 1,
  linkedTopicUniqueId: 1,
  name: 1,
  smartContent: 1,
  order: 1,
  softDelete: 1,
  tags: 1,
  createdDate: 1,
  updatedDate: 1,
};

/**
 * Attach topic sections to each node in the tree (for export). Mutates nodes.
 */
async function enrichTreeWithSections(tree) {
  if (!tree || !Array.isArray(tree)) return tree;
  await Promise.all(
    tree.map(async (node) => {
      const sections = await TopicSection.find({
        linkedTopicUniqueId: node.uniqueId,
      })
        .select(sectionExportFields)
        .lean();
      node.sections = sections || [];
      if (node.children && node.children.length > 0) {
        await enrichTreeWithSections(node.children);
      }
    })
  );
  return tree;
}

/**
 * Topics tree with sections attached (for export).
 */
const getAllTopicsForExport = async () => {
  const tree = await getAllTopics();
  return enrichTreeWithSections(tree);
};

/**
 * Flat list of topics with sections on each topic (for export).
 */
const getAllTopicsFlatForExport = async () => {
  const tree = await getAllTopicsForExport();
  return flattenTopics(tree);
};

async function getTopics(parentId, selectFields, options = {}) {
  try {
    const criteria = parentId
      ? { parentId }
      : { parentId: { $in: [null, undefined, ""] } };
    if (options.publishedOnly) {
      criteria.published = true;
    }
    let topics = await Topic.find(criteria).select(selectFields);
    const topicsWithChildren = await Promise.all(
      topics.map(async (topic) => {
        const children = await getTopics(topic.uniqueId, selectFields, options);
        const ancestors = await getAllAncestors(topic.parentId);
        return { ...topic.toObject(), children, ancestors };
        // return { ...topic.toObject(), children };
      })
    );
    return topicsWithChildren;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getPublishedTopics = async () => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1,
      description: 1,
      smartContent: 1,
      tags: 1,
      published: 1,
    };
    const flatList = await Topic.find({ published: true })
      .select(selectFields)
      .lean();
    return buildTreeFromFlatPublished(flatList);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Build a tree from a flat list of published topics.
 * Topics whose parent is not in the list (or has no parent) appear as roots.
 */
function buildTreeFromFlatPublished(flatList) {
  if (!flatList || flatList.length === 0) return [];
  const byId = new Map(flatList.map((t) => [t.uniqueId, { ...t, children: [] }]));
  const roots = [];
  for (const t of flatList) {
    const node = byId.get(t.uniqueId);
    const parentId = t.parentId || null;
    const parent = parentId ? byId.get(parentId) : null;
    if (!parent) {
      roots.push(node);
    } else {
      parent.children.push(node);
    }
  }
  return roots;
}

const getTopicByUniqueId = async (uniqueId) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1,
      tags: 1,
    };

    const topic = await Topic.findOne({ uniqueId });

    if (!topic) {
      throw new Error("Topic not found , uniqueId : " + uniqueId);
    }

    const sections = await TopicSection.find({
      linkedTopicUniqueId: topic.uniqueId,
    }).select({
      uniqueId: 1,
      name: 1,
      linkedTopicUniqueId: 1,
      order: 1,
    });

    // const children = await Topic.find({ parentId: uniqueId });
    const children = await getTopics(topic.uniqueId, selectFields);
    let ancestors = [];
    try {
      ancestors = await getAllAncestors(topic.parentId);
      // res.json(ancestors);
    } catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      ancestors = [];
    }

    const responseDTO = {
      ...topic.toObject(),
      children: children.map((child) => ({
        name: child.name,
        uniqueId: child.uniqueId,
        children: child.children,
      })),
      sections: sections
        ? sections.map((s) => ({
          uniqueId: s.uniqueId,
          name: s.name,
          linkedTopicUniqueId: s.linkedTopicUniqueId,
          order: s.order,
        }))
        : [],
      ancestors: [...ancestors],
    };
    return responseDTO;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Recursive function to get all ancestors of a link
async function getAllAncestors(parentId, ancestors = []) {
  // console.log(`start: parentId: ${parentId} :   function getAllAncestors : ${JSON.stringify(ancestors)}`);
  if (!parentId) {
    return ancestors;
  }
  const topic = await Topic.findOne({ uniqueId: parentId });
  // console.log(`topic: ${JSON.stringify(topic)}`);
  // if (!topic || !topic.parentId) {
  //   return ancestors;
  // }
  ancestors.unshift({
    name: topic.name,
    uniqueId: topic.uniqueId,
    parentId: topic.parentId,
  }); // Add the name of the current topic to ancestors array
  // console.log(`final: function getAllAncestors : ${JSON.stringify(ancestors)}`);
  return getAllAncestors(topic.parentId, ancestors); // Recursively call to get ancestors of the parent topic
}

/**
 * Returns true only if the topic with given parentId and all its ancestors are published.
 * Root (no parent) is considered "published" for the purpose of allowing root topics to be published.
 */
async function areAllAncestorsPublished(parentId) {
  if (!parentId) return true;
  const parent = await Topic.findOne({ uniqueId: parentId }).select({ published: 1, parentId: 1 });
  if (!parent) return true;
  if (!parent.published) return false;
  return areAllAncestorsPublished(parent.parentId);
}

/**
 * Publish a topic by uniqueId. Succeeds only if the topic's parent and all ancestors are already published.
 */
async function publishTopicByUniqueId(uniqueId) {
  const topic = await Topic.findOne({ uniqueId });
  if (!topic) {
    throw new Error("Topic not found, uniqueId: " + uniqueId);
  }
  if (topic.published) {
    return topic;
  }
  const canPublish = await areAllAncestorsPublished(topic.parentId);
  if (!canPublish) {
    throw new Error("Cannot publish: parent or an ancestor topic is not published");
  }
  topic.published = true;
  topic.updatedDate = new Date();
  await topic.save();
  return topic;
}

const searchTopics = async (searchString, searchOptions) => {
  const regex = new RegExp(searchString, "i"); // 'i' for case insensitive

  const selectFields = {
    uniqueId: 1,
    name: 1,
    parentId: 1,
    tags: 1,
  };

  const criteria = {
    $or: [
      { name: { $regex: regex } },
      //{ description: { $regex: regex } },
    ],
  };

  if (
    searchOptions &&
    searchOptions.description &&
    searchOptions.description > 0
  ) {
    selectFields.description = 1;
    criteria["$or"].push({ description: { $regex: regex } });
  }

  return await Topic.find(criteria).select(selectFields);
};

const createTopicSection = async (sectionData) => {
  // console.log(`[Topic.service]: sectionData : ${JSON.stringify(sectionData)}`);
  const { linkedTopicUniqueId, name, smartContent, order, tags } = sectionData;

  const uniqueId = uuidv4();
  const newTopicSection = {
    uniqueId,
    linkedTopicUniqueId,
    name,
    smartContent,
    order: order && typeof order === "number" ? order : 9999,
    tags: tags && tags.length > 0 ? tags : [],
  };
  await TopicSection.create(newTopicSection);
  return newTopicSection;
};

const getAllTopicSectionsById = async (linkedTopicUniqueId) => {
  const sections = await TopicSection.find({
    linkedTopicUniqueId: linkedTopicUniqueId,
  });
  return sections;
};

const getTopicSectionsById = async (linkedTopicUniqueId, sectionUniqueId) => {
  const section = await TopicSection.findOne({
    linkedTopicUniqueId: linkedTopicUniqueId,
    uniqueId: sectionUniqueId,
  });
  if (!section) {
    throw new Error(
      `TopicSection not found , linkedTopicUniqueId : ${linkedTopicUniqueId}, sectionUniqueId: ${sectionUniqueId}`
    );
  }
  return section;
};

const updateTopicSectionsById = async (
  topicUniqueId,
  sectionUniqueId,
  sectionData
) => {
  console.log(
    `[Topic.service]: [updateTopicSectionsById]: sectionData : ${JSON.stringify(
      sectionData
    )}`
  );
  const { linkedTopicUniqueId, name, smartContent, order, tags } = sectionData;
  try {
    let section = await TopicSection.findOne({
      linkedTopicUniqueId: linkedTopicUniqueId,
      uniqueId: sectionUniqueId,
    });
    if (!section) {
      throw new Error(
        `TopicSection not found , linkedTopicUniqueId : ${linkedTopicUniqueId}, sectionUniqueId: ${sectionUniqueId}`
      );
    }
    // console.log(`sectionData : ${JSON.stringify(sectionData)}`)
    // const { parentId, name, description, tags, occurenceDate, children } = topicData;
    section.smartContent = smartContent || section.smartContent;
    section.name = name || section.name;
    section.order = order || section.order;
    // section.description = description || section.description;
    section.tags = tags && tags.length >= 0 ? tags : section.tags;
    // section.occurenceDate = occurenceDate != null ? occurenceDate : topic.occurenceDate;
    section.updatedDate = new Date();
    section = await section.save();
    return section;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getTopicsByTagId = async (tagId) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      //parentId: 1,
      //tags: 1,
    };
    const topics = await Topic.find({ tags: tagId }).select(selectFields);
    return topics;
  } catch (error) {
    console.error(error);    
    throw new Error(`Error retrieving topics with tagId ${tagId}: ${error.message}`);
  }
};

const getTopicSectionsByTagId = async (tagId) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      linkedTopicUniqueId: 1,
      //tags: 1,
    };
    const topicSections = await TopicSection.find({ tags: tagId }).select(selectFields);
    return topicSections;
  } catch (error) {
    console.error(error);    
    throw new Error(`Error retrieving topicSections with tagId ${tagId}: ${error.message}`);
  }
};

module.exports = {
  createTopic,
  createTopicsBulk,
  updateTopicByUniqueId,
  publishTopicByUniqueId,
  getAllTopics,
  getPublishedTopics,
  getAllTopicsFlat,
  getAllTopicsForExport,
  getAllTopicsFlatForExport,
  getTopicByUniqueId,
  searchTopics,
  createTopicSection,
  getAllTopicSectionsById,
  getTopicSectionsById,
  updateTopicSectionsById,
  getTopicsByTagId,
  getTopicSectionsByTagId
};
