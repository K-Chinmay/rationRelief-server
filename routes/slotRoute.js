import express from "express";
import Slot from "../models/slotSchema.js";
import {
  createSlot,
  updateSlot,
  deleteSlot,
  getSlot,
  getSlots,
} from "../controllers/slotController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:eventid", createSlot);

//UPDATE
router.put("/:id", verifyAdmin, updateSlot);

//DELETE
router.delete("/:id/:eventid", verifyAdmin, deleteSlot);

//GET SLOTS
router.get("/:id", getSlot);

//GET ALL SLOTS
router.get("/", getSlots);

export default router;
