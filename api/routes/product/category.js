import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { createCategory, updateCategory, getCategorys } from "../../controllers/product/category.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyAdmin, updateCategory); 

// Create
router.put("/", verifyAdmin, createCategory);

// GET ALL CATEGORYS
router.get("/", getCategorys);

export default router;