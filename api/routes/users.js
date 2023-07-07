import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyUser, updateUser); 

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser); 

// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;