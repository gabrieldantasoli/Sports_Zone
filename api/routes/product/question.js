import express from "express";
import { verifyAdmin, verifyUser } from "../../utils/verifyToken.js";
import { createQuestion, getQuestions, getQuestionsRegex } from "../../controllers/product/question.js";

const router = express.Router();

// Create
router.put("/", verifyUser, createQuestion);

// GET ALL QUESTIONS
router.get("/:id", getQuestions);

// GET QUESTIONS USING REGEX
router.get("/regex/:substring/:id", getQuestionsRegex)

export default router;