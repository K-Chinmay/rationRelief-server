import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/userController.js";

import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET EVENT
router.get("/:id", verifyUser, getUser);

//GET ALL EVENTS
router.get("/", verifyAdmin, getAllUsers);

export default router;
