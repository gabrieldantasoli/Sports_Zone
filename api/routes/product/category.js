import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyAdmin, updateUser); 

// Create
router.delete("/", verifyAdmin, deleteUser);

export default router;