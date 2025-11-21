// import express from "express";
// import { ThinkTankItemModel, ThinkTankItemType } from "./ThinkTank.v1.dto";
const express = require("express");
const {
  ThinkTankItemModel,
  ThinkTankItemType,
  Status,
} = require("./ThinkTank.v1.model");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: ThinkTank
 *     description: API for ThinkTank items (v1)
 */

/**
 * @swagger
 * /think-tank:
 *   get:
 *     summary: Get all ThinkTankItems
 *     tags: [ThinkTank]
 *     responses:
 *       200:
 *         description: List of all ThinkTankItems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to fetch ThinkTankItems
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching ThinkTankItems
 */
router.get("/", async (req, res) => {
  try {
    const tweets = await ThinkTankItemModel.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ThinkTankItems" });
  }
});

/**
 * @swagger
 * /think-tank:
 *   post:
 *     summary: Create a new ThinkTankItem
 *     tags: [ThinkTank]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemType:
 *                 type: string
 *                 description: The type of the ThinkTankItem
 *               smartContent:
 *                 type: object
 *                 description: The content object
 *                 properties:
 *                   content:
 *                     type: string
 *                 required:
 *                   - content
 *     responses:
 *       201:
 *         description: ThinkTankItem created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid smartContent. 'content' field is required and cannot be empty.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 * @swagger
 * /think-tank/{uniqueId}:
 *   patch:
 *     summary: Partially update a ThinkTankItem by uniqueId
 *     tags: [ThinkTank]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the ThinkTankItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               smartContent:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *               status:
 *                 type: string
 *                 description: Status value (must match Status enum)
 *               closedOn:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               isUrgent:
 *                 type: boolean
 *               isImportant:
 *                 type: boolean
 *               hasGroomed:
 *                 type: boolean
 *               itemType:
 *                 type: string
 *                 description: Item type value (must match ThinkTankItemType enum)
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: ThinkTankItem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input or ThinkTankItem not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid status value.
 *       404:
 *         description: ThinkTankItem not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ThinkTankItem not found.
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
