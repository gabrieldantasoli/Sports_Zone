import express from "express";
import { verifyUser } from "../../utils/verifyToken.js";
import { createCartProduct, deleteCartProduct, getCartProduct, getCartProducts, updateCartProduct } from "../../controllers/cartProduct.js";

const router = express.Router();

// UPDATE CARTPRODUCT
router.put("/:id", verifyUser, updateCartProduct); 

// DELETE CARTPRODUCT
router.delete("/:id", verifyUser, deleteCartProduct);

// CREATE CARTPRODUCT
router.put("/", verifyUser, createCartProduct);

// GET ALL CARTPRODUCT
router.get("/:id", verifyUser, getCartProducts);

// GET A CARTPRODUCT
router.get("/:id/:productid", verifyUser, getCartProduct)
export default router;