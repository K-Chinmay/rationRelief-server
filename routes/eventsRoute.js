import express from "express";
import Event from "../models/EventSchema.js";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
} from "../controllers/eventController.js";

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createEvent);

//UPDATE
router.put("/:id", verifyAdmin, updateEvent);

//DELETE
router.delete("/:id", verifyAdmin, deleteEvent);

//GET EVENT
router.get("/:id", getEvent);

//GET ALL EVENTS
router.get("/", getAllEvents);

export default router;
