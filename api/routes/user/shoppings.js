import express from "express";
import { verifyUser } from "../../utils/verifyToken.js";
import { createShopping, createShoppingProduct, getShoppingProducts, getShoppings, deleteShopping } from "../../controllers/shoppings.js";

const router = express.Router();

// CREATE Shopping
router.put("/", verifyUser, createShopping);

router.put("/product", verifyUser, createShoppingProduct);

// GET ALL Shopping
router.get("/", verifyUser, getShoppings);

// GET ALL ShoppingProducts By Id 
router.get("/:id", verifyUser, getShoppingProducts);

// DELTE A Shopping
router.delete("/:id", verifyUser, deleteShopping);
export default router;