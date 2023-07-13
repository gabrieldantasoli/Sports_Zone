import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { createCategory, updateCategory, getCategorys, getCategory } from "../../controllers/product/category.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyAdmin, updateCategory); 

// Create
router.put("/", verifyAdmin, createCategory);

// GET ALL CATEGORYS
router.get("/", getCategorys);

// GET A CATEGORY
router.get("/:name", getCategory);

export default router;