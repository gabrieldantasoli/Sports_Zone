import express from "express";
import { verifyUser } from "../../utils/verifyToken.js";
import { updateUserViews, createUSerViews, getUserViews } from "../../controllers/users.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyUser, updateUserViews); 

// CREATE
router.put("/", verifyUser, createUSerViews);

// GET
router.get("/get/:id", verifyUser, getUserViews); 

export default router;