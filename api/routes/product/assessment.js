import express from "express";
import { verifyAdmin, verifyUser } from "../../utils/verifyToken.js";
import { createAssessment, getAssessments } from "../../controllers/product/assessment.js";


const router = express.Router();

// Create
router.put("/", verifyUser, createAssessment);

// GET ALL ASSESSMENTS
router.get("/:id", getAssessments);

export default router;