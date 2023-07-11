import express from "express";
import { verifyAdmin, verifyUser } from "../../utils/verifyToken.js";
import { createQuestion, getQuestions } from "../../controllers/product/question.js";

const router = express.Router();

// Create
router.put("/", verifyUser, createQuestion);

// GET ALL CATEGORYS
router.get("/:id", getQuestions);

export default router;