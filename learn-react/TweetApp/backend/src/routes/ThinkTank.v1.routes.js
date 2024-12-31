// import express from "express";
// import { ThinkTankItemModel, ThinkTankItemType } from "./ThinkTank.v1.dto";
const express = require("express");
const {
  ThinkTankItemModel,
  ThinkTankItemType,
  Status,
} = require("./ThinkTank.v1.model");

const router = express.Router();

// Get all ThinkTankItems
router.get("/", async (req, res) => {
  try {
    const tweets = await ThinkTankItemModel.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ThinkTankItems" });
  }
});

/**
 * @route   POST /think-tank
 * @desc    Create a new ThinkTankItem
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const { itemType, smartContent } = req.body;

    // Validate smartContent
    if (
      !smartContent ||
      typeof smartContent !== "object" ||
      !smartContent.content?.trim()
    ) {
      return res.status(400).json({
        error:
          "Invalid smartContent. 'content' field is required and cannot be empty.",
      });
    }

    // Validate itemType or set default
    const validItemType = Object.values(ThinkTankItemType).includes(itemType)
      ? itemType
      : ThinkTankItemType.YetToBeDecided;

    // Create new ThinkTankItem
    const newItem = new ThinkTankItemModel({
      itemType: validItemType,
      smartContent,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating ThinkTankItem:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route   PATCH /think-tank/:id
 * @desc    Partially update a ThinkTankItem
 * @access  Public
 */
// router.patch("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateFields = req.body;

//     // Allowed fields for update
//     const allowedFields = [
//       "smartContent",
//       "status",
//       "closedOn",
//       "isUrgent",
//       "isImportant",
//       "hasGroomed",
//       "itemType",
//       "createdDate",
//     ];

//     // Validate incoming fields
//     const filteredUpdates/**: any*/ = {};
//     for (const key of Object.keys(updateFields)) {
//       if (allowedFields.includes(key)) {
//         filteredUpdates[key] = updateFields[key];
//       }
//     }

//     // If no valid fields are provided
//     if (Object.keys(filteredUpdates).length === 0) {
//       return res
//         .status(400)
//         .json({ error: "No valid fields provided for update." });
//     }

//     // Validate `status` if present
//     if (
//       filteredUpdates.status &&
//       !Object.values(Status).includes(filteredUpdates.status)
//     ) {
//       return res.status(400).json({ error: "Invalid status value." });
//     }

//     // Validate `itemType` if present
//     if (
//       filteredUpdates.itemType &&
//       !Object.values(ThinkTankItemType).includes(filteredUpdates.itemType)
//     ) {
//       return res.status(400).json({ error: "Invalid itemType value." });
//     }

//     // Validate `smartContent` structure if present
//     if (filteredUpdates.smartContent) {
//       if (
//         typeof filteredUpdates.smartContent !== "object" ||
//         !filteredUpdates.smartContent.content?.trim()
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Invalid smartContent. 'content' field is required and cannot be empty.",
//           });
//       }
//     }

//     // Update item in database
//     const updatedItem = await ThinkTankItemModel.findByIdAndUpdate(
//       id,
//       { $set: filteredUpdates },
//       { new: true, runValidators: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ error: "ThinkTankItem not found." });
//     }

//     res.json(updatedItem);
//   } catch (error) {
//     console.error("Error updating ThinkTankItem:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

/**
 * @desc Partially update a ThinkTankItem by uniqueId
 * @route PATCH /think-tank/:uniqueId
 */
async function updateThinkTankItem(
  uniqueId /**: string*/,
  updatedData /**: any*/
) {
  try {
    let item = await ThinkTankItemModel.findOne({ uniqueId });
    if (!item) {
      throw new Error("ThinkTankItem not found");
    }

    // Destructure allowed fields
    const {
      smartContent,
      status,
      closedOn,
      isUrgent,
      isImportant,
      hasGroomed,
      itemType,
      createdDate,
    } = updatedData;

    // Validate and assign values
    if (smartContent) {
      if (typeof smartContent !== "object" || !smartContent.content?.trim()) {
        throw new Error(
          "Invalid smartContent. 'content' field is required and cannot be empty."
        );
      }
      item.smartContent = smartContent;
    }

    if (status && Object.values(Status).includes(status)) {
      item.status = status;
    }

    if (closedOn !== undefined) {
      item.closedOn = closedOn;
    }

    if (isUrgent !== undefined) {
      item.isUrgent = isUrgent;
    }

    if (isImportant !== undefined) {
      item.isImportant = isImportant;
    }

    if (hasGroomed !== undefined) {
      item.hasGroomed = hasGroomed;
    }

    if (itemType && Object.values(ThinkTankItemType).includes(itemType)) {
      item.itemType = itemType;
    }

    if (createdDate) {
      item.createdDate = createdDate;
    }

    item.updatedAt = new Date();
    item = await item.save();

    return item;
  } catch (err) {
    console.error("Error updating ThinkTankItem:", err);
    throw err;
  }
}

// Express route handler
router.patch("/:uniqueId", async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const updatedData = req.body;

    const updatedItem = await updateThinkTankItem(uniqueId, updatedData);

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// export default router;
module.exports = router;
