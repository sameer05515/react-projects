// Tag.service.js

const Tag = require('./Tag.model');
const {getTopicsByTagId, getTopicSectionsByTagId} = require('./Topic.service');
const {getTasksByTagId} = require('./Task.service');
const {getQuestionsByTagId} = require('./InterviewMgmt.v2.service')

const createTag = async (tagData) => {
  try {
    const tag = new Tag({
      name: tagData.name,
      description: tagData.description,
      smartContent: tagData.smartContent || null,
      parentId: tagData.parentId,
      createdDate: new Date(),
      updatedDate: new Date()
    });
    await tag.save();
    return tag;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllTags = async () => {
  try {
    let selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1
    };
    const tags = await getTags(null, { ...selectFields });
    return tags;
  } catch (err) {
    console.error(err);
    throw err;
  }
  // return await Tag.find();
};

// Recursive function to get all ancestors of a tag
async function getAllAncestors(parentId, ancestors = []) {
  // console.log(`start: parentId: ${parentId} :   function getAllAncestors : ${JSON.stringify(ancestors)}`);
  if (!parentId) {
    return ancestors;
  }
  const tag = await Tag.findOne({ uniqueId: parentId });
  // console.log(`tag: ${JSON.stringify(tag)}`);
  // if (!tag || !tag.parentId) {
  //   return ancestors;
  // }
  ancestors.unshift({
    name: tag.name,
    uniqueId: tag.uniqueId,
    parentId: tag.parentId,
  }); // Add the name of the current tag to ancestors array
  // console.log(`final: function getAllAncestors : ${JSON.stringify(ancestors)}`);
  return getAllAncestors(tag.parentId, ancestors); // Recursively call to get ancestors of the parent tag
}

async function getTags(parentId, selectFields) {
  try {
    const criteria = parentId ? { parentId } : { parentId: { $in: [null, undefined, ""] } };
    let tags = await Tag.find(criteria).select(selectFields);
    const tagsWithChildren = await Promise.all(
      tags.map(async (tag) => {
        const children = await getTags(tag.uniqueId, selectFields);
        const ancestors = await getAllAncestors(tag.parentId);
        return { ...tag.toObject(), children, ancestors };
      })
    );
    return tagsWithChildren;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getTagById = async (uniqueId) => {
  try{
    let selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1
    };
    const tag = await Tag.findOne({ uniqueId });

    if (!tag) {
      throw new Error("Tag not found , uniqueId : " + uniqueId);
    }

    // const children = await Tag.find({ parentId: uniqueId });
    const children = await getTags(tag.uniqueId, selectFields);
    let ancestors = [];
    try {
      ancestors = await getAllAncestors(tag.parentId);
      // res.json(ancestors);
    } catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      ancestors = [];
    }

    let topics = [];
    try{
      topics=await getTopicsByTagId(uniqueId);
    }catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      topics = [];
    }

    let topicSections = [];
    try{
      topicSections=await getTopicSectionsByTagId(uniqueId);
    }catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      topicSections = [];
    }

    let tasks = [];
    try{
      tasks=await getTasksByTagId(uniqueId);
    }catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      tasks = [];
    }

    let questions = [];
    try{
      questions=await getQuestionsByTagId(uniqueId);
    }catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error);
      questions = [];
    }

    const responseDTO = {
      ...tag.toObject(),
      children: children.map((child) => ({
        name: child.name,
        uniqueId: child.uniqueId,
        children: child.children,
      })),
      ancestors: [...ancestors],
      linkedTopics: [...topics],
      linkedTopicSections: [...topicSections],
      linkedTasks: [...tasks.map(t=>({uniqueId:t.uniqueId, name: t.name}))],
      linkedQuestions:[...questions]
    };
    return responseDTO;
  }catch (error) {
    console.error(error);
    return null;
  }

  // return await Tag.findOne({ uniqueId });
};

const updateTagById = async (uniqueId, tagData) => {
  try {
    let tag = await Tag.findOne({ uniqueId });
    if (!tag) {
      throw new Error("Task not found");
    }
    // console.log(`[Tag.service.js]: [updateTagById]: [tagData] : ${JSON.stringify(tagData)}`);
    // console.log(`[Tag.service.js]: [updateTagById]: [tag] : ${JSON.stringify(tag)}`);

    const {
      parentId,
      name,
      description,
      smartContent,
      //tags,
      //occurenceDate,
      children,
    } = tagData;
    tag.parentId = parentId || tag.parentId;
    tag.name = name || tag.name;
    tag.description = description || tag.description;
    //tag.tags = tags && tags.length >= 0 ? tags : tag.tags;
    // tag.occurenceDate =
    //   occurenceDate != null ? occurenceDate : tag.occurenceDate;
    tag.smartContent = smartContent || tag.smartContent;
    tag.updatedDate = new Date();
    tag = await tag.save();
    const childrenIds = children || [];
    // console.log(`childrenIds: ${childrenIds}`)
    await Tag.updateMany(
      { uniqueId: { $in: childrenIds } },
      { parentId: tag.uniqueId }
    );
    return tag;
  } catch (err) {
    console.error(err);
    throw err;
  }
  // return await Tag.findOneAndUpdate({ uniqueId }, tagData, { new: true });
};

async function getTagsCountByDate() {
  try {
    const result = await Tag.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdDate" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    return result;
  } catch (error) {
    throw new Error(`Failed to get tags count by date: ${error.message}`);
  }
}

const deleteTagById = async (uniqueId) => {
  return await Tag.findOneAndRemove({ uniqueId });
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
  getTagsCountByDate,
};
