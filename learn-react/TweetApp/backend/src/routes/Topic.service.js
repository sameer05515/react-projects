// Topic.service.js

const { Topic, TopicSection } = require("./Topic.model");
const { v4: uuidv4 } = require("uuid");

const createTopic = async (topicData) => {
  return await Topic.create(topicData);
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
      tags: 1,
    };
    // console.log(`[Topic.service]: [getAllTopics]: Going to fetch all topics`);
    const topics = await getTopics(null, { ...selectFields });
    return topics;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

async function getTopics(parentId, selectFields) {
  try {
    const criteria = parentId
      ? { parentId }
      : { parentId: { $in: [null, undefined, ""] } };
    let topics = await Topic.find(criteria).select(selectFields);
    const topicsWithChildren = await Promise.all(
      topics.map(async (topic) => {
        const children = await getTopics(topic.uniqueId, selectFields);
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
  updateTopicByUniqueId,
  getAllTopics,
  getTopicByUniqueId,
  searchTopics,
  createTopicSection,
  getAllTopicSectionsById,
  getTopicSectionsById,
  updateTopicSectionsById,
  getTopicsByTagId,
  getTopicSectionsByTagId
};
