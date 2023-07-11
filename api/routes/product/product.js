import express from "express";
import { verifyAdmin } from "../../utils/verifyToken.js";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../../controllers/product/product.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyAdmin, updateProduct); 

// CREATE
router.put("/", verifyAdmin, createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET A PRODUCT
router.get("/:id", getProduct);

// DELETE A PRODUCT
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;