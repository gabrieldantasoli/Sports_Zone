import express from "express";
import { verifyAdmin, verifyUser } from "../../utils/verifyToken.js";
import { createAnswer, getAnswers } from "../../controllers/product/answer.js";

const router = express.Router();

// Create
router.put("/", verifyUser, createAnswer);

// GET ALL CATEGORYS
router.get("/:id", getAnswers);

export default router;